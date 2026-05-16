const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  // Australia
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Perth": "AU",
  "Australia/Adelaide": "AU",
  "Australia/Hobart": "AU",
  "Australia/Darwin": "AU",
  "Australia/Lord_Howe": "AU",
  "Australia/Lindeman": "AU",
  "Australia/Broken_Hill": "AU",
  "Australia/Eucla": "AU",
  "Australia/Currie": "AU",
  // New Zealand
  "Pacific/Auckland": "NZ",
  "Pacific/Chatham": "NZ",
  // United States
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Anchorage": "US",
  "America/Phoenix": "US",
  "Pacific/Honolulu": "US",
  "America/Detroit": "US",
  "America/Boise": "US",
  "America/Juneau": "US",
  "America/Sitka": "US",
  "America/Yakutat": "US",
  "America/Nome": "US",
  "America/Adak": "US",
  "America/Menominee": "US",
  "America/Indiana/Indianapolis": "US",
  "America/Indiana/Knox": "US",
  "America/Indiana/Marengo": "US",
  "America/Indiana/Petersburg": "US",
  "America/Indiana/Tell_City": "US",
  "America/Indiana/Vevay": "US",
  "America/Indiana/Vincennes": "US",
  "America/Indiana/Winamac": "US",
  "America/Kentucky/Louisville": "US",
  "America/Kentucky/Monticello": "US",
  "America/North_Dakota/Beulah": "US",
  "America/North_Dakota/Center": "US",
  "America/North_Dakota/New_Salem": "US",
  // Canada
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Edmonton": "CA",
  "America/Winnipeg": "CA",
  "America/Halifax": "CA",
  "America/St_Johns": "CA",
  "America/Regina": "CA",
  "America/Whitehorse": "CA",
  "America/Yellowknife": "CA",
  "America/Iqaluit": "CA",
  "America/Moncton": "CA",
  "America/Dawson": "CA",
  "America/Dawson_Creek": "CA",
  // United Kingdom & Ireland
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  // Asia-Pacific
  "Asia/Singapore": "SG",
  "Asia/Hong_Kong": "HK",
  "Asia/Tokyo": "JP",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Taipei": "TW",
  "Asia/Manila": "PH",
  "Asia/Jakarta": "ID",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Bangkok": "TH",
  // Europe
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "Europe/Amsterdam": "NL",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Copenhagen": "DK",
  "Europe/Helsinki": "FI",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Brussels": "BE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Lisbon": "PT",
  // Pacific Islands
  "Pacific/Fiji": "FJ",
  "Pacific/Guam": "GU",
  "Pacific/Port_Moresby": "PG",
};

const TIMEZONE_REGION_MAP: Record<string, string> = {
  // Australia — each timezone = one state/territory
  "Australia/Sydney": "NSW",
  "Australia/Melbourne": "VIC",
  "Australia/Brisbane": "QLD",
  "Australia/Lindeman": "QLD",
  "Australia/Perth": "WA",
  "Australia/Eucla": "WA",
  "Australia/Adelaide": "SA",
  "Australia/Broken_Hill": "NSW",
  "Australia/Hobart": "TAS",
  "Australia/Currie": "TAS",
  "Australia/Darwin": "NT",
  "Australia/Lord_Howe": "NSW",
  // New Zealand
  "Pacific/Auckland": "NZ",
  "Pacific/Chatham": "Chatham Islands",
  // US — specific states where timezone is unambiguous
  "America/Phoenix": "AZ",
  "Pacific/Honolulu": "HI",
  "America/Anchorage": "AK",
  "America/Juneau": "AK",
  "America/Sitka": "AK",
  "America/Yakutat": "AK",
  "America/Nome": "AK",
  "America/Adak": "AK",
  "America/Boise": "ID",
  "America/Detroit": "MI",
  "America/Menominee": "MI",
  "America/Indiana/Indianapolis": "IN",
  "America/Indiana/Knox": "IN",
  "America/Indiana/Marengo": "IN",
  "America/Indiana/Petersburg": "IN",
  "America/Indiana/Tell_City": "IN",
  "America/Indiana/Vevay": "IN",
  "America/Indiana/Vincennes": "IN",
  "America/Indiana/Winamac": "IN",
  "America/Kentucky/Louisville": "KY",
  "America/Kentucky/Monticello": "KY",
  "America/North_Dakota/Beulah": "ND",
  "America/North_Dakota/Center": "ND",
  "America/North_Dakota/New_Salem": "ND",
  // US — broad zones (many states share these)
  "America/New_York": "US-Eastern",
  "America/Chicago": "US-Central",
  "America/Denver": "US-Mountain",
  "America/Los_Angeles": "US-Pacific",
  // Canada — each timezone maps to a province
  "America/Toronto": "ON",
  "America/Vancouver": "BC",
  "America/Edmonton": "AB",
  "America/Winnipeg": "MB",
  "America/Halifax": "NS",
  "America/St_Johns": "NL",
  "America/Regina": "SK",
  "America/Whitehorse": "YT",
  "America/Yellowknife": "NT",
  "America/Iqaluit": "NU",
  "America/Moncton": "NB",
  "America/Dawson": "YT",
  "America/Dawson_Creek": "BC",
};

