import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  renderCount: number;
  memoryUsage?: {
    used: number;
    total: number;
    percentage: number;
  };
  vitals: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
  errors: number;
  warnings: number;
}

interface ComponentPerformance {
  name: string;
  metrics: PerformanceMetrics;
  isOptimized: boolean;
  suggestions: string[];
}

interface PerformanceThresholds {
  maxRenderTime: number;
  maxRenderCount: number;
  maxMemoryPercentage: number;
  maxLCP: number;
  maxCLS: number;
}

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  maxRenderTime: 16, // 60fps = ~16ms per frame
  maxRenderCount: 10, // Max re-renders per second
  maxMemoryPercentage: 0.8, // 80% memory usage
  maxLCP: 2500, // 2.5 seconds
  maxCLS: 0.1 // Layout shift score
};

export function usePerformanceMonitor(
  componentName: string,
  thresholds: Partial<PerformanceThresholds> = {}
): ComponentPerformance {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    renderCount: 0,
    vitals: {},
    errors: 0,
    warnings: 0
  });

  const finalThresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
  const renderStartTime = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  const lastResetTime = useRef<number>(Date.now());
  const errorsRef = useRef<number>(0);
  const warningsRef = useRef<number>(0);

  // Track render start
  const startRender = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  // Track render end
  const endRender = useCallback(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      renderCountRef.current++;

      // Reset render count every second
      const now = Date.now();
      if (now - lastResetTime.current >= 1000) {
        renderCountRef.current = 1;
        lastResetTime.current = now;
      }

      // Get memory usage if available
      let memoryUsage: PerformanceMetrics['memoryUsage'];
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryUsage = {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          percentage: memory.totalJSHeapSize > 0 ? memory.usedJSHeapSize / memory.totalJSHeapSize : 0
        };
      }

      setMetrics(prev => ({
        ...prev,
        renderTime,
        renderCount: renderCountRef.current,
        memoryUsage,
        errors: errorsRef.current,
        warnings: warningsRef.current
      }));

      renderStartTime.current = 0;
    }
  }, []);

  // Track Core Web Vitals
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({
            ...prev,
            vitals: { ...prev.vitals, lcp: entry.startTime }
          }));
        }

        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({
            ...prev,
            vitals: { ...prev.vitals, fid: (entry as any).processingStart - entry.startTime }
          }));
        }

        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          setMetrics(prev => ({
            ...prev,
            vitals: {
              ...prev.vitals,
              cls: (prev.vitals.cls || 0) + (entry as any).value
            }
          }));
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.warn('Some performance entry types not supported');
    }

    return () => observer.disconnect();
  }, []);

  // Track errors and warnings
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes(componentName))) {
        errorsRef.current++;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes(componentName))) {
        warningsRef.current++;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, [componentName]);

  // Auto-start/end render tracking
  useEffect(() => {
    startRender();
    return () => {
      endRender();
    };
  });

  // Determine if component is optimized
  const isOptimized = useMemo(() => {
    const { renderTime, renderCount, memoryUsage, vitals } = metrics;

    return (
      renderTime <= finalThresholds.maxRenderTime &&
      renderCount <= finalThresholds.maxRenderCount &&
      (!memoryUsage || memoryUsage.percentage <= finalThresholds.maxMemoryPercentage) &&
      (!vitals.lcp || vitals.lcp <= finalThresholds.maxLCP) &&
      (!vitals.cls || vitals.cls <= finalThresholds.maxCLS)
    );
  }, [metrics, finalThresholds]);

  // Generate optimization suggestions
  const suggestions = useMemo(() => {
    const suggestions: string[] = [];
    const { renderTime, renderCount, memoryUsage, vitals } = metrics;

    if (renderTime > finalThresholds.maxRenderTime) {
      suggestions.push(`Render time (${renderTime.toFixed(2)}ms) exceeds threshold. Consider using React.memo or useMemo.`);
    }

    if (renderCount > finalThresholds.maxRenderCount) {
      suggestions.push(`High render frequency (${renderCount}/sec). Check for unnecessary re-renders.`);
    }

    if (memoryUsage && memoryUsage.percentage > finalThresholds.maxMemoryPercentage) {
      suggestions.push(`Memory usage (${(memoryUsage.percentage * 100).toFixed(1)}%) is high. Check for memory leaks.`);
    }

    if (vitals.lcp && vitals.lcp > finalThresholds.maxLCP) {
      suggestions.push(`LCP (${vitals.lcp.toFixed(0)}ms) is slow. Optimize image loading and reduce render-blocking resources.`);
    }

    if (vitals.cls && vitals.cls > finalThresholds.maxCLS) {
      suggestions.push(`CLS (${vitals.cls.toFixed(3)}) indicates layout instability. Set explicit dimensions for images and elements.`);
    }

    if (metrics.errors > 0) {
      suggestions.push(`${metrics.errors} error(s) detected. Check console for details.`);
    }

    if (metrics.warnings > 5) {
      suggestions.push(`${metrics.warnings} warning(s) detected. Consider addressing console warnings.`);
    }

    return suggestions;
  }, [metrics, finalThresholds]);

  return {
    name: componentName,
    metrics,
    isOptimized,
    suggestions
  };
}

// Hook for monitoring multiple components
export function useGlobalPerformanceMonitor(): {
  components: ComponentPerformance[];
  overallScore: number;
  addComponent: (component: ComponentPerformance) => void;
  removeComponent: (name: string) => void;
  clearComponents: () => void;
} {
  const [components, setComponents] = useState<ComponentPerformance[]>([]);

  const addComponent = useCallback((component: ComponentPerformance) => {
    setComponents(prev => {
      const existing = prev.findIndex(c => c.name === component.name);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = component;
        return updated;
      }
      return [...prev, component];
    });
  }, []);

  const removeComponent = useCallback((name: string) => {
    setComponents(prev => prev.filter(c => c.name !== name));
  }, []);

  const clearComponents = useCallback(() => {
    setComponents([]);
  }, []);

  // Calculate overall performance score
  const overallScore = useMemo(() => {
    if (components.length === 0) return 100;

    const optimizedCount = components.filter(c => c.isOptimized).length;
    return Math.round((optimizedCount / components.length) * 100);
  }, [components]);

  return {
    components,
    overallScore,
    addComponent,
    removeComponent,
    clearComponents
  };
}

// Hook for performance alerts
export function usePerformanceAlerts(): {
  alerts: Array<{
    type: 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
    component?: string;
  }>;
  addAlert: (alert: any) => void;
  clearAlerts: () => void;
} {
  const [alerts, setAlerts] = useState<any[]>([]);

  const addAlert = useCallback((alert: any) => {
    setAlerts(prev => [...prev, { ...alert, timestamp: Date.now() }].slice(-50)); // Keep last 50 alerts
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Listen for memory pressure events
  useEffect(() => {
    const handleMemoryPressure = (event: CustomEvent) => {
      const { level, stats } = event.detail;
      addAlert({
        type: level === 'critical' ? 'error' : 'warning',
        message: `Memory pressure detected: ${Math.round(stats.percentage * 100)}% usage`,
        component: 'Memory Manager'
      });
    };

    window.addEventListener('memoryPressure', handleMemoryPressure as EventListener);
    return () => window.removeEventListener('memoryPressure', handleMemoryPressure as EventListener);
  }, [addAlert]);

  return {
    alerts,
    addAlert,
    clearAlerts
  };
}

// Auto-import necessary dependencies
import { useMemo } from 'react';