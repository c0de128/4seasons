interface MemoryStats {
  used: number;
  total: number;
  percentage: number;
  timestamp: number;
}

interface ComponentRef {
  name: string;
  instance: any;
  mountTime: number;
  lastActivity: number;
}

class MemoryManager {
  private static instance: MemoryManager;
  private componentRefs = new Map<string, ComponentRef>();
  private memoryHistory: MemoryStats[] = [];
  private cleanupInterval: number | null = null;
  private maxHistorySize = 100;
  private warningThreshold = 0.8; // 80% memory usage warning
  private criticalThreshold = 0.95; // 95% memory usage critical

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  // Register a component for memory tracking
  registerComponent(name: string, instance: any): void {
    this.componentRefs.set(name, {
      name,
      instance,
      mountTime: Date.now(),
      lastActivity: Date.now()
    });
  }

  // Unregister a component
  unregisterComponent(name: string): void {
    this.componentRefs.delete(name);
  }

  // Update component activity timestamp
  updateComponentActivity(name: string): void {
    const ref = this.componentRefs.get(name);
    if (ref) {
      ref.lastActivity = Date.now();
    }
  }

  // Get memory statistics
  getMemoryStats(): MemoryStats | null {
    if (!('memory' in performance)) return null;

    const memory = (performance as any).memory;
    const used = memory.usedJSHeapSize;
    const total = memory.totalJSHeapSize;

    return {
      used,
      total,
      percentage: total > 0 ? used / total : 0,
      timestamp: Date.now()
    };
  }

  // Get memory history
  getMemoryHistory(): MemoryStats[] {
    return [...this.memoryHistory];
  }

  // Force garbage collection (if available)
  forceGarbageCollection(): boolean {
    if ('gc' in window && typeof (window as any).gc === 'function') {
      try {
        (window as any).gc();
        return true;
      } catch (error) {
        console.warn('Failed to trigger garbage collection:', error);
        return false;
      }
    }
    return false;
  }

  // Clean up inactive components
  cleanupInactiveComponents(maxInactiveTime = 5 * 60 * 1000): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [name, ref] of this.componentRefs) {
      if (now - ref.lastActivity > maxInactiveTime) {
        // Perform cleanup specific to component type
        this.cleanupComponent(ref);
        this.componentRefs.delete(name);
        cleanedCount++;
      }
    }

    return cleanedCount;
  }

  // Cleanup specific component resources
  private cleanupComponent(ref: ComponentRef): void {
    const { instance } = ref;

    // Clear timeouts and intervals
    if (instance.timeouts) {
      instance.timeouts.forEach((id: number) => clearTimeout(id));
    }
    if (instance.intervals) {
      instance.intervals.forEach((id: number) => clearInterval(id));
    }

    // Remove event listeners
    if (instance.removeEventListeners && typeof instance.removeEventListeners === 'function') {
      instance.removeEventListeners();
    }

    // Clear DOM references
    if (instance.domRefs) {
      Object.keys(instance.domRefs).forEach(key => {
        delete instance.domRefs[key];
      });
    }

    console.log(`Cleaned up component: ${ref.name}`);
  }

  // Start memory monitoring
  private startMonitoring(): void {
    if (this.cleanupInterval) return;

    this.cleanupInterval = window.setInterval(() => {
      const stats = this.getMemoryStats();
      if (stats) {
        this.memoryHistory.push(stats);

        // Keep history size manageable
        if (this.memoryHistory.length > this.maxHistorySize) {
          this.memoryHistory.shift();
        }

        // Check for memory warnings
        this.checkMemoryThresholds(stats);
      }

      // Clean up inactive components every 5 minutes
      this.cleanupInactiveComponents();
    }, 30000); // Check every 30 seconds
  }

  // Check memory usage thresholds
  private checkMemoryThresholds(stats: MemoryStats): void {
    if (stats.percentage >= this.criticalThreshold) {
      console.error('CRITICAL: Memory usage is very high', {
        percentage: Math.round(stats.percentage * 100),
        used: Math.round(stats.used / 1024 / 1024),
        total: Math.round(stats.total / 1024 / 1024)
      });

      // Force cleanup and GC
      this.cleanupInactiveComponents(2 * 60 * 1000); // 2 minutes
      this.forceGarbageCollection();

      // Dispatch custom event for app-level handling
      window.dispatchEvent(new CustomEvent('memoryPressure', {
        detail: { level: 'critical', stats }
      }));
    } else if (stats.percentage >= this.warningThreshold) {
      console.warn('WARNING: Memory usage is high', {
        percentage: Math.round(stats.percentage * 100),
        used: Math.round(stats.used / 1024 / 1024),
        total: Math.round(stats.total / 1024 / 1024)
      });

      // Dispatch warning event
      window.dispatchEvent(new CustomEvent('memoryPressure', {
        detail: { level: 'warning', stats }
      }));
    }
  }

  // Stop memory monitoring
  stopMonitoring(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  // Get component statistics
  getComponentStats(): { count: number; components: ComponentRef[] } {
    return {
      count: this.componentRefs.size,
      components: Array.from(this.componentRefs.values())
    };
  }

  // Memory optimization utilities
  optimizeMemory(): void {
    // Clear inactive components
    const cleanedComponents = this.cleanupInactiveComponents();

    // Clear old memory history
    if (this.memoryHistory.length > this.maxHistorySize / 2) {
      this.memoryHistory = this.memoryHistory.slice(-this.maxHistorySize / 2);
    }

    // Force garbage collection if available
    const gcSuccess = this.forceGarbageCollection();

    console.log('Memory optimization completed', {
      cleanedComponents,
      gcTriggered: gcSuccess,
      historyTrimmed: true
    });
  }
}

