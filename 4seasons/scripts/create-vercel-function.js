#!/usr/bin/env node
import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, copyFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Post-build: Move index.html from dist/client to dist root for Vercel SPA routing
console.log('📦 Fixing output structure for Vercel...');

try {
  const clientDir = join(projectRoot, 'dist', 'client');
  const distRoot = join(projectRoot, 'dist');

  if (existsSync(clientDir)) {
    // Move index.html to dist root
    const indexHtml = join(clientDir, 'index.html');
    if (existsSync(indexHtml)) {
      copyFileSync(indexHtml, join(distRoot, 'index.html'));
      console.log('✅ Moved index.html to dist root');
    }

    // Clean up empty client directory
    try {
      rmSync(clientDir, { recursive: true, force: true });
      console.log('✅ Cleaned up client subdirectory');
    } catch(e) {
      console.warn('⚠️  Could not remove client subdirectory:', e.message);
    }
  }
} catch(error) {
  console.error('❌ Failed to fix output structure:', error.message);
  process.exit(1);
}

console.log('🔧 Building server for Vercel...');

// Build the server TypeScript files using --packages=external to exclude all node_modules
try {
  execSync(`npx esbuild server/vercel.ts --platform=node --bundle --format=esm --outdir=server/dist --packages=external`,
    { cwd: projectRoot, stdio: 'inherit' });
  console.log('✅ Server code compiled');
} catch (error) {
  console.error('❌ Server compilation failed:', error.message);
  process.exit(1);
}

// Create api directory if it doesn't exist
const apiDir = join(projectRoot, 'api');
if (!existsSync(apiDir)) {
  mkdirSync(apiDir, { recursive: true });
}

// Create the Vercel serverless function
const functionCode = `// Vercel serverless function for the 4seasons real estate application
import { createServer } from '../server/dist/vercel.js';

let app;

export default async function handler(req, res) {
  try {
    // Initialize the app only once
    if (!app) {
      app = await createServer();
    }

    // Handle the request with the Express app
    return new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) {
          console.error('Express error:', err);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
          }
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Server initialization failed' });
    }
  }
}
`;

writeFileSync(join(apiDir, 'index.js'), functionCode);

console.log('✅ Vercel function created successfully');
console.log('📁 API function: api/index.js');
console.log('🚀 Server build: server/dist/vercel.js');