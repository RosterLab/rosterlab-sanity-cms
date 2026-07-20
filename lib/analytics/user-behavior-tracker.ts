/**
 * User Behavior Tracker
 * Tracks page views, visited pages, and demo booking status for A/B test targeting
 */

// Storage keys
const STORAGE_KEY = "rl_user_behavior";
const SESSION_KEY = "rl_session_pages";
const MODAL_STATE_KEY = "rl_modal_state";
const PAGE_ENTRY_KEY = "rl_page_entry";
const SESSION_START_KEY = "rl_session_start";

// Frequency cap and timing constants
const FREQUENCY_CAP_DAYS = 30; // Reset modal counter after 30 days
const MAX_MODALS_PER_PERIOD = 4; // Maximum modals to show per 30-day period
const MIN_TIME_ON_HIGH_INTENT_PAGES = 60; // Seconds required on high-intent pages
const MIN_TIME_ON_SITE_RETURNING = 45; // Seconds required for returning visitors
const COOLDOWN_DAYS = 3; // Days to wait after dismissal before showing another modal

export interface UserBehavior {
  totalPageViews: number;
  sessionPageViews: number;
  visitedPages: string[];
  hasVisitedHighIntent: boolean;
  highIntentTimeSpent: number; // Total seconds spent on high-intent pages
  hasDemoBooked: boolean;
  lastVisitedAt: string;
  firstVisitedAt: string;
  isReturningVisitor: boolean; // Has visited before
  sessionStartTime: number; // Timestamp when session started
}

export interface ModalState {
  variant: "A" | "B" | "C" | "D" | null;
  shown: boolean;
  dismissed: boolean;
  dismissedAt: string | null;
  converted: boolean;
  convertedAt: string | null;
  variantsShown: Array<"A" | "B" | "C" | "D">; // Track which variants user has seen across sessions
  totalShown: number; // Total number of modals shown in current 30-day period
  periodStartDate: string | null; // ISO date when current 30-day period started
}

/**
 * Get current user behavior data
 */
export function getUserBehavior(): UserBehavior {
  if (typeof window === "undefined") {
    return getDefaultBehavior();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const sessionStored = sessionStorage.getItem(SESSION_KEY);
    const sessionStartStored = sessionStorage.getItem(SESSION_START_KEY);

    const defaultBehavior = getDefaultBehavior();

    const behavior = stored ? JSON.parse(stored) : defaultBehavior;
    const sessionViews = sessionStored ? parseInt(sessionStored, 10) : 0;
    const sessionStartTime = sessionStartStored
      ? parseInt(sessionStartStored, 10)
      : Date.now();

    return {
      ...defaultBehavior,
      ...behavior,
      sessionPageViews: sessionViews,
      sessionStartTime,
      // Ensure backwards compatibility for new fields
      highIntentTimeSpent: behavior.highIntentTimeSpent || 0,
      isReturningVisitor: behavior.isReturningVisitor || false,
    };
  } catch {
    return getDefaultBehavior();
  }
}

/**
 * Track a page view
 */
