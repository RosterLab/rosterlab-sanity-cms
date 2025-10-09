"use client";

import { useEffect } from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";
import {
  getFirstTouchData,
  getCurrentTouchData,
} from "@/lib/analytics/utm-tracker";

// Store current UTM data globally for event tracking
let currentUTMData: Record<string, any> = {};

// Store the analytics instance globally
let analyticsInstance: AnalyticsBrowser | null = null;

interface SegmentProps {
  writeKey: string;
  userId?: string;
  options?: Record<string, any>;
}

// Track initialization to prevent multiple inits
let isInitialized = false;

export default function Segment({
  writeKey,
  userId,
  options = {},
}: SegmentProps) {
  useEffect(() => {
    if (!writeKey || typeof window === "undefined") return;

    // Check if already initialized
    if (isInitialized && analyticsInstance) {
      analyticsInstance.user().then((user) => {
        console.log("Segment already initialized, skipping re-initialization", {
          currentUserId: user?.id(),
          currentAnonymousId: user?.anonymousId(),
        });
        // If user ID changed, update it without re-initializing
        if (userId && user?.id() !== userId) {
          analyticsInstance?.identify(userId);
        }
      });
      return;
    }

    // Check for stored session data (for redirect scenarios)
    const checkStoredSession = () => {
      const sessionData = window.sessionStorage.getItem("segment_session_data");
      const localData = window.localStorage.getItem("segment_demo_redirect");

      if (sessionData) {
        try {
          const data = JSON.parse(sessionData);
          console.log("[Segment] Found stored session data:", data);
          return data;
        } catch {
          // Ignore parsing errors
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
          // Ignore parsing errors
        }
      }

      return null;
    };

    const storedSession = checkStoredSession();

    // Determine proxy URL based on environment
    // Use production endpoint only for main production site, everything else goes to test
    const isProduction =
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_VERCEL_ENV?.includes("preview") &&
      !window.location.hostname.includes("netlify");

    const cdnURL = isProduction
      ? "https://public.rosterlab.com/telemetry/s"
      : "https://public-test.rosterlab.com/telemetry/s";

    // Get UTM tracking data
    const firstTouchData = getFirstTouchData();
    const currentTouchData = getCurrentTouchData();

    // Initialize Segment with proxy
    analyticsInstance = AnalyticsBrowser.load(
      {
        writeKey,
        cdnURL,
      },
      {
        // Segment configuration options
        integrations: {
          "Segment.io": {
            apiHost: cdnURL.replace("/s", "/v1"),
          },
        },
        ...options,
      },
    );

    // Mark as initialized
    isInitialized = true;

    // Wait for analytics to be ready
    analyticsInstance.ready(() => {
      if (!analyticsInstance) return;

      analyticsInstance.user().then((user) => {
        console.log("Segment initialized:", {
          anonymousId: user?.anonymousId(),
          userId: user?.id(),
          firstTouchData,
          currentTouchData,
        });
      });

      // Set user ID if provided (from props or stored session)
      const finalUserId =
        userId || storedSession?.email || storedSession?.userId;
      if (finalUserId) {
        analyticsInstance.identify(finalUserId);
        console.log("[Segment] User ID set:", finalUserId);

        // If we have stored session email, also set as user trait
        if (storedSession?.email) {
          analyticsInstance.identify(finalUserId, {
            email: storedSession.email,
          });
        }

        // Also identify in Amplitude Session Replay for identity stitching
        if (typeof window !== "undefined" && (window as any).amplitude) {
          const amplitude = (window as any).amplitude;
          amplitude.setUserId(finalUserId);
          console.log(
            "[Identity Stitching] Synced initial user ID to Amplitude:",
            finalUserId,
          );

          if (storedSession?.email) {
            const Identify = amplitude.Identify;
            if (Identify) {
              const identify = new Identify();
              identify.set("email", storedSession.email);
              amplitude.identify(identify);
              console.log(
                "[Identity Stitching] Synced email to Amplitude:",
                storedSession.email,
              );
            }
          }
        }
      }

      // Set first-touch user traits (only if they exist)
      if (firstTouchData) {
        const traits: Record<string, any> = {};

        // Set first-touch UTM traits
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

        // Set additional first-touch traits
        if (firstTouchData.first_referrer)
          traits.first_referrer = firstTouchData.first_referrer;
        if (firstTouchData.first_landing_page)
          traits.first_landing_page = firstTouchData.first_landing_page;
        if (firstTouchData.first_touch_ts)
          traits.first_touch_ts = firstTouchData.first_touch_ts;
        traits.is_first_visit = firstTouchData.is_first_visit;

        // Identify with first-touch traits
        analyticsInstance.user().then((user) => {
          const currentUserId = user?.id() || undefined;
          analyticsInstance?.identify(currentUserId, traits);
        });
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
    });

    return () => {
      // Don't reset on unmount - preserve session
      // analytics.reset() should only be called on explicit logout
    };
  }, [writeKey, userId, options]);

  return null;
}

// Analytics utility functions
export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined" && analyticsInstance) {
      // Merge current UTM data with event properties
      const enhancedProperties = {
        ...currentUTMData, // Include all current UTM data
        ...eventProperties, // User properties can override if needed
        // Add current page context
        current_page_path: window.location.pathname,
        current_page_url: window.location.href,
      };

      console.log("Segment track called:", eventName, enhancedProperties);
      analyticsInstance.track(eventName, enhancedProperties);
    } else {
      console.log("Segment track skipped - analytics not initialized");
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== "undefined" && analyticsInstance) {
      console.log("Segment identify:", { userId, userProperties });
      analyticsInstance.identify(userId, userProperties);

      // Also identify in Amplitude Session Replay for identity stitching
      if (typeof window !== "undefined" && (window as any).amplitude) {
        const amplitude = (window as any).amplitude;
        amplitude.setUserId(userId);
        if (userProperties) {
          const Identify = amplitude.Identify;
          if (Identify) {
            const identify = new Identify();
            Object.entries(userProperties).forEach(([key, value]) => {
              identify.set(key, value);
            });
            amplitude.identify(identify);
          }
        }
        console.log("[Identity Stitching] Synced user to Amplitude:", userId);
      }
    }
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== "undefined" && analyticsInstance) {
      analyticsInstance.user().then((user) => {
        const currentUserId = user?.id() || undefined;
        analyticsInstance?.identify(currentUserId, properties);
      });
    }
  },

  setGroup: (groupType: string, groupName: string | string[]) => {
    if (typeof window !== "undefined" && analyticsInstance) {
      // Segment uses group() method
      const groupId = Array.isArray(groupName) ? groupName[0] : groupName;
      const groupNameValue = Array.isArray(groupName)
        ? groupName.join(", ")
        : groupName;
      analyticsInstance.group(groupId, {
        type: groupType,
        name: groupNameValue,
      });
    }
  },

  logEvent: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      // Use the track method to ensure UTM data is included
      analytics.track(eventName, eventProperties);
    }
  },

  reset: () => {
    if (typeof window !== "undefined" && analyticsInstance) {
      analyticsInstance.reset();

      // Also reset Amplitude Session Replay
      if (typeof window !== "undefined" && (window as any).amplitude) {
        (window as any).amplitude.reset();
        console.log("[Identity Stitching] Reset Amplitude session");
      }
    }
  },

  getDeviceId: async () => {
    if (typeof window !== "undefined" && analyticsInstance) {
      const user = await analyticsInstance.user();
      return user?.anonymousId() || null;
    }
    return null;
  },

  getUserId: async () => {
    if (typeof window !== "undefined" && analyticsInstance) {
      const user = await analyticsInstance.user();
      return user?.id() || null;
    }
    return null;
  },

  getSessionId: async () => {
    if (typeof window !== "undefined" && analyticsInstance) {
      // Segment doesn't expose session ID directly, use anonymousId as fallback
      const user = await analyticsInstance.user();
      return user?.anonymousId() || null;
    }
    return null;
  },

  logState: async () => {
    if (typeof window !== "undefined" && analyticsInstance) {
      const user = await analyticsInstance.user();
      const state = {
        anonymousId: user?.anonymousId(),
        userId: user?.id(),
        traits: user?.traits(),
      };
      console.log("[Segment] Current state:", state);
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
