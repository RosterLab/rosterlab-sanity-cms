/**
 * PATCH /api/survey/[surveyId]/config
 * Updates survey configuration (staff_needed values)
 * Requires admin token
 */

import { NextRequest, NextResponse } from "next/server";
import { getDbClient } from "@/lib/db/client";
import {
  validateSurveyId,
  validateUpdateConfigRequest,
} from "@/lib/survey/validation";
import type { Survey } from "@/lib/survey/types";
import { ZodError } from "zod";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ surveyId: string }> },
) {
  try {
    const { surveyId } = await params;

    // Validate survey ID
    validateSurveyId(surveyId);

    // Parse and validate request body
    const body = await request.json();
    const { token, holidays } = validateUpdateConfigRequest(body);

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
    if (survey.admin_token !== token) {
      return NextResponse.json(
        { error: "Invalid admin token" },
        { status: 403 },
      );
    }

    // Create a map of holiday ID to new staff_needed value
    const staffNeededMap = new Map(holidays.map((h) => [h.id, h.staff_needed]));

    // Update the config with new staff_needed values
    const updatedConfig = {
      ...survey.config,
      holidays: survey.config.holidays.map((holiday) => {
        const newStaffNeeded = staffNeededMap.get(holiday.id);
        if (newStaffNeeded !== undefined) {
          return {
            ...holiday,
            staff_needed: newStaffNeeded,
          };
        }
        return holiday;
      }),
    };

    // Update survey in database
    await sql`
      UPDATE surveys
      SET config = ${JSON.stringify(updatedConfig)},
          updated_at = NOW()
      WHERE id = ${surveyId}
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Survey configuration updated successfully",
        config: updatedConfig,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating survey config:", error);

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
        error: "Failed to update survey configuration",
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
      "Access-Control-Allow-Methods": "PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
