import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { submitWebsiteLead } from "@/lib/leads/submitLead";
import { detectRequestCountry } from "@/lib/market-access/geo";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = contactSchema.parse(body);
    const [firstName, ...lastName] = data.name.trim().split(/\s+/);
    const result = await submitWebsiteLead({
      source: "contact",
      email: data.email,
      firstName,
      lastName: lastName.join(" "),
      company: data.company,
      phone: data.phone,
      message: data.message,
      detectedCountry: detectRequestCountry(request),
    });

    if (result.status !== "submitted") {
      console.error("Required contact lead was not accepted", {
        delivery: result.delivery,
        result: result.status,
      });
      return NextResponse.json(
        { error: "Unable to submit right now", attio: result.status },
        { status: result.status === "skipped" ? 503 : 502 },
      );
    }

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);

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
