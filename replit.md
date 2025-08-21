# Overview

This is a full-stack TypeScript application built with React frontend and Express backend. The project utilizes a modern tech stack including Vite, Drizzle ORM, and shadcn/ui, set up as a monorepo for shared client and server code. The application provides comprehensive city guides and real estate information for various North Texas communities, including detailed profiles, market insights, and tools for home buyers and sellers. It aims to be a go-to resource for DFW real estate.

# User Preferences

Preferred communication style: Simple, everyday language.

## Design Standards
- **Primary Brand Color**: Dark blue #0d0d33 (use for all buttons, icons, and interactive elements)
- **Button Styling**: Use #0d0d33 background with white text and hover effects
- **Icon Backgrounds**: Use #0d0d33 background with white icons for consistent branding

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Router**: Wouter
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Hookform resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for Neon serverless driver)
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Session Storage**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot reloading with tsx

## Build System
- **Development**: Vite dev server for frontend, tsx for backend hot reload
- **Production**: Vite build for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript compiler with strict mode enabled

## Key Components
- **Database Layer**: Schema defined in `shared/schema.ts` using Drizzle ORM, with migrations managed by drizzle-kit.
- **Storage Interface**: Abstract `IStorage` in `server/storage.ts` for CRUD operations, with in-memory and Drizzle ORM implementations.
- **Frontend State Management**: TanStack Query manages server state and caching, with a custom API client and centralized error handling using toast notifications.
- **UI Components**: shadcn/ui components with "new-york" style, light/dark mode support, responsive design, and Lucide React icons.

## Data Flow
- **Request Flow**: Client API requests handled by Express server with JSON parsing, routed via `/api` prefix, and abstracted through the storage layer.
- **Database Operations**: Drizzle schema defines table structure, storage interface provides type-safe CRUD, and Zod schemas enable runtime validation.
- **Frontend Data Management**: TanStack Query manages server state, caching, optimistic updates, and error recovery, providing user feedback via toasts.

## UI/UX Decisions
- Consistent branding with a primary dark blue color for interactive elements.
- Light/dark mode support and mobile-first design.
- Comprehensive city guide templates with hero sections, demographics, schools, and amenities.
- Interactive elements like expandable county cards and searchable FAQ/blog content.

# External Dependencies

- **@neondatabase/serverless**: PostgreSQL driver for edge environments.
- **drizzle-orm**: Type-safe ORM for PostgreSQL.
- **@tanstack/react-query**: Server state management.
- **@radix-ui/***: Headless UI primitives.
- **express**: Web application framework.
- **wouter**: Lightweight React router.
- **vite**: Frontend build tool and dev server.
- **tsx**: TypeScript execution for Node.js.
- **tailwindcss**: Utility-first CSS framework.
- **drizzle-kit**: Database toolkit for migrations.
- **class-variance-authority**: Component variant management.
- **clsx**: Conditional className utility.
- **tailwind-merge**: Tailwind class merging utility.
- **Leaflet**: JavaScript library for interactive maps (used on Contact page).

# Recent Changes

## January 2025
- **Dallas County Expansion**: Added comprehensive city guides for Coppell (premier family community with top-rated Coppell ISD) and The Colony (lakefront living on Lewisville Lake)
- **Multi-County Coverage**: Now providing complete North Texas representation across Denton County (11 communities), Tarrant County (8 major cities), and Dallas County (additional premium communities)
- **Enhanced Featured Communities**: Added Coppell and The Colony as featured communities showcasing Dallas County's premium family-oriented and lakefront lifestyle options
- **Complete Tarrant County City Guides**: Created comprehensive city guide pages for 8 major Tarrant County municipalities including Fort Worth (county seat), Arlington, Grapevine, Southlake, Colleyville, Mansfield, North Richland Hills, and Keller
- **Comprehensive Denton County City Guides**: Created detailed city guide pages for 10 major Denton County municipalities including Denton (county seat), Lewisville, Flower Mound, Highland Village, Little Elm, Argyle, Corinth, Aubrey, and The Colony
- **Complete Navigation Integration**: Updated all routing systems (App.tsx, city-guides navigation) to include comprehensive multi-county city guide access
- **Structured City Guide Template**: Maintained consistent template structure across all guides featuring hero sections, demographics, schools, neighborhoods, and amenities