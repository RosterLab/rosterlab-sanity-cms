"use client";

/**
 * Staff Submission Client Component
 * Handles preference submission and success state
 */

import { useState } from "react";
import HolidayRankingForm from "@/components/survey/HolidayRankingForm";
import type {
  Survey,
  SubmitPreferencesResponse,
  HolidayRanking,
} from "@/lib/survey/types";
import Button from "@/components/ui/Button";

interface StaffSubmissionClientProps {
  survey: Survey;
}

export default function StaffSubmissionClient({
  survey,
}: StaffSubmissionClientProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmitPreferencesResponse | null>(null);
  const [submittedRankings, setSubmittedRankings] = useState<HolidayRanking[]>(
    [],
  );
  const [submittedNotes, setSubmittedNotes] = useState<string>("");

  const handleSuccess = (
    response: SubmitPreferencesResponse,
    rankings: HolidayRanking[],
    notes?: string,
  ) => {
    setSubmitted(true);
    setSubmissionResult(response);
    setSubmittedRankings(rankings);
    setSubmittedNotes(notes || "");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!submitted ? (
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
            <HolidayRankingForm survey={survey} onSuccess={handleSuccess} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
            {/* Success State */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
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

              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                Your preferences have been submitted successfully.
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <p className="text-sm text-primary-900">
                  {submissionResult?.message ||
                    "Your scheduling preferences have been recorded and will be reviewed by the scheduling manager."}
                </p>
              </div>
            </div>

            {/* Submitted Rankings */}
            {submittedRankings.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 text-center">
                  Your Submitted Rankings
                </h2>
                <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Holiday
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {submittedRankings
                        .sort((a, b) => a.rank - b.rank)
                        .map((ranking) => {
                          const holiday = survey.config.holidays.find(
                            (h) => h.id === ranking.holiday_id,
                          );
                          return (
                            <tr
                              key={ranking.holiday_id}
                              className="hover:bg-neutral-50"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
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
                              <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                                {holiday?.name || "Unknown Holiday"}
                              </td>
                              <td className="px-6 py-4 text-sm text-neutral-600">
                                {holiday
                                  ? new Date(holiday.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      },
                                    )
                                  : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            {submittedNotes && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 text-center">
                  Your Notes
                </h2>
                <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
                  <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                    {submittedNotes}
                  </p>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <p className="text-sm text-neutral-600">
                You can now close this page. If you need to make changes, please
                contact your scheduling manager.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const subject = encodeURIComponent(
                      `My Holiday Shift Preferences - ${survey.title}`,
                    );

                    // Build rankings text
                    const rankingsText = submittedRankings
                      .sort((a, b) => a.rank - b.rank)
                      .map((ranking) => {
                        const holiday = survey.config.holidays.find(
                          (h) => h.id === ranking.holiday_id,
                        );
                        const ordinal =
                          ranking.rank === 1
                            ? "1st"
                            : ranking.rank === 2
                              ? "2nd"
                              : ranking.rank === 3
                                ? "3rd"
                                : `${ranking.rank}th`;
                        return `${ordinal} choice: ${holiday?.name} (${holiday ? new Date(holiday.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""})`;
                      })
                      .join("\n");

                    const notesText = submittedNotes
                      ? `\n\nNotes:\n${submittedNotes}`
                      : "";

                    const body = encodeURIComponent(
                      `Here are my submitted holiday shift preferences for ${survey.title}:\n\n${rankingsText}${notesText}\n\nThese preferences have been recorded and will be reviewed by the scheduling manager.`,
                    );

                    window.location.href = `mailto:?subject=${subject}&body=${body}`;
                  }}
                  analyticsLabel="Email My Preferences"
                  analyticsLocation="Staff Submission Success"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email My Preferences
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  href="https://www.rosterlab.com"
                  analyticsLabel="Visit RosterLab"
                  analyticsLocation="Staff Submission Success"
                >
                  Learn More About RosterLab
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          <p>
            Powered by{" "}
            <a
              href="https://www.rosterlab.com"
              className="text-primary-600 hover:underline"
            >
              RosterLab
            </a>
            {" - "}Staff scheduling software
          </p>
        </div>
      </div>
    </div>
  );
}
