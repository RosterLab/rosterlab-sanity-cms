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
import {
  DEMO_MODE_ATTRIBUTE,
  FREE_SIGNUP_ATTRIBUTE,
  MARKET_ACCESS_HINT_KEY,
  type MarketAccessHint,
} from "@/lib/market-access/client-gate";

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

/**
 * Publishes a decision to the two places that resolve the CTAs before React
 * can: the `<html>` attributes the gate CSS reads on this page, and the cached
 * hint the pre-paint script reads on the next one.
 */
function publishDecision(
  decision: MarketAccessDecision,
  { cache }: { cache: boolean },
) {
  const hint: MarketAccessHint = {
    freeSignup: decision.freeSignup === "show" ? "show" : "hide",
    demo: decision.demo === "request_review" ? "request" : "book",
    ts: Date.now(),
  };

  const element = document.documentElement;
  element.setAttribute(FREE_SIGNUP_ATTRIBUTE, hint.freeSignup);
  element.setAttribute(DEMO_MODE_ATTRIBUTE, hint.demo);

  // A failed request fails closed for this page, but it says nothing about the
  // visitor's country — caching it would make one flaky response relabel every
  // later load. The last good answer is the better first-paint guess.
  if (!cache) return;
  try {
    localStorage.setItem(MARKET_ACCESS_HINT_KEY, JSON.stringify(hint));
  } catch {
    // Private mode or a full quota: the hint is an optimisation, not the gate.
  }
}

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
        publishDecision(nextDecision, { cache: true });
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
        publishDecision(FAIL_CLOSED_DECISION, { cache: false });
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
