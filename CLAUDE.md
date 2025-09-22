# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Structure

This workspace contains two separate projects:

1. **Root-level utilities** - PowerShell/batch scripts for clipboard image management
   - `paste-image.bat` - Batch file wrapper for the PowerShell script
   - `save-clipboard-image.ps1` - PowerShell script to save clipboard images to PNG files

2. **4seasons/** - Full-stack North Texas real estate and city guide application
   - Has its own comprehensive CLAUDE.md with project-specific instructions
   - Navigate to `4seasons/` directory for all development work on this application

3. **Additional directories:**
   - `scripts/` - Contains SEO audit utilities (`seo-audit.js`)
   - `docs/` - Documentation including SEO implementation status
   - `test/` - Testing-related files (structure varies)

## Working with the 4seasons Application

When working on the 4seasons application:
```bash
cd 4seasons
# Refer to 4seasons/CLAUDE.md for complete development instructions
```

The 4seasons project has its own comprehensive documentation including:
- Development commands (build, test, lint)
- Architecture overview
- Security configurations
- Testing strategies
- GoDaddy deployment pipeline

### Development Commands for 4seasons
```bash
cd 4seasons

# Install dependencies
npm install

# Start development server (both frontend and backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking (run after code changes)
npm run check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test                    # Run all tests with Vitest
npm run test:watch             # Run tests in watch mode
npm run test:security          # Run security-specific tests

# Run a specific test file
npx vitest run path/to/test.ts

# Security scanning
npm run security:scan          # Run security audit and tests
npm run security:audit         # Run npm audit for vulnerabilities

# Database operations
npm run db:push                # Push schema changes to database (Drizzle Kit)

# GoDaddy deployment pipeline
npm run generate-secrets       # Generate secure environment secrets
npm run verify-build          # Verify build integrity before deployment
npm run prepare-deployment     # Prepare deployment package
npm run deploy:godaddy        # Full deployment pipeline for GoDaddy
npm run start:godaddy         # Start application with GoDaddy-specific settings
```

## Technology Stack Summary (4seasons)

**Frontend:** React 18, TypeScript, Vite, Wouter (routing), shadcn/ui components, Tailwind CSS, TanStack Query

**Backend:** Node.js, Express.js, TypeScript ES modules, Drizzle ORM + PostgreSQL, JWT auth, Redis caching, comprehensive security middleware

**Key Features:** Real estate and city guide application for North Texas (Denton, Tarrant, Dallas counties), GoDaddy hosting optimizations, OWASP security compliance

## Clipboard Image Utility Commands

To use the clipboard image saving utility:
```bash
# Run the batch file (Windows)
.\paste-image.bat

# Or run PowerShell script directly
powershell -ExecutionPolicy Bypass -File .\save-clipboard-image.ps1
```

This utility:
- Saves clipboard images as PNG files with timestamp naming (format: `clipboard_YYYYMMDD_HHMMSS.png`)
- Copies the saved file path back to clipboard
- Useful for quick screenshot management during development
- Saves files to the root directory where the script is executed

## SEO and Analytics Tools

```bash
# Run SEO audit (from root directory)
node scripts/seo-audit.js

# Check SEO implementation status
cat docs/seo-implementation-status.md
```

## Important Notes

- **Primary Development:** Most work happens in the `4seasons/` subdirectory
- **Environment:** Windows platform (win32) with PowerShell utilities
- **Module System:** The 4seasons app uses ES modules throughout (`"type": "module"` in package.json)
- **Always navigate to the correct directory:** Use `cd 4seasons` before running npm commands
- **Path Aliases:** The 4seasons project uses `@/*`, `@shared/*`, `@assets/*`, and `@server/*` aliases
- **Security:** Comprehensive security middleware, OWASP compliance, extensive audit logging
- **Deployment:** Optimized for GoDaddy shared hosting with specific memory and timeout configurations
- **Testing:** Vitest framework with security-focused tests and 30-second timeouts