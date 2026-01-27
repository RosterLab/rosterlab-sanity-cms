/**
 * POST /api/survey/[surveyId]/submit
 * Submit staff preferences for a survey
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import {
  validateSurveyId,
  validateSubmitPreferencesRequest,
} from "@/lib/survey/validation";
import type { SubmitPreferencesResponse } from "@/lib/survey/types";
import { ZodError } from "zod";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> },
) {
  try {
    const { surveyId: rawSurveyId } = await params;

    // Validate survey ID
    const surveyId = validateSurveyId(rawSurveyId);

    // Parse and validate request body
    const body = await request.json();
    const validatedData = validateSubmitPreferencesRequest(body);

    // Get database client
    const sql = getDbClient();

    // Check if survey exists
    const surveyCheck = await sql`
      SELECT id, config FROM surveys WHERE id = ${surveyId}
    `;

    if (!surveyCheck || surveyCheck.length === 0) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    // Check if email already submitted (never allow multiple submissions)
    const existingSubmission = await sql`
      SELECT id, name, email, submitted_at FROM survey_participants
      WHERE survey_id = ${surveyId} AND email = ${validatedData.email}
    `;

    if (existingSubmission && existingSubmission.length > 0) {
      // Fetch their previous response to show them
      const previousResponse = await sql`
        SELECT preference_data, created_at FROM survey_responses
        WHERE participant_id = ${existingSubmission[0].id}
      `;

      return NextResponse.json(
        {
          error: "Already submitted",
          message: "You have already submitted preferences for this survey",
          previous_submission: {
            participant: existingSubmission[0],
            response: previousResponse[0] || null,
          },
        },
        { status: 409 },
      );
    }

    // Insert participant
    const participantResult = await sql`
      INSERT INTO survey_participants (survey_id, name, email)
      VALUES (${surveyId}, ${validatedData.name}, ${validatedData.email})
      RETURNING id
    `;

    if (!participantResult || participantResult.length === 0) {
      throw new Error("Failed to create participant");
    }

    const participantId = participantResult[0].id;

    // Insert holiday rankings
    await sql`
      INSERT INTO survey_responses (participant_id, preference_type, preference_data)
      VALUES (
        ${participantId},
        'holiday_rankings',
        ${JSON.stringify({
          holiday_rankings: validatedData.holiday_rankings,
          notes: validatedData.notes,
        })}
      )
    `;

    // Prepare response
    const response: SubmitPreferencesResponse = {
      success: true,
      participant_id: participantId,
      message: "Preferences submitted successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error submitting preferences:", error);

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
        error: "Failed to submit preferences",
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
