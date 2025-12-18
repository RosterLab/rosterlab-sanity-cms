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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "date">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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
    // Build CSV content with assignments if available
    const headers = ["Name", "Email", "Submitted At", "Preferences"];

    // Add assignment columns if balancing has been done
    if (balancingResult) {
      headers.push(
        "Total Shifts Assigned",
        "Shifts (Matched Preference)",
        "Shifts (Not Ranked)",
        "Preference Satisfaction %",
        "Assigned Shifts Details",
      );
    }

    const rows = results.responses.map((response) => {
      const row = [
        response.participant.name,
        response.participant.email,
        formatDate(response.participant.submitted_at.toString()),
        formatPreferenceData(response.preference_data),
      ];

      // Add assignments if balancing has been done
      if (balancingResult) {
        const assignments = balancingResult.assignments.filter((assignment) =>
          assignment.assigned_staff.some(
            (staff) => staff.participant_id === response.participant_id,
          ),
        );

        const assignmentDetails = assignments.map((assignment) => {
          const staff = assignment.assigned_staff.find(
            (s) => s.participant_id === response.participant_id,
          );
          return {
            holiday_name: assignment.holiday_name,
            preference_rank: staff?.preference_rank,
          };
        });

        const rankedCount = assignmentDetails.filter(
          (a) => a.preference_rank !== null,
        ).length;
        const unrankedCount = assignmentDetails.filter(
          (a) => a.preference_rank === null,
        ).length;
        const satisfactionScore =
          assignments.length > 0
            ? Math.round((rankedCount / assignments.length) * 100)
            : 0;

        const assignmentDetailsText = assignments
          .map((assignment) => {
            const staff = assignment.assigned_staff.find(
              (s) => s.participant_id === response.participant_id,
            );
            const rankText = staff?.preference_rank
              ? ` (${staff.preference_rank}${
                  staff.preference_rank === 1
                    ? "st"
                    : staff.preference_rank === 2
                      ? "nd"
                      : staff.preference_rank === 3
                        ? "rd"
                        : "th"
                } choice)`
              : " (not ranked)";
            return `${assignment.holiday_name}${rankText}`;
          })
          .join("; ");

        row.push(
          String(assignments.length),
          String(rankedCount),
          String(unrankedCount),
          `${satisfactionScore}%`,
          assignmentDetailsText || "None",
        );
      }

      return row;
    });

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

  const exportByHoliday = () => {
    if (!balancingResult) return;

    // Build holiday-centric CSV
    const headers = [
      "Holiday Name",
      "Holiday Date",
      "Staff Needed",
      "Staff Assigned",
      "Coverage Status",
      "Staff Member",
      "Email",
      "Preference Match",
      "Total Assignments",
      "Matched Preferences",
      "Satisfaction %",
    ];

    const rows: string[][] = [];

    // Sort assignments by date
    const sortedAssignments = [...balancingResult.assignments].sort((a, b) =>
      a.holiday_date.localeCompare(b.holiday_date),
    );

    sortedAssignments.forEach((assignment) => {
      const coverageStatus =
        assignment.unassigned_count === 0
          ? "Fully staffed"
          : `${assignment.unassigned_count} needed`;

      // Sort staff by preference rank (nulls last)
      const sortedStaff = [...assignment.assigned_staff].sort((a, b) => {
        if (a.preference_rank === null && b.preference_rank === null) return 0;
        if (a.preference_rank === null) return 1;
        if (b.preference_rank === null) return -1;
        return a.preference_rank - b.preference_rank;
      });

      sortedStaff.forEach((staff) => {
        // Calculate staff context
        const staffAssignments = balancingResult.assignments.filter((a) =>
          a.assigned_staff.some(
            (s) => s.participant_id === staff.participant_id,
          ),
        );
        const totalAssignments = staffAssignments.length;
        const rankedAssignments = staffAssignments.filter(
          (a) =>
            a.assigned_staff.find(
              (s) => s.participant_id === staff.participant_id,
            )?.preference_rank !== null,
        ).length;
        const satisfactionScore =
          totalAssignments > 0
            ? Math.round((rankedAssignments / totalAssignments) * 100)
            : 0;

        // Format preference match text
        let preferenceMatch = "";
        if (staff.preference_rank === 1) {
          preferenceMatch = "Got 1st choice";
        } else if (staff.preference_rank === 2) {
          preferenceMatch = "Got 2nd choice";
        } else if (staff.preference_rank === 3) {
          preferenceMatch = "Got 3rd choice";
        } else if (staff.preference_rank && staff.preference_rank > 3) {
          preferenceMatch = `Got ${staff.preference_rank}th choice`;
        } else {
          preferenceMatch = "Filled gap - not ranked";
        }

        rows.push([
          assignment.holiday_name,
          new Date(assignment.holiday_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          String(assignment.staff_needed),
          String(assignment.assigned_staff.length),
          coverageStatus,
          staff.name,
          staff.email,
          preferenceMatch,
          String(totalAssignments),
          String(rankedAssignments),
          `${satisfactionScore}%`,
        ]);
      });
    });

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
    link.setAttribute("download", `survey-by-holiday-${results.survey.id}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onExport) {
      onExport("csv");
    }
  };

  const exportUnassignedStaff = () => {
    if (!balancingResult) return;

    // Calculate unassigned staff
    const assignedParticipantIds = new Set(
      balancingResult.assignments.flatMap((assignment) =>
        assignment.assigned_staff.map((staff) => staff.participant_id),
      ),
    );
    const unassignedParticipants = results.participants.filter(
      (participant) => !assignedParticipantIds.has(participant.id),
    );

    const headers = ["Name", "Email", "Submitted At", "Preferences"];

    const rows = unassignedParticipants.map((participant) => {
      const response = results.responses.find(
        (r) => r.participant_id === participant.id,
      );

      return [
        participant.name,
        participant.email,
        formatDate(participant.submitted_at.toString()),
        response
          ? formatPreferenceData(response.preference_data)
          : "No preferences",
      ];
    });

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
    link.setAttribute(
      "download",
      `survey-unassigned-staff-${results.survey.id}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onExport) {
      onExport("csv");
    }
  };

  const handleSort = (field: "name" | "email" | "date") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort participants
  const filteredAndSortedParticipants = results.participants
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      let compareA: string | Date;
      let compareB: string | Date;

      switch (sortBy) {
        case "name":
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case "email":
          compareA = a.email.toLowerCase();
          compareB = b.email.toLowerCase();
          break;
        case "date":
          compareA = new Date(a.submitted_at);
          compareB = new Date(b.submitted_at);
          break;
      }

      if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
      if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-6">
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          table {
            page-break-inside: avoid;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          .print-page-break {
            page-break-before: always;
          }
        }
      `}</style>
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
        <div className="flex gap-3 no-print">
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
            onClick={() => window.print()}
            analyticsLabel="Print Results"
            analyticsLocation="Results Table"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z"
              />
            </svg>
            Print
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={exportToCSV}
            analyticsLabel="Export by Staff"
            analyticsLocation="Results Table"
          >
            Export by Staff
          </Button>
          {balancingResult && (
            <Button
              variant="outline"
              size="md"
              onClick={exportByHoliday}
              analyticsLabel="Export by Holiday"
              analyticsLocation="Results Table"
            >
              Export by Holiday
            </Button>
          )}
          {balancingResult &&
            (() => {
              const assignedIds = new Set(
                balancingResult.assignments.flatMap((a) =>
                  a.assigned_staff.map((s) => s.participant_id),
                ),
              );
              const hasUnassigned = results.participants.some(
                (p) => !assignedIds.has(p.id),
              );
              return hasUnassigned ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={exportUnassignedStaff}
                  analyticsLabel="Export Unassigned Staff"
                  analyticsLocation="Results Table"
                >
                  Export Unassigned
                </Button>
              ) : null;
            })()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-sm">
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
          <div className="text-sm text-neutral-600 mb-1">
            Total Responses Collected
          </div>
          <div className="text-3xl font-bold text-neutral-900">
            {results.stats.total_participants}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 no-print">
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Participants
                </h2>
                {results.participants.length > 0 && (
                  <button
                    onClick={() => {
                      const emails = results.participants
                        .map((p) => p.email)
                        .join(", ");
                      navigator.clipboard.writeText(emails);
                      alert("All participant emails copied to clipboard!");
                    }}
                    className="inline-flex items-center px-3 py-1.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy All Emails
                  </button>
                )}
              </div>
              {results.participants.length > 0 && (
                <div className="relative no-print">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th
                      onClick={() => handleSort("name")}
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    >
                      <div className="flex items-center">
                        Name
                        {sortBy === "name" && (
                          <svg
                            className={`w-4 h-4 ml-1 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("email")}
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    >
                      <div className="flex items-center">
                        Email
                        {sortBy === "email" && (
                          <svg
                            className={`w-4 h-4 ml-1 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("date")}
                      className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    >
                      <div className="flex items-center">
                        Submitted At
                        {sortBy === "date" && (
                          <svg
                            className={`w-4 h-4 ml-1 ${sortDirection === "asc" ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredAndSortedParticipants.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-8 text-center text-neutral-500"
                      >
                        {searchTerm
                          ? "No participants match your search"
                          : "No participants yet"}
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedParticipants.map((participant) => (
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
          {/* Warning Banner for Insufficient Staff */}
          {!balancingResult &&
            (() => {
              const totalStaffNeeded = results.survey.config.holidays.reduce(
                (sum, h) => sum + h.staff_needed,
                0,
              );
              const totalParticipants = results.participants.length;

              if (totalParticipants < totalStaffNeeded) {
                return (
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
                    <div className="flex">
                      <svg
                        className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h3 className="text-lg font-semibold text-amber-900 mb-2">
                          Insufficient Staff
                        </h3>
                        <p className="text-sm text-amber-800 mb-3">
                          You need{" "}
                          <strong>{totalStaffNeeded} total staff</strong> to
                          fill all holiday shifts, but only{" "}
                          <strong>
                            {totalParticipants} participant
                            {totalParticipants !== 1 ? "s have" : " has"}
                          </strong>{" "}
                          submitted preferences. This means{" "}
                          <strong>
                            {totalStaffNeeded - totalParticipants} shifts will
                            be unfilled
                          </strong>
                          .
                        </p>
                        <div className="bg-white border border-amber-200 rounded-lg p-4 mb-3">
                          <h4 className="font-medium text-amber-900 text-sm mb-2">
                            Breakdown by Holiday:
                          </h4>
                          <ul className="space-y-1 text-sm text-amber-800">
                            {results.survey.config.holidays.map((holiday) => (
                              <li key={holiday.id}>
                                • <strong>{holiday.name}</strong>: needs{" "}
                                {holiday.staff_needed} staff
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-sm text-amber-800">
                          <strong>Recommendation:</strong> Share the staff
                          survey link with more team members before running the
                          balancing algorithm.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

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
              {/* Overall Quality Score */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      Overall Quality Score
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Measures shift coverage, preference matching, and workload
                      balance
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

              {/* Staff Assignment Summary */}
              {(() => {
                // Calculate assignment summary for each participant
                const staffSummary = results.participants.map((participant) => {
                  const assignments = balancingResult.assignments.filter(
                    (assignment) =>
                      assignment.assigned_staff.some(
                        (staff) => staff.participant_id === participant.id,
                      ),
                  );

                  const assignmentDetails = assignments.map((assignment) => {
                    const staff = assignment.assigned_staff.find(
                      (s) => s.participant_id === participant.id,
                    );
                    return {
                      holiday_name: assignment.holiday_name,
                      preference_rank: staff?.preference_rank,
                    };
                  });

                  const rankedAssignments = assignmentDetails.filter(
                    (a) => a.preference_rank !== null,
                  ).length;
                  const unrankedAssignments = assignmentDetails.filter(
                    (a) => a.preference_rank === null,
                  ).length;
                  const satisfactionScore =
                    assignments.length > 0
                      ? Math.round(
                          (rankedAssignments / assignments.length) * 100,
                        )
                      : 0;

                  return {
                    participant,
                    total_assigned: assignments.length,
                    assignments: assignmentDetails,
                    satisfaction_score: satisfactionScore,
                    ranked_count: rankedAssignments,
                    unranked_count: unrankedAssignments,
                  };
                });

                return (
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                    <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        Staff Assignment Summary
                      </h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        Overview of how many shifts each staff member was
                        assigned
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Staff Member
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Total Shifts
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Matched Preference
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Not Ranked
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                              Satisfaction
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          {staffSummary.map((staff) => (
                            <tr
                              key={staff.participant.id}
                              className="hover:bg-neutral-50"
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-neutral-900">
                                  {staff.participant.name}
                                </div>
                                <div className="text-sm text-neutral-600">
                                  {staff.participant.email}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-900">
                                  {staff.total_assigned}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                  {staff.ranked_count}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600">
                                  {staff.unranked_count}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center">
                                  <div className="w-16">
                                    <div className="text-sm font-medium text-neutral-900">
                                      {staff.satisfaction_score}%
                                    </div>
                                  </div>
                                  <div
                                    className="ml-2 h-2 bg-neutral-200 rounded-full"
                                    style={{ width: "60px" }}
                                  >
                                    <div
                                      className={`h-2 rounded-full ${
                                        staff.satisfaction_score >= 80
                                          ? "bg-green-500"
                                          : staff.satisfaction_score >= 50
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                      style={{
                                        width: `${staff.satisfaction_score}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}

              {/* How Assignments Were Made */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <div className="flex items-start">
                  <svg
                    className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      How Assignments Were Made
                    </h3>
                    <div className="space-y-3 text-sm text-blue-800">
                      <div>
                        <div className="font-medium mb-1">
                          1. Preference Matching (Phase 1)
                        </div>
                        <p>
                          Staff who ranked each holiday were prioritized. Those
                          who selected it as their 1st choice were considered
                          first, then 2nd choice, and so on.
                        </p>
                      </div>
                      <div>
                        <div className="font-medium mb-1">
                          2. Fairness Balancing
                        </div>
                        <p>
                          When multiple staff ranked a holiday the same,
                          priority went to those with fewer total assignments
                          and better overall preference matches to distribute
                          workload evenly.
                        </p>
                      </div>
                      <div>
                        <div className="font-medium mb-1">
                          3. Filling Gaps (Phase 2)
                        </div>
                        <p>
                          For holidays that still needed staff, those who didn't
                          rank that holiday were assigned. Staff with fewer
                          existing assignments were prioritized to maintain
                          balance.
                        </p>
                      </div>
                      <div>
                        <div className="font-medium mb-1">
                          4. Quality Score Calculation
                        </div>
                        <p>
                          Overall quality is based on: (a) shift coverage - how
                          many positions were filled (40%), (b) preference
                          satisfaction - how well staff preferences were matched
                          (40%), and (c) workload balance - how evenly
                          assignments were distributed (20%).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
                          {assignment.assigned_staff.map((staff) => {
                            // Calculate context for this assignment
                            const staffAssignments =
                              balancingResult.assignments.filter((a) =>
                                a.assigned_staff.some(
                                  (s) =>
                                    s.participant_id === staff.participant_id,
                                ),
                              );
                            const totalAssignments = staffAssignments.length;
                            const rankedAssignments = staffAssignments.filter(
                              (a) =>
                                a.assigned_staff.find(
                                  (s) =>
                                    s.participant_id === staff.participant_id,
                                )?.preference_rank !== null,
                            ).length;

                            // Determine badge style and message
                            let badgeColor = "";
                            let badgeText = "";
                            let badgeIcon = "";

                            if (staff.preference_rank === 1) {
                              badgeColor = "bg-green-100 text-green-800";
                              badgeText = "✓ Got 1st choice";
                              badgeIcon = "";
                            } else if (staff.preference_rank === 2) {
                              badgeColor = "bg-emerald-100 text-emerald-800";
                              badgeText = `Got 2nd choice`;
                              badgeIcon = "";
                            } else if (staff.preference_rank === 3) {
                              badgeColor = "bg-teal-100 text-teal-800";
                              badgeText = `Got 3rd choice`;
                              badgeIcon = "";
                            } else if (
                              staff.preference_rank &&
                              staff.preference_rank > 3
                            ) {
                              badgeColor = "bg-blue-100 text-blue-800";
                              badgeText = `Got ${staff.preference_rank}${
                                staff.preference_rank === 4 ? "th" : "th"
                              } choice`;
                              badgeIcon = "";
                            } else {
                              // Not ranked - assigned for fairness/gap filling
                              badgeColor = "bg-neutral-100 text-neutral-700";
                              badgeText = "Filled gap - not ranked";
                              badgeIcon = "";
                            }

                            return (
                              <div
                                key={staff.participant_id}
                                className="px-6 py-4 hover:bg-neutral-50"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-neutral-900">
                                      {staff.name}
                                    </div>
                                    <div className="text-sm text-neutral-600">
                                      {staff.email}
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-1">
                                      Total assignments: {totalAssignments} •
                                      Matched preferences: {rankedAssignments}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <span
                                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}
                                    >
                                      {badgeText}
                                    </span>
                                    {staff.preference_rank === null && (
                                      <span className="text-xs text-neutral-500 max-w-[200px] text-right">
                                        Assigned to balance workload
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="px-6 py-8 text-center text-neutral-500">
                          No staff assigned yet
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Unassigned Staff */}
              {(() => {
                // Calculate which participants were not assigned to any shift
                const assignedParticipantIds = new Set(
                  balancingResult.assignments.flatMap((assignment) =>
                    assignment.assigned_staff.map(
                      (staff) => staff.participant_id,
                    ),
                  ),
                );
                const unassignedParticipants = results.participants.filter(
                  (participant) => !assignedParticipantIds.has(participant.id),
                );

                if (unassignedParticipants.length > 0) {
                  return (
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-neutral-900">
                              Staff Not Assigned
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {unassignedParticipants.length} staff member
                              {unassignedParticipants.length !== 1
                                ? "s"
                                : ""}{" "}
                              not assigned to any shift
                            </p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700">
                            {unassignedParticipants.length} unassigned
                          </span>
                        </div>
                      </div>
                      <div className="divide-y divide-neutral-200">
                        {unassignedParticipants.map((participant) => {
                          // Find their preference response
                          const response = results.responses.find(
                            (r) => r.participant_id === participant.id,
                          );
                          return (
                            <div
                              key={participant.id}
                              className="px-6 py-4 hover:bg-neutral-50"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-medium text-neutral-900">
                                    {participant.name}
                                  </div>
                                  <div className="text-sm text-neutral-600">
                                    {participant.email}
                                  </div>
                                  {response && response.preference_data && (
                                    <div className="mt-2 text-sm text-neutral-500">
                                      <span className="font-medium">
                                        Preferences:
                                      </span>{" "}
                                      {formatPreferenceData(
                                        response.preference_data,
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
