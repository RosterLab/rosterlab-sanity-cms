"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { analytics } from "@/components/analytics/tracking";
import type { MarketAccessDecision } from "@/lib/market-access/types";

export default function CommercialReviewForm({
  decision,
}: {
  decision: MarketAccessDecision;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/commercial-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setSubmitted(true);
      analytics.track("commercial_review_submitted", {
        detected_country: decision.countryCode,
        market_access_policy_version: decision.policyVersion,
        funding_available: data.fundingAvailable,
        rostered_staff: data.rosteredStaff,
      });
    } catch {
      setError("We couldn't submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-green-900">Request received</h2>
        <p className="mt-3 text-green-800">
          We&apos;ll review the commercial fit before offering a live meeting.
        </p>
        <Link
          href="/staff-rostering-interactive-demo"
          className="mt-6 inline-flex rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Explore the interactive demo
        </Link>
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg md:p-10">
      <h2 className="text-2xl font-bold text-gray-900">
        Request a commercial review
      </h2>
      <p className="mt-3 text-gray-600">
        Live demos are limited by region. Tell us about your organisation and
        funding, and we&apos;ll review whether a sales-led engagement makes
        sense.
      </p>
      {decision.countryCode && (
        <p className="mt-2 text-sm text-gray-500">
          Detected country: {decision.countryCode}. If you&apos;re travelling or
          using a VPN, retry from your organisation&apos;s country.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            Name
            <input name="name" required minLength={2} className={fieldClass} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Work email
            <input name="email" type="email" required className={fieldClass} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Organisation
            <input
              name="organization"
              required
              minLength={2}
              className={fieldClass}
            />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Organisation country
            <input
              name="organizationCountry"
              required
              minLength={2}
              className={fieldClass}
            />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Rostered staff
            <input
              name="rosteredStaff"
              type="number"
              min={1}
              required
              className={fieldClass}
            />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Can you fund US$20 per staff member per month?
            <select name="fundingAvailable" required className={fieldClass}>
              <option value="">Select one</option>
              <option value="yes">Yes</option>
              <option value="unsure">Unsure</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Anything else we should know?{" "}
          <span className="font-normal">(optional)</span>
          <textarea name="details" rows={4} className={fieldClass} />
        </label>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Request review"}
        </button>
      </form>
    </div>
  );
}
