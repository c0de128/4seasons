// Service Worker for 4Seasons Real Estate
const CACHE_NAME = '4seasons-v1.0.0';
const STATIC_CACHE_NAME = '4seasons-static-v1.0.0';
const DYNAMIC_CACHE_NAME = '4seasons-dynamic-v1.0.0';
const IMAGE_CACHE_NAME = '4seasons-images-v1.0.0';

// Cache strategies by route type
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',      // Static assets
  NETWORK_FIRST: 'network-first',  // API calls, HTML pages
  STALE_WHILE_REVALIDATE: 'swr',   // CSS, JS, images
  NETWORK_ONLY: 'network-only'     // Critical API calls
};

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt',
  '/offline.html'
];

// Route patterns for different caching strategies
const ROUTE_PATTERNS = {
  static: [
    /\.(css|js|woff|woff2|ttf|eot)$/,
    /\/assets\//,
    /\/icons\//
  ],
  images: [
    /\.(png|jpg|jpeg|gif|webp|svg|avif)$/,
    /\/optimized-images\//,
    /\/placeholders\//
  ],
  api: [
    /\/api\//
  ],
  pages: [
    /\/city-guides\//,
    /\/blog\//,
    /\/about|\/contact|\/buy|\/sell/
  ]
};

// Cache size limits
const CACHE_LIMITS = {
  [STATIC_CACHE_NAME]: 50,
  [DYNAMIC_CACHE_NAME]: 100,
  [IMAGE_CACHE_NAME]: 200
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome extensions
  if (request.method !== 'GET' || url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }
  
  // Determine caching strategy based on request
  const strategy = getCachingStrategy(request);
  
  event.respondWith(
    handleRequest(request, strategy)
      .catch((error) => {
        console.error('Service Worker: Fetch error', error);
        return handleOffline(request);
      })
  );
});

// Determine caching strategy for request
function getCachingStrategy(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Static assets - cache first
  if (ROUTE_PATTERNS.static.some(pattern => pattern.test(pathname))) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // Images - stale while revalidate
  if (ROUTE_PATTERNS.images.some(pattern => pattern.test(pathname))) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  // API calls - network first
  if (ROUTE_PATTERNS.api.some(pattern => pattern.test(pathname))) {
    // Critical auth endpoints should be network only
    if (pathname.includes('/auth/') || pathname.includes('/admin/')) {
      return CACHE_STRATEGIES.NETWORK_ONLY;
    }
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Page routes - network first with fallback
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Handle request based on caching strategy
async function handleRequest(request, strategy) {
  const cacheName = getCacheName(request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName);
      
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName);
      
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cacheName);
      
    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);
      
    default:
      return networkFirst(request, cacheName);
  }
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.status === 200) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    await limitCacheSize(cacheName);
  }
  
  return networkResponse;
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      await limitCacheSize(cacheName);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.status === 200) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
        await limitCacheSize(cacheName);
      }
      return networkResponse;
    })
    .catch(() => null);
  
  return cachedResponse || networkResponsePromise;
}

// Get appropriate cache name for request
function getCacheName(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  if (ROUTE_PATTERNS.images.some(pattern => pattern.test(pathname))) {
    return IMAGE_CACHE_NAME;
  }
  
  if (ROUTE_PATTERNS.static.some(pattern => pattern.test(pathname))) {
    return STATIC_CACHE_NAME;
  }
  
  return DYNAMIC_CACHE_NAME;
}

// Limit cache size to prevent storage quota issues
async function limitCacheSize(cacheName) {
  const limit = CACHE_LIMITS[cacheName];
  if (!limit) return;
  
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > limit) {
    // Remove oldest entries first
    const keysToDelete = keys.slice(0, keys.length - limit);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
    console.log(`Service Worker: Cleaned ${keysToDelete.length} items from ${cacheName}`);
  }
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // For navigation requests, return offline page
  if (request.mode === 'navigate') {
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // For images, return placeholder
  if (ROUTE_PATTERNS.images.some(pattern => pattern.test(url.pathname))) {
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999">Image Unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  // For API requests, return offline message
  if (ROUTE_PATTERNS.api.some(pattern => pattern.test(url.pathname))) {
    return new Response(
      JSON.stringify({ error: 'Offline', message: 'This feature requires an internet connection' }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  throw new Error('No offline fallback available');
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-contact-sync') {
    event.waitUntil(syncContactForms());
  }
});

// Sync offline contact form submissions
async function syncContactForms() {
  try {
    // Get stored form submissions from IndexedDB
    const submissions = await getStoredSubmissions();
    
    for (const submission of submissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          await removeStoredSubmission(submission.id);
          console.log('Service Worker: Synced contact form submission');
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync submission', error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: data.tag || 'general',
    data: data.url ? { url: data.url } : undefined,
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_CACHE_STATS') {
    getCacheStats().then(stats => {
      event.ports[0].postMessage({ type: 'CACHE_STATS', data: stats });
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
    });
  }
});

// Get cache statistics
async function getCacheStats() {
  const cacheNames = await caches.keys();
  const stats = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    stats[cacheName] = keys.length;
  }
  
  return stats;
}

// Clear all caches (for debugging)
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('Service Worker: All caches cleared');
}

// Utility functions for IndexedDB (for offline form storage)
function getStoredSubmissions() {
  return new Promise((resolve, reject) => {
    // Simplified - in a real implementation, you'd use IndexedDB
    resolve([]);
  });
}

function removeStoredSubmission(id) {
  return new Promise((resolve, reject) => {
    // Simplified - in a real implementation, you'd use IndexedDB
    resolve();
  });
}

console.log('Service Worker: Script loaded');