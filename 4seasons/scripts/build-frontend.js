#!/usr/bin/env node

import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

console.log('Building frontend...');
console.log('Project root:', projectRoot);
console.log('Client root:', path.resolve(projectRoot, 'client'));
console.log('Output dir:', path.resolve(projectRoot, 'server/public'));

try {
  await build({
    root: path.resolve(projectRoot, 'client'),
    configFile: path.resolve(projectRoot, 'vite.config.ts'),
    build: {
      outDir: path.resolve(projectRoot, 'server/public'),
      emptyOutDir: true,
    }
  });
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Frontend build failed:', error);
  process.exit(1);
}