/**
 * UTM Debug Utilities
 * Tools for debugging and analyzing attribution data in Amplitude
 */

import { analytics } from "@/components/analytics/Amplitude";
import {
  getUTMDebugInfo,
  getFirstTouchData,
  getCurrentTouchData,
} from "./utm-tracker";

/**
 * Debug event types for attribution analysis
 */
export const UTM_DEBUG_EVENTS = {
  DIRECT_WITH_REFERRER: "Debug: Direct Traffic with Referrer",
  SELF_REFERRAL: "Debug: Self Referral Detected",
  NULL_FIRST_TOUCH: "Debug: Null First Touch UTMs",
  ATTRIBUTION_MISMATCH: "Debug: Attribution Mismatch",
  BOT_TRAFFIC: "Debug: Bot Traffic Detected",
} as const;

/**
 * Check for direct traffic issues
 */
export function analyzeDirectTraffic(): void {
  const firstTouch = getFirstTouchData();
  const currentTouch = getCurrentTouchData();
  const debugInfo = getUTMDebugInfo();

  // Check for direct traffic with non-empty referrer
  if (firstTouch?.utm_source === "direct" && firstTouch.first_referrer) {
    analytics.track(UTM_DEBUG_EVENTS.DIRECT_WITH_REFERRER, {
      first_referrer: firstTouch.first_referrer,
      first_landing_page: firstTouch.first_landing_page,
      debug_info: debugInfo,
    });
  }

  // Check for self-referrals
  if (debugInfo.isInternalReferrer && debugInfo.referrer) {
    analytics.track(UTM_DEBUG_EVENTS.SELF_REFERRAL, {
      referrer: debugInfo.referrer,
      current_url: debugInfo.currentUrl,
      debug_info: debugInfo,
    });
  }

  // Check for null first-touch UTMs (shouldn't happen)
  if (!firstTouch) {
    analytics.track(UTM_DEBUG_EVENTS.NULL_FIRST_TOUCH, {
      current_touch: currentTouch,
      debug_info: debugInfo,
    });
  }
}

/**
 * Track attribution debug info on page views
 */
export function trackAttributionDebug(): void {
  const firstTouch = getFirstTouchData();
  const currentTouch = getCurrentTouchData();
  const debugInfo = getUTMDebugInfo();

  // Only track debug events in development or if explicitly enabled
  const isDebugEnabled =
    process.env.NODE_ENV === "development" ||
    localStorage.getItem("utm_debug_enabled") === "true";

  if (!isDebugEnabled) return;

  analytics.track("Debug: Attribution Data", {
    first_touch: firstTouch,
    current_touch: currentTouch,
    has_first_touch: !!firstTouch,
    first_vs_current_match: firstTouch?.utm_source === currentTouch.utm_source,
    session_id: debugInfo.sessionId,
    is_bot: debugInfo.isBot,
    cookie_enabled: debugInfo.cookieEnabled,
  });

  // Run direct traffic analysis
  analyzeDirectTraffic();
}

/**
 * Generate attribution report for debugging
 */
export function generateAttributionReport(): Record<string, any> {
  const firstTouch = getFirstTouchData();
  const currentTouch = getCurrentTouchData();
  const debugInfo = getUTMDebugInfo();

  return {
    summary: {
      hasFirstTouch: !!firstTouch,
      firstTouchSource: firstTouch?.utm_source || "none",
      firstTouchMedium: firstTouch?.utm_medium || "none",
      currentSource: currentTouch.utm_source || "none",
      currentMedium: currentTouch.utm_medium || "none",
      sessionId: currentTouch.session_id,
    },
    issues: {
      directWithReferrer:
        firstTouch?.utm_source === "direct" && !!firstTouch.first_referrer,
      selfReferral: debugInfo.isInternalReferrer && !!debugInfo.referrer,
      missingFirstTouch: !firstTouch,
      possibleBot: debugInfo.isBot,
      cookiesDisabled: !debugInfo.cookieEnabled,
    },
    fullData: {
      firstTouch,
      currentTouch,
      debugInfo,
    },
  };
}

/**
 * Enable UTM debugging in console
 */
export function enableUTMDebugMode(): void {
  if (typeof window === "undefined") return;

  // Enable debug mode
  localStorage.setItem("utm_debug_enabled", "true");

  // Add debug functions to window
  (window as any).utmDebug = {
    getReport: generateAttributionReport,
    getFirstTouch: getFirstTouchData,
    getCurrentTouch: getCurrentTouchData,
    getDebugInfo: getUTMDebugInfo,
    trackDebugEvent: trackAttributionDebug,
    disableDebug: () => {
      localStorage.removeItem("utm_debug_enabled");
      delete (window as any).utmDebug;
      console.log("UTM debug mode disabled");
    },
  };

  console.log(
    "UTM debug mode enabled. Use window.utmDebug to access debug functions.",
  );
  console.log("Available functions:", Object.keys((window as any).utmDebug));
}
