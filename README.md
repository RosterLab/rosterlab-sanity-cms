# RosterLab Next.js + Sanity CMS

A modern, scalable content management system built with Next.js 15 and Sanity v3.

## 🚀 Features

- **TypeScript-first**: Full type safety across the entire stack
- **Environment Management**: Separate datasets for development, staging, and production
- **Preview Mode**: Live preview functionality for content editors
- **Test Coverage**: Comprehensive test suite for schemas, queries, and fixtures
- **Seed Data**: Automated data seeding for development and testing
- **Next.js 15** with App Router and TypeScript
- **Sanity CMS** for content management
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Responsive design** with mobile-first approach
- **SEO optimized** with proper metadata
- **Component-based architecture**

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
├── sanity/               # Sanity configuration and content
│   ├── lib/             # Client configuration and utilities
│   ├── schemas/         # Content type definitions
│   ├── fixtures/        # Test data and fixtures
│   ├── scripts/         # Data management scripts
│   └── tests/           # Content validation tests
├── public/              # Static assets
└── styles/              # CSS and styling
```

## 🛠️ Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update the following variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=development
   SANITY_API_TOKEN=your_api_token
   SANITY_PREVIEW_SECRET=your_preview_secret
   ```

3. **Start Development**
   ```bash
   # Start Next.js development server
   npm run dev
   
   # Start Sanity Studio (in another terminal)
   npm run sanity
   ```

## 🗄️ Data Management

### Seed Development Data
```bash
npm run sanity:seed
```

### Reset All Data
```bash
npm run sanity:reset
```

### Environment Datasets
- **Development**: `development` (default for local development)
- **Staging**: `staging` (for testing before production)
- **Production**: `production` (live data)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- Schema validation tests
- Query structure tests
- Fixture data validation tests

## 📝 Content Types

### Documents
- **Posts**: Blog posts with rich content
- **Pages**: Static pages with page builder
- **Authors**: Content creators
- **Categories**: Content organization
- **Site Settings**: Global site configuration

### Page Builder Components
- Hero sections
- Pricing tables
- Testimonials
- Text sections
- CTA sections

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run sanity` | Start Sanity Studio |
| `npm run sanity:build` | Build Sanity Studio |
| `npm run sanity:deploy` | Deploy Sanity Studio |
| `npm run sanity:seed` | Seed development data |
| `npm run sanity:reset` | Reset all data |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage |

## 🔐 Preview Mode

Content editors can preview unpublished content:

1. Navigate to a document in Sanity Studio
2. Click the preview icon
3. View live preview with draft content
4. Exit preview mode using the banner

## 📊 TypeScript Integration

Full TypeScript interfaces are available for all content types:

```typescript
import { Post, Author, Category } from '@/sanity/types'

// Fully typed content queries
const posts: Post[] = await client.fetch(postsQuery)
```

## 🌍 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Environment Variables for Production
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_write_permissions
SANITY_PREVIEW_SECRET=secure_random_string
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests for new functionality
4. Run the test suite
5. Submit a pull request

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

## Component Migration Status

This project recreates all functionality from the original HubSpot implementation:

### ✅ Completed
- Project setup and configuration
- Layout components (Header, Footer)
- Hero section
- Basic UI components (Button, Container)
- Sanity schemas and Studio setup

### 🚧 In Progress
- Blog functionality
- Contact forms
- Pricing section

### 📋 Planned
- All 26 HubSpot modules recreated as modern React components
- Form submissions and integrations
- SEO and analytics setup
- Performance optimizations

## Architecture

This is a completely independent implementation that shares no code with the existing HubSpot version. It's designed to:

- Maintain visual parity with the existing site
- Provide better performance and developer experience
- Enable easier content management through Sanity
- Support modern web standards and accessibility

## Deployment

The application can be deployed to Vercel, Netlify, or any platform supporting Next.js applications.