export interface ClientContext {
  timezone: string | null;
  timezone_offset: number;
  timezone_country: string | null;
  timezone_region: string | null;
  locale: string | null;
  languages: string[];
  screen_width: number;
  screen_height: number;
  viewport_width: number;
  viewport_height: number;
  device_pixel_ratio: number;
  device_type: "mobile" | "tablet" | "desktop";
  touch_capable: boolean;
  platform: string | null;
  connection_type: string | null;
  dark_mode: boolean;
  cookie_enabled: boolean;
  do_not_track: boolean;
  ad_blocker_likely: boolean;
}

let cachedContext: ClientContext | null = null;

function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return null;
  }
}

function getLocale(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale || null;
  } catch {
    return navigator.language || null;
  }
}

function getDeviceType(): "mobile" | "tablet" | "desktop" {
  const width = window.innerWidth;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (hasTouch && width < 768) return "mobile";
  if (hasTouch && width < 1024) return "tablet";
  return "desktop";
}

function getConnectionType(): string | null {
  const conn = (navigator as any).connection;
  return conn?.effectiveType || null;
}

function detectAdBlocker(): boolean {
  try {
    const testEl = document.createElement("div");
    testEl.className =
      "adsbox ad-placement ad-banner pub_300x250 textAd sponsorText";
    testEl.style.cssText =
      "position:absolute;left:-9999px;width:1px;height:1px;";
    document.body.appendChild(testEl);
    const blocked =
      testEl.offsetHeight === 0 || getComputedStyle(testEl).display === "none";
    document.body.removeChild(testEl);
    return blocked;
  } catch {
    return false;
  }
}

export function getClientContext(): ClientContext {
  if (typeof window === "undefined") {
    return getEmptyContext();
  }

  if (cachedContext) return cachedContext;

  const timezone = getTimezone();

  cachedContext = {
    timezone,
    timezone_offset: new Date().getTimezoneOffset(),
    timezone_country: timezone ? TIMEZONE_COUNTRY_MAP[timezone] || null : null,
    timezone_region: timezone ? TIMEZONE_REGION_MAP[timezone] || null : null,
    locale: getLocale(),
    languages: [...(navigator.languages || [])],
    screen_width: screen.width,
    screen_height: screen.height,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    device_pixel_ratio: window.devicePixelRatio || 1,
    device_type: getDeviceType(),
    touch_capable: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    platform: (navigator as any).userAgentData?.platform || navigator.platform || null,
    connection_type: getConnectionType(),
    dark_mode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    cookie_enabled: navigator.cookieEnabled,
    do_not_track: navigator.doNotTrack === "1",
    ad_blocker_likely: detectAdBlocker(),
  };

  return cachedContext;
}

export function clearClientContextCache(): void {
  cachedContext = null;
}

function getEmptyContext(): ClientContext {
  return {
    timezone: null,
    timezone_offset: 0,
    timezone_country: null,
    timezone_region: null,
    locale: null,
    languages: [],
    screen_width: 0,
    screen_height: 0,
    viewport_width: 0,
    viewport_height: 0,
    device_pixel_ratio: 1,
    device_type: "desktop",
    touch_capable: false,
    platform: null,
    connection_type: null,
    dark_mode: false,
    cookie_enabled: false,
    do_not_track: false,
    ad_blocker_likely: false,
  };
}

interface ServerGeo {
  country: string | null;
  city: string | null;
  region: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
}

let cachedServerGeo: ServerGeo | null = null;
let geoFetchPromise: Promise<ServerGeo> | null = null;

export function fetchServerGeo(): Promise<ServerGeo> {
  if (typeof window === "undefined") {
    return Promise.resolve({
      country: null,
      city: null,
      region: null,
      timezone: null,
      latitude: null,
      longitude: null,
    });
  }

  if (cachedServerGeo) return Promise.resolve(cachedServerGeo);

  if (!geoFetchPromise) {
    geoFetchPromise = fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        cachedServerGeo = {
          country: data.country || null,
          city: data.city || null,
          region: data.region || null,
          timezone: data.timezone || null,
          latitude: data.latitude || null,
          longitude: data.longitude || null,
        };
        return cachedServerGeo;
      })
      .catch(() => ({
        country: null,
        city: null,
        region: null,
        timezone: null,
        latitude: null,
        longitude: null,
      }));
  }

  return geoFetchPromise;
}

export function getServerGeoSync(): ServerGeo | null {
  return cachedServerGeo;
}
