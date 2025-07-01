# Pagination Implementation

This document describes the pagination implementation for the blog, case studies, and newsroom sections.

## Features Implemented

✅ **12 posts per page** for optimal Core Web Vitals performance
✅ **Real anchor links** in HTML with proper href attributes
✅ **Consistent URL pattern**: `/section/page/[number]` (e.g., `/blog/page/2`)
✅ **Self-canonical links** on every page
✅ **Sequential linking** with prev/next buttons and direct page number links
✅ **SEO-optimized titles/descriptions** (de-optimized beyond page 1)
✅ **No noindex/robots blocks** on pagination pages
✅ **Sitemap includes all paginated URLs**
✅ **Search functionality preserved** across all pages

## URL Structure

- **Blog**: 
  - Page 1: `/blog` (canonical)
  - Page 2+: `/blog/page/[number]`
  
- **Case Studies**: 
  - Page 1: `/case-studies` (canonical)
  - Page 2+: `/case-studies/page/[number]`
  
- **Newsroom**: 
  - Page 1: `/newsroom` (canonical)
  - Page 2+: `/newsroom/page/[number]`

## SEO Best Practices

### Metadata Optimization
- **Page 1**: Full SEO-optimized title and description
- **Page 2+**: De-optimized with page numbers to avoid keyword cannibalization

### Canonical URLs
- Each page has proper `rel="canonical"` pointing to the correct URL
- Page 1 canonicals point to base URL (e.g., `/blog`)
- Page 2+ canonicals include page number (e.g., `/blog/page/2`)

### Navigation Structure
- **Previous/Next links** with proper `rel="prev"` and `rel="next"` attributes
- **Numbered pagination** with up to 5 visible page numbers
- **Ellipsis indicators** for large page ranges
- **First/Last page** always visible when applicable

## Search Functionality

The search feature works seamlessly with pagination:
- When searching, pagination is **disabled** and **all matching results** are shown
- When **not searching**, results are **paginated** normally
- Search works across **all posts**, not just the current page
- **Clear search** button returns to paginated view

## Technical Implementation

### Components
- `components/ui/Pagination.tsx` - Reusable pagination component
- Updated content components to handle `currentPage` prop
- Dynamic route pages at `[section]/page/[page]/page.tsx`

### Static Generation
- `generateStaticParams()` pre-generates all pagination pages
- Error handling for edge cases (no posts, invalid page numbers)
- Proper 404 handling for non-existent pages

### Sitemap Integration
- All paginated URLs included in `sitemap.xml`
- Proper priority and change frequency settings
- Separated by content type for better organization

## Performance Considerations

- **12 posts per page** optimized for Core Web Vitals
- **Static generation** for all pagination pages
- **Efficient queries** to Sanity CMS
- **Minimal JavaScript** for pagination interactions
- **Proper caching headers** through Next.js

## Browser Support

- Works in all modern browsers
- Progressive enhancement approach
- Graceful degradation without JavaScript
- Accessible keyboard navigation
- Screen reader compatible

## Future Enhancements

Potential improvements for the future:
- Infinite scroll option as alternative to pagination
- URL persistence for search queries
- Advanced filtering options
- Loading states for better UX
- A/B testing for pagination vs infinite scroll