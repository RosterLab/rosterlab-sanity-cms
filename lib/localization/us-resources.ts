import type { Metadata } from "next";
import { withHreflang } from "@/components/seo/HreflangTags";
import { localizeUSLink, localizeUSPost, localizeUSText } from "./us-blog";

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
    "$1/us$2",
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

export function resourceMetadata(metadata: Metadata, path: string): Metadata {
  const canonical = `https://rosterlab.com${path}`;
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
        ...withHreflang(result, path),
        robots: { index: false, follow: false },
        alternates: { canonical, languages: {} },
      }
    : withHreflang(result, path);
}

export { localizeUSText };
