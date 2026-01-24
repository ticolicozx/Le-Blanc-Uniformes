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

// Instalando o service worker e cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Interceptando requisições e servindo do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualizando o cache
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
