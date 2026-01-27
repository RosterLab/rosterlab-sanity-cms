/**
 * POST /api/survey/create
 * Creates a new survey and returns admin/staff URLs
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import { validateCreateSurveyRequest } from "@/lib/survey/validation";
import type { CreateSurveyResponse } from "@/lib/survey/types";
import { ZodError } from "zod";
import { notifyTeamsSurveyCreated } from "@/lib/notifications/teams";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = validateCreateSurveyRequest(body);

    // Get database client
    const sql = getDbClient();

    // Prepare survey config (simplified for holidays)
    const config = {
      holidays: validatedData.holidays,
    };

    // Insert survey into database
    const result = await sql`
      INSERT INTO surveys (title, org_name, config)
      VALUES (
        ${validatedData.title},
        ${validatedData.org_name},
        ${JSON.stringify(config)}
      )
      RETURNING id, admin_token
    `;

    if (!result || result.length === 0) {
      throw new Error("Failed to create survey");
    }

    const survey = result[0];
    const surveyId = survey.id;
    const adminToken = survey.admin_token;

    // Construct URLs - use request headers to get the actual host
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http://" : "https://";
    const fullBaseUrl = `${protocol}${host}`;

    const staffUrl = `${fullBaseUrl}/tools/survey-preferences/s/${surveyId}`;
    const adminUrl = `${fullBaseUrl}/tools/survey-preferences/admin/${surveyId}?token=${adminToken}`;

    // Prepare response
    const response: CreateSurveyResponse = {
      survey_id: surveyId,
      admin_url: adminUrl,
      staff_url: staffUrl,
      admin_token: adminToken,
    };

    // Send Teams notification (fire and forget, non-blocking)
    notifyTeamsSurveyCreated({
      survey_id: surveyId,
      title: validatedData.title,
      org_name: validatedData.org_name,
      holiday_count: validatedData.holidays.length,
      admin_url: adminUrl,
      created_at: new Date().toISOString(),
    }).catch((error) => {
      // Log error but don't fail the request
      console.error("Failed to send Teams notification:", error);
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating survey:", error);

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
        error: "Failed to create survey",
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
