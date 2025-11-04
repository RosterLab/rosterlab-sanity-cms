"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HiInformationCircle } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useHubSpotForm } from "@/lib/hooks";
import { PDFGenerator, type PDFReportData } from "@/lib/pdf-generator";
import { industryConfigs } from "@/lib/calculator/industry-configs";
import {
  calculateSavings,
  calculateScaledRosteringDays,
} from "@/lib/calculator/calculator-logic";

// Regional configuration types
interface RegionalContent {
  title: string;
  subtitle: string;
  explanation: string;
  terminology: {
    scheduling: string; // "scheduling" or "rostering"
    schedules: string; // "schedules" or "rosters"
    scheduler: string; // "scheduler" or "rosterer"
  };
  buttons: {
    pricing: string;
    demo: string;
    viewPricing: string;
    seeHowItWorks: string;
    contactUs: string;
    learnMore: string;
  };
  links: {
    pricing: string;
    demo: string;
    productTour: string;
    contact: string;
    solutions: string;
  };
  heroImage?: {
    src: string;
    alt: string;
  };
  industryOptions: Array<{
    value: string;
    label: string;
  }>;
}

interface CalculatorBaseProps {
  region: "us" | "global";
  reportType: "savings" | "roi";
  regionalContent: RegionalContent;
  hubspotConfig: {
    portalId: string;
    formId: string;
  };
  className?: string;
}

