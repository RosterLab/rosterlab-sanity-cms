/**
 * Pure helpers for the country-dependent CTAs. They live outside the client
 * provider so server components can call them too.
 */

export function isFreeSignupHref(href: string): boolean {
  const normalized = href.toLowerCase().replace(/\/$/, "");
  return (
    normalized === "/start-free" ||
    normalized === "https://app.rosterlab.com/signup"
  );
}

const DEMO_BOOKING_PATHS = new Set(["/book-a-demo", "/us/book-a-demo"]);

/** True when `href` points at one of the Calendly-backed booking pages. */
export function isDemoBookingHref(href: string): boolean {
  const [path = ""] = href.split(/[?#]/);
  const normalized = path
    .toLowerCase()
    .replace(/^https?:\/\/(?:www\.)?rosterlab\.com/, "")
    .replace(/\/+$/, "");
  return DEMO_BOOKING_PATHS.has(normalized);
}

/**
 * Countries without live demo coverage get the request form instead of the
 * calendar, so every CTA pointing there has to promise a request rather than a
 * booking. Only the verb changes; the surrounding casing is left alone so
 * "Book a Demo" and "Book a demo" both keep their own style.
 */
export function toRequestDemoLabel(label: string): string {
  return label.replace(/\bbook\b/gi, (match) =>
    match[0] === match[0].toUpperCase() ? "Request" : "request",
  );
}
