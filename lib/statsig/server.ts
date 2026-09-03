import Statsig, { StatsigUser } from "statsig-node";

// Cache the in-flight initialize() promise, not a boolean. The previous
// version set `initialized = true` only *after* awaiting, so every request
// that arrived during a cold start kicked off its own Statsig.initialize()
// and waited on it — adding hundreds of ms to TTFB on each of them.
let initPromise: Promise<void> | null = null;

// Statsig's config-spec download is a network call. The whole document render
// blocks on it, so bound it: if Statsig is slow we ship the page without a
// server bootstrap and the client SDK initialises asynchronously instead.
const INIT_TIMEOUT_MS = 500;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(null);
      },
    );
  });
}

export async function getStatsigServer(): Promise<typeof Statsig | null> {
  // Skip Statsig if no server secret is configured (e.g., local development)
  if (!process.env.STATSIG_SERVER_SECRET) {
    return null;
  }

  if (!initPromise) {
    initPromise = Statsig.initialize(process.env.STATSIG_SERVER_SECRET).then(
      () => undefined,
    );
    // A failed initialise shouldn't be cached forever — let the next request
    // retry instead of permanently serving un-bootstrapped pages.
    initPromise.catch(() => {
      initPromise = null;
    });
  }

  const ready = await withTimeout(initPromise, INIT_TIMEOUT_MS);
  if (ready === null) {
    return null;
  }

  return Statsig;
}

export function getStatsigUser(
  anonId: string | null,
  country?: string | null,
): StatsigUser {
  return {
    userID: anonId || undefined,
    country: country || undefined,
    customIDs: {},
  };
}
