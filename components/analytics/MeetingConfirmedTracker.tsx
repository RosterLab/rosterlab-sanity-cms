"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/Amplitude";

export default function MeetingConfirmedTracker() {
  useEffect(() => {
    // Check if we came from a demo booking
    const isDemoBooked = window.sessionStorage.getItem("amplitude_demo_booked");
    const storedDeviceId = window.sessionStorage.getItem("amplitude_device_id");

    if (isDemoBooked) {
      console.log("[MeetingConfirmedTracker] Detected demo booking redirect", {
        storedDeviceId,
        currentDeviceId: analytics.getDeviceId(),
      });

      // Track meeting confirmation page view
      analytics.track("Meeting Confirmation Page Viewed", {
        came_from_demo_booking: true,
        page_path: window.location.pathname,
        referrer: document.referrer,
      });

      // Clear the flags
      window.sessionStorage.removeItem("amplitude_demo_booked");
      window.sessionStorage.removeItem("amplitude_device_id");
    } else {
      // Track as a regular page view
      analytics.track("Meeting Confirmation Page Viewed", {
        came_from_demo_booking: false,
        page_path: window.location.pathname,
        referrer: document.referrer,
      });
    }
  }, []);

  return null;
}
