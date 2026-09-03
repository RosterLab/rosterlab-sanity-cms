const DEFAULT_TIMEOUT_MS = 8_000;

export interface AttioLeadSubmission {
  source: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  detectedCountry?: string | null;
  pageUrl?: string;
  metadata?: Record<string, string | number | boolean | string[] | null>;
  submittedAt?: string;
}

export type AttioSubmissionResult =
  | { status: "submitted" }
  | { status: "skipped"; reason: "no_webhook" }
  | { status: "error"; detail: string };

/**
 * Sends a normalized lead event to an Attio Webhook received workflow.
 * The webhook URL is intentionally server-only; Attio owns record upserts,
 * list membership, qualification, task creation, and notifications.
 */
export async function submitAttioLead(
  submission: AttioLeadSubmission,
): Promise<AttioSubmissionResult> {
  const webhookUrl = process.env.ATTIO_LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    console.error("ATTIO_LEAD_WEBHOOK_URL is not configured");
    return { status: "skipped", reason: "no_webhook" };
  }

  try {
    const parsedUrl = new URL(webhookUrl);
    if (
      process.env.NODE_ENV === "production" &&
      parsedUrl.protocol !== "https:"
    ) {
      return { status: "error", detail: "Attio webhook must use HTTPS" };
    }

    const response = await fetch(parsedUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...submission,
        submittedAt: submission.submittedAt ?? new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      console.error("Attio lead webhook failed", response.status, detail);
      return {
        status: "error",
        detail: `Attio webhook returned ${response.status}`,
      };
    }

    return { status: "submitted" };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("Attio lead webhook failed", detail);
    return { status: "error", detail };
  }
}
