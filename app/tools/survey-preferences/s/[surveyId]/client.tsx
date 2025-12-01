"use client";

/**
 * Staff Submission Client Component
 * Handles preference submission and success state
 */

import { useState } from "react";
import HolidayRankingForm from "@/components/survey/HolidayRankingForm";
import type { Survey, SubmitPreferencesResponse } from "@/lib/survey/types";
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

  const handleSuccess = (response: SubmitPreferencesResponse) => {
    setSubmitted(true);
    setSubmissionResult(response);

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
            <div className="text-center">
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
              <p className="text-lg text-neutral-600 mb-8">
                Your preferences have been submitted successfully.
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-primary-900">
                  {submissionResult?.message ||
                    "Your scheduling preferences have been recorded and will be reviewed by the scheduling manager."}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-neutral-600">
                  You can now close this page. If you need to make changes,
                  please contact your scheduling manager.
                </p>

                <div className="pt-4">
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
