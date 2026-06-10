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

  // Check if already unlocked and redirect to unlocked page
  useEffect(() => {
    const unlocked = localStorage.getItem(STORAGE_KEY) === "true";

    if (unlocked) {
      // Redirect to unlocked page if already unlocked
      window.location.href = "/whitepapers/rostering-as-a-strategic-workforce-lever/unlocked";
    } else {
      // Track page view
      analytics.track("whitepaper_page_viewed", {
        page_location: window.location.pathname,
        page_url: window.location.href,
        is_unlocked: false,
      });
    }
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

    // Parse name into firstName and lastName
    const nameParts = data.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Identify the user with their information
    analytics.identify(data.email, {
      email: data.email,
      firstName: firstName,
      lastName: lastName,
      company: data.company,
      industry: data.industry,
      title: data.role,
    });

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

        // Trigger download
        const link = document.createElement("a");
        link.href = "/whitepapers/rostering-as-a-strategic-workforce-lever.pdf";
        link.download = "RosterLab-Whitepaper-Rostering-as-a-Strategic-Workforce-Lever.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Redirect to unlocked page
        setTimeout(() => {
          window.location.href = "/whitepapers/rostering-as-a-strategic-workforce-lever/unlocked";
        }, 500);
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
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-12 sm:py-16 lg:py-20">
            <Container>
                <div className="max-w-7xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight px-4">
                      Rostering as a{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Strategic Workforce Lever
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto px-4">
                      How healthcare executives can use intelligent scheduling to solve their most pressing workforce challenges
                    </p>
                  </div>

                  {/* Two Column Layout with Reordering on Mobile */}
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Column - Preview, Stats, and What's Inside */}
                    <div className="space-y-8">
                      {/* Whitepaper Preview Pages - Layered Book Effect */}
                      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 overflow-hidden">
                        <div className="relative h-[200px] sm:h-[280px] lg:h-[340px] max-w-full">
                          {/* Start Page - Left (Angled) */}
                          <div className="absolute left-[5%] top-8 sm:top-10 lg:top-12 w-[42%] sm:w-[45%] z-10 transform -rotate-[12deg] sm:-rotate-[15deg] hover:scale-105 transition-transform duration-300">
                            <div className="rounded-lg overflow-hidden shadow-xl">
                              <img
                                src="/images/og-images/whitepaper start.png"
                                alt="Whitepaper Cover - Rostering as a Strategic Workforce Lever"
                                className="w-full h-auto"
                              />
                            </div>
                          </div>

                          {/* RosterLab Change Page - Center (Behind right) */}
                          <div className="absolute left-1/2 top-0 w-[55%] sm:w-[58%] z-20 transform -translate-x-1/2 hover:scale-105 transition-transform duration-300">
                            <div className="rounded-lg overflow-hidden shadow-xl">
                              <img
                                src="/images/og-images/rosterlab change.png"
                                alt="Whitepaper Preview - The Decision to Change and What Changed with RosterLab"
                                className="w-full h-auto"
                              />
                            </div>
                          </div>

                          {/* Guide Page - Right (Angled, On Top) */}
                          <div className="absolute right-[5%] top-8 sm:top-10 lg:top-12 w-[42%] sm:w-[45%] z-30 transform rotate-[12deg] sm:rotate-[15deg] hover:scale-105 transition-transform duration-300">
                            <div className="rounded-lg overflow-hidden shadow-xl">
                              <img
                                src="/images/og-images/guide.png"
                                alt="Whitepaper Preview - Understanding That Scheduling Matters"
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats Preview */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">93%</div>
                          <div className="text-xs sm:text-sm text-neutral-600">Time Reduction</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">$80K+</div>
                          <div className="text-xs sm:text-sm text-neutral-600">Annual Savings</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 text-center col-span-2 sm:col-span-1">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">600+</div>
                          <div className="text-xs sm:text-sm text-neutral-600">Preferences Met</div>
                        </div>
                      </div>

                      {/* What's Inside - Desktop Only (Hidden on Mobile) */}
                      <div className="hidden lg:block bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
                          What&apos;s Inside
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              Poor rostering is silently costing your hospital — in turnover, agency spend, compliance risk, and burnout — and most executives never measure it
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              Workforce shortages are real, but many are compounded by scheduling systems that are unfair, opaque, and administratively broken
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              A real Auckland radiology department went from 40% understaffed to fully staffed for the first time in 28 years — by fixing how they scheduled
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              The financial case is concrete: $800k+ in annual savings, 93% less time on rostering, zero compliance breaches
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:sticky lg:top-24">
                      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
                        <div className="text-center mb-6 sm:mb-8">
                          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                            Get Your Free Whitepaper
                          </h2>
                          <p className="text-sm sm:text-base text-neutral-600">
                            Instant access to the full case study and strategic framework
                          </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                          {/* Name and Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2"
                              >
                                Name *
                              </label>
                              <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your name"
                              />
                              {errors.name && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="email"
                                className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2"
                              >
                                Email *
                              </label>
                              <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                              />
                              {errors.email && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Company (optional) */}
                          <div>
                            <label
                              htmlFor="company"
                              className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2"
                            >
                              Company
                            </label>
                            <input
                              {...register("company")}
                              type="text"
                              id="company"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Your organization"
                            />
                          </div>

                          {/* Industry and Role */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="industry"
                                className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2"
                              >
                                Industry *
                              </label>
                              <div className="relative" ref={industryDropdownRef}>
                                <button
                                  type="button"
                                  onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white"
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
                                        className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-blue-50 transition-colors text-neutral-900"
                                      >
                                        {option}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                              {errors.industry && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">
                                  {errors.industry.message}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="role"
                                className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2"
                              >
                                Role *
                              </label>
                              <input
                                {...register("role")}
                                type="text"
                                id="role"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Operations Manager"
                              />
                              {errors.role && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600">
                                  {errors.role.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-neutral-300 disabled:to-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2 text-sm sm:text-base"
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
                          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Instant download • 100% free</span>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* What's Inside - Mobile Only (After Form) */}
                    <div className="lg:hidden">
                      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
                          What&apos;s Inside
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              Poor rostering is silently costing your hospital — in turnover, agency spend, compliance risk, and burnout — and most executives never measure it
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              Workforce shortages are real, but many are compounded by scheduling systems that are unfair, opaque, and administratively broken
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              A real Auckland radiology department went from 40% understaffed to fully staffed for the first time in 28 years — by fixing how they scheduled
                            </p>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
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
                            <p className="text-sm sm:text-base text-neutral-700">
                              The financial case is concrete: $800k+ in annual savings, 93% less time on rostering, zero compliance breaches
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </Container>
          </div>
        </SiteLayout>
    </>
  );
}
