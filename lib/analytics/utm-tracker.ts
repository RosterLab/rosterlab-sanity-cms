/**
 * UTM Tracking Utilities
 * Handles first-touch attribution, intelligent fallbacks, and cross-domain tracking
 */

interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
}

interface FirstTouchData extends UTMParams {
  first_referrer: string | null;
  first_landing_page: string | null;
  first_touch_ts: number;
  is_first_visit: boolean;
}

interface CurrentTouchData extends UTMParams {
  referrer: string | null;
  landing_page: string | null;
  session_id: string;
}

// Cookie configuration
const COOKIE_CONFIG = {
  domain: ".rosterlab.com",
  maxAge: 90 * 24 * 60 * 60, // 90 days in seconds
  sameSite: "lax" as const,
  secure: true,
};

// Storage keys
const STORAGE_KEYS = {
  firstTouch: "rl_first_touch",
  sessionId: "rl_session_id",
  lastActivity: "rl_last_activity",
};

// Session timeout (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get or create session ID
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  const lastActivity = localStorage.getItem(STORAGE_KEYS.lastActivity);
  const existingSessionId = sessionStorage.getItem(STORAGE_KEYS.sessionId);

  // Check if session has expired
  if (lastActivity && existingSessionId) {
    const timeSinceLastActivity = Date.now() - parseInt(lastActivity, 10);
    if (timeSinceLastActivity < SESSION_TIMEOUT) {
      // Update last activity
      localStorage.setItem(STORAGE_KEYS.lastActivity, Date.now().toString());
      return existingSessionId;
    }
  }

  // Create new session
  const newSessionId = generateSessionId();
  sessionStorage.setItem(STORAGE_KEYS.sessionId, newSessionId);
  localStorage.setItem(STORAGE_KEYS.lastActivity, Date.now().toString());
  return newSessionId;
}

/**
 * Parse UTM parameters from URL
 */
function parseUTMsFromURL(url: URL): UTMParams {
  return {
    utm_source: url.searchParams.get("utm_source"),
    utm_medium: url.searchParams.get("utm_medium"),
    utm_campaign: url.searchParams.get("utm_campaign"),
    utm_content: url.searchParams.get("utm_content"),
    utm_term: url.searchParams.get("utm_term"),
  };
}

/**
 * Detect click IDs and map to appropriate source/medium
 */
function detectClickIds(url: URL): Partial<UTMParams> {
  const clickIds = {
    gclid: { source: "google", medium: "cpc" },
    dclid: { source: "google", medium: "display" },
    fbclid: { source: "facebook", medium: "paid-social" },
    ttclid: { source: "tiktok", medium: "paid-social" },
    li_fat_id: { source: "linkedin", medium: "paid-social" },
  };

  for (const [param, attribution] of Object.entries(clickIds)) {
    if (url.searchParams.get(param)) {
      return {
        utm_source: attribution.source,
        utm_medium: attribution.medium,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
      };
    }
  }

  return {};
}

/**
 * Detect organic search engines
 */
function detectOrganicSearch(referrer: string): Partial<UTMParams> | null {
  if (!referrer) return null;

  const searchEngines = [
    { domain: "google.", source: "google" },
    { domain: "bing.", source: "bing" },
    { domain: "yahoo.", source: "yahoo" },
    { domain: "duckduckgo.", source: "duckduckgo" },
    { domain: "baidu.", source: "baidu" },
    { domain: "yandex.", source: "yandex" },
  ];

  const referrerDomain = new URL(referrer).hostname.toLowerCase();

  for (const engine of searchEngines) {
    if (referrerDomain.includes(engine.domain)) {
      return {
        utm_source: engine.source,
        utm_medium: "organic",
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
      };
    }
  }

  return null;
}

/**
 * Check if referrer is internal
 */
