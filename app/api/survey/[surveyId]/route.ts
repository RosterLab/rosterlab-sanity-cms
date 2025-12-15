/**
 * GET /api/survey/[surveyId]
 * Fetches survey configuration (public endpoint)
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import { validateSurveyId } from "@/lib/survey/validation";
import { ZodError } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> },
) {
  try {
    const { surveyId: rawSurveyId } = await params;

    // Validate survey ID
    const surveyId = validateSurveyId(rawSurveyId);

    // Get database client
    const sql = getDbClient();

    // Fetch survey (excluding admin_token for security)
    const result = await sql`
      SELECT id, title, org_name, config, created_at, updated_at
      FROM surveys
      WHERE id = ${surveyId}
    `;

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    const survey = result[0];

    return NextResponse.json(survey, { status: 200 });
  } catch (error) {
    console.error("Error fetching survey:", error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid survey ID",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Failed to fetch survey",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
