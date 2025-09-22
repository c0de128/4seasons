/**
 * Client-side logging utility
 * Replaces console.log statements with proper logging that can be controlled by environment
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  source?: string;
}

class ClientLogger {
  private isDevelopment = import.meta.env.DEV;
  private enabledLevels: Set<LogLevel> = new Set(['error', 'warn']);

  constructor() {
    // In development, enable all log levels
    if (this.isDevelopment) {
      this.enabledLevels.add('info');
      this.enabledLevels.add('debug');
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return this.enabledLevels.has(level);
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const contextStr = entry.context ? ` ${JSON.stringify(entry.context)}` : '';
    const sourceStr = entry.source ? ` [${entry.source}]` : '';
    return `${timestamp} ${entry.level.toUpperCase()}${sourceStr}: ${entry.message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, source?: string) {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
      source
    };

    // In production, we might want to send logs to a service
    // For now, only log to console in development or for errors/warnings
    if (this.isDevelopment || level === 'error' || level === 'warn') {
      const formatted = this.formatMessage(entry);

      switch (level) {
        case 'error':
          // eslint-disable-next-line no-console
          console.error(formatted);
          break;
        case 'warn':
          // eslint-disable-next-line no-console
          console.warn(formatted);
          break;
        case 'info':
          // eslint-disable-next-line no-console
          console.info(formatted);
          break;
        case 'debug':
          // eslint-disable-next-line no-console
          console.debug(formatted);
          break;
      }
    }

    // In production, send critical errors to monitoring service
    if (!this.isDevelopment && level === 'error') {
      this.sendToMonitoring(entry);
    }
  }

  private sendToMonitoring(entry: LogEntry) {
    // TODO: Implement error reporting service integration
    // This could send to Sentry, LogRocket, etc.
    try {
      // Example: Send to error tracking service
      // errorTracker.captureException(new Error(entry.message), entry.context);
    } catch (error) {
      // Fail silently to avoid infinite loops
    }
  }

  debug(message: string, context?: Record<string, any>, source?: string) {
    this.log('debug', message, context, source);
  }

  info(message: string, context?: Record<string, any>, source?: string) {
    this.log('info', message, context, source);
  }

  warn(message: string, context?: Record<string, any>, source?: string) {
    this.log('warn', message, context, source);
  }

  error(message: string, context?: Record<string, any>, source?: string) {
    this.log('error', message, context, source);
  }

  // Service Worker specific logging
  serviceWorker = {
    info: (message: string, context?: Record<string, any>) => {
      this.info(message, context, 'ServiceWorker');
    },
    error: (message: string, error?: Error, context?: Record<string, any>) => {
      this.error(message, { ...context, error: error?.message, stack: error?.stack }, 'ServiceWorker');
    }
  };

  // Analytics specific logging
  analytics = {
    info: (message: string, context?: Record<string, any>) => {
      this.info(message, context, 'Analytics');
    },
    error: (message: string, error?: Error, context?: Record<string, any>) => {
      this.error(message, { ...context, error: error?.message }, 'Analytics');
    }
  };
}

// Export singleton instance
export const logger = new ClientLogger();

// Development helper to override log levels
if (import.meta.env.DEV) {
  (window as any).setLogLevel = (levels: LogLevel[]) => {
    (logger as any).enabledLevels = new Set(levels);
  };
}