const cacheName = 'commuter';
const filesToCache = [];

self.addEventListener('install', e => {
  // [ServiceWorker] Install
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // [ServiceWorker] Caching app shell
      return cache.addAll(filesToCache);
    })
  );
});