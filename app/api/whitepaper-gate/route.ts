import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const whitepaperGateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  industry: z.string().min(1),
  role: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = whitepaperGateSchema.parse(body);

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
