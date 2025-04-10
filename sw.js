const CACHE_NAME = 'star-clicker-v1';
const urlsToCache = [
  '/Starclicker-app/',
  '/Starclicker-app/index.html',
  '/Starclicker-app/game.html',
  '/Starclicker-app/result.html',
  '/Starclicker-app/game.js',
  '/Starclicker-app/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  '/Starclicker-app/icons/icon-72x72.png',
  '/Starclicker-app/icons/icon-96x96.png',
  '/Starclicker-app/icons/icon-128x128.png',
  '/Starclicker-app/icons/icon-144x144.png',
  '/Starclicker-app/icons/icon-152x152.png',
  '/Starclicker-app/icons/icon-192x192.png',
  '/Starclicker-app/icons/icon-384x384.png',
  '/Starclicker-app/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
