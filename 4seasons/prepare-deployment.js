#!/usr/bin/env node

/**
 * Deployment Preparation Script for 4 Seasons Real Estate
 * Prepares the application for GoDaddy deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeploymentPreparator {
  constructor() {
    this.deploymentDir = path.resolve(__dirname, 'deployment-package');
    this.errors = [];
    this.step = 0;
  }

  logStep(message) {
    this.step++;
    console.log(`${this.step.toString().padStart(2)}. ${message}`);
  }

  async prepare() {
    console.log('🏠 4 Seasons Real Estate - Deployment Preparation');
    console.log('=' .repeat(60));
    console.log('📦 Preparing application for GoDaddy deployment...\n');

    try {
      // Step 1: Clean and create deployment directory
      this.logStep('Creating deployment package directory...');
      if (fs.existsSync(this.deploymentDir)) {
        fs.rmSync(this.deploymentDir, { recursive: true, force: true });
      }
      fs.mkdirSync(this.deploymentDir, { recursive: true });
      console.log(`    ✅ Created: ${this.deploymentDir}`);

      // Step 2: Run build
      this.logStep('Building application...');
      try {
        execSync('npm run build', { 
          stdio: 'pipe', 
          cwd: __dirname,
          encoding: 'utf8'
        });
        console.log('    ✅ Build completed successfully');
      } catch (error) {
        throw new Error(`Build failed: ${error.message}`);
      }

      // Step 3: Verify build
      this.logStep('Verifying build...');
      try {
        execSync('node verify-build.js', { 
          stdio: 'pipe', 
          cwd: __dirname,
          encoding: 'utf8'
        });
        console.log('    ✅ Build verification passed');
      } catch (error) {
        console.log('    ⚠️  Build verification had issues, continuing...');
      }

      // Step 4: Copy essential files
      this.logStep('Copying essential files...');
      const essentialFiles = [
        'package.json',
        'package-lock.json',
        'start-godaddy.js',
        '.env.godaddy.example',
        'GODADDY_DEPLOYMENT.md'
      ];

      essentialFiles.forEach(file => {
        const srcPath = path.resolve(__dirname, file);
        const destPath = path.resolve(this.deploymentDir, file);
        
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`    ✅ Copied: ${file}`);
        } else {
          console.log(`    ⚠️  Missing: ${file}`);
        }
      });

      // Step 5: Copy server directory
      this.logStep('Copying server files...');
      const serverSrcDir = path.resolve(__dirname, 'server');
      const serverDestDir = path.resolve(this.deploymentDir, 'server');
      
      if (fs.existsSync(serverSrcDir)) {
        this.copyDirectory(serverSrcDir, serverDestDir);
        console.log('    ✅ Server files copied');
      } else {
        throw new Error('Server directory not found');
      }

      // Step 6: Copy shared directory if it exists
      this.logStep('Copying shared files...');
      const sharedSrcDir = path.resolve(__dirname, 'shared');
      const sharedDestDir = path.resolve(this.deploymentDir, 'shared');
      
      if (fs.existsSync(sharedSrcDir)) {
        this.copyDirectory(sharedSrcDir, sharedDestDir);
        console.log('    ✅ Shared files copied');
      } else {
        console.log('    ℹ️  No shared directory found');
      }

      // Step 7: Generate production environment
      this.logStep('Generating production environment...');
      try {
        execSync('npm run generate-secrets', { 
          stdio: 'pipe', 
          cwd: __dirname,
          encoding: 'utf8'
        });
        
        // Copy generated .env.production to deployment package
        const envProdSrc = path.resolve(__dirname, '.env.production');
        const envProdDest = path.resolve(this.deploymentDir, '.env.production');
        
        if (fs.existsSync(envProdSrc)) {
          fs.copyFileSync(envProdSrc, envProdDest);
          console.log('    ✅ Production environment generated and copied');
        }
      } catch (error) {
        console.log('    ⚠️  Could not generate production environment');
      }

      // Step 8: Create deployment instructions
      this.logStep('Creating deployment instructions...');
      this.createDeploymentInstructions();
      console.log('    ✅ Deployment instructions created');

      // Step 9: Create upload structure info
      this.logStep('Analyzing deployment package...');
      this.analyzePackage();

      // Step 10: Success message
      this.printSuccess();

    } catch (error) {
      console.error(`\n❌ Deployment preparation failed: ${error.message}`);
      process.exit(1);
    }
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  createDeploymentInstructions() {
    const instructions = `# 🚀 GoDaddy Deployment Instructions

Generated on: ${new Date().toISOString()}

## 📁 Package Contents

This deployment package contains everything needed to deploy the 4 Seasons Real Estate application to GoDaddy hosting.

## 🔧 Pre-Deployment Setup

1. **Configure Environment Variables**
   - Copy \`.env.production\` to \`.env\` on your GoDaddy server
   - Update email credentials in the \`.env\` file:
     - SMTP_USER=your-email@yourdomain.com
     - SMTP_PASS=your-email-password
     - CONTACT_EMAIL=your-email@yourdomain.com

2. **Verify Domain Configuration**
   - Ensure your domain points to your GoDaddy hosting account
   - SSL certificate should be installed and active

## 📤 Upload Instructions

1. **Upload Method 1: FTP/SFTP**
   - Connect to your GoDaddy hosting account via FTP
   - Upload all files to your domain's root directory (usually public_html)
   - Ensure file permissions: 755 for directories, 644 for files

2. **Upload Method 2: GoDaddy File Manager**
   - Log into GoDaddy control panel → Web Hosting → Manage
   - Open File Manager
   - Upload and extract all files to your domain's root

## ⚙️ Server Configuration

1. **Set Node.js Version**
   - In GoDaddy control panel: Software → Select Node.js Version
   - Choose Node.js 18.x or higher
   - Set startup file: \`start-godaddy.js\`

2. **Install Dependencies**
   - If SSH access: \`npm install --production\`
   - Otherwise: Upload node_modules folder via FTP

## 🚀 Launch Application

1. **Start the Application**
   - GoDaddy will automatically run: \`node start-godaddy.js\`
   - Or manually execute: \`npm run start:godaddy\`

2. **Test Your Deployment**
   - Visit: https://yourdomain.com
   - Test forms: Contact, Property Inquiry, Home Valuation
   - Check email delivery

## 🔍 Troubleshooting

- **Application won't start**: Check Node.js version and startup file
- **Forms not working**: Verify SMTP credentials in .env file  
- **Static files missing**: Ensure server/public directory was uploaded
- **500 errors**: Check server logs in GoDaddy control panel

## 📞 Support

- GoDaddy Support: Available 24/7 via phone/chat
- Application logs: Check /logs directory on server
- Deployment guide: GODADDY_DEPLOYMENT.md

---
Generated by 4 Seasons Real Estate deployment preparation tool
`;

    fs.writeFileSync(
      path.resolve(this.deploymentDir, 'DEPLOYMENT_INSTRUCTIONS.md'), 
      instructions
    );
  }

  analyzePackage() {
    const stats = this.getDirectoryStats(this.deploymentDir);
    console.log('\n📊 Package Analysis:');
    console.log(`    Files: ${stats.files}`);
    console.log(`    Directories: ${stats.directories}`);
    console.log(`    Total size: ${this.formatBytes(stats.size)}`);
    
    // Check critical files
    const criticalFiles = [
      'package.json',
      'start-godaddy.js', 
      '.env.production',
      'server/dist/index.js',
      'server/public/index.html'
    ];

    console.log('\n🔍 Critical Files Check:');
    criticalFiles.forEach(file => {
      const filePath = path.resolve(this.deploymentDir, file);
      const exists = fs.existsSync(filePath);
      const status = exists ? '✅' : '❌';
      console.log(`    ${status} ${file}`);
    });
  }

  getDirectoryStats(dir) {
    let stats = { files: 0, directories: 0, size: 0 };
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        stats.directories++;
        const subStats = this.getDirectoryStats(fullPath);
        stats.files += subStats.files;
        stats.directories += subStats.directories;
        stats.size += subStats.size;
      } else {
        stats.files++;
        stats.size += fs.statSync(fullPath).size;
      }
    }
    
    return stats;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  printSuccess() {
    console.log('\n' + '=' .repeat(60));
    console.log('🎉 DEPLOYMENT PREPARATION COMPLETE!');
    console.log('=' .repeat(60));
    console.log(`📦 Package location: ${this.deploymentDir}`);
    console.log('📋 Next steps:');
    console.log('1. Review DEPLOYMENT_INSTRUCTIONS.md');
    console.log('2. Update .env.production with your GoDaddy email credentials');
    console.log('3. Upload the entire deployment-package contents to your GoDaddy hosting');
    console.log('4. Configure Node.js startup file in GoDaddy control panel');
    console.log('5. Test your deployment!');
    console.log('\n🏡 Your 4 Seasons Real Estate website is ready for GoDaddy! ✨');
  }
}

// Run preparation
const preparator = new DeploymentPreparator();
preparator.prepare();