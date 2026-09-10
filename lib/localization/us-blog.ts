import { getUSPath } from "@/components/seo/HreflangTags";
import {
  terminologyForResource,
  protectedBodyTermsForResource,
  usMetaTitleForResource,
} from "./us-terminology";
import { explainUSRegionalTerms } from "./us-regional-context";
import { glossUSQuotedTerms, isCaseStudy } from "./us-quote-gloss";

// Deliberately exclude contextual terms such as leave, employee, aged care,
// holidays and professional titles. Editors can adapt these in US overrides.
const dictionary: Record<string, string> = {
  rostering: "scheduling",
  rostered: "scheduled",
  rosterer: "scheduler",
  rosterers: "schedulers",
  rosters: "schedules",
  roster: "schedule",
  "re-rostering": "rescheduling",
  "re-roster": "reschedule",
  optimise: "optimize",
  optimises: "optimizes",
  optimised: "optimized",
  optimising: "optimizing",
  optimiser: "optimizer",
  optimisation: "optimization",
  optimisations: "optimizations",
  organise: "organize",
  organises: "organizes",
  organised: "organized",
  organising: "organizing",
  organisation: "organization",
  organisations: "organizations",
  organisational: "organizational",
  colour: "color",
  colours: "colors",
  coloured: "colored",
  colouring: "coloring",
  favour: "favor",
  favours: "favors",
  favourite: "favorite",
  favourites: "favorites",
  favouritism: "favoritism",
  centre: "center",
  centres: "centers",
  labour: "labor",
  behaviour: "behavior",
  behaviours: "behaviors",
  analyse: "analyze",
  analyses: "analyses",
  analysed: "analyzed",
  analysing: "analyzing",
  customise: "customize",
  customised: "customized",
  customisable: "customizable",
  customising: "customizing",
  customisation: "customization",
  standardise: "standardize",
  standardised: "standardized",
  standardisation: "standardization",
  digitise: "digitize",
  digitised: "digitized",
  digitising: "digitizing",
  minimise: "minimize",
  minimises: "minimizes",
  minimised: "minimized",
  minimising: "minimizing",
  maximise: "maximize",
  maximises: "maximizes",
  maximised: "maximized",
  maximising: "maximizing",
  recognise: "recognize",
  recognised: "recognized",
  recognising: "recognizing",
  prioritise: "prioritize",
  prioritises: "prioritizes",
  prioritised: "prioritized",
  prioritising: "prioritizing",
  specialise: "specialize",
  specialises: "specializes",
  specialised: "specialized",
  specialising: "specializing",
  specialisation: "specialization",
  specialisations: "specializations",
  realise: "realize",
  realises: "realizes",
  realised: "realized",
  realising: "realizing",
  utilise: "utilize",
  utilises: "utilizes",
  utilised: "utilized",
  utilising: "utilizing",
  utilisation: "utilization",
  summarise: "summarize",
  summarises: "summarizes",
  summarised: "summarized",
  summarising: "summarizing",
  programme: "program",
  programmes: "programs",
  personalise: "personalize",
  personalises: "personalizes",
  personalised: "personalized",
  personalising: "personalizing",
  personalisation: "personalization",
  paediatric: "pediatric",
  paediatrics: "pediatrics",
  anaesthesia: "anesthesia",
  anaesthetic: "anesthetic",
  anaesthetics: "anesthetics",
  "operating theatre": "operating room",
  "operating theatres": "operating rooms",
  "hours per fortnight": "hours over two weeks",
  wellbeing: "well-being",
  practising: "practicing",
  practise: "practice",
  practised: "practiced",
  speciality: "specialty",
  specialities: "specialties",
  centralising: "centralizing",
  licence: "license",
  licences: "licenses",
  licencing: "licensing",
  whilst: "while",
};
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const terms = new RegExp(
  `\\b(?:${Object.keys(dictionary)
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|")})\\b`,
  "gi",
);
type Range = [number, number];

