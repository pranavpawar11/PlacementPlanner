// Simple Vite Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  event.waitUntil(
  caches.open("v1").then((cache) => {
    return cache.addAll([
      new URL("/", self.location.origin),
      new URL("/index.html", self.location.origin),
      new URL("/manifest.json", self.location.origin),
      new URL("/logo.png", self.location.origin),
    ]);
  })
);

});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== "v1").map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});
