import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitWebsiteLead } from "@/lib/leads/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

const CONVERSION_POINT = "Roster Analysis Report";

const rosterAnalysisLeadSchema = z.object({
  email: z.string().email(),
  organisationName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, organisationName } = rosterAnalysisLeadSchema.parse(body);

    const result = await submitWebsiteLead({
      source: "roster-analysis",
      email,
      company: organisationName || undefined,
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
