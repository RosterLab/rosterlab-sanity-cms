"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { trackFormSubmission } from "@/lib/analytics/events/conversion-events";
import { runBestEffort } from "@/lib/analytics/best-effort";
import type { LeadSource } from "@/lib/leads/sources";

export interface LeadCaptureValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

interface LeadCaptureFormProps {
  source: LeadSource;
  submitLabel?: string;
  successMessage?: ReactNode;
  compact?: boolean;
  showName?: boolean;
  showCompany?: boolean;
  showPhone?: boolean;
  showMessage?: boolean;
  messageLabel?: string;
  metadata?: Record<string, string | number | boolean | string[] | null>;
  onSuccess?: (values: LeadCaptureValues) => void | Promise<void>;
  className?: string;
}

const EMPTY_VALUES: LeadCaptureValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  message: "",
};

export default function LeadCaptureForm({
  source,
  submitLabel = "Submit",
  successMessage = "Thanks — you're all set.",
  compact = false,
  showName = true,
  showCompany = true,
  showPhone = false,
  showMessage = false,
  messageLabel = "How can we help?",
  metadata,
  onSuccess,
  className = "",
}: LeadCaptureFormProps) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const [completingAction, setCompletingAction] = useState(false);
  const [started, setStarted] = useState(false);

  function update(field: keyof LeadCaptureValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function completePostSubmitAction() {
    if (!onSuccess) return;

    setCompletingAction(true);
    setCompletionError(null);
    try {
      await onSuccess(values);
    } catch (actionError) {
      console.error("Lead post-submit action failed", actionError);
      setCompletionError(
        "We received your details, but couldn't complete the next step.",
      );
    } finally {
      setCompletingAction(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setCompletionError(null);

    const formData = new FormData(event.currentTarget);
    const searchParams = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          ...values,
          website: formData.get("website"),
          pageUrl: window.location.href,
          metadata: {
            ...metadata,
            utmSource: searchParams.get("utm_source"),
            utmMedium: searchParams.get("utm_medium"),
            utmCampaign: searchParams.get("utm_campaign"),
          },
        }),
      });
      if (!response.ok)
        throw new Error(`Submission failed (${response.status})`);
    } catch (submissionError) {
      console.error("Lead form submission failed", submissionError);
      setError("We couldn't submit that. Please try again.");
      setSubmitting(false);
      return;
    }

    runBestEffort("form submission tracker", () => {
      window.rlTracker?.formSubmit(source);
    });
    runBestEffort("form submission event", () => {
      trackFormSubmission({
        form_guid: `native-${source}`,
        form_name: source,
        page_url: window.location.href,
        page_name: document.title,
        page_location: window.location.pathname,
        user_email: values.email,
        user_name: [values.firstName, values.lastName]
          .filter(Boolean)
          .join(" "),
        company_name: values.company || undefined,
        phone_number: values.phone || undefined,
        submission_data: { ...values, ...metadata },
      });
    });

    setSubmitted(true);
    await completePostSubmitAction();
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div
        className={`rounded-lg bg-green-50 p-4 text-green-900 ${className}`}
        role="status"
      >
        {successMessage}
        {completionError && (
          <div className="mt-2 text-sm text-amber-800" role="alert">
            <p>{completionError}</p>
            <button
              type="button"
              disabled={completingAction}
              onClick={completePostSubmitAction}
              className="mt-2 font-semibold underline disabled:opacity-60"
            >
              {completingAction ? "Retrying…" : "Retry next step"}
            </button>
          </div>
        )}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      onFocus={() => {
        if (!started) {
          setStarted(true);
          runBestEffort("form start tracker", () => {
            window.rlTracker?.formStart(source);
          });
        }
      }}
      className={`${compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-4"} ${className}`}
    >
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-10000px] h-px w-px overflow-hidden"
      />

      {showName && (
        <div className={compact ? "contents" : "grid gap-4 sm:grid-cols-2"}>
          <label className="block text-sm font-medium text-gray-700">
            First name
            <input
              required
              autoComplete="given-name"
              value={values.firstName}
              onChange={(event) => update("firstName", event.target.value)}
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Last name
            <input
              required
              autoComplete="family-name"
              value={values.lastName}
              onChange={(event) => update("lastName", event.target.value)}
              className={`${inputClass} mt-1`}
            />
          </label>
        </div>
      )}

      <label
        className={`block text-sm font-medium text-gray-700 ${compact ? "flex-1" : ""}`}
      >
        Work email
        <input
          required
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          className={`${inputClass} mt-1`}
        />
      </label>

      {showCompany && (
        <label className="block text-sm font-medium text-gray-700">
          Organisation
          <input
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            className={`${inputClass} mt-1`}
          />
        </label>
      )}

      {showPhone && (
        <label className="block text-sm font-medium text-gray-700">
          Phone
          <input
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={`${inputClass} mt-1`}
          />
        </label>
      )}

      {showMessage && (
        <label className="block text-sm font-medium text-gray-700">
          {messageLabel}
          <textarea
            required
            rows={4}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            className={`${inputClass} mt-1`}
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className={`${compact ? "self-end" : "w-full"} rounded-md bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {submitting ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
