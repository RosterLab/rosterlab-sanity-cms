"use client";

import { useEffect, useRef } from "react";

/**
 * Hook for announcing dynamic content changes to screen readers
 * Creates an aria-live region and announces messages
 *
 * @param politeness - "polite" (default) or "assertive"
 *
 * @example
 * const announce = useAriaAnnounce();
 * announce("Form submitted successfully");
 */
export function useAriaAnnounce(politeness: "polite" | "assertive" = "polite") {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement("div");
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", politeness);
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }

    return () => {
      // Cleanup on unmount
      if (liveRegionRef.current) {
        document.body.removeChild(liveRegionRef.current);
        liveRegionRef.current = null;
      }
    };
  }, [politeness]);

  const announce = (message: string) => {
    if (liveRegionRef.current) {
      // Clear and set to ensure announcement
      liveRegionRef.current.textContent = "";
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message;
        }
      }, 100);
    }
  };

  return announce;
}