function isInternalReferrer(referrer: string): boolean {
  if (!referrer) return false;

  try {
    const referrerHost = new URL(referrer).hostname;
    const internalDomains = [
      "rosterlab.com",
      "app.rosterlab.com",
      "www.rosterlab.com",
    ];

    return internalDomains.some(
      (domain) =>
        referrerHost === domain || referrerHost.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

/**
 * Get attribution with intelligent fallbacks
 */
export function getAttribution(
  url: string = window.location.href,
  referrer: string = document.referrer,
): UTMParams {
  const currentUrl = new URL(url);

  // 1. Check for UTM parameters
  const utms = parseUTMsFromURL(currentUrl);
  if (utms.utm_source) {
    return utms;
  }

  // 2. Check for click IDs
  const clickIdAttribution = detectClickIds(currentUrl);
  if (clickIdAttribution.utm_source) {
    return { ...utms, ...clickIdAttribution };
  }

  // 3. Check for organic search
  const organicAttribution = detectOrganicSearch(referrer);
  if (organicAttribution) {
    return { ...utms, ...organicAttribution };
  }

  // 4. Check for external referrer
  if (referrer && !isInternalReferrer(referrer)) {
    try {
      const referrerHost = new URL(referrer).hostname;
      return {
        utm_source: referrerHost,
        utm_medium: "referral",
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
      };
    } catch {
      // Invalid referrer URL
    }
  }

  // 5. Direct traffic
  return {
    utm_source: "direct",
    utm_medium: "none",
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
  };
}

/**
 * Get cookie value
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

/**
 * Set cookie with proper configuration
 */
function setCookie(name: string, value: string, options = COOKIE_CONFIG): void {
  if (typeof document === "undefined") return;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  if (options.secure) {
    cookieString += "; secure";
  }

  cookieString += "; path=/";

  document.cookie = cookieString;
}

/**
 * Get first-touch data from storage
 */
export function getFirstTouchData(): FirstTouchData | null {
  if (typeof window === "undefined") return null;

  // Try cookie first, then localStorage as fallback
  const cookieData = getCookie(STORAGE_KEYS.firstTouch);
  const localData = localStorage.getItem(STORAGE_KEYS.firstTouch);

  const data = cookieData || localData;
  if (!data) return null;

  try {
    return JSON.parse(decodeURIComponent(data));
  } catch {
    return null;
  }
}

/**
 * Set first-touch data (only if not already set)
 */
export function setFirstTouchData(
  attribution: UTMParams,
  url: string = window.location.href,
  referrer: string = document.referrer,
): FirstTouchData | null {
  if (typeof window === "undefined") return null;

  // Check if first-touch data already exists
  const existing = getFirstTouchData();
  if (existing) {
    return existing; // Never overwrite first-touch data
  }

  // Don't set first-touch as "direct" if there's a valid referrer
  if (
    attribution.utm_source === "direct" &&
    referrer &&
    !isInternalReferrer(referrer)
  ) {
    // This is likely a configuration issue - log for debugging
    console.warn(
      "[UTM Tracker] Direct attribution with non-empty external referrer:",
      referrer,
    );
  }

  const firstTouchData: FirstTouchData = {
    ...attribution,
    first_referrer: referrer || null,
    first_landing_page: new URL(url).pathname,
    first_touch_ts: Date.now(),
    is_first_visit: true,
  };

  const dataString = JSON.stringify(firstTouchData);

  // Store in both cookie and localStorage for redundancy
  setCookie(STORAGE_KEYS.firstTouch, dataString);
  localStorage.setItem(STORAGE_KEYS.firstTouch, dataString);

  return firstTouchData;
}

/**
 * Get current touch data for events
 */
export function getCurrentTouchData(
  url: string = window.location.href,
  referrer: string = document.referrer,
): CurrentTouchData {
  const attribution = getAttribution(url, referrer);

  return {
    ...attribution,
    referrer: referrer || null,
    landing_page: new URL(url).pathname,
    session_id: getSessionId(),
  };
}

/**
 * Check if user agent is likely a bot
 */
export function isBot(): boolean {
  if (typeof navigator === "undefined") return false;

  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /slurp/i,
    /mediapartners/i,
    /facebookexternalhit/i,
    /whatsapp/i,
    /telegram/i,
    /twitter/i,
    /linkedin/i,
  ];

  const ua = navigator.userAgent;
  return botPatterns.some((pattern) => pattern.test(ua));
}

/**
 * Initialize UTM tracking
 */
export function initializeUTMTracking(): {
  firstTouch: FirstTouchData | null;
  currentTouch: CurrentTouchData;
} | null {
  if (typeof window === "undefined" || isBot()) return null;

  const currentTouch = getCurrentTouchData();
  const attribution = getAttribution();

  // Set first-touch data if not exists
  const firstTouch = setFirstTouchData(attribution) || getFirstTouchData();

  return {
    firstTouch,
    currentTouch,
  };
}

/**
 * Get all UTM data for debugging
 */
export function getUTMDebugInfo(): Record<string, any> {
  const firstTouch = getFirstTouchData();
  const currentTouch = getCurrentTouchData();
  const sessionId = getSessionId();

  return {
    firstTouch,
    currentTouch,
    sessionId,
    currentUrl: window.location.href,
    referrer: document.referrer,
    isInternalReferrer: isInternalReferrer(document.referrer),
    isBot: isBot(),
    cookieEnabled: navigator.cookieEnabled,
    timestamp: new Date().toISOString(),
  };
}
