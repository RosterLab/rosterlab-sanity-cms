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
