import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";
import { LEAD_SOURCES, mustRecordLead } from "@/lib/leads/sources";

const metadataValue = z.union([
  z.string().max(2_000),
  z.number().finite(),
  z.boolean(),
  z.array(z.string().max(200)).max(20),
  z.null(),
]);

const leadSchema = z.object({
  source: z.enum(LEAD_SOURCES),
  email: z.string().trim().email().max(254),
  firstName: z.string().trim().max(100).optional().default(""),
  lastName: z.string().trim().max(100).optional().default(""),
  name: z.string().trim().max(200).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(5_000).optional().default(""),
  pageUrl: z.string().url().max(2_048).optional(),
  metadata: z.record(z.string().max(100), metadataValue).optional(),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const input = leadSchema.parse(await request.json());

    // Honeypot: make bots believe the submission succeeded without forwarding it.
    if (input.website) {
      return NextResponse.json({ message: "Submitted", attio: "filtered" });
    }

    const result = await submitAttioLead({
      source: input.source,
      email: input.email,
      firstName: input.firstName || undefined,
      lastName: input.lastName || undefined,
      name:
        input.name ||
        [input.firstName, input.lastName].filter(Boolean).join(" ") ||
        undefined,
      company: input.company || undefined,
      phone: input.phone || undefined,
      message: input.message || undefined,
      pageUrl: input.pageUrl,
      metadata: input.metadata,
      detectedCountry: detectRequestCountry(request),
    });

    if (mustRecordLead(input.source) && result.status !== "submitted") {
      return NextResponse.json(
        { error: "Unable to submit right now", attio: result.status },
        { status: result.status === "skipped" ? 503 : 502 },
      );
    }

    return NextResponse.json({ message: "Submitted", attio: result.status });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Lead submission failed", error);
    return NextResponse.json({ error: "Unable to submit" }, { status: 500 });
  }
}
