/**
 * POST /api/survey/[surveyId]/balance
 * Runs the balancing algorithm and returns assignments
 * Requires admin token
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import { validateAdminToken, validateSurveyId } from "@/lib/survey/validation";
import { balanceHolidayAssignments } from "@/lib/survey/balancer";
import type {
  Survey,
  SurveyParticipant,
  SurveyResponse,
  BalancingResult,
} from "@/lib/survey/types";
import { ZodError } from "zod";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> },
) {
  try {
    const { surveyId } = await params;

    // Validate survey ID
    validateSurveyId(surveyId);

    // Get admin token from query params or body
    const url = new URL(request.url);
    const tokenFromQuery = url.searchParams.get("token");
    const body = tokenFromQuery ? null : await request.json();
    const tokenFromBody = body?.token;
    const adminToken = tokenFromQuery || tokenFromBody;

    if (!adminToken) {
      return NextResponse.json(
        { error: "Admin token is required" },
        { status: 401 },
      );
    }

    validateAdminToken(adminToken);

    // Get database client
    const sql = getDbClient();

    // Fetch survey
    const surveyResult = await sql`
      SELECT id, title, org_name, config, admin_token, created_at, updated_at
      FROM surveys
      WHERE id = ${surveyId}
    `;

    if (!surveyResult || surveyResult.length === 0) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    const survey = surveyResult[0] as Survey;

    // Verify admin token
    if (survey.admin_token !== adminToken) {
      return NextResponse.json(
        { error: "Invalid admin token" },
        { status: 403 },
      );
    }

    // Fetch participants
    const participantsResult = await sql`
      SELECT id, survey_id, name, email, submitted_at
      FROM survey_participants
      WHERE survey_id = ${surveyId}
    `;

    const participants = participantsResult as SurveyParticipant[];

    if (participants.length === 0) {
      return NextResponse.json(
        {
          error: "No participants have submitted preferences yet",
          message:
            "At least one staff member must submit preferences before balancing",
        },
        { status: 400 },
      );
    }

    // Fetch responses
    const responsesResult = await sql`
      SELECT id, participant_id, preference_type, preference_data, created_at
      FROM survey_responses
      WHERE participant_id = ANY(${participants.map((p) => p.id)})
    `;

    const responses = responsesResult as SurveyResponse[];

    // Run balancing algorithm
    const balancingResult: BalancingResult = balanceHolidayAssignments(
      survey,
      participants,
      responses,
    );

    return NextResponse.json(balancingResult, { status: 200 });
  } catch (error) {
    console.error("Error balancing survey:", error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Failed to balance survey",
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
