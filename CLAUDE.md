# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Next.js development server (localhost:3000)
- `npm run sanity` - Start Sanity Studio CMS interface (localhost:3333)
- `npm run build` - Build production application
- `npm run lint` - Run ESLint linting

### Testing
- `npm test` - Run Jest test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

### Sanity CMS
- `npm run sanity:seed` - Seed development data
- `npm run sanity:reset` - Reset all CMS data
- `npm run sanity:build` - Build Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## Architecture

### Tech Stack
- **Next.js 15** with App Router and TypeScript
- **Sanity v3** headless CMS with multi-environment datasets
- **Tailwind CSS v4** with custom design system
- **React Hook Form + Zod** for form validation
- **Jest + React Testing Library** for testing

### Directory Structure
- `app/` - Next.js App Router pages (about, blog, contact, demo, pricing, solutions, studio)
- `components/` - React components organized by purpose (analytics, blog, forms, layout, sections, seo, ui)
- `sanity/` - CMS configuration, schemas, fixtures, scripts, and tests
- `sanity/schemas/` - Content type definitions (posts, pages, authors, categories, settings)
- `public/` - Static assets and images
- `styles/` - CSS modules and global styles

### Key Architectural Patterns

#### Sanity CMS Integration
- Multi-environment setup with development/staging/production datasets
- Live preview functionality for content editors via `app/api/preview/` routes
- Type-safe content with generated TypeScript types from Sanity schemas
- Page builder system with modular sections (hero, pricing, testimonials, CTAs)

#### Component Architecture
- Modular components organized by functionality rather than file type
- Full TypeScript coverage with strict mode enabled
- Server and client components properly separated for App Router
- Reusable UI components in `components/ui/` following consistent patterns

#### Content Management
- Structured content types: posts, pages, authors, categories, site settings
- Rich text content with portable text rendering
- Image optimization through Sanity CDN integration
- SEO and structured data management via `components/seo/`

#### Styling System
- Custom Tailwind configuration with brand color palette
- Design tokens for primary, secondary, and neutral color scales
- Responsive typography using Poppins font family
- Custom animations (fade-in, slide-up, slide-down)

### Environment Configuration
- Environment-specific Sanity datasets configured in `sanity/lib/config.ts`
- Required environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`
- Next.js configuration includes Sanity CDN domains for image optimization

### Deployment & Hosting
- **AWS Amplify** hosts the production application
- Amplify configuration in `amplify.yml` handles build, caching, and security headers
- Next.js redirects are automatically respected by Amplify during builds
- Static assets served from `.next` build directory with optimized caching

### Development Workflow
- Start both Next.js (`npm run dev`) and Sanity Studio (`npm run sanity`) for full development environment
- Use `npm run sanity:seed` to populate development data
- Run tests with `npm test` before committing changes
- Lint code with `npm run lint` to ensure code quality