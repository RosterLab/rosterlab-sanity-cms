"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import {
  getFirstTouchData,
  getCurrentTouchData,
} from "@/lib/analytics/utm-tracker";

// Store current UTM data globally for event tracking
let currentUTMData: Record<string, any> = {};

interface AmplitudeProps {
  apiKey: string;
  userId?: string;
  options?: Record<string, any>;
}

// Track initialization to prevent multiple inits
let isInitialized = false;

export default function Amplitude({
  apiKey,
  userId,
  options = {},
}: AmplitudeProps) {
  useEffect(() => {
    if (!apiKey || typeof window === "undefined") return;

    // Check if already initialized
    if (isInitialized) {
      console.log("Amplitude already initialized, skipping re-initialization", {
        currentDeviceId: amplitude.getDeviceId(),
        currentUserId: amplitude.getUserId(),
        currentSessionId: amplitude.getSessionId(),
      });
      // If user ID changed, update it without re-initializing
      if (userId && amplitude.getUserId() !== userId) {
        amplitude.setUserId(userId);
      }
      return;
    }

    // Check for stored session data (for redirect scenarios)
    const checkStoredSession = () => {
      const sessionData = window.sessionStorage.getItem(
        "amplitude_session_data",
      );
      const localData = window.localStorage.getItem("amplitude_demo_redirect");

      if (sessionData) {
        try {
          const data = JSON.parse(sessionData);
          console.log("[Amplitude] Found stored session data:", data);
          return data;
        } catch (e) {}
      }

      if (localData) {
        try {
          const data = JSON.parse(localData);
          if (data.expires > Date.now()) {
            console.log("[Amplitude] Found stored redirect data:", data);
            return data;
          }
        } catch (e) {}
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

    const serverUrl = isProduction
      ? "https://public.rosterlab.com/telemetry/a/2/httpapi"
      : "https://public-test.rosterlab.com/telemetry/a/2/httpapi";

    // Get UTM tracking data
    const firstTouchData = getFirstTouchData();
    const currentTouchData = getCurrentTouchData();

    // Initialize Amplitude with cross-domain tracking
    amplitude.init(apiKey, userId || storedSession?.userId, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
      // Enable cross-domain tracking - share cookies across all subdomains
      cookieOptions: {
        domain:
          typeof window !== "undefined" &&
          window.location.hostname === "localhost"
            ? undefined // Don't set domain on localhost
            : ".rosterlab.com", // Allows tracking across www.rosterlab.com and app.rosterlab.com
        sameSite: "Lax", // Allow cookies during navigation
        secure:
          typeof window !== "undefined" &&
          window.location.protocol === "https:", // Only secure on HTTPS
        expiration: 365, // Persist device ID for a year
        upgrade: false, // Don't upgrade cookies, maintain existing ones
      },
      // Standard session timeout
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      // Use proxy for analytics requests
      serverUrl,
      ...options,
    });

    // Mark as initialized
    isInitialized = true;

    // Log device ID and user ID after initialization
    console.log("Amplitude initialized:", {
      deviceId: amplitude.getDeviceId(),
      userId: amplitude.getUserId(),
      sessionId: amplitude.getSessionId(),
      firstTouchData,
      currentTouchData,
    });

    // Add session replay plugin
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1.0, // Record 100% of sessions
    });

    amplitude.add(sessionReplay);

    // Set user ID if provided (from props or stored session)
    const finalUserId = userId || storedSession?.email || storedSession?.userId;
    if (finalUserId) {
      amplitude.setUserId(finalUserId);
      console.log("[Amplitude] User ID set:", finalUserId);

      // If we have stored session email, also set as user property
      if (storedSession?.email) {
        const identify = new amplitude.Identify();
        identify.set("email", storedSession.email);
        amplitude.identify(identify);
      }
    }

    // Set first-touch user properties (only if they exist)
    if (firstTouchData) {
      const identify = new amplitude.Identify();

      // Set first-touch UTM properties
      if (firstTouchData.utm_source)
        identify.setOnce("utm_source_first", firstTouchData.utm_source);
      if (firstTouchData.utm_medium)
        identify.setOnce("utm_medium_first", firstTouchData.utm_medium);
      if (firstTouchData.utm_campaign)
        identify.setOnce("utm_campaign_first", firstTouchData.utm_campaign);
      if (firstTouchData.utm_content)
        identify.setOnce("utm_content_first", firstTouchData.utm_content);
      if (firstTouchData.utm_term)
        identify.setOnce("utm_term_first", firstTouchData.utm_term);

      // Set additional first-touch properties
      if (firstTouchData.first_referrer)
        identify.setOnce("first_referrer", firstTouchData.first_referrer);
      if (firstTouchData.first_landing_page)
        identify.setOnce(
          "first_landing_page",
          firstTouchData.first_landing_page,
        );
      if (firstTouchData.first_touch_ts)
        identify.setOnce("first_touch_ts", firstTouchData.first_touch_ts);
      identify.setOnce("is_first_visit", firstTouchData.is_first_visit);

      amplitude.identify(identify);
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
      // amplitude.reset() should only be called on explicit logout
    };
  }, [apiKey, userId, options]);

  return null;
}

