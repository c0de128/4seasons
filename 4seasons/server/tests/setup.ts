import { beforeAll, afterAll, vi } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';

// Mock console methods to avoid noise in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn()
};

// Global test setup
beforeAll(async () => {
  // Initialize test database connection if needed
  // Set up test fixtures
});

afterAll(async () => {
  // Cleanup test database
  // Close connections
  
  // Restore console
  global.console = originalConsole;
});

// Global test utilities
global.testUtils = {
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  generateTestEmail: () => `test${Date.now()}@example.com`,
  generateRandomString: (length = 10) => Math.random().toString(36).substring(2, length + 2)
};