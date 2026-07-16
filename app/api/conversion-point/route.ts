import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// These strings must match the exact option values configured on the
// `conversion_point` contact property in HubSpot (case sensitive). Verify with:
//   GET https://api.hubapi.com/crm/v3/properties/contacts/conversion_point
const ALLOWED_CONVERSION_POINTS = [
  "FTE calculator",
  "ROI Calculator",
] as const;

const conversionPointSchema = z.object({
  firstname: z.string().max(100).optional().default(""),
  lastname: z.string().max(100).optional().default(""),
  email: z.string().email(),
  company: z.string().max(200).optional().default(""),
  conversion_point: z.enum(ALLOWED_CONVERSION_POINTS),
});

const HUBSPOT_API = "https://api.hubapi.com";

type HubSpotError = Error & {
  status?: number;
  hubspotBody?: string;
};

function toHsError(status: number, body: string, action: string): HubSpotError {
  const err = new Error(`HubSpot ${action} failed (${status}): ${body}`) as HubSpotError;
  err.status = status;
  err.hubspotBody = body;
  return err;
}

function isUnknownPropertyError(body: string): boolean {
  // HubSpot returns messages like:
  //   "Property values were not valid: ... \"name\":\"conversion_point\", ... \"error\":\"PROPERTY_DOESNT_EXIST\""
  return /PROPERTY_DOESNT_EXIST|does not exist|Property .* does not exist/i.test(
    body,
  ) && /conversion_point/i.test(body);
}

function isEnumOptionError(body: string): boolean {
  // Property exists but the value isn't in the dropdown enumeration.
  return /INVALID_OPTION|not one of the allowed values|Invalid input option/i.test(
    body,
  ) && /conversion_point/i.test(body);
}

async function findContactByEmail(email: string, token: string) {
  const res = await fetch(
    `${HUBSPOT_API}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=email,conversion_point`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw toHsError(res.status, await res.text(), "lookup");
  }
  return res.json();
}

async function createContact(props: Record<string, string>, token: string) {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties: props }),
  });
  if (!res.ok) {
    throw toHsError(res.status, await res.text(), "create");
  }
  return res.json();
}

async function updateContact(
  id: string,
  props: Record<string, string>,
  token: string,
) {
  const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties: props }),
  });
  if (!res.ok) {
    throw toHsError(res.status, await res.text(), "update");
  }
  return res.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = conversionPointSchema.parse(body);

    const token = process.env.HUBSPOT_ACCESS_TOKEN;
    if (!token) {
      console.error("HUBSPOT_ACCESS_TOKEN is not configured");
      return NextResponse.json(
        { error: "HubSpot integration is not configured" },
        { status: 500 },
      );
    }

    const buildProps = (includeConversionPoint: boolean) => {
      const props: Record<string, string> = { email: data.email };
      if (includeConversionPoint) props.conversion_point = data.conversion_point;
      if (data.firstname) props.firstname = data.firstname;
      if (data.lastname) props.lastname = data.lastname;
      if (data.company) props.company = data.company;
      return props;
    };

    const runUpsert = async (includeConversionPoint: boolean) => {
      const props = buildProps(includeConversionPoint);
      const existing = await findContactByEmail(data.email, token);
      if (existing?.id) {
        await updateContact(existing.id, props, token);
        return "updated" as const;
      }
      await createContact(props, token);
      return "created" as const;
    };

    try {
      const status = await runUpsert(true);
      return NextResponse.json({ status }, { status: 200 });
    } catch (error) {
      const hsErr = error as HubSpotError;
      const body = hsErr.hubspotBody ?? "";
      if (isUnknownPropertyError(body) || isEnumOptionError(body)) {
        console.warn(
          "conversion_point rejected by HubSpot; retrying without it:",
          body,
        );
        const status = await runUpsert(false);
        return NextResponse.json(
          {
            status,
            warning:
              "conversion_point was not saved because the HubSpot property is missing or does not accept this value.",
          },
          { status: 200 },
        );
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 },
      );
    }
    const err = error as HubSpotError;
    const status = err.status && err.status >= 400 && err.status < 500 ? 400 : 500;
    console.error("conversion-point error:", err.message);
    return NextResponse.json(
      {
        error: "HubSpot request failed",
        detail: err.message,
      },
      { status },
    );
  }
}
