const CACHE_NAME = 'eslem-nur-v4';
const urlsToCache = [
  'eslemnur_notes/arapca.html',
  '/eslemnur_notes/gelisim.html',
  '/eslemnur_notes/umre-hac.html',
  'eslemnur_notes/zikir.html',
  'eslemnur_notes/kuran.html',
  'eslemnur_notes/kelime-oyunu.html',
  'eslemnur_notes/planner.html',
  '/eslemnur_notes/PWA/icon/favicon4.ico',
  '/eslemnur_notes/PWA/png/favicon4-96x96.png',
  '/eslemnur_notes/PWA/manifest/site4.webmanifest',
  // İstersen diğer CSS/JS dosyalarını da buraya ekleyebilirsin
];

// Service Worker'ı kaydet
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Önbelleğe alındı');
        return cache.addAll(urlsToCache);
      })
  );
});

// Eski sürümleri sil
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// İstekleri yakala ve önbellekten döndür
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
