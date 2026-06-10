"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { analytics } from "@/components/analytics/tracking";

const caseStudyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  industry: z.string().min(1, "Please select your industry"),
  role: z.string().min(1, "Please select your role"),
});

type CaseStudyFormData = z.infer<typeof caseStudyFormSchema>;

interface CTAModalCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
  testMode?: boolean;
  caseStudySlug?: string;
  isContentGate?: boolean;
}

/**
 * Case Study Modal: Featured case study with results
 * Target: Users wanting to see proof and real-world results
 * Can also be used as a content gate for specific case studies
 */
export default function CTAModalCaseStudy({
  isOpen,
  onClose,
  onConversion,
  testMode = false,
  caseStudySlug,
  isContentGate = false,
}: CTAModalCaseStudyProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [dropdownOpenUpward, setDropdownOpenUpward] = useState(false);
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudyFormSchema),
    mode: "onChange",
  });

  const selectedIndustry = watch("industry");

  // Close dropdown when clicking outside and check if should open upward
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industryDropdownRef.current && !industryDropdownRef.current.contains(event.target as Node)) {
        setIndustryDropdownOpen(false);
      }
    };

    if (industryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      // Check if dropdown should open upward
      if (industryDropdownRef.current) {
        const rect = industryDropdownRef.current.getBoundingClientRect();
        const dropdownHeight = 240; // max-h-60 = 240px
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        // Open upward if not enough space below and more space above
        setDropdownOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [industryDropdownOpen]);

  useEffect(() => {
    if (isOpen && !hasTrackedView.current) {
      // Track modal impression ONCE per session
      analytics.track("cta_modal_viewed", {
        variant: "B",
        test_name: "cta_modal_ab_test",
        modal_type: "case_study",
      });
      hasTrackedView.current = true;
    }

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Handle ESC key to close modal (but not during submission)
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isSubmitting) {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
      // Reset form when modal closes
      setIsSubmitted(false);
      reset();
      // Reset tracking flag when modal closes for next session
      hasTrackedView.current = false;
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset, isSubmitting]);

  const onSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);

    // CRITICAL: Identify user FIRST before any other tracking
    // This links the anonymous session to the user's email
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    console.log("🔍 [Variant B] About to identify user:", {
      email: data.email,
      anonymousId: analytics.getDeviceId(),
      timestamp: new Date().toISOString(),
    });

    analytics.identify(data.email, {
      email: data.email,
      firstName: firstName,
      lastName: lastName,
      company: data.company || undefined,
      industry: data.industry,
      title: data.role,
    });

    console.log("✅ [Variant B] User identification called");

    // Track form submission
    analytics.track("cta_modal_form_submitted", {
      variant: "B",
      test_name: "cta_modal_ab_test",
      modal_type: "case_study",
      is_content_gate: isContentGate,
      case_study_slug: caseStudySlug,
      industry: data.industry,
      role: data.role,
      has_company: !!data.company,
    });

    try {
      // Submit to your backend/CRM (e.g., HubSpot, custom API)
      console.log("📤 Submitting to HubSpot API...", data);
      const response = await fetch("/api/case-study-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📥 API Response:", {
        status: response.status,
        ok: response.ok,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ HubSpot submission successful:", responseData);

        analytics.track("cta_modal_converted", {
          variant: "B",
          test_name: "cta_modal_ab_test",
          conversion_type: "case_study_view",
          is_content_gate: isContentGate,
          case_study_slug: caseStudySlug,
        });

        // Set localStorage to unlock case studies
        if (typeof window !== "undefined") {
          localStorage.setItem("case_study_unlocked", "true");
        }

        setIsSubmitted(true);

        // Wait briefly to show success message, then handle conversion
        setTimeout(() => {
          // Call conversion callback (closes modal and unlocks content)
          onConversion();

          // Handle redirect based on context (only for non-gated flow)
          if (!isContentGate && !testMode) {
            // Exit intent modal - redirect to the case study page using client-side navigation
            router.push("/case-studies/how-plastics-department-used-roster-simulation-to-cut-in-costs?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_b");
          } else if (testMode) {
            console.log("🎯 TEST MODE:", isContentGate ? "Content unlocked, modal will close" : "Would redirect to case study page");
          }
          // If isContentGate, modal closes via onConversion and content shows
        }, 800);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ API Error:", response.status, errorData);
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      analytics.track("cta_modal_form_error", {
        variant: "B",
        test_name: "cta_modal_ab_test",
        is_content_gate: isContentGate,
        case_study_slug: caseStudySlug,
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Prevent closing while form is submitting
    if (isSubmitting) {
      return;
    }

    analytics.track("cta_modal_dismissed", {
      variant: "B",
      test_name: "cta_modal_ab_test",
      is_content_gate: isContentGate,
      case_study_slug: caseStudySlug,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl lg:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-auto animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        {/* Test Mode Indicator */}
        {testMode && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold z-20">
            TEST MODE
          </div>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-neutral-400 hover:text-neutral-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Two-column layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0 rounded-2xl lg:rounded-3xl overflow-hidden">
          {/* Left column - Hero image */}
          <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 pt-14 sm:p-6 sm:pt-20 md:p-6 md:pt-20 lg:p-10 lg:pt-10 flex items-center justify-center min-h-[260px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[480px] lg:col-span-2">
            {/* Success badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-[calc(100%-100px)] sm:max-w-[calc(100%-80px)]">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-emerald-500 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-lg">
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Success Story
              </div>
            </div>

            {/* Case study card preview */}
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md z-10 mx-auto">
              <article className="bg-white rounded-lg shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
                {/* Case study image with lock icon */}
                <div className="relative h-32 sm:h-40 md:h-36 lg:h-40 xl:h-48 w-full bg-gradient-to-br from-emerald-100 to-teal-100">
                  <img
                    src="/images/og-images/Plastics.jpg"
                    alt="Case Study Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Lock Icon Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-1.5 sm:p-2 lg:p-3 shadow-lg">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 mb-1.5 sm:mb-2 lg:mb-3">
                    {/* Popular Tag */}
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Popular
                    </span>
                    {/* Category Tag */}
                    <span className="inline-block bg-primary-100 text-primary-800 text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full">
                      Case Studies
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base lg:text-lg font-bold mb-1.5 sm:mb-2 line-clamp-2 text-neutral-900">
                    One small team, many complex constraints
                  </h2>

                  <p className="text-neutral-600 mb-0 line-clamp-2 sm:line-clamp-3 text-[11px] sm:text-xs lg:text-sm">
                    Saved thousands per week from the first roster: how a junior doctor department with complex healthcare rostering needs moved from spreadsheets to evidence-based planning.
                  </p>
                </div>
              </article>

              {/* Call-to-action bubble */}
              <div className="absolute -bottom-3 sm:-bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 animate-float">
                <div className="relative">
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse opacity-30"></div>

                  {/* Main bubble */}
                  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-1.5 lg:px-6 lg:py-3 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm md:text-xs whitespace-nowrap">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span>Fill form to unlock</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Sparkles */}
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 md:-top-0.5 md:-right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-1.5 md:h-1.5 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 md:-bottom-0.5 md:-left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-1.5 md:h-1.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-4 pt-10 sm:p-6 sm:pt-14 md:p-6 md:pt-14 lg:p-10 lg:pt-14 flex flex-col justify-center lg:col-span-3 overflow-visible bg-white">
            {isSubmitted ? (
              // Success state
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-600"
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
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 mb-2 sm:mb-3">
                  {isContentGate ? "Case Study Unlocked!" : "Thank you!"}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4">
                  {isContentGate ? "Loading your case study..." : "Redirecting you to the case study..."}
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              // Form state
              <>
                {/* Badge */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 font-semibold text-[10px] sm:text-xs lg:text-sm uppercase tracking-wide">
                    Case Study • Workforce Planning
                  </span>
                </div>

                {/* Heading */}
                <h2
                  id="modal-heading"
                  className="text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-900 mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 leading-tight"
                >
                  Read How One Hospital Department{" "}
                  <span className="text-emerald-600">
                    Cut 15% in Costs
                  </span>{" "}
                  with Less Overtime
                </h2>

                {/* Subheading */}
                <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mb-3 sm:mb-4 lg:mb-5">
                  {isContentGate
                    ? "Enter your details below to unlock this case study and see how a Plastics Unit simulated roster changes, validated a 15% cost reduction, and eliminated unplanned overtime with confidence."
                    : "Enter your details to see how a Plastics Unit simulated roster changes, validated a 15% cost reduction, and eliminated unplanned overtime with confidence."
                  }
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3 lg:space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1"
                      >
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1"
                      >
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Industry and Role */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1"
                      >
                        Industry *
                      </label>
                      <div className="relative" ref={industryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                          className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 pr-8 sm:pr-10 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-left bg-white"
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
                          <div
                            className={`absolute z-[10000] w-full bg-white border border-neutral-300 rounded-lg shadow-xl overflow-hidden ${
                              dropdownOpenUpward ? 'bottom-full mb-1' : 'top-full mt-1'
                            }`}
                          >
                            <div className="max-h-40 sm:max-h-48 overflow-y-auto overflow-x-hidden">
                              {["Healthcare", "Retail", "Manufacturing", "Transportation", "Business Services", "Others"].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setValue("industry", option, { shouldValidate: true });
                                    setIndustryDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-2 sm:px-4 sm:py-3 text-sm hover:bg-emerald-50 transition-colors text-neutral-900 border-b border-neutral-100 last:border-b-0"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.industry && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1"
                      >
                        Role *
                      </label>
                      <input
                        {...register("role")}
                        type="text"
                        id="role"
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Operations Manager"
                      />
                      {errors.role && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1"
                    >
                      Company
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base md:text-base py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-4 sm:px-6 md:px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        Read Full Case Study
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
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
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
