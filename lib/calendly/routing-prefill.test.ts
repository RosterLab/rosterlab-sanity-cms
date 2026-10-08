import {
  buildCalendlyUrl,
  getRoutingAnswers,
  installRoutingPrefillCapture,
  redactRoutingPrefillUrl,
  ROUTING_ANSWER_PARAMS,
  ROUTING_PREFILL_CAPTURE_SCRIPT,
} from "./routing-prefill";

describe("Calendly routing prefill URLs", () => {
  test("preserves base settings, attribution and hash while encoding answers once", () => {
    const url = new URL(
      buildCalendlyUrl(
        "https://calendly.com/d/example?hide_gdpr_banner=1&utm_source=old#details",
        {
          utm_source: "intercom",
          utm_content: "anonymous-id",
          session_id: "session",
        },
        {
          a1: "qa+demo@example.com",
          a2: "Health & Care / Māori",
          a4: "51 - 100 staff",
        },
      ),
    );
    expect(url.searchParams.get("hide_gdpr_banner")).toBe("1");
    expect(url.searchParams.get("utm_source")).toBe("intercom");
    expect(url.searchParams.get("utm_content")).toBe("anonymous-id");
    expect(url.searchParams.get("session_id")).toBe("session");
    expect(url.searchParams.get("a1")).toBe("qa+demo@example.com");
    expect(url.searchParams.get("a2")).toBe("Health & Care / Māori");
    expect(url.searchParams.get("a4")).toBe("51 - 100 staff");
    expect(url.searchParams.has("a3")).toBe(false);
    expect(url.hash).toBe("#details");
  });

  test("omits blank answers, restricts answer numbers and always removes autofill", () => {
    const url = new URL(
      buildCalendlyUrl(
        "https://calendly.com/d/example?autofill=true&a1=&a2=Healthcare",
        { autofill: "true", utm_source: "intercom" },
        { a1: " ", a3: "", a4: "100+ staff", a99: "ignored" } as never,
      ),
    );
    expect(url.searchParams.has("autofill")).toBe(false);
    expect(url.searchParams.has("a1")).toBe(false);
    expect(url.searchParams.has("a3")).toBe(false);
    expect(url.searchParams.has("a99")).toBe(false);
    expect(url.searchParams.get("a2")).toBe("Healthcare");
    expect(url.searchParams.get("a4")).toBe("100+ staff");
  });

  test("redacts prefill referrers while retaining tracking and other pages", () => {
    expect(
      redactRoutingPrefillUrl(
        "https://rosterlab.com/us/book-a-demo/?a1=qa%40example.com&a99=Name&email=qa&autofill=true&utm_source=intercom#calendar",
      ),
    ).toBe(
      "https://rosterlab.com/us/book-a-demo/?utm_source=intercom#calendar",
    );
    expect(
      redactRoutingPrefillUrl("/book-a-demo?a2=Healthcare&utm_medium=chat"),
    ).toBe("/book-a-demo?utm_medium=chat");
    expect(redactRoutingPrefillUrl("https://example.com/other?a1=normal")).toBe(
      "https://example.com/other?a1=normal",
    );
  });
});

describe("prefill capture before analytics", () => {
  const originalPush = window.history.pushState;
  const originalReplace = window.history.replaceState;

  beforeEach(() => {
    window.history.pushState = originalPush;
    window.history.replaceState = originalReplace;
    delete window.__rlCalendlyPrefill;
    delete window.__rlCalendlyPrefillInstalled;
    localStorage.clear();
    sessionStorage.clear();
  });
  afterEach(() => {
    window.history.pushState = originalPush;
    window.history.replaceState = originalReplace;
    delete window.__rlCalendlyPrefill;
    delete window.__rlCalendlyPrefillInstalled;
  });

  test.each(["/book-a-demo", "/us/book-a-demo"])(
    "captures partial answers and strips PII before a pageview on %s",
    (pathname) => {
      const state = { __NA: true, tree: "next-state" };
      originalReplace.call(
        window.history,
        state,
        "",
        `${pathname}?a1=qa%2Bdemo%40example.com&a2=Health%20%26%20Care&a3=%20&a4=100%2B%20staff&a99=Secret&name=Secret&autofill=true&utm_source=intercom#calendar`,
      );
      // Execute the exact synchronous head script, not just the imported function.
      window.eval(ROUTING_PREFILL_CAPTURE_SCRIPT);
      expect(window.location.href).toBe(
        `http://localhost${pathname}?utm_source=intercom#calendar`,
      );
      expect(window.history.state).toEqual(state);
      expect(getRoutingAnswers()).toEqual({
        a1: "qa+demo@example.com",
        a2: "Health & Care",
        a4: "100+ staff",
      });
      expect(localStorage.length).toBe(0);
      expect(sessionStorage.length).toBe(0);
      installRoutingPrefillCapture(ROUTING_ANSWER_PARAMS);
      expect(getRoutingAnswers().a1).toBe("qa+demo@example.com");
    },
  );

  test("cleans SPA navigation before observers and never reuses another page's answers", () => {
    originalReplace.call(window.history, null, "", "/");
    installRoutingPrefillCapture(ROUTING_ANSWER_PARAMS);
    const state = { __NA: true };
    window.history.pushState(
      state,
      "",
      "/book-a-demo?a1=global%40example.com&utm_campaign=demo",
    );
    expect(window.location.search).toBe("?utm_campaign=demo");
    expect(getRoutingAnswers()).toEqual({ a1: "global@example.com" });
    window.history.replaceState(state, "", window.location.href);
    expect(getRoutingAnswers()).toEqual({ a1: "global@example.com" });
    window.history.pushState(
      null,
      "",
      "/us/book-a-demo?a4=16%20-%2050%20staff",
    );
    expect(getRoutingAnswers()).toEqual({ a4: "16 - 50 staff" });
    window.history.pushState(null, "", "/contact");
    expect(window.__rlCalendlyPrefill).toBeUndefined();
    window.history.pushState(null, "", "/book-a-demo");
    expect(getRoutingAnswers()).toEqual({});
  });
});
