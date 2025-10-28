// Function-level comment: يقدّم خدمة التخزين المؤقت للأصول الأساسية للعمل دون اتصال.
const CACHE_NAME = 'mh-cache-v1';
const ASSETS = [
  '/site/index.html',
  '/site/admin.html',
  '/site/styles.css',
  '/site/app.js',
  '/site/admin.js',
  '/site/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

