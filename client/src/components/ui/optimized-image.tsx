import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  lazy?: boolean;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  lazy = true,
  placeholder = 'empty',
  sizes,
  quality = 75,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Load image 100px before it comes into view
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Generate WebP source with fallback
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.webp')) return originalSrc;
    const extension = originalSrc.split('.').pop();
    return originalSrc.replace(`.${extension}`, '.webp');
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return undefined;
    
    const extensions = ['.webp', '.jpg', '.jpeg', '.png'];
    const isWebP = extensions.some(ext => baseSrc.includes(ext));
    
    const breakpoints = [480, 768, 1024, 1200, 1920];
    const validBreakpoints = breakpoints.filter(bp => bp <= (width * 2));
    
    return validBreakpoints
      .map(bp => `${baseSrc.replace(/\.(webp|jpg|jpeg|png)$/, `_${bp}w.$1`)} ${bp}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(false);
  };

  // Don't load image until it's in view (for lazy loading)
  if (!isInView && !priority) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'bg-gray-200 dark:bg-gray-800 animate-pulse',
          className
        )}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder while loading */}
      {placeholder === 'blur' && !isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
          }}
        />
      )}
      
      {/* Main image with WebP support */}
      <picture>
        <source
          srcSet={generateSrcSet(getWebPSrc(src))}
          sizes={sizes || (width ? `${width}px` : '100vw')}
          type="image/webp"
        />
        <source
          srcSet={generateSrcSet(src)}
          sizes={sizes || (width ? `${width}px` : '100vw')}
        />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            {
              'opacity-0': !isLoaded && !error,
              'opacity-100': isLoaded,
            },
            className
          )}
          {...props}
        />
      </picture>
      
      {/* Error fallback */}
      {error && (
        <div
          className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : 'auto',
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
        >
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

// Hook for preloading critical images
export function useImagePreload(src: string, priority: boolean = false) {
  useEffect(() => {
    if (!priority || !src) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [src, priority]);
}

// Generate optimized image props for common use cases
export const imageOptimizations = {
  hero: {
    priority: true,
    lazy: false,
    sizes: '100vw',
    quality: 90,
    placeholder: 'blur' as const,
  },
  cityGuideHero: {
    priority: true,
    lazy: false,
    sizes: '100vw',
    quality: 85,
    width: 1200,
    height: 600,
  },
  thumbnail: {
    lazy: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    quality: 75,
    placeholder: 'blur' as const,
  },
  avatar: {
    lazy: true,
    sizes: '200px',
    quality: 80,
    width: 200,
    height: 200,
  },
} as const;