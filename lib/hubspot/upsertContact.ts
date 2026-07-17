const HUBSPOT_BASE = "https://api.hubapi.com/crm/v3/objects";

export interface UpsertContactInput {
  email: string;
  // Label appended to the contact's multi-select `conversion_point` property.
  conversionPoint?: string;
  // Any additional HubSpot contact properties (e.g. company, firstname, jobtitle).
  properties?: Record<string, string>;
  // When set, a note with this body is added to the contact's timeline.
  noteBody?: string;
}

export type UpsertContactResult =
  | { status: "skipped"; reason: "no_token" }
  | { status: "created"; contactId?: string }
  | { status: "updated"; contactId: string }
  | { status: "error"; detail: unknown };

// Creates a HubSpot contact, or updates it if the email already exists,
// merging `conversion_point` without duplicating values. Never throws —
// callers can fire-and-forget without risking their own request.
export async function upsertHubSpotContact(
  input: UpsertContactInput,
): Promise<UpsertContactResult> {
  const { email, conversionPoint, properties = {}, noteBody } = input;
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    console.error("❌ CRITICAL: HubSpot access token not configured!");
    console.error("   Expected environment variable: HUBSPOT_ACCESS_TOKEN");
    console.error("   Contact will NOT be synced to HubSpot");
    return { status: "skipped", reason: "no_token" };
  }

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const contactProperties: Record<string, string> = {
    email,
    hs_lead_status: "NEW",
    lifecyclestage: "lead",
    ...properties,
    ...(conversionPoint ? { conversion_point: conversionPoint } : {}),
  };

  try {
    const createResponse = await fetch(`${HUBSPOT_BASE}/contacts`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ properties: contactProperties }),
    });

    const createData = await createResponse.json();

    if (createResponse.ok) {
      console.log("✅ Successfully created contact in HubSpot:", email);
      return { status: "created", contactId: createData?.id };
    }

    if (createResponse.status !== 409) {
      console.error("❌ HubSpot API error:", {
        status: createResponse.status,
        statusText: createResponse.statusText,
        error: createData,
      });
      return { status: "error", detail: createData };
    }

    // 409 → contact already exists. Look it up and merge.
    console.log("⚠️ Contact already exists, updating...");

    const searchResponse = await fetch(`${HUBSPOT_BASE}/contacts/search`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: email }],
          },
        ],
        properties: ["conversion_point"],
      }),
    });

    const searchData = await searchResponse.json();

    if (!searchData.results?.length) {
      return { status: "error", detail: "Contact not found after 409" };
    }

    const contactId: string = searchData.results[0].id;
    const existing: string | undefined =
      searchData.results[0].properties.conversion_point;

    const mergedConversionPoint = mergeConversionPoint(
      existing,
      conversionPoint,
    );

    const updateResponse = await fetch(
      `${HUBSPOT_BASE}/contacts/${contactId}`,
      {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          properties: {
            ...properties,
            ...(mergedConversionPoint
              ? { conversion_point: mergedConversionPoint }
              : {}),
          },
        }),
      },
    );

    if (!updateResponse.ok) {
      const updateError = await updateResponse.json();
      console.error("❌ Failed to update contact:", {
        status: updateResponse.status,
        error: updateError,
      });
      return { status: "error", detail: updateError };
    }
    console.log("✅ Contact updated successfully:", contactId);

    if (noteBody) {
      await addContactNote(authHeaders, contactId, noteBody);
    }

    return { status: "updated", contactId };
  } catch (error) {
    console.error("❌ Error syncing contact to HubSpot:", error);
    return { status: "error", detail: error };
  }
}

// Appends `next` to a `;`-separated multi-select value, avoiding duplicates.
function mergeConversionPoint(
  existing: string | undefined,
  next: string | undefined,
): string | undefined {
  if (!next) return existing;
  if (!existing) return next;

  const points = existing.split(";").map((p) => p.trim());
  if (points.includes(next)) return existing;
  return [...points, next].join(";");
}

async function addContactNote(
  authHeaders: Record<string, string>,
  contactId: string,
  body: string,
): Promise<void> {
  const response = await fetch(`${HUBSPOT_BASE}/notes`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().getTime(),
        hs_note_body: body,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 202, // Note to Contact
            },
          ],
        },
      ],
    }),
  });

  if (response.ok) {
    console.log("✅ Activity logged successfully");
  } else {
    console.error("❌ Failed to create note:", await response.json());
  }
}
