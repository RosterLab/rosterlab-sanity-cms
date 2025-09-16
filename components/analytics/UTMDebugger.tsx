"use client";

import { useEffect } from "react";
import {
  enableUTMDebugMode,
  trackAttributionDebug,
} from "@/lib/analytics/utm-debug";

/**
 * UTM Debugger Component
 * Add this to your layout in development to enable UTM debugging
 */
export default function UTMDebugger() {
  useEffect(() => {
    // Enable debug mode
    enableUTMDebugMode();

    // Track debug info on mount
    trackAttributionDebug();

    // Track on route changes
    const handleRouteChange = () => {
      trackAttributionDebug();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return null;
}
