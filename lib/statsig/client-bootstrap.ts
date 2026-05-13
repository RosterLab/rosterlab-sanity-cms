import { getStatsigServer, getStatsigUser } from "./server";

export async function getClientBootstrapValues(
  anonId: string | null,
  country?: string | null,
) {
  const statsig = await getStatsigServer();
  const user = getStatsigUser(anonId, country);
  const values = statsig.getClientInitializeResponse(user);
  return { user, values };
}
