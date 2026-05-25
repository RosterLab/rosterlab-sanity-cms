"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { metaTrackViewContent } from "@/lib/analytics/meta-pixel";

// Storage key for UTM campaign context
const CAMPAIGN_STORAGE_KEY = "rl_campaign_context";

/**
 * Get campaign context from UTM parameters
 * Persists in sessionStorage for first-touch attribution
 */
function getCampaignContext(): {
  source: string | null;
  medium: string | null;
  name: string | null;
  term: string | null;
  content: string | null;
} | null {
  if (typeof window === "undefined") return null;

  // Check if we already have campaign data in sessionStorage
  const stored = sessionStorage.getItem(CAMPAIGN_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Invalid stored data, continue to parse from URL
    }
  }

  // Parse UTM parameters from current URL
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const utmTerm = params.get("utm_term");
  const utmContent = params.get("utm_content");

  // Only create campaign context if we have at least utm_source
  if (utmSource) {
    const campaignContext = {
      source: utmSource,
      medium: utmMedium,
      name: utmCampaign, // utm_campaign maps to 'name'
      term: utmTerm,
      content: utmContent,
    };

    // Store in sessionStorage for persistence across pages
    sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaignContext));
    return campaignContext;
  }

  return null;
}

const HEALTHCARE_PATTERN =
  /\/(industries\/healthcare|us\/industries\/healthcare)/;

function detectIndustry(path: string): string | null {
  if (HEALTHCARE_PATTERN.test(path)) return "healthcare";
  if (path.includes("/industries/aged-care")) return "healthcare";
  if (path.includes("/industries/hospitality")) return "hospitality";
  if (path.includes("/industries/retail")) return "retail";
  if (path.includes("/industries/security")) return "security";
  if (path.includes("/industries/education")) return "education";
  if (path.includes("/industries/manufacturing")) return "manufacturing";
  if (path.includes("/industries/construction")) return "construction";
  if (path.includes("/industries/call-centre")) return "call_centre";
  if (path.includes("/industries/airports")) return "transport";
  if (path.includes("/industries/port")) return "transport";
  if (path.includes("/industries/public-services")) return "public_services";
  return null;
}

export default function RlTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.rlTracker !== "undefined") {
      const industry = detectIndustry(pathname);

      // Build context object
      const context: Record<string, any> = {
        page: {
          url: window.location.href,
          path: pathname,
          referrer: document.referrer || null,
        },
        ip: undefined, // Server will populate this
      };

      // Add campaign context if available
      const campaignContext = getCampaignContext();
      if (campaignContext) {
        context.campaign = campaignContext;
      }

      window.rlTracker.page(document.title, {
        path: pathname,
        url: window.location.href,
        app: false,
        industry,
        context, // Add context object
      });

      if (industry) {
        window.rlTracker.track("industry.viewed", {
          industry,
          path: pathname,
          context, // Add context to track events too
        });
        metaTrackViewContent({
          contentName: `Industry: ${industry}`,
          contentCategory: industry,
          contentType: "industry_page",
        });
      }
    }
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      src="https://ops.rosterlab.com/tracker.js"
      strategy="afterInteractive"
    />
  );
}
