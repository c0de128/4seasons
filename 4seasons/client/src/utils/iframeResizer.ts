/**
 * Enhanced iframe resizing utility for auto-detecting content height
 * and eliminating scrolling issues in iframes
 */

export interface IframeResizeMessage {
  type: string;
  height: number;
  width: number;
  timestamp: number;
  url?: string;
}

export interface IframeResizerConfig {
  minHeight: number;
  maxHeight: number;
  debounceDelay: number;
  enableSmoothResize: boolean;
  allowedOrigins: string[];
  fallbackHeight: number;
  debug: boolean;
}

export interface IframeResizerCallbacks {
  onResize?: (height: number, width: number) => void;
  onError?: (error: string) => void;
  onMessage?: (message: IframeResizeMessage) => void;
}

export class IframeResizer {
  private config: IframeResizerConfig;
  private callbacks: IframeResizerCallbacks;
  private messageListener: ((event: MessageEvent) => void) | null = null;
  private currentHeight = 0;
  private currentWidth = 0;
  private resizeTimeout: NodeJS.Timeout | null = null;
  private iframeElement: HTMLIFrameElement | null = null;

  constructor(config: Partial<IframeResizerConfig> = {}, callbacks: IframeResizerCallbacks = {}) {
    this.config = {
      minHeight: 600,
      maxHeight: 5000,
      debounceDelay: 150,
      enableSmoothResize: true,
      allowedOrigins: ['http://localhost:5000', 'https://4seasonsrealestate.com', 'https://matrix.ntreis.net'],
      fallbackHeight: 800,
      debug: false,
      ...config
    };

    this.callbacks = callbacks;
    this.currentHeight = this.config.fallbackHeight;
    this.currentWidth = 800; // Default width
  }

  /**
   * Initialize the iframe resizer and start listening for messages
   */
  public initialize(iframe: HTMLIFrameElement): void {
    this.iframeElement = iframe;
    this.log('Initializing iframe resizer for:', iframe.src);

    // Set up message listener
    this.setupMessageListener();

    // Set initial height
    this.updateIframeHeight(this.config.fallbackHeight);

    // Set up viewport resize detection as fallback
    this.setupViewportFallback();
  }

  /**
   * Clean up the resizer and remove event listeners
   */
  public destroy(): void {
    this.log('Destroying iframe resizer');

    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
      this.messageListener = null;
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }

