import { getCurrentTouchData } from "@/lib/analytics/utm-tracker";
import {
  metaTrackInitiateCheckout,
  metaTrackViewContent,
} from "@/lib/analytics/meta-pixel";
import {
  getClientContext,
  fetchServerGeo,
  getServerGeoSync,
} from "@/lib/analytics/client-context";
import { markDemoBooked } from "@/lib/analytics/user-behavior-tracker";

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

function getEnrichmentData(): Record<string, any> {
  const ctx = getClientContext();
  const geo = getServerGeoSync();

  return {
    $timezone: ctx.timezone,
    $timezone_offset: ctx.timezone_offset,
    $locale: ctx.locale,
    $languages: ctx.languages,
    $screen_width: ctx.screen_width,
    $screen_height: ctx.screen_height,
    $viewport_width: ctx.viewport_width,
    $viewport_height: ctx.viewport_height,
    $device_pixel_ratio: ctx.device_pixel_ratio,
    $device_type: ctx.device_type,
    $touch_capable: ctx.touch_capable,
    $platform: ctx.platform,
    $connection_type: ctx.connection_type,
    $dark_mode: ctx.dark_mode,
    $do_not_track: ctx.do_not_track,
    $ad_blocker_likely: ctx.ad_blocker_likely,
    ...(geo && {
      $geo_country: geo.country,
      $geo_city: geo.city,
      $geo_region: geo.region,
      $geo_timezone: geo.timezone,
      $geo_latitude: geo.latitude,
      $geo_longitude: geo.longitude,
    }),
    ...(ctx.timezone_country && {
      $tz_country: ctx.timezone_country,
      $tz_region: ctx.timezone_region,
    }),
  };
}

export const analytics = {
  track: (eventName: string, eventProperties?: Record<string, any>) => {
    if (typeof window === "undefined") return;

    // Build context object
    const context: Record<string, any> = {
      page: {
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer || null,
      },
      ip: undefined, // Server will populate this
    };

    // Add campaign context if available
    const campaignContext = getCampaignContext();
    if (campaignContext) {
      context.campaign = campaignContext;
    }

    const enhancedProperties = {
      ...getEnrichmentData(),
      ...getUTMData(),
      ...eventProperties,
      current_page_path: window.location.pathname,
      current_page_url: window.location.href,
      context, // Add context object
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
        .find((row) => row.startsWith("rl_authenticated="))
        ?.split("=")[1];
      return cookieValue && cookieValue !== "0" ? cookieValue : null;
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
  let ctaSlug: string;
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
    ctaSlug = "signup";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Free Signup: ${buttonText}`;
    eventProperties.external = true;
  } else if (
    normalizedHref === "/book-a-demo" ||
    normalizedHref.includes("/book-a-demo")
  ) {
    ctaType = "demo";
    ctaSlug = "book-demo";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Book Demo: ${buttonText}`;
    eventProperties.external = false;
  } else if (
    normalizedHref === "/staff-rostering-interactive-demo" ||
    normalizedHref.includes("/staff-rostering-interactive-demo")
  ) {
    ctaType = "example";
    ctaSlug = "interactive-demo";
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
    ctaSlug = "contact";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Contact: ${buttonText}`;
    eventProperties.external = false;
  } else if (
    normalizedHref === "https://app.rosterlab.com" ||
    normalizedHref === "https://app.rosterlab.com/"
  ) {
    analytics.track("navigation_clicked", {
      button_text: buttonText,
      destination_url: href,
      nav_type: "login",
      page_location: location,
      current_page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
      ...additionalProperties,
    });
    return;
  } else if (
    normalizedHref === "/pricing" ||
    normalizedHref.includes("/pricing")
  ) {
    ctaType = "pricing";
    ctaSlug = "pricing";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Pricing: ${buttonText}`;
    eventProperties.external = false;
  } else if (normalizedHref.includes("mailto:")) {
    ctaType = "email";
    ctaSlug = "email";
    ctaName = location ? `${location}: ${buttonText}` : `Email: ${buttonText}`;
    eventProperties.email_address = normalizedHref.replace("mailto:", "");
    eventProperties.external = true;
  } else if (
    normalizedHref.includes("calendly.com") ||
    normalizedHref.includes("meetings.")
  ) {
    ctaType = "meeting";
    ctaSlug = "meeting";
    ctaName = location
      ? `${location}: ${buttonText}`
      : `Schedule Meeting: ${buttonText}`;
    eventProperties.external = true;
  } else {
    ctaType = "other";
    ctaSlug = "other";
    ctaName = location ? `${location}: ${buttonText}` : buttonText;
    eventProperties.external = normalizedHref.startsWith("http");
  }

  eventProperties.cta_name = ctaName;
  eventProperties.cta_type = ctaType;
  eventProperties.cta = ctaSlug;

  if (typeof window !== "undefined") {
    eventProperties.current_page_path = window.location.pathname;
    eventProperties.current_page_url = window.location.href;
    eventProperties.page = window.location.pathname;
  }

  eventProperties.cta_text = buttonText;
  eventProperties.cta_location = location;
  eventProperties.page_path =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  analytics.track("cta_clicked", eventProperties);

  if (ctaType === "signup") {
    analytics.track("signup_started", {
      cta_name: ctaName,
      button_text: buttonText,
      cta_text: buttonText,
      destination_url: href,
      page_location: location,
      cta_location: location,
    });
    metaTrackInitiateCheckout({
      contentName: ctaName,
      value: 50,
      contentCategory: "signup",
    });
  } else if (ctaType === "demo") {
    markDemoBooked();
    metaTrackViewContent({
      contentName: ctaName,
      contentCategory: "demo_intent",
      contentType: "cta",
    });
  }
};
