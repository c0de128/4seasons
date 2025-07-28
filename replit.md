# Overview

This is a full-stack TypeScript application built with React frontend and Express backend. The project uses a modern tech stack with Vite for the frontend build, Drizzle ORM for database operations, and shadcn/ui for the UI components. The application is set up as a monorepo with shared code between client and server.

# User Preferences

Preferred communication style: Simple, everyday language.

## Design Standards
- **Primary Brand Color**: Dark blue #0d0d33 (use for all buttons, icons, and interactive elements)
- **Button Styling**: Use #0d0d33 background with white text and hover effects
- **Icon Backgrounds**: Use #0d0d33 background with white icons for consistent branding

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Router**: Wouter for client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Hookform resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for, using Neon serverless driver)
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot reloading with tsx

## Build System
- **Development**: Vite dev server for frontend, tsx for backend hot reload
- **Production**: Vite build for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript compiler with strict mode enabled

# Key Components

## Database Layer
- **Schema**: Defined in `shared/schema.ts` using Drizzle ORM
- **Current Schema**: Users table with id, username, and password fields
- **Migrations**: Generated in `./migrations` directory
- **Driver**: Neon serverless PostgreSQL driver for edge compatibility

## Storage Interface
- **Abstract Interface**: `IStorage` in `server/storage.ts` defines CRUD operations
- **In-Memory Implementation**: `MemStorage` class for development/testing
- **Database Implementation**: Ready to be implemented using Drizzle ORM

## Frontend State Management
- **Server State**: TanStack Query with custom query functions
- **API Client**: Custom fetch wrapper with error handling and credentials
- **Error Handling**: Centralized error handling with toast notifications

## UI Components
- **Design System**: shadcn/ui components with "new-york" style
- **Theme**: Light/dark mode support with CSS variables
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Icons**: Lucide React icon library

# Data Flow

## Request Flow
1. Client makes API requests through custom `apiRequest` function
2. Express server handles requests with JSON parsing middleware
3. Routes are defined in `server/routes.ts` with `/api` prefix
4. Storage layer abstracts database operations
5. Responses are logged with timing information

## Database Operations
1. Drizzle schema defines table structure and validation
2. Storage interface provides type-safe CRUD operations
3. Zod schemas from drizzle-zod provide runtime validation
4. Migrations are managed through drizzle-kit

## Frontend Data Management
1. TanStack Query manages server state and caching
2. Query keys follow URL pattern for consistency
3. Optimistic updates and error recovery built-in
4. Toast notifications for user feedback

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for edge environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI primitives
- **express**: Web application framework
- **wouter**: Lightweight React router

## Development Tools
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database toolkit for migrations

## UI and Styling
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **tailwind-merge**: Tailwind class merging utility

# Deployment Strategy

## Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Static files served from the built frontend directory

## Environment Configuration
- Database URL required in `DATABASE_URL` environment variable
- Development/production modes controlled by `NODE_ENV`
- Replit-specific optimizations for development environment

## Database Setup
- Drizzle migrations in PostgreSQL dialect
- Schema changes managed through `drizzle-kit push` command
- Connection pooling handled by Neon serverless driver

## Session Management
- PostgreSQL-based session storage
- Session configuration ready for connect-pg-simple
- Secure session handling with proper cookie settings

# Recent Changes

## December 2024
- **Shared Contact Component Creation**: Created reusable Contact component extracted from home page contact section
- **Consistent Contact Integration**: Applied Contact component across all pages (home, buy, sell) for consistency
- **Code Deduplication**: Removed duplicate contact forms and sections, centralizing contact functionality
- **Shared Component Architecture**: Extended shared component system to include Navigation, Footer, and Contact components
- **Real Estate Page Enhancements**: Added real city images to buy page location cards (Plano, Frisco, Allen, McKinney, Richardson, Carrollton)
- **UI Improvements**: Centered iframe on buy page and adjusted height to 88vh for better user experience
- **Hero Section Standardization**: Updated Sell page hero section to match Buy page styling with light gradient background
- **Property Management Page**: Created comprehensive property management page with engaging content, pricing tiers, and service details
- **Navigation Enhancement**: Added property management route to both desktop and mobile navigation systems
- **Home Valuation Page**: Created comprehensive home valuation page with detailed form, process explanation, and professional content
- **Interactive Forms**: Added advanced form handling with controlled components and comprehensive property data collection
- **City Guides Page**: Created comprehensive DFW neighborhoods guide following detailed outline specification with county organization, featured communities, search functionality, and market insights
- **Community Directory**: Implemented structured neighborhood browsing with filtering by county, search capabilities, and detailed community profiles