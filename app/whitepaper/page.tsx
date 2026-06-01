"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import { analytics } from "@/components/analytics/tracking";

const whitepaperFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  industry: z.string().min(1, "Please select your industry"),
  role: z.string().min(1, "Please select your role"),
});

type WhitepaperFormData = z.infer<typeof whitepaperFormSchema>;

const STORAGE_KEY = "rl_whitepaper_unlocked";

export default function WhitepaperPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const industryDropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<WhitepaperFormData>({
    resolver: zodResolver(whitepaperFormSchema),
    mode: "onChange",
  });

  const selectedIndustry = watch("industry");

  // Check if already unlocked
  useEffect(() => {
    const unlocked = localStorage.getItem(STORAGE_KEY) === "true";
    setIsUnlocked(unlocked);

    // Track page view
    analytics.track("whitepaper_page_viewed", {
      page_location: window.location.pathname,
      page_url: window.location.href,
      is_unlocked: unlocked,
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target as Node)) {
        setIndustryDropdownOpen(false);
      }
    };

    if (industryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [industryDropdownOpen]);

  const onSubmit = async (data: WhitepaperFormData) => {
    setIsSubmitting(true);

    analytics.track("whitepaper_form_submitted", {
      industry: data.industry,
      role: data.role,
      has_company: !!data.company,
    });

    try {
      const response = await fetch("/api/whitepaper-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        analytics.track("whitepaper_unlocked", {
          industry: data.industry,
          role: data.role,
        });

        // Mark as unlocked
        localStorage.setItem(STORAGE_KEY, "true");
        setIsUnlocked(true);

        // Trigger download
        setTimeout(() => {
          window.open("/whitepapers/ai-staff-scheduling-guide.pdf", "_blank");
        }, 500);

        // Scroll to content
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      analytics.track("whitepaper_form_error", {
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
        <SiteLayout>
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-20">
            <Container>
              {!isUnlocked ? (
                /* PREVIEW/LOCKED STATE */
                <div className="max-w-7xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Free Whitepaper
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                      Rostering as a{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Strategic Workforce Lever
                      </span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                      How healthcare executives can use intelligent scheduling to solve their most pressing workforce challenges
                    </p>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Preview */}
                    <div className="space-y-8">
                      {/* Whitepaper Cover */}
                      <div className="bg-white rounded-3xl shadow-xl p-8">
                        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8">
                          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                            <div className="aspect-[3/4] bg-white/5 rounded-lg flex items-center justify-center mb-4">
                              <svg
                                className="w-20 h-20 text-white/60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2 text-center">
                              Rostering as a Strategic Workforce Lever
                            </h3>
                            <p className="text-white/80 text-sm text-center">
                              A case study from Auckland Radiology
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats Preview */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-1">93%</div>
                          <div className="text-sm text-neutral-600">Time Reduction</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-1">$80K+</div>
                          <div className="text-sm text-neutral-600">Annual Savings</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-1">600+</div>
                          <div className="text-sm text-neutral-600">Preferences Met</div>
                        </div>
                      </div>

                      {/* What's Inside Teaser */}
                      <div className="bg-white rounded-3xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                          What&apos;s Inside
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                Real Auckland Radiology Case Study
                              </h4>
                              <p className="text-sm text-neutral-600">
                                Detailed breakdown of measurable results and implementation journey
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                Executive Strategic Framework
                              </h4>
                              <p className="text-sm text-neutral-600">
                                How to leverage scheduling as a strategic workforce capability
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                Quantified Financial Impact
                              </h4>
                              <p className="text-sm text-neutral-600">
                                ROI analysis, cost savings, and compliance risk elimination
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-4 h-4 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-semibold text-neutral-900 mb-1">
                                International Research Insights
                              </h4>
                              <p className="text-sm text-neutral-600">
                                Evidence-based approaches from global healthcare workforce research
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:sticky lg:top-24">
                      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
                            Get Your Free Whitepaper
                          </h2>
                          <p className="text-neutral-600">
                            Instant access to the full case study and strategic framework
                          </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                          {/* Name and Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-neutral-700 mb-2"
                              >
                                Name *
                              </label>
                              <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your name"
                              />
                              {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-neutral-700 mb-2"
                              >
                                Email *
                              </label>
                              <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                              />
                              {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Company (optional) */}
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-sm font-medium text-neutral-700 mb-2"
                            >
                              Company
                            </label>
                            <input
                              {...register("company")}
                              type="text"
                              id="company"
                              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Your organization"
                            />
                          </div>

                          {/* Industry and Role */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="industry"
                                className="block text-sm font-medium text-neutral-700 mb-2"
                              >
                                Industry *
                              </label>
                              <div className="relative" ref={industryDropdownRef}>
                                <button
                                  type="button"
                                  onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                                  className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white"
                                >
                                  <span className={selectedIndustry ? "text-neutral-900" : "text-neutral-500"}>
                                    {selectedIndustry || "Select industry"}
                                  </span>
                                  <svg
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-transform ${
                                      industryDropdownOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {industryDropdownOpen && (
                                  <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {["Healthcare", "Retail", "Manufacturing", "Transportation", "Business Services", "Others"].map((option) => (
                                      <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                          setValue("industry", option, { shouldValidate: true });
                                          setIndustryDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-neutral-900"
                                      >
                                        {option}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {errors.industry && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.industry.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="role"
                                className="block text-sm font-medium text-neutral-700 mb-2"
                              >
                                Role *
                              </label>
                              <input
                                {...register("role")}
                                type="text"
                                id="role"
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Operations Manager"
                              />
                              {errors.role && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.role.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-neutral-300 disabled:to-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5"
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
                                Processing...
                              </>
                            ) : (
                              <>
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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                  />
                                </svg>
                                Download Free Whitepaper
                              </>
                            )}
                          </button>

                          {/* Privacy note */}
                          <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>No spam • Instant download • 100% free</span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* UNLOCKED STATE - Full Content */
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Unlocked
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                      Rostering as a{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Strategic Workforce Lever
                      </span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                      How healthcare executives can use intelligent scheduling to solve their most pressing workforce challenges
                    </p>

                    {/* Download Button */}
                    <button
                      onClick={() => window.open("/whitepapers/ai-staff-scheduling-guide.pdf", "_blank")}
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download PDF
                    </button>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-8 border-b border-neutral-200">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">93%</div>
                      <div className="text-sm text-neutral-600">Reduction in rostering time</div>
                      <div className="text-xs text-neutral-500 mt-1">120 hrs → 8 hrs per month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">$80K+</div>
                      <div className="text-sm text-neutral-600">Annual savings</div>
                      <div className="text-xs text-neutral-500 mt-1">Equivalent to one FTE</div>
                    </div>
                    <div className="text-center col-span-2 md:col-span-1">
                      <div className="text-4xl font-bold text-blue-600 mb-2">600+</div>
                      <div className="text-sm text-neutral-600">Staff preferences met</div>
                      <div className="text-xs text-neutral-500 mt-1">Per roster cycle</div>
                    </div>
                  </div>

                  {/* What's Inside */}
                  <div>
                    <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                      Executive Summary
                    </h2>
                    <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                      <p className="text-neutral-700 leading-relaxed mb-4">
                        Excessive workforce shortages, staff burnout, and rising labour costs are systemic challenges that no amount of recruitment alone can solve. Yet one of the most powerful levers available to healthcare executives remains largely untapped: <strong>the schedule (roster/rota)</strong>. Workforce scheduling is a strategic capability rather than just an administrative task.
                      </p>
                      <p className="text-neutral-700 leading-relaxed">
                        Drawing on a real-world case study from an Auckland radiology department and a growing body of international research, intelligent rostering (scheduling) can simultaneously reduce administrative burden, improve staff satisfaction, eliminate compliance risk, and produce measurable financial savings.
                      </p>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      Key Findings from Auckland Radiology
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            93% Reduction in rostering time
                          </h4>
                          <p className="text-sm text-neutral-600">
                            From 120 hours to just 8 hours per month
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            $80K+ Annual savings
                          </h4>
                          <p className="text-sm text-neutral-600">
                            Equivalent to one full-time employee
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            600+ Staff preferences met
                          </h4>
                          <p className="text-sm text-neutral-600">
                            Per roster cycle
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            40% → 100% Staffing level achieved
                          </h4>
                          <p className="text-sm text-neutral-600">
                            First time in 26 years
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            Zero Compliance breaches
                          </h4>
                          <p className="text-sm text-neutral-600">
                            Employment agreement rules automatically enforced
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            100% Staff confidence
                          </h4>
                          <p className="text-sm text-neutral-600">
                            In roster transparency & fairness
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Ready to transform your scheduling?
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        See how RosterLab can help your organization achieve similar results
                      </p>
                      <a
                        href="/book-demo"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Book a Demo
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Container>
          </div>
        </SiteLayout>
    </>
  );
}
