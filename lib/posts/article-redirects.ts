// Previous article URLs resolve to the published article in the same region.
export const ARTICLE_REDIRECTS = [
  {
    source: "/blog/should-your-next-staff-schedule-be-built-with-ai",
    destination: "/blog/should-your-next-staff-roster-be-built-with-ai",
    permanent: true,
  },
  {
    source: "/blog/automated-staff-scheduling",
    destination: "/blog/automated-staff-rostering",
    permanent: true,
  },
  // Renamed articles retain their previous URLs as permanent redirects.
  {
    source: "/newsroom/healthnz-and-",
    destination:
      "/newsroom/healthnz-and-rosterlab-partner-on-initial-rollout-of-ai-powered-healthcare-rostering-across-nz",
    permanent: true,
  },
  {
    source:
      "/newsroom/royal-perth-hospital-partners-with-rosterlab-for-smarter-rosters",
    destination:
      "/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-rosters",
    permanent: true,
  },
  {
    source:
      "/us/newsroom/royal-perth-hospital-partners-with-rosterlab-for-smarter-schedules",
    destination:
      "/us/newsroom/hospital-in-perth-partners-with-rosterlab-for-smarter-schedules",
    permanent: true,
  },
  {
    source:
      "/newsroom/building-trust-in-ai-rostering-for-healthcare-improving-fairness-staff-perceptions-and-adoption",
    destination: "/blog/ai-rostering-in-healthcare-trust-fairness",
    permanent: true,
  },
  {
    source:
      "/newsroom/ai-rostering-trial-shows-promising-signs-for-wellbeing-in-radiographers",
    destination: "/newsroom/ai-self-rostering-study-benefits",
    permanent: true,
  },
  {
    source:
      "/newsroom/western-australias-oldest-tertiary-hospital-expands-partnership-with-rosterlab-following-successful-first-year",
    destination:
      "/newsroom/westernaustralia-oldest-tertiary-hospital-expands-partnership-with-rosterlab",
    permanent: true,
  },
] as const;

const destinations = new Map<string, string>(
  ARTICLE_REDIRECTS.map(({ source, destination }) => [source, destination]),
);

// Correct links in older CMS bodies without changing external links or text.
export function canonicalArticleHref(
  href: string | undefined,
): string | undefined {
  if (!href || !/^(?:\/(?!\/)|https?:\/\/)/.test(href)) return href;
  try {
    const url = new URL(href, "https://rosterlab.com");
    if (!["rosterlab.com", "www.rosterlab.com"].includes(url.hostname))
      return href;
    const destination = destinations.get(url.pathname.replace(/\/$/, ""));
    if (!destination) return href;
    url.pathname = destination;
    return href.startsWith("/")
      ? url.pathname + url.search + url.hash
      : url.href;
  } catch {
    return href;
  }
}
