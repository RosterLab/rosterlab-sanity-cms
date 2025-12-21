// URL mappings for US version
export const US_URL_MAPPINGS: Record<string, string> = {
  // Main pages
  "/": "/us",
  "/about": "/us/about",
  "/pricing": "/us/pricing",
  "/contact": "/us/contact",
  "/book-a-demo": "/us/book-a-demo",
  "/why-rosterlab": "/us/why-rosterlab",

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
  "/feature/rules-engine": "/us/feature/rules-engine",
  "/feature/open-shifts": "/us/feature/open-shifts",
  "/feature/shift-swaps": "/us/feature/shift-swaps-and-trades",
  "/feature/leave-requests": "/us/feature/time-off-requests",
  "/feature/self-scheduling": "/us/feature/self-scheduling",
  "/feature/re-rostering": "/us/feature/staff-rescheduling",
  "/feature/ai-staff-rostering-assistant":
    "/us/feature/ai-staff-scheduling-assistant",

  // Schedule types
  "/type/on-call-roster": "/us/type/on-call-scheduling",
  "/type/long-roster": "/us/type/long-term-schedule-planning",

  // Industries - with terminology changes
  "/industries": "/us/industries",
  "/industries/healthcare": "/us/industries/healthcare-scheduling",
  "/industries/healthcare/aged-care":
    "/us/industries/healthcare/senior-care-scheduling",
  "/industries/healthcare/ed-icu":
    "/us/industries/healthcare/ed-icu-scheduling",
  "/industries/healthcare/radiology":
    "/us/industries/healthcare/radiology-scheduling",
  "/industries/healthcare/radiography":
    "/us/industries/healthcare/radiography-scheduling",
  "/industries/healthcare/junior-medical-officer-rostering":
    "/us/industries/healthcare/physician-scheduling",
  "/industries/healthcare/nurse-rostering":
    "/us/industries/healthcare/nurse-scheduling",
  "/industries/healthcare/veterinary-rostering":
    "/us/industries/healthcare/veterinary-scheduling",
  "/industries/healthcare/senior-medical-officer-rostering":
    "/us/industries/healthcare/attending-physician-scheduling",
  "/industries/port-rostering": "/us/industries/port-scheduling",
  "/industries/call-centre-rostering": "/us/industries/call-center-scheduling",
  "/industries/hospitality-roster": "/us/industries/hospitality-scheduling",
  "/industries/retail-roster": "/us/industries/retail-scheduling",
  "/industries/manufacturing-roster": "/us/industries/manufacturing-scheduling",
  "/industries/education-roster": "/us/industries/education-scheduling",
  "/industries/public-services-roster":
    "/us/industries/emergency-services-scheduling",
  "/industries/security-roster": "/us/industries/security-scheduling",
  "/industries/airports-and-transportation-roster":
    "/us/industries/airport-transportation-scheduling",
  "/industries/healthcare/pathology-rostering":
    "/us/industries/healthcare/pathology-scheduling",
  "/industries/healthcare/telehealth-rostering":
    "/us/industries/healthcare/telehealth-scheduling",
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
  "/why-rosterlab",

  // Tools
  "/tools/roi-calculator",
  "/staff-rostering-interactive-demo",

  // Solutions
  "/solutions/staff-roster-mobile-app",
  "/solutions/ai-roster-generator",
  "/solutions/free-staff-rostering-software",

  // Features
  "/feature/automated-rostering",
  "/feature/rules-engine",
  "/feature/open-shifts",
  "/feature/shift-swaps",
  "/feature/leave-requests",
  "/feature/self-scheduling",
  "/feature/re-rostering",
  "/feature/ai-staff-rostering-assistant",

  // Schedule types
  "/type/on-call-roster",
  "/type/long-roster",

  // Industries
  "/industries",
  "/industries/healthcare",
  "/industries/healthcare/aged-care",
  "/industries/healthcare/ed-icu",
  "/industries/healthcare/radiology",
  "/industries/healthcare/radiography",
  "/industries/healthcare/junior-medical-officer-rostering",
  "/industries/healthcare/nurse-rostering",
  "/industries/healthcare/veterinary-rostering",
  "/industries/healthcare/senior-medical-officer-rostering",
  "/industries/port-rostering",
  "/industries/call-centre-rostering",
  "/industries/hospitality-roster",
  "/industries/retail-roster",
  "/industries/manufacturing-roster",
  "/industries/education-roster",
  "/industries/public-services-roster",
  "/industries/security-roster",
  "/industries/airports-and-transportation-roster",
  "/industries/healthcare/pathology-rostering",
  "/industries/healthcare/telehealth-rostering",
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
