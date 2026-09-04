/**
 * The rendered HTML is shared at the CDN across every visitor (see the
 * `Netlify-CDN-Cache-Control` rule in next.config.ts), so the server can't know
 * the visitor's country. Deciding the country-dependent CTAs in React instead
 * meant the first paint always showed the wrong version and it corrected itself
 * a round-trip later.
 *
 * So both versions are always rendered and CSS picks between them, driven by
 * attributes on `<html>`: set before first paint by MARKET_ACCESS_HINT_SCRIPT
 * from the previous visit's cached decision, then corrected by
 * MarketAccessProvider once /api/market-access answers.
 *
 * Two gates ride on this:
 *   - the free-signup CTA, hidden until the country is known (fail closed)
 *   - the demo CTA's verb, "Book" vs "Request", for the countries that land on
 *     the request form instead of Calendly
 */

/** Tags a free-signup CTA. Only ever *hides* — never sets a display of its own,
 *  so a shown CTA keeps its layout and its share of a parent's space-x/gap. */
export const FREE_SIGNUP_GATE_CLASS = "free-signup-gate";

/** Tags the two halves of a demo CTA's label; exactly one is ever visible. */
export const DEMO_LABEL_BOOK_CLASS = "demo-cta-book";
export const DEMO_LABEL_REQUEST_CLASS = "demo-cta-request";

export const MARKET_ACCESS_HINT_KEY = "rl:market-access";
export const FREE_SIGNUP_ATTRIBUTE = "data-free-signup";
export const DEMO_MODE_ATTRIBUTE = "data-demo-mode";

/** A stale hint is only ever a first-paint guess, but don't trust an ancient one. */
const HINT_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface MarketAccessHint {
  /** "show" only when the country was confirmed eligible. */
  freeSignup: "show" | "hide";
  /** "request" only when the country lands on the request form. */
  demo: "request" | "book";
  ts: number;
}

/**
 * Runs blocking in <head>, before the body paints. Only the non-default states
 * are applied — a missing, expired or corrupt hint leaves the CSS defaults,
 * which hide the free-signup CTA and keep the "Book" wording.
 */
export const MARKET_ACCESS_HINT_SCRIPT = `try{var h=JSON.parse(localStorage.getItem(${JSON.stringify(
  MARKET_ACCESS_HINT_KEY,
)})||"null");if(h&&Date.now()-h.ts<${HINT_MAX_AGE_MS}){var e=document.documentElement;if(h.freeSignup==="show")e.setAttribute(${JSON.stringify(
  FREE_SIGNUP_ATTRIBUTE,
)},"show");if(h.demo==="request")e.setAttribute(${JSON.stringify(
  DEMO_MODE_ATTRIBUTE,
)},"request")}}catch(e){}`;
