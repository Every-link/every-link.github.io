const CACHE_NAME = 'petite-vue-cache-v1';


const urlsToCache = [
'/',
'/index.html',
'/search.html',
'/offline.html',
'/404.html',


'/manifest.json',

'/icons/icon-192.png',
'/icons/icon-512.png',
'/icons/icon-180.png',

'/res/css/style.css',
'/res/js/petite-vue.js',
'/res/js/script.js',


'/res/json/web.json',
'/res/json/ai.json'


];




// Install: Cache essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate worker immediately
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control immediately
});

// Fetch: Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match('/offline.html') // Optional: fallback offline page
        )
      );
    })
  );
});