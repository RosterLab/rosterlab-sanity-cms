export interface IndustryConfig {
  name: string;
  schedulingComplexity: number;
  overtimeReduction: number;
  turnoverReduction: number;
  defaultOvertime: number;
  defaultTurnover: number;
  defaultEmployees: number;
  defaultHourlyWage: number;
  defaultCycleWeeks: number;
  defaultRosteringDays: number;
  implementationDays: number;

  // Saving categories
  hasManualTimeSaving: boolean;
  hasStaffingEfficiency: boolean;
  hasSkillMix: boolean;
  hasTurnover: boolean;

  // Staffing efficiency data
  avgSalary: number;
  avgFTE: number;
  inefficiency: number;
  baseCost: number;
  baseSaving: number;
  overtimePenalty: number;
  overtimeCost: number;
  locumEfficiency: number;
  locumCost: number;
  totalSaving: number;

  // Skill mix data
  lowestPay?: number;
  highestPay?: number;
  weekendPenalty: number;
  weekendShiftCost: number;
  weekendSaving: number;
  nightPenalty: number;
  nightShiftCost: number;
  nightSaving: number;
  skillMixTotalPerStaff: number;

  // Turnover data
  turnoverCostPerRole: number;
  turnoverRate: number;
  turnoverImprovement: number;
  hiringAdminCost: number;
  turnoverTotalSaving: number;

  // Leave balance data
  annualLeaveCost: number;
  annualLeaveReduction: number;
  sickLeaveTotal: number;
  sickLeaveReduction: number;
  leaveSavingPerStaff: number;
}

export interface CalculationInputs {
  industry: string;
  employees: number;
  avgHourlyWage: number;
  annualSalary: number;
  rosterCycleWeeks: number;
  scaledRosteringDays: number;
  overtimePercentage?: number;
  turnoverRate?: number;
}

export interface CalculationResults {
  totalAnnualSavings: number;
  roiMultiple: string;
  breakevenMonth: number;

  // Cost breakdown
  timeSavingsCost: number;
  allocativeEfficiencySavings: number;
  skillMixSavings: number;
  turnoverReductionSavings: number;

  // Investment details
  annualSubscriptionCost: number;
  oneOffImplementationCost: number;
  firstYearTotalCost: number;
  implementationDays: number;
}

export interface PDFReportData {
  companyName: string;
  inputs: CalculationInputs;
  results: CalculationResults;
  industryConfig: IndustryConfig;
  reportType: "savings" | "roi";
  region: "us" | "global";
}

export interface PDFGenerationOptions {
  data: PDFReportData;
  filename?: string;
  fallbackToText?: boolean;
}