export default function CalculatorBase({
  region,
  reportType,
  regionalContent,
  hubspotConfig,
  className = "",
}: CalculatorBaseProps) {
  // Input states
  const [industry, setIndustry] = useState("nursing");
  const [employees, setEmployees] = useState(50);
  const [avgHourlyWage, setAvgHourlyWage] = useState(120);
  const [annualSalary, setAnnualSalary] = useState(120 * 2080);
  const [rosterCycleWeeks, setRosterCycleWeeks] = useState(6);
  const [baseRosteringDays, setBaseRosteringDays] = useState(5);
  const [rosteringDaysInput, setRosteringDaysInput] = useState("");
  const [manualRosteringDays, setManualRosteringDays] = useState<number | null>(
    null,
  );
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

  // Get current industry configuration
  const currentIndustry = industryConfigs[industry] || industryConfigs.nursing;

  // Calculate scaled rostering days
  const scaledRosteringDays =
    manualRosteringDays ??
    calculateScaledRosteringDays(
      baseRosteringDays,
      employees,
      rosterCycleWeeks,
      currentIndustry,
    );

  // Calculate savings
  const calculationInputs = {
    industry,
    employees,
    avgHourlyWage,
    annualSalary,
    rosterCycleWeeks,
    scaledRosteringDays,
    overtimePercentage,
    turnoverRate,
  };

  const results = calculateSavings(
    calculationInputs,
    currentIndustry,
    manualRosteringDays,
  );

  // Generate PDF callback
  const generatePDF = useCallback(
    async (companyName: string = ""): Promise<boolean> => {
      const reportData: PDFReportData = {
        companyName,
        inputs: calculationInputs,
        results,
        industryConfig: currentIndustry,
        reportType,
        region,
      };

      return await PDFGenerator.generatePDF({
        data: reportData,
        fallbackToText: true,
      });
    },
    [calculationInputs, results, currentIndustry, reportType, region],
  );

  // Update default values when industry changes
  useEffect(() => {
    const config = industryConfigs[industry];
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
    setManualRosteringDays(null);
  }, [industry]);

  // HubSpot form integration
  useHubSpotForm({
    config: {
      portalId: hubspotConfig.portalId,
      formId: hubspotConfig.formId,
      target: "#hubspot-form-container",
      onFormSubmitted: async (formData: any) => {
        // Hide the form immediately after submission
        const formContainer = document.getElementById("hubspot-form-container");
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
            alert(
              `Your personalised ${reportType === "savings" ? "savings" : "ROI"} report has been downloaded!`,
            );
          }, 1000);
        }
      },
    },
    shouldLoad: showReportForm,
  });

  return (
    <>
      {/* Hero Section */}
      <section
        className={`relative flex items-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 ${className}`}
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text and CTAs */}
            <div className="w-full text-left">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {regionalContent.title}
                <br />
                <span>for </span>
                <span
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Healthcare Teams
                </span>
              </h1>

              {/* Mobile only: Image appears here after H1 */}
              {regionalContent.heroImage && (
                <div className="block lg:hidden w-full mb-8">
                  <div className="relative w-full max-w-[600px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-transparent to-teal-100/40 pointer-events-none" />
                    <Image
                      src={regionalContent.heroImage.src}
                      alt={regionalContent.heroImage.alt}
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Subheading */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {regionalContent.subtitle}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  href={regionalContent.links.pricing}
                  className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {regionalContent.buttons.viewPricing}
                </Button>

                <Button
                  href={regionalContent.links.demo}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {regionalContent.buttons.demo}
                </Button>
              </div>

              {/* Feature ticks */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    90% reduction in {regionalContent.terminology.scheduling}{" "}
                    time
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Instant ROI calculations for your team size
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop only: Right side - Image */}
            {regionalContent.heroImage && (
              <div className="hidden lg:flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[600px] rounded-[36px] overflow-hidden shadow-[0_30px_80px_-40px_rgba(31,78,121,0.65)] border border-white/70">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/35 via-transparent to-teal-200/35 pointer-events-none" />
                  <Image
                    src={regionalContent.heroImage.src}
                    alt={regionalContent.heroImage.alt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-3 lg:h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,40 Q360,25 720,40 T1440,40 L1440,80 L0,80 Z"
              opacity="0.5"
            />
            <path
              fill="#ffffff"
              d="M0,50 Q360,35 720,50 T1440,50 L1440,80 L0,80 Z"
            />
          </svg>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="bg-white py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  See how RosterLab can save
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  {regionalContent.explanation}
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What types of healthcare specialties are you{" "}
                      {regionalContent.terminology.scheduling === "scheduling"
                        ? "scheduling"
                        : "rostering"}{" "}
                      for?
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {regionalContent.industryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of {region === "us" ? "staff" : "employees"}
                    </label>
                    <input
                      type="number"
                      value={employeesInput !== "" ? employeesInput : employees}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEmployeesInput(val);
                        if (val !== "") {
                          const numVal = Math.max(0, Number(val));
                          setEmployees(numVal);
                          setRosteringDaysInput("");
                          setManualRosteringDays(null);
                        } else {
                          setEmployees(0);
                        }
                      }}
                      onBlur={() => {
                        if (employeesInput === "") {
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
                      Average hourly wage ($) for{" "}
                      {regionalContent.terminology.scheduler}
                    </label>
                    <input
                      type="number"
                      value={
                        hourlyWageInput !== "" ? hourlyWageInput : avgHourlyWage
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setHourlyWageInput(val);
                        if (val !== "") {
                          const hourly = Math.max(0, Number(val));
                          setAvgHourlyWage(hourly);
                          setAnnualSalary(hourly * 2080);
                          setAnnualSalaryInput("");
                        } else {
                          setAvgHourlyWage(0);
                          setAnnualSalary(0);
                        }
                      }}
                      onBlur={() => {
                        if (hourlyWageInput === "") {
                          setAvgHourlyWage(
                            currentIndustry.defaultHourlyWage || 50,
                          );
                          setAnnualSalary(
                            (currentIndustry.defaultHourlyWage || 50) * 2080,
                          );
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

                  {reportType === "roi" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual salary ($) for{" "}
                        {regionalContent.terminology.scheduler}
                      </label>
                      <input
                        type="number"
                        value={
                          annualSalaryInput !== ""
                            ? annualSalaryInput
                            : annualSalary
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          setAnnualSalaryInput(val);
                          if (val !== "") {
                            const annual = Math.max(0, Number(val));
                            setAnnualSalary(annual);
                            setAvgHourlyWage(
                              Math.round((annual / 2080) * 10) / 10,
                            );
                            setHourlyWageInput("");
                          } else {
                            setAnnualSalary(0);
                            setAvgHourlyWage(0);
                          }
                        }}
                        onBlur={() => {
                          if (annualSalaryInput === "") {
                            const defaultHourly =
                              currentIndustry.defaultHourlyWage || 50;
                            setAnnualSalary(defaultHourly * 2080);
                            setAvgHourlyWage(defaultHourly);
                          } else {
                            const annual = Math.max(
                              0,
                              Number(annualSalaryInput),
                            );
                            setAnnualSalary(annual);
                            setAvgHourlyWage(
                              Math.round((annual / 2080) * 10) / 10,
                            );
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
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {regionalContent.terminology.schedules} cycle frequency
                    </label>
                    <select
                      value={rosterCycleWeeks}
                      onChange={(e) => {
                        setRosterCycleWeeks(Number(e.target.value));
                        setManualRosteringDays(null);
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
                      How often do you create new{" "}
                      {regionalContent.terminology.schedules}?
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Days spent creating each{" "}
                      {regionalContent.terminology.schedules.slice(0, -1)}
                    </label>
                    <input
                      type="number"
                      value={
                        rosteringDaysInput !== ""
                          ? rosteringDaysInput
                          : scaledRosteringDays.toFixed(1)
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setRosteringDaysInput(val);
                        if (val !== "") {
                          const newValue = Math.max(0.1, Number(val));
                          setManualRosteringDays(newValue);
                        } else {
                          setManualRosteringDays(null);
                        }
                      }}
                      onBlur={() => {
                        if (rosteringDaysInput !== "") {
                          const newValue = Math.max(
                            0.1,
                            Number(rosteringDaysInput),
                          );
                          setManualRosteringDays(newValue);
                        }
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
                  Your Potential{" "}
                  {reportType === "savings" ? "Annual Savings" : "Savings"}
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-6 order-2 sm:order-1">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                        $
                        {results.totalAnnualSavings &&
                        !isNaN(results.totalAnnualSavings)
                          ? Math.round(
                              results.totalAnnualSavings,
                            ).toLocaleString()
                          : "0"}
                      </h3>
                      <p className="text-blue-100">Total Annual Savings</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-6 order-1 sm:order-2">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                        {results.roiMultiple}x
                      </h3>
                      <p className="text-blue-100">Return on Investment</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-3">
                      Savings Breakdown
                    </h3>

                    {/* Manual Time Spent */}
                    {currentIndustry.hasManualTimeSaving && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              Manual Time Spent{" "}
                              {regionalContent.terminology.scheduling ===
                              "scheduling"
                                ? "Scheduling"
                                : "Rostering"}
                            </span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                We assume a roughly 80%-90% time saving on your
                                type of{" "}
                                {regionalContent.terminology.schedules.slice(
                                  0,
                                  -1,
                                )}
                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 -mr-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            $
                            {results.timeSavingsCost &&
                            !isNaN(results.timeSavingsCost)
                              ? Math.round(
                                  results.timeSavingsCost,
                                ).toLocaleString()
                              : "0"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Optimised Staffing */}
                    {currentIndustry.hasStaffingEfficiency && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              Optimised Staffing
                            </span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                We estimate a 1-3% of better staffing depending
                                on your speciality
                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 -mr-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            $
                            {results.allocativeEfficiencySavings &&
                            !isNaN(results.allocativeEfficiencySavings)
                              ? Math.round(
                                  results.allocativeEfficiencySavings,
                                ).toLocaleString()
                              : "0"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Skill Mix */}
                    {currentIndustry.hasSkillMix && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            Improved Skill Mix
                          </span>
                          <span className="text-xl font-semibold">
                            $
                            {results.skillMixSavings &&
                            !isNaN(results.skillMixSavings)
                              ? Math.round(
                                  results.skillMixSavings,
                                ).toLocaleString()
                              : "0"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Turnover Costs */}
                    {currentIndustry.hasTurnover && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              Reduced Turnover Costs
                            </span>
                            <div className="relative group">
                              <HiInformationCircle className="w-4 h-4 text-blue-200 hover:text-white cursor-help" />
                              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                We assume a 3% - 10% improvement in turnover
                                rate through better work-life balance and fair{" "}
                                {regionalContent.terminology.scheduling}
                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 -mr-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
                              </div>
                            </div>
                          </div>
                          <span className="text-xl font-semibold">
                            $
                            {results.turnoverReductionSavings &&
                            !isNaN(results.turnoverReductionSavings)
                              ? Math.round(
                                  results.turnoverReductionSavings,
                                ).toLocaleString()
                              : "0"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Non-fiscal Benefits */}
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-100">
                          Non-fiscal Benefits
                        </span>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <span className="text-green-400 mr-1">✓</span>
                            <span className="text-blue-100">
                              80% more staff satisfaction
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-400 mr-1">✓</span>
                            <span className="text-blue-100">
                              15% fatigue reduction
                            </span>
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
                        <span className="text-sm text-blue-100">
                          Annual Subscription
                        </span>
                        <span className="font-semibold">
                          $
                          {results.annualSubscriptionCost &&
                          !isNaN(results.annualSubscriptionCost)
                            ? results.annualSubscriptionCost.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-100">
                          One-off Implementation (estimate)
                        </span>
                        <span className="font-semibold">
                          $
                          {results.oneOffImplementationCost &&
                          !isNaN(results.oneOffImplementationCost)
                            ? results.oneOffImplementationCost.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/20">
                        <span className="font-medium">First Year Total</span>
                        <span className="text-xl font-semibold">
                          $
                          {results.firstYearTotalCost &&
                          !isNaN(results.firstYearTotalCost)
                            ? results.firstYearTotalCost.toLocaleString()
                            : "0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => setShowReportForm(true)}
                      className="w-full bg-green-500 text-white hover:bg-green-600 py-3 px-4 rounded-md font-medium transition-colors"
                    >
                      Download Your{" "}
                      {reportType === "savings" ? "Savings" : "ROI"} Report
                    </button>
                    <Button
                      href={regionalContent.links.productTour}
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3"
                    >
                      {regionalContent.buttons.seeHowItWorks}
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
                    Fair {regionalContent.terminology.scheduling} and better
                    work-life balance leads to happier teams
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

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 text-center">
                * Savings are estimates based on typical results. Actual savings
                may vary. Final implementation cost will be confirmed after demo
                and scoping session.
              </p>
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
              Join hundreds of organisations already optimising their{" "}
              {regionalContent.terminology.scheduling} with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={regionalContent.links.contact}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                {regionalContent.buttons.contactUs}
              </Button>
              <Button
                href={regionalContent.links.solutions}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                {regionalContent.buttons.learnMore}
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
              Download Your {reportType === "savings" ? "Savings" : "ROI"}{" "}
              Report
            </h3>
            <p className="text-gray-600 mb-6">
              Get a personalised {reportType === "savings" ? "savings" : "ROI"}{" "}
              report showing your potential savings with RosterLab.
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
