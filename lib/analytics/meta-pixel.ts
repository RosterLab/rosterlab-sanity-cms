const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "777741693485350";

function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function callFbq(...args: MetaPixelArgs): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

export interface MetaUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

function formatAdvancedMatchingData(
  userData: MetaUserData,
): MetaAdvancedMatchingData {
  const data: MetaAdvancedMatchingData = {};
  if (userData.email) data.em = userData.email.toLowerCase().trim();
  if (userData.firstName) data.fn = userData.firstName.toLowerCase().trim();
  if (userData.lastName) data.ln = userData.lastName.toLowerCase().trim();
  if (userData.phone) data.ph = userData.phone.replace(/\D/g, "");
  return data;
}

function updateAdvancedMatching(userData: MetaUserData): void {
  if (typeof window === "undefined" || !window.fbq) return;
  const matchData = formatAdvancedMatchingData(userData);
  if (Object.keys(matchData).length > 0) {
    callFbq("init", PIXEL_ID, matchData);
  }
}

export function metaTrackLead(params: {
  contentName?: string;
  value?: number;
  userData?: MetaUserData;
}): string {
  const eventId = generateEventId();
  if (params.userData) updateAdvancedMatching(params.userData);
  callFbq(
    "track",
    "Lead",
    {
      content_name: params.contentName,
      value: params.value,
      currency: "AUD",
    },
    { eventID: eventId },
  );
  return eventId;
}

export function metaTrackSchedule(params: {
  contentName?: string;
  userData?: MetaUserData;
}): string {
  const eventId = generateEventId();
  if (params.userData) updateAdvancedMatching(params.userData);
  callFbq(
    "track",
    "Schedule",
    { content_name: params.contentName },
    { eventID: eventId },
  );
  return eventId;
}

export function metaTrackContact(params: {
  contentName?: string;
  value?: number;
  userData?: MetaUserData;
}): string {
  const eventId = generateEventId();
  if (params.userData) updateAdvancedMatching(params.userData);
  callFbq(
    "track",
    "Contact",
    {
      content_name: params.contentName,
      value: params.value,
      currency: "AUD",
    },
    { eventID: eventId },
  );
  return eventId;
}

export function metaTrackSubscribe(params: {
  contentName?: string;
  value?: number;
  userData?: MetaUserData;
}): string {
  const eventId = generateEventId();
  if (params.userData) updateAdvancedMatching(params.userData);
  callFbq(
    "track",
    "Subscribe",
    {
      content_name: params.contentName,
      value: params.value,
      currency: "AUD",
    },
    { eventID: eventId },
  );
  return eventId;
}

export function metaTrackViewContent(params: {
  contentName?: string;
  contentCategory?: string;
  contentIds?: string[];
  contentType?: string;
}): string {
  const eventId = generateEventId();
  callFbq(
    "track",
    "ViewContent",
    {
      content_name: params.contentName,
      content_category: params.contentCategory,
      content_ids: params.contentIds,
      content_type: params.contentType,
    },
    { eventID: eventId },
  );
  return eventId;
}

export function metaTrackInitiateCheckout(params: {
  contentName?: string;
  value?: number;
  contentCategory?: string;
}): string {
  const eventId = generateEventId();
  callFbq(
    "track",
    "InitiateCheckout",
    {
      content_name: params.contentName,
      content_category: params.contentCategory,
      value: params.value,
      currency: "AUD",
    },
    { eventID: eventId },
  );
  return eventId;
}

export function metaGrantConsent(): void {
  callFbq("consent", "grant");
}

export function metaRevokeConsent(): void {
  callFbq("consent", "revoke");
}
