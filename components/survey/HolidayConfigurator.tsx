"use client";

/**
 * Holiday Configurator Component
 * Simple form to create a holiday shift preference survey
 */

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSurveyRequestSchema } from "@/lib/survey/validation";
import type {
  CreateSurveyRequest,
  CreateSurveyResponse,
} from "@/lib/survey/types";
import Button from "@/components/ui/Button";
import { trackFormSubmit } from "@/components/analytics/Segment";

interface HolidayConfiguratorProps {
  onSurveyCreated?: (response: CreateSurveyResponse) => void;
}

export default function HolidayConfigurator({
  onSurveyCreated,
}: HolidayConfiguratorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSurveyRequest>({
    resolver: zodResolver(createSurveyRequestSchema),
    defaultValues: {
      title: "",
      org_name: "",
      holidays: [
        {
          id: crypto.randomUUID(),
          name: "Christmas Day",
          date: "2025-12-25",
          staff_needed: 2,
        },
        {
          id: crypto.randomUUID(),
          name: "New Year's Day",
          date: "2026-01-01",
          staff_needed: 2,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "holidays",
  });

  const onSubmit = async (data: CreateSurveyRequest) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/survey/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create survey");
      }

      const result: CreateSurveyResponse = await response.json();

      // Track analytics
      trackFormSubmit("Holiday Survey Created", {
        survey_id: result.survey_id,
        org_name: data.org_name,
        holiday_count: data.holidays.length,
      });

      if (onSurveyCreated) {
        onSurveyCreated(result);
      }
    } catch (err) {
      console.error("Error creating survey:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Survey Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Survey Details
          </h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Survey Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              placeholder="e.g., 2025-2026 Holiday Shift Preferences"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="org_name"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Organization / Department Name
            </label>
            <input
              type="text"
              id="org_name"
              {...register("org_name")}
              placeholder="e.g., Memorial Hospital - Emergency Department"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.org_name && (
              <p className="text-sm text-red-600 mt-1">
                {errors.org_name.message}
              </p>
            )}
          </div>
        </div>

        {/* Holidays */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Public Holidays
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                List the holidays and how many staff are needed for each
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  name: "",
                  date: "",
                  staff_needed: 1,
                })
              }
            >
              Add Holiday
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-3 items-start p-4 border border-neutral-200 rounded-lg bg-white"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Holiday Name
                    </label>
                    <input
                      type="text"
                      {...register(`holidays.${index}.name`)}
                      placeholder="e.g., Christmas Day"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                    {errors.holidays?.[index]?.name && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.holidays[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      {...register(`holidays.${index}.date`)}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                    {errors.holidays?.[index]?.date && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.holidays[index]?.date?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                      Staff Needed
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      {...register(`holidays.${index}.staff_needed`, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    />
                    {errors.holidays?.[index]?.staff_needed && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.holidays[index]?.staff_needed?.message}
                      </p>
                    )}
                  </div>
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium mt-6"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.holidays && (
            <p className="text-sm text-red-600">{errors.holidays.message}</p>
          )}
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
            analyticsLabel="Create Holiday Survey"
            analyticsLocation="Holiday Configurator"
          >
            {isSubmitting ? "Creating Survey..." : "Create Survey"}
          </Button>
        </div>
      </form>
    </div>
  );
}
