"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import { analytics } from "@/components/analytics/tracking";
import SelectField from "@/components/ui/SelectField";
import { BRAND_GRADIENT, BRAND_MINT } from "@/lib/brand";
import {
  DEMO_REQUEST_INDUSTRY_GROUPS,
  DEMO_REQUEST_REFERRAL_SOURCES,
  DEMO_REQUEST_ROSTER_SIZES,
} from "@/lib/market-access/demo-request";
import type { MarketAccessDecision } from "@/lib/market-access/types";

interface DemoRequestFormProps {
  decision: MarketAccessDecision;
  /** Where the confirmation should send people next. */
  interactiveDemoHref?: string;
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-[15px] text-neutral-900 transition-colors placeholder:text-neutral-400 hover:border-neutral-300 focus:border-[#0A71FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100";

const labelClass = "block text-sm font-semibold text-neutral-900";

/**
 * Shown in place of the calendar to countries without live demo coverage.
 * Every answer maps onto an Attio People attribute, so keep the option lists
 * in `lib/market-access/demo-request.ts` as the single source.
 */
export default function DemoRequestForm({
  decision,
  interactiveDemoHref = "/staff-rostering-interactive-demo",
}: DemoRequestFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The dropdowns are custom controls, so their values live here rather than
  // being read off the DOM at submit time.
  const [industry, setIndustry] = useState("");
  const [industryError, setIndustryError] = useState<string | null>(null);
  const [referralSource, setReferralSource] = useState("");
  const [rosterSize, setRosterSize] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // A hidden input can't carry native validation, so the one required
    // dropdown is checked here.
    if (!industry) {
      setIndustryError("Please choose an industry");
      return;
    }
    setIndustryError(null);
    setSubmitting(true);
    setError(null);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pageUrl: window.location.href }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setSubmitted(true);
      await analytics.identify(String(data.email), {
        email: String(data.email),
        name: String(data.name),
      });
      analytics.track("demo_request_submitted", {
        detected_country: decision.countryCode,
        market_access_policy_version: decision.policyVersion,
        industry,
        referral_source: referralSource || undefined,
        roster_size: rosterSize || undefined,
      });
    } catch {
      setError("We couldn't submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="mx-auto max-w-2xl rounded-3xl pt-[5px] shadow-xl shadow-blue-900/5"
        style={{ background: BRAND_GRADIENT }}
      >
        <div className="rounded-3xl bg-white p-8 text-center md:p-12">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${BRAND_MINT}33` }}
          >
            <HiCheck aria-hidden="true" className="h-7 w-7 text-[#0369a1]" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-neutral-900">
            Request received
          </h2>
          <p className="mt-3 text-neutral-600">
            Our team will be in touch about a personalised demo.
          </p>
          <Link
            href={interactiveDemoHref}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            Explore the interactive demo
            <HiArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    /* Brand gradient edge — the one flash of colour on an otherwise white
       card, so the form reads as ours without competing with the fields. It is
       the wrapper's background showing through 5px of top padding rather than
       a child element: a card that clipped its own overflow would also clip
       the dropdown lists. */
    <div
      className="mx-auto max-w-2xl rounded-3xl pt-[5px] shadow-xl shadow-blue-900/5"
      style={{ background: BRAND_GRADIENT }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-3xl bg-white p-6 md:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Name
            <span className="ml-0.5 text-[#0A71FF]" aria-hidden="true">
              *
            </span>
            <input
              name="name"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Jane Smith"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Work email
            <span className="ml-0.5 text-[#0A71FF]" aria-hidden="true">
              *
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@organisation.com"
              className={inputClass}
            />
          </label>
        </div>

        <SelectField
          label="Which industry are you scheduling for?"
          name="industry"
          value={industry}
          onChange={(next) => {
            setIndustry(next);
            setIndustryError(null);
          }}
          groups={DEMO_REQUEST_INDUSTRY_GROUPS}
          searchable
          required
          error={industryError ?? undefined}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Where did you hear about us?"
            name="referralSource"
            value={referralSource}
            onChange={setReferralSource}
            options={DEMO_REQUEST_REFERRAL_SOURCES}
            searchable
          />
          <SelectField
            label="What is the size of your roster/schedule?"
            name="rosterSize"
            value={rosterSize}
            onChange={setRosterSize}
            options={DEMO_REQUEST_ROSTER_SIZES}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="border-t border-neutral-100 pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {submitting ? "Submitting…" : "Submit"}
            {!submitting && (
              <HiArrowRight aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
