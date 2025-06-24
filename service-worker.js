const CACHE_NAME = 'petite-vue-cache-v2';


// ✅ Only pre-cache static assets, NOT HTML pages
const urlsToCache = [
  '/offline.html',
  
  '/manifest.json',
  
  // Icons
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-180.png',
  
  // CSS & JS
  '/res/css/style.css',
  '/res/js/petite-vue.js',
  '/res/js/script.js',
  
  // JSON
  '/res/json/web.json',
  '/res/json/ai.json',
  
  // External CDN files (will fail silently if offline on install)
  'https://cdn.jsdelivr.net/npm/beercss@3.11.11/dist/cdn/beer.min.js',
  'https://cdn.jsdelivr.net/npm/beercss@3.11.11/dist/cdn/beer.min.css',
];


// ✅ Install: Cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate immediately
});


// ✅ Activate: Remove old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});


// ✅ Fetch: 
// - Navigations (HTML pages): try network first, fallback to offline.html
// - Assets: try cache first, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // 🧠 For page navigations
    event.respondWith(
      fetch(event.request)
      .then(response => {
        // (Optional) Cache updated version
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, copy);
        });
        return response;
      })
      .catch(() => {
        console.warn('[SW] Offline - showing fallback page');
        return caches.match('/offline.html');
      })
    );
  } else {
    // 🎨 For static files: CSS, JS, images, etc.
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});