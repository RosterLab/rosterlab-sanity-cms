// Routing question numbers are independent of event-type invitee questions.
// Keep forwarding explicit; the public routing forms are documented in
// docs/calendly-routing-prefill.md. Expand only after verifying new questions.
export const ROUTING_ANSWER_PARAMS = ["a1", "a2", "a3", "a4"] as const;

export type RoutingAnswers = Partial<
  Record<(typeof ROUTING_ANSWER_PARAMS)[number], string>
>;

declare global {
  interface Window {
    __rlCalendlyPrefill?: { pathname: string; answers: RoutingAnswers };
    __rlCalendlyPrefillInstalled?: boolean;
  }
}

/** Self-contained so the same code can run synchronously in the document head.
 * Capture before GA, Meta, rlTracker, Intercom or PostHog read the page URL.
 * No answers are persisted to history state, cookies or browser storage.
 */
export function installRoutingPrefillCapture(
  allowlist: readonly string[],
): void {
  if (window.__rlCalendlyPrefillInstalled) return;
  window.__rlCalendlyPrefillInstalled = true;

  function clean(value: string | URL): URL {
    const url = new URL(value, window.location.href);
    const pathname = url.pathname.replace(/\/$/, "");
    if (pathname !== "/book-a-demo" && pathname !== "/us/book-a-demo") {
      delete window.__rlCalendlyPrefill;
      return url;
    }

    const answers: Record<string, string> = {};
    let hasPrefill = false;
    for (const key of Array.from(url.searchParams.keys())) {
      // Remove unsupported answer numbers and booking-only aliases too; they
      // must not accidentally become tracked PII or trigger auto-submission.
      if (
        /^a\d+$/i.test(key) ||
        [
          "autofill",
          "name",
          "email",
          "first_name",
          "last_name",
          "guests",
          "location",
        ].includes(key.toLowerCase())
      ) {
        hasPrefill = true;
        const answer = url.searchParams.get(key);
        if (allowlist.includes(key) && answer?.trim()) answers[key] = answer;
        url.searchParams.delete(key);
      }
    }
    if (hasPrefill || window.__rlCalendlyPrefill?.pathname !== pathname) {
      window.__rlCalendlyPrefill = { pathname, answers };
    }
    return url;
  }

  const originalReplace = window.history.replaceState;
  const originalPush = window.history.pushState;
  const initialUrl = clean(window.location.href);
  if (initialUrl.href !== window.location.href) {
    originalReplace.call(
      window.history,
      window.history.state,
      "",
      initialUrl.href,
    );
  }

  // Sanitize SPA navigation before any history-based pageview listener runs.
  // Preserve Next's state and method signatures; only alter prefill parameters.
  window.history.pushState = function (state, title, url) {
    return originalPush.call(
      this,
      state,
      title,
      url == null ? url : clean(url).href,
    );
  };
  window.history.replaceState = function (state, title, url) {
    return originalReplace.call(
      this,
      state,
      title,
      url == null ? url : clean(url).href,
    );
  };
  window.addEventListener("popstate", () => {
    const url = clean(window.location.href);
    if (url.href !== window.location.href) {
      originalReplace.call(window.history, window.history.state, "", url.href);
    }
  });
}

export const ROUTING_PREFILL_CAPTURE_SCRIPT = `(${installRoutingPrefillCapture.toString()})(${JSON.stringify(ROUTING_ANSWER_PARAMS)});`;

export function getRoutingAnswers(): RoutingAnswers {
  if (typeof window === "undefined") return {};
  const pathname = window.location.pathname.replace(/\/$/, "");
  return window.__rlCalendlyPrefill?.pathname === pathname
    ? window.__rlCalendlyPrefill.answers
    : {};
}

/** Merge instead of appending a second '?'. Existing base settings survive.
 * Answers are decoded by URLSearchParams on capture and encoded once here.
 */
export function buildCalendlyUrl(
  baseUrl: string,
  queryParams: Record<string, string>,
  routingAnswers: RoutingAnswers = {},
): string {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(queryParams)) {
    if (key !== "autofill") url.searchParams.set(key, value);
  }
  for (const key of ROUTING_ANSWER_PARAMS) {
    const value = routingAnswers[key];
    if (value?.trim()) url.searchParams.set(key, value);
    if (!url.searchParams.get(key)?.trim()) url.searchParams.delete(key);
  }
  url.searchParams.delete("autofill");
  return url.toString();
}

/** Defence for incoming referrers and explicit event URL properties. */
export function redactRoutingPrefillUrl(value: string): string {
  try {
    const url = new URL(value, "https://rosterlab.com");
    if (
      !["/book-a-demo", "/us/book-a-demo"].includes(
        url.pathname.replace(/\/$/, ""),
      )
    )
      return value;
    for (const key of Array.from(url.searchParams.keys())) {
      if (
        /^a\d+$/i.test(key) ||
        [
          "autofill",
          "name",
          "email",
          "first_name",
          "last_name",
          "guests",
          "location",
        ].includes(key.toLowerCase())
      )
        url.searchParams.delete(key);
    }
    return value.startsWith("/")
      ? `${url.pathname}${url.search}${url.hash}`
      : url.toString();
  } catch {
    return value;
  }
}
