const DEFAULT_TIMEOUT_MS = 8_000;

/** Attio's object form for a personal-name attribute. */
export interface AttioPersonalName {
  first_name: string;
  last_name: string;
  full_name: string;
}

/**
 * A value in the shape Attio expects for one People attribute. Multi-value
 * attributes take an array; single-value ones accept either form.
 */
export type AttioAttributeValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | AttioPersonalName
  | AttioPersonalName[];

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
  /**
   * Form answers that map onto a CRM attribute, flat so an Attio workflow step
   * can read them without traversing `metadata`.
   */
  industry?: string;
  referralSource?: string;
  rosterSize?: string;
  metadata?: Record<string, string | number | boolean | string[] | null>;
  /**
   * People attributes keyed by their Attio `api_slug`, already in Attio's own
   * value shapes. Forms that map cleanly onto record attributes send this so
   * the workflow can write each answer through without a translation step.
   */
  attioPerson?: Record<string, AttioAttributeValue>;
  submittedAt?: string;
}

export interface AttioSubmissionOptions {
  /**
   * Workflow webhook to post to, for forms that have their own workflow.
   * Defaults to `ATTIO_LEAD_WEBHOOK_URL`.
   */
  webhookUrl?: string;
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
  options: AttioSubmissionOptions = {},
): Promise<AttioSubmissionResult> {
  const webhookUrl =
    options.webhookUrl?.trim() || process.env.ATTIO_LEAD_WEBHOOK_URL?.trim();
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
