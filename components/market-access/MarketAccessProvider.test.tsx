import { render, screen, waitFor } from "@testing-library/react";
import { MarketAccessProvider, useMarketAccess } from "./MarketAccessProvider";
import {
  DEMO_MODE_ATTRIBUTE,
  FREE_SIGNUP_ATTRIBUTE,
  MARKET_ACCESS_HINT_KEY,
  MARKET_ACCESS_HINT_SCRIPT,
} from "@/lib/market-access/client-gate";
import { analytics } from "@/components/analytics/tracking";

jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn() },
}));

const analyticsTrackMock = jest.mocked(analytics.track);
const originalNodeEnv = process.env.NODE_ENV;
const fetchMock = jest.fn();

function StatusProbe() {
  const { status, decision } = useMarketAccess();
  return <div>{`${status}:${decision?.countryCode ?? "none"}`}</div>;
}

describe("MarketAccessProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    Object.defineProperty(process.env, "NODE_ENV", {
      configurable: true,
      value: "production",
    });
    window.history.replaceState({}, "", "/?test-country=US");
    fetchMock.mockReset().mockResolvedValue({
      ok: true,
      json: async () => ({
        policyVersion: "test",
        countryCode: "US",
        freeSignup: "show",
        demo: "extended_hours",
        reasonCode: "target_market",
      }),
    });
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: fetchMock,
    });
    localStorage.clear();
    document.documentElement.removeAttribute(FREE_SIGNUP_ATTRIBUTE);
    document.documentElement.removeAttribute(DEMO_MODE_ATTRIBUTE);
  });

  afterEach(() => {
    Object.defineProperty(process.env, "NODE_ENV", {
      configurable: true,
      value: originalNodeEnv,
    });
    window.history.replaceState({}, "", "/");
    jest.restoreAllMocks();
  });

  test("forwards a production test-country override and ignores analytics failures", async () => {
    analyticsTrackMock.mockImplementation(() => {
      throw new Error("analytics unavailable");
    });

    expect(window.location.search).toBe("?test-country=US");

    render(
      <MarketAccessProvider>
        <StatusProbe />
      </MarketAccessProvider>,
    );

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/market-access?test-country=US",
        expect.objectContaining({ cache: "no-store" }),
      ),
    );
    expect(await screen.findByText("ready:US")).toBeTruthy();
  });
  test("publishes an allowed decision to the attributes and the cached hint", async () => {
    render(
      <MarketAccessProvider>
        <StatusProbe />
      </MarketAccessProvider>,
    );

    expect(await screen.findByText("ready:US")).toBeTruthy();
    const element = document.documentElement;
    expect(element.getAttribute(FREE_SIGNUP_ATTRIBUTE)).toBe("show");
    expect(element.getAttribute(DEMO_MODE_ATTRIBUTE)).toBe("book");
    expect(
      JSON.parse(localStorage.getItem(MARKET_ACCESS_HINT_KEY) as string),
    ).toEqual(expect.objectContaining({ freeSignup: "show", demo: "book" }));
  });

  test("a gated decision hides free signup, asks for a request, and replaces a stale hint", async () => {
    localStorage.setItem(
      MARKET_ACCESS_HINT_KEY,
      JSON.stringify({ freeSignup: "show", demo: "book", ts: Date.now() }),
    );
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        policyVersion: "test",
        countryCode: "CN",
        freeSignup: "hide",
        demo: "request_review",
        reasonCode: "below_high_income",
      }),
    });

    render(
      <MarketAccessProvider>
        <StatusProbe />
      </MarketAccessProvider>,
    );

    expect(await screen.findByText("ready:CN")).toBeTruthy();
    const element = document.documentElement;
    expect(element.getAttribute(FREE_SIGNUP_ATTRIBUTE)).toBe("hide");
    expect(element.getAttribute(DEMO_MODE_ATTRIBUTE)).toBe("request");
    expect(
      JSON.parse(localStorage.getItem(MARKET_ACCESS_HINT_KEY) as string),
    ).toEqual(expect.objectContaining({ freeSignup: "hide", demo: "request" }));
  });

  test("a request failure fails closed without caching the failure", async () => {
    const goodHint = JSON.stringify({
      freeSignup: "show",
      demo: "book",
      ts: Date.now(),
    });
    localStorage.setItem(MARKET_ACCESS_HINT_KEY, goodHint);
    fetchMock.mockRejectedValue(new Error("offline"));

    render(
      <MarketAccessProvider>
        <StatusProbe />
      </MarketAccessProvider>,
    );

    expect(await screen.findByText("error:none")).toBeTruthy();
    const element = document.documentElement;
    expect(element.getAttribute(FREE_SIGNUP_ATTRIBUTE)).toBe("hide");
    expect(element.getAttribute(DEMO_MODE_ATTRIBUTE)).toBe("request");
    // One flaky response shouldn't relabel every later load.
    expect(localStorage.getItem(MARKET_ACCESS_HINT_KEY)).toBe(goodHint);
  });
});

describe("MARKET_ACCESS_HINT_SCRIPT", () => {
  const element = document.documentElement;

  beforeEach(() => {
    localStorage.clear();
    element.removeAttribute(FREE_SIGNUP_ATTRIBUTE);
    element.removeAttribute(DEMO_MODE_ATTRIBUTE);
  });

  function runHintScript() {
    new Function(MARKET_ACCESS_HINT_SCRIPT)();
  }

  test("applies a fresh hint before paint", () => {
    localStorage.setItem(
      MARKET_ACCESS_HINT_KEY,
      JSON.stringify({ freeSignup: "show", demo: "request", ts: Date.now() }),
    );
    runHintScript();
    expect(element.getAttribute(FREE_SIGNUP_ATTRIBUTE)).toBe("show");
    expect(element.getAttribute(DEMO_MODE_ATTRIBUTE)).toBe("request");
  });

  test.each([
    ["no hint", null],
    [
      "an expired hint",
      JSON.stringify({ freeSignup: "show", demo: "request", ts: 0 }),
    ],
    [
      "a gated hint",
      JSON.stringify({ freeSignup: "hide", demo: "book", ts: Date.now() }),
    ],
    ["a corrupt hint", "{not json"],
  ])("leaves both CSS defaults in place for %s", (_label, stored) => {
    if (stored !== null) localStorage.setItem(MARKET_ACCESS_HINT_KEY, stored);
    runHintScript();
    expect(element.hasAttribute(FREE_SIGNUP_ATTRIBUTE)).toBe(false);
    expect(element.hasAttribute(DEMO_MODE_ATTRIBUTE)).toBe(false);
  });
});
