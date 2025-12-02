/**
 * TypeScript types for Holiday Shift Balancing
 * Simplified for holiday preference collection only
 */

// Database models
export interface Survey {
  id: string;
  title: string;
  org_name: string;
  config: SurveyConfig;
  admin_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface SurveyParticipant {
  id: string;
  survey_id: string;
  name: string;
  email: string;
  submitted_at: Date;
}

export interface SurveyResponse {
  id: string;
  participant_id: string;
  preference_type: string;
  preference_data: PreferenceData;
  created_at: Date;
}

// Configuration types - simplified for holidays only
export interface SurveyConfig {
  holidays: Holiday[];
}

export interface Holiday {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD format
  staff_needed: number;
}

// Preference data - just holiday rankings
export interface PreferenceData {
  holiday_rankings?: HolidayRanking[];
  notes?: string;
}

export interface HolidayRanking {
  holiday_id: string;
  rank: number; // 1 = most preferred, 2 = second choice, etc.
}

// API request/response types
export interface CreateSurveyRequest {
  title: string;
  org_name: string;
  holidays: Holiday[];
}

export interface CreateSurveyResponse {
  survey_id: string;
  admin_url: string;
  staff_url: string;
  admin_token: string;
}

export interface SubmitPreferencesRequest {
  name: string;
  email: string;
  holiday_rankings: HolidayRanking[];
  notes?: string;
}

export interface SubmitPreferencesResponse {
  success: boolean;
  participant_id: string;
  message: string;
}

export interface SurveyResultsResponse {
  survey: Omit<Survey, "admin_token">;
  participants: SurveyParticipant[];
  responses: (SurveyResponse & { participant: SurveyParticipant })[];
  stats: SurveyStats;
}

export interface SurveyStats {
  total_participants: number;
  total_responses: number;
  completion_rate: number;
  average_preferences_per_participant: number;
  submission_dates: { date: string; count: number }[];
}

// Balancing algorithm types
export interface HolidayAssignment {
  holiday_id: string;
  holiday_name: string;
  holiday_date: string;
  staff_needed: number;
  assigned_staff: AssignedStaff[];
  unassigned_count: number;
}

export interface AssignedStaff {
  participant_id: string;
  name: string;
  email: string;
  preference_rank: number | null; // null if not in their preferences
}

export interface BalancingResult {
  assignments: HolidayAssignment[];
  fairness_score: number; // 0-100, higher is better
  unmet_requirements: string[];
}

// UI component props
export interface SurveyConfiguratorProps {
  onSurveyCreated?: (response: CreateSurveyResponse) => void;
}

export interface StaffPreferenceFormProps {
  survey: Survey;
  onSuccess?: (response: SubmitPreferencesResponse) => void;
}

export interface ResultsTableProps {
  results: SurveyResultsResponse;
  onExport?: (format: "csv") => void;
  onBalance?: () => void;
}

export interface BalancingViewProps {
  results: SurveyResultsResponse;
  balancing: BalancingResult;
}