    this.iframeElement = null;
  }

  /**
   * Get the current iframe height
   */
  public getCurrentHeight(): number {
    return this.currentHeight;
  }

  /**
   * Get the current iframe width
   */
  public getCurrentWidth(): number {
    return this.currentWidth;
  }

  /**
   * Manually set iframe height (useful for testing or fallbacks)
   */
  public setHeight(height: number): void {
    this.updateIframeHeight(height);
  }

  /**
   * Setup message listener for iframe resize events
   */
  private setupMessageListener(): void {
    this.messageListener = (event: MessageEvent) => {
      try {
        // Security check - validate origin
        if (!this.isValidOrigin(event.origin)) {
          this.log('Rejected message from invalid origin:', event.origin);
          return;
        }

        // Check if this is our resize message
        if (event.data && typeof event.data === 'object') {
          const message = event.data as IframeResizeMessage;

          // Handle MLS-specific resize messages
          if (message.type === 'mls-iframe-resize' || message.type === 'resize') {
            this.handleResizeMessage(message);
          }

          // Handle legacy resize messages
          if (message.height && typeof message.height === 'number') {
            this.handleResizeMessage({
              type: 'resize',
              height: message.height,
              width: message.width || this.currentWidth,
              timestamp: Date.now()
            });
          }
        }
      } catch (error) {
        this.log('Error handling message:', error);
        this.callbacks.onError?.(`Message handling error: ${error}`);
      }
    };

    window.addEventListener('message', this.messageListener);
    this.log('Message listener setup complete');
  }

  /**
   * Handle incoming resize messages
   */
  private handleResizeMessage(message: IframeResizeMessage): void {
    this.log('Received resize message:', message);

    // Validate the message
    if (!message.height || typeof message.height !== 'number') {
      this.log('Invalid height in message:', message.height);
      return;
    }

    // Apply constraints
    const constrainedHeight = Math.max(
      Math.min(message.height, this.config.maxHeight),
      this.config.minHeight
    );

    const constrainedWidth = message.width && message.width > 0
      ? Math.min(message.width, 2000) // Max width constraint
      : this.currentWidth;

    // Check if height actually changed significantly (avoid unnecessary updates)
    const heightDifference = Math.abs(constrainedHeight - this.currentHeight);
    if (heightDifference < 10) {
      this.log('Height change too small, ignoring:', heightDifference);
      return;
    }

    // Update dimensions
    this.currentHeight = constrainedHeight;
    this.currentWidth = constrainedWidth;

    // Debounced update
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateIframeHeight(constrainedHeight, constrainedWidth);
      this.callbacks.onResize?.(constrainedHeight, constrainedWidth);
      this.callbacks.onMessage?.(message);
    }, this.config.debounceDelay);
  }

  /**
   * Update the iframe height and width
   */
  private updateIframeHeight(height: number, width?: number): void {
    if (!this.iframeElement) {
      this.log('No iframe element available for height update');
      return;
    }

    this.log(`Updating iframe height to ${height}px` + (width ? `, width to ${width}px` : ''));

    // Apply the height
    this.iframeElement.style.height = `${height}px`;

    // Apply width if provided
    if (width && width > 0) {
      this.iframeElement.style.width = '100%'; // Keep responsive width
    }

    // Add smooth transition if enabled
    if (this.config.enableSmoothResize) {
      this.iframeElement.style.transition = 'height 0.3s ease-in-out';
    }

    // Update iframe attributes for better compatibility
    this.iframeElement.setAttribute('height', height.toString());
    if (width) {
      this.iframeElement.setAttribute('width', '100%');
    }
  }

  /**
   * Setup viewport-based fallback for height calculation
   */
  private setupViewportFallback(): void {
    const calculateFallbackHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80; // Navigation height
      const heroHeight = 384; // Hero section height
      const availableHeight = viewportHeight - headerHeight - heroHeight;

      // For mobile devices, use more conservative height
      if (window.innerWidth < 768) {
        return Math.max(600, availableHeight * 0.8);
      }

      // For desktop, provide generous height
      return Math.max(800, availableHeight * 1.2);
    };

    // Set initial fallback height
    const fallbackHeight = calculateFallbackHeight();
    if (this.currentHeight === this.config.fallbackHeight) {
      this.updateIframeHeight(fallbackHeight);
      this.currentHeight = fallbackHeight;
    }

    // Listen for window resize for fallback adjustments
    const handleWindowResize = () => {
      // Only use fallback if we haven't received proper height messages recently
      const timeSinceLastUpdate = Date.now() - (this.getLastUpdateTime() || 0);
      if (timeSinceLastUpdate > 5000) { // 5 seconds
        const newFallbackHeight = calculateFallbackHeight();
        this.updateIframeHeight(newFallbackHeight);
        this.currentHeight = newFallbackHeight;
        this.log('Applied fallback height due to lack of messages:', newFallbackHeight);
      }
    };

    window.addEventListener('resize', handleWindowResize);
  }

  /**
   * Check if the message origin is valid
   */
  private isValidOrigin(origin: string): boolean {
    // Allow localhost for development
    if (origin === 'null' || origin.includes('localhost')) {
      return true;
    }

    // Check against allowed origins
    return this.config.allowedOrigins.some(allowedOrigin =>
      origin === allowedOrigin || origin.endsWith(allowedOrigin)
    );
  }

  /**
   * Get timestamp of last height update (for fallback logic)
   */
  private getLastUpdateTime(): number | null {
    // This could be enhanced to track actual update times
    return Date.now(); // Simplified for now
  }

  /**
   * Log messages if debug is enabled
   */
  private log(...args: unknown[]): void {
    if (this.config.debug) {
      console.log('[IframeResizer]', ...args);
    }
  }
}

/**
 * React hook for easily using the iframe resizer
 */
export function useIframeResizer(
  config: Partial<IframeResizerConfig> = {},
  callbacks: IframeResizerCallbacks = {}
) {
  const [resizer] = useState(() => new IframeResizer(config, callbacks));
  const [height, setHeight] = useState(config.fallbackHeight || 800);
  const [width, setWidth] = useState(800);

  useEffect(() => {
    // Enhanced callbacks to update state
    const enhancedCallbacks: IframeResizerCallbacks = {
      ...callbacks,
      onResize: (newHeight, newWidth) => {
        setHeight(newHeight);
        setWidth(newWidth);
        callbacks.onResize?.(newHeight, newWidth);
      }
    };

    // Update resizer callbacks
    resizer['callbacks'] = enhancedCallbacks;

    return () => {
      resizer.destroy();
    };
  }, [resizer, callbacks]);

  const initializeResizer = useCallback((iframe: HTMLIFrameElement) => {
    resizer.initialize(iframe);
  }, [resizer]);

  return {
    initializeResizer,
    height,
    width,
    setHeight: (newHeight: number) => resizer.setHeight(newHeight),
    getCurrentHeight: () => resizer.getCurrentHeight(),
    getCurrentWidth: () => resizer.getCurrentWidth()
  };
}

// Types are already exported above, no need to re-export

// Import React hooks
import { useState, useEffect, useCallback } from 'react';