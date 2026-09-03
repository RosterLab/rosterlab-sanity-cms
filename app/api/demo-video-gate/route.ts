import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitWebsiteLead } from "@/lib/leads/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

const demoVideoGateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
  industry: z.string().min(1),
  lookingFor: z.array(z.string()).min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = demoVideoGateSchema.parse(body);
    const [firstName, ...lastName] = validatedData.name.trim().split(/\s+/);
    const result = await submitWebsiteLead({
      source: "demo-video",
      email: validatedData.email,
      firstName,
      lastName: lastName.join(" "),
      detectedCountry: detectRequestCountry(request),
      metadata: {
        industry: validatedData.industry,
        role: validatedData.role,
        lookingFor: validatedData.lookingFor,
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
