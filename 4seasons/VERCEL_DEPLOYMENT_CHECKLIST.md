# Vercel Deployment Checklist

## ✅ Issues Resolved

### Critical Fixes Applied (September 30, 2025)

1. **Frontend Output Directory Mismatch** ✅
   - Changed `vite.config.ts` output from `server/public` to `dist`
   - Aligned with `vercel.json` outputDirectory configuration

2. **Serverless Bundle Size Optimization** ✅
   - Reduced bundle from 10.5 MB to 0.24 MB (97% reduction)
   - Properly externalized all node_modules dependencies
   - Fixed CommonJS/ESM module compatibility issues

3. **vercel.json Modernization** ✅
   - Removed deprecated `version: 2`
   - Updated runtime configuration
   - Added proper caching headers for all asset types
   - Fixed routing configuration

4. **Static Path Resolution** ✅
   - Updated `server/vercel.ts` to use `process.cwd()` on Vercel
   - Added `VERCEL` environment variable detection

5. **.vercelignore Optimization** ✅
   - Excluded source files (only compiled dist is uploaded)
   - Removed test files, docs, and config files
   - Reduced deployment size significantly

## Pre-Deployment Checklist

### 1. Environment Variables

Set these in Vercel Dashboard (Project Settings → Environment Variables):

#### Required
- [ ] `DATABASE_URL` - PostgreSQL connection string (use Neon, Supabase, or Vercel Postgres)
- [ ] `JWT_SECRET` - 32+ character secure random string
- [ ] `SESSION_SECRET` - 32+ character secure random string
- [ ] `NODE_ENV` - Set to `production`

#### Optional but Recommended
- [ ] `REDIS_URL` - Redis connection string (for session storage)
- [ ] `ALLOWED_ORIGINS` - Your Vercel deployment URL
- [ ] `SMTP_HOST` - Email service host
- [ ] `SMTP_PORT` - Email service port
- [ ] `SMTP_USER` - Email service username
- [ ] `SMTP_PASS` - Email service password
- [ ] `GA_MEASUREMENT_ID` - Google Analytics ID
- [ ] `SENTRY_DSN` - Sentry error tracking (optional)

### 2. Database Setup

Choose one option:

#### Option A: Neon (Recommended - Serverless PostgreSQL)
1. Sign up at https://neon.tech
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npm run db:push` (locally first, then set DATABASE_URL in Vercel)

#### Option B: Vercel Postgres
1. In Vercel Dashboard → Storage tab
2. Create Postgres database
3. Link to project (environment variables auto-configured)
4. Run migrations after first deployment

#### Option C: Supabase
1. Sign up at https://supabase.com
2. Create project
3. Go to Settings → Database → Connection string
4. Copy to `DATABASE_URL`

### 3. Build Verification (Local)

Before deploying, run these commands locally:

```bash
# Clean build
npm run build:vercel

# Verify output structure
ls dist/            # Should contain index.html and assets/
ls api/             # Should contain index.js
ls server/dist/     # Should contain vercel.js (~240 KB)

# Check for build errors
npm run check
```

### 4. Git Commit

Ensure all changes are committed:

```bash
git status
git add .
git commit -m "Fix Vercel deployment configuration"
git push
```

## Deployment Steps

### First-Time Deployment

1. **Connect GitHub Repository**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Select the `4seasons` folder as root (if monorepo)

2. **Configure Build Settings**
   - Framework Preset: **Other**
   - Root Directory: **./4seasons** (or leave blank if in root)
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: **20.x**

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables (see section 1)
   - Make sure to set for "Production" environment

4. **Deploy**
   - Click "Deploy"
   - Monitor build logs for errors
   - First deployment takes 2-5 minutes

### Subsequent Deployments

Vercel auto-deploys on every push to your repository:

```bash
git push origin main  # Triggers automatic deployment
```

## Post-Deployment Verification

### 1. Check Build Logs
- Go to Vercel Dashboard → Deployments
- Click on latest deployment
- Review build logs for errors

### 2. Test API Endpoints
```bash
# Health check
curl https://your-app.vercel.app/api/health

# Test static files
curl https://your-app.vercel.app/

# Check 404 handling
curl https://your-app.vercel.app/nonexistent
```

### 3. Monitor Function Logs
- Go to Vercel Dashboard → Functions
- Click on `api/index`
- Review runtime logs for errors

### 4. Test Application Features
- [ ] Homepage loads correctly
- [ ] Navigation works (client-side routing)
- [ ] City guides load
- [ ] Contact form works
- [ ] API endpoints respond
- [ ] Static assets load (images, CSS, JS)

## Common Issues & Solutions

### Issue: "Module not found" Error

**Cause:** Dependency not properly externalized

**Solution:**
1. Check `scripts/create-vercel-function.js`
2. Add missing dependency to `externals` array
3. Rebuild with `npm run build:vercel`

### Issue: "Cannot find module '../server/dist/vercel.js'"

**Cause:** Build didn't complete successfully

**Solution:**
1. Run `npm run build:vercel` locally
2. Verify `server/dist/vercel.js` exists
3. Check build logs in Vercel dashboard

### Issue: 404 on Static Files

**Cause:** Output directory mismatch

**Solution:**
1. Verify `vite.config.ts` outputs to `dist`
2. Verify `vercel.json` expects `dist`
3. Check `server/vercel.ts` staticPath configuration

### Issue: Timeout Errors (504)

**Cause:** Database connection issues or cold start

**Solution:**
1. Check DATABASE_URL is correct
2. Verify database is accessible from Vercel
3. Consider connection pooling
4. Increase function timeout in `vercel.json` (max 30s on Free plan)

### Issue: Environment Variables Not Working

**Cause:** Variables not set in Vercel dashboard

**Solution:**
1. Go to Project Settings → Environment Variables
2. Ensure variables are set for correct environment (Production/Preview/Development)
3. Redeploy after adding variables

## Performance Optimization

### Current Optimizations
✅ Code splitting by vendor and page
✅ Aggressive asset caching (1 year)
✅ Gzip and Brotli compression
✅ Optimized bundle size (0.24 MB serverless function)
✅ Separate chunks for large libraries

### Monitoring
- Use Vercel Analytics (built-in)
- Check function execution time (should be < 5s)
- Monitor bundle sizes in build logs
- Review Core Web Vitals

## Rollback Procedure

If deployment fails:

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click three dots → "Promote to Production"
4. Fix issues locally
5. Redeploy when ready

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Project Issues:** GitHub repository issues
- **Build Logs:** Vercel Dashboard → Deployments
- **Function Logs:** Vercel Dashboard → Functions

## Deployment Architecture

```
Vercel Deployment
├── dist/                          # Frontend (served by Vercel CDN)
│   ├── index.html                # SPA entry point
│   ├── assets/                   # JS, CSS, images (cached 1 year)
│   └── ...
├── api/
│   └── index.js                  # Serverless function entry point
├── server/dist/
│   └── vercel.js                 # Express app bundle (0.24 MB)
├── package.json                  # Dependencies (installed by Vercel)
└── node_modules/                 # Runtime dependencies (not bundled)
```

## Key Configuration Files

- `vercel.json` - Vercel deployment configuration
- `vite.config.ts` - Frontend build configuration
- `scripts/create-vercel-function.js` - Serverless function builder
- `.vercelignore` - Files excluded from deployment
- `api/index.js` - Serverless function handler
- `server/vercel.ts` - Express app for Vercel

---

**Last Updated:** September 30, 2025
**Build Status:** ✅ All issues resolved
**Bundle Size:** 0.24 MB (97% reduction)
**Ready for Production:** YES