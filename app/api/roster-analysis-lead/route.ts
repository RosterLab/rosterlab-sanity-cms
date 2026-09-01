import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upsertHubSpotContact } from "@/lib/hubspot/upsertContact";
import { upsertAttioPerson } from "@/lib/attio/upsertPerson";

// Existing option on the Attio People `conversion_point` multiselect,
// shared with HubSpot so the funnel reports under one label.
const CONVERSION_POINT = "Roster Analysis Report";

const rosterAnalysisLeadSchema = z.object({
  email: z.string().email(),
  name: z.string().max(80).optional(),
  organisationName: z.string().optional(),
  specificFocus: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, organisationName, specificFocus } =
      rosterAnalysisLeadSchema.parse(body);

    const properties: Record<string, string> = {};
    if (organisationName) properties.company = organisationName;
    if (name) properties.firstname = name;

    const noteBody = `Organisation / team: ${
      organisationName || "N/A"
    }\n\nWants the analysis to focus on: ${specificFocus || "N/A"}`;

    // Both CRMs are synced in parallel; neither failure blocks the other.
    const [result, attioResult] = await Promise.all([
      upsertHubSpotContact({
        email,
        conversionPoint: CONVERSION_POINT,
        properties: Object.keys(properties).length ? properties : undefined,
        noteBody: `Contact submitted the Roster Analysis tool.\n\nDetails:\n- Name: ${
          name || "N/A"
        }\n- Organisation: ${
          organisationName || "N/A"
        }\n- Wants the analysis to focus on: ${specificFocus || "N/A"}`,
      }),
      upsertAttioPerson({
        email,
        name,
        conversionPoint: CONVERSION_POINT,
        noteTitle: "Roster analysis tool submission",
        noteBody,
      }),
    ]);

    // Always 200 — a HubSpot failure must not break the user's analysis.
    // The status is surfaced so the client can report it to analytics.
    return NextResponse.json(
      {
        message: "Lead captured successfully",
        hubspot: result.status,
        attio: attioResult.status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Roster analysis lead error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
