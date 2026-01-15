"use client";

/**
 * Survey Preferences Client Component
 * Handles survey creation and displays generated links
 */

import { useState } from "react";
import HolidayConfigurator from "@/components/survey/HolidayConfigurator";
import type { CreateSurveyResponse } from "@/lib/survey/types";
import Button from "@/components/ui/Button";
import { trackButtonClick } from "@/components/analytics/Segment";

export default function SurveyPreferencesClient() {
  const [surveyResult, setSurveyResult] = useState<CreateSurveyResponse | null>(
    null,
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSurveyCreated = (response: CreateSurveyResponse) => {
    setSurveyResult(response);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);

      trackButtonClick(`Copy ${field}`, "Survey Results");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const resetForm = () => {
    setSurveyResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {!surveyResult ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Collect Staff Preferences, Distribute Shifts Automatically
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Fairly distribute holiday shifts among your team. Survey staff
                preferences and automatically balance assignments.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  No Login Required
                </h3>
                <p className="text-neutral-600">
                  Create surveys instantly without creating an account. Perfect
                  for quick scheduling needs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Automatically Distribute Shifts
                </h3>
                <p className="text-neutral-600">
                  Staff rank their holiday preferences. Algorithm distributes
                  shifts fairly based on preferences.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-primary-600"
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
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Easy Sharing
                </h3>
                <p className="text-neutral-600">
                  Get shareable links instantly. Send via email, SMS, or any
                  messaging app.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    About This Tool
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    This is a <strong>simplified balancing tool</strong>{" "}
                    designed to help you fairly distribute holiday shifts based
                    on staff preferences. It uses a straightforward algorithm
                    that prioritizes preference matching and workload balance.
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>RosterLab's full platform</strong> includes advanced
                    AI-powered scheduling that considers dozens of factors
                    including skills, certifications, fatigue management, labor
                    costs, compliance rules, and historical patterns.{" "}
                    <a
                      href="https://www.rosterlab.com"
                      className="text-blue-700 underline hover:text-blue-900 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more about RosterLab
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Configurator Form */}
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
              <HolidayConfigurator onSurveyCreated={handleSurveyCreated} />
            </div>

            {/* Feedback Section */}
            <div className="mt-8 text-center">
              <p className="text-neutral-600">
                Need another tool, or want to give feedback?{" "}
                <a
                  href="https://forms.cloud.microsoft/r/YBq05Rsekv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Tell us about it
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Success State */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                Survey Created Successfully!
              </h1>
              <p className="text-lg text-neutral-600">
                Your survey is ready. Share the staff link with your team and
                use the admin link to view results.
              </p>
            </div>

            {/* Links Display */}
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 space-y-6">
              {/* Staff Link */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Staff Link (Share with your team)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={surveyResult.staff_url}
                    readOnly
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900 font-mono text-sm"
                  />
                  <Button
                    variant={copiedField === "staff" ? "secondary" : "primary"}
                    size="md"
                    onClick={() =>
                      copyToClipboard(surveyResult.staff_url, "staff")
                    }
                    analyticsLabel="Copy Staff Link"
                    analyticsLocation="Survey Success"
                  >
                    {copiedField === "staff" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Share this link with staff members to collect their
                  preferences
                </p>
              </div>

              {/* Admin Link */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Admin Link (Keep this private)
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={surveyResult.admin_url}
                    readOnly
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-900 font-mono text-sm"
                  />
                  <Button
                    variant={copiedField === "admin" ? "secondary" : "primary"}
                    size="md"
                    onClick={() =>
                      copyToClipboard(surveyResult.admin_url, "admin")
                    }
                    analyticsLabel="Copy Admin Link"
                    analyticsLocation="Survey Success"
                  >
                    {copiedField === "admin" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  Use this link to view responses and export data. Keep it
                  secure!
                </p>
              </div>

              {/* Warning Box */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex">
                    <svg
                      className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0 mt-0.5"
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
                    <div>
                      <h4 className="text-sm font-medium text-purple-900 mb-1">
                        Important: Save Your Links
                      </h4>
                      <p className="text-sm text-purple-800">
                        Make sure to save both links now. If you lose the admin
                        link, you won't be able to access your survey results.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const subject = encodeURIComponent(
                        "Survey Links - Keep these safe!",
                      );
                      const body = encodeURIComponent(
                        `Here are your survey links:\n\nSTAFF LINK (Share with your team):\n${surveyResult.staff_url}\n\nADMIN LINK (Keep this private!):\n${surveyResult.admin_url}\n\nImportant: The admin link is the only way to access your survey results. Keep it secure!`,
                      );
                      window.location.href = `mailto:?subject=${subject}&body=${body}`;
                      trackButtonClick("Email Survey Links", "Survey Success");
                    }}
                    className="ml-4 inline-flex items-center px-3 py-1.5 border border-amber-300 rounded-lg text-xs font-medium text-amber-700 bg-white hover:bg-amber-50 transition-colors flex-shrink-0"
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
                    Email to Myself
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  href={surveyResult.admin_url}
                  analyticsLabel="View Admin Dashboard"
                  analyticsLocation="Survey Success"
                >
                  View Admin Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetForm}
                  analyticsLabel="Create Another Survey"
                  analyticsLocation="Survey Success"
                >
                  Create Another Survey
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
