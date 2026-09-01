import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";
import { evaluateMarketAccess } from "@/lib/market-access/policy";

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().min(2).max(160),
  organizationCountry: z.string().trim().min(2).max(120),
  rosteredStaff: z.coerce.number().int().positive().max(1_000_000),
  fundingAvailable: z.enum(["yes", "no", "unsure"]),
  details: z.string().trim().max(2000).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const input = reviewSchema.parse(await request.json());
    const detectedCountry = detectRequestCountry(request);
    const decision = evaluateMarketAccess(detectedCountry);
    const funded = input.fundingAvailable === "yes";
    const [firstName, ...lastNameParts] = input.name.split(/\s+/);
    const attio = await submitAttioLead({
      source: "commercial-review",
      email: input.email,
      firstName,
      lastName: lastNameParts.join(" "),
      name: input.name,
      company: input.organization,
      message: input.details || undefined,
      detectedCountry,
      metadata: {
        organizationCountry: input.organizationCountry,
        rosteredStaff: input.rosteredStaff,
        fundingAvailable: input.fundingAvailable,
        estimatedAnnualValueUsd: input.rosteredStaff * 20 * 12,
        policyVersion: decision.policyVersion,
        demoDecision: decision.demo,
        reviewPriority: funded ? "sales_review" : "nurture",
      },
    });

    if (attio.status === "error") {
      return NextResponse.json(
        { error: "Unable to submit the request" },
        { status: 502 },
      );
    }
    if (attio.status === "skipped" && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Commercial review is not configured" },
        { status: 503 },
      );
    }

    return NextResponse.json({
      message: "Request submitted",
      reviewPriority: funded ? "sales_review" : "nurture",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Commercial review request failed", error);
    return NextResponse.json({ error: "Unable to submit" }, { status: 500 });
  }
}
