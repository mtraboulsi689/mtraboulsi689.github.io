// Kill switch: this project no longer registers a service worker (see
// src/App.tsx), but browsers that already installed the old cache-first
// worker (portfolio-v1.0.0) keep it active until it's explicitly replaced.
// This file unregisters that worker and clears its caches on activate, then
// reloads any open tabs so they fetch the current build from the network.
//
// Safe to delete once confident all previously-registered clients have
// picked this up (one cache-first worker's clients.claim() means it takes
// at most one page load per returning visitor).

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();

      const clientsList = await self.clients.matchAll({ type: 'window' });
      for (const client of clientsList) {
        client.navigate(client.url);
      }
    })()
  );
});
