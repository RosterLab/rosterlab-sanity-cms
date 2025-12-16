"use client";

/**
 * Results Table Component
 * Displays survey results in a formatted table
 */

import { useState } from "react";
import type {
  SurveyResultsResponse,
  BalancingResult,
} from "@/lib/survey/types";
import Button from "@/components/ui/Button";

interface ResultsTableProps {
  results: SurveyResultsResponse;
  onExport?: (format: "csv") => void;
  onBalance?: () => void;
  balancingResult?: BalancingResult | null;
  isBalancing?: boolean;
}

export default function ResultsTable({
  results,
  onExport,
  onBalance,
  balancingResult,
  isBalancing,
}: ResultsTableProps) {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "responses" | "assignments"
  >("overview");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPreferenceData = (data: any) => {
    if (Array.isArray(data)) {
      return data.join(", ");
    }
    if (typeof data === "object" && data !== null) {
      // Handle holiday rankings
      if (data.holiday_rankings && Array.isArray(data.holiday_rankings)) {
        const rankings = data.holiday_rankings
          .sort((a: any, b: any) => a.rank - b.rank)
          .map((ranking: any) => {
            const holiday = results.survey.config.holidays.find(
              (h) => h.id === ranking.holiday_id,
            );
            const holidayName = holiday ? holiday.name : "Unknown Holiday";
            const ordinal =
              ranking.rank === 1
                ? "1st"
                : ranking.rank === 2
                  ? "2nd"
                  : ranking.rank === 3
                    ? "3rd"
                    : `${ranking.rank}th`;
            return `${holidayName} (${ordinal} choice)`;
          })
          .join(", ");

        // Add notes if present
        if (data.notes) {
          return `${rankings}\nNotes: ${data.notes}`;
        }
        return rankings;
      }
      if (data.value !== undefined) {
        return data.value.toString();
      }
      if (data.text !== undefined) {
        return data.text;
      }
      return JSON.stringify(data, null, 2);
    }
    return String(data);
  };

  const exportToCSV = () => {
    // Build CSV content
    const headers = ["Name", "Email", "Submitted At", "Preferences"];
    const rows = results.responses.map((response) => [
      response.participant.name,
      response.participant.email,
      formatDate(response.participant.submitted_at.toString()),
      formatPreferenceData(response.preference_data),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `survey-results-${results.survey.id}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onExport) {
      onExport("csv");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            {results.survey.title}
          </h1>
          <p className="text-lg text-neutral-600 mt-1">
            {results.survey.org_name}
          </p>
        </div>
        <div className="flex gap-3">
          {onBalance && (
            <Button
              variant="primary"
              size="md"
              onClick={onBalance}
              disabled={isBalancing || results.participants.length === 0}
              analyticsLabel="Balance Assignments"
              analyticsLocation="Results Table"
            >
              {isBalancing ? "Balancing..." : "Balance Assignments"}
            </Button>
          )}
          <Button
            variant="outline"
            size="md"
            onClick={exportToCSV}
            analyticsLabel="Export CSV"
            analyticsLocation="Results Table"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-600 mb-1">
            Total Participants
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {results.stats.total_participants}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-600 mb-1">Total Responses</div>
          <div className="text-3xl font-bold text-neutral-900">
            {results.stats.total_responses}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-600 mb-1">Avg Preferences</div>
          <div className="text-3xl font-bold text-neutral-900">
            {results.stats.average_preferences_per_participant}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === "overview"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab("responses")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === "responses"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Detailed Responses
          </button>
          <button
            onClick={() => setSelectedTab("assignments")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === "assignments"
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
            }`}
          >
            Assignments
            {balancingResult && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                ✓
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div className="space-y-6">
          {/* Participants Table */}
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900">
                Participants
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Submitted At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {results.participants.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-8 text-center text-neutral-500"
                      >
                        No participants yet
                      </td>
                    </tr>
                  ) : (
                    results.participants.map((participant) => (
                      <tr key={participant.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {participant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {participant.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                          {formatDate(participant.submitted_at.toString())}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Timeline */}
          {results.stats.submission_dates.length > 0 && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Submission Timeline
              </h2>
              <div className="space-y-2">
                {results.stats.submission_dates.map((item) => (
                  <div
                    key={item.date}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-neutral-600">
                      {item.date}
                    </span>
                    <div className="flex items-center">
                      <div
                        className="bg-primary-500 h-6 rounded"
                        style={{
                          width: `${Math.max(
                            (item.count / results.stats.total_participants) *
                              200,
                            20,
                          )}px`,
                        }}
                      />
                      <span className="ml-3 text-sm font-medium text-neutral-900">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTab === "responses" && (
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">
              All Preference Responses
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Preferences
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {results.responses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-neutral-500"
                    >
                      No responses yet
                    </td>
                  </tr>
                ) : (
                  results.responses.map((response) => (
                    <tr key={response.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                        {response.participant.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {response.participant.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        <div className="max-w-md whitespace-pre-line">
                          {formatPreferenceData(response.preference_data)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === "assignments" && (
        <div className="space-y-6">
          {!balancingResult ? (
            <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
              <div className="text-neutral-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No Assignments Yet
              </h3>
              <p className="text-neutral-600 mb-6">
                Click the &quot;Balance Assignments&quot; button to
                automatically assign staff to holidays based on their
                preferences.
              </p>
              {onBalance && results.participants.length > 0 && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onBalance}
                  disabled={isBalancing}
                  analyticsLabel="Balance Assignments (Empty State)"
                  analyticsLocation="Results Table - Assignments Tab"
                >
                  {isBalancing ? "Balancing..." : "Balance Assignments"}
                </Button>
              )}
              {results.participants.length === 0 && (
                <p className="text-sm text-neutral-500">
                  At least one staff member must submit preferences before
                  balancing.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Fairness Score */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Fairness Score
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Higher scores indicate better balance and preference
                      matching
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary-600">
                      {balancingResult.fairness_score}
                    </div>
                    <div className="text-sm text-neutral-500">out of 100</div>
                  </div>
                </div>

                {balancingResult.unmet_requirements.length > 0 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">
                      Unmet Requirements
                    </h4>
                    <ul className="text-sm text-amber-800 space-y-1">
                      {balancingResult.unmet_requirements.map((req, i) => (
                        <li key={i}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Assignments by Holiday */}
              <div className="space-y-4">
                {balancingResult.assignments
                  .sort((a, b) => a.holiday_date.localeCompare(b.holiday_date))
                  .map((assignment) => (
                    <div
                      key={assignment.holiday_id}
                      className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {assignment.holiday_name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {formatDate(assignment.holiday_date)} •{" "}
                              {assignment.assigned_staff.length} of{" "}
                              {assignment.staff_needed} staff assigned
                            </p>
                          </div>
                          {assignment.unassigned_count > 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                              {assignment.unassigned_count} needed
                            </span>
                          )}
                          {assignment.unassigned_count === 0 && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              ✓ Fully staffed
                            </span>
                          )}
                        </div>
                      </div>

                      {assignment.assigned_staff.length > 0 ? (
                        <div className="divide-y divide-neutral-200">
                          {assignment.assigned_staff.map((staff) => (
                            <div
                              key={staff.participant_id}
                              className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50"
                            >
                              <div>
                                <div className="font-medium text-neutral-900">
                                  {staff.name}
                                </div>
                                <div className="text-sm text-neutral-600">
                                  {staff.email}
                                </div>
                              </div>
                              <div>
                                {staff.preference_rank !== null ? (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                                    {staff.preference_rank}
                                    {staff.preference_rank === 1
                                      ? "st"
                                      : staff.preference_rank === 2
                                        ? "nd"
                                        : staff.preference_rank === 3
                                          ? "rd"
                                          : "th"}{" "}
                                    choice
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700">
                                    Not ranked
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-6 py-8 text-center text-neutral-500">
                          No staff assigned yet
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
