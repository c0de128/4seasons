# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the 4seasons real estate application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Code must be in a GitHub repository
3. **Database**: PostgreSQL database (recommended: Neon, Supabase, or Vercel Postgres)
4. **Environment Variables**: Prepared according to `.env.vercel.example`

## Deployment Steps

### 1. Prepare Your Repository

Ensure these files are committed to your repository:
- `vercel.json` - Vercel configuration
- `package.json` - Dependencies and build scripts
- `api/index.js` - Serverless function entry point
- All source code in `client/`, `server/`, and `shared/` directories

### 2. Create New Vercel Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty for root)
   - **Build Command**: `npm run build:vercel`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables

In Vercel dashboard, go to Project Settings > Environment Variables and add:

#### Required Variables
```
DATABASE_URL=postgresql://username:password@hostname/database
JWT_SECRET=your-secure-jwt-secret-32-chars-minimum
SESSION_SECRET=your-secure-session-secret-32-chars-minimum
NODE_ENV=production
```

#### Optional Variables
```
REDIS_URL=redis://username:password@hostname:port
ALLOWED_ORIGINS=https://your-domain.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
GA_MEASUREMENT_ID=G-XXXXXXXXXX
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 4. Database Setup

#### Option A: Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to `DATABASE_URL`

#### Option B: Vercel Postgres
1. In Vercel dashboard, go to Storage tab
2. Create new Postgres database
3. Environment variables will be auto-configured

#### Option C: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string to `DATABASE_URL`

### 5. Deploy

1. Click "Deploy" in Vercel dashboard
2. Monitor build logs for any errors
3. Once deployed, test the application

## Build Process

The `npm run build:vercel` command:
1. Builds the React frontend with Vite to `dist/` directory
2. Compiles the TypeScript server to `server/dist/vercel.js`
3. Creates the Vercel serverless function at `api/index.js`

## Key Configuration Files

### `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist",
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/((?!api|assets/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### `api/index.js`
Serverless function that initializes the Express server and handles all API requests.

## Architecture

- **Frontend**: Static React SPA served from `dist/`
- **Backend**: Express.js running as serverless function in `api/index.js`
- **Database**: PostgreSQL with connection pooling
- **Sessions**: Stored in database or Redis
- **Static Assets**: Served with optimal caching headers

## Performance Optimizations

1. **Code Splitting**: Automatic vendor and page-level chunks
2. **Compression**: Gzip and Brotli compression enabled
3. **Caching**: Aggressive caching for static assets
4. **Bundle Analysis**: Build generates `dist/stats.html` for analysis

## Troubleshooting

### Build Failures
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript files compile locally with `npm run check`

### Runtime Errors
1. Check Function logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Test database connection
4. Ensure external services (Redis, SMTP) are accessible

### Performance Issues
1. Monitor function execution time (30s limit)
2. Check database connection pooling
3. Review bundle sizes in `dist/stats.html`
4. Consider upgrading to Vercel Pro for better limits

## Post-Deployment

1. **Custom Domain**: Configure in Vercel dashboard
2. **SSL Certificate**: Automatically provisioned by Vercel
3. **Monitoring**: Set up Vercel Analytics and/or Sentry
4. **Backup**: Configure database backups

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Test Build**: `npm run build:vercel`
3. **Deploy**: Push to GitHub (auto-deploys)
4. **Preview**: Vercel creates preview deployments for PR branches

## Environment Comparison

| Feature | Local Dev | Vercel |
|---------|-----------|---------|
| Server | Express.js | Serverless Function |
| Database | Local/Remote | PostgreSQL |
| Static Files | Vite Dev Server | Vercel CDN |
| Hot Reload | Yes | No |
| Build Time | Fast | 2-5 minutes |
| Cold Start | No | 50-500ms |

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Project Issues**: Check GitHub issues
- **Build Logs**: Available in Vercel dashboard