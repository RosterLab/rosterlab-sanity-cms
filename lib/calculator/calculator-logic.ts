import type {
  CalculationInputs,
  CalculationResults,
  IndustryConfig,
} from "@/lib/pdf-generator";

export function calculateSavings(
  inputs: CalculationInputs,
  industryConfig: IndustryConfig,
  manualRosteringDays?: number | null,
): CalculationResults {
  const { employees, avgHourlyWage, rosterCycleWeeks, scaledRosteringDays } =
    inputs;

  // Constants
  const hoursPerDay = 8;
  const rostersPerYear = 52 / Math.max(1, rosterCycleWeeks);
  const defaultEmployees = industryConfig.defaultEmployees || 50;

  // === 1. MANUAL TIME SPENT ROSTERING ===
  const employeeMultiplier =
    Math.max(0, employees) / Math.max(1, defaultEmployees);

  // Use manual override if set, otherwise use calculated scaled days
  let finalRosteringDays: number;
  if (manualRosteringDays !== null && manualRosteringDays !== undefined) {
    finalRosteringDays = manualRosteringDays;
  } else {
    finalRosteringDays = scaledRosteringDays;
  }

  // Total hours spent rostering per year
  const annualRosteringHours =
    finalRosteringDays * hoursPerDay * rostersPerYear;
  const totalAnnualRosteringCost = avgHourlyWage * annualRosteringHours;

  // Time savings (90% reduction)
  const rosteringImprovement = 0.9;
  const timeSavingsCost = industryConfig.hasManualTimeSaving
    ? totalAnnualRosteringCost * rosteringImprovement
    : 0;

  // === 2. OPTIMISED STAFFING EFFICIENCY ===
  const efficiencySavingsPerPerson = industryConfig.hasStaffingEfficiency
    ? industryConfig.totalSaving || 0
    : 0;
  const allocativeEfficiencySavings = employees * efficiencySavingsPerPerson;

  // === 3. SKILL MIX ===
  const skillMixSavings = industryConfig.hasSkillMix
    ? employees * (industryConfig.skillMixTotalPerStaff || 2007)
    : 0;

  // === 4. TURNOVER COSTS ===
  const turnoverSavingPerPerson = industryConfig.hasTurnover
    ? industryConfig.turnoverTotalSaving / industryConfig.defaultEmployees
    : 0;
  const turnoverReductionSavings = employees * turnoverSavingPerPerson;

  // === TOTAL ANNUAL SAVINGS ===
  const totalAnnualSavings =
    timeSavingsCost +
    allocativeEfficiencySavings +
    skillMixSavings +
    turnoverReductionSavings;

  // === ROSTERLAB COSTS ===
  const annualSubscriptionCost = employees * 20 * 12; // $20 × employees × 12 months

  // Scale implementation days based on employee count
  const baseImplementationDays = industryConfig.implementationDays || 3;
  const employeeRatio = employees / defaultEmployees;
  const additionalDays = Math.floor(Math.max(0, employeeRatio - 1));
  const implementationDays = baseImplementationDays + additionalDays;

  const oneOffImplementationCost = implementationDays * 1500;
  const firstYearTotalCost = annualSubscriptionCost + oneOffImplementationCost;

  // === ROI CALCULATIONS ===
  const roiMultiple =
    firstYearTotalCost > 0 && totalAnnualSavings > 0
      ? (totalAnnualSavings / firstYearTotalCost).toFixed(1)
      : "0";

  // Breakeven calculation
  const monthlySavings = totalAnnualSavings / 12;
  const monthlySubscriptionCost = annualSubscriptionCost / 12;

  const breakevenMonth =
    monthlySavings > monthlySubscriptionCost
      ? Math.max(
          0.1,
          oneOffImplementationCost / (monthlySavings - monthlySubscriptionCost),
        )
      : 12;

  return {
    totalAnnualSavings,
    roiMultiple,
    breakevenMonth,

    // Cost breakdown
    timeSavingsCost,
    allocativeEfficiencySavings,
    skillMixSavings,
    turnoverReductionSavings,

    // Investment details
    annualSubscriptionCost,
    oneOffImplementationCost,
    firstYearTotalCost,
    implementationDays,
  };
}

export function calculateScaledRosteringDays(
  baseRosteringDays: number,
  employees: number,
  rosterCycleWeeks: number,
  industryConfig: IndustryConfig,
): number {
  const defaultEmployees = industryConfig.defaultEmployees || 50;
  const defaultCycleWeeks = industryConfig.defaultCycleWeeks || 4;

  // Scale based on employee count
  const employeeMultiplier =
    Math.max(0, employees) / Math.max(1, defaultEmployees);

  // Scale based on roster cycle: add 1 day for every 100% increase from default cycle
  const cycleMultiplier = rosterCycleWeeks / defaultCycleWeeks;
  const cycleAdjustment =
    cycleMultiplier > 1 ? Math.floor(cycleMultiplier - 1) : 0;

  return Math.max(
    0.1,
    (baseRosteringDays + cycleAdjustment) * (0.8 + 0.2 * employeeMultiplier),
  );
}
