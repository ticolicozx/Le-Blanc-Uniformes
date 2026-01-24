const CACHE_NAME = "leblanc-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./apple-touch-icon.png",
  "./assets/img/jaleco-branco.jpg",
  "./assets/img/jaleco-rosa.jpg",
  "./assets/img/jaleco-azul.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
;
