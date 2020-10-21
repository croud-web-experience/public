const CACHE_NAME = 'test-cache-1';

const urlsToCache = [
  'https://external-serviceworker-preview.croud-testing.workers.dev/'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        console.log(urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});