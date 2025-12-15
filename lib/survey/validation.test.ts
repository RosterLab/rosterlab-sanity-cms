/**
 * Unit tests for survey validation schemas
 */

import {
  validateCreateSurveyRequest,
  validateSubmitPreferencesRequest,
  validateAdminToken,
  validateSurveyId,
} from "./validation";
import { ZodError } from "zod";
import { randomUUID } from "crypto";

describe("Survey Validation", () => {
  describe("validateCreateSurveyRequest", () => {
    it("should accept valid survey data", () => {
      const validData = {
        title: "Holiday Survey 2025",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 2,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(validData)).not.toThrow();
      const result = validateCreateSurveyRequest(validData);
      expect(result.title).toBe(validData.title);
      expect(result.org_name).toBe(validData.org_name);
      expect(result.holidays).toHaveLength(1);
    });

    it("should reject survey with missing title", () => {
      const invalidData = {
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 2,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject survey with title too short", () => {
      const invalidData = {
        title: "Hi",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 2,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject survey with no holidays", () => {
      const invalidData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject holiday with invalid date format", () => {
      const invalidData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "25-12-2025", // Wrong format
            staff_needed: 2,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject holiday with invalid UUID", () => {
      const invalidData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [
          {
            id: "not-a-uuid",
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 2,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject holiday with zero staff needed", () => {
      const invalidData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 0,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should reject holiday with staff needed > 100", () => {
      const invalidData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 101,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(invalidData)).toThrow(ZodError);
    });

    it("should accept multiple holidays", () => {
      const validData = {
        title: "Holiday Survey",
        org_name: "Test Hospital",
        holidays: [
          {
            id: randomUUID(),
            name: "Christmas",
            date: "2025-12-25",
            staff_needed: 2,
          },
          {
            id: randomUUID(),
            name: "New Year",
            date: "2026-01-01",
            staff_needed: 3,
          },
        ],
      };

      expect(() => validateCreateSurveyRequest(validData)).not.toThrow();
      const result = validateCreateSurveyRequest(validData);
      expect(result.holidays).toHaveLength(2);
    });
  });

  describe("validateSubmitPreferencesRequest", () => {
    it("should accept valid preference data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(validData)).not.toThrow();
      const result = validateSubmitPreferencesRequest(validData);
      expect(result.name).toBe(validData.name);
      expect(result.email).toBe(validData.email);
    });

    it("should accept preference data with notes", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
        ],
        notes: "I prefer morning shifts",
      };

      expect(() => validateSubmitPreferencesRequest(validData)).not.toThrow();
      const result = validateSubmitPreferencesRequest(validData);
      expect(result.notes).toBe("I prefer morning shifts");
    });

    it("should reject name that is too short", () => {
      const invalidData = {
        name: "A",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "John Doe",
        email: "not-an-email",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject empty holiday rankings", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject ranking with invalid holiday_id", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: "not-a-uuid",
            rank: 1,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject ranking with rank < 1", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 0,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject ranking with rank > 50", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 51,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should reject notes longer than 1000 characters", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
        ],
        notes: "a".repeat(1001),
      };

      expect(() => validateSubmitPreferencesRequest(invalidData)).toThrow(
        ZodError,
      );
    });

    it("should accept multiple holiday rankings", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        holiday_rankings: [
          {
            holiday_id: randomUUID(),
            rank: 1,
          },
          {
            holiday_id: randomUUID(),
            rank: 2,
          },
          {
            holiday_id: randomUUID(),
            rank: 3,
          },
        ],
      };

      expect(() => validateSubmitPreferencesRequest(validData)).not.toThrow();
      const result = validateSubmitPreferencesRequest(validData);
      expect(result.holiday_rankings).toHaveLength(3);
    });
  });

  describe("validateAdminToken", () => {
    it("should accept valid UUID", () => {
      const validToken = randomUUID();
      expect(() => validateAdminToken(validToken)).not.toThrow();
      const result = validateAdminToken(validToken);
      expect(result).toBe(validToken);
    });

    it("should reject invalid UUID", () => {
      expect(() => validateAdminToken("not-a-uuid")).toThrow(ZodError);
    });

    it("should reject empty string", () => {
      expect(() => validateAdminToken("")).toThrow(ZodError);
    });

    it("should reject null", () => {
      expect(() => validateAdminToken(null)).toThrow(ZodError);
    });
  });

  describe("validateSurveyId", () => {
    it("should accept valid UUID", () => {
      const validId = randomUUID();
      expect(() => validateSurveyId(validId)).not.toThrow();
      const result = validateSurveyId(validId);
      expect(result).toBe(validId);
    });

    it("should reject invalid UUID", () => {
      expect(() => validateSurveyId("not-a-uuid")).toThrow(ZodError);
    });

    it("should reject empty string", () => {
      expect(() => validateSurveyId("")).toThrow(ZodError);
    });

    it("should reject number", () => {
      expect(() => validateSurveyId(123)).toThrow(ZodError);
    });
  });
});
