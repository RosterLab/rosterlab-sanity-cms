"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

interface AmplitudeProps {
  apiKey: string;
  userId?: string;
  options?: Record<string, any>;
}

export default function Amplitude({
  apiKey,
  userId,
  options = {},
}: AmplitudeProps) {
  useEffect(() => {
    if (!apiKey || typeof window === "undefined") return;

    // Determine server URL based on environment
    // Use production endpoint only for main production site, everything else goes to test
    const isProduction =
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_VERCEL_ENV?.includes("preview") &&
      !window.location.hostname.includes("netlify");

    const serverUrl = isProduction
      ? "https://public.rosterlab.com/telemetry/a/2/httpapi"
      : "https://public-test.rosterlab.com/telemetry/a/2/httpapi";

    // Initialize Amplitude with cross-domain tracking
    amplitude.init(apiKey, userId, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
      // Enable cross-domain tracking - share cookies across all subdomains
      cookieOptions: {
        domain: ".rosterlab.com", // Allows tracking across www.rosterlab.com and app.rosterlab.com
      },
      // Standard session timeout
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      // Use proxy for analytics requests
      serverUrl,
      ...options,
    });

    // Add session replay plugin
    const sessionReplay = sessionReplayPlugin({
      sampleRate: 1.0, // Record 100% of sessions
    });

    amplitude.add(sessionReplay);

    // Set user ID if provided
    if (userId) {
      amplitude.setUserId(userId);
    }

    return () => {
      // Clean up on unmount
      amplitude.reset();
    };
  }, [apiKey, userId, options]);

  return null;
}

// Analytics utility functions
export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      console.log("Amplitude track called:", eventName, eventProperties);
      amplitude.track(eventName, eventProperties);
    } else {
      console.log("Amplitude track skipped - window undefined");
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
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
      amplitude.logEvent(eventName, eventProperties);
    }
  },

  reset: () => {
    if (typeof window !== "undefined") {
      amplitude.reset();
    }
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