export function trackPageView(pathname: string): UserBehavior {
  if (typeof window === "undefined") {
    return getDefaultBehavior();
  }

  const behavior = getUserBehavior();
  const now = Date.now();
  const nowISO = new Date().toISOString();

  // Calculate time spent on previous page if it was high-intent
  let highIntentTimeSpent = behavior.highIntentTimeSpent;
  try {
    const pageEntryData = sessionStorage.getItem(PAGE_ENTRY_KEY);
    if (pageEntryData) {
      const { path: previousPath, timestamp: entryTime } =
        JSON.parse(pageEntryData);
      const wasHighIntent = checkHighIntentPage(previousPath);

      if (wasHighIntent && entryTime) {
        const timeSpent = Math.floor((now - entryTime) / 1000); // Convert to seconds
        highIntentTimeSpent += timeSpent;
      }
    }
  } catch {
    // Error reading/parsing page entry data
  }

  // Store current page entry time
  try {
    sessionStorage.setItem(
      PAGE_ENTRY_KEY,
      JSON.stringify({ path: pathname, timestamp: now }),
    );
  } catch {
    // Storage failed
  }

  // Increment counters
  const totalPageViews = behavior.totalPageViews + 1;
  const sessionPageViews = behavior.sessionPageViews + 1;

  // Add to visited pages if not already there
  const visitedPages = behavior.visitedPages.includes(pathname)
    ? behavior.visitedPages
    : [...behavior.visitedPages, pathname];

  // Check if this is a high-intent page
  const isHighIntent = checkHighIntentPage(pathname);
  const hasVisitedHighIntent = behavior.hasVisitedHighIntent || isHighIntent;

  // Determine if this is a returning visitor
  const isReturningVisitor = !!behavior.firstVisitedAt && behavior.firstVisitedAt !== nowISO;

  // Get or set session start time
  let sessionStartTime = behavior.sessionStartTime;
  if (!sessionStartTime || behavior.sessionPageViews === 0) {
    sessionStartTime = now;
    try {
      sessionStorage.setItem(SESSION_START_KEY, sessionStartTime.toString());
    } catch {
      // Storage failed
    }
  }

  const updatedBehavior: UserBehavior = {
    totalPageViews,
    sessionPageViews,
    visitedPages,
    hasVisitedHighIntent,
    highIntentTimeSpent,
    hasDemoBooked: behavior.hasDemoBooked,
    lastVisitedAt: nowISO,
    firstVisitedAt: behavior.firstVisitedAt || nowISO,
    isReturningVisitor,
    sessionStartTime,
  };

  // Persist to storage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBehavior));
    sessionStorage.setItem(SESSION_KEY, sessionPageViews.toString());
  } catch {
    // Storage failed, continue
  }

  return updatedBehavior;
}

/**
 * Check if a page is high-intent (case study, ROI, pricing, solution)
 * Excludes home page
 */
function checkHighIntentPage(pathname: string): boolean {
  // Exclude home page
  if (pathname === "/" || pathname === "") {
    return false;
  }

  const highIntentPatterns = [
    /\/pricing/i,
    /\/case-stud(y|ies)/i,
    /\/roi/i,
    /\/solution/i,
    /\/about/i, // About us page
    /\/blog\//i, // Blog posts
    /\/industries\//i, // Industry pages are solution pages
    /\/feature\//i, // Feature pages are solution pages
    /\/tools\//i, // Tools pages
    /\/templates\//i, // Template pages
  ];

  return highIntentPatterns.some((pattern) => pattern.test(pathname));
}

/**
 * Mark demo as booked
 */
export function markDemoBooked(): void {
  if (typeof window === "undefined") return;

  const behavior = getUserBehavior();
  behavior.hasDemoBooked = true;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
  } catch {
    // Storage failed
  }
}

/**
 * Get modal state with automatic 30-day period reset
 */
export function getModalState(): ModalState {
  if (typeof window === "undefined") {
    return getDefaultModalState();
  }

  try {
    const stored = localStorage.getItem(MODAL_STATE_KEY);
    const defaultModalState = getDefaultModalState();

    if (!stored) {
      return defaultModalState;
    }

    const modalState = JSON.parse(stored);

    // Check if period has expired and reset if needed
    const periodStartDate = modalState.periodStartDate;
    let totalShown = modalState.totalShown || 0;
    let resetPeriodStartDate = periodStartDate;

    if (periodStartDate) {
      const daysSinceStart = (Date.now() - new Date(periodStartDate).getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceStart >= FREQUENCY_CAP_DAYS) {
        // Period has passed - reset the counter
        totalShown = 0;
        resetPeriodStartDate = null;

        // Persist the reset immediately
        const resetState = {
          ...modalState,
          totalShown: 0,
          periodStartDate: null,
        };
        localStorage.setItem(MODAL_STATE_KEY, JSON.stringify(resetState));
      }
    }

    // Ensure backwards compatibility
    return {
      ...defaultModalState,
      ...modalState,
      variantsShown: modalState.variantsShown || [],
      totalShown,
      periodStartDate: resetPeriodStartDate,
    };
  } catch {
    return getDefaultModalState();
  }
}

