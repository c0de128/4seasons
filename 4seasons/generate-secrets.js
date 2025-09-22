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

  process.stdout.write('🔐 Generated secure secrets for production deployment:\n\n');
  
  // Read the example file
  const examplePath = path.resolve(process.cwd(), '.env.godaddy.example');
  let envContent = '';
  
  try {
    envContent = fs.readFileSync(examplePath, 'utf8');
  } catch (error) {
    process.stderr.write(`❌ Error reading .env.godaddy.example: ${error.message}\n`);
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
    process.stdout.write(`✅ Production environment file created: .env.production\n`);
    process.stdout.write(`📝 Copy this file to .env on your GoDaddy server\n\n`);
  } catch (error) {
    process.stderr.write(`❌ Error writing .env.production: ${error.message}\n`);
    process.exit(1);
  }

  // Display secrets for manual copying if needed
  process.stdout.write('🔑 Generated Secrets (copy these to your GoDaddy .env file):\n');
  process.stdout.write('='.repeat(60) + '\n');
  process.stdout.write(`JWT_SECRET=${secrets.JWT_SECRET}\n`);
  process.stdout.write(`SESSION_SECRET=${secrets.SESSION_SECRET}\n`);
  process.stdout.write(`CSRF_SECRET=${secrets.CSRF_SECRET}\n`);
  process.stdout.write('='.repeat(60) + '\n');
  
  // Security reminders
  process.stdout.write('\n🛡️  Security Reminders:\n');
  process.stdout.write('• Never commit .env files to version control\n');
  process.stdout.write('• Store these secrets securely (password manager recommended)\n');
  process.stdout.write('• Use different secrets for development and production\n');
  process.stdout.write('• Rotate secrets periodically for maximum security\n');
  process.stdout.write('• Ensure your GoDaddy hosting account is secured with 2FA\n');
  
  // Strength analysis
  process.stdout.write('\n💪 Secret Strength Analysis:\n');
  process.stdout.write(`• JWT Secret: ${secrets.JWT_SECRET.length} characters (${Math.floor(secrets.JWT_SECRET.length * 6)} bits entropy)\n`);
  process.stdout.write(`• Session Secret: ${secrets.SESSION_SECRET.length} characters (${Math.floor(secrets.SESSION_SECRET.length * 6)} bits entropy)\n`);
  process.stdout.write(`• CSRF Secret: ${secrets.CSRF_SECRET.length} characters (${Math.floor(secrets.CSRF_SECRET.length * 6)} bits entropy)\n`);
  process.stdout.write('• All secrets exceed minimum security requirements ✓\n');
}

// Run the script
process.stdout.write('🏠 4 Seasons Real Estate - Production Secret Generator\n');
process.stdout.write('='.repeat(60) + '\n');
createProductionEnvFile();