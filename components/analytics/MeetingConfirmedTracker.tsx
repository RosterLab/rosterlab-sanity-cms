"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/Segment";

export default function MeetingConfirmedTracker() {
  useEffect(() => {
    console.log(
      "[MeetingConfirmedTracker] Checking for demo booking session data",
    );

    // Check sessionStorage first
    let sessionData = null;
    const sessionStorageData = window.sessionStorage.getItem(
      "analytics_session_data",
    );

    if (sessionStorageData) {
      try {
        sessionData = JSON.parse(sessionStorageData);
        console.log(
          "[MeetingConfirmedTracker] Found session data in sessionStorage:",
          sessionData,
        );
      } catch (e) {
        console.error(
          "[MeetingConfirmedTracker] Error parsing sessionStorage data:",
          e,
        );
      }
    }

    // Check localStorage as backup
    if (!sessionData) {
      const localStorageData = window.localStorage.getItem(
        "amplitude_demo_redirect",
      );
      if (localStorageData) {
        try {
          const storedData = JSON.parse(localStorageData);
          // Check if not expired
          if (storedData.expires > Date.now()) {
            sessionData = storedData;
            console.log(
              "[MeetingConfirmedTracker] Found session data in localStorage:",
              sessionData,
            );
          } else {
            console.log("[MeetingConfirmedTracker] localStorage data expired");
          }
          // Clean up localStorage
          window.localStorage.removeItem("amplitude_demo_redirect");
        } catch (e) {
          console.error(
            "[MeetingConfirmedTracker] Error parsing localStorage data:",
            e,
          );
        }
      }
    }

    if (sessionData) {
      console.log("[MeetingConfirmedTracker] Current Amplitude state:", {
        deviceId: analytics.getDeviceId(),
        userId: analytics.getUserId(),
      });

      // If we have user info, ensure they're identified
      if (sessionData.email || sessionData.userId) {
        console.log(
          "[MeetingConfirmedTracker] Re-identifying user after redirect",
        );
        analytics.identify(sessionData.email || sessionData.userId, {
          email: sessionData.email,
          came_from_demo_booking: true,
        });
      }

      // Track meeting confirmation page view with context
      analytics.track("Meeting Confirmation Page Viewed", {
        came_from_demo_booking: true,
        page_path: window.location.pathname,
        referrer: document.referrer,
        time_since_booking: Date.now() - sessionData.timestamp,
        session_preserved: sessionData.deviceId === analytics.getDeviceId(),
      });

      // Clear the session data
      window.sessionStorage.removeItem("amplitude_demo_booked");
      window.sessionStorage.removeItem("analytics_session_data");
    } else {
      console.log(
        "[MeetingConfirmedTracker] No demo booking session data found",
      );

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
