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

async function getAmplitudeIds(
  cookieStore: ReadonlyRequestCookies,
): Promise<{ deviceId: string; userId?: string }> {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  const ampCookieName = apiKey ? `AMP_${apiKey.substring(0, 10)}` : null;

  if (ampCookieName) {
    const ampCookie = cookieStore.get(ampCookieName)?.value;
    if (ampCookie) {
      try {
        // Decode Base64, then URL decode
        const base64Decoded = Buffer.from(ampCookie, "base64").toString(
          "utf-8",
        );
        const decoded = decodeURIComponent(base64Decoded);
        const data = JSON.parse(decoded);

        if (data.deviceId) {
          return {
            deviceId: data.deviceId,
            userId: data.userId || undefined,
          };
        }
      } catch {
        // Fall through to generate new ID
      }
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
  const { deviceId, userId } = await getAmplitudeIds(cookieStore);

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
