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

# Security & auditing
npm run security:scan     # Run security audit and tests
npm run security:audit    # Run npm audit for vulnerabilities

# Database operations
npm run db:push           # Push schema changes to database (Drizzle Kit)
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

**Path Aliases (configured in tsconfig.json and vite.config.ts):**
- `@/*` maps to `client/src/*`
- `@shared/*` maps to `shared/*`
- `@assets/*` maps to `attached_assets/*`

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

Copy `.env.example` to `.env` and configure the following:

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
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server to `dist/index.js`
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