"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { metaTrackViewContent } from "@/lib/analytics/meta-pixel";

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
      window.rlTracker.page(document.title, {
        path: pathname,
        url: window.location.href,
        app: false,
        industry,
      });

      if (industry) {
        window.rlTracker.track("industry.viewed", { industry, path: pathname });
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
