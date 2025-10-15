"use client";

import { useState } from "react";
import Button from "./Button";

export default function RuleBuilder() {
  const [selectedRule, setSelectedRule] = useState("");
  const [ruleValue, setRuleValue] = useState("");
  const [rules, setRules] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const ruleOptions = [
    { value: "min_hours", label: "Minimum hours between shifts" },
    { value: "max_shifts", label: "Maximum consecutive shifts" },
    { value: "night_shifts", label: "Days off after night shifts" },
    { value: "min_hours_period", label: "Minimum hours per roster period" },
    { value: "max_hours_period", label: "Maximum hours per roster period" },
  ];

  const handleAddRule = () => {
    if (selectedRule && ruleValue) {
      const ruleLabel = ruleOptions.find(
        (r) => r.value === selectedRule,
      )?.label;
      const newRule = `${ruleLabel}: ${ruleValue} ${selectedRule === "max_shifts" || selectedRule === "night_shifts" ? "days" : "hours"}`;
      setRules([...rules, newRule]);
      setSelectedRule("");
      setRuleValue("");
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
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Rule Builder - Must Have Rules
      </h3>

      {!isGenerating && !isComplete && (
        <>
          {/* Rule Selection */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Rule Type
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

            {selectedRule && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedRule === "max_shifts" ||
                  selectedRule === "night_shifts"
                    ? "Number of Days"
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
              </div>
            )}

            {selectedRule && ruleValue && (
              <button
                onClick={handleAddRule}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                + Add Rule
              </button>
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
            Build New Roster
          </button>
        </div>
      )}
    </div>
  );
}
