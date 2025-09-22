#!/usr/bin/env node

/**
 * GoDaddy-specific startup script for 4 Seasons Real Estate
 * This script optimizes the application for GoDaddy shared hosting environment
 */

// Set GoDaddy-specific environment variables
process.env.HOSTING_PROVIDER = 'godaddy';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// GoDaddy memory optimization
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --max-old-space-size=512';

// Disable features not supported on shared hosting
process.env.DISABLE_CLUSTER = 'true';
process.env.DISABLE_BACKUP_SCHEDULER = 'true';

// Set optimal timeouts for GoDaddy hosting
process.env.REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT || '30000';
process.env.KEEP_ALIVE_TIMEOUT = process.env.KEEP_ALIVE_TIMEOUT || '15000';

// Import and start the server
import('./server/dist/index.js').then(() => {
  console.log('🏠 4 Seasons Real Estate server started with GoDaddy optimizations');
}).catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});