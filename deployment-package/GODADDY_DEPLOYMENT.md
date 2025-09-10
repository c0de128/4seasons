# 🚀 GoDaddy Hosting Deployment Guide

This guide will help you deploy the 4 Seasons Real Estate application on GoDaddy hosting with full form functionality.

## 📋 Prerequisites

- GoDaddy hosting account with Node.js support
- Domain name configured with GoDaddy
- Email account set up with your domain
- FTP/SFTP access to your hosting account

## 🔧 Step 1: Prepare Your Environment

### 1.1 Copy Environment Variables
1. Copy `.env.godaddy.example` to `.env`
2. Update all values with your actual credentials:

```bash
cp .env.godaddy.example .env
```

### 1.2 Generate Secure Secrets
Generate strong secrets for your environment variables:

```bash
# Generate JWT Secret (32+ characters)
JWT_SECRET=$(openssl rand -base64 32)

# Generate Session Secret (32+ characters) 
SESSION_SECRET=$(openssl rand -base64 32)

# Generate CSRF Secret (32+ characters)
CSRF_SECRET=$(openssl rand -base64 32)
```

## 📧 Step 2: Configure Email (GoDaddy SMTP)

### 2.1 Get SMTP Credentials
1. Log into your GoDaddy hosting control panel
2. Navigate to "Email" → "Manage Email Accounts"
3. Create or use an existing email account (e.g., `contact@yourdomain.com`)
4. Get the SMTP settings:
   - **Host**: `smtpout.secureserver.net`
   - **Port**: `465` (SSL) or `587` (TLS)
   - **Username**: Your full email address
   - **Password**: Your email password

### 2.2 Update Environment Variables
```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=contact@yourdomain.com
SMTP_FROM_NAME=4 Seasons Real Estate

# Where form submissions will be sent
CONTACT_EMAIL=contact@yourdomain.com
AGENT_EMAIL=agent@yourdomain.com
```

## 🏗️ Step 3: Build the Application

### 3.1 Install Dependencies and Build
```bash
# Install dependencies
npm install

# Build the client application
npm run build

# Test the production build locally (optional)
npm run start
```

### 3.2 Verify Build Output
Ensure these directories exist after building:
- `dist/` - Server build output
- `server/public/` - Client build output

## 🌐 Step 4: Deploy to GoDaddy

### 4.1 File Upload Structure
Upload your files to GoDaddy with this structure:
```
your-domain.com/
├── .env                    # Your environment variables
├── package.json
├── package-lock.json
├── dist/                   # Server build files
├── server/                 # Server source files
│   ├── public/            # Client build files (from Vite)
│   ├── services/
│   ├── middleware/
│   ├── routes/
│   └── ...
├── node_modules/          # Dependencies
└── logs/                  # Log files (will be created)
```

### 4.2 Upload Methods

#### Option A: FTP/SFTP Upload
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your GoDaddy hosting account
3. Upload all files to your domain's root directory
4. Ensure file permissions are correct (755 for directories, 644 for files)

#### Option B: GoDaddy File Manager
1. Log into your GoDaddy control panel
2. Navigate to "Web Hosting" → "Manage"
3. Open "File Manager"
4. Upload and extract your files

### 4.3 Install Dependencies on Server
If your GoDaddy hosting supports SSH:
```bash
ssh your-username@your-domain.com
cd /public_html
npm install --production
```

Otherwise, upload the `node_modules` folder via FTP.

## ⚙️ Step 5: Configure GoDaddy Hosting

### 5.1 Set Node.js Version
1. In GoDaddy control panel, go to "Software" → "Select Node.js Version"
2. Choose Node.js 18.x or higher
3. Set the startup file to: `dist/index.js`

### 5.2 Configure Domain Redirects
1. Go to "Domains" → "Manage DNS"
2. Ensure your domain points to your hosting account
3. Set up any necessary redirects (www to non-www, etc.)

### 5.3 SSL Certificate
1. In GoDaddy control panel, go to "Security" → "SSL Certificates"
2. Install a free Let's Encrypt certificate or purchase one
3. Update your environment variables:
```env
NODE_ENV=production
```

## 🔍 Step 6: Test Your Forms

### 6.1 Test Email Configuration
1. Navigate to your website
2. Try accessing: `https://yourdomain.com/api/forms/test-email` (admin only)
3. Check if SMTP connection works

### 6.2 Test Form Submissions
1. **Contact Form**: Submit the main contact form
2. **Property Inquiry**: Test property inquiry submissions
3. **Home Valuation**: Submit a home valuation request
4. **Newsletter**: Test newsletter signup

### 6.3 Verify Email Delivery
- Check that emails are being sent to your specified addresses
- Verify that confirmation emails reach form submitters
- Test from different email providers (Gmail, Outlook, etc.)

## 📊 Step 7: Monitor and Maintain

### 7.1 Check Logs
Monitor your application logs:
```bash
# View recent logs
tail -f logs/combined.log

# View error logs
tail -f logs/error.log
```

### 7.2 Form Analytics
- Monitor form submission rates
- Track email delivery success rates
- Review error logs for issues

### 7.3 Regular Maintenance
- Keep dependencies updated
- Monitor disk space (logs and uploads)
- Backup your environment variables
- Test forms regularly

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### 1. Email Not Sending
```bash
# Check SMTP credentials
# Verify GoDaddy email account is active
# Test SMTP connection manually
```

#### 2. Forms Not Submitting
```bash
# Check CSRF token generation
# Verify API endpoints are accessible
# Check for CORS issues
```

#### 3. File Upload Issues
```bash
# Ensure uploads directory exists
# Check file permissions (755 for directories)
# Verify disk space availability
```

#### 4. Session Issues
```bash
# Check SESSION_SECRET is set
# Verify session middleware is loaded
# Test session persistence
```

### 7.4 Performance Optimization
1. **Enable Compression**: GoDaddy usually handles this automatically
2. **Static File Caching**: Configure browser caching for assets
3. **Database Optimization**: Consider migrating to PostgreSQL for better performance
4. **CDN Integration**: Use GoDaddy's CDN for static assets

## 📞 Support Resources

### GoDaddy Support
- **Phone**: Available 24/7
- **Chat**: Available through control panel
- **Help Center**: https://www.godaddy.com/help

### Application Support
- Check application logs in `/logs` directory
- Review error messages in browser console
- Test API endpoints individually

### Security Checklist
- ✅ Strong secrets generated and set
- ✅ HTTPS enabled with valid SSL certificate
- ✅ Email credentials secured
- ✅ File upload directory permissions set correctly
- ✅ Rate limiting configured
- ✅ CSRF protection enabled
- ✅ Session security configured

## 🎉 Go Live!

Once everything is working:
1. Update DNS if needed (remove any temporary URLs)
2. Test all forms from multiple devices/browsers
3. Monitor initial traffic and form submissions
4. Set up regular backups
5. Consider implementing analytics tracking

Your 4 Seasons Real Estate website is now live with full form functionality on GoDaddy hosting! 🏡✨