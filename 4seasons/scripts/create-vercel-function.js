#!/usr/bin/env node
import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('🔧 Building server for Vercel...');

// Build the server TypeScript files with proper externals
const externals = [
  '--external:@neondatabase/serverless',
  '--external:express',
  '--external:express-session',
  '--external:express-validator',
  '--external:express-rate-limit',
  '--external:connect-pg-simple',
  '--external:connect-redis',
  '--external:ioredis',
  '--external:redis',
  '--external:nodemailer',
  '--external:bcryptjs',
  '--external:better-sqlite3',
  '--external:drizzle-orm',
  '--external:drizzle-zod',
  '--external:zod',
  '--external:zod-validation-error',
  '--external:sharp',
  '--external:puppeteer',
  '--external:helmet',
  '--external:cors',
  '--external:compression',
  '--external:morgan',
  '--external:jsonwebtoken',
  '--external:passport',
  '--external:passport-local',
  '--external:multer',
  '--external:dotenv',
  '--external:ws',
  '--external:memorystore'
].join(' ');

try {
  execSync(`npx esbuild server/vercel.ts --platform=node --bundle --format=esm --outdir=server/dist --packages=external ${externals}`,
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