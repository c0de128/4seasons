// CSRF Token Management Utility
export class CSRFManager {
  private static instance: CSRFManager;
  private token: string | null = null;
  private headerName: string = 'x-csrf-token';
  private cookieName: string = 'csrf-token';

  private constructor() {
    // Initialize token from cookie if available
    this.token = this.getTokenFromCookie();
  }

  public static getInstance(): CSRFManager {
    if (!CSRFManager.instance) {
      CSRFManager.instance = new CSRFManager();
    }
    return CSRFManager.instance;
  }

  /**
   * Get CSRF token from cookie
   */
  private getTokenFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  /**
   * Fetch CSRF token from server
   */
  public async fetchToken(): Promise<string> {
    try {
      const response = await fetch('/api/csrf-token', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.status}`);
      }

      const data = await response.json();
      
      this.token = data.csrfToken;
      this.headerName = data.headerName || this.headerName;
      this.cookieName = data.cookieName || this.cookieName;

      return this.token;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      throw error;
    }
  }

  /**
   * Get current token (fetch if not available)
   */
  public async getToken(): Promise<string> {
    if (!this.token) {
      await this.fetchToken();
    }
    
    if (!this.token) {
      throw new Error('CSRF token not available');
    }
    
    return this.token;
  }

  /**
   * Get token synchronously (returns null if not available)
   */
  public getTokenSync(): string | null {
    return this.token || this.getTokenFromCookie();
  }

  /**
   * Add CSRF token to fetch request headers
   */
  public async addToHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
    const token = await this.getToken();
    return {
      ...headers,
      [this.headerName]: token
    };
  }

  /**
   * Add CSRF token to FormData
   */
  public async addToFormData(formData: FormData): Promise<FormData> {
    const token = await this.getToken();
    formData.append('_csrf', token);
    return formData;
  }

  /**
   * Add CSRF token to URLSearchParams
   */
  public async addToSearchParams(params: URLSearchParams): Promise<URLSearchParams> {
    const token = await this.getToken();
    params.append('_csrf', token);
    return params;
  }

  /**
   * Create a secure fetch wrapper with CSRF protection
   */
  public async secureFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const method = (options.method || 'GET').toUpperCase();
    
    // Add CSRF token for protected methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      try {
        const token = await this.getToken();
        
        options.headers = {
          ...options.headers,
          [this.headerName]: token
        };
      } catch (error) {
        console.warn('Could not add CSRF token to request:', error);
      }
    }

    // Ensure credentials are included
    options.credentials = options.credentials || 'include';

    const response = await fetch(url, options);

    // If we get a CSRF error, try to refresh token and retry once
    if (response.status === 403) {
      const errorText = await response.clone().text();
      if (errorText.includes('CSRF') || errorText.includes('csrf')) {
        try {
          await this.fetchToken();
          
          // Retry with new token
          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            options.headers = {
              ...options.headers,
              [this.headerName]: this.token!
            };
          }
          
          return fetch(url, options);
        } catch (retryError) {
          console.error('Failed to retry request with new CSRF token:', retryError);
        }
      }
    }

    return response;
  }

  /**
   * Clear cached token (useful for logout)
   */
  public clearToken(): void {
    this.token = null;
    
    // Clear cookie
    document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  /**
   * Get header name for manual usage
   */
  public getHeaderName(): string {
    return this.headerName;
  }

  /**
   * Validate that we have a token
   */
  public hasValidToken(): boolean {
    return !!(this.token || this.getTokenFromCookie());
  }
}

// Export singleton instance
export const csrfManager = CSRFManager.getInstance();

// Utility functions for common use cases
export const getCSRFToken = () => csrfManager.getToken();
export const getCSRFTokenSync = () => csrfManager.getTokenSync();
export const secureFetch = (url: string, options?: RequestInit) => csrfManager.secureFetch(url, options);
export const addCSRFToHeaders = (headers?: Record<string, string>) => csrfManager.addToHeaders(headers);
export const addCSRFToFormData = (formData: FormData) => csrfManager.addToFormData(formData);
export const clearCSRFToken = () => csrfManager.clearToken();

// Default export for convenience
export default csrfManager;