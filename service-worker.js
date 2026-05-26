const CACHE_NAME = 'calendari-amics-v1';
const URLS_TO_CACHE = [
  './calendario-amics.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Siempre intenta red primero, cache como fallback
      return fetch(event.request).catch(function() {
        return response;
      });
    })
  );
});
