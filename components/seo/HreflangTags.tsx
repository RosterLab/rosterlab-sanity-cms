import {
  RESOURCE_PATHS,
  RESOURCE_US_MAPPINGS,
} from "@/lib/localization/resource-routes";
import { localizeUSSlug, globalizeUSSlug } from "@/lib/localization/us-slug";

// URL mappings for US version
export const US_URL_MAPPINGS: Record<string, string> = {
  ...RESOURCE_US_MAPPINGS,
  // Main pages
  "/blog": "/us/blog",
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
  "/industries/construction-rostering":
    "/us/industries/construction-scheduling",
  "/industries/healthcare/dental-clinic-rostering":
    "/us/industries/healthcare/dental-clinic-scheduling",
  "/industries/airports-and-transportation-roster/ground-crew":
    "/us/industries/airports-and-transportation-schedule/ground-crew",
};

// Reverse mapping to find original URL from US version
export const REVERSE_US_MAPPINGS: Record<string, string> = Object.entries(
  US_URL_MAPPINGS,
).reduce((acc, [original, us]) => ({ ...acc, [us]: original }), {});

// Pages that have US versions
export const LOCALIZED_PAGES = new Set([
  ...RESOURCE_PATHS,
  // Main pages
  "/blog",
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
  "/industries/construction-rostering",
  "/industries/healthcare/dental-clinic-rostering",
  "/industries/airports-and-transportation-roster/ground-crew",
]);

// US article URLs localize the published slug (rostering-basics becomes
// scheduling-basics). Pagination keeps the same route structure in both
// regions; unknown resource types remain global.
const ARTICLE_PATH = /^\/(blog|case-studies|newsroom)\/(?!page(?:\/|$))([^/]+)$/;
const PAGINATION_PATH = /^\/(?:blog|case-studies|newsroom)\/page\/[1-9]\d*$/;

export function getUSPath(pathname: string): string | undefined {
  const mapped = US_URL_MAPPINGS[pathname];
  if (mapped) return mapped;
  if (PAGINATION_PATH.test(pathname)) return `/us${pathname}`;
  const article = ARTICLE_PATH.exec(pathname);
  return article
    ? `/us/${article[1]}/${localizeUSSlug(article[2])}`
    : undefined;
}

export function getGlobalPath(pathname: string): string | undefined {
  const mapped = REVERSE_US_MAPPINGS[pathname];
  if (mapped) return mapped;
  if (!pathname.startsWith("/us/")) return undefined;
  const rest = pathname.slice(3);
  if (PAGINATION_PATH.test(rest)) return rest;
  const article = ARTICLE_PATH.exec(rest);
  return article
    ? `/${article[1]}/${globalizeUSSlug(article[2])}`
    : undefined;
}

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
    originalPath = getGlobalPath(normalizedPathname)!;

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
    if (!getUSPath(originalPath)) {
      return {};
    }

    usPath = getUSPath(originalPath)!;

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
        // Language-only tag: every English market without a dedicated page
        // (UK, Canada, Ireland, Singapore, etc). Region codes below are more
        // specific, so en-US still wins for US searchers.
        en: formatUrl(originalPath),
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
  const noindex =
    typeof metadata.robots === "string"
      ? /\bnoindex\b/i.test(metadata.robots)
      : metadata.robots?.index === false;
  const hreflangData = noindex
    ? { alternates: { languages: {} } }
    : generateHreflangMetadata(pathname);

  return {
    ...metadata,
    // The root layout appends " | RosterLab". Already branded titles must be
    // absolute to avoid a second brand suffix in the rendered title element.
    ...(typeof metadata.title === "string" &&
    /\brosterlab\b/i.test(metadata.title)
      ? { title: { absolute: metadata.title } }
      : {}),
    ...((pathname === "/us" || pathname.startsWith("/us/")) &&
    metadata.openGraph
      ? { openGraph: { ...metadata.openGraph, locale: "en_US" } }
      : {}),
    ...hreflangData,
    // Preserve any existing alternates
    alternates: {
      ...metadata.alternates,
      ...hreflangData.alternates,
    },
  };
}
