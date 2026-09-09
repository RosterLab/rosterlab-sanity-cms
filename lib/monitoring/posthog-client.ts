"use client";

import posthog from "posthog-js";

type ErrorContext = Record<
  string,
  string | number | boolean | null | undefined
>;

export function captureClientException(
  error: unknown,
  context: ErrorContext = {},
): void {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;
  try {
    posthog.captureException(error, {
      ...context,
      service: "marketing-website",
      environment: process.env.NODE_ENV,
      $process_person_profile: false,
    });
  } catch {
    // Monitoring must never interfere with the site's own error handling.
  }
}
