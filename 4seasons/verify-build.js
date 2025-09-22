#!/usr/bin/env node

/**
 * Build Verification Script for 4 Seasons Real Estate
 * Verifies that the build is ready for GoDaddy deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BuildVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.checks = 0;
    this.passed = 0;
  }

  check(name, condition, message, isWarning = false) {
    this.checks++;
    console.log(`${this.checks.toString().padStart(2)}. Checking ${name}...`);
    
    if (condition) {
      console.log(`    ✅ ${name} - OK`);
      this.passed++;
      return true;
    } else {
      const symbol = isWarning ? '⚠️ ' : '❌';
      const level = isWarning ? 'WARNING' : 'ERROR';
      console.log(`    ${symbol} ${name} - ${level}: ${message}`);
      
      if (isWarning) {
        this.warnings.push({ check: name, message });
      } else {
        this.errors.push({ check: name, message });
      }
      return false;
    }
  }

  fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  }

  directoryExists(dirPath) {
    try {
      return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    } catch {
      return false;
    }
  }

  fileSize(filePath) {
    try {
      return fs.statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  countFiles(dirPath, extension = '') {
    try {
      if (!fs.existsSync(dirPath)) return 0;
      const files = fs.readdirSync(dirPath);
      return files.filter(file => 
        extension ? file.endsWith(extension) : true
      ).length;
    } catch {
      return 0;
    }
  }

  async runVerification() {
    console.log('🏠 4 Seasons Real Estate - Build Verification');
    console.log('=' .repeat(60));
    console.log('🔍 Verifying build is ready for GoDaddy deployment...\n');

    // 1. Check server build
    const serverDistPath = path.resolve(__dirname, 'server', 'dist', 'index.js');
    this.check(
      'Server Build',
      this.fileExists(serverDistPath),
      'Server build file not found. Run "npm run build" first.'
    );

    // 2. Check server build size (reasonable size check)
    const serverSize = this.fileSize(serverDistPath);
    this.check(
      'Server Build Size',
      serverSize > 1000 && serverSize < 10 * 1024 * 1024, // Between 1KB and 10MB
      `Server build size seems unusual: ${Math.round(serverSize / 1024)}KB`
    );

    // 3. Check client build directory
    const clientDistPath = path.resolve(__dirname, 'server', 'public');
    this.check(
      'Client Build Directory',
      this.directoryExists(clientDistPath),
      'Client build directory not found. Run "npm run build" first.'
    );

    // 4. Check client HTML file
    const indexHtmlPath = path.resolve(clientDistPath, 'index.html');
    this.check(
      'Client HTML File',
      this.fileExists(indexHtmlPath),
      'Client index.html not found in build output.'
    );

    // 5. Check for client assets
    const assetsPath = path.resolve(clientDistPath, 'assets');
    const assetCount = this.countFiles(assetsPath);
    this.check(
      'Client Assets',
      assetCount > 0,
      'No client assets found. Build may be incomplete.'
    );

    // 6. Check for JavaScript bundles
    const jsCount = this.countFiles(assetsPath, '.js');
    this.check(
      'JavaScript Bundles',
      jsCount > 0,
      'No JavaScript bundles found in assets.'
    );

    // 7. Check for CSS files
    const cssCount = this.countFiles(assetsPath, '.css');
    this.check(
      'CSS Bundles',
      cssCount > 0,
      'No CSS bundles found in assets.',
      true // Warning only
    );

    // 8. Check package.json exists
    const packageJsonPath = path.resolve(__dirname, 'package.json');
    this.check(
      'Package.json',
      this.fileExists(packageJsonPath),
      'Package.json file not found.'
    );

    // 9. Check GoDaddy startup script
    const startupScriptPath = path.resolve(__dirname, 'start-godaddy.js');
    this.check(
      'GoDaddy Startup Script',
      this.fileExists(startupScriptPath),
      'GoDaddy startup script not found.'
    );

    // 10. Check environment example file
    const envExamplePath = path.resolve(__dirname, '.env.godaddy.example');
    this.check(
      'Environment Example',
      this.fileExists(envExamplePath),
      'GoDaddy environment example file not found.'
    );

    // 11. Check deployment guide
    const deploymentGuidePath = path.resolve(__dirname, 'GODADDY_DEPLOYMENT.md');
    this.check(
      'Deployment Guide',
      this.fileExists(deploymentGuidePath),
      'GoDaddy deployment guide not found.',
      true // Warning only
    );

    // 12. Check robots.txt
    const robotsPath = path.resolve(clientDistPath, 'robots.txt');
    this.check(
      'Robots.txt',
      this.fileExists(robotsPath),
      'robots.txt not found - SEO may be affected.',
      true // Warning only
    );

    // 13. Check sitemap
    const sitemapPath = path.resolve(clientDistPath, 'sitemap.xml');
    this.check(
      'Sitemap',
      this.fileExists(sitemapPath),
      'sitemap.xml not found - SEO may be affected.',
      true // Warning only
    );

    // 14. Check for critical security files
    const serverSecurityPaths = [
      'server/middleware/security.middleware.ts',
      'server/middleware/session.middleware.ts',
      'server/auth.ts'
    ];
    
    let securityFilesFound = 0;
    serverSecurityPaths.forEach(relativePath => {
      if (this.fileExists(path.resolve(__dirname, relativePath))) {
        securityFilesFound++;
      }
    });
    
    this.check(
      'Security Implementation',
      securityFilesFound === serverSecurityPaths.length,
      'Some security implementation files are missing.'
    );

    // Print summary
    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '=' .repeat(60));
    console.log('📊 VERIFICATION SUMMARY');
    console.log('=' .repeat(60));
    
    console.log(`Total checks: ${this.checks}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}`);

    if (this.errors.length === 0) {
      console.log('\n🎉 BUILD VERIFICATION PASSED!');
      console.log('✅ Your build is ready for GoDaddy deployment.');
      
      if (this.warnings.length > 0) {
        console.log('\n⚠️  Warnings (optional improvements):');
        this.warnings.forEach((warning, index) => {
          console.log(`${index + 1}. ${warning.check}: ${warning.message}`);
        });
      }
      
      console.log('\n📋 Next Steps:');
      console.log('1. Generate production secrets: npm run generate-secrets');
      console.log('2. Copy .env.production to your GoDaddy server as .env');
      console.log('3. Upload your project files to GoDaddy');
      console.log('4. Run: npm install --production');
      console.log('5. Start the server: npm run start:godaddy');
      
    } else {
      console.log('\n❌ BUILD VERIFICATION FAILED!');
      console.log('The following issues must be resolved:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.check}: ${error.message}`);
      });
      
      console.log('\n🔧 Run "npm run build" and try again.');
      process.exit(1);
    }
  }
}

// Run verification
const verifier = new BuildVerifier();
verifier.runVerification();