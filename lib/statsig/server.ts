import Statsig, { StatsigUser } from "statsig-node";

let initialized = false;

export async function getStatsigServer(): Promise<typeof Statsig> {
  if (!initialized) {
    await Statsig.initialize(process.env.STATSIG_SERVER_SECRET!);
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
