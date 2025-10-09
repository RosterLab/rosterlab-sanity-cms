/**
 * Identity Stitching Utilities
 * Handles cross-domain tracking and identity merging between marketing site and app
 */

import { getFirstTouchData } from "./utm-tracker";

/**
 * Generate URL with UTM data for cross-domain tracking
 */
export function appendUTMsToUrl(
  targetUrl: string,
  includeFirstTouch: boolean = true,
): string {
  try {
    const url = new URL(targetUrl);
    const firstTouchData = getFirstTouchData();

    if (!firstTouchData || !includeFirstTouch) {
      return targetUrl;
    }

    // Append first-touch UTMs to the URL
    const params = new URLSearchParams(url.search);

    // Add UTM parameters
    if (firstTouchData.utm_source)
      params.set("utm_source_first", firstTouchData.utm_source);
    if (firstTouchData.utm_medium)
      params.set("utm_medium_first", firstTouchData.utm_medium);
    if (firstTouchData.utm_campaign)
      params.set("utm_campaign_first", firstTouchData.utm_campaign);
    if (firstTouchData.utm_content)
      params.set("utm_content_first", firstTouchData.utm_content);
    if (firstTouchData.utm_term)
      params.set("utm_term_first", firstTouchData.utm_term);

    // Add additional tracking data
    if (firstTouchData.first_referrer)
      params.set("first_referrer", firstTouchData.first_referrer);
    if (firstTouchData.first_landing_page)
      params.set("first_landing_page", firstTouchData.first_landing_page);
    params.set("first_touch_ts", firstTouchData.first_touch_ts.toString());

    // Also include Segment anonymous ID and Amplitude device ID if available
    if (typeof window !== "undefined") {
      // Get Segment anonymous ID from cookie
      const segmentCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("ajs_anonymous_id="));
      if (segmentCookie) {
        try {
          const anonymousId = JSON.parse(
            decodeURIComponent(segmentCookie.split("=")[1]),
          );
          if (anonymousId) {
            params.set("segment_anonymous_id", anonymousId);
          }
        } catch (e) {
          console.error("[Identity Stitching] Error parsing Segment ID:", e);
        }
      }

      // Get Amplitude device ID if available
      if ((window as any).amplitude?.getDeviceId) {
        const deviceId = (window as any).amplitude.getDeviceId();
        if (deviceId) {
          params.set("amplitude_device_id", deviceId);
        }
      }
    }

    url.search = params.toString();
    return url.toString();
  } catch (error) {
    console.error("[Identity Stitching] Error appending UTMs to URL:", error);
    return targetUrl;
  }
}

/**
 * Parse UTM data from URL (for use in the app after redirect)
 */
export function parseUTMsFromUrl(url: string = window.location.href): {
  firstTouchUTMs: Record<string, string | null>;
  segmentAnonymousId: string | null;
} {
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    return {
      firstTouchUTMs: {
        utm_source_first: params.get("utm_source_first"),
        utm_medium_first: params.get("utm_medium_first"),
        utm_campaign_first: params.get("utm_campaign_first"),
        utm_content_first: params.get("utm_content_first"),
        utm_term_first: params.get("utm_term_first"),
        first_referrer: params.get("first_referrer"),
        first_landing_page: params.get("first_landing_page"),
        first_touch_ts: params.get("first_touch_ts"),
      },
      segmentAnonymousId: params.get("segment_anonymous_id"),
    };
  } catch (error) {
    console.error("[Identity Stitching] Error parsing UTMs from URL:", error);
    return {
      firstTouchUTMs: {},
      segmentAnonymousId: null,
    };
  }
}

/**
 * Apply first-touch UTMs to analytics after login/signup
 * This should be called in the app after user authentication
 * Works with both Segment and Amplitude
 */
export function applyFirstTouchUTMs(analytics: any, userId: string): void {
  if (!analytics || !userId) return;

  const { firstTouchUTMs, segmentAnonymousId } = parseUTMsFromUrl();

  // Set user ID to link sessions in Segment
  analytics.identify(userId);

  // If we have an anonymous ID from the marketing site, set it
  // Segment handles this automatically through cookies, but we log for tracking
  if (segmentAnonymousId) {
    console.log(
      "[Identity Stitching] Found Segment anonymous ID from marketing site:",
      segmentAnonymousId,
    );
  }

  // If Amplitude is available (for session replay), identify there too
  if (typeof window !== "undefined" && (window as any).amplitude) {
    const amplitude = (window as any).amplitude;
    amplitude.setUserId(userId);
    console.log(
      "[Identity Stitching] Identified user in Amplitude Session Replay:",
      userId,
    );
  }

  // Apply first-touch UTMs if they exist
  const hasUTMs = Object.values(firstTouchUTMs).some((value) => value !== null);
  if (hasUTMs) {
    const traits: Record<string, any> = {};

    // Set UTM traits (Segment doesn't have setOnce, but we can check existing traits)
    if (firstTouchUTMs.utm_source_first) {
      traits.utm_source_first = firstTouchUTMs.utm_source_first;
    }
    if (firstTouchUTMs.utm_medium_first) {
      traits.utm_medium_first = firstTouchUTMs.utm_medium_first;
    }
    if (firstTouchUTMs.utm_campaign_first) {
      traits.utm_campaign_first = firstTouchUTMs.utm_campaign_first;
    }
    if (firstTouchUTMs.utm_content_first) {
      traits.utm_content_first = firstTouchUTMs.utm_content_first;
    }
    if (firstTouchUTMs.utm_term_first) {
      traits.utm_term_first = firstTouchUTMs.utm_term_first;
    }

    // Set additional traits
    if (firstTouchUTMs.first_referrer) {
      traits.first_referrer = firstTouchUTMs.first_referrer;
    }
    if (firstTouchUTMs.first_landing_page) {
      traits.first_landing_page = firstTouchUTMs.first_landing_page;
    }
    if (firstTouchUTMs.first_touch_ts) {
      traits.first_touch_ts = parseInt(firstTouchUTMs.first_touch_ts, 10);
    }

    analytics.identify(userId, traits);

    console.log(
      "[Identity Stitching] Applied first-touch UTMs for user:",
      userId,
    );
  }
}

/**
 * Enhanced button click handler that preserves UTMs for cross-domain links
 */
export function handleCrossDomainLink(
  href: string,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
): (e: React.MouseEvent<HTMLAnchorElement>) => void {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if this is a cross-domain link to app.rosterlab.com
    if (href.includes("app.rosterlab.com")) {
      e.preventDefault();

      // Append UTMs to the URL
      const urlWithUTMs = appendUTMsToUrl(href);

      // Call original onClick if provided
      if (onClick) {
        onClick(e);
      }

      // Navigate to the URL with UTMs
      window.location.href = urlWithUTMs;
    } else if (onClick) {
      // For non-cross-domain links, just call the original handler
      onClick(e);
    }
  };
}
