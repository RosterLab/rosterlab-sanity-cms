/**
 * Zod validation schemas for Holiday Shift Balancing
 * Simplified for holiday preferences only
 */

import { z } from "zod";

// Holiday schema
export const holidaySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Holiday name is required").max(100),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (use YYYY-MM-DD)"),
  staff_needed: z.number().min(1, "At least 1 staff member required").max(100),
});

// Holiday ranking schema
export const holidayRankingSchema = z.object({
  holiday_id: z.string().uuid(),
  rank: z.number().min(-2).max(50), // -2 = Not applicable, -1 = Not Available, 1-50 = preference ranking
});

// Survey config schema
export const surveyConfigSchema = z.object({
  holidays: z.array(holidaySchema).min(1, "At least one holiday is required"),
});

// Create survey request schema
export const createSurveyRequestSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  org_name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(255),
  holidays: z.array(holidaySchema).min(1, "At least one holiday is required"),
});

// Submit preferences request schema
export const submitPreferencesRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Invalid email address").max(255),
  holiday_rankings: z
    .array(holidayRankingSchema)
    .min(1, "Please rank at least one holiday"),
  notes: z.string().max(1000).optional(),
});

// Admin token validation
export const adminTokenSchema = z.string().uuid("Invalid admin token");

// Survey ID validation
export const surveyIdSchema = z.string().uuid("Invalid survey ID");

// Update config request schema (for editing staff_needed)
export const updateConfigRequestSchema = z.object({
  token: z.string().uuid("Invalid admin token"),
  holidays: z.array(
    z.object({
      id: z.string().uuid(),
      staff_needed: z
        .number()
        .min(1, "At least 1 staff member required")
        .max(100),
    }),
  ),
});

// Add holidays request schema (for adding new holidays - only allowed with 0 responses)
export const addHolidaysRequestSchema = z.object({
  token: z.string().uuid("Invalid admin token"),
  newHolidays: z
    .array(holidaySchema)
    .min(1, "At least one holiday is required"),
});

// Export validation helper functions
export function validateCreateSurveyRequest(data: unknown) {
  return createSurveyRequestSchema.parse(data);
}

export function validateSubmitPreferencesRequest(data: unknown) {
  return submitPreferencesRequestSchema.parse(data);
}

export function validateAdminToken(token: unknown) {
  return adminTokenSchema.parse(token);
}

export function validateSurveyId(id: unknown) {
  return surveyIdSchema.parse(id);
}

export function validateUpdateConfigRequest(data: unknown) {
  return updateConfigRequestSchema.parse(data);
}

export function validateAddHolidaysRequest(data: unknown) {
  return addHolidaysRequestSchema.parse(data);
}
