"use client";

/**
 * Holiday Ranking Form Component
 * Simple form for staff to rank holiday preferences
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitPreferencesRequestSchema } from "@/lib/survey/validation";
import type {
  SubmitPreferencesRequest,
  SubmitPreferencesResponse,
  Survey,
  HolidayRanking,
} from "@/lib/survey/types";
import Button from "@/components/ui/Button";
import { trackFormSubmit } from "@/components/analytics/Segment";
import PreviousSubmissionModal from "@/components/survey/PreviousSubmissionModal";

interface HolidayRankingFormProps {
  survey: Survey;
  onSuccess?: (
    response: SubmitPreferencesResponse,
    rankings: HolidayRanking[],
    notes?: string,
  ) => void;
}

export default function HolidayRankingForm({
  survey,
  onSuccess,
}: HolidayRankingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rankings, setRankings] = useState<{ [key: string]: number }>({});
  const [notes, setNotes] = useState("");
  const [previousSubmission, setPreviousSubmission] = useState<any | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string }>({
    resolver: zodResolver(
      submitPreferencesRequestSchema.pick({ name: true, email: true }),
    ),
  });

  const config = survey.config;
  const holidays = config.holidays || [];

  // Sort holidays by date
  const sortedHolidays = [...holidays].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  const setRanking = (holidayId: string, rank: number) => {
    setRankings((prev) => ({
      ...prev,
      [holidayId]: rank,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const onSubmit = async (formData: { name: string; email: string }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Build holiday rankings array
      const holiday_rankings: HolidayRanking[] = Object.entries(rankings)
        .filter(([_, rank]) => rank !== 0) // Include both positive ranks and -1 (Not Available)
        .map(([holiday_id, rank]) => ({
          holiday_id,
          rank,
        }));

      // Check if user provided at least one preference (either ranked or marked unavailable)
      if (holiday_rankings.length === 0) {
        throw new Error(
          "Please indicate your preference for at least one holiday",
        );
      }

      const requestData: SubmitPreferencesRequest = {
        name: formData.name,
        email: formData.email,
        holiday_rankings,
        notes: notes.trim() || undefined,
      };

      const response = await fetch(`/api/survey/${survey.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle duplicate submission (409) specially
        if (response.status === 409 && errorData.previous_submission) {
          setPreviousSubmission(errorData.previous_submission);
          setIsSubmitting(false);
          return;
        }

        throw new Error(errorData.message || "Failed to submit preferences");
      }

      const result: SubmitPreferencesResponse = await response.json();

      // Track analytics
      trackFormSubmit("Holiday Preferences Submitted", {
        survey_id: survey.id,
        org_name: survey.org_name,
        holidays_ranked: holiday_rankings.length,
      });

      if (onSuccess) {
        onSuccess(result, holiday_rankings, notes.trim() || undefined);
      }
    } catch (err) {
      console.error("Error submitting preferences:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          {survey.title}
        </h1>
        <p className="text-lg text-neutral-600">{survey.org_name}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Your Details
          </h2>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Holiday Rankings */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Rank Your Holiday Preferences
            </h2>
            <p className="text-sm text-neutral-600">
              For each holiday: Select 1st choice, 2nd choice, etc. for holidays
              you're willing to work. Select "Not Available" if you cannot work
              that holiday. Select "Not applicable" if the holiday doesn't apply
              to you. Leave as "No preference" if you're available but have no
              strong preference.
            </p>
          </div>

          <div className="space-y-3">
            {sortedHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-white hover:border-primary-300 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">
                    {holiday.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {formatDate(holiday.date)} • {holiday.staff_needed} staff
                    needed
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-neutral-700">
                    Preference:
                  </label>
                  <select
                    value={rankings[holiday.id] || ""}
                    onChange={(e) =>
                      setRanking(holiday.id, Number(e.target.value))
                    }
                    className="w-40 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">No preference</option>
                    <option value="-1">Not Available</option>
                    <option value="-2">Not applicable</option>
                    {sortedHolidays.map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                        {index === 0
                          ? "st"
                          : index === 1
                            ? "nd"
                            : index === 2
                              ? "rd"
                              : "th"}{" "}
                        choice
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Additional Notes (Optional)
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional information about your holiday preferences..."
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="text-xs text-neutral-500">
            {notes.length}/1000 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            analyticsLabel="Submit Holiday Preferences"
            analyticsLocation="Holiday Ranking Form"
          >
            {isSubmitting ? "Submitting..." : "Submit Preferences"}
          </Button>
        </div>
      </form>

      {/* Previous Submission Modal */}
      {previousSubmission && (
        <PreviousSubmissionModal
          previousSubmission={previousSubmission}
          holidays={holidays}
          onClose={() => setPreviousSubmission(null)}
        />
      )}
    </div>
  );
}
