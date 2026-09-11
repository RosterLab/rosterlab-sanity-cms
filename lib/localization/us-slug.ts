// US resource slugs mirror the global article but use American scheduling
// terminology. The transform runs per hyphen-separated segment so that brand
// names keep their spelling: "rosterlab" must never become "schedulelab".
//
// Forward (global -> US) is a pure function. Reverse (US -> global) cannot be,
// because a global slug may legitimately already contain "scheduling" - see
// holiday-staff-scheduling-fairness. Reverse therefore resolves against
// US_SLUG_SOURCES, the published global slugs that actually change, and falls
// back to the identity so an article published after the last refresh still
// resolves instead of 404ing.

const SEGMENTS: Record<string, string> = {
  rostering: "scheduling",
  rostered: "scheduled",
  rosters: "schedules",
  roster: "schedule",
  rosterer: "scheduler",
  rosterers: "schedulers",
};

export function localizeUSSlug(slug: string): string {
  const parts = slug.split("-");
  const out: string[] = [];
  for (const part of parts) {
    // Brand names are single segments containing "roster" and are left alone.
    if (/rosterlab/i.test(part)) {
      out.push(part);
      continue;
    }
    const replacement = SEGMENTS[part.toLowerCase()];
    if (!replacement) {
      out.push(part);
      continue;
    }
    // Replacing "rostering" next to an existing "scheduling" would produce
    // "scheduling-scheduling". Collapse only the duplicate the swap created.
    if (out[out.length - 1] === replacement) continue;
    out.push(replacement);
  }
  return out.join("-");
}

// Published global slugs whose US equivalent differs. Refresh with
// `pnpm localize:slugs` after publishing an article whose slug contains
// roster/rostering; anything missing here still resolves via the identity
// fallback, it just will not get a localized US URL.
export const US_SLUG_SOURCES: readonly string[] = [
  "ai-rostering-in-healthcare-trust-fairness",
  "ai-self-rostering-study-benefits",
  "auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
  "guide-to-rostering",
  "healthnz-and-rosterlab-partner-on-initial-rollout-of-ai-powered-healthcare-rostering-across-nz",
  "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
  "how-plastics-department-used-roster-simulation-to-cut-in-costs",
  "improving-cost-efficiency-staff-rostering",
  "real-cost-of-nurse-turnover-nurse-retention-strategy-through-scheduling-rostering",
  "roster-more-effectively-with-excel-ep2-sleep-days-after-night-shifts",
  "rostering-basics",
  "rotating-rosters",
  "should-your-next-staff-roster-be-built-with-ai",
  "staff-rostering-to-payroll-the-right-way-to-do-it",
  "sydney-tertiary-hospital-saves-300-hours-with-ai-rostering",
  "ukg-healthcare-rostering-software",
  "whanganui-radiography-department-embraces-ai-rostering",
];

const REVERSE: ReadonlyMap<string, string> = new Map(
  US_SLUG_SOURCES.map((globalSlug) => [localizeUSSlug(globalSlug), globalSlug]),
);

export function globalizeUSSlug(usSlug: string): string {
  return REVERSE.get(usSlug) ?? usSlug;
}

// Route paths localize segment by segment, so /templates/free-staff-roster-
// template-excel becomes /templates/free-staff-schedule-template-excel. Dynamic
// segments such as [slug] contain no roster terminology and pass through.
export function localizeUSPathname(pathname: string): string {
  return pathname
    .split("/")
    .map((segment) => (segment ? localizeUSSlug(segment) : segment))
    .join("/");
}

// True when the US route should redirect: the visitor asked for the global
// slug under /us, and a distinct localized slug exists for it.
export function usSlugRedirectTarget(requested: string): string | undefined {
  const localized = localizeUSSlug(requested);
  return localized !== requested && REVERSE.has(localized)
    ? localized
    : undefined;
}

// The US slug an article actually publishes at: an editor's override when set,
// otherwise the derived one. Every consumer - routing, redirect, sitemap and
// hreflang - resolves through here so they cannot disagree about the URL.
export function effectiveUSSlug(post: {
  slug?: { current?: string } | string | null;
  usSlug?: { current?: string } | string | null;
}): string {
  const override =
    typeof post.usSlug === "string" ? post.usSlug : post.usSlug?.current;
  if (override) return override;
  const global =
    typeof post.slug === "string" ? post.slug : (post.slug?.current ?? "");
  return localizeUSSlug(global);
}
