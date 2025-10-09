import { Experiment } from "@amplitude/experiment-node-server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

let experimentClient: ReturnType<typeof Experiment.initializeRemote> | null =
  null;

export function getExperimentClient() {
  if (!experimentClient) {
    const deploymentKey = process.env.AMPLITUDE_EXPERIMENT_SERVER_KEY;

    if (!deploymentKey) {
      console.warn("AMPLITUDE_EXPERIMENT_SERVER_KEY not configured");
      return null;
    }

    experimentClient = Experiment.initializeRemote(deploymentKey, {
      fetchTimeoutMillis: 500,
      fetchRetries: 1,
    });
  }

  return experimentClient;
}

async function getSegmentIds(
  cookieStore: ReadonlyRequestCookies,
): Promise<{ deviceId: string; userId?: string }> {
  // Try to get anonymous ID from Segment cookie
  const anonId = cookieStore.get("ajs_anonymous_id")?.value;

  if (anonId) {
    try {
      // Segment stores the ID in quotes, so we need to parse it
      const parsed = JSON.parse(anonId);
      return {
        deviceId: parsed,
        userId: undefined,
      };
    } catch {
      // If parsing fails, use it directly
      return {
        deviceId: anonId.replace(/"/g, ""),
        userId: undefined,
      };
    }
  }

  // Fallback: generate new device ID
  return { deviceId: randomUUID() };
}

export async function fetchExperimentVariants(userIdOverride?: string) {
  const client = getExperimentClient();

  if (!client) {
    return {};
  }

  const cookieStore = await cookies();
  const { deviceId, userId } = await getSegmentIds(cookieStore);

  const user = {
    user_id: userIdOverride || userId,
    device_id: deviceId,
  };

  try {
    const variants = await client.fetchV2(user);
    return variants;
  } catch (error) {
    console.error("Failed to fetch experiment variants:", error);
    return {};
  }
}

export async function getVariant(flagKey: string, userId?: string) {
  const variants = await fetchExperimentVariants(userId);
  return variants[flagKey];
}

export async function isFeatureEnabled(
  flagKey: string,
  userId?: string,
): Promise<boolean> {
  const variant = await getVariant(flagKey, userId);
  const value = variant?.value;
  return value === "on" || value === "true" || value === "enabled";
}

export function shutdownExperimentClient() {
  if (experimentClient) {
    experimentClient = null;
  }
}