/**
 * Update modal state
 */
export function updateModalState(updates: Partial<ModalState>): ModalState {
  if (typeof window === "undefined") {
    return getDefaultModalState();
  }

  const current = getModalState();
  const updated: ModalState = { ...current, ...updates };

  try {
    localStorage.setItem(MODAL_STATE_KEY, JSON.stringify(updated));
  } catch {
    // Storage failed
  }

  return updated;
}

/**
 * Get current page time spent (if on a high-intent page)
 */
function getCurrentPageTimeSpent(): number {
  if (typeof window === "undefined") return 0;

  try {
    const pageEntryData = sessionStorage.getItem(PAGE_ENTRY_KEY);
    if (!pageEntryData) return 0;

    const { path, timestamp } = JSON.parse(pageEntryData);
    const isHighIntent = checkHighIntentPage(path);

    if (isHighIntent && timestamp) {
      return Math.floor((Date.now() - timestamp) / 1000); // Seconds
    }
  } catch {
    // Error reading page entry data
  }

  return 0;
}

/**
 * Check if user is authenticated/logged in
 * Uses rl_authenticated cookie set by the app on .rosterlab.com
 */
function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("rl_authenticated="))
      ?.split("=")[1];

    return !!authCookie && authCookie !== "0";
  } catch {
    return false;
  }
}

/**
 * Check if returning visitor trigger is met
 * Returns true if user is returning and has been on site for required time
 */
function shouldShowReturningVisitorModal(): boolean {
  const behavior = getUserBehavior();

  if (!behavior.isReturningVisitor) {
    return false;
  }

  const timeOnSite = Math.floor((Date.now() - behavior.sessionStartTime) / 1000);
  return timeOnSite >= MIN_TIME_ON_SITE_RETURNING;
}

/**
 * Check if high-intent trigger is met
 * Returns true if user visited high-intent page and spent required time
 */
function shouldShowHighIntentModal(): boolean {
  const behavior = getUserBehavior();

  const hasVisitedHighIntent = behavior.hasVisitedHighIntent;
  const currentPageTime = getCurrentPageTimeSpent();
  const totalHighIntentTime = behavior.highIntentTimeSpent + currentPageTime;
  const hasSpentEnoughTime = totalHighIntentTime >= MIN_TIME_ON_HIGH_INTENT_PAGES;

  return hasVisitedHighIntent && hasSpentEnoughTime;
}

/**
 * Check if user should see the modal
 * Combines both trigger conditions:
 * 1. High-intent page trigger: Visited high-intent page + 30s spent
 * 2. Returning visitor trigger: Is returning visitor + 45s on site
 */
export function shouldShowModal(): boolean {
  const behavior = getUserBehavior();
  const modalState = getModalState();

  // Don't show if dismissed within the cooldown period
  if (modalState.dismissedAt) {
    const daysSinceDismissal =
      (Date.now() - new Date(modalState.dismissedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissal < COOLDOWN_DAYS) {
      return false;
    }
  }

  // Don't show if demo already booked
  if (behavior.hasDemoBooked) {
    return false;
  }

  // Don't show to authenticated/logged-in users
  if (isUserAuthenticated()) {
    return false;
  }

  // Check frequency cap: max modals per period
  // Note: Period reset happens automatically in getModalState()
  const totalShown = modalState.totalShown || 0;

  if (totalShown >= MAX_MODALS_PER_PERIOD) {
    return false;
  }

  // Don't show on book-a-demo pages (user is already converting)
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname === "/book-a-demo" || pathname === "/us/book-a-demo") {
      return false;
    }
  }

  // Check either trigger condition
  const highIntentTrigger = shouldShowHighIntentModal();
  const returningVisitorTrigger = shouldShowReturningVisitorModal();

  return highIntentTrigger || returningVisitorTrigger;
}

