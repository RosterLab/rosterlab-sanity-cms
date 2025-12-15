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
          />
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
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
                  trackButtonClick("Copy Staff Link", "Admin Dashboard");
                }}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
