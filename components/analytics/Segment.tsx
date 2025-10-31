"use client";

import { useEffect } from "react";
import { AnalyticsBrowser, Analytics } from "@segment/analytics-next";
import {
  getFirstTouchData,
  getCurrentTouchData,
} from "@/lib/analytics/utm-tracker";

// Store current UTM data globally for event tracking
let currentUTMData: Record<string, any> = {};

interface SegmentProps {
  writeKey: string;
  userId?: string;
  options?: Record<string, any>;
}

// Track initialization to prevent multiple inits
let isInitialized = false;
let segmentInstance: Analytics | null = null;

export default function Segment({
  writeKey,
  userId,
  options = {},
}: SegmentProps) {
  useEffect(() => {
    if (!writeKey || typeof window === "undefined") return;

    // Check if already initialized
    if (isInitialized && segmentInstance) {
      console.log("Segment already initialized, skipping re-initialization");
      // If user ID changed, update it without re-initializing
      if (userId) {
        segmentInstance.identify(userId);
      }
      return;
    }

    // Check for stored session data (for redirect scenarios)
    const checkStoredSession = () => {
      const sessionData = window.sessionStorage.getItem(
        "analytics_session_data",
      );
      const localData = window.localStorage.getItem("analytics_demo_redirect");

      if (sessionData) {
        try {
          const data = JSON.parse(sessionData);
          console.log("[Segment] Found stored session data:", data);
          return data;
        } catch {
          // Ignore parse errors
        }
      }

      if (localData) {
        try {
          const data = JSON.parse(localData);
          if (data.expires > Date.now()) {
            console.log("[Segment] Found stored redirect data:", data);
            return data;
          }
        } catch {
          // Ignore parse errors
        }
      }

      return null;
    };

    const storedSession = checkStoredSession();

    // Determine server URL based on environment
    // Use production endpoint only for main production site, everything else goes to test
    const isProduction =
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_VERCEL_ENV?.includes("preview") &&
      !window.location.hostname.includes("netlify");

    const apiHost = isProduction
      ? "public.rosterlab.com/telemetry/s"
      : "public-test.rosterlab.com/telemetry/s";

    // Get UTM tracking data
    const firstTouchData = getFirstTouchData();
    const currentTouchData = getCurrentTouchData();

    // Initialize Segment Analytics
    const initSegment = async () => {
      const [segment] = await AnalyticsBrowser.load(
        {
          writeKey,
        },
        {
          integrations: {
            "Segment.io": {
              apiHost,
              protocol: "https",
            },
          },
          // Cookie configuration for cross-domain tracking
          user: {
            persist: true,
            cookie: {
              key: "ajs_user_id",
              oldKey: "ajs_user",
            },
            localStorage: {
              key: "ajs_user_traits",
            },
          },
          ...options,
        },
      );

      segmentInstance = segment;
      isInitialized = true;

      // Log initialization (user info logged after identify)
      console.log("Segment initialized:", {
        firstTouchData,
        currentTouchData,
      });

      // Set user ID if provided (from props or stored session)
      const finalUserId =
        userId || storedSession?.email || storedSession?.userId;
      if (finalUserId) {
        segment.identify(finalUserId, {
          email: storedSession?.email,
        });
        console.log("[Segment] User ID set:", finalUserId);
      }

      // Set first-touch user properties (only if they exist)
      if (firstTouchData) {
        const traits: Record<string, any> = {};

        // Set first-touch UTM properties
        if (firstTouchData.utm_source)
          traits.utm_source_first = firstTouchData.utm_source;
        if (firstTouchData.utm_medium)
          traits.utm_medium_first = firstTouchData.utm_medium;
        if (firstTouchData.utm_campaign)
          traits.utm_campaign_first = firstTouchData.utm_campaign;
        if (firstTouchData.utm_content)
          traits.utm_content_first = firstTouchData.utm_content;
        if (firstTouchData.utm_term)
          traits.utm_term_first = firstTouchData.utm_term;

        // Set additional first-touch properties
        if (firstTouchData.first_referrer)
          traits.first_referrer = firstTouchData.first_referrer;
        if (firstTouchData.first_landing_page)
          traits.first_landing_page = firstTouchData.first_landing_page;
        if (firstTouchData.first_touch_ts)
          traits.first_touch_ts = firstTouchData.first_touch_ts;
        traits.is_first_visit = firstTouchData.is_first_visit;

        if (Object.keys(traits).length > 0) {
          segment.identify(traits);
        }
      }

      // Store current UTM data for event tracking
      currentUTMData = {
        // Current touch UTMs
        utm_source: currentTouchData.utm_source,
        utm_medium: currentTouchData.utm_medium,
        utm_campaign: currentTouchData.utm_campaign,
        utm_content: currentTouchData.utm_content,
        utm_term: currentTouchData.utm_term,
        // Additional current touch data
        referrer: currentTouchData.referrer,
        landing_page: currentTouchData.landing_page,
        session_id: currentTouchData.session_id,
      };

      // Listen for UTM updates during the session
      const handleUTMUpdate = (event: CustomEvent) => {
        const { currentTouch } = event.detail;
        if (currentTouch) {
          currentUTMData = {
            utm_source: currentTouch.utm_source,
            utm_medium: currentTouch.utm_medium,
            utm_campaign: currentTouch.utm_campaign,
            utm_content: currentTouch.utm_content,
            utm_term: currentTouch.utm_term,
            referrer: currentTouch.referrer,
            landing_page: currentTouch.landing_page,
            session_id: currentTouch.session_id,
          };
        }
      };

      window.addEventListener(
        "utm-session-update",
        handleUTMUpdate as EventListener,
      );

      return () => {
        // Don't reset on unmount - preserve session
        // segment.reset() should only be called on explicit logout
      };
    };

    initSegment();
  }, [writeKey, userId, options]);

  return null;
}

