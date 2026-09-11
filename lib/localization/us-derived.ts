// What the US page shows for a field when no editor override is set. Kept
// separate from us-blog so both the site and the Sanity Studio can compute it:
// the Studio uses these values as the placeholder in each US field, so an
// editor sees exactly what will render before deciding to override it.
//
// Dependency-free on purpose - no routing, no link rewriting, nothing that
// cannot be bundled into the Studio.

import { localizeUSText } from "./us-text";
import {
  terminologyForResource,
  usMetaTitleForResource,
} from "./us-terminology";
import { localizeUSSlug } from "./us-slug";

// Official names found in the published resource audit. American spelling must
// never rename these organizations; editors protect new names per document.
const PROTECTED_NAMES = [
  "Dargaville Medical Centre",
  "Melbourne Convention & Exhibition Centre",
  "Dr. Fernando, Consultant, Auckland Tertiary Hospital",
];

type DerivablePost = {
  title?: string;
  excerpt?: string;
  slug?: { current?: string } | string | null;
  seo?: { metaTitle?: string; metaDescription?: string } | null;
  author?: { name?: string } | null;
  authors?: ({ name?: string } | null)[] | null;
  usProtectedTerms?: string[] | null;
  usLocalization?: { protectedTerms?: string[] | null } | null;
};

export function usProtectedTermsFor(post: DerivablePost): string[] {
  return [
    ...PROTECTED_NAMES,
    ...(post.usProtectedTerms || post.usLocalization?.protectedTerms || []),
    ...(post.authors || []).map((author) => author?.name),
    post.author?.name,
  ].filter(Boolean) as string[];
}

export type DerivedUSFields = {
  title?: string;
  excerpt?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export function derivedUSFields(post: DerivablePost): DerivedUSFields {
  // Sanity returns a slug object on documents and a bare string on the
  // projections used by listings, so normalize once.
  const slug =
    typeof post.slug === "string"
      ? post.slug
      : (post.slug?.current ?? undefined);
  const terminology = terminologyForResource(slug);
  const protectedTerms = usProtectedTermsFor(post);
  const convert = (value: string | undefined | null) =>
    value == null
      ? undefined
      : localizeUSText(value, protectedTerms, terminology);

  return {
    title: convert(post.title),
    excerpt: convert(post.excerpt),
    slug: slug ? localizeUSSlug(slug) : undefined,
    // Mirrors us-blog: the per-slug map fills the gap where a global headline
    // localizes to itself, otherwise the dictionary converts it.
    metaTitle:
      usMetaTitleForResource(slug, post.seo?.metaTitle) ??
      convert(post.seo?.metaTitle),
    metaDescription: convert(post.seo?.metaDescription),
  };
}
