import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitAttioLead } from "@/lib/attio/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

const conversionPointSchema = z.object({
  firstname: z.string().max(100).optional().default(""),
  lastname: z.string().max(100).optional().default(""),
  email: z.string().email(),
  company: z.string().max(200).optional().default(""),
  conversion_point: z.enum(["FTE calculator", "ROI Calculator"]),
});

export async function POST(request: NextRequest) {
  try {
    const data = conversionPointSchema.parse(await request.json());
    const result = await submitAttioLead({
      source:
        data.conversion_point === "FTE calculator"
          ? "calculator-fte"
          : "calculator-roi",
      email: data.email,
      firstName: data.firstname || undefined,
      lastName: data.lastname || undefined,
      company: data.company || undefined,
      detectedCountry: detectRequestCountry(request),
      metadata: { conversionPoint: data.conversion_point },
    });

    // Calculator downloads remain available if CRM delivery is unavailable.
    return NextResponse.json({ status: result.status }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Conversion point submission failed", error);
    return NextResponse.json({ error: "Unable to submit" }, { status: 500 });
  }
}
