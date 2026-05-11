import { getCurrentTouchData } from "@/lib/analytics/utm-tracker";

function getUTMData(): Record<string, any> {
  const currentTouchData = getCurrentTouchData();
  if (!currentTouchData) return {};
  return {
    utm_source: currentTouchData.utm_source,
    utm_medium: currentTouchData.utm_medium,
    utm_campaign: currentTouchData.utm_campaign,
    utm_content: currentTouchData.utm_content,
    utm_term: currentTouchData.utm_term,
    referrer: currentTouchData.referrer,
    landing_page: currentTouchData.landing_page,
    session_id: currentTouchData.session_id,
  };
}

export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window === "undefined") return;
    const enhancedProperties = {
      ...getUTMData(),
      ...eventProperties,
      current_page_path: window.location.pathname,
      current_page_url: window.location.href,
    };
    window.rlTracker?.track(eventName, enhancedProperties);
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...enhancedProperties });
    }
  },

  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (typeof window === "undefined") return;
    window.rlTracker?.identify(userId, userProperties);
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window === "undefined") return;
    if (properties.email) {
      window.rlTracker?.identify(properties.email, properties);
    }
  },

  setGroup: (_groupType: string, groupName: string | string[]) => {
    if (typeof window === "undefined") return;
    const groupId = Array.isArray(groupName) ? groupName[0] : groupName;
    window.rlTracker?.track("group_assigned", {
      group_type: _groupType,
      group_id: groupId,
    });
  },

  logEvent: (eventName: string, eventProperties?: Record<string, any>) => {
    analytics.track(eventName, eventProperties);
  },

  reset: () => {},

  getDeviceId: () => {
    if (typeof window === "undefined") return null;
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_rl_anon_id="))
        ?.split("=")[1];
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    } catch {
      return null;
    }
  },

  getUserId: () => {
    if (typeof window === "undefined") return null;
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("ajs_user_id="))
        ?.split("=")[1];
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    } catch {
      return null;
    }
  },

  getSessionId: () => {
    return getUTMData().session_id || null;
  },

  logState: () => {
    if (typeof window === "undefined") return null;
    const state = {
      anonymousId: analytics.getDeviceId(),
      userId: analytics.getUserId(),
      sessionId: getUTMData().session_id,
    };
    console.log("[Analytics] Current state:", state);
    return state;
  },
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

export const trackSmartButtonClick = (
  buttonText: string,
  href: string,
  location?: string,
  additionalProperties?: Record<string, any>,
) => {
  const normalizedHref = href.toLowerCase().trim();

  let ctaType: string;
  let ctaName: string;
  const eventProperties: Record<string, any> = {
    button_text: buttonText,
    destination_url: href,
    page_location: location,
    ...additionalProperties,
  };

  if (
    normalizedHref.includes("app.rosterlab.com/signup") ||
    normalizedHref === "https://app.rosterlab.com/signup"
  ) {
    ctaType = "signup";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Free Signup: ${buttonText}`;
    eventProperties.external = true;
  } else if (
    normalizedHref === "/book-a-demo" ||
    normalizedHref.includes("/book-a-demo")
  ) {
    ctaType = "demo";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Book Demo: ${buttonText}`;
    eventProperties.external = false;
  } else if (
    normalizedHref === "/staff-rostering-interactive-demo" ||
    normalizedHref.includes("/staff-rostering-interactive-demo")
  ) {
    ctaType = "example";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Interactive Demo: ${buttonText}`;
    eventProperties.demo_type = "interactive";
    eventProperties.external = false;
  } else if (
    normalizedHref === "/contact" ||
    normalizedHref.includes("/contact")
  ) {
    ctaType = "contact";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Contact: ${buttonText}`;
    eventProperties.external = false;
  } else if (
    normalizedHref === "https://app.rosterlab.com" ||
    normalizedHref === "https://app.rosterlab.com/"
  ) {
    ctaType = "login";
    ctaName = location ? `${location}: ${buttonText}` : `Login: ${buttonText}`;
    eventProperties.external = true;
  } else if (
    normalizedHref === "/pricing" ||
    normalizedHref.includes("/pricing")
  ) {
    ctaType = "pricing";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Pricing: ${buttonText}`;
    eventProperties.external = false;
  } else if (normalizedHref.includes("mailto:")) {
    ctaType = "email";
    ctaName = location ? `${location}: ${buttonText}` : `Email: ${buttonText}`;
    eventProperties.email_address = normalizedHref.replace("mailto:", "");
    eventProperties.external = true;
  } else if (
    normalizedHref.includes("calendly.com") ||
    normalizedHref.includes("meetings.")
  ) {
    ctaType = "meeting";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Schedule Meeting: ${buttonText}`;
    eventProperties.external = true;
  } else {
    ctaType = "other";
    ctaName = location ? `${location}: ${buttonText}` : buttonText;
    eventProperties.external = normalizedHref.startsWith("http");
  }

  eventProperties.cta_name = ctaName;
  eventProperties.cta_type = ctaType;

  if (typeof window !== "undefined") {
    eventProperties.current_page_path = window.location.pathname;
    eventProperties.current_page_url = window.location.href;
  }

  analytics.track("cta_clicked", eventProperties);
};
