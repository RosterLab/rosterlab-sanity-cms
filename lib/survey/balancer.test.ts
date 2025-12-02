/**
 * Unit tests for Holiday Shift Balancing Algorithm
 */

import { balanceHolidayAssignments } from "./balancer";
import type {
  Survey,
  SurveyParticipant,
  SurveyResponse,
  Holiday,
} from "./types";

describe("balanceHolidayAssignments", () => {
  // Helper to create a survey with holidays
  const createSurvey = (holidays: Holiday[]): Survey => ({
    id: "survey-1",
    title: "Test Survey",
    org_name: "Test Org",
    config: { holidays },
    admin_token: "test-token",
    created_at: new Date(),
    updated_at: new Date(),
  });

  // Helper to create a participant
  const createParticipant = (
    id: string,
    name: string,
    email: string,
  ): SurveyParticipant => ({
    id,
    survey_id: "survey-1",
    name,
    email,
    submitted_at: new Date(),
  });

  // Helper to create a response
  const createResponse = (
    participantId: string,
    rankings: Array<{ holiday_id: string; rank: number }>,
    notes?: string,
  ): SurveyResponse => ({
    id: `response-${participantId}`,
    participant_id: participantId,
    preference_type: "holiday_rankings",
    preference_data: {
      holiday_rankings: rankings,
      notes,
    },
    created_at: new Date(),
  });

  describe("Basic Assignment Logic", () => {
    it("should assign staff to their first choice when possible", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
      ];

      const participants = [createParticipant("p1", "Alice", "alice@test.com")];

      const responses = [createResponse("p1", [{ holiday_id: "h1", rank: 1 }])];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      expect(result.assignments).toHaveLength(1);
      expect(result.assignments[0].assigned_staff).toHaveLength(1);
      expect(result.assignments[0].assigned_staff[0].name).toBe("Alice");
      expect(result.assignments[0].assigned_staff[0].preference_rank).toBe(1);
      expect(result.assignments[0].unassigned_count).toBe(0);
    });

    it("should prioritize higher preference ranks", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p2", [{ holiday_id: "h1", rank: 2 }]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Alice (rank 1) should get it over Bob (rank 2)
      expect(result.assignments[0].assigned_staff).toHaveLength(1);
      expect(result.assignments[0].assigned_staff[0].name).toBe("Alice");
      expect(result.assignments[0].assigned_staff[0].preference_rank).toBe(1);
    });

    it("should fill multiple positions for the same holiday", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 3 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
        createParticipant("p3", "Carol", "carol@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p2", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p3", [{ holiday_id: "h1", rank: 1 }]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      expect(result.assignments[0].assigned_staff).toHaveLength(3);
      expect(result.assignments[0].unassigned_count).toBe(0);
    });
  });

  describe("Fairness Distribution", () => {
    it("should distribute assignments fairly across multiple holidays", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
        { id: "h2", name: "New Year", date: "2026-01-01", staff_needed: 1 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 2 },
        ]),
        createResponse("p2", [
          { holiday_id: "h1", rank: 2 },
          { holiday_id: "h2", rank: 1 },
        ]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Alice should get Christmas (her 1st choice)
      // Bob should get New Year (his 1st choice)
      const christmasAssignment = result.assignments.find(
        (a) => a.holiday_id === "h1",
      );
      const newYearAssignment = result.assignments.find(
        (a) => a.holiday_id === "h2",
      );

      expect(christmasAssignment?.assigned_staff[0].name).toBe("Alice");
      expect(christmasAssignment?.assigned_staff[0].preference_rank).toBe(1);

      expect(newYearAssignment?.assigned_staff[0].name).toBe("Bob");
      expect(newYearAssignment?.assigned_staff[0].preference_rank).toBe(1);
    });

    it("should favor staff with fewer assignments when ranks are equal", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
        { id: "h2", name: "Boxing Day", date: "2025-12-26", staff_needed: 1 },
        { id: "h3", name: "New Year", date: "2026-01-01", staff_needed: 1 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 1 },
          { holiday_id: "h3", rank: 1 },
        ]),
        createResponse("p2", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 1 },
          { holiday_id: "h3", rank: 1 },
        ]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Count assignments per person
      const aliceAssignments = result.assignments.filter((a) =>
        a.assigned_staff.some((s) => s.name === "Alice"),
      ).length;
      const bobAssignments = result.assignments.filter((a) =>
        a.assigned_staff.some((s) => s.name === "Bob"),
      ).length;

      // Should be distributed fairly (ideally 2 and 1, or 1 and 2)
      expect(Math.abs(aliceAssignments - bobAssignments)).toBeLessThanOrEqual(
        1,
      );
    });
  });

  describe("Unranked Holiday Handling", () => {
    it("should assign unranked staff when not enough ranked staff available", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 2 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p2", []), // Bob didn't rank any holidays
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      expect(result.assignments[0].assigned_staff).toHaveLength(2);

      // Alice should be assigned with rank 1
      const alice = result.assignments[0].assigned_staff.find(
        (s) => s.name === "Alice",
      );
      expect(alice?.preference_rank).toBe(1);

      // Bob should be assigned with null rank (unranked)
      const bob = result.assignments[0].assigned_staff.find(
        (s) => s.name === "Bob",
      );
      expect(bob?.preference_rank).toBeNull();
    });

    it("should prioritize staff with fewer assignments for unranked slots", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
        { id: "h2", name: "New Year", date: "2026-01-01", staff_needed: 1 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]), // Alice only wants Christmas
        createResponse("p2", []), // Bob didn't rank anything
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Alice gets Christmas (her choice)
      const christmasAssignment = result.assignments.find(
        (a) => a.holiday_id === "h1",
      );
      expect(christmasAssignment?.assigned_staff[0].name).toBe("Alice");

      // Bob gets New Year (unranked, but he has 0 assignments so far)
      const newYearAssignment = result.assignments.find(
        (a) => a.holiday_id === "h2",
      );
      expect(newYearAssignment?.assigned_staff[0].name).toBe("Bob");
      expect(newYearAssignment?.assigned_staff[0].preference_rank).toBeNull();
    });
  });

  describe("Unmet Requirements", () => {
    it("should report unmet requirements when insufficient staff", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 3 },
      ];

      const participants = [createParticipant("p1", "Alice", "alice@test.com")];

      const responses = [createResponse("p1", [{ holiday_id: "h1", rank: 1 }])];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      expect(result.assignments[0].unassigned_count).toBe(2);
      expect(result.unmet_requirements).toHaveLength(1);
      expect(result.unmet_requirements[0]).toContain("Christmas");
      expect(result.unmet_requirements[0]).toContain("2 staff still needed");
    });

    it("should have no unmet requirements when all positions filled", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 2 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p2", [{ holiday_id: "h1", rank: 1 }]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      expect(result.assignments[0].unassigned_count).toBe(0);
      expect(result.unmet_requirements).toHaveLength(0);
    });
  });

  describe("Fairness Score Calculation", () => {
    it("should return perfect score when all requirements met with first choices", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 2 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [{ holiday_id: "h1", rank: 1 }]),
        createResponse("p2", [{ holiday_id: "h1", rank: 1 }]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Perfect score calculation:
      // - Fill: 100% (2/2) = 40 points
      // - Preference: Both rank 1, (1/1 + 1/1)/2 * 40 = 40 points
      // - Distribution: Both have 1 assignment, stdDev=0, score = 20 points
      // Total = 40 + 40 + 20 = 100
      expect(result.fairness_score).toBe(100);
    });

    it("should have lower score when requirements not met", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 3 },
      ];

      const participants = [createParticipant("p1", "Alice", "alice@test.com")];

      const responses = [createResponse("p1", [{ holiday_id: "h1", rank: 1 }])];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Score should be lower than perfect (only 1/3 slots filled)
      expect(result.fairness_score).toBeLessThan(80);
      expect(result.unmet_requirements).toHaveLength(1);
    });

    it("should have lower score when staff get non-preferred assignments", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
        { id: "h2", name: "New Year", date: "2026-01-01", staff_needed: 1 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
      ];

      const responses = [
        createResponse("p1", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 3 }, // Low preference
        ]),
        createResponse("p2", [{ holiday_id: "h1", rank: 2 }]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Alice gets Christmas (rank 1), Alice gets New Year (rank 3)
      // Bob gets nothing (unranked for New Year)
      // Wait - Bob didn't rank New Year, so Alice should get it
      // Score calculation:
      // - Fill: 100% (2/2) = 40 points
      // - Preference: Alice rank 1 + Alice rank 3 = (1/1 + 1/3)/2 * 40 = 26.67 points
      // - Distribution: Alice=2, Bob=0, mean=1, variance=1, stdDev=1, score=20-5=15 points
      // Total = 40 + 26.67 + 15 = 81.67 ≈ 82
      expect(result.fairness_score).toBe(82);
    });
  });

  describe("Edge Cases", () => {
    it("should handle no participants", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 2 },
      ];

      const result = balanceHolidayAssignments(createSurvey(holidays), [], []);

      expect(result.assignments[0].assigned_staff).toHaveLength(0);
      expect(result.assignments[0].unassigned_count).toBe(2);
      expect(result.unmet_requirements).toHaveLength(1);
    });

    it("should handle participants with no responses", () => {
      const holidays: Holiday[] = [
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
      ];

      const participants = [createParticipant("p1", "Alice", "alice@test.com")];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        [], // No responses
      );

      // Alice should be assigned even though she didn't rank it
      expect(result.assignments[0].assigned_staff).toHaveLength(1);
      expect(result.assignments[0].assigned_staff[0].name).toBe("Alice");
      expect(
        result.assignments[0].assigned_staff[0].preference_rank,
      ).toBeNull();
    });

    it("should handle chronological ordering correctly", () => {
      const holidays: Holiday[] = [
        { id: "h3", name: "New Year", date: "2026-01-01", staff_needed: 1 },
        { id: "h1", name: "Christmas", date: "2025-12-25", staff_needed: 1 },
        { id: "h2", name: "Boxing Day", date: "2025-12-26", staff_needed: 1 },
      ];

      const participants = [createParticipant("p1", "Alice", "alice@test.com")];

      const responses = [
        createResponse("p1", [
          { holiday_id: "h1", rank: 3 },
          { holiday_id: "h2", rank: 2 },
          { holiday_id: "h3", rank: 1 },
        ]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // Even though Alice prefers New Year (rank 1), she should get Christmas
      // because it's processed first (earliest date)
      const christmasAssignment = result.assignments.find(
        (a) => a.holiday_id === "h1",
      );
      expect(christmasAssignment?.assigned_staff[0].name).toBe("Alice");
    });
  });

  describe("Complex Scenarios", () => {
    it("should handle realistic scenario with multiple staff and holidays", () => {
      const holidays: Holiday[] = [
        {
          id: "h1",
          name: "Christmas Day",
          date: "2025-12-25",
          staff_needed: 2,
        },
        { id: "h2", name: "Boxing Day", date: "2025-12-26", staff_needed: 2 },
        { id: "h3", name: "New Year Day", date: "2026-01-01", staff_needed: 2 },
      ];

      const participants = [
        createParticipant("p1", "Alice", "alice@test.com"),
        createParticipant("p2", "Bob", "bob@test.com"),
        createParticipant("p3", "Carol", "carol@test.com"),
        createParticipant("p4", "Dave", "dave@test.com"),
      ];

      const responses = [
        createResponse("p1", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 3 },
        ]),
        createResponse("p2", [
          { holiday_id: "h2", rank: 1 },
          { holiday_id: "h3", rank: 2 },
        ]),
        createResponse("p3", [
          { holiday_id: "h1", rank: 2 },
          { holiday_id: "h3", rank: 1 },
        ]),
        createResponse("p4", [
          { holiday_id: "h1", rank: 1 },
          { holiday_id: "h2", rank: 2 },
        ]),
      ];

      const result = balanceHolidayAssignments(
        createSurvey(holidays),
        participants,
        responses,
      );

      // All holidays should be fully staffed
      result.assignments.forEach((assignment) => {
        expect(assignment.unassigned_count).toBe(0);
      });

      // Should have no unmet requirements
      expect(result.unmet_requirements).toHaveLength(0);

      // Expected assignments based on chronological algorithm:
      // Christmas (h1, processed first): Alice (rank 1), Dave (rank 1)
      // Boxing Day (h2, processed second): Bob (rank 1), Dave (rank 2)
      // New Year (h3, processed third): Carol (rank 1), Bob (rank 2)

      const christmasAssignment = result.assignments.find(
        (a) => a.holiday_id === "h1",
      );
      const boxingDayAssignment = result.assignments.find(
        (a) => a.holiday_id === "h2",
      );
      const newYearAssignment = result.assignments.find(
        (a) => a.holiday_id === "h3",
      );

      // Verify specific assignments
      expect(
        christmasAssignment?.assigned_staff.map((s) => s.name).sort(),
      ).toEqual(["Alice", "Dave"]);
      expect(
        boxingDayAssignment?.assigned_staff.some((s) => s.name === "Bob"),
      ).toBe(true);
      expect(
        newYearAssignment?.assigned_staff.some((s) => s.name === "Carol"),
      ).toBe(true);

      // The algorithm assigns in chronological order:
      // 1. Christmas: Alice (rank 1, 0 assigned), Dave (rank 1, 0 assigned)
      // 2. Boxing Day: Bob (rank 1, 0 assigned), Dave (rank 2, 1 assigned already)
      // 3. New Year: Carol (rank 1, 0 assigned), Bob (rank 2, 1 assigned already)
      // Final: Alice=1, Bob=2, Carol=1, Dave=2

      // Fairness calculation:
      // - Fill score: 100% filled = 40 points
      // - Preference score: (1 + 1 + 1 + 0.5 + 1 + 0.5) / 6 = 5/6 * 40 = 33.33 points
      //   (Dave's rank 2 = 1/2, Bob's rank 2 = 1/2)
      // - Distribution: stdDev with counts [1,2,1,2] = 0.5, score = 20 - 2.5 = 17.5 points
      // Total = 40 + 33.33 + 17.5 = 90.83 ≈ 91
      expect(result.fairness_score).toBe(91);
    });
  });
});
