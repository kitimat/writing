const CACHE_KEY = "journal-cache";
const scope: ServiceWorkerGlobalScope = self as any;

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
            cache.put(event.request, resB.clone());
            return resB;
          })
        );
      });
    })
  );
});
