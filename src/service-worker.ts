const CACHE_KEY = `journal-cache-${process.env.BUILD_ID}`;
const scope: ServiceWorkerGlobalScope = self as any;

scope.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_KEY)
            .map(cacheName => caches.delete(cacheName))
        )
      )
  );
});

scope.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_KEY).then(cache => cache.add("index.html"))
  );
});

scope.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_KEY).then(cache => {
      return cache.match(event.request).then(resA => {
        return (
          resA ||
          fetch(event.request).then(resB => {
            if (event.request.url.indexOf("http") !== 0) {
              // not an HTTP request so don't cache
              return resB;
            }

            cache.put(event.request, resB.clone());
            return resB;
          })
        );
      });
    })
  );
});
