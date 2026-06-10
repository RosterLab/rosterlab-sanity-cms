import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    return NextResponse.json(
      { message: "Form submitted successfully", data: validatedData },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