/**
 * Assign A/B/C/D test variant with cycling for returning visitors
 * First visit: Random 25% split (A/B/C/D)
 * Returning visits: Show a variant they haven't seen yet, cycling through all options
 */
export function assignVariant(): "A" | "B" | "C" | "D" {
  // Check for URL parameter override (for testing)
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const forceVariant = params.get("modal_variant") as "A" | "B" | "C" | "D" | null;
    if (forceVariant && ["A", "B", "C", "D"].includes(forceVariant)) {
      console.log(`🧪 [Modal] Forcing variant ${forceVariant} via URL parameter`);
      return forceVariant;
    }
  }

  const modalState = getModalState();
  const behavior = getUserBehavior();

  let variant: "A" | "B" | "C" | "D";

  if (behavior.isReturningVisitor && modalState.variantsShown.length > 0) {
    // Returning visitor - cycle through variants they haven't seen
    const allVariants: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
    const unseenVariants = allVariants.filter(
      (v) => !modalState.variantsShown.includes(v),
    );

    if (unseenVariants.length > 0) {
      // Show a random unseen variant
      variant = unseenVariants[Math.floor(Math.random() * unseenVariants.length)];
    } else {
      // All variants seen, cycle through in order based on which was shown least recently
      // Find variant that hasn't been shown in longest time
      const lastShown =
        modalState.variantsShown[modalState.variantsShown.length - 1];
      const currentIndex = allVariants.indexOf(lastShown);
      const nextIndex = (currentIndex + 1) % allVariants.length;
      variant = allVariants[nextIndex];
    }
  } else {
    // First time visitor or first modal shown - random 25% split
    const random = Math.random();
    if (random < 0.25) {
      variant = "A";
    } else if (random < 0.5) {
      variant = "B";
    } else if (random < 0.75) {
      variant = "C";
    } else {
      variant = "D";
    }
  }

  // Update modal state with new variant and increment total shown
  const updatedVariantsShown = [...modalState.variantsShown, variant];
  const totalShown = (modalState.totalShown || 0) + 1;

  // Set period start date if this is the first modal in a new period
  const periodStartDate = modalState.periodStartDate || new Date().toISOString();

  updateModalState({
    variant,
    variantsShown: updatedVariantsShown,
    totalShown,
    periodStartDate,
  });

  return variant;
}


/**
 * Get the trigger type that caused modal to show
 */
export function getModalTriggerType():
  | "high_intent"
  | "returning_visitor"
  | "none" {
  if (shouldShowHighIntentModal()) {
    return "high_intent";
  }
  if (shouldShowReturningVisitorModal()) {
    return "returning_visitor";
  }
  return "none";
}

/**
 * Reset modal state (for testing)
 */
export function resetModalState(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(MODAL_STATE_KEY);
  } catch {
    // Storage failed
  }
}

/**
 * Reset user behavior (for testing)
 */
export function resetUserBehavior(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(PAGE_ENTRY_KEY);
    sessionStorage.removeItem(SESSION_START_KEY);
  } catch {
    // Storage failed
  }
}

/**
 * Debug: Get current tracking status
 * Use in browser console: window.debugModalTracking()
 */
