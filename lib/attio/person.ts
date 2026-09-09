import type { AttioAttributeValue } from "./submitLead";

const ASSERT_PERSON_URL =
  "https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses";
const DEFAULT_TIMEOUT_MS = 8_000;

export type AttioPersonResult =
  | { status: "updated" }
  | { status: "skipped"; reason: "no_api_key" }
  | { status: "error"; detail: string };

/**
 * Creates or updates a Person, matching on email address.
 *
 * Workflows own the notification side of a submission, but a workflow's field
 * mappings can only be edited in the Attio UI — so form answers that belong on
 * the record are written here instead, where they are covered by tests and
 * change with the form. No-ops without an Attio API token; the webhook still
 * reaches sales either way.
 *
 * `values` are keyed by People `api_slug`, in Attio's own value shapes.
 */
export async function assertAttioPerson(
  values: Record<string, AttioAttributeValue>,
): Promise<AttioPersonResult> {
  // `ATTIO_API_TOKEN` is the name the automation service already uses for this
  // credential; `ATTIO_API_KEY` is accepted so either spelling works.
  const apiKey =
    process.env.ATTIO_API_TOKEN?.trim() || process.env.ATTIO_API_KEY?.trim();
  if (!apiKey) {
    return { status: "skipped", reason: "no_api_key" };
  }

  try {
    const response = await fetch(ASSERT_PERSON_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { values } }),
      cache: "no-store",
      signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 500);
      console.error("Attio person update failed", response.status, detail);
      return {
        status: "error",
        detail: `Attio API returned ${response.status}`,
      };
    }

    return { status: "updated" };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("Attio person update failed", detail);
    return { status: "error", detail };
  }
}
