"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { analytics } from "@/components/analytics/tracking";
import { runBestEffort } from "@/lib/analytics/best-effort";
import type { MarketAccessDecision } from "@/lib/market-access/types";

type MarketAccessStatus = "loading" | "ready" | "error";

interface MarketAccessContextValue {
  status: MarketAccessStatus;
  decision: MarketAccessDecision | null;
  canSignUpFree: boolean;
}

const MarketAccessContext = createContext<MarketAccessContextValue>({
  status: "loading",
  decision: null,
  canSignUpFree: false,
});

const FAIL_CLOSED_DECISION: MarketAccessDecision = {
  policyVersion: "unavailable",
  countryCode: null,
  freeSignup: "hide",
  demo: "request_review",
  reasonCode: "unknown_country",
};

export function MarketAccessProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<MarketAccessStatus>("loading");
  const [decision, setDecision] = useState<MarketAccessDecision | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    const testCountry = new URLSearchParams(window.location.search).get(
      "test-country",
    );
    if (testCountry) params.set("test-country", testCountry);
    const queryString = params.toString();
    const query = queryString ? `?${queryString}` : "";

    fetch(`/api/market-access${query}`, {
      cache: "no-store",
      credentials: "omit",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Market access: ${response.status}`);
        return (await response.json()) as MarketAccessDecision;
      })
      .then((nextDecision) => {
        setDecision(nextDecision);
        setStatus("ready");
        runBestEffort("market access evaluation", () => {
          analytics.track("market_access_evaluated", {
            market_access_policy_version: nextDecision.policyVersion,
            detected_country: nextDecision.countryCode,
            free_signup_decision: nextDecision.freeSignup,
            demo_decision: nextDecision.demo,
            market_access_reason: nextDecision.reasonCode,
          });
        });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setDecision(FAIL_CLOSED_DECISION);
        setStatus("error");
        runBestEffort("market access failure", () => {
          analytics.track("market_access_failed", {
            failure: error instanceof Error ? error.message : "unknown",
          });
        });
      });

    return () => controller.abort();
  }, []);

  const value = useMemo<MarketAccessContextValue>(
    () => ({
      status,
      decision,
      canSignUpFree: status === "ready" && decision?.freeSignup === "show",
    }),
    [decision, status],
  );

  return (
    <MarketAccessContext.Provider value={value}>
      {children}
    </MarketAccessContext.Provider>
  );
}

export function useMarketAccess(): MarketAccessContextValue {
  return useContext(MarketAccessContext);
}

export function isFreeSignupHref(href: string): boolean {
  const normalized = href.toLowerCase().replace(/\/$/, "");
  return (
    normalized === "/start-free" ||
    normalized === "https://app.rosterlab.com/signup"
  );
}
