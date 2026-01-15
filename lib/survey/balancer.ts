/**
 * Holiday Shift Balancing Algorithm
 * Fairly distributes holiday assignments based on staff preferences
 */

import type {
  Survey,
  SurveyParticipant,
  SurveyResponse,
  HolidayAssignment,
  BalancingResult,
  HolidayRanking,
} from "./types";

interface StaffWithPreferences {
  participant: SurveyParticipant;
  rankings: HolidayRanking[];
  notes?: string;
  assignedCount: number;
  totalPreferenceScore: number; // Lower is better (1st choice = 1, 2nd = 2, etc.)
}

/**
 * Main balancing function
 * Attempts to fairly distribute holiday assignments based on preferences
 */
export function balanceHolidayAssignments(
  survey: Survey,
  participants: SurveyParticipant[],
  responses: SurveyResponse[],
): BalancingResult {
  const holidays = survey.config.holidays;

  // Build staff preferences map
  const staffMap = new Map<string, StaffWithPreferences>();

  for (const participant of participants) {
    const response = responses.find((r) => r.participant_id === participant.id);
    const preferenceData = response?.preference_data;

    staffMap.set(participant.id, {
      participant,
      rankings: preferenceData?.holiday_rankings || [],
      notes: preferenceData?.notes,
      assignedCount: 0,
      totalPreferenceScore: 0,
    });
  }

  // Initialize assignments
  const assignments: HolidayAssignment[] = holidays.map((holiday) => ({
    holiday_id: holiday.id,
    holiday_name: holiday.name,
    holiday_date: holiday.date,
    staff_needed: holiday.staff_needed,
    assigned_staff: [],
    unassigned_count: holiday.staff_needed,
  }));

  // Sort holidays by date (earliest first)
  const sortedHolidays = [...holidays].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  // Phase 1: Assign based on preferences (greedy algorithm with fairness)
  // Process each holiday in chronological order
  for (const holiday of sortedHolidays) {
    const assignment = assignments.find((a) => a.holiday_id === holiday.id)!;

    // Get all staff who ranked this holiday (excluding those marked as Not Available)
    const candidates: Array<{
      staff: StaffWithPreferences;
      rank: number;
    }> = [];

    for (const staff of staffMap.values()) {
      const ranking = staff.rankings.find((r) => r.holiday_id === holiday.id);
      if (ranking && ranking.rank > 0) {
        // Only include positive rankings (exclude -1 = Not Available)
        candidates.push({ staff, rank: ranking.rank });
      }
    }

    // Sort candidates by:
    // 1. Their preference rank for this holiday (lower is better)
    // 2. How many holidays they've been assigned (fewer is better)
    // 3. Their total preference score (lower is better - means they got better assignments overall)
    candidates.sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.staff.assignedCount !== b.staff.assignedCount) {
        return a.staff.assignedCount - b.staff.assignedCount;
      }
      return a.staff.totalPreferenceScore - b.staff.totalPreferenceScore;
    });

    // Assign up to staff_needed from candidates
    const assignCount = Math.min(candidates.length, holiday.staff_needed);

    for (let i = 0; i < assignCount; i++) {
      const { staff, rank } = candidates[i];

      assignment.assigned_staff.push({
        participant_id: staff.participant.id,
        name: staff.participant.name,
        email: staff.participant.email,
        preference_rank: rank,
      });

      // Update staff tracking
      staff.assignedCount++;
      staff.totalPreferenceScore += rank;
    }

    assignment.unassigned_count =
      holiday.staff_needed - assignment.assigned_staff.length;
  }

  // Phase 2: Fill remaining slots with staff who didn't rank the holiday
  // Prioritize staff with fewer assignments
  for (const assignment of assignments) {
    if (assignment.unassigned_count > 0) {
      // Get staff who didn't rank this holiday and aren't already assigned to it
      // Exclude staff who marked themselves as "Not Available" (-1)
      const unrankedStaff = Array.from(staffMap.values())
        .filter((staff) => {
          const ranking = staff.rankings.find(
            (r) => r.holiday_id === assignment.holiday_id,
          );
          const isNotAvailable = ranking && ranking.rank === -1;
          const hasRanked = ranking && ranking.rank > 0;
          const isAssigned = assignment.assigned_staff.some(
            (a) => a.participant_id === staff.participant.id,
          );
          return !hasRanked && !isAssigned && !isNotAvailable;
        })
        .sort((a, b) => {
          // Sort by assignment count (fewer is better)
          if (a.assignedCount !== b.assignedCount) {
            return a.assignedCount - b.assignedCount;
          }
          // Then by total preference score (lower is better)
          return a.totalPreferenceScore - b.totalPreferenceScore;
        });

      const fillCount = Math.min(
        unrankedStaff.length,
        assignment.unassigned_count,
      );

      for (let i = 0; i < fillCount; i++) {
        const staff = unrankedStaff[i];

        assignment.assigned_staff.push({
          participant_id: staff.participant.id,
          name: staff.participant.name,
          email: staff.participant.email,
          preference_rank: null, // Not in their preferences
        });

        // Update staff tracking
        staff.assignedCount++;
        // Add penalty for unranked assignment (use max rank + 1)
        staff.totalPreferenceScore += holidays.length + 1;
      }

      assignment.unassigned_count =
        assignment.staff_needed - assignment.assigned_staff.length;
    }
  }

  // Calculate fairness score
  const fairnessScore = calculateFairnessScore(assignments, staffMap);

  // Identify unmet requirements
  const unmetRequirements = assignments
    .filter((a) => a.unassigned_count > 0)
    .map(
      (a) =>
        `${a.holiday_name} (${a.holiday_date}): ${a.unassigned_count} staff still needed`,
    );

  return {
    assignments,
    fairness_score: fairnessScore,
    unmet_requirements: unmetRequirements,
  };
}