function protectedRanges(text: string, protectedTerms: string[]): Range[] {
  const ranges: Range[] = [];
  // Preserve quotations, URLs and email addresses verbatim, including across spans.
  const patterns = [
    /“[^”]*”|"[^"]*"|‘[^\n]*?’(?!\w)|(?<!\w)'[^\n]+?'(?!\w)/g,
    /https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]+/gi,
  ];
  for (const pattern of patterns)
    for (const match of text.matchAll(pattern))
      ranges.push([match.index!, match.index! + match[0].length]);
  for (const term of protectedTerms.filter(Boolean)) {
    for (const match of text.matchAll(new RegExp(escape(term), "gi")))
      ranges.push([match.index!, match.index! + match[0].length]);
  }
  return ranges;
}
function replacements(
  text: string,
  protectedTerms: string[],
  extra: Range[] = [],
  terminology: Record<string, string> = {},
) {
  const ranges = [...protectedRanges(text, protectedTerms), ...extra];
  const words = { ...dictionary, ...terminology };
  const matcher = Object.keys(terminology).length
    ? new RegExp(
        `(?<!\\w)(?:${Object.keys(words)
          .sort((a, b) => b.length - a.length)
          .map(escape)
          .join("|")})(?!\\w)`,
        "gi",
      )
    : terms;
  return Array.from(text.matchAll(matcher))
    .filter(
      (m) =>
        !ranges.some(([a, b]) => m.index! < b && m.index! + m[0].length > a),
    )
    .map((m) => {
      const original = m[0];
      let value = words[original.toLowerCase()];
      if (
        original === original.toUpperCase() &&
        !terminology[original.toLowerCase()]
      )
        value = value.toUpperCase();
      else if (
        original[0] === original[0].toUpperCase() &&
        !/^[A-Z]{2,}s?\b/.test(original)
      )
        value = value[0].toUpperCase() + value.slice(1);
      return { start: m.index!, end: m.index! + original.length, value };
    });
}
export function localizeUSText(
  text: string,
  protectedTerms: string[] = [],
  terminology: Record<string, string> = {},
): string {
  let result = text;
  for (const change of replacements(
    text,
    protectedTerms,
    [],
    terminology,
  ).reverse())
    result =
      result.slice(0, change.start) + change.value + result.slice(change.end);
  return result;
}

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
  const overrides = post.usLocalization || {};
  // Sanity returns a slug object on documents and a bare string on the
  // projections used by listings, so every per-slug lookup normalizes here.
  const slug = post.slug?.current ?? post.slug;
  const terminology = terminologyForResource(slug);
  const protectedTerms = [
    // Official names found in the published resource audit. American spelling
    // must never rename these organizations; editors can protect new names below.
    "Dargaville Medical Centre",
    "Melbourne Convention & Exhibition Centre",
    "Dr. Fernando, Consultant, Auckland Tertiary Hospital",
    ...(overrides.protectedTerms || []),
    post.author?.name,
  ].filter(Boolean);
  const convert = (value: string | undefined) =>
    value == null
      ? undefined
      : localizeUSText(value, protectedTerms, terminology);
  // Some articles are found by the very term the localizer would replace, so
  // their body keeps it while the headline and metadata still localize.
  const bodyProtectedTerms = [
    ...protectedTerms,
    ...protectedBodyTermsForResource(slug),
  ];
  const gloss = (body: any[] | undefined) =>
    isCaseStudy(post) ? glossUSQuotedTerms(body) : body;
  return {
    ...post,
    title: overrides.title ?? convert(post.title)!,
    excerpt: overrides.excerpt ?? convert(post.excerpt),
    // Case-study quotations keep their wording but gain an inline gloss, so a
    // US reader sees "roster (schedule)" without the quote being rewritten.
    body: overrides.body?.length
      ? localizeUSBodyLinks(overrides.body)
      : gloss(
          explainUSRegionalTerms(
            localizeUSBody(post.body, bodyProtectedTerms, terminology),
            slug,
          ),
        ),
    mainImage: post.mainImage
      ? { ...post.mainImage, alt: convert(post.mainImage.alt) }
      : post.mainImage,
    seo: {
      ...post.seo,
      // A CMS value always wins; the code map only fills the gap where the
      // global headline localizes to itself and the US result would otherwise
      // read as the AU/NZ page.
      metaTitle:
        overrides.metaTitle ??
        (overrides.title
          ? overrides.title
          : (usMetaTitleForResource(slug, post.seo?.metaTitle) ??
            convert(post.seo?.metaTitle))),
      metaDescription:
        overrides.metaDescription ??
        (overrides.excerpt
          ? overrides.excerpt
          : convert(post.seo?.metaDescription)),
    },
  };
}
