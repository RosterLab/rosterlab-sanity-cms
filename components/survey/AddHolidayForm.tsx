"use client";

/**
 * AddHolidayForm Component
 * Form for adding new holidays to a survey (only when response count is 0)
 */

import { useState } from "react";
import type { Holiday } from "@/lib/survey/types";

interface AddHolidayFormProps {
  onAdd: (holidays: Omit<Holiday, "id">[]) => Promise<void>;
  onCancel: () => void;
  existingHolidays: Holiday[];
}

export default function AddHolidayForm({
  onAdd,
  onCancel,
  existingHolidays,
}: AddHolidayFormProps) {
  const [holidays, setHolidays] = useState<
    Array<{ name: string; date: string; staff_needed: number }>
  >([{ name: "", date: "", staff_needed: 1 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addHolidayRow = () => {
    setHolidays([...holidays, { name: "", date: "", staff_needed: 1 }]);
  };

  const removeHolidayRow = (index: number) => {
    if (holidays.length > 1) {
      setHolidays(holidays.filter((_, i) => i !== index));
    }
  };

  const updateHoliday = (
    index: number,
    field: "name" | "date" | "staff_needed",
    value: string | number,
  ) => {
    const updated = [...holidays];
    updated[index] = { ...updated[index], [field]: value };
    setHolidays(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const emptyFields = holidays.some(
      (h) => !h.name.trim() || !h.date || h.staff_needed < 1,
    );
    if (emptyFields) {
      setError("All fields are required and staff needed must be at least 1");
      return;
    }

    // Check for duplicate dates with existing holidays
    const existingDates = new Set(existingHolidays.map((h) => h.date));
    const newDates = holidays.map((h) => h.date);
    const duplicateDates = newDates.filter((date) => existingDates.has(date));

    if (duplicateDates.length > 0) {
      setError(
        `The following dates already exist: ${duplicateDates.join(", ")}`,
      );
      return;
    }

    // Check for duplicate dates within new holidays
    const uniqueDates = new Set(newDates);
    if (uniqueDates.size !== newDates.length) {
      setError("Duplicate dates found in new holidays");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd(holidays);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add holidays");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">
            Add New Holidays
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Add additional holidays to this survey. This is only allowed when
            there are 0 responses.
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form onSubmit={handleSubmit} id="add-holiday-form">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {holidays.map((holiday, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-4 bg-neutral-50 rounded-lg"
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Holiday Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Holiday Name *
                      </label>
                      <input
                        type="text"
                        value={holiday.name}
                        onChange={(e) =>
                          updateHoliday(index, "name", e.target.value)
                        }
                        placeholder="e.g., New Year's Day"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={holiday.date}
                        onChange={(e) =>
                          updateHoliday(index, "date", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Staff Needed */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Staff Needed *
                      </label>
                      <input
                        type="number"
                        value={holiday.staff_needed}
                        onChange={(e) =>
                          updateHoliday(
                            index,
                            "staff_needed",
                            parseInt(e.target.value, 10) || 1,
                          )
                        }
                        min={1}
                        max={100}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  {holidays.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHolidayRow(index)}
                      className="mt-7 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove holiday"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Another Button */}
            <button
              type="button"
              onClick={addHolidayRow}
              className="mt-4 inline-flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Another Holiday
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-holiday-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding...
              </span>
            ) : (
              `Add ${holidays.length} Holiday${holidays.length === 1 ? "" : "s"}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
