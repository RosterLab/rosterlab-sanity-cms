import { cookies, headers } from "next/headers";
import { getStatsigServer, getStatsigUser } from "./server";

export async function getServerExperiment(experimentName: string) {
  const cookieStore = await cookies();
  const headersList = await headers();

  const anonId = cookieStore.get("_rl_anon_id")?.value || null;
  const country = headersList.get("x-detected-country") || null;

  const statsig = await getStatsigServer();
  const user = getStatsigUser(anonId, country);

  return statsig.getExperiment(user, experimentName);
}

export async function checkServerGate(gateName: string) {
  const cookieStore = await cookies();
  const headersList = await headers();

  const anonId = cookieStore.get("_rl_anon_id")?.value || null;
  const country = headersList.get("x-detected-country") || null;

  const statsig = await getStatsigServer();
  const user = getStatsigUser(anonId, country);

  return statsig.checkGate(user, gateName);
}
