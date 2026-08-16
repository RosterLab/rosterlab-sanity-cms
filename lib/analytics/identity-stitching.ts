/**
 * Identity Stitching Utilities
 * Handles cross-domain tracking and identity merging between marketing site and app
 */

import { getCurrentTouchData, getFirstTouchData } from "./utm-tracker";

/**
 * Generate URL with UTM data for cross-domain tracking.
 *
 * Appends a minimal attribution payload: current-touch utm_source/medium/campaign
 * plus landing_page (the click origin), and first-touch utm_source/medium for
 * original acquisition channel.
 */
export function appendUTMsToUrl(
  targetUrl: string,
  includeFirstTouch: boolean = true,
): string {
  try {
    const url = new URL(targetUrl);
    const params = new URLSearchParams(url.search);

    const currentTouch = getCurrentTouchData();
    if (currentTouch.utm_source)
      params.set("utm_source", currentTouch.utm_source);
    if (currentTouch.utm_medium)
      params.set("utm_medium", currentTouch.utm_medium);
    if (currentTouch.utm_campaign)
      params.set("utm_campaign", currentTouch.utm_campaign);
    if (currentTouch.landing_page)
      params.set("landing_page", currentTouch.landing_page);

    if (includeFirstTouch) {
      const firstTouchData = getFirstTouchData();
      if (firstTouchData) {
        const sameAsCurrent =
          firstTouchData.utm_source === currentTouch.utm_source &&
          firstTouchData.utm_medium === currentTouch.utm_medium;
        if (firstTouchData.utm_source && !sameAsCurrent) {
          params.set("utm_source_first", firstTouchData.utm_source);
          if (firstTouchData.utm_medium)
            params.set("utm_medium_first", firstTouchData.utm_medium);
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
