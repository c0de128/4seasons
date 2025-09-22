// Google Analytics 4 and Search Console Integration

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

interface AnalyticsConfig {
  gaTrackingId: string;
  searchConsoleId?: string;
  debug?: boolean;
}

interface PageViewData {
  page_title?: string;
  page_location?: string;
  page_path?: string;
}

interface EventData {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private config: AnalyticsConfig;
  private isInitialized = false;
  private webVitalsStarted = false;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  // Initialize Google Analytics
  init(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Skip initialization if no valid tracking ID
    if (!this.config.gaTrackingId || this.config.gaTrackingId === 'GA_MEASUREMENT_ID_NOT_SET') {
      // Only log in development if explicitly requested
      if (this.config.debug && import.meta.env.VITE_ENABLE_ANALYTICS_LOGS === 'true') {
        console.info('Analytics initialization skipped: No valid GA tracking ID found');
      }
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.gaTrackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configure Google Analytics
    window.gtag('js', new Date().toISOString());
    window.gtag('config', this.config.gaTrackingId, {
      page_title: document.title,
      page_location: window.location.href,
      // Enhanced ecommerce for real estate tracking
      custom_map: {
        'custom_parameter_1': 'property_type',
        'custom_parameter_2': 'property_price',
        'custom_parameter_3': 'city_name'
      },
      // Core Web Vitals tracking
      send_page_view: false // We'll send manually with additional data
    });

    this.isInitialized = true;

    if (this.config.debug) {
      console.log('Analytics initialized with tracking ID:', this.config.gaTrackingId);
    }
  }

  // Track page views with enhanced real estate data
  trackPageView(data: PageViewData = {}): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    const pageData = {
      page_title: data.page_title || document.title,
      page_location: data.page_location || window.location.href,
      page_path: data.page_path || window.location.pathname,
      // Add real estate specific parameters
      content_group1: this.getCityFromPath(window.location.pathname),
      content_group2: this.getPageTypeFromPath(window.location.pathname),
      custom_parameter_1: this.extractPropertyType(window.location.pathname)
    };

    window.gtag('config', this.config.gaTrackingId, pageData);

    if (this.config.debug) {
      console.log('Page view tracked:', pageData);
    }
  }

  // Track custom events (form submissions, clicks, etc.)
  trackEvent(eventData: EventData): void {
    if (!this.isInitialized || typeof window === 'undefined') return;

    window.gtag('event', eventData.action, {
      event_category: eventData.category,
      event_label: eventData.label,
      value: eventData.value,
      ...eventData.custom_parameters
    });

    if (this.config.debug) {
      console.log('Event tracked:', eventData);
    }
  }

  // Track real estate specific events
  trackRealEstateEvent(eventType: 'property_view' | 'contact_form' | 'phone_click' | 'email_click' | 'search' | 'filter', data: Record<string, any> = {}): void {
    const eventMapping = {
      property_view: { action: 'view_property', category: 'Real Estate' },
      contact_form: { action: 'submit_form', category: 'Lead Generation' },
      phone_click: { action: 'click_phone', category: 'Contact' },
      email_click: { action: 'click_email', category: 'Contact' },
      search: { action: 'search', category: 'Property Search' },
      filter: { action: 'filter_properties', category: 'Property Search' }
    };

    const eventConfig = eventMapping[eventType];
    
    this.trackEvent({
      ...eventConfig,
      custom_parameters: {
        ...data,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        page_path: window.location.pathname
      }
    });
  }

