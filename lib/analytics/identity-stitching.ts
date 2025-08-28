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

    // Also include Amplitude device ID if available
    if (typeof window !== "undefined" && window.amplitude?.getDeviceId) {
      const deviceId = window.amplitude.getDeviceId();
      if (deviceId) {
        params.set("amp_device_id", deviceId);
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
  amplitudeDeviceId: string | null;
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
      amplitudeDeviceId: params.get("amp_device_id"),
    };
  } catch (error) {
    console.error("[Identity Stitching] Error parsing UTMs from URL:", error);
    return {
      firstTouchUTMs: {},
      amplitudeDeviceId: null,
    };
  }
}

/**
 * Apply first-touch UTMs to Amplitude after login/signup
 * This should be called in the app after user authentication
 */
export function applyFirstTouchUTMs(amplitude: any, userId: string): void {
  if (!amplitude || !userId) return;

  const { firstTouchUTMs, amplitudeDeviceId } = parseUTMsFromUrl();

  // Set user ID to link sessions
  amplitude.setUserId(userId);

  // If we have a device ID from the marketing site, set it
  if (amplitudeDeviceId) {
    amplitude.setDeviceId(amplitudeDeviceId);
  }

  // Apply first-touch UTMs if they exist
  const hasUTMs = Object.values(firstTouchUTMs).some((value) => value !== null);
  if (hasUTMs) {
    const identify = new amplitude.Identify();

    // Set UTM properties
    if (firstTouchUTMs.utm_source_first) {
      identify.setOnce("utm_source_first", firstTouchUTMs.utm_source_first);
    }
    if (firstTouchUTMs.utm_medium_first) {
      identify.setOnce("utm_medium_first", firstTouchUTMs.utm_medium_first);
    }
    if (firstTouchUTMs.utm_campaign_first) {
      identify.setOnce("utm_campaign_first", firstTouchUTMs.utm_campaign_first);
    }
    if (firstTouchUTMs.utm_content_first) {
      identify.setOnce("utm_content_first", firstTouchUTMs.utm_content_first);
    }
    if (firstTouchUTMs.utm_term_first) {
      identify.setOnce("utm_term_first", firstTouchUTMs.utm_term_first);
    }

    // Set additional properties
    if (firstTouchUTMs.first_referrer) {
      identify.setOnce("first_referrer", firstTouchUTMs.first_referrer);
    }
    if (firstTouchUTMs.first_landing_page) {
      identify.setOnce("first_landing_page", firstTouchUTMs.first_landing_page);
    }
    if (firstTouchUTMs.first_touch_ts) {
      identify.setOnce(
        "first_touch_ts",
        parseInt(firstTouchUTMs.first_touch_ts, 10),
      );
    }

    amplitude.identify(identify);

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