// Analytics utility functions
export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Merge current UTM data with event properties
      const enhancedProperties = {
        ...currentUTMData, // Include all current UTM data
        ...eventProperties, // User properties can override if needed
        // Add current page context
        current_page_path: window.location.pathname,
        current_page_url: window.location.href,
      };

      console.log("Amplitude track called:", eventName, enhancedProperties);
      amplitude.track(eventName, enhancedProperties);
    } else {
      console.log("Amplitude track skipped - window undefined");
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      console.log("Amplitude identify:", { userId, userProperties });

      // Simply set the user ID - Amplitude handles device ID linking automatically
      amplitude.setUserId(userId);

      if (userProperties) {
        const identify = new amplitude.Identify();
        Object.entries(userProperties).forEach(([key, value]) => {
          identify.set(key, value);
        });
        amplitude.identify(identify);
      }
    }
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== "undefined") {
      const identify = new amplitude.Identify();
      Object.entries(properties).forEach(([key, value]) => {
        identify.set(key, value);
      });
      amplitude.identify(identify);
    }
  },

  setGroup: (groupType: string, groupName: string | string[]) => {
    if (typeof window !== "undefined") {
      amplitude.setGroup(groupType, groupName);
    }
  },

  logEvent: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Use the track method to ensure UTM data is included
      analytics.track(eventName, eventProperties);
    }
  },

  reset: () => {
    if (typeof window !== "undefined") {
      amplitude.reset();
    }
  },

  getDeviceId: () => {
    if (typeof window !== "undefined") {
      return amplitude.getDeviceId();
    }
    return null;
  },

  getUserId: () => {
    if (typeof window !== "undefined") {
      return amplitude.getUserId();
    }
    return null;
  },

  getSessionId: () => {
    if (typeof window !== "undefined") {
      return amplitude.getSessionId();
    }
    return null;
  },

  logState: () => {
    if (typeof window !== "undefined") {
      const state = {
        deviceId: amplitude.getDeviceId(),
        userId: amplitude.getUserId(),
        sessionId: amplitude.getSessionId(),
      };
      console.log("[Amplitude] Current state:", state);
      return state;
    }
    return null;
  },
};

// Common event tracking functions
export const trackPageView = (
  pageName: string,
  properties?: Record<string, any>,
) => {
  analytics.track("Page Viewed", {
    page_name: pageName,
    ...properties,
  });
};

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

export const trackDownload = (
  fileName: string,
  fileType?: string,
  properties?: Record<string, any>,
) => {
  analytics.track("File Downloaded", {
    file_name: fileName,
    file_type: fileType,
    ...properties,
  });
};

export const trackSignup = (
  method?: string,
  properties?: Record<string, any>,
) => {
  analytics.track("User Signed Up", {
    signup_method: method,
    ...properties,
  });
};

export const trackLogin = (
  method?: string,
  properties?: Record<string, any>,
) => {
  analytics.track("User Logged In", {
    login_method: method,
    ...properties,
  });
};

export const trackFAQToggle = (
  question: string,
  action: "opened" | "closed",
  properties?: Record<string, any>,
) => {
  analytics.track("FAQ Toggled", {
    question,
    action,
    ...properties,
  });
};

export const trackVideoPlay = (
  videoTitle: string,
  location?: string,
  properties?: Record<string, any>,
) => {
  analytics.track("Video Played", {
    video_title: videoTitle,
    location,
    ...properties,
  });
};

export const trackScrollDepth = (depth: number, pageName?: string) => {
  analytics.track("Page Scrolled", {
    scroll_depth: depth,
    page_name: pageName,
  });
};

export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  isExternal: boolean,
  properties?: Record<string, any>,
) => {
  analytics.track("Link Clicked", {
    link_text: linkText,
    link_url: linkUrl,
    is_external: isExternal,
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