  // Track Core Web Vitals for SEO
  trackWebVitals(): void {
    if (!this.isInitialized || typeof window === 'undefined' || this.webVitalsStarted) return;

    this.webVitalsStarted = true;

    // Import Web Vitals dynamically to avoid bundle bloat
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      // Add error handling for each metric
      const handleMetric = (metricName: string, metricHandler: Function) => {
        try {
          metricHandler((metric: any) => {
            if (this.isInitialized && window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: metricName,
                value: Math.round(metric.value * (metricName === 'CLS' ? 1000 : 1)),
                custom_parameter_1: metricName.toLowerCase().replace(/([A-Z])/g, '_$1'),
                page_path: window.location.pathname,
                device_type: this.getDeviceType(),
                connection_type: this.getConnectionType()
              });
            }
          });
        } catch (error) {
          if (this.config.debug) {
            console.warn(`Error tracking ${metricName}:`, error);
          }
        }
      };

      handleMetric('CLS', onCLS);
      handleMetric('FID', onFID);
      handleMetric('FCP', onFCP);
      handleMetric('LCP', onLCP);
      handleMetric('TTFB', onTTFB);
    }).catch(() => {
      // Web Vitals library not available, skip tracking
      if (this.config.debug) {
        console.log('Web Vitals library not available');
      }
    });
  }

  // Helper functions to extract meaningful data from URLs
  private getCityFromPath(path: string): string {
    const cityGuideMatch = path.match(/\/([^\/]+)-city-guide/);
    if (cityGuideMatch) {
      return cityGuideMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    const cityMatch = path.match(/\/city-guides\/([^\/]+)/);
    if (cityMatch) {
      return cityMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    return 'Unknown';
  }

  private getPageTypeFromPath(path: string): string {
    if (path.includes('city-guide')) return 'City Guide';
    if (path.includes('blog')) return 'Blog';
    if (path === '/') return 'Homepage';
    if (path.includes('buy')) return 'Buy';
    if (path.includes('sell')) return 'Sell';
    if (path.includes('about')) return 'About';
    if (path.includes('contact')) return 'Contact';
    return 'Other';
  }

  private extractPropertyType(path: string): string {
    // This would be enhanced based on actual property types in the system
    if (path.includes('luxury')) return 'Luxury';
    if (path.includes('townhome')) return 'Townhome';
    if (path.includes('condo')) return 'Condo';
    return 'Single Family';
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'Unknown';

    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'Tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'Mobile';
    }
    return 'Desktop';
  }

  private getConnectionType(): string {
    if (typeof window === 'undefined' || !('connection' in navigator)) return 'Unknown';

    const connection = (navigator as any).connection;
    if (connection) {
      return connection.effectiveType || connection.type || 'Unknown';
    }
    return 'Unknown';
  }
}

// Validate environment variables and create analytics instance
const getAnalyticsConfig = (): AnalyticsConfig => {
  const gaTrackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const searchConsoleId = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION;
  const isDevelopment = import.meta.env.DEV;

  // Validate tracking ID format
  if (gaTrackingId && !gaTrackingId.startsWith('G-')) {
    console.warn('Invalid GA4 tracking ID format. Expected format: G-XXXXXXXXXX');
  }

  return {
    gaTrackingId: gaTrackingId || 'GA_MEASUREMENT_ID_NOT_SET',
    searchConsoleId,
    debug: isDevelopment || false
  };
};

// Create and export the analytics instance
const analytics = new Analytics(getAnalyticsConfig());

// React hook for easy analytics usage
export function useAnalytics() {
  return {
    init: () => analytics.init(),
    trackPageView: (data?: PageViewData) => analytics.trackPageView(data),
    trackEvent: (data: EventData) => analytics.trackEvent(data),
    trackRealEstateEvent: (eventType: 'property_view' | 'contact_form' | 'phone_click' | 'email_click' | 'search' | 'filter', data?: Record<string, any>) => 
      analytics.trackRealEstateEvent(eventType, data),
    trackWebVitals: () => analytics.trackWebVitals()
  };
}

// Convenience functions for common tracking scenarios
export const trackCityGuideView = (cityName: string) => {
  analytics.trackRealEstateEvent('property_view', {
    city_name: cityName,
    content_type: 'city_guide',
    page_type: 'city_guide'
  });
};

export const trackContactFormSubmission = (formType: string, cityName?: string) => {
  analytics.trackRealEstateEvent('contact_form', {
    form_type: formType,
    city_name: cityName,
    lead_source: 'website'
  });
};

export const trackPhoneClick = (phoneNumber: string, location: string) => {
  analytics.trackRealEstateEvent('phone_click', {
    phone_number: phoneNumber,
    click_location: location
  });
};

export default analytics;