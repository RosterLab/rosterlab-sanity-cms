import Statsig, { StatsigUser } from "statsig-node";

let initialized = false;

export async function getStatsigServer(): Promise<typeof Statsig | null> {
  // Skip Statsig if no server secret is configured (e.g., local development)
  if (!process.env.STATSIG_SERVER_SECRET) {
    return null;
  }

  if (!initialized) {
    await Statsig.initialize(process.env.STATSIG_SERVER_SECRET);
    initialized = true;
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
