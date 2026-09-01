const ATTIO_BASE = "https://api.attio.com/v2";

export interface UpsertPersonInput {
  email: string;
  // Full name as typed by the user; split into first/last for Attio's
  // `personal-name` attribute.
  name?: string;
  // Title of a `conversion_point` select option. The attribute is a
  // multiselect, so this is merged into any values already on the record.
  conversionPoint?: string;
  // When set, a note with this title/body is attached to the person.
  noteTitle?: string;
  noteBody?: string;
}

export type UpsertPersonResult =
  | { status: "skipped"; reason: "no_token" }
  | { status: "created"; recordId: string }
  | { status: "updated"; recordId: string }
  | { status: "error"; detail: unknown };

type AttioRecord = {
  id?: { record_id?: string };
  values?: Record<string, Array<Record<string, unknown>>>;
};

// Attio stores a personal name as three parts. We only ever get one free-text
// field from the form, so treat the first token as the first name and the
// remainder as the last name.
function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return {
    first_name: parts[0] ?? "",
    last_name: parts.slice(1).join(" "),
    full_name: name.trim(),
  };
}

// Existing multiselect values come back as objects; pull out the option titles
// so we can merge rather than overwrite.
function existingConversionPoints(record: AttioRecord): string[] {
  const values = record.values?.conversion_point ?? [];
  return values
    .map((v) => {
      const option = v.option as { title?: string } | undefined;
      return option?.title;
    })
    .filter((title): title is string => Boolean(title));
}

// Creates an Attio person, or updates them if the email already exists,
// merging `conversion_point` without dropping values already on the record.
// Never throws — callers can fire-and-forget without risking their own request.
export async function upsertAttioPerson(
  input: UpsertPersonInput,
): Promise<UpsertPersonResult> {
  const { email, name, conversionPoint, noteTitle, noteBody } = input;
  const token = process.env.ATTIO_API_KEY;

  if (!token) {
    console.error("❌ Attio API key not configured!");
    console.error("   Expected environment variable: ATTIO_API_KEY");
    console.error("   Contact will NOT be synced to Attio");
    return { status: "skipped", reason: "no_token" };
  }

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    // 1. Look for an existing person by email.
    const queryResponse = await fetch(
      `${ATTIO_BASE}/objects/people/records/query`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          filter: { email_addresses: { email_address: email } },
          limit: 1,
        }),
      },
    );

    const queryData = await queryResponse.json();

    if (!queryResponse.ok) {
      console.error("❌ Attio person lookup failed:", queryData);
      return { status: "error", detail: queryData };
    }

    const existing: AttioRecord | undefined = queryData?.data?.[0];
    const recordId = existing?.id?.record_id;

    // 2a. Existing person — patch the fields, merging conversion points so we
    // never clear a label another tool set.
    if (recordId) {
      const merged = Array.from(
        new Set([
          ...existingConversionPoints(existing),
          ...(conversionPoint ? [conversionPoint] : []),
        ]),
      );

      const values: Record<string, unknown> = {};
      if (name) values.name = [splitName(name)];
      if (merged.length) values.conversion_point = merged;

      if (Object.keys(values).length) {
        const patchResponse = await fetch(
          `${ATTIO_BASE}/objects/people/records/${recordId}`,
          {
            method: "PATCH",
            headers: authHeaders,
            body: JSON.stringify({ data: { values } }),
          },
        );

        if (!patchResponse.ok) {
          const patchData = await patchResponse.json();
          console.error("❌ Attio person update failed:", patchData);
          return { status: "error", detail: patchData };
        }
      }

      await attachNote(recordId, authHeaders, noteTitle, noteBody);
      console.log("✅ Updated person in Attio:", email);
      return { status: "updated", recordId };
    }

    // 2b. New person — create the record.
    const values: Record<string, unknown> = {
      email_addresses: [email],
    };
    if (name) values.name = [splitName(name)];
    if (conversionPoint) values.conversion_point = [conversionPoint];

    const createResponse = await fetch(`${ATTIO_BASE}/objects/people/records`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ data: { values } }),
    });

    const createData = await createResponse.json();

    if (!createResponse.ok) {
      console.error("❌ Attio person creation failed:", createData);
      return { status: "error", detail: createData };
    }

    const newRecordId: string = createData?.data?.id?.record_id;
    await attachNote(newRecordId, authHeaders, noteTitle, noteBody);
    console.log("✅ Created person in Attio:", email);
    return { status: "created", recordId: newRecordId };
  } catch (error) {
    console.error("❌ Attio sync threw:", error);
    return { status: "error", detail: error };
  }
}

// A failed note must not fail the whole sync — the contact still matters more.
async function attachNote(
  recordId: string | undefined,
  authHeaders: Record<string, string>,
  title?: string,
  content?: string,
) {
  if (!recordId || !content) return;

  try {
    const response = await fetch(`${ATTIO_BASE}/notes`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        data: {
          parent_object: "people",
          parent_record_id: recordId,
          title: title || "Note",
          format: "plaintext",
          content,
        },
      }),
    });

    if (!response.ok) {
      console.error("❌ Attio note creation failed:", await response.json());
    }
  } catch (error) {
    console.error("❌ Attio note creation threw:", error);
  }
}
