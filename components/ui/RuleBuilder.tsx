"use client";

import { useState } from "react";
import Button from "./Button";
import Image from "next/image";

export default function RuleBuilder() {
  const [ruleType, setRuleType] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [ruleValue, setRuleValue] = useState("");
  const [rulePriority, setRulePriority] = useState<"must" | "should">("must");
  const [rules, setRules] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [shiftPattern, setShiftPattern] = useState({
    week1: [] as string[],
    week2: [] as string[],
  });
  const [optimalDays, setOptimalDays] = useState<string[]>([]);
  const [skillMixConfig, setSkillMixConfig] = useState<Record<string, string>>({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  });
  const [coupleEmployees, setCoupleEmployees] = useState<string[]>([]);

  const employeeNames = [
    "Sarah Johnson",
    "Michael Chen",
    "Emma Williams",
    "David Brown",
    "Lisa Martinez",
    "James Wilson",
    "Rachel Lee",
    "Tom Anderson",
  ];

  const juniorStaffNames = [
    "Dr. Emily Parker",
    "Dr. Alex Kumar",
    "Dr. Sophie Chen",
    "Dr. Ryan Mitchell",
  ];

  const seniorStaffNames = [
    "Dr. Robert Williams",
    "Dr. Jennifer Martinez",
    "Dr. David Thompson",
    "Dr. Sarah Anderson",
  ];

  const ruleOptions = [
    { value: "min_hours", label: "Minimum hours between shifts" },
    { value: "max_shifts", label: "Maximum consecutive shifts" },
    { value: "night_shifts", label: "Days off after night shifts" },
    { value: "min_hours_period", label: "Minimum hours per roster period" },
    { value: "max_hours_period", label: "Maximum hours per roster period" },
    { value: "consecutive_days", label: "Preferred consecutive days on" },
    { value: "consecutive_days_off", label: "Preferred consecutive days off" },
  ];

  const demandRuleOptions = [
    {
      value: "optimal_coverage",
      label: "Ensure staff coverage is optimal on days",
    },
    {
      value: "staffing_levels",
      label: "Ideal staffing levels above minimum requirements",
    },
    {
      value: "skill_pairing",
      label:
        "Ensure there is a minimum number of senior staff for each shift (skill mix)",
    },
    {
      value: "couple_together",
      label: "Ensure staff are rostered together (car pool)",
    },
    {
      value: "couple_apart",
      label: "Ensure staff are not rostered together (child care)",
    },
  ];

  const handleToggleDay = (week: "week1" | "week2", day: string) => {
    setShiftPattern((prev) => {
      const weekDays = prev[week];
      if (weekDays.includes(day)) {
        return { ...prev, [week]: weekDays.filter((d) => d !== day) };
      } else {
        return { ...prev, [week]: [...weekDays, day] };
      }
    });
  };

  const handleToggleOptimalDay = (day: string) => {
    setOptimalDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleSkillMixChange = (day: string, value: string) => {
    setSkillMixConfig((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleToggleEmployee = (employee: string) => {
    setCoupleEmployees((prev) => {
      if (prev.includes(employee)) {
        return prev.filter((e) => e !== employee);
      } else if (prev.length < 2) {
        return [...prev, employee];
      } else {
        // Replace the first employee if already 2 selected
        return [prev[1], employee];
      }
    });
  };

  const handleAddRule = () => {
    const allOptions = [...ruleOptions, ...demandRuleOptions];
    const ruleLabel = allOptions.find((r) => r.value === selectedRule)?.label;

    if (selectedRule === "optimal_coverage") {
      const days = optimalDays.length > 0 ? optimalDays.join(", ") : "None";
      const newRule = `${ruleLabel}: ${days}`;
      setRules([...rules, newRule]);
      setSelectedRule("");
      setOptimalDays([]);
      setIsComplete(false);
    } else if (selectedRule === "skill_pairing") {
      const configuredDays = Object.entries(skillMixConfig)
        .filter(([_, count]) => count !== "")
        .map(([day, count]) => `${day}: ${count}`)
        .join(", ");
      const newRule = `${ruleLabel}: ${configuredDays}`;
      setRules([...rules, newRule]);
      setSelectedRule("");
      setSkillMixConfig({
        Mon: "",
        Tue: "",
        Wed: "",
        Thu: "",
        Fri: "",
        Sat: "",
        Sun: "",
      });
      setIsComplete(false);
    } else if (
      selectedRule === "couple_together" ||
      selectedRule === "couple_apart"
    ) {
      const employees = coupleEmployees.join(" & ");
      const newRule = `${ruleLabel}: ${employees}`;
      setRules([...rules, newRule]);
      setSelectedRule("");
      setCoupleEmployees([]);
      setIsComplete(false);
    } else if (selectedRule && ruleValue) {
      let unit = "";
      if (selectedRule === "max_shifts" || selectedRule === "night_shifts") {
        unit = "days";
      } else if (
        selectedRule === "consecutive_days" ||
        selectedRule === "consecutive_days_off"
      ) {
        unit = "days";
      } else if (selectedRule === "staffing_levels") {
        unit = "staff";
      } else {
        unit = "hours";
      }

      // Add must/should prefix for all rules (not demands)
      const isRuleWithPriority = ruleType === "rules";
      const priorityPrefix = isRuleWithPriority
        ? `[${rulePriority.toUpperCase()}] `
        : "";
      const newRule = `${priorityPrefix}${ruleLabel}: ${ruleValue} ${unit}`;

      setRules([...rules, newRule]);
      setSelectedRule("");
      setRuleValue("");
      setRulePriority("must");
      setIsComplete(false);
    }
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
    setIsComplete(false);
  };

  const handleGenerateRoster = async () => {
    setIsGenerating(true);
    setIsComplete(false);

    const steps = [
      "Analyzing rules...",
      "Checking compliance requirements...",
      "Evaluating staff availability...",
      "Optimizing shift allocations...",
      "Validating against constraints...",
      "Finalizing roster...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setGenerationStep("✓ Roster generated successfully!");
    setIsComplete(true);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* App Header */}
      <div
        className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 flex items-center"
        style={{ backgroundColor: "#219BC6" }}
      >
        <div className="w-16 sm:w-20 flex items-center justify-start pl-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
            <Image
              src="/images/icon/RosterLab_Icon_White.svg"
              alt="RosterLab"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
            Rule Builder
          </h3>
        </div>
        <div className="w-16 sm:w-20 flex items-center justify-end pr-2">
          <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap">
            AI
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {!isGenerating && !isComplete && (
          <>
            {/* Rule Selection */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rule Type
                </label>
                <select
                  value={ruleType}
                  onChange={(e) => {
                    setRuleType(e.target.value);
                    setSelectedRule("");
                    setRuleValue("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select rule type...</option>
                  <option value="rules">Rules</option>
                  <option value="demands">Demands</option>
                </select>
              </div>

              {ruleType === "rules" && (
                <>
                  <p className="text-sm text-gray-600 mb-4 italic">
                    Rules for each individual roster line.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Common Rule Types
                    </label>
                    <select
                      value={selectedRule}
                      onChange={(e) => setSelectedRule(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Choose a rule...</option>
                      {ruleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRule ? (
                    <>
                      {/* Must/Should radio buttons - show for all rules */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priority
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="rulePriority"
                              value="must"
                              checked={rulePriority === "must"}
                              onChange={(e) =>
                                setRulePriority(
                                  e.target.value as "must" | "should",
                                )
                              }
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Must Have
                            </span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="rulePriority"
                              value="should"
                              checked={rulePriority === "should"}
                              onChange={(e) =>
                                setRulePriority(
                                  e.target.value as "must" | "should",
                                )
                              }
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Should Have
                            </span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {selectedRule === "max_shifts" ||
                          selectedRule === "night_shifts" ||
                          selectedRule === "consecutive_days" ||
                          selectedRule === "consecutive_days_off"
                            ? "Number of Days"
                            : selectedRule === "staffing_levels"
                              ? "Number of Staff"
                              : "Number of Hours"}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={ruleValue}
                          onChange={(e) => setRuleValue(e.target.value)}
                          placeholder="Enter number..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                        {selectedRule === "min_hours" && (
                          <p className="text-sm text-gray-600 mt-2">
                            Minimum hours between shifts{" "}
                            {rulePriority === "must" ? "must" : "should"} be{" "}
                            {ruleValue || "[X]"} hour(s)
                          </p>
                        )}
                        {selectedRule === "max_shifts" && (
                          <p className="text-sm text-gray-600 mt-2">
                            Maximum consecutive shifts{" "}
                            {rulePriority === "must" ? "must" : "should"} be{" "}
                            {ruleValue || "[X]"} shift(s)
                          </p>
                        )}
                        {selectedRule === "night_shifts" && (
                          <p className="text-sm text-gray-600 mt-2">
                            {rulePriority === "must"
                              ? "Must have"
                              : "Should have"}{" "}
                            {ruleValue || "[X]"} day(s) off after night shifts
                          </p>
                        )}
                        {selectedRule === "min_hours_period" && (
                          <p className="text-sm text-gray-600 mt-2">
                            Minimum hours per roster period{" "}
                            {rulePriority === "must" ? "must" : "should"} be{" "}
                            {ruleValue || "[X]"} hour(s)
                          </p>
                        )}
                        {selectedRule === "max_hours_period" && (
                          <p className="text-sm text-gray-600 mt-2">
                            Maximum hours per roster period{" "}
                            {rulePriority === "must" ? "must" : "should"} be{" "}
                            {ruleValue || "[X]"} hour(s)
                          </p>
                        )}
                        {selectedRule === "consecutive_days" && (
                          <p className="text-sm text-gray-600 mt-2">
                            {rulePriority === "must"
                              ? "Must have"
                              : "Should have"}{" "}
                            {ruleValue || "[X]"} consecutive day(s) on
                          </p>
                        )}
                        {selectedRule === "consecutive_days_off" && (
                          <p className="text-sm text-gray-600 mt-2">
                            {rulePriority === "must"
                              ? "Must have"
                              : "Should have"}{" "}
                            {ruleValue || "[X]"} consecutive day(s) off
                          </p>
                        )}
                      </div>
                      {ruleValue && (
                        <button
                          onClick={handleAddRule}
                          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                          + Add Rule
                        </button>
                      )}
                    </>
                  ) : null}
                </>
              )}

              {ruleType === "demands" && (
                <>
                  <p className="text-sm text-gray-600 mb-4 italic">
                    Demands for each day of the roster.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Demand Type
                    </label>
                    <select
                      value={selectedRule}
                      onChange={(e) => setSelectedRule(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Choose a demand...</option>
                      {demandRuleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRule === "optimal_coverage" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Days
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <label
                              key={day}
                              className="flex flex-col items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={optimalDays.includes(day)}
                                onChange={() => handleToggleOptimalDay(day)}
                                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                              />
                              <span className="text-xs text-gray-600 mt-1">
                                {day}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleAddRule}
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                      >
                        + Add Rule
                      </button>
                    </div>
                  )}

                  {selectedRule === "staffing_levels" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Staff
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={ruleValue}
                          onChange={(e) => setRuleValue(e.target.value)}
                          placeholder="Enter number..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      {ruleValue && (
                        <button
                          onClick={handleAddRule}
                          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                          + Add Rule
                        </button>
                      )}
                    </div>
                  )}

                  {selectedRule === "skill_pairing" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Number of Senior Staff Required Per Day
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <div
                              key={day}
                              className="flex flex-col items-center"
                            >
                              <span className="text-xs font-medium text-gray-700 mb-1">
                                {day}
                              </span>
                              <input
                                type="number"
                                min="0"
                                value={skillMixConfig[day]}
                                onChange={(e) =>
                                  handleSkillMixChange(day, e.target.value)
                                }
                                placeholder="0"
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {Object.values(skillMixConfig).some(
                        (val) => val !== "",
                      ) && (
                        <button
                          onClick={handleAddRule}
                          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
                        >
                          + Add Rule
                        </button>
                      )}
                    </div>
                  )}

                  {(selectedRule === "couple_together" ||
                    selectedRule === "couple_apart") && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Two Employees{" "}
                          {coupleEmployees.length > 0 &&
                            `(${coupleEmployees.length}/2 selected)`}
                        </label>
                        <p className="text-xs text-gray-600 mb-3">
                          {selectedRule === "couple_together"
                            ? "Select a couple to roster together (e.g., car pooling)"
                            : "Select a couple to not roster together (e.g., child care)"}
                        </p>
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                          {employeeNames.map((employee) => (
                            <label
                              key={employee}
                              className="flex items-center cursor-pointer p-2 rounded hover:bg-gray-50"
                            >
                              <input
                                type="checkbox"
                                checked={coupleEmployees.includes(employee)}
                                onChange={() => handleToggleEmployee(employee)}
                                disabled={
                                  coupleEmployees.length >= 2 &&
                                  !coupleEmployees.includes(employee)
                                }
                                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 disabled:opacity-50"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {employee}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={handleAddRule}
                        disabled={coupleEmployees.length !== 2}
                        className={`w-full py-2 px-4 rounded-lg transition-colors font-medium ${
                          coupleEmployees.length === 2
                            ? "bg-teal-600 text-white hover:bg-teal-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        + Add Rule
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Active Rules List */}
            {rules.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Active Rules:
                </h4>
                <div className="space-y-2">
                  {rules.map((rule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <span className="text-sm text-gray-700">{rule}</span>
                      <button
                        onClick={() => handleRemoveRule(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerateRoster}
              disabled={rules.length === 0}
              className={`w-full ${
                rules.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-600 to-cyan-500 text-white hover:from-teal-700 hover:to-cyan-600"
              } py-3 px-6 font-semibold text-lg`}
            >
              {rules.length === 0 ? "Add Rules to Generate" : "Generate Roster"}
            </Button>

            {rules.length === 0 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Add at least one rule to generate a compliant roster
              </p>
            )}
          </>
        )}

        {/* Generation Animation */}
        {isGenerating && (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 border-4 border-teal-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Generating Roster...
              </p>
              <p className="text-sm text-gray-600">{generationStep}</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {isComplete && (
          <div className="py-8">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <p className="text-xl font-bold text-gray-900 mb-2">
                Roster Generated Successfully!
              </p>
              <p className="text-sm text-gray-600 mb-6">
                All {rules.length} rules applied and validated
              </p>
            </div>

            {/* Generated Rules Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-green-900 mb-2">
                Applied Rules:
              </h4>
              <ul className="space-y-1">
                {rules.map((rule, index) => (
                  <li
                    key={index}
                    className="text-sm text-green-800 flex items-start"
                  >
                    <span className="mr-2">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setIsComplete(false);
                setRules([]);
              }}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
            >
              Add New Rules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
