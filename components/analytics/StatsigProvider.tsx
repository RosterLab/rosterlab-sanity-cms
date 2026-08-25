"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { StatsigClient } from "@statsig/js-client";
import { StatsigProvider as BaseStatsigProvider } from "@statsig/react-bindings";

interface StatsigProviderProps {
  children: ReactNode;
  clientKey: string | undefined;
}

/**
 * Reads the anonymous visitor id that RlTracker sets on `.rosterlab.com`, so
 * Statsig buckets a visitor the same way our own analytics does.
 */
function readAnonId(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)_rl_anon_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Statsig is initialised entirely in the browser.
 *
 * It used to be bootstrapped on the server: the root layout read the
 * `_rl_anon_id` cookie and inlined `getClientInitializeResponse()` into the
 * HTML so the client could `initializeSync()`. That made every document
 * per-visitor — the visitor's own id was baked into the markup — which meant
 * the whole site had to be served uncacheable (`no-store`, Netlify
 * `fwd=bypass`) and paid ~740ms of TTFB on every navigation.
 *
 * Initialising client-side makes the HTML identical for every visitor, so the
 * CDN can cache it. The trade-off: gate/experiment values now arrive a beat
 * after first paint rather than being present in the markup. Nothing reads them
 * today, but if you gate above-the-fold content on an experiment, render the
 * control variant first and swap on the client, or you will ship a flash of
 * wrong content.
 */
export default function StatsigProvider({
  children,
  clientKey,
}: StatsigProviderProps) {
  const clientRef = useRef<StatsigClient | null>(null);

  // Constructed during render (not in an effect) so the component tree has the
  // same shape on the server and the client — swapping the provider in after
  // mount would remount every child.
  if (clientKey && !clientRef.current) {
    clientRef.current = new StatsigClient(clientKey, {
      userID: typeof document === "undefined" ? undefined : readAnonId(),
    });
  }

  // Must run before any early return so hook order stays stable.
  useEffect(() => {
    // initializeAsync hydrates from the local cache first, then refreshes from
    // the network, so repeat visitors get values almost immediately.
    clientRef.current?.initializeAsync().catch(() => {
      // A failed init leaves every gate/experiment at its default, which is the
      // correct fallback — never block rendering on it.
    });
  }, []);

  if (!clientRef.current) {
    return <>{children}</>;
  }

  return (
    <BaseStatsigProvider client={clientRef.current}>
      {children}
    </BaseStatsigProvider>
  );
}