export function getTrackingStatus() {
  if (typeof window === "undefined") {
    return { error: "Not in browser environment" };
  }

  const behavior = getUserBehavior();
  const modalState = getModalState();
  const currentPageTime = getCurrentPageTimeSpent();
  const totalTime = behavior.highIntentTimeSpent + currentPageTime;
  const timeOnSite = Math.floor((Date.now() - behavior.sessionStartTime) / 1000);

  return {
    behavior: {
      totalPageViews: behavior.totalPageViews,
      sessionPageViews: behavior.sessionPageViews,
      visitedPages: behavior.visitedPages,
      hasVisitedHighIntent: behavior.hasVisitedHighIntent,
      highIntentTimeSpent: behavior.highIntentTimeSpent,
      currentPageTime: currentPageTime,
      totalHighIntentTime: totalTime,
      hasDemoBooked: behavior.hasDemoBooked,
      isReturningVisitor: behavior.isReturningVisitor,
      timeOnSiteThisSession: timeOnSite,
    },
    modalState: {
      variant: modalState.variant,
      shown: modalState.shown,
      dismissed: modalState.dismissed,
      dismissedAt: modalState.dismissedAt,
      converted: modalState.converted,
      variantsShown: modalState.variantsShown,
      totalShown: modalState.totalShown,
      periodStartDate: modalState.periodStartDate,
    },
    shouldShow: shouldShowModal(),
    triggerType: getModalTriggerType(),
    triggers: {
      highIntent: {
        active: shouldShowHighIntentModal(),
        hasVisitedHighIntent: behavior.hasVisitedHighIntent,
        hasMetTimeRequirement: totalTime >= MIN_TIME_ON_HIGH_INTENT_PAGES,
        timeRequired: MIN_TIME_ON_HIGH_INTENT_PAGES,
        timeSpent: totalTime,
      },
      returningVisitor: {
        active: shouldShowReturningVisitorModal(),
        isReturningVisitor: behavior.isReturningVisitor,
        hasMetTimeRequirement: timeOnSite >= MIN_TIME_ON_SITE_RETURNING,
        timeRequired: MIN_TIME_ON_SITE_RETURNING,
        timeSpent: timeOnSite,
      },
    },
    requirements: {
      noDemoBooked: !behavior.hasDemoBooked,
      cooldownExpired: !modalState.dismissedAt ||
        (Date.now() - new Date(modalState.dismissedAt).getTime()) / (1000 * 60 * 60 * 24) >= COOLDOWN_DAYS,
      notAuthenticated: !isUserAuthenticated(),
    },
    cooldown: {
      dismissedAt: modalState.dismissedAt,
      cooldownDays: COOLDOWN_DAYS,
      daysSinceDismissal: modalState.dismissedAt
        ? Math.round((Date.now() - new Date(modalState.dismissedAt).getTime()) / (1000 * 60 * 60 * 24) * 10) / 10
        : null,
      isInCooldown: modalState.dismissedAt
        ? (Date.now() - new Date(modalState.dismissedAt).getTime()) / (1000 * 60 * 60 * 24) < COOLDOWN_DAYS
        : false,
    },
    frequencyCap: {
      totalShown: modalState.totalShown || 0,
      limit: MAX_MODALS_PER_PERIOD,
      periodDays: FREQUENCY_CAP_DAYS,
      periodStartDate: modalState.periodStartDate,
      daysInCurrentPeriod: modalState.periodStartDate
        ? Math.floor((Date.now() - new Date(modalState.periodStartDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0,
      daysUntilReset: modalState.periodStartDate
        ? Math.max(0, FREQUENCY_CAP_DAYS - Math.floor((Date.now() - new Date(modalState.periodStartDate).getTime()) / (1000 * 60 * 60 * 24)))
        : 0,
      isAtLimit: (modalState.totalShown || 0) >= MAX_MODALS_PER_PERIOD,
    },
  };
}

// Make debug function available globally in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).debugModalTracking = getTrackingStatus;
}

// Helper functions

function getDefaultBehavior(): UserBehavior {
  return {
    totalPageViews: 0,
    sessionPageViews: 0,
    visitedPages: [],
    hasVisitedHighIntent: false,
    highIntentTimeSpent: 0,
    hasDemoBooked: false,
    lastVisitedAt: new Date().toISOString(),
    firstVisitedAt: new Date().toISOString(),
    isReturningVisitor: false,
    sessionStartTime: Date.now(),
  };
}

function getDefaultModalState(): ModalState {
  return {
    variant: null,
    shown: false,
    dismissed: false,
    dismissedAt: null,
    converted: false,
    convertedAt: null,
    variantsShown: [],
    totalShown: 0,
    periodStartDate: null,
  };
}
