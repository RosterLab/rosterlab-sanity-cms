import * as Sentry from "@sentry/node";

type LeadErrorContext = Record<
  string,
  string | number | boolean | null | undefined
>;

let initialized = false;

function initializeSentry(): boolean {
  const dsn = process.env.SENTRY_DSN?.trim();
  if (!dsn) return false;
  if (!initialized) {
    Sentry.init({
      dsn,
      environment: process.env.CONTEXT || process.env.NODE_ENV || "development",
      release: process.env.COMMIT_REF,
      sendDefaultPii: false,
      tracesSampleRate: 0,
    });
    initialized = true;
  }
  return true;
}

export async function reportLeadError(
  error: unknown,
  context: LeadErrorContext,
): Promise<void> {
  try {
    if (!initializeSentry()) return;
    Sentry.withScope((scope) => {
      scope.setTag("service", "marketing-website");
      scope.setTag("subsystem", "website-leads");
      for (const [key, value] of Object.entries(context)) {
        if (value !== undefined && value !== null) scope.setExtra(key, value);
      }
      Sentry.captureException(
        error instanceof Error ? error : new Error(String(error)),
      );
    });
    await Sentry.flush(2_000);
  } catch (monitoringError) {
    console.error("Lead error reporting failed", monitoringError);
  }
}
