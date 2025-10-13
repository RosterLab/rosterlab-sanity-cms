"use client";

import { useEffect, Suspense, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initializeUTMTracking,
  getCurrentTouchData,
  getFirstTouchData,
  getUTMDebugInfo,
} from "@/lib/analytics/utm-tracker";

interface UTMTrackerProps {
  onUTMsDetected?: (data: { firstTouch: any; currentTouch: any }) => void;
  debug?: boolean;
}

const PREVIOUS_PAGE_KEY = "rl_previous_page";

function UTMTrackerInner({ onUTMsDetected, debug = false }: UTMTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Track previous page before updating to current
    if (previousPathnameRef.current !== null) {
      // Save the previous pathname to sessionStorage
      try {
        sessionStorage.setItem(PREVIOUS_PAGE_KEY, previousPathnameRef.current);
      } catch (e) {
        console.error("Failed to save previous page:", e);
      }
    }

    // Update the ref to current pathname for next navigation
    previousPathnameRef.current = pathname;

    // Initialize UTM tracking on mount and route changes
    const trackingData = initializeUTMTracking();

    if (trackingData) {
      if (debug) {
        console.log("[UTM Tracker] Initialized:", getUTMDebugInfo());
      }

      // Notify parent component if callback provided
      if (onUTMsDetected) {
        onUTMsDetected(trackingData);
      }

      // Dispatch custom event for other components to listen to
      window.dispatchEvent(
        new CustomEvent("utm-tracked", {
          detail: trackingData,
        }),
      );
    }
  }, [pathname, searchParams, onUTMsDetected, debug]);

  // Also track on focus (for when users return to tab)
  useEffect(() => {
    const handleFocus = () => {
      const currentTouch = getCurrentTouchData();
      const firstTouch = getFirstTouchData();

      if (debug) {
        console.log("[UTM Tracker] Window focus - updating session:", {
          firstTouch,
          currentTouch,
        });
      }

      // Update session activity
      window.dispatchEvent(
        new CustomEvent("utm-session-update", {
          detail: { firstTouch, currentTouch },
        }),
      );
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [debug]);

  // Handle consent mode if needed
  useEffect(() => {
    // Listen for consent granted events (if using a consent management platform)
    const handleConsentGranted = () => {
      if (debug) {
        console.log("[UTM Tracker] Consent granted - initializing tracking");
      }
      initializeUTMTracking();
    };

    window.addEventListener("consent-granted", handleConsentGranted);
    return () =>
      window.removeEventListener("consent-granted", handleConsentGranted);
  }, [debug]);

  return null; // This is a tracking component, no UI needed
}

export default function UTMTracker(props: UTMTrackerProps) {
  return (
    <Suspense fallback={null}>
      <UTMTrackerInner {...props} />
    </Suspense>
  );
}
