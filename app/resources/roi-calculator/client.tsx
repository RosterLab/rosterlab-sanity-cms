"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { HiInformationCircle } from "react-icons/hi";

export default function ROICalculatorClient() {
  // Input states
  const [industry, setIndustry] = useState("nursing");
  const [employees, setEmployees] = useState(50);
  const [avgHourlyWage, setAvgHourlyWage] = useState(120);
  const [annualSalary, setAnnualSalary] = useState(120 * 2080); // Annual salary correlated with hourly wage
  const [rosterCycleWeeks, setRosterCycleWeeks] = useState(6); // 6-week roster cycle default
  const [baseRosteringDays, setBaseRosteringDays] = useState(5); // Base days before scaling
  const [rosteringDaysInput, setRosteringDaysInput] = useState(""); // Track input value separately
  const [manualRosteringDays, setManualRosteringDays] = useState<number | null>(null); // Manual override
  const [overtimePercentage, setOvertimePercentage] = useState(5);
  const [turnoverRate, setTurnoverRate] = useState(15);
  
  // Input state tracking for better UX
  const [employeesInput, setEmployeesInput] = useState("");
  const [hourlyWageInput, setHourlyWageInput] = useState("");
  const [annualSalaryInput, setAnnualSalaryInput] = useState("");

  // Form states
  const [showReportForm, setShowReportForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Industry configurations
  const industryConfigs = {
    nursing: {
      name: "Nursing",
      schedulingComplexity: 1.2,
      overtimeReduction: 0.45,
      turnoverReduction: 0.3,
      defaultOvertime: 8,
      defaultTurnover: 15,
      defaultEmployees: 40,
      defaultHourlyWage: 60,
      defaultCycleWeeks: 4,
      defaultRosteringDays: 4,
      implementationDays: 3,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 91179,
      avgFTE: 0.86,
      inefficiency: 0.03,
      baseCost: 2352,
      baseSaving: 470.48,
      overtimePenalty: 1.20,
      overtimeCost: 847,
      locumEfficiency: 1.20,
      locumCost: 423,
      totalSaving: 3623,
      // Skill mix data
      lowestPay: 242249,
      highestPay: 488593,
      weekendPenalty: 1.2,
      weekendShiftCost: 22171,
      weekendSaving: 2217,
      nightPenalty: 1.2,
      nightShiftCost: 27919,
      nightSaving: 2792,
      skillMixTotalPerStaff: 5009,
      // Turnover data
      turnoverCostPerRole: 30000,
      turnoverRate: 0.15,
      turnoverImprovement: 0.05,
      hiringAdminCost: 230,
      turnoverTotalSaving: 9180,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 7692,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 884.62,
    },
    "acute-specialities": {
      name: "Acute",
      schedulingComplexity: 1.35,
      overtimeReduction: 0.45,
      turnoverReduction: 0.25,
      defaultOvertime: 9,
      defaultTurnover: 8,
      defaultEmployees: 50,
      defaultHourlyWage: 130,
      defaultCycleWeeks: 12,
      defaultRosteringDays: 10,
      implementationDays: 4,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 150000,
      avgFTE: 0.90,
      inefficiency: 0.015,
      baseCost: 2025,
      baseSaving: 405,
      overtimePenalty: 1.20,
      overtimeCost: 729,
      locumEfficiency: 1.20,
      locumCost: 365,
      totalSaving: 3119,
      // Skill mix data
      lowestPay: 238498,
      highestPay: 471906,
      weekendPenalty: 1.2,
      weekendShiftCost: 21007,
      weekendSaving: 2101,
      nightPenalty: 1.2,
      nightShiftCost: 26453,
      nightSaving: 2645,
      skillMixTotalPerStaff: 4746,
      // Turnover data
      turnoverCostPerRole: 80000,
      turnoverRate: 0.08,
      turnoverImprovement: 0.05,
      hiringAdminCost: 320,
      turnoverTotalSaving: 16000,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 7692,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 884.62,
    },
    "medicine-specialities": {
      name: "Medicine",
      schedulingComplexity: 1.3,
      overtimeReduction: 0.4,
      turnoverReduction: 0.2,
      defaultOvertime: 7,
      defaultTurnover: 12,
      defaultEmployees: 40,
      defaultHourlyWage: 130,
      defaultCycleWeeks: 12,
      defaultRosteringDays: 8,
      implementationDays: 5,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 150000,
      avgFTE: 0.90,
      inefficiency: 0.015,
      baseCost: 2025,
      baseSaving: 405,
      overtimePenalty: 1.30,
      overtimeCost: 790,
      locumEfficiency: 1.30,
      locumCost: 395,
      totalSaving: 3210,
      // Skill mix data
      lowestPay: 302900,
      highestPay: 635996,
      weekendPenalty: 1.2,
      weekendShiftCost: 29979,
      weekendSaving: 2998,
      nightPenalty: 1.2,
      nightShiftCost: 37751,
      nightSaving: 3775,
      skillMixTotalPerStaff: 6773,
      // Turnover data
      turnoverCostPerRole: 80000,
      turnoverRate: 0.12,
      turnoverImprovement: 0.05,
      hiringAdminCost: 480,
      turnoverTotalSaving: 19200,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 7692,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 884.62,
    },
    "allied-health": {
      name: "Allied Health",
      schedulingComplexity: 1.25,
      overtimeReduction: 0.4,
      turnoverReduction: 0.2,
      defaultOvertime: 6,
      defaultTurnover: 18,
      defaultEmployees: 80,
      defaultHourlyWage: 60,
      defaultCycleWeeks: 4,
      defaultRosteringDays: 9,
      implementationDays: 5,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 100000,
      avgFTE: 0.90,
      inefficiency: 0.02,
      baseCost: 1800,
      baseSaving: 360,
      overtimePenalty: 1.20,
      overtimeCost: 648,
      locumEfficiency: 1.20,
      locumCost: 324,
      totalSaving: 2772,
      // Skill mix data
      lowestPay: 70690,
      highestPay: 121356,
      weekendPenalty: 1.5,
      weekendShiftCost: 5700,
      weekendSaving: 570,
      nightPenalty: 1.25,
      nightShiftCost: 5981,
      nightSaving: 598,
      skillMixTotalPerStaff: 1168,
      // Turnover data
      turnoverCostPerRole: 40000,
      turnoverRate: 0.18,
      turnoverImprovement: 0.10,
      hiringAdminCost: 720,
      turnoverTotalSaving: 36000,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 3846,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 500.00,
    },
    midwives: {
      name: "Midwives",
      schedulingComplexity: 1.2,
      overtimeReduction: 0.4,
      turnoverReduction: 0.25,
      defaultOvertime: 7,
      defaultTurnover: 15,
      defaultEmployees: 50,
      defaultHourlyWage: 60,
      defaultCycleWeeks: 4,
      defaultRosteringDays: 4,
      implementationDays: 3,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 110000,
      avgFTE: 0.80,
      inefficiency: 0.015,
      baseCost: 1320,
      baseSaving: 264,
      overtimePenalty: 1.20,
      overtimeCost: 475,
      locumEfficiency: 1.20,
      locumCost: 238,
      totalSaving: 2033,
      // Skill mix data
      lowestPay: 90000,
      highestPay: 130000,
      weekendPenalty: 1.5,
      weekendShiftCost: 4500,
      weekendSaving: 450,
      nightPenalty: 1.25,
      nightShiftCost: 4722,
      nightSaving: 472,
      skillMixTotalPerStaff: 922,
      // Turnover data
      turnoverCostPerRole: 30000,
      turnoverRate: 0.15,
      turnoverImprovement: 0.05,
      hiringAdminCost: 225,
      turnoverTotalSaving: 11250,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 3846,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 500.00,
    },
    veterinary: {
      name: "Veterinary",
      schedulingComplexity: 1.2,
      overtimeReduction: 0.4,
      turnoverReduction: 0.25,
      defaultOvertime: 7,
      defaultTurnover: 14,
      defaultEmployees: 50,
      defaultHourlyWage: 60,
      defaultCycleWeeks: 4,
      defaultRosteringDays: 4,
      implementationDays: 3,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 110000,
      avgFTE: 0.85,
      inefficiency: 0.02,
      baseCost: 1870,
      baseSaving: 374,
      overtimePenalty: 1.20,
      overtimeCost: 673,
      locumEfficiency: 1.20,
      locumCost: 337,
      totalSaving: 2880,
      // Skill mix data
      lowestPay: 90000,
      highestPay: 130000,
      weekendPenalty: 1.5,
      weekendShiftCost: 4500,
      weekendSaving: 450,
      nightPenalty: 1.25,
      nightShiftCost: 4722,
      nightSaving: 472,
      skillMixTotalPerStaff: 922,
      // Turnover data
      turnoverCostPerRole: 80000,
      turnoverRate: 0.14,
      turnoverImprovement: 0.05,
      hiringAdminCost: 560,
      turnoverTotalSaving: 28000,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 3846,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 500.00,
    },
    surgical: {
      name: "Surgical",
      schedulingComplexity: 1.3,
      overtimeReduction: 0.4,
      turnoverReduction: 0.2,
      defaultOvertime: 7,
      defaultTurnover: 12,
      defaultEmployees: 30,
      defaultHourlyWage: 120,
      defaultCycleWeeks: 4,
      defaultRosteringDays: 3,
      implementationDays: 4,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 250000,
      avgFTE: 0.90,
      inefficiency: 0.01,
      baseCost: 2250,
      baseSaving: 450,
      overtimePenalty: 1.10,
      overtimeCost: 743,
      locumEfficiency: 1.10,
      locumCost: 371,
      totalSaving: 3364,
      // Skill mix data
      lowestPay: 200000,
      highestPay: 300000,
      weekendPenalty: 1.5,
      weekendShiftCost: 10000,
      weekendSaving: 1000,
      nightPenalty: 1.25,
      nightShiftCost: 10500,
      nightSaving: 1050,
      skillMixTotalPerStaff: 2050,
      // Turnover data
      turnoverCostPerRole: 80000,
      turnoverRate: 0.12,
      turnoverImprovement: 0.02,
      hiringAdminCost: 192,
      turnoverTotalSaving: 19200,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 3846,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 500.00,
    },
    "aged-care": {
      name: "Aged care",
      schedulingComplexity: 1.1,
      overtimeReduction: 0.4,
      turnoverReduction: 0.3,
      defaultOvertime: 6,
      defaultTurnover: 25,
      defaultEmployees: 60,
      defaultHourlyWage: 40,
      defaultCycleWeeks: 2,
      defaultRosteringDays: 3,
      implementationDays: 3,
      // Saving categories
      hasManualTimeSaving: true,
      hasStaffingEfficiency: true,
      hasSkillMix: false,
      hasTurnover: true,
      // Staffing efficiency data
      avgSalary: 65000,
      avgFTE: 0.80,
      inefficiency: 0.03,
      baseCost: 1560,
      baseSaving: 312,
      overtimePenalty: 1.50,
      overtimeCost: 702,
      locumEfficiency: 1.50,
      locumCost: 351,
      totalSaving: 2613,
      // Skill mix data
      lowestPay: 66666,
      highestPay: 95238,
      weekendPenalty: 1.5,
      weekendShiftCost: 5417,
      weekendSaving: 542,
      nightPenalty: 1.25,
      nightShiftCost: 5684,
      nightSaving: 568,
      skillMixTotalPerStaff: 1110,
      // Turnover data
      turnoverCostPerRole: 10000,
      turnoverRate: 0.25,
      turnoverImprovement: 0.10,
      hiringAdminCost: 250,
      turnoverTotalSaving: 15000,
      // Leave balance data
      annualLeaveCost: 385,
      annualLeaveReduction: 0.30,
      sickLeaveTotal: 2885,
      sickLeaveReduction: 0.10,
      leaveSavingPerStaff: 403.85,
    },
  };

  const currentIndustry =
    industryConfigs[industry as keyof typeof industryConfigs] || industryConfigs.nursing;

  // Calculations
  // Calculate basic payroll for reference
  const hoursPerWeek = 40; // Standard 40 hours per FTE

  // === 1. MANUAL TIME SPENT ROSTERING ===
  // Days scale with roster size: 20% increase for every default size
  // Calculate total savings based on scaled rostering time
  
  const hoursPerDay = 8;
  const rostersPerYear = 52 / Math.max(1, rosterCycleWeeks);
  const defaultEmployees = currentIndustry.defaultEmployees || 50;
  
  // Scale rostering days based on number of employees AND roster cycle
  // For every multiple of default size, add 20% to rostering time
  const employeeMultiplier = Math.max(0, employees) / Math.max(1, defaultEmployees);
  
  // Use manual override if set, otherwise calculate scaled days
  let scaledRosteringDays: number;
  if (manualRosteringDays !== null) {
    scaledRosteringDays = manualRosteringDays;
  } else {
    // Scale based on roster cycle: add 1 day for every 100% increase from default cycle
    const defaultCycleWeeks = currentIndustry.defaultCycleWeeks || 4;
    const cycleMultiplier = rosterCycleWeeks / defaultCycleWeeks;
    const cycleAdjustment = cycleMultiplier > 1 ? Math.floor(cycleMultiplier - 1) : 0;
    
    scaledRosteringDays = Math.max(0.1, (baseRosteringDays + cycleAdjustment) * (0.8 + 0.2 * employeeMultiplier));
  }
  
  // Total hours spent rostering per year with scaled days
  const annualRosteringHours = scaledRosteringDays * hoursPerDay * rostersPerYear;
  
  // Total annual cost of rostering (scales with employee count due to scaled days)
  const totalAnnualRosteringCost = avgHourlyWage * annualRosteringHours;
  
  // Total savings = total cost × 90% reduction (only if enabled)
  const rosteringImprovement = 0.9; // 90% reduction with RosterLab
  const timeSavingsCost = currentIndustry.hasManualTimeSaving 
    ? totalAnnualRosteringCost * rosteringImprovement 
    : 0;

  // === 2. OPTIMISED STAFFING EFFICIENCY ===
  // Based on industry-specific data with different inefficiency rates and cost structures
  // Formula: Base = AvgSalary × avgFTE × inefficiency%
  // Savings breakdown: Bureau/ordinary hours (20%), Overtime (30%), Locum (15%)
  
  // totalSaving in the config is the per-staff saving amount
  const efficiencySavingsPerPerson = currentIndustry.hasStaffingEfficiency 
    ? (currentIndustry.totalSaving || 0)
    : 0;
  
  // Total savings = number of employees × savings per person
  const allocativeEfficiencySavings = (employees || 0) * efficiencySavingsPerPerson;
  
  // Individual component savings for display purposes
  const baseSavingPerPerson = currentIndustry.baseSaving || 0; // 30% of base inefficiency
  const overtimeSavingPerPerson = (currentIndustry.overtimeCost || 0) * 0.5; // 50% improvement on overtime
  const locumSavingPerPerson = (currentIndustry.locumCost || 0) * 0.2; // 20% improvement on locum
  
  const bureauSavings = (employees || 0) * baseSavingPerPerson;
  const overtimeSavings = (employees || 0) * overtimeSavingPerPerson;
  const locumSavings = (employees || 0) * locumSavingPerPerson;

  // === 3. POOR SKILL MIX ===
  // Based on industry-specific data: Human made rosters have poor skill mix
  // Using industry-specific weekend and night shift penalties and savings
  
  // Weekend savings based on industry-specific data
  const weekendSavings = (employees || 0) * (currentIndustry.weekendSaving || 979);
  
  // Night savings based on industry-specific data
  const nightSavings = (employees || 0) * (currentIndustry.nightSaving || 1027);
  
  // Total skill mix savings using industry-specific total (only if enabled)
  const skillMixSavings = currentIndustry.hasSkillMix 
    ? (employees || 0) * (currentIndustry.skillMixTotalPerStaff || 2007)
    : 0;

  // === 4. UNNECESSARY TURNOVER COSTS ===
  // Based on industry-specific data: Hiring Admin and Orientation Time
  // Uses industry-specific turnover costs and improvement rates
  
  // Calculate turnover reduction savings based on the formula:
  // Total saving = (turnover cost per role × turnover rate × RL improve % × standard size)
  // Then scale by actual employee count
  const turnoverSavingPerPerson = currentIndustry.hasTurnover 
    ? currentIndustry.turnoverTotalSaving / currentIndustry.defaultEmployees
    : 0;
  const turnoverReductionSavings = (employees || 0) * turnoverSavingPerPerson;
  
  // Note: Studies show self-rostering and improving roster quality reduces staff turnover
  // RosterLab research: 1 less turnover per 40 staff provides significant value

  // === TOTAL ANNUAL SAVINGS ===
  const totalAnnualSavings =
    timeSavingsCost + 
    allocativeEfficiencySavings + 
    skillMixSavings +
    turnoverReductionSavings;
  
  // RosterLab costs: Subscription + One-off implementation
  const annualSubscriptionCost = (employees || 0) * 20 * 12; // $20 × employees × 12 months
  
  // Scale implementation days based on employee count
  // Add 1 day for every 100% increase from default size
  const baseImplementationDays = currentIndustry.implementationDays || 3;
  const employeeRatio = employees / defaultEmployees;
  const additionalDays = Math.floor(Math.max(0, employeeRatio - 1)); // Add 1 day per 100% increase
  const implementationDays = baseImplementationDays + additionalDays;
  
  const oneOffImplementationCost = implementationDays * 1500; // $1,500 per implementation day
  const firstYearTotalCost = annualSubscriptionCost + oneOffImplementationCost;
  
  // For ROI calculation, we'll use the first year total cost (subscription + implementation)
  const roiMultiple = firstYearTotalCost > 0 && totalAnnualSavings > 0 ? (totalAnnualSavings / firstYearTotalCost).toFixed(1) : "0";
  
  // Calculate breakeven month considering implementation cost
  // Monthly savings
  const monthlySavings = totalAnnualSavings / 12;
  // Monthly subscription cost
  const monthlySubscriptionCost = annualSubscriptionCost / 12;
  
  // Breakeven calculation: Implementation cost + (months × monthly subscription) = months × monthly savings
  // Solving for months: months = implementation cost / (monthly savings - monthly subscription)
  const breakevenMonth = monthlySavings > monthlySubscriptionCost 
    ? Math.max(0.1, oneOffImplementationCost / (monthlySavings - monthlySubscriptionCost))
    : 12; // If monthly costs exceed savings, default to 12 months

  // Update default values when industry changes
  useEffect(() => {
    const config = industryConfigs[industry as keyof typeof industryConfigs];
    setOvertimePercentage(config.defaultOvertime);
    setTurnoverRate(config.defaultTurnover);
    setEmployees(config.defaultEmployees);
    setAvgHourlyWage(config.defaultHourlyWage);
    setAnnualSalary(config.defaultHourlyWage * 2080);
    setRosterCycleWeeks(config.defaultCycleWeeks);
    setBaseRosteringDays(config.defaultRosteringDays || 1);
    // Clear all inputs when industry changes
    setRosteringDaysInput("");
    setEmployeesInput("");
    setHourlyWageInput("");
    setAnnualSalaryInput("");
    setManualRosteringDays(null); // Clear manual override
  }, [industry]);

  const generatePDF = useCallback(
    async (companyName: string = "") => {
      try {
        // Dynamically import jsPDF to avoid SSR issues
        const { default: jsPDF } = await import("jspdf");

        const doc = new jsPDF();

        // Set font sizes and colors
        const primaryColor: [number, number, number] = [41, 98, 255]; // RosterLab blue
        const textColor: [number, number, number] = [51, 51, 51];
        const lightGray: [number, number, number] = [128, 128, 128];

        // Add RosterLab logo
        try {
          // Convert logo to base64
          const logoUrl = "/images/rosterlab-logo.png";
          const logoResponse = await fetch(logoUrl);
          const logoBlob = await logoResponse.blob();
          const logoBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(logoBlob);
          });

          // Add logo with better aspect ratio (adjust width to maintain proportions)
          doc.addImage(logoBase64, "PNG", 20, 10, 45, 12);
        } catch {
          // Fallback if logo fails to load
          doc.setFontSize(24);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text("RosterLab ROI Report", 20, 25);
        }

        // Date only
        doc.setFontSize(9);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 28);

        // Draw a line
        doc.setLineWidth(0.5);
        doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.line(20, 30, 190, 30);

        // ROI Report Title
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("ROI Report", 20, 38);

        // Executive Summary Box
        doc.setFillColor(240, 248, 255); // Light blue background
        doc.roundedRect(15, 42, 180, 28, 3, 3, 'F');
        
        doc.setFontSize(12);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Executive Summary", 20, 50);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(
          `Total Annual Savings: $${totalAnnualSavings.toLocaleString()}`,
          20,
          58
        );
        doc.setTextColor(34, 139, 34); // Forest green for ROI
        doc.text(`ROI in Year 1: ${roiMultiple}x`, 20, 65);
        doc.setFont("helvetica", "normal");

        // Your Organisation Details with left border
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(3);
        doc.line(15, 75, 15, 100);
        
        doc.setFontSize(12);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("See how RosterLab can save", 20, 78);

        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(`Roster Type: ${currentIndustry.name}`, 25, 86);
        doc.text(`Number of Employees: ${employees}`, 25, 92);
        doc.text(`Rosterer Hourly Wage: $${avgHourlyWage}/hour`, 110, 86);
        doc.text(
          `Roster Cycle: Every ${rosterCycleWeeks} week${rosterCycleWeeks > 1 ? 's' : ''}`,
          110,
          92
        );
        doc.text(
          `Days Spent per Roster: ${scaledRosteringDays.toFixed(1)} day${scaledRosteringDays > 1 ? 's' : ''}`,
          25,
          98
        );

        // Add extra gap before Savings Breakdown
        let yPos = 112; // Increased from 105 to add more space
        
        // Savings Breakdown Header
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.rect(15, yPos, 180, 8, 'F');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.text("Detailed Savings Breakdown (Estimated)", 20, yPos + 5);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);

        yPos += 15; // Adjust starting position for content
        let categoryNum = 1;

        // 1. MANUAL TIME SPENT ROSTERING
        if (currentIndustry.hasManualTimeSaving) {
          // Savings category box - increased height for more content
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(18, yPos - 4, 174, 52, 2, 2, 'F');
          
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(`${categoryNum}. Manual Time Spent Rostering`, 22, yPos + 2);
          
          doc.setFont("helvetica", "bold");
          doc.setTextColor(34, 139, 34);
          doc.text(
            `$${timeSavingsCost.toLocaleString()}/year`,
            155,
            yPos + 2
          );
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(80, 80, 80);
          const manualTimeLines = doc.splitTextToSize(
            "We save you time from the very first roster. As your rostering requirements become more settled, you'll see even greater time savings. Based on our experience across a wide range of healthcare rosters, we reduce the time spent creating and managing rosters by 80–90%, freeing you to focus on what matters most.",
            155
          );
          
          let manualLineOffset = 11;
          manualTimeLines.forEach((line: string) => {
            doc.text(line, 28, yPos + manualLineOffset);
            manualLineOffset += 4;
          });
          
          // Add case study link
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8);
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.textWithLink(
            "Case study: Sydney Tertiary Hospital saves 300+ hours a year",
            28,
            yPos + manualLineOffset + 2,
            { url: "https://rosterlab.com/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering" }
          );
          yPos += 56;
          categoryNum++;
        }

        // 2. OPTIMISED STAFFING EFFICIENCY
        if (currentIndustry.hasStaffingEfficiency) {
          // Staffing efficiency box with different color - increased height
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(18, yPos - 4, 174, 50, 2, 2, 'F');
          
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(`${categoryNum}. Optimised Staffing`, 22, yPos + 2);
          
          doc.setFont("helvetica", "bold");
          doc.setTextColor(34, 139, 34);
          doc.text(
            `$${allocativeEfficiencySavings.toLocaleString()}/year`,
            155,
            yPos + 2
          );
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(80, 80, 80);
          // Split the explanation text into multiple lines for better formatting
          const explanationLines = doc.splitTextToSize(
            "By allocating shifts and tasks with precision, we maximize roster efficiency, cutting unnecessary overtime costs, reducing expensive locum usage, and ensuring optimal staffing for every shift. Our system safeguards continuity of care and maintains the right skill mix, preventing costly errors and service gaps. With real-time insights into staffing quality and coverage, you can identify inefficiencies immediately and take corrective action before they impact patient care or budgets.",
            155
          );
          
          let lineOffset = 11;
          explanationLines.forEach((line: string) => {
            doc.text(line, 28, yPos + lineOffset);
            lineOffset += 4;
          });
          
          yPos += 54;
          categoryNum++;
        }

        // No page break needed for 2-page layout

        // 3. SKILL MIX
        if (currentIndustry.hasSkillMix) {
          // Skill mix savings box
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(18, yPos - 4, 174, 26, 2, 2, 'F');
          
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(`${categoryNum}. Improved Skill Mix`, 22, yPos + 2);
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.text(
            `15% reduction in temporary staff usage`,
            28,
            yPos + 9
          );
          doc.setFont("helvetica", "bold");
          doc.setTextColor(34, 139, 34);
          doc.text(
            `$${skillMixSavings.toLocaleString()}/year`,
            155,
            yPos + 2
          );
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          doc.text(
            `Temp staff costs 50% more than permanent staff`,
            28,
            yPos + 16
          );
          yPos += 30;
          categoryNum++;
        }

        // 4. TURNOVER COSTS
        if (currentIndustry.hasTurnover) {
          // Turnover savings box with explanation
          doc.setFillColor(250, 250, 250);
          doc.roundedRect(18, yPos - 4, 174, 38, 2, 2, 'F');
          
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.text(`${categoryNum}. Reduced Turnover Costs`, 22, yPos + 2);
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.text(
            `This represents an improvement in staff retention`,
            28,
            yPos + 9
          );
          doc.setFont("helvetica", "bold");
          doc.setTextColor(34, 139, 34);
          doc.text(
            `$${turnoverReductionSavings.toLocaleString()}/year`,
            155,
            yPos + 2
          );
          
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(80, 80, 80);
          // Split the explanation text into multiple lines
          const turnoverExplanationLines = doc.splitTextToSize(
            "Reducing staff turnover delivers significant cost savings by avoiding the expenses of recruitment, onboarding, training, and the temporary drop in productivity that follows. By improving shift worker satisfaction, we not only retain valuable team members but also enable them to focus on delivering their best work.",
            155
          );
          
          let turnoverLineOffset = 16;
          turnoverExplanationLines.forEach((line: string) => {
            doc.text(line, 28, yPos + turnoverLineOffset);
            turnoverLineOffset += 4;
          });
          
          yPos += 42;
          categoryNum++;
        }


        // Add 'Some other benefits' section
        yPos += 8;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Some other benefits:", 20, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        
        // Benefit 1: Smarter workforce planning
        yPos += 8;
        doc.setFont("helvetica", "bold");
        doc.text("Smarter workforce planning", 20, yPos);
        doc.setFont("helvetica", "normal");
        const benefit1Text = "A streamlined rostering solution gives managers the insights and tools to allocate shifts strategically, align staffing with demand, and prevent the buildup of unused leave balances. This maximizes workforce utilization while delivering measurable cost savings.";
        const benefit1Lines = doc.splitTextToSize(benefit1Text, 165);
        let benefit1Offset = 6;
        benefit1Lines.forEach((line: string) => {
          doc.text(line, 20, yPos + benefit1Offset);
          benefit1Offset += 4;
        });
        
        // Footer at bottom of page 1
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(8);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(
          "www.rosterlab.com",
          20,
          pageHeight - 15
        );
        
        // Start page 2
        doc.addPage();
        yPos = 20;
        
        // Continue with remaining benefits on page 2
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Some other benefits (continued):", 20, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        
        // Benefit 2: Stronger employee engagement
        yPos += 8;
        doc.setFont("helvetica", "bold");
        doc.text("Stronger employee engagement", 20, yPos);
        doc.setFont("helvetica", "normal");
        const benefit2Text = "By creating fair, transparent schedules that respect personal preferences, staff feel valued and supported. This boosts morale, increases retention, and builds a more committed and collaborative team culture.";
        const benefit2Lines = doc.splitTextToSize(benefit2Text, 165);
        let benefit2Offset = 6;
        benefit2Lines.forEach((line: string) => {
          doc.text(line, 20, yPos + benefit2Offset);
          benefit2Offset += 4;
        });
        yPos += benefit2Offset + 4;
        
        // Benefit 3: Sustained performance and wellbeing
        doc.setFont("helvetica", "bold");
        doc.text("Sustained performance and wellbeing", 20, yPos);
        doc.setFont("helvetica", "normal");
        const benefit3Text = "Optimized shift structures ensure adequate rest, balanced workloads, and compliance with fatigue-management best practices. This supports staff health, reduces absenteeism, and enables consistently high-quality performance.";
        const benefit3Lines = doc.splitTextToSize(benefit3Text, 165);
        let benefit3Offset = 6;
        benefit3Lines.forEach((line: string) => {
          doc.text(line, 20, yPos + benefit3Offset);
          benefit3Offset += 4;
        });
        
        yPos += benefit3Offset + 10;
        
        // RosterLab Investment Section with accent background
        doc.setFillColor(255, 245, 230); // Light orange background
        doc.roundedRect(15, yPos - 5, 180, 30, 3, 3, 'F');
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("RosterLab Investment", 20, yPos + 2);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(
          `Annual Subscription: $${annualSubscriptionCost.toLocaleString()}`,
          25,
          yPos + 9
        );
        doc.text(
          `($20 per employee per month)`,
          110,
          yPos + 9
        );
        doc.text(
          `One-off Implementation: $${oneOffImplementationCost.toLocaleString()}*`,
          25,
          yPos + 16
        );
        const baseImplDays = currentIndustry.implementationDays || 3;
        const daysText = implementationDays > baseImplDays 
          ? `(${implementationDays} days scaled for ${employees} employees)`
          : `(estimate: ${implementationDays} days × $1,500/day)`;
        doc.text(
          daysText,
          110,
          yPos + 16
        );
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 69, 0); // Orange-red for total
        doc.text(
          `First Year Total: $${firstYearTotalCost.toLocaleString()}`,
          25,
          yPos + 23
        );
        
        // Add asterisk note
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `*Final implementation cost will be confirmed after demo and scoping session`,
          20,
          yPos + 32
        );
        
        yPos += 42;
        
        // Key Insights with icon bullets
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Key Insights", 20, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        
        // Add check marks as bullets
        doc.setTextColor(34, 139, 34);
        doc.text(`✓`, 20, yPos + 8);
        doc.text(`✓`, 20, yPos + 15);
        doc.text(`✓`, 20, yPos + 22);
        doc.text(`✓`, 20, yPos + 29);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(`Based on comprehensive industry data and research`, 28, yPos + 8);
        doc.text(`Key areas where manual rosters underperform vs RosterLab`, 28, yPos + 15);
        doc.text(`Staff turnover costs ${currentIndustry.turnoverCostPerRole ? `$${currentIndustry.turnoverCostPerRole.toLocaleString()}` : 'significant amount'} per role in ${currentIndustry.name}`, 28, yPos + 22);
        doc.text(`Total ROI based on validated industry-specific data`, 28, yPos + 29);
        
        // Next Steps section
        yPos += 38;
        
        // Next Steps with gradient-like background
        doc.setFillColor(240, 248, 255);
        doc.roundedRect(15, yPos - 5, 180, 35, 3, 3, 'F');
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Next Steps", 20, yPos + 2);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);

        // Add numbered circles for steps
        doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.circle(23, yPos + 10, 2, 'F');
        doc.circle(23, yPos + 17, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text("1", 22.3, yPos + 10.5);
        doc.text("2", 22.3, yPos + 17.5);
        
        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        
        // First step with link
        const step1Start = "Schedule a ";
        const step1End = " with our team";
        doc.text(step1Start, 28, yPos + 11);
        const step1Width = doc.getTextWidth(step1Start);

        // Add clickable link for "personalised demo"
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.textWithLink("personalised demo", 28 + step1Width, yPos + 11, {
          url: "https://www.rosterlab.com/book-a-demo",
        });
        const linkWidth = doc.getTextWidth("personalised demo");

        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(step1End, 28 + step1Width + linkWidth, yPos + 11);
        
        doc.text(
          "Get a custom implementation plan for your organisation",
          28,
          yPos + 18
        );

        // Contact Information Box
        yPos += 28;
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(15, yPos - 3, 180, 15, 2, 2, 'F');
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("Contact Us:", 20, yPos + 4);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text("sales@rosterlab.com", 55, yPos + 4);
        doc.text("|", 115, yPos + 4);
        doc.text("www.rosterlab.com", 120, yPos + 4);

        // Footer at bottom of page 2
        doc.setFontSize(8);
        doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        doc.text(
          "This ROI calculation is based on RosterLab research and industry data. Actual results may vary.",
          20,
          pageHeight - 15
        );

        // Save the PDF
        doc.save(
          `RosterLab-ROI-Report-${companyName.replace(/[^a-z0-9]/gi, "_")}.pdf`
        );

        return true;
      } catch (error) {
        console.error("Error generating PDF:", error);
        // Fallback to text download if PDF generation fails
        const report = `
RosterLab ROI Report
Generated for: ${companyName}

Your Inputs:
- Roster Type: ${currentIndustry.name}
- Employees: ${employees}
- Rosterer Hourly Wage: $${avgHourlyWage}
- Roster Cycle: Every ${rosterCycleWeeks} week${rosterCycleWeeks > 1 ? 's' : ''}
- Days per Roster: ${scaledRosteringDays.toFixed(1)} day${scaledRosteringDays > 1 ? 's' : ''}

Your Potential Savings:
- Total Annual Savings: $${totalAnnualSavings.toLocaleString()}
- ROI in Year 1: ${roiMultiple}x

RosterLab Investment:
- Annual Subscription: $${annualSubscriptionCost.toLocaleString()} ($20 per employee per month)
- One-off Implementation: $${oneOffImplementationCost.toLocaleString()} (${implementationDays} days at $1,500/day)
- First Year Total Investment: $${firstYearTotalCost.toLocaleString()}

Savings Breakdown:
${currentIndustry.hasManualTimeSaving ? `1. Manual Time Spent Rostering: $${timeSavingsCost.toLocaleString()}
   - 90% reduction in administrative time (${scaledRosteringDays.toFixed(1)} days every ${rosterCycleWeeks} weeks)
` : ''}${currentIndustry.hasStaffingEfficiency ? `${currentIndustry.hasManualTimeSaving ? '2' : '1'}. Optimised Staffing Efficiency: $${allocativeEfficiencySavings.toLocaleString()}
   - By allocating shifts and tasks more optimally, we increase the overall efficiency of the roster, reducing unnecessary overtime and the need to call in locums - helping your department run smoothly without the stress of operational nuances.
` : ''}${currentIndustry.hasSkillMix ? `${currentIndustry.hasManualTimeSaving && currentIndustry.hasStaffingEfficiency ? '3' : currentIndustry.hasManualTimeSaving || currentIndustry.hasStaffingEfficiency ? '2' : '1'}. Improved Skill Mix: $${skillMixSavings.toLocaleString()}
   - Weekend shifts (10% improvement): $${weekendSavings.toLocaleString()}
   - Night shifts (10% improvement): $${nightSavings.toLocaleString()}
` : ''}${currentIndustry.hasTurnover ? `${(() => {
  let num = 1;
  if (currentIndustry.hasManualTimeSaving) num++;
  if (currentIndustry.hasStaffingEfficiency) num++;
  if (currentIndustry.hasSkillMix) num++;
  return num;
})()}. Reduced Turnover Costs: $${turnoverReductionSavings.toLocaleString()}
   - Hiring and orientation savings ($${currentIndustry.turnoverCostPerRole} per person, ${((currentIndustry.turnoverImprovement || 0.1) * 100).toFixed(0)}% improvement)` : ''}

      `;

        const blob = new Blob([report], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rosterlab-roi-report.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        return false;
      }
    },
    [
      totalAnnualSavings,
      roiMultiple,
      employees,
      avgHourlyWage,
      rosterCycleWeeks,
      scaledRosteringDays,
      currentIndustry,
      allocativeEfficiencySavings,
      nightSavings,
      skillMixSavings,
      timeSavingsCost,
      turnoverReductionSavings,
      weekendSavings,
      annualSubscriptionCost,
      oneOffImplementationCost,
      firstYearTotalCost,
      implementationDays,
    ]
  );

  // Load HubSpot form when modal opens
  useEffect(() => {
    if (showReportForm) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Check if HubSpot is already loaded
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: "20646833",
            formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
            region: "na1",
            target: "#hubspot-form-container",
            onFormSubmitted: async (formData: any) => {
              // Hide the form immediately after submission
              const formContainer = document.getElementById(
                "hubspot-form-container"
              );
              if (formContainer) {
                formContainer.style.display = "none";
              }

              // Get the company name from the form submission
              const companyField = formData.submissionValues?.company || "";

              // Generate and download the PDF
              setIsSubmitting(true);
              const success = await generatePDF(companyField);
              setIsSubmitting(false);

              if (success) {
                // Close the modal after a short delay
                setTimeout(() => {
                  setShowReportForm(false);
                  alert("Your personalised ROI report has been downloaded!");
                }, 1000);
              }
            },
          });
          return;
        }

        // Load HubSpot forms script
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/embed/v2.js";
        script.charset = "utf-8";
        script.type = "text/javascript";

        script.onload = () => {
          if (window.hbspt && window.hbspt.forms) {
            window.hbspt.forms.create({
              portalId: "20646833",
              formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
              region: "na1",
              target: "#hubspot-form-container",
              onFormSubmitted: async (formData: any) => {
                // Hide the form immediately after submission
                const formContainer = document.getElementById(
                  "hubspot-form-container"
                );
                if (formContainer) {
                  formContainer.style.display = "none";
                }

                // Get the company name from the form submission
                const companyField =
                  formData.submissionValues?.company || "Your Company";

                // Generate and download the PDF
                setIsSubmitting(true);
                const success = await generatePDF(companyField);
                setIsSubmitting(false);

                if (success) {
                  // Close the modal after a short delay
                  setTimeout(() => {
                    setShowReportForm(false);
                    alert("Your personalised ROI report has been downloaded!");
                  }, 1000);
                }
              },
            });
          }
        };

        document.body.appendChild(script);
      }, 100); // 100ms delay to ensure DOM is ready

      // Cleanup function
      return () => {
        // Clear the timer
        clearTimeout(timer);

        // Remove the form container's content when unmounting
        const formContainer = document.getElementById("hubspot-form-container");
        if (formContainer) {
          formContainer.innerHTML = "";
          formContainer.style.display = "block"; // Reset display property
        }
      };
    }
  }, [showReportForm, generatePDF]);

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                ROI Calculator
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover how much time and money RosterLab can save your
                organisation with intelligent scheduling automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/pricing"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  View Pricing
                </Button>
                <Button
                  href="/book-a-demo"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/illustration/Coins-rafiki.svg"
                alt="ROI Calculator illustration"
                width={500}
                height={375}
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  See how RosterLab can save
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  We estimated your ROI based on our experience with different specialties in healthcare and research on industry standards.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What types of healthcare specialties are you rostering for?
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="nursing">Nursing</option>
                      <option value="acute-specialities">Acute</option>
                      <option value="medicine-specialities">Medicine</option>
                      <option value="allied-health">Allied Health</option>
                      <option value="aged-care">Aged Care</option>
                      <option value="midwives">Midwives</option>
                      <option value="veterinary">Veterinary</option>
                      <option value="surgical">Surgical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of employees
                    </label>
                    <input
                      type="number"
                      value={employeesInput !== "" ? employeesInput : employees}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEmployeesInput(val);
                        if (val !== '') {
                          const numVal = Math.max(0, Number(val));
                          setEmployees(numVal);
                          setRosteringDaysInput(""); // Clear input when employees change
                          setManualRosteringDays(null); // Clear manual override
                        } else {
                          setEmployees(0); // Set to 0 when empty to maintain calculations
                        }
                      }}
                      onBlur={() => {
                        if (employeesInput === '') {
                          setEmployees(currentIndustry.defaultEmployees || 50);
                        } else {
                          const numVal = Math.max(0, Number(employeesInput));
                          setEmployees(numVal);
                        }
                        setEmployeesInput("");
                      }}
                      onFocus={(e) => {
                        e.target.select();
                        setEmployeesInput(e.target.value);
                      }}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average hourly wage ($) for rosterer
                    </label>
                    <input
                      type="number"
                      value={hourlyWageInput !== "" ? hourlyWageInput : avgHourlyWage}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHourlyWageInput(val);
                        if (val !== '') {
                          const hourly = Math.max(0, Number(val));
                          setAvgHourlyWage(hourly);
                          setAnnualSalary(hourly * 2080);
                          setAnnualSalaryInput(""); // Clear annual salary input
                        } else {
                          setAvgHourlyWage(0);
                          setAnnualSalary(0);
                        }
                      }}
                      onBlur={() => {
                        if (hourlyWageInput === '') {
                          setAvgHourlyWage(currentIndustry.defaultHourlyWage || 50);
                          setAnnualSalary((currentIndustry.defaultHourlyWage || 50) * 2080);
                        } else {
                          const hourly = Math.max(0, Number(hourlyWageInput));
                          setAvgHourlyWage(hourly);
                          setAnnualSalary(hourly * 2080);
                        }
                        setHourlyWageInput("");
                      }}
                      onFocus={(e) => {
                        e.target.select();
                        setHourlyWageInput(e.target.value);
                      }}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual salary ($) for rosterer
                    </label>
                    <input
                      type="number"
                      value={annualSalaryInput !== "" ? annualSalaryInput : annualSalary}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAnnualSalaryInput(val);
                        if (val !== '') {
                          const annual = Math.max(0, Number(val));
                          setAnnualSalary(annual);
                          setAvgHourlyWage(Math.round((annual / 2080) * 10) / 10);
                          setHourlyWageInput(""); // Clear hourly wage input
                        } else {
                          setAnnualSalary(0);
                          setAvgHourlyWage(0);
                        }
                      }}
                      onBlur={() => {
                        if (annualSalaryInput === '') {
                          const defaultHourly = currentIndustry.defaultHourlyWage || 50;
                          setAnnualSalary(defaultHourly * 2080);
                          setAvgHourlyWage(defaultHourly);
                        } else {
                          const annual = Math.max(0, Number(annualSalaryInput));
                          setAnnualSalary(annual);
                          setAvgHourlyWage(Math.round((annual / 2080) * 10) / 10);
                        }
                        setAnnualSalaryInput("");
                      }}
                      onFocus={(e) => {
                        e.target.select();
                        setAnnualSalaryInput(e.target.value);
                      }}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roster cycle frequency
                    </label>
                    <select
                      value={rosterCycleWeeks}
                      onChange={(e) => {
                        setRosterCycleWeeks(Number(e.target.value));
                        setManualRosteringDays(null); // Clear manual override when cycle changes
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={2}>2 weeks</option>
                      <option value={4}>4 weeks</option>
                      <option value={6}>6 weeks</option>
                      <option value={8}>8 weeks</option>
                      <option value={10}>10 weeks</option>
                      <option value={12}>12 weeks</option>
                      <option value={13}>13 weeks</option>
                      <option value={14}>14 weeks</option>
                      <option value={16}>16 weeks</option>
                      <option value={4.33}>Monthly</option>
                      <option value={52}>Yearly</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      How often do you create new rosters?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days spent creating each roster
                    </label>
                    <input
                      type="number"
                      value={rosteringDaysInput !== "" ? rosteringDaysInput : scaledRosteringDays.toFixed(1)}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRosteringDaysInput(val);
                        if (val !== '') {
                          const newValue = Math.max(0.1, Number(val));
                          // Set manual override value
                          setManualRosteringDays(newValue);
                        } else {
                          // Clear manual override when empty
                          setManualRosteringDays(null);
                        }
                      }}
                      onBlur={() => {
                        // Keep the manual value if user entered one
                        if (rosteringDaysInput !== '') {
                          const newValue = Math.max(0.1, Number(rosteringDaysInput));
                          setManualRosteringDays(newValue);
                        }
                        // Clear the input to show the value
                        setRosteringDaysInput("");
                      }}
                      onFocus={(e) => {
                        e.target.select();
                        setRosteringDaysInput(e.target.value);
                      }}
                      min="0.1"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">
                  Your Potential Savings
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-6">
                      <h3 className="text-3xl font-bold mb-2">
                        ${(totalAnnualSavings && !isNaN(totalAnnualSavings)) ? Math.round(totalAnnualSavings).toLocaleString() : '0'}
                      </h3>
                      <p className="text-blue-100">Total Annual Savings</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6">
                      <h3 className="text-3xl font-bold mb-2">{roiMultiple}x</h3>
                      <p className="text-blue-100">Return on Investment</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Savings Breakdown
                    </h3>

                    {/* 1. Manual Time Spent Rostering */}
                    {currentIndustry.hasManualTimeSaving && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Manual Time Spent Rostering</span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                We assume a roughly 80%-90% time saving on your type of roster
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            ${(timeSavingsCost && !isNaN(timeSavingsCost)) ? Math.round(timeSavingsCost).toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 2. Human made rosters utilise staffing hours inefficiently */}
                    {currentIndustry.hasStaffingEfficiency && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Optimised Staffing</span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                We estimate a 1-3% of better staffing depending on your speciality
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            ${(allocativeEfficiencySavings && !isNaN(allocativeEfficiencySavings)) ? Math.round(allocativeEfficiencySavings).toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 3. Poor skill mix */}
                    {currentIndustry.hasSkillMix && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Improved Skill Mix</span>
                          <span className="text-xl font-semibold">
                            ${(skillMixSavings && !isNaN(skillMixSavings)) ? Math.round(skillMixSavings).toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 4. Unnecessary Turnover Costs */}
                    {currentIndustry.hasTurnover && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Reduced Turnover Costs</span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                We assume a 10% improvement in turnover rate through better work-life balance and fair scheduling
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            ${(turnoverReductionSavings && !isNaN(turnoverReductionSavings)) ? Math.round(turnoverReductionSavings).toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Non-fiscal Benefits */}
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-100">Non-fiscal Benefits</span>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <span className="text-green-400 mr-1">✓</span>
                            <span className="text-blue-100">80% more staff satisfaction</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-400 mr-1">✓</span>
                            <span className="text-blue-100">15% fatigue reduction</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-3">
                      RosterLab Investment
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-100">Annual Subscription</span>
                        <span className="font-semibold">
                          ${(annualSubscriptionCost && !isNaN(annualSubscriptionCost)) ? annualSubscriptionCost.toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-100">
                          One-off Implementation (estimate)
                        </span>
                        <span className="font-semibold">
                          ${(oneOffImplementationCost && !isNaN(oneOffImplementationCost)) ? oneOffImplementationCost.toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="font-medium">First Year Total</span>
                        <span className="text-xl font-semibold">
                          ${(firstYearTotalCost && !isNaN(firstYearTotalCost)) ? firstYearTotalCost.toLocaleString() : '0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => setShowReportForm(true)}
                      className="w-full bg-green-500 text-white hover:bg-green-600 py-3 px-4 rounded-md font-medium transition-colors"
                    >
                      Download Your ROI Report
                    </button>
                    <Button
                      href="/staff-rostering-interactive-demo"
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3"
                    >
                      See How It Works
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Additional Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Improved Compliance
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Automatic enforcement of labour laws, union agreements, and
                    internal policies
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Higher Staff Satisfaction
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fair scheduling and better work-life balance leads to
                    happier teams
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Faster Decision Making
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Real-time insights and scenario planning for better
                    workforce management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Full Width CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of organisations already optimising their scheduling
              with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Contact Us
              </Button>
              <Button
                href="/solutions/ai-staff-scheduling"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Report Download Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Download Your ROI Report
            </h3>
            <p className="text-gray-600 mb-6">
              Get a personalised ROI report showing your potential savings with
              RosterLab.
            </p>

            {/* HubSpot Form Container */}
            <div
              id="hubspot-form-container"
              ref={formContainerRef}
              style={{ minHeight: "100px" }}
            >
              <p className="text-sm text-gray-500 text-center">
                Loading form...
              </p>
            </div>

            {isSubmitting && (
              <div className="text-center py-4">
                <p className="text-gray-600">Generating your report...</p>
              </div>
            )}

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
