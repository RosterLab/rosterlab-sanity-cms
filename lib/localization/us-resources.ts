import type { Metadata } from "next";
import { withHreflang } from "@/components/seo/HreflangTags";
import { localizeUSLink, localizeUSPost, localizeUSText } from "./us-blog";
import { localizeUSPathname } from "./us-slug";

// Private survey links retain their identifiers and query tokens. They are
// intentionally absent from the public hreflang/sitemap registry.
export function localizeUSResourceLink(href: string): string {
  const localized = localizeUSLink(href);
  if (localized !== href) {
    return /^https?:\/\//.test(href)
      ? new URL(localized, href).href
      : localized;
  }
  return href.replace(
    /^(https?:\/\/(?:www\.)?rosterlab\.com)?(\/tools\/survey-preferences\/(?:s|admin)\/[^/?#]+|\/whitepapers\/rostering-as-a-strategic-workforce-lever\/unlocked)(?=[?#]|$)/,
    // The whitepaper path localizes with the rest of the US routes. Survey
    // paths carry opaque identifiers and must pass through untouched.
    (_match, origin = "", pathname: string) =>
      `${origin}/us${
        pathname.startsWith("/whitepapers/")
          ? localizeUSPathname(pathname)
          : pathname
      }`,
  );
}

// Survey URLs originate in our create API and use its request host, including
// local/branch previews. Preserve that host and the opaque authorization token.
export function localizeUSSurveyURL(href: string): string {
  const url = new URL(href);
  url.pathname = localizeUSResourceLink(url.pathname);
  return url.href;
}

// CMS results remain sourced from the published global document. Never rewrite
// slugs, user submissions, identities or Sanity image references.
export function localizeUSResourceResult<T>(value: T): T {
  if (Array.isArray(value)) return value.map(localizeUSResourceResult) as T;
  if (value && typeof value === "object" && "title" in value) {
    return localizeUSPost(value as Parameters<typeof localizeUSPost>[0]) as T;
  }
  return value;
}

// US-only metadata overrides for authored and generated pages. Generated copy is
// derived from the global source, so tuning a US title or description here
// avoids editing the global page it came from. Keyed by US path; global calls
// pass a global path and are never matched.
//
// Article metadata is not set here: titles and descriptions for CMS-backed
// blog, case-study and newsroom articles come from Sanity, with per-slug
// fallbacks in ./us-terminology.ts.
const US_METADATA_OVERRIDES: Record<
  string,
  { title?: string; description?: string }
> = {
  // Rendered at 62 characters once the layout appends " | RosterLab".
  "/us/case-studies": { title: "Case Studies: Real AI Scheduling Results" },
  // Description was 114 characters, thin enough that Google may replace it.
  "/us/webinars/building-a-resilient-workforce-with-ai-scheduling-in-healthcare":
    {
      description:
        "Watch our on-demand webinar on how AI-powered scheduling gives hundreds of admin hours back to clinicians and builds more resilient health teams.",
    },
  // The global title renders at 71 characters and would truncate mid-phrase;
  // this one is 48, so it lands at 60 once the layout appends " | RosterLab".
  // The description carried a " | RosterLab" suffix inside the field itself,
  // which spends characters on branding the title already shows.
  "/us/whitepapers/scheduling-as-a-strategic-workforce-lever": {
    title: "Free Whitepaper: Scheduling as a Workforce Lever",
    description:
      "Free whitepaper for healthcare executives: how intelligent scheduling reduces agency spend, staff turnover, and chronic understaffing.",
  },
};

export function resourceMetadata(
  metadata: Metadata,
  path: string,
  options: { singleMarket?: boolean } = {},
): Metadata {
  const canonical = `https://rosterlab.com${path}`;
  const override = US_METADATA_OVERRIDES[path];
  if (override) {
    metadata = {
      ...metadata,
      ...override,
      // Keep the social cards consistent with the page title and description.
      ...(metadata.openGraph
        ? { openGraph: { ...metadata.openGraph, ...override } }
        : {}),
      ...(metadata.twitter
        ? { twitter: { ...metadata.twitter, ...override } }
        : {}),
    };
  }
  const privatePage =
    path.endsWith("/unlocked") ||
    /\/survey-preferences\/(s|admin)\//.test(path);
  const result: Metadata = {
    ...metadata,
    alternates: { ...metadata.alternates, canonical },
    ...(metadata.openGraph
      ? { openGraph: { ...metadata.openGraph, url: canonical } }
      : {}),
  };
  return privatePage
    ? {
        ...withHreflang(result, path, options),
        robots: { index: false, follow: false },
        alternates: { canonical, languages: {} },
      }
    : withHreflang(result, path, options);
}

export { localizeUSText };
