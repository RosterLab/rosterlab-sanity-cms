# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm**. Do not use `npm` or `yarn` — only `pnpm-lock.yaml` is committed.

## Commands

### Development

- `pnpm dev` - Start Next.js development server (localhost:3000)
- `pnpm sanity` - Start Sanity Studio CMS interface (localhost:3333)
- `pnpm build` - Build production application
- `pnpm lint` - Run ESLint linting

### Testing

- `pnpm test` - Run Jest test suite
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report

#### Browser Testing with Puppeteer

This project uses **Puppeteer** (already installed) for automated browser testing. Use it to test modals, forms, and analytics integrations.

**Setup:**
```bash
# Install Chrome for Puppeteer (one-time setup)
npx puppeteer browsers install chrome
```

**Running Browser Tests:**
```bash
# Start dev server first
pnpm dev

# In another terminal, run a test script
node scripts/test-variant-d-modal.js
```

**Creating Test Scripts:**

Example test script structure (see `scripts/test-variant-d-modal.js`):

```javascript
const puppeteer = require('puppeteer');

async function testFeature() {
  const browser = await puppeteer.launch({
    headless: false, // Show browser window
    devtools: true,  // Open DevTools automatically
  });
  
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => {
    console.log(`[Browser Console] ${msg.text()}`);
  });
  
  // Capture network requests
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log(`📤 API Request: ${request.url()}`);
    }
  });
  
  await page.goto('http://localhost:3000/your-page');
  
  // Your test interactions here
  await page.click('button');
  await page.type('input[name="email"]', 'test@example.com');
  
  await browser.close();
}
```

**Test Pages:**

The project includes dedicated test pages for debugging:
- `/test-modal-d` - Test Variant D modal with analytics logging

**Best Practices:**
- Always start with `headless: false` and `devtools: true` to see what's happening
- Capture console logs to debug analytics calls
- Monitor network requests for API calls
- Use `page.waitForTimeout()` sparingly - prefer `page.waitForSelector()` when possible

### Sanity CMS

- `pnpm sanity:seed` - Seed development data
- `pnpm sanity:reset` - Reset all CMS data
- `pnpm sanity:build` - Build Sanity Studio
- `pnpm sanity:deploy` - Deploy Sanity Studio

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

- **Netlify** hosts the production application
- Build configuration in `netlify.toml` (currently minimal - redirects handled by Next.js middleware)
- AWS Amplify configuration in `amplify.yml` exists but is not actively used
- Next.js middleware handles www removal and trailing slash redirects with a single 301 redirect
- Static assets served from `.next` build directory with optimized caching

### Development Workflow

- Start both Next.js (`pnpm dev`) and Sanity Studio (`pnpm sanity`) for full development environment
- Use `pnpm sanity:seed` to populate development data
- Run tests with `pnpm test` before committing changes
- Lint code with `pnpm lint` to ensure code quality

### Security

- **Pre-commit hooks** automatically scan for secrets and sensitive data before commits
- Uses `secretlint` with recommended rules to detect API keys, tokens, passwords, and connection strings
- Configured via `.secretlintrc.json` and runs automatically on staged files
- Pre-commit hook also runs ESLint and Prettier for code quality

### Analytics

- **Client-side analytics** - Uses RosterLab tracker (`ops.rosterlab.com/tracker.js`) loaded via `components/analytics/RlTracker.tsx`
- **Event tracking** - Use `analytics.track(eventName, properties)` from `@/components/analytics/tracking`
- **User identification** - Use `analytics.identify(userId, traits)` from `@/components/analytics/tracking`
- **UTM Tracking** - Automatic first-touch and current-touch attribution via `UTMTracker` component
- **Cross-domain tracking** - `_rl_anon_id` cookie on `.rosterlab.com`
- **Dual tracking** - Events sent to both rlTracker and GTM dataLayer
- **Direct tracker access** - Use `window.rlTracker.track(event, props)` or `window.rlTracker.identify(userId, traits)` directly if needed

#### Analytics Implementation Details

**Single Source of Truth**: All analytics calls go through `window.rlTracker` (from ops.rosterlab.com/tracker.js), which handles:
- Session management and anonymous ID tracking
- Automatic `sendBeacon` + `fetch` fallback for reliability
- Event batching and sending to ops.rosterlab.com/api/batch
- Form tracking and page duration tracking

**The `analytics` utility** (`components/analytics/tracking.ts`) is a wrapper that:
- Enriches events with UTM data, device context, and geo data
- Sends to both `window.rlTracker` AND `window.dataLayer` (GTM)
- Provides logging to debug tracking issues

**Debugging Analytics**:
- Check browser console for `[Analytics]` prefixed logs
- Look for `✅ identify() sent to rlTracker` (success) or `❌ rlTracker NOT AVAILABLE` (failure)
- If rlTracker isn't loading, check for ad blockers or CSP issues
- Use the `/test-modal-d` test page to debug modal analytics

### Creating US Pages

When creating US equivalent pages from AU/NZ pages, follow these steps:

1. **Page Structure**:
   - Create pages in `/app/us/` directory maintaining the same folder structure
   - Add `/us/` prefix to URLs (e.g., `/feature/ai-staff-rostering-assistant` → `/us/feature/ai-staff-scheduling-assistant`)
   - Convert "roster/rostering" terminology to "schedule/scheduling" in URLs

2. **Terminology Conversion**:
   - roster/rostering/rosters → schedule/scheduling/schedules
   - UK to US spelling: optimise→optimize, organised→organized, labour→labor, authorised→authorized
   - Region-specific terms: union rules→labor laws, EBA→compliance rules, annual leave→vacation time

3. **Metadata Updates**:
   - Update page titles and descriptions for US terminology
   - Set canonical URLs to US path
   - **Keep OpenGraph images with original paths** (do NOT add /us prefix)
   - Use `withHreflang()` with the current page's path as second parameter

4. **Internal Links**:
   - Update all internal links to use `/us/` prefix
   - Update tool links (e.g., `/tools/roi-calculator` → `/us/tools/savings-calculator`)
   - Update demo links (e.g., `/staff-rostering-interactive-demo` → `/us/product-tour`)
   - Update all feature/solution/industry links to their US equivalents

5. **Components**:
   - **CRITICAL**: Check imported components for hard-coded roster terminology
   - Create US versions of components that contain user-facing text with roster terminology
   - Place US component versions in appropriate directories:
     - Page-specific components: `/app/us/[path]/ComponentNameUS.tsx`
     - Shared components: `/components/sections/animations/ComponentNameUS.tsx`
   - Update import statements to use US component versions
   - Examples of components that need US versions:
     - `RoleTabsModule` → `RoleTabsModuleUS`
     - `OttoChatWidget` → `OttoChatWidgetUS`
     - `OttoStaticChatFeature1` → `OttoStaticChatFeature1US`

6. **HreflangTags.tsx Updates**:
   - Add new page mappings to `US_URL_MAPPINGS` object
   - Add page paths to `LOCALIZED_PAGES` set
   - This enables automatic hreflang tag generation

7. **Validation**:
   - Check for remaining "roster" mentions (acceptable: company name "RosterLab", image paths, component import paths)
   - Verify all internal links use `/us/` prefix
   - Test that dropdown menus and interactive components use correct terminology
