/**
 * GET /api/survey/[surveyId]/results
 * Fetch survey results (requires admin token)
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import { validateSurveyId, validateAdminToken } from "@/lib/survey/validation";
import type {
  SurveyResultsResponse,
  SurveyStats,
  SurveyParticipant,
} from "@/lib/survey/types";
import { ZodError } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> },
) {
  try {
    const { surveyId: rawSurveyId } = await params;

    // Validate survey ID
    const surveyId = validateSurveyId(rawSurveyId);

    // Get and validate admin token from query params
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Admin token required" },
        { status: 401 },
      );
    }

    const adminToken = validateAdminToken(token);

    // Get database client
    const sql = getDbClient();

    // Verify admin token matches survey
    const surveyCheck = await sql`
      SELECT id, title, org_name, config, created_at, updated_at
      FROM surveys
      WHERE id = ${surveyId} AND admin_token = ${adminToken}
    `;

    if (!surveyCheck || surveyCheck.length === 0) {
      return NextResponse.json(
        { error: "Unauthorized or survey not found" },
        { status: 403 },
      );
    }

    const survey = surveyCheck[0];

    // Fetch all participants
    const participants = await sql`
      SELECT id, survey_id, name, email, submitted_at
      FROM survey_participants
      WHERE survey_id = ${surveyId}
      ORDER BY submitted_at DESC
    `;

    // Fetch all responses with participant info
    const responses = await sql`
      SELECT
        sr.id,
        sr.participant_id,
        sr.preference_type,
        sr.preference_data,
        sr.created_at,
        sp.name as participant_name,
        sp.email as participant_email,
        sp.submitted_at as participant_submitted_at
      FROM survey_responses sr
      JOIN survey_participants sp ON sr.participant_id = sp.id
      WHERE sp.survey_id = ${surveyId}
      ORDER BY sp.submitted_at DESC, sr.created_at ASC
    `;

    // Format responses to include participant info
    const formattedResponses = responses.map((r: any) => ({
      id: r.id,
      participant_id: r.participant_id,
      preference_type: r.preference_type,
      preference_data: r.preference_data,
      created_at: r.created_at,
      participant: {
        id: r.participant_id,
        survey_id: surveyId,
        name: r.participant_name,
        email: r.participant_email,
        submitted_at: r.participant_submitted_at,
      },
    }));

    // Calculate statistics
    const totalParticipants = participants.length;
    const totalResponses = responses.length;
    const averagePreferencesPerParticipant =
      totalParticipants > 0 ? totalResponses / totalParticipants : 0;

    // Group submissions by date
    const submissionsByDate: { [key: string]: number } = {};
    participants.forEach((p: any) => {
      const date = new Date(p.submitted_at).toISOString().split("T")[0];
      submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
    });

    const submissionDates = Object.entries(submissionsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const stats: SurveyStats = {
      total_participants: totalParticipants,
      total_responses: totalResponses,
      completion_rate: totalParticipants > 0 ? 100 : 0, // Everyone who starts completes
      average_preferences_per_participant:
        Math.round(averagePreferencesPerParticipant * 10) / 10,
      submission_dates: submissionDates,
    };

    // Prepare response
    const response: SurveyResultsResponse = {
      survey: {
        id: survey.id,
        title: survey.title,
        org_name: survey.org_name,
        config: survey.config,
        created_at: survey.created_at,
        updated_at: survey.updated_at,
      },
      participants: participants as SurveyParticipant[],
      responses: formattedResponses,
      stats,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching survey results:", error);

    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Failed to fetch survey results",
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
