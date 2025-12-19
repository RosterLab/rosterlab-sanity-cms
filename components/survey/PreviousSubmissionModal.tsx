"use client";

/**
 * Previous Submission Modal
 * Shows user their previously submitted preferences when they try to submit again
 */

import type { Holiday } from "@/lib/survey/types";

interface PreviousSubmissionModalProps {
  previousSubmission: {
    participant: {
      name: string;
      email: string;
      submitted_at: string;
    };
    response: {
      preference_data: {
        holiday_rankings?: Array<{
          holiday_id: string;
          rank: number;
        }>;
        notes?: string;
      };
      created_at: string;
    } | null;
  };
  holidays: Holiday[];
  onClose: () => void;
}

export default function PreviousSubmissionModal({
  previousSubmission,
  holidays,
  onClose,
}: PreviousSubmissionModalProps) {
  const { participant, response } = previousSubmission;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSortedRankings = () => {
    if (!response || !response.preference_data.holiday_rankings) {
      return [];
    }

    return response.preference_data.holiday_rankings
      .sort((a, b) => a.rank - b.rank)
      .map((ranking) => {
        const holiday = holidays.find((h) => h.id === ranking.holiday_id);
        return {
          rank: ranking.rank,
          holidayName: holiday ? holiday.name : "Unknown Holiday",
          holidayDate: holiday ? holiday.date : "",
        };
      });
  };

  const rankings = getSortedRankings();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">
            Already Submitted
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Info Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex">
              <svg
                className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5"
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
              <div className="text-sm text-amber-900">
                <p className="font-medium mb-1">
                  You've already submitted preferences
                </p>
                <p>
                  Your preferences were submitted on{" "}
                  {formatDate(participant.submitted_at)}. Multiple submissions
                  are not allowed.
                </p>
              </div>
            </div>
          </div>

          {/* Participant Info */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Submission Details
            </h3>
            <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-neutral-600">
                  Name:
                </span>
                <span className="text-sm text-neutral-900">
                  {participant.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-neutral-600">
                  Email:
                </span>
                <span className="text-sm text-neutral-900">
                  {participant.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-neutral-600">
                  Submitted:
                </span>
                <span className="text-sm text-neutral-900">
                  {formatDate(participant.submitted_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Rankings */}
          {rankings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Your Submitted Rankings
              </h3>
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Holiday
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {rankings.map((ranking, index) => (
                      <tr key={index} className="hover:bg-neutral-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {ranking.rank}
                            {ranking.rank === 1
                              ? "st"
                              : ranking.rank === 2
                                ? "nd"
                                : ranking.rank === 3
                                  ? "rd"
                                  : "th"}{" "}
                            choice
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                          {ranking.holidayName}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">
                          {new Date(ranking.holidayDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notes */}
          {response?.preference_data.notes && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                Your Notes
              </h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                  {response.preference_data.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
