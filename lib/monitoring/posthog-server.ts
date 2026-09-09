import "server-only";

import { PostHog } from "posthog-node";

type ErrorContext = Record<
  string,
  string | number | boolean | null | undefined
>;

let client: PostHog | null | undefined;

function getClient(): PostHog | null {
  if (client !== undefined) return client;

  const token =
    process.env.POSTHOG_PROJECT_TOKEN ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) {
    client = null;
    return client;
  }

  client = new PostHog(token, {
    host:
      process.env.POSTHOG_HOST ||
      process.env.NEXT_PUBLIC_POSTHOG_HOST ||
      "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

export async function captureServerException(
  error: unknown,
  context: ErrorContext = {},
): Promise<void> {
  try {
    const posthog = getClient();
    if (!posthog) return;
    await posthog.captureExceptionImmediate(error, "marketing-website-server", {
      ...context,
      service: "marketing-website",
      environment: process.env.CONTEXT || process.env.NODE_ENV || "development",
      release: process.env.COMMIT_REF,
      $process_person_profile: false,
    });
  } catch (monitoringError) {
    console.error("[PostHog] Server error reporting failed", monitoringError);
  }
}
