"use client";

import { useEffect } from "react";
import { trackPricingViewed } from "@/lib/analytics/events/conversion-events";

/**
 * PricingPageTracker Component
 *
 * Tracks when users view the pricing page - a strong intent signal for conversion funnels.
 * Automatically fires the pricing_viewed event once per page load.
 */
export default function PricingPageTracker() {
  useEffect(() => {
    // Track pricing page view on mount
    if (typeof window !== "undefined") {
      trackPricingViewed({
        page_location: window.location.pathname,
        page_url: window.location.href,
        page_title: document.title,
      });
    }
  }, []); // Empty dependency array ensures this only runs once on mount

  // This component doesn't render anything
  return null;
}
