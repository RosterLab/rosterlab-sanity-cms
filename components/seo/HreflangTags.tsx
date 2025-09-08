// URL mappings for US version
export const US_URL_MAPPINGS: Record<string, string> = {
  // Main pages
  '/': '/us/',
  '/about': '/us/about',
  '/pricing': '/us/pricing',
  '/contact': '/us/contact',
  '/book-a-demo': '/us/book-a-demo',
  
  // Tools
  '/roi-calculator': '/us/tools/roi-calculator',
  '/staff-rostering-interactive-demo': '/us/staff-scheduling-interactive-demo',
  
  // Solutions - with terminology changes
  '/solutions/staff-roster-mobile-app': '/us/solutions/staff-schedule-mobile-app',
  '/solutions/ai-staff-scheduling': '/us/solutions/ai-staff-schedule-maker',
  '/solutions/free-staff-scheduling': '/us/solutions/free-staff-scheduling-tool',
  
  // Features - with terminology changes
  '/feature/auto-roster-generation': '/us/feature/auto-scheduling',
  '/feature/open-shifts': '/us/feature/open-shifts',
  '/feature/shift-swaps': '/us/feature/shift-swaps-and-trades',
  '/feature/leave-requests': '/us/feature/time-off-requests',
  '/feature/self-scheduling': '/us/feature/self-scheduling',
  '/feature/re-rostering': '/us/feature/shift-rescheduling',
  
  // Industries - with terminology changes
  '/industries': '/us/industries',
  '/industries/healthcare': '/us/industries/healthcare-scheduling',
  '/industries/healthcare/aged-care': '/us/industries/healthcare/senior-care-scheduling',
  '/industries/healthcare/ed-icu': '/us/industries/healthcare/ed-icu-scheduling',
  '/industries/healthcare/radiology': '/us/industries/healthcare/radiology-scheduling',
}

// Reverse mapping to find original URL from US version
export const REVERSE_US_MAPPINGS: Record<string, string> = Object.entries(US_URL_MAPPINGS).reduce(
  (acc, [original, us]) => ({ ...acc, [us]: original }),
  {}
)

// Pages that have US versions
export const LOCALIZED_PAGES = new Set([
  // Main pages
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/book-a-demo',
  
  // Tools
  '/roi-calculator',
  '/staff-rostering-interactive-demo',
  
  // Solutions
  '/solutions/staff-roster-mobile-app',
  '/solutions/ai-staff-scheduling',
  '/solutions/free-staff-scheduling',
  
  // Features
  '/feature/auto-roster-generation',
  '/feature/open-shifts',
  '/feature/shift-swaps',
  '/feature/leave-requests',
  '/feature/self-scheduling',
  '/feature/re-rostering',
  
  // Industries
  '/industries',
  '/industries/healthcare',
  '/industries/healthcare/aged-care',
  '/industries/healthcare/ed-icu',
  '/industries/healthcare/radiology',
])

// Helper function to generate hreflang metadata
export function generateHreflangMetadata(pathname: string) {
  const baseUrl = 'https://rosterlab.com'
  
  // Determine the original path and whether we're on a US page
  const isUSPage = pathname.startsWith('/us/')
  const originalPath = isUSPage 
    ? (REVERSE_US_MAPPINGS[pathname] || pathname.replace('/us', ''))
    : pathname
  
  // Check if this page has localized versions
  const hasLocalizedVersions = LOCALIZED_PAGES.has(originalPath)
  
  if (!hasLocalizedVersions) {
    return {}
  }
  
  // Get the US path
  const usPath = US_URL_MAPPINGS[originalPath] || `/us${originalPath}`
  
  return {
    alternates: {
      languages: {
        'en-AU': `${baseUrl}${originalPath}`,
        'en-NZ': `${baseUrl}${originalPath}`,
        'en-US': `${baseUrl}${usPath}`,
        'x-default': `${baseUrl}${originalPath}`,
      },
    },
  }
}

// Helper to merge hreflang metadata into existing metadata
export function withHreflang(metadata: any, pathname: string) {
  const hreflangData = generateHreflangMetadata(pathname)
  
  return {
    ...metadata,
    ...hreflangData,
    // Preserve any existing alternates
    alternates: {
      ...metadata.alternates,
      ...hreflangData.alternates,
    },
  }
}