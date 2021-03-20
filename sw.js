// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = "v1::static";

self.addEventListener("install", e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache
        .addAll([
          "/",
          "/index.html",
          "/app.js",
          "/styles.css",
          "/favicon.png",
          "/manifest.webmanifest",
          "/icons/icon-192x192.png",
          "/icons/icon-256x256.png",
          "/icons/icon-384x384.png",
          "/icons/icon-512x512.png",
        ])
        .then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener("fetch", event => {
  event.respondWith(
    // ensure we check the *right* cache to match against
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(res => {
        return res || fetch(event.request);
      });
    })
  );
});
