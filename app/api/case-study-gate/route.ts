import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

const caseStudyGateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  industry: z.string().min(1),
  role: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = caseStudyGateSchema.parse(body);
    const [firstName, ...lastName] = validatedData.name.trim().split(/\s+/);
    const result = await submitAttioLead({
      source: "case-study",
      email: validatedData.email,
      firstName,
      lastName: lastName.join(" "),
      company: validatedData.company,
      detectedCountry: detectRequestCountry(request),
      metadata: {
        industry: validatedData.industry,
        role: validatedData.role,
      },
    });

    return NextResponse.json(
      { message: "Form submitted successfully", attio: result.status },
      { status: 200 },
    );
  } catch (error) {
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
