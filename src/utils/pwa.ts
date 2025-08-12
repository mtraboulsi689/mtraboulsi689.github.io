// Service Worker registration utility
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      console.log('Registering service worker...');
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('Service worker registered successfully:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, refresh the page
              console.log('New content is available; please refresh.');
              // You could show a notification here
              showUpdateNotification();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      return null;
    }
  } else {
    console.log('Service workers are not supported in this browser');
    return null;
  }
};

const showUpdateNotification = () => {
  // You could integrate this with your notification system
  if (confirm('New content is available. Would you like to refresh the page?')) {
    window.location.reload();
  }
};

// Check if the app is running in standalone mode (installed as PWA)
export const isPWAInstalled = (): boolean => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone = (window.navigator as any).standalone === true;
  return isStandalone || isIOSStandalone;
};

// Get PWA display mode
export const getPWADisplayMode = (): string => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  return 'browser';
};

// Cache management utilities
export const clearAllCaches = async (): Promise<void> => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
};

export const getCacheSize = async (): Promise<number> => {
  if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
};

// Offline detection
export const isOnline = (): boolean => navigator.onLine;

export const addOnlineListener = (callback: () => void): void => {
  window.addEventListener('online', callback);
};

export const addOfflineListener = (callback: () => void): void => {
  window.addEventListener('offline', callback);
};

export const removeOnlineListener = (callback: () => void): void => {
  window.removeEventListener('online', callback);
};

export const removeOfflineListener = (callback: () => void): void => {
  window.removeEventListener('offline', callback);
};