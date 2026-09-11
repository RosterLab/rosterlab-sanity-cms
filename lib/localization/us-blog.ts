import { getUSPath } from "@/components/seo/HreflangTags";
import { localizeUSText, replacements, escapeForRegExp } from "./us-text";
import {
  terminologyForResource,
  usMetaTitleForResource,
} from "./us-terminology";
import { explainUSRegionalTerms } from "./us-regional-context";
import { localizeUSQuotedTerms, isCaseStudy } from "./us-quoted-terms";
import { derivedUSFields, usProtectedTermsFor } from "./us-derived";

export function localizeUSLink(href: string): string {
  if (!href || !/^(?:\/(?!\/)|https?:\/\/)/.test(href)) return href;
  try {
    const url = new URL(href, "https://rosterlab.com");
    if (
      !["https:", "http:"].includes(url.protocol) ||
      !["rosterlab.com", "www.rosterlab.com"].includes(url.hostname)
    )
      return href;
    const pathname = url.pathname.replace(/\/$/, "") || "/";
    const mapped = getUSPath(pathname);
    return mapped ? mapped + url.search + url.hash : href;
  } catch {
    return href;
  }
}

export function localizeUSBodyLinks(
  body: any[] | undefined,
): any[] | undefined {
  return body?.map((block) =>
    block._type === "block"
      ? {
          ...block,
          markDefs: block.markDefs?.map((mark: any) =>
            mark._type === "link"
              ? { ...mark, href: localizeUSLink(mark.href) }
              : mark,
          ),
        }
      : block,
  );
}

export function localizeUSBody(
  body: any[] | undefined,
  protectedTerms: string[] = [],
  terminology: Record<string, string> = {},
): any[] | undefined {
  return localizeUSBodyLinks(body)?.map((block) => {
    if (block._type !== "block") {
      return block._type === "image" && block.alt
        ? {
            ...block,
            alt: localizeUSText(block.alt, protectedTerms, terminology),
          }
        : block;
    }
    if (block.style === "blockquote" || block._key?.startsWith("us-context-"))
      return block;
    const children = block.children || [];
    const text = children.map((child: any) => child.text || "").join("");
    const protectedMarks = new Set(
      (block.markDefs || [])
        .filter((mark: any) => mark._type === "usPreserve")
        .map((mark: any) => mark._key),
    );
    let offset = 0;
    const extra: Range[] = [];
    for (const child of children) {
      const end = offset + (child.text || "").length;
      if (
        child.marks?.some(
          (mark: string) => mark === "code" || protectedMarks.has(mark),
        )
      )
        extra.push([offset, end]);
      offset = end;
    }
    const changes = replacements(text, protectedTerms, extra, terminology);
    offset = 0;
    return {
      ...block,
      children: children.map((child: any) => {
        const start = offset;
        const end = start + (child.text || "").length;
        offset = end;
        if (child._type !== "span") return child;
        let value = child.text || "";
        // Insert replacement at its first span and remove the remaining original
        // characters from later spans. Keep all marks, keys and heading anchors.
        for (const change of changes
          .filter((c) => c.start < end && c.end > start)
          .reverse()) {
          value =
            value.slice(0, Math.max(0, change.start - start)) +
            (change.start >= start ? change.value : "") +
            value.slice(Math.min(value.length, change.end - start));
        }
        return { ...child, text: value };
      }),
      markDefs: block.markDefs?.map((mark: any) =>
        mark._type === "link"
          ? { ...mark, href: localizeUSLink(mark.href) }
          : mark,
      ),
    };
  });
}

export function localizeUSPost<
  T extends { title: string; excerpt?: string; [key: string]: any },
>(
  post: T,
): Omit<T, "title" | "excerpt" | "body" | "seo"> & {
  title: string;
  excerpt?: string;
  body?: any[];
  seo: { metaTitle?: string; metaDescription?: string; ogImage?: any };
} {
  // US values now sit beside their global counterparts (usTitle, usExcerpt,
  // usBody, usSeo...). The older usLocalization object is still read as a
  // fallback so values entered before the move keep rendering unmigrated.
  const legacy = post.usLocalization || {};
  const overrides = {
    protectedTerms: post.usProtectedTerms ?? legacy.protectedTerms,
    title: post.usTitle ?? legacy.title,
    excerpt: post.usExcerpt ?? legacy.excerpt,
    body: post.usBody ?? legacy.body,
    mainImage: post.usMainImage ?? legacy.mainImage,
    metaTitle: post.usSeo?.metaTitle ?? legacy.metaTitle,
    metaDescription: post.usSeo?.metaDescription ?? legacy.metaDescription,
    ogImage: post.usSeo?.ogImage ?? legacy.ogImage,
  };
  // Sanity returns a slug object on documents and a bare string on the
  // projections used by listings, so every per-slug lookup normalizes here.
  const slug = post.slug?.current ?? post.slug;
  const terminology = terminologyForResource(slug);
  // The same derivation the Studio shows as each field's placeholder, so the
  // preview an editor sees is the value this function returns.
  const derived = derivedUSFields(post);
  const protectedTerms = usProtectedTermsFor(post);
  const convert = (value: string | undefined) =>
    value == null
      ? undefined
      : localizeUSText(value, protectedTerms, terminology);
  const convertQuotes = (body: any[] | undefined) =>
    isCaseStudy(post) ? localizeUSQuotedTerms(body) : body;
  return {
    ...post,
    title: overrides.title ?? derived.title!,
    excerpt: overrides.excerpt ?? derived.excerpt,
    // Quotations are protected from the dictionary, so case-study testimony
    // has its roster terminology converted separately.
    body: overrides.body?.length
      ? localizeUSBodyLinks(overrides.body)
      : convertQuotes(
          explainUSRegionalTerms(
            localizeUSBody(post.body, protectedTerms, terminology),
            slug,
          ),
        ),
    // A US image override replaces the artwork outright; otherwise the global
    // image is reused with its alt text localized.
    mainImage:
      overrides.mainImage ??
      (post.mainImage
        ? { ...post.mainImage, alt: convert(post.mainImage.alt) }
        : post.mainImage),
    seo: {
      ...post.seo,
      // A CMS value always wins; the code map only fills the gap where the
      // global headline localizes to itself and the US result would otherwise
      // read as the AU/NZ page.
      metaTitle:
        overrides.metaTitle ??
        (overrides.title ? overrides.title : derived.metaTitle),
      metaDescription:
        overrides.metaDescription ??
        (overrides.excerpt ? overrides.excerpt : derived.metaDescription),
      ogImage: overrides.ogImage ?? post.seo?.ogImage,
    },
  };
}

export { localizeUSText } from "./us-text";