// Hook for React components
export function useMemoryTracking(componentName: string): {
  trackActivity: () => void;
  memoryStats: MemoryStats | null;
} {
  const memoryManager = MemoryManager.getInstance();

  // Register component on mount
  React.useEffect(() => {
    memoryManager.registerComponent(componentName, {
      timeouts: new Set(),
      intervals: new Set(),
      domRefs: {},
      removeEventListeners: () => {}
    });

    return () => {
      memoryManager.unregisterComponent(componentName);
    };
  }, [componentName]);

  const trackActivity = React.useCallback(() => {
    memoryManager.updateComponentActivity(componentName);
  }, [componentName]);

  const memoryStats = memoryManager.getMemoryStats();

  return { trackActivity, memoryStats };
}

// Utility functions for memory management
export const memoryUtils = {
  // Clear all caches
  clearCaches: async (): Promise<void> => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  },

  // Clear localStorage selectively
  clearLocalStorage: (keepKeys: string[] = []): void => {
    Object.keys(localStorage).forEach(key => {
      if (!keepKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  },

  // Clear sessionStorage selectively
  clearSessionStorage: (keepKeys: string[] = []): void => {
    Object.keys(sessionStorage).forEach(key => {
      if (!keepKeys.includes(key)) {
        sessionStorage.removeItem(key);
      }
    });
  },

  // Monitor memory pressure
  onMemoryPressure: (callback: (event: CustomEvent) => void): (() => void) => {
    window.addEventListener('memoryPressure', callback as EventListener);
    return () => window.removeEventListener('memoryPressure', callback as EventListener);
  },

  // Get memory info for debugging
  getMemoryInfo: (): object => {
    const manager = MemoryManager.getInstance();
    const stats = manager.getMemoryStats();
    const componentStats = manager.getComponentStats();

    return {
      current: stats,
      history: manager.getMemoryHistory().slice(-10), // Last 10 entries
      components: componentStats,
      storage: {
        localStorage: Object.keys(localStorage).length,
        sessionStorage: Object.keys(sessionStorage).length
      }
    };
  }
};

// Export singleton instance
export const memoryManager = MemoryManager.getInstance();

// Auto-import React for useEffect and useCallback
import React from 'react';