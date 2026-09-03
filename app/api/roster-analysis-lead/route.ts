import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

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

    // Attio stores names split; the form collects a single free-text field.
    const [firstName, ...lastName] = (name ?? "").trim().split(/\s+/);

    const result = await submitAttioLead({
      source: "roster-analysis",
      email,
      firstName: firstName || undefined,
      lastName: lastName.length ? lastName.join(" ") : undefined,
      company: organisationName || undefined,
      // What the user asked the report to focus on, in their own words.
      message: specificFocus || undefined,
      detectedCountry: detectRequestCountry(request),
      metadata: { conversionPoint: CONVERSION_POINT },
    });

    // Always 200 — a CRM failure must not break the user's analysis.
    // The status is surfaced so the client can report it to analytics.
    return NextResponse.json(
      { message: "Lead captured successfully", attio: result.status },
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
