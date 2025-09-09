import React, { Suspense, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Loading component for lazy loaded routes
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-[#0d0d33] mx-auto mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Error boundary for lazy loaded components
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're having trouble loading this page. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#0d0d33] text-white rounded-lg hover:bg-[#1a1a4d] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper for lazy loaded components with error boundary and suspense
export function withLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(importFunc);
}

// HOC to wrap lazy loaded components with suspense and error boundary
export function LazyLoadWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LazyErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </LazyErrorBoundary>
  );
}

// Preload a component (useful for predictive loading)
export function preloadComponent(
  importFunc: () => Promise<{ default: ComponentType<any> }>
): void {
  importFunc();
}

// Create lazy loaded route with retry logic
export function createLazyRoute<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  retries = 3
): React.LazyExoticComponent<T> {
  return React.lazy(() =>
    importFunc().catch((error) => {
      if (retries > 0) {
        // Retry after a short delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(createLazyRoute(importFunc, retries - 1) as any);
          }, 1000);
        });
      }
      throw error;
    })
  );
}