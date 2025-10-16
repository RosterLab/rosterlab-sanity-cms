// URL mappings for US version
export const US_URL_MAPPINGS: Record<string, string> = {
  // Main pages
  "/": "/us",
  "/about": "/us/about",
  "/pricing": "/us/pricing",
  "/contact": "/us/contact",
  "/book-a-demo": "/us/book-a-demo",

  // Tools
  "/tools/roi-calculator": "/us/tools/savings-calculator",
  "/staff-rostering-interactive-demo": "/us/product-tour",

  // Solutions - with terminology changes
  "/solutions/staff-roster-mobile-app":
    "/us/solutions/staff-scheduling-mobile-app",
  "/solutions/ai-roster-generator": "/us/solutions/ai-staff-schedule-maker",
  "/solutions/free-staff-rostering-software":
    "/us/solutions/free-staff-scheduling-tool",

  // Features - with terminology changes
  "/feature/automated-rostering": "/us/feature/auto-scheduling",
  "/feature/open-shifts": "/us/feature/open-shifts",
  "/feature/shift-swaps": "/us/feature/shift-swaps-and-trades",
  "/feature/leave-requests": "/us/feature/time-off-requests",
  "/feature/self-scheduling": "/us/feature/self-scheduling",
  "/feature/re-rostering": "/us/feature/staff-rescheduling",

  // Industries - with terminology changes
  "/industries": "/us/industries",
  "/industries/healthcare": "/us/industries/healthcare-scheduling",
  "/industries/healthcare/aged-care":
    "/us/industries/healthcare/senior-care-scheduling",
  "/industries/healthcare/ed-icu":
    "/us/industries/healthcare/ed-icu-scheduling",
  "/industries/healthcare/radiology":
    "/us/industries/healthcare/radiology-scheduling",
  "/industries/healthcare/junior-medical-officer-rostering":
    "/us/industries/healthcare/physician-scheduling",
  "/industries/healthcare/nurse-rostering":
    "/us/industries/healthcare/nurse-scheduling",
  "/industries/healthcare/veterinary-rostering":
    "/us/industries/healthcare/veterinary-scheduling",
};

// Reverse mapping to find original URL from US version
export const REVERSE_US_MAPPINGS: Record<string, string> = Object.entries(
  US_URL_MAPPINGS,
).reduce((acc, [original, us]) => ({ ...acc, [us]: original }), {});

// Pages that have US versions
export const LOCALIZED_PAGES = new Set([
  // Main pages
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/book-a-demo",

  // Tools
  "/tools/roi-calculator",
  "/staff-rostering-interactive-demo",

  // Solutions
  "/solutions/staff-roster-mobile-app",
  "/solutions/ai-roster-generator",
  "/solutions/free-staff-rostering-software",

  // Features
  "/feature/automated-rostering",
  "/feature/open-shifts",
  "/feature/shift-swaps",
  "/feature/leave-requests",
  "/feature/self-scheduling",
  "/feature/re-rostering",

  // Industries
  "/industries",
  "/industries/healthcare",
  "/industries/healthcare/aged-care",
  "/industries/healthcare/ed-icu",
  "/industries/healthcare/radiology",
  "/industries/healthcare/junior-medical-officer-rostering",
  "/industries/healthcare/nurse-rostering",
  "/industries/healthcare/veterinary-rostering",
]);

// Helper function to generate hreflang metadata
export function generateHreflangMetadata(pathname: string) {
  const baseUrl = "https://rosterlab.com";

  // Normalize pathname - remove trailing slashes
  const normalizedPathname =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  // Determine the original path and whether we're on a US page
  const isUSPage =
    normalizedPathname === "/us" || normalizedPathname.startsWith("/us/");

  let originalPath: string;
  let usPath: string;

  if (isUSPage) {
    // For US pages, find the original path using reverse mapping
    originalPath = REVERSE_US_MAPPINGS[normalizedPathname];

    if (!originalPath) {
      // If no reverse mapping found, this US page doesn't have a corresponding original page
      // Don't generate hreflang tags
      return {};
    }

    usPath = normalizedPathname;
  } else {
    // For non-US pages, check if it has a localized version
    originalPath = normalizedPathname;

    // Check if this page has localized versions
    if (!LOCALIZED_PAGES.has(originalPath)) {
      return {};
    }

    usPath = US_URL_MAPPINGS[originalPath];

    if (!usPath) {
      // This shouldn't happen if LOCALIZED_PAGES and US_URL_MAPPINGS are in sync
      console.warn(
        `Page ${originalPath} is in LOCALIZED_PAGES but has no US mapping`,
      );
      return {};
    }
  }

  // For homepage, don't include the trailing slash to match canonical
  const formatUrl = (path: string) => {
    return path === "/" ? baseUrl : `${baseUrl}${path}`;
  };

  return {
    alternates: {
      languages: {
        "en-AU": formatUrl(originalPath),
        "en-NZ": formatUrl(originalPath),
        "en-US": formatUrl(usPath),
        "x-default": formatUrl(originalPath),
      },
    },
  };
}

// Helper to merge hreflang metadata into existing metadata
export function withHreflang(metadata: any, pathname: string) {
  const hreflangData = generateHreflangMetadata(pathname);

  return {
    ...metadata,
    ...hreflangData,
    // Preserve any existing alternates
    alternates: {
      ...metadata.alternates,
      ...hreflangData.alternates,
    },
  };
}
