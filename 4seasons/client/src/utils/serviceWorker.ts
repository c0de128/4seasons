// Service Worker registration and management utilities
import React from 'react';
import { logger } from './logger';

interface ServiceWorkerStats {
  cacheStats: Record<string, number>;
  isOnline: boolean;
  isServiceWorkerSupported: boolean;
  registrationState: string;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isRegistered = false;

  /**
   * Register the service worker
   */
  async register(): Promise<boolean> {
    if (!('serviceWorker' in navigator)) {
      logger.serviceWorker.info('Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      logger.serviceWorker.info('Service Worker registered successfully');
      this.isRegistered = true;

      // Handle service worker updates
      this.registration.addEventListener('updatefound', () => {
        logger.serviceWorker.info('Service Worker update available');
        this.handleUpdate();
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', this.handleMessage);

      return true;
    } catch (error) {
      logger.serviceWorker.error('Service Worker registration failed', error as Error);
      return false;
    }
  }

  /**
   * Unregister the service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const success = await this.registration.unregister();
      if (success) {
        logger.serviceWorker.info('Service Worker unregistered successfully');
        this.registration = null;
        this.isRegistered = false;
      }
      return success;
    } catch (error) {
      logger.serviceWorker.error('Service Worker unregistration failed', error as Error);
      return false;
    }
  }

  /**
   * Update the service worker
   */
  async update(): Promise<void> {
    if (!this.registration) {
      return;
    }

    try {
      await this.registration.update();
      logger.serviceWorker.info('Service Worker update check completed');
    } catch (error) {
      logger.serviceWorker.error('Service Worker update failed', error as Error);
    }
  }

  /**
   * Handle service worker updates
   */
  private handleUpdate(): void {
    if (!this.registration || !this.registration.installing) {
      return;
    }

    const newWorker = this.registration.installing;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New service worker installed and ready to take over
        this.notifyUpdate();
      }
    });
  }

  /**
   * Notify user of available update
   */
  private notifyUpdate(): void {
    // Create custom event for app to handle
    const updateEvent = new CustomEvent('sw-update-available', {
      detail: {
        registration: this.registration
      }
    });
    window.dispatchEvent(updateEvent);
  }

  /**
   * Handle messages from service worker
   */
  private handleMessage = (event: MessageEvent): void => {
    const { data } = event;
    
    switch (data.type) {
      case 'CACHE_STATS':
        logger.serviceWorker.info('Cache stats received', { stats: data.data });
        break;
      case 'CACHE_CLEARED':
        logger.serviceWorker.info('Cache cleared successfully');
        break;
      default:
        logger.serviceWorker.info('Service Worker message received', { data });
    }
  };

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<Record<string, number> | null> {
    if (!this.isRegistered || !navigator.serviceWorker.controller) {
      return null;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_STATS') {
          resolve(event.data.data);
        }
      });
      
      messageChannel.port1.start();
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_STATS' },
        [messageChannel.port2]
      );
    });
  }

  /**
   * Clear all caches
   */
  async clearCache(): Promise<boolean> {
    if (!this.isRegistered || !navigator.serviceWorker.controller) {
      return false;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_CLEARED') {
          resolve(true);
        }
      });
      
      messageChannel.port1.start();
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
    });
  }

  /**
   * Get service worker status
   */
  getStatus(): ServiceWorkerStats {
    return {
      cacheStats: {},
      isOnline: navigator.onLine,
      isServiceWorkerSupported: 'serviceWorker' in navigator,
      registrationState: this.registration?.active?.state || 'none'
    };
  }

  /**
   * Skip waiting for new service worker
   */
  async skipWaiting(): Promise<void> {
    if (!this.registration?.waiting) {
      return;
    }

    this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  }
}

// Connection status management
class ConnectionManager {
  private callbacks: Array<(isOnline: boolean) => void> = [];
  
  constructor() {
    window.addEventListener('online', () => this.notifyCallbacks(true));
    window.addEventListener('offline', () => this.notifyCallbacks(false));
  }

  /**
   * Add connection status callback
   */
  onStatusChange(callback: (isOnline: boolean) => void): () => void {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Get current connection status
   */
  isOnline(): boolean {
    return navigator.onLine;
  }

  /**
   * Notify all callbacks of status change
   */
  private notifyCallbacks(isOnline: boolean): void {
    this.callbacks.forEach(callback => {
      try {
        callback(isOnline);
      } catch (error) {
        console.error('Connection callback error:', error);
      }
    });
  }
}

// Offline form storage
class OfflineFormManager {
  private dbName = '4seasons-offline';
  private version = 1;
  private storeName = 'form-submissions';

  /**
   * Store form submission for later sync
   */
  async storeSubmission(formData: any, endpoint: string): Promise<void> {
    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not supported - cannot store offline forms');
      return;
    }

    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const submission = {
        id: Date.now().toString(),
        data: formData,
        endpoint,
        timestamp: Date.now()
      };

      await store.add(submission);
      console.log('Form submission stored offline');
      
      // Register for background sync
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('background-contact-sync');
      }
    } catch (error) {
      console.error('Failed to store offline form:', error);
    }
  }

  /**
   * Get pending form submissions
   */
  async getPendingSubmissions(): Promise<any[]> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      return await store.getAll();
    } catch (error) {
      console.error('Failed to get pending submissions:', error);
      return [];
    }
  }

  /**
   * Remove synced submission
   */
  async removeSubmission(id: string): Promise<void> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await store.delete(id);
    } catch (error) {
      console.error('Failed to remove submission:', error);
    }
  }

  /**
   * Open IndexedDB
   */
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('endpoint', 'endpoint', { unique: false });
        }
      };
    });
  }
}

// Export singleton instances
export const serviceWorkerManager = new ServiceWorkerManager();
export const connectionManager = new ConnectionManager();
export const offlineFormManager = new OfflineFormManager();

// Auto-register service worker in production
if (process.env.NODE_ENV === 'production') {
  serviceWorkerManager.register().catch(console.error);
}

// Export utility functions
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

export const isOnline = (): boolean => {
  return navigator.onLine;
};

export const preloadRoute = async (url: string): Promise<void> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      console.log(`Route preloaded: ${url}`);
    }
  } catch (error) {
    console.log(`Failed to preload route: ${url}`);
  }
};

// Service worker update notification hook
export const useServiceWorkerUpdate = (onUpdateAvailable?: () => void) => {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  React.useEffect(() => {
    const handleUpdate = () => {
      setUpdateAvailable(true);
      onUpdateAvailable?.();
    };

    window.addEventListener('sw-update-available', handleUpdate);
    return () => window.removeEventListener('sw-update-available', handleUpdate);
  }, [onUpdateAvailable]);

  const applyUpdate = async () => {
    await serviceWorkerManager.skipWaiting();
    window.location.reload();
  };

  return {
    updateAvailable,
    applyUpdate
  };
};