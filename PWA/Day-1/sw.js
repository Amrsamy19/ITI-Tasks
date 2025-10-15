const cacheName = "PWA-Cache-v1";

const assets = [
  "/",
  "/index.html",
  "/offline.html",
  "/404.html",
  "/style/style.css",
  "/js/worker.js",
  "/js/script.js",
  "/manifest.json",
  "/icons/flover.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(assets).then(() => {
          console.log("All assets are cached");
        });
      })
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== cacheName) {
              return caches.delete(name);
            }
          })
        );
      })
      .catch((error) => {
        console.error("Failed to cache assets", error);
      })
  );
});

self.addEventListener("activate", (event) => {});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.status === 404) {
            return caches.match("/404.html");
          }

          const responseToCache = response.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match("/offline.html");
        });
    })
  );
});