/**
 * Calculate fairness score (0-100, higher is better)
 * Based on:
 * - How well preferences were matched
 * - How evenly assignments are distributed
 * - How many requirements were met
 */
function calculateFairnessScore(
  assignments: HolidayAssignment[],
  staffMap: Map<string, StaffWithPreferences>,
): number {
  const totalStaffNeeded = assignments.reduce(
    (sum, a) => sum + a.staff_needed,
    0,
  );
  const totalAssigned = assignments.reduce(
    (sum, a) => sum + a.assigned_staff.length,
    0,
  );

  // Score component 1: How many slots were filled (0-40 points)
  const fillRate = totalStaffNeeded > 0 ? totalAssigned / totalStaffNeeded : 0;
  const fillScore = fillRate * 40;

  // Score component 2: How well preferences were matched (0-40 points)
  let totalPreferenceMatches = 0;
  let totalPreferenceOpportunities = 0;

  for (const assignment of assignments) {
    for (const staff of assignment.assigned_staff) {
      if (staff.preference_rank !== null) {
        totalPreferenceMatches++;
        // Weight higher ranks less (1st choice is best)
        totalPreferenceOpportunities += 1 / staff.preference_rank;
      }
    }
  }

  const preferenceScore =
    totalPreferenceMatches > 0
      ? (totalPreferenceOpportunities / totalPreferenceMatches) * 40
      : 0;

  // Score component 3: How evenly distributed assignments are (0-20 points)
  const staffCounts = Array.from(staffMap.values()).map((s) => s.assignedCount);
  const avgAssignments =
    staffCounts.reduce((sum, c) => sum + c, 0) / staffCounts.length;
  const variance =
    staffCounts.reduce((sum, c) => sum + Math.pow(c - avgAssignments, 2), 0) /
    staffCounts.length;
  const stdDev = Math.sqrt(variance);

  // Lower standard deviation = more fair distribution
  const distributionScore = Math.max(0, 20 - stdDev * 5);

  const totalScore = Math.round(
    fillScore + preferenceScore + distributionScore,
  );
  return Math.min(100, Math.max(0, totalScore));
}
