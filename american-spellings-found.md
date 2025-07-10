# American Spellings Found in Codebase

This document lists all American spellings found that need to be changed to British spellings.

## Summary of American Spellings Found

### 1. "color" → "colour"
- **tailwind.config.ts**:
  - Line 11: `colors: {` (in theme configuration)
- **Multiple CSS files**: Used in Tailwind CSS classes like `text-gray-600`, `bg-blue-500`, etc.
- **Common usage**: The word "color" appears in 46+ files, mostly in CSS class names

### 2. "center" → "centre"
- **tailwind.config.ts**:
  - Line 53: `center: true` (in container configuration)
- **Multiple files**: Used in CSS classes like `text-center`, `items-center`, `justify-center`
- **Common usage**: The word "center" appears in 79+ files, mostly in CSS positioning

### 3. "optimize" → "optimise"
- **Multiple content files**:
  - `/app/feature/auto-roster-generation/page.tsx`: Lines 11, 14, 26 - "optimized rosters"
  - `/app/feature/leave-requests/page.tsx`: Line 337 - "mobile-optimized interface"
  - `/app/feature/self-scheduling/page.tsx`: Line 39 - "optimized schedules"
  - `/components/sections/Onboarding.tsx`: Line 181 - "optimized rosters"
  - `/components/layout/Header.tsx`: Line 152 - "Automated schedules optimized"
  - `/components/feature/AIOptimizationModule.tsx`: Line 105 - "Cost optimized"
  - `/components/ui/RosterLoadingBar.tsx`: Line 94 - "Your optimized roster"
  - `/components/ui/SchedulingModule.tsx`: Multiple uses of "optimized" variables
  - `/PAGINATION_README.md`: Multiple references to "SEO-optimized"
  - `/README.md`: Line 17 - "SEO optimized"
  - `/CLAUDE.md`: Lines 58, 70, 76 - "optimization" references
  - `/next.config.ts`: Lines 19-20 - `optimizeCss`, `optimizePackageImports`
  - `/styles/hubspot-fonts.css`: Line 36 - `text-rendering: optimizeLegibility`
  - `/utils/performance.ts`: Line 2 - "optimizing third-party script loading"
  - `/sanity/fixtures/posts.ts`: Line 58 - "workforce optimization"

### 4. "analyze" → "analyse"
- **Multiple content files**:
  - `/app/feature/preferences-rules/page.tsx`: Line 154 - "AI analyzing preferences"
  - `/sanity/fixtures/posts.ts`: Line 30 - "analyzing historical data"
  - `/components/ui/RosterLoadingBar.tsx`: Line 60 - "AI analyzing thousands"
  - Various other files use "analyze" in content

### 5. "organize" → "organise"
- **Multiple content files**:
  - `/app/industries/healthcare/aged-care/page.tsx`: Line 401 - "organizational rules"
  - `/app/careers/page.tsx`: Line 104 - "healthcare organizations"
  - `/app/layout.tsx`: Line 65 - "organization" (structured data)
  - `/app/feature/shift-swaps/page.tsx`: Line 287 - "leading organizations"
  - `/app/feature/open-shifts/page.tsx`: Line 469 - "enable organizations"
  - `/app/why-choose-us/page.tsx`: Lines 43, 305 - "organizations trust"
  - `/components/sections/Pricing.tsx`: Line 65 - "healthcare networks and organizations"
  - `/components/case-studies/CaseStudiesPageContent.tsx`: Line 86 - "global organizations"
  - `/components/seo/StructuredData.tsx`: Multiple uses of "organization"
  - `/CLAUDE.md`: Line 35, 50 - "organized by purpose"
  - `/PAGINATION_README.md`: Line 71 - "better organization"
  - `/README.md`: Line 106 - "Content organization"

### 6. "behavior" → "behaviour"
- **components/blog/TableOfContents.tsx**:
  - Line 82: `behavior: 'smooth'` (in scrollIntoView options)

### 7. "gray" → "grey"
- **Multiple files**: Used extensively in Tailwind CSS classes
  - Common patterns: `text-gray-600`, `bg-gray-100`, `border-gray-200`
  - Found in 56+ files throughout the codebase
  - Examples:
    - `/components/blog/TableOfContents.tsx`: Line 77 - "text-gray-600 hover:text-gray-900"
    - Many UI components use gray color scales

### 8. "customize" → "customise"
- Found in 2 files:
  - `/app/feature/leave-requests/page.tsx`
  - `/app/feature/auto-roster-generation/page.tsx`

## Files Not Containing American Spellings Searched For

The following American spellings were searched but not found in the codebase:
- dialog → dialogue
- fulfill → fulfil
- enrollment → enrolment
- canceled → cancelled
- traveled → travelled
- modeling → modelling
- labeling → labelling
- signaling → signalling
- totaling → totalling
- favorite → favourite
- honor → honour
- labor → labour
- neighbor → neighbour
- humor → humour
- flavor → flavour
- endeavor → endeavour
- license → licence
- defense → defence
- offense → offence
- catalog → catalogue

## Recommendations

1. **CSS Classes**: Most instances of "color", "center", and "gray" are in Tailwind CSS classes. These are framework-specific and should NOT be changed as they are part of the Tailwind CSS API.

2. **Configuration Files**: Some instances like in `tailwind.config.ts` and `next.config.ts` are configuration keys that should NOT be changed as they are part of the framework API.

3. **Content Changes**: Focus on changing American spellings in:
   - User-facing content (page descriptions, headings, text)
   - Comments in code
   - Documentation files
   - Variable names (where safe to do so)

4. **Priority Changes**:
   - Content text using "optimize" → "optimise"
   - Content text using "organize" → "organise"
   - Content text using "analyze" → "analyse"
   - The `behavior: 'smooth'` → `behaviour: 'smooth'` (if the API supports it)