"use client";

/**
 * Admin Dashboard Client Component
 * Fetches and displays survey results
 */

import { useEffect, useState, useCallback } from "react";
import ResultsTable from "@/components/survey/ResultsTable";
import type {
  SurveyResultsResponse,
  BalancingResult,
} from "@/lib/survey/types";
import { trackButtonClick } from "@/components/analytics/Segment";

interface AdminDashboardClientProps {
  surveyId: string;
  token: string;
}

export default function AdminDashboardClient({
  surveyId,
  token,
}: AdminDashboardClientProps) {
  const [results, setResults] = useState<SurveyResultsResponse | null>(null);
  const [balancingResult, setBalancingResult] =
    useState<BalancingResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBalancing, setIsBalancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStaffNeeded, setEditedStaffNeeded] = useState<{
    [holidayId: string]: number;
  }>({});
  const [isSaving, setIsSaving] = useState(false);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/survey/${surveyId}/results?token=${token}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch results");
      }

      const data: SurveyResultsResponse = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [surveyId, token]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleExport = (format: "csv") => {
    trackButtonClick(`Export ${format.toUpperCase()}`, "Admin Dashboard");
  };

  const handleRefresh = () => {
    trackButtonClick("Refresh Results", "Admin Dashboard");
    fetchResults();
  };

  const handleBalance = async () => {
    if (!results) return;

    try {
      setIsBalancing(true);
      trackButtonClick("Balance Assignments", "Admin Dashboard");

      const response = await fetch(
        `/api/survey/${surveyId}/balance?token=${token}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to balance assignments");
      }

      const data: BalancingResult = await response.json();
      setBalancingResult(data);
    } catch (err) {
      console.error("Error balancing assignments:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to balance assignments. Please try again.",
      );
    } finally {
      setIsBalancing(false);
    }
  };

  const handleEditStaffNeeded = (holidayId: string, value: number) => {
    setEditedStaffNeeded((prev) => ({
      ...prev,
      [holidayId]: value,
    }));
  };

  const handleSaveConfig = async () => {
    if (!results) return;

    try {
      setIsSaving(true);
      trackButtonClick("Save Config Changes", "Admin Dashboard");

      // Build the holidays array with updated staff_needed values
      const holidays = results.survey.config.holidays.map((holiday) => ({
        id: holiday.id,
        staff_needed: editedStaffNeeded[holiday.id] ?? holiday.staff_needed,
      }));

      const response = await fetch(`/api/survey/${surveyId}/config`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          holidays,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update configuration");
      }

      // Refresh results to get updated config
      await fetchResults();

      // Reset edit mode and clear edited values
      setIsEditMode(false);
      setEditedStaffNeeded({});

      // Automatically run balance with new config
      await handleBalance();

      alert(
        "Configuration updated successfully! Assignments have been re-balanced.",
      );
    } catch (err) {
      console.error("Error saving configuration:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save configuration. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedStaffNeeded({});
    trackButtonClick("Cancel Config Edit", "Admin Dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-neutral-600">Loading survey results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Error</h1>
          <p className="text-neutral-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-neutral-700">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
          <ResultsTable
            results={results}
            onExport={handleExport}
            onBalance={handleBalance}
            balancingResult={balancingResult}
            isBalancing={isBalancing}
            isEditMode={isEditMode}
            editedStaffNeeded={editedStaffNeeded}
            onEditStaffNeeded={handleEditStaffNeeded}
            onSaveConfig={handleSaveConfig}
            onCancelEdit={handleCancelEdit}
            isSaving={isSaving}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
          />
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex">
              <svg
                className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-primary-900">
                <p className="font-medium mb-1">Keep this page bookmarked</p>
                <p>
                  This admin link is the only way to access your survey results.
                  Make sure to save it in a secure location.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const adminUrl = window.location.href;
                const subject = encodeURIComponent(
                  `Survey Admin Link - ${results.survey.title}`,
                );
                const body = encodeURIComponent(
                  `Here is your admin link to view survey results for "${results.survey.title}":\n\n${adminUrl}\n\nKeep this link secure - it provides access to all survey responses and results.\n\nSurvey: ${results.survey.title}\nOrganization: ${results.survey.org_name}`,
                );
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
                trackButtonClick("Email Admin Link", "Admin Dashboard");
              }}
              className="ml-4 inline-flex items-center px-3 py-1.5 border border-primary-300 rounded-lg text-xs font-medium text-primary-700 bg-white hover:bg-primary-50 transition-colors flex-shrink-0"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Link
            </button>
          </div>
        </div>

        {/* Share Staff Link */}
        {results.survey && (
          <div className="mt-6 bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Share with Your Team
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Send this link to staff members to collect their preferences:
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={`${window.location.origin}/tools/survey-preferences/s/${surveyId}`}
                readOnly
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900 font-mono text-sm"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/tools/survey-preferences/s/${surveyId}`,
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                  trackButtonClick("Copy Staff Link", "Admin Dashboard");
                }}
                className={`px-6 py-2 rounded-lg transition-colors text-sm font-medium ${
                  copied
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {copied ? (
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Copied!
                  </span>
                ) : (
                  "Copy"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Sign Up CTA */}
        <div className="mt-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Want More Advanced Scheduling Features?
              </h3>
              <p className="text-white/90 mb-2">
                RosterLab's full platform offers:
              </p>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5"
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
                  <span>
                    <strong>Advanced AI scheduling</strong> that considers
                    skills, certifications, fatigue, and compliance
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5"
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
                  <span>
                    <strong>Automated shift filling</strong> and real-time
                    schedule optimization
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5"
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
                  <span>
                    <strong>Staff mobile app</strong> for shift swaps, time off
                    requests, and notifications
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-0.5"
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
                  <span>
                    <strong>Analytics & reporting</strong> on labor costs,
                    overtime, and productivity
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.rosterlab.com/book-a-demo"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-center"
                onClick={() =>
                  trackButtonClick("Request Demo from Admin", "Admin Dashboard")
                }
              >
                Request a Demo
              </a>
              <a
                href="https://www.rosterlab.com/pricing"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transition-colors text-center"
                onClick={() =>
                  trackButtonClick("View Pricing from Admin", "Admin Dashboard")
                }
              >
                View Pricing
              </a>
            </div>
          </div>

          {/* Share This Tool - Integrated */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start flex-1">
                <svg
                  className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">
                    Share This Free Tool
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    Help other managers save time with holiday shift planning
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={`${window.location.origin}/tools/survey-preferences`}
                  readOnly
                  className="flex-1 sm:w-64 px-3 py-1.5 border border-white/30 rounded text-white bg-white/10 font-mono text-xs placeholder:text-white/50"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/tools/survey-preferences`,
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    trackButtonClick("Copy Tool Link", "Admin Dashboard");
                  }}
                  className={`px-4 py-1.5 rounded transition-colors text-xs font-medium whitespace-nowrap ${
                    copied
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-white text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {copied ? (
                    <span className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
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
                      Copied
                    </span>
                  ) : (
                    "Copy"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
