import { randomUUID } from "node:crypto";
import {
  type AttioLeadSubmission,
  submitAttioLead,
} from "@/lib/attio/submitLead";

const DEFAULT_TIMEOUT_MS = 8_000;

export type LeadDeliveryResult =
  | {
      status: "submitted";
      delivery: "queue" | "direct";
      submissionId?: string;
    }
  | {
      status: "skipped";
      delivery: "queue" | "direct";
      reason: "no_queue" | "no_webhook";
    }
  | {
      status: "error";
      delivery: "queue" | "direct";
      detail: string;
      submissionId?: string;
    };

async function enqueueLead(
  submission: AttioLeadSubmission,
): Promise<LeadDeliveryResult> {
  const intakeUrl = process.env.WEBSITE_LEAD_INGEST_URL?.trim();
  const token = process.env.WEBSITE_LEAD_INGEST_TOKEN?.trim();
  if (!intakeUrl || !token) {
    console.error("Website lead intake is not configured");
    return { status: "skipped", delivery: "queue", reason: "no_queue" };
  }

  const submissionId = randomUUID();
  try {
    const parsedUrl = new URL(intakeUrl);
    if (
      process.env.NODE_ENV === "production" &&
      parsedUrl.protocol !== "https:"
    ) {
      return {
        status: "error",
        delivery: "queue",
        submissionId,
        detail: "Website lead intake must use HTTPS",
      };
    }

    const response = await fetch(parsedUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submissionId,
        ...submission,
        submittedAt: submission.submittedAt ?? new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    });
    if (!response.ok) {
      return {
        status: "error",
        delivery: "queue",
        submissionId,
        detail: `Website lead intake returned ${response.status}`,
      };
    }

    const body = (await response.json().catch(() => null)) as {
      accepted?: boolean;
    } | null;
    if (!body?.accepted) {
      return {
        status: "error",
        delivery: "queue",
        submissionId,
        detail: "Website lead intake did not confirm durable acceptance",
      };
    }
    return { status: "submitted", delivery: "queue", submissionId };
  } catch (error) {
    return {
      status: "error",
      delivery: "queue",
      submissionId,
      detail: error instanceof Error ? error.message : "Unknown intake error",
    };
  }
}

export async function submitWebsiteLead(
  submission: AttioLeadSubmission,
): Promise<LeadDeliveryResult> {
  if (process.env.LEAD_DELIVERY_MODE === "queue") {
    return enqueueLead(submission);
  }

  const result = await submitAttioLead(submission);
  if (result.status === "submitted") {
    return { status: "submitted", delivery: "direct" };
  }
  if (result.status === "skipped") {
    return { ...result, delivery: "direct" };
  }
  return { ...result, delivery: "direct" };
}
