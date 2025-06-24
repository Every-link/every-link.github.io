const CACHE_NAME = 'petite-vue-cache-v3'; // new version
const STATIC_ASSETS = [
  '/offline.html',
  '/manifest.json',
  
  // Icons
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-180.png',
  
  // Assets
  '/res/css/style.css',
  '/res/js/petite-vue.js',
  '/res/js/script.js',
  '/res/json/web.json',
  '/res/json/ai.json',
  
  // External CDNs
  'https://cdn.jsdelivr.net/npm/beercss@3.11.11/dist/cdn/beer.min.js',
  'https://cdn.jsdelivr.net/npm/beercss@3.11.11/dist/cdn/beer.min.css',
];

// ✅ Install: Only cache static assets (not HTML pages)
self.addEventListener('install', event => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ✅ Activate: Clean up ALL old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Fetch: Network-first for HTML, cache-first for others
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // 🔁 For full page navigations: try network, fallback to offline.html
    event.respondWith(
      fetch(event.request)
      .then(response => response)
      .catch(() => caches.match('/offline.html'))
    );
  } else {
    // 🎯 For CSS, JS, icons, etc.
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});