// Analytics utility functions
export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined" && segmentInstance) {
      // Merge current UTM data with event properties
      const enhancedProperties = {
        ...currentUTMData, // Include all current UTM data
        ...eventProperties, // User properties can override if needed
        // Add current page context
        current_page_path: window.location.pathname,
        current_page_url: window.location.href,
      };

      console.log("Segment track called:", eventName, enhancedProperties);
      segmentInstance.track(eventName, enhancedProperties);
    } else {
      console.log(
        "Segment track skipped - not initialized or window undefined",
      );
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== "undefined" && segmentInstance) {
      console.log("Segment identify:", { userId, userProperties });

      // Identify user with traits
      segmentInstance.identify(userId, userProperties || {});
    }
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== "undefined" && segmentInstance) {
      // In Segment, user properties are set via identify with traits
      segmentInstance.identify(properties);
    }
  },

  setGroup: (groupType: string, groupName: string | string[]) => {
    if (typeof window !== "undefined" && segmentInstance) {
      // In Segment, we use the group() method
      const groupId = Array.isArray(groupName) ? groupName[0] : groupName;
      segmentInstance.group(groupId, { type: groupType });
    }
  },

  logEvent: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Use the track method to ensure UTM data is included
      analytics.track(eventName, eventProperties);
    }
  },

  reset: () => {
    if (typeof window !== "undefined" && segmentInstance) {
      segmentInstance.reset();
    }
  },

  getDeviceId: () => {
    if (typeof window !== "undefined") {
      // Read anonymous ID from Segment cookie
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("ajs_anonymous_id="))
          ?.split("=")[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      } catch (error) {
        console.error("[Segment] Error reading anonymous ID:", error);
        return null;
      }
    }
    return null;
  },

  getUserId: () => {
    if (typeof window !== "undefined") {
      // Read user ID from Segment cookie
      try {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("ajs_user_id="))
          ?.split("=")[1];
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      } catch (error) {
        console.error("[Segment] Error reading user ID:", error);
        return null;
      }
    }
    return null;
  },

  getSessionId: () => {
    if (typeof window !== "undefined") {
      // Segment doesn't have a built-in session ID like Amplitude
      // Return the custom session ID from UTM tracker
      return currentUTMData.session_id || null;
    }
    return null;
  },

  logState: () => {
    if (typeof window !== "undefined") {
      const state = {
        anonymousId: analytics.getDeviceId(),
        userId: analytics.getUserId(),
        sessionId: currentUTMData.session_id,
      };
      console.log("[Segment] Current state:", state);
      return state;
    }
    return null;
  },
};

// Event tracking functions (only the ones actually used in the codebase)
export const trackButtonClick = (
  buttonName: string,
  location?: string,
  properties?: Record<string, any>,
) => {
  analytics.track("Button Clicked", {
    button_name: buttonName,
    location,
    ...properties,
  });
};

export const trackFormSubmit = (
  formName: string,
  properties?: Record<string, any>,
) => {
  analytics.track("Form Submitted", {
    form_name: formName,
    ...properties,
  });
};

// Enhanced button click tracking with automatic event type detection
export const trackSmartButtonClick = (
  buttonText: string,
  href: string,
  location?: string,
  additionalProperties?: Record<string, any>,
) => {
  // Normalize the URL for comparison
  const normalizedHref = href.toLowerCase().trim();

  // Determine event type and properties based on destination
  let eventName: string;
  const eventProperties: Record<string, any> = {
    button_text: buttonText,
    destination_url: href,
    location: location,
    ...additionalProperties,
  };

  // Map URLs to specific event types
  if (
    normalizedHref.includes("app.rosterlab.com/signup") ||
    normalizedHref === "https://app.rosterlab.com/signup"
  ) {
    eventName = "Free Signup Button Clicked";
    eventProperties.cta_type = "signup";
    eventProperties.external = true;
  } else if (
    normalizedHref === "/book-a-demo" ||
    normalizedHref.includes("/book-a-demo")
  ) {
    eventName = "Book Demo Button Clicked";
    eventProperties.cta_type = "demo";
    eventProperties.external = false;
  } else if (
    normalizedHref === "/staff-rostering-interactive-demo" ||
    normalizedHref.includes("/staff-rostering-interactive-demo")
  ) {
    eventName = "See Example Button Clicked";
    eventProperties.cta_type = "example";
    eventProperties.demo_type = "interactive";
    eventProperties.external = false;
  } else if (
    normalizedHref === "/contact" ||
    normalizedHref.includes("/contact")
  ) {
    eventName = "Contact Us Button Clicked";
    eventProperties.cta_type = "contact";
    eventProperties.external = false;
  } else if (
    normalizedHref === "https://app.rosterlab.com" ||
    normalizedHref === "https://app.rosterlab.com/"
  ) {
    eventName = "Login Button Clicked";
    eventProperties.cta_type = "login";
    eventProperties.external = true;
  } else if (
    normalizedHref === "/pricing" ||
    normalizedHref.includes("/pricing")
  ) {
    eventName = "View Pricing Button Clicked";
    eventProperties.cta_type = "pricing";
    eventProperties.external = false;
  } else if (normalizedHref.includes("mailto:")) {
    eventName = "Email Button Clicked";
    eventProperties.cta_type = "email";
    eventProperties.email_address = normalizedHref.replace("mailto:", "");
    eventProperties.external = true;
  } else if (
    normalizedHref.includes("calendly.com") ||
    normalizedHref.includes("meetings.")
  ) {
    eventName = "Schedule Meeting Button Clicked";
    eventProperties.cta_type = "meeting";
    eventProperties.external = true;
  } else {
    // Default to generic button click with smart categorization
    eventName = "Button Clicked";
    eventProperties.cta_type = "other";
    eventProperties.external = normalizedHref.startsWith("http");
  }

  // Add current page path if available
  if (typeof window !== "undefined") {
    eventProperties.current_page_path = window.location.pathname;
    eventProperties.current_page_url = window.location.href;
  }

  // Send the event
  console.log("trackSmartButtonClick firing:", {
    eventName,
    eventProperties,
  });
  analytics.track(eventName, eventProperties);
};
