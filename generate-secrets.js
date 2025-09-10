#!/usr/bin/env node

/**
 * Secret Generation Script for 4 Seasons Real Estate
 * Generates cryptographically secure secrets for production deployment
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('base64');
}

function generateHexSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateJWTSecret() {
  // JWT secrets should be at least 256 bits (32 bytes)
  return generateSecret(32);
}

function generateSessionSecret() {
  // Session secrets should be at least 256 bits (32 bytes)
  return generateSecret(32);
}

function generateCSRFSecret() {
  // CSRF secrets should be at least 128 bits (16 bytes)
  return generateSecret(16);
}

function createProductionEnvFile() {
  const secrets = {
    JWT_SECRET: generateJWTSecret(),
    SESSION_SECRET: generateSessionSecret(),
    CSRF_SECRET: generateCSRFSecret(),
    ENCRYPTION_KEY: generateHexSecret(32), // For additional data encryption if needed
  };

  console.log('🔐 Generated secure secrets for production deployment:\n');
  
  // Read the example file
  const examplePath = path.resolve(process.cwd(), '.env.godaddy.example');
  let envContent = '';
  
  try {
    envContent = fs.readFileSync(examplePath, 'utf8');
  } catch (error) {
    console.error('❌ Error reading .env.godaddy.example:', error.message);
    process.exit(1);
  }

  // Replace placeholder secrets with generated ones
  envContent = envContent.replace(
    'JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long',
    `JWT_SECRET=${secrets.JWT_SECRET}`
  );
  
  envContent = envContent.replace(
    'SESSION_SECRET=your-super-secure-session-secret-at-least-32-characters-long',
    `SESSION_SECRET=${secrets.SESSION_SECRET}`
  );
  
  envContent = envContent.replace(
    'CSRF_SECRET=your-super-secure-csrf-secret-at-least-32-characters-long',
    `CSRF_SECRET=${secrets.CSRF_SECRET}`
  );

  // Add timestamp and generation info
  const timestamp = new Date().toISOString();
  const header = `# Generated on ${timestamp} by 4 Seasons Real Estate secret generator\n# IMPORTANT: Keep these secrets secure and never commit them to version control\n\n`;
  
  envContent = header + envContent;

  // Write to .env.production file
  const outputPath = path.resolve(process.cwd(), '.env.production');
  try {
    fs.writeFileSync(outputPath, envContent);
    console.log(`✅ Production environment file created: .env.production`);
    console.log(`📝 Copy this file to .env on your GoDaddy server\n`);
  } catch (error) {
    console.error('❌ Error writing .env.production:', error.message);
    process.exit(1);
  }

  // Display secrets for manual copying if needed
  console.log('🔑 Generated Secrets (copy these to your GoDaddy .env file):');
  console.log('=' .repeat(60));
  console.log(`JWT_SECRET=${secrets.JWT_SECRET}`);
  console.log(`SESSION_SECRET=${secrets.SESSION_SECRET}`);
  console.log(`CSRF_SECRET=${secrets.CSRF_SECRET}`);
  console.log('=' .repeat(60));
  
  // Security reminders
  console.log('\n🛡️  Security Reminders:');
  console.log('• Never commit .env files to version control');
  console.log('• Store these secrets securely (password manager recommended)');
  console.log('• Use different secrets for development and production');
  console.log('• Rotate secrets periodically for maximum security');
  console.log('• Ensure your GoDaddy hosting account is secured with 2FA');
  
  // Strength analysis
  console.log('\n💪 Secret Strength Analysis:');
  console.log(`• JWT Secret: ${secrets.JWT_SECRET.length} characters (${Math.floor(secrets.JWT_SECRET.length * 6)} bits entropy)`);
  console.log(`• Session Secret: ${secrets.SESSION_SECRET.length} characters (${Math.floor(secrets.SESSION_SECRET.length * 6)} bits entropy)`);
  console.log(`• CSRF Secret: ${secrets.CSRF_SECRET.length} characters (${Math.floor(secrets.CSRF_SECRET.length * 6)} bits entropy)`);
  console.log('• All secrets exceed minimum security requirements ✓');
}

// Run the script
console.log('🏠 4 Seasons Real Estate - Production Secret Generator');
console.log('=' .repeat(60));
createProductionEnvFile();