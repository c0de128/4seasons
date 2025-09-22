# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (both frontend and backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Testing
npm run test              # Run all tests with Vitest
npm run test:watch        # Run tests in watch mode
npm run test:security     # Run security-specific tests

# Run a specific test file
npx vitest run path/to/test.ts

# Run tests with coverage
npx vitest run --coverage

# Security & auditing
npm run security:scan     # Run security audit and tests
npm run security:audit    # Run npm audit for vulnerabilities

# Database operations
npm run db:push           # Push schema changes to database (Drizzle Kit)

# Deployment (GoDaddy hosting)
npm run generate-secrets    # Generate secure environment secrets
npm run verify-build       # Verify build integrity before deployment
npm run prepare-deployment  # Prepare deployment package
npm run deploy:godaddy     # Full deployment pipeline for GoDaddy
npm run start:godaddy      # Start application with GoDaddy-specific settings
```

## Architecture Overview

This is a full-stack TypeScript monorepo with a React frontend and Express.js backend, designed as a comprehensive North Texas real estate and city guide application.

### Project Structure

- **`client/`** - React frontend with Vite
  - `src/App.tsx` - Main app routing with Wouter
  - `src/components/` - Shared React components (Navigation, Footer, Contact, etc.)
  - `src/pages/` - Page components including city guides
  - `src/components/ui/` - shadcn/ui components
- **`server/`** - Express.js backend
  - `index.ts` - Main server setup with middleware and routing
  - `routes.ts` - API route definitions
  - `storage.ts` - Abstract storage interface with implementations
  - `vite.ts` - Vite integration for development
  - `middleware/` - Security, auth, validation, and session middleware
  - `routes/` - Modular route handlers (auth, security, performance, backup)
  - `services/` - Business logic services (security scanner, Redis, email, image optimization)
  - `tests/` - Security and integration tests
- **`shared/`** - Shared TypeScript definitions
  - `schema.ts` - Drizzle ORM database schema and Zod validation

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling and dev server
- Wouter for client-side routing
- shadcn/ui components (built on Radix UI)
- Tailwind CSS with CSS variables theming
- TanStack Query for server state management
- React Hook Form for form handling

**Backend:**
- Node.js with Express.js
- TypeScript with ES modules
- Drizzle ORM with PostgreSQL (Neon serverless driver)
- Express sessions with PostgreSQL storage
- JWT authentication with bcrypt password hashing
- Comprehensive security middleware (Helmet, CORS, rate limiting, CSRF)
- Redis integration for session storage and caching
- Development: tsx for hot reloading
- Production: esbuild for bundling

### Key Design Patterns

**Database Layer:**
- Schema defined in `shared/schema.ts` using Drizzle ORM
- Abstract `IStorage` interface in `server/storage.ts` for CRUD operations
- Migrations managed by drizzle-kit

**State Management:**
- TanStack Query manages all server state and caching
- No global client state - component state and server state only
- Toast notifications for user feedback

**Security Architecture:**
- Multi-layered middleware stack with Helmet, CORS, rate limiting
- JWT-based authentication with secure password policies
- Input validation and sanitization on all endpoints
- Comprehensive audit logging and error tracking
- Environment-based configuration with validation

**Path Aliases:**
- `@/*` maps to `client/src/*` (tsconfig.json and vite.config.ts)
- `@shared/*` maps to `shared/*` (tsconfig.json and vite.config.ts)
- `@assets/*` maps to `attached_assets/*` (vite.config.ts only)
- `@server/*` maps to `server/*` (vitest.config.ts only)

### Brand Standards

- **Primary Color:** Dark blue `#0d0d33` for all interactive elements
- **UI Components:** shadcn/ui "new-york" style with light/dark mode support
- **Icons:** Lucide React with `#0d0d33` backgrounds and white icons

### Application Domain

The application provides comprehensive city guides and real estate information for North Texas communities across three counties:

- **Denton County:** 11 communities including Denton, Lewisville, Flower Mound
- **Tarrant County:** 8 major cities including Fort Worth, Arlington, Grapevine
- **Dallas County:** Premium communities including Coppell, The Colony

Each city guide follows a consistent template with hero sections, demographics, schools, neighborhoods, and amenities.

### Environment Setup

The project includes multiple environment configurations:
- `.env.example` - Template for local development
- `.env.godaddy.example` - Template for GoDaddy hosting deployment  
- `.env.production` - Production environment template

Copy the appropriate template to `.env` and configure the following:

**Required environment variables:**
- `DATABASE_URL` - PostgreSQL connection string (required for database operations)
- `JWT_SECRET` - Strong secret for JWT token signing (32+ characters recommended)
- `SESSION_SECRET` - Strong secret for session encryption (32+ characters recommended)
- `NODE_ENV` - Set to "development" or "production"
- `PORT` - Server port (defaults to 5000)

**Optional environment variables:**
- `REDIS_URL` - Redis connection string for session storage and caching
- `ALLOWED_ORIGINS` - CORS-allowed origins (comma-separated)
- `SMTP_*` - Email service configuration variables (HOST, PORT, USER, PASS)
- `GA_MEASUREMENT_ID` - Google Analytics tracking ID
- `SENTRY_DSN` - Sentry error tracking (optional)
- `AWS_S3_*` - AWS S3 backup configuration (optional)

### Development Notes

- **Module System:** ES modules throughout (`"type": "module"` in package.json)
- **TypeScript Config:** Strict mode, ESNext target, bundler module resolution, `allowImportingTsExtensions` enabled
- **Server Architecture:** Express serves both API routes (`/api` prefix) and static files
- **Development Mode:** Uses tsx with hot reloading via `npm run dev`
- **Production Build:** 
  - Frontend: Vite builds to `server/public` for Express static serving
  - Backend: esbuild bundles server to `server/dist/index.js`
- **Database Migrations:** Schema changes require `npm run db:push` (Drizzle Kit)
- **Cross-platform:** Uses `cross-env` for environment variables on Windows
- **Path Resolution:** No need for `.js` extensions in imports due to `allowImportingTsExtensions`
- **Asset Management:** Images and videos stored in `client/src/assets/` with organized subdirectories

### Security Notes

- Authentication system implements JWT tokens with bcrypt password hashing
- Rate limiting configured for different endpoint types (auth: 5 req/15min, API: 100 req/15min)
- All security middleware is configured in `server/middleware/security.middleware.ts`
- Security audit and vulnerability scanning available via `npm run security:scan`
- Comprehensive logging for security events in separate audit files
- OWASP Top 10 vulnerabilities addressed - see SECURITY_IMPROVEMENTS.md for details

### Testing Strategy

- **Test Framework:** Vitest with Node environment
- **Test Setup:** Configuration in `vitest.config.ts` with setup file at `server/tests/setup.ts`
- **Test Timeout:** 30 seconds for tests and hooks
- **Coverage:** V8 provider with HTML, JSON, and text reporters
- **Path Aliases:** Same as TypeScript config (@/, @server/, @shared/)
- Security-specific tests in `server/tests/security.test.ts`
- Test database operations before running `npm run db:push` in development
- Authentication endpoints can be tested with curl commands (see SECURITY_IMPROVEMENTS.md)

### Deployment Process

The project supports deployment to GoDaddy hosting with automated scripts:

- **Secrets Generation:** `generate-secrets.js` creates secure random secrets for environment variables
- **Build Verification:** `verify-build.js` validates build output before deployment  
- **Deployment Packaging:** `prepare-deployment.js` creates deployment-ready package
- **GoDaddy Startup:** `start-godaddy.js` handles GoDaddy-specific server configuration

**Deployment workflow:**
1. Configure environment using `.env.godaddy.example` as template
2. Run `npm run deploy:godaddy` for complete deployment pipeline
3. Upload deployment package to GoDaddy hosting
4. Use `npm run start:godaddy` as startup command

See `GODADDY_DEPLOYMENT.md` for detailed GoDaddy hosting setup instructions.

### Key Configuration Files

- `components.json` - shadcn/ui configuration for component generation
- `drizzle.config.ts` - Database configuration for Drizzle Kit migrations  
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme variables
- `vercel.json` - Vercel deployment configuration (legacy)
- Documentation references: `SECURITY_IMPROVEMENTS.md`, `SEO_IMPLEMENTATION_GUIDE.md`

### Lint and Type Checking

After making code changes, run these commands to ensure code quality:
```bash
# Type checking (required after changes)
npm run check

# Security scanning (recommended after security-related changes) 
npm run security:scan
```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.