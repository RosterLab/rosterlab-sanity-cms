import { render, screen, waitFor } from "@testing-library/react";
import { MarketAccessProvider, useMarketAccess } from "./MarketAccessProvider";
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
});
