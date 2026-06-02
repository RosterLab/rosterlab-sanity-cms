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
    if (isOpen) {
      // Track modal impression
      analytics.track("cta_modal_viewed", {
        variant: "B",
        test_name: "cta_modal_ab_test",
        modal_type: "case_study",
      });

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
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset, isSubmitting]);

  const onSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);

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
        className="relative bg-white rounded-3xl shadow-2xl max-w-7xl w-full animate-slide-up"
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
          className="absolute top-6 right-6 z-10 text-neutral-400 hover:text-neutral-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="grid md:grid-cols-5 gap-0 rounded-3xl overflow-x-hidden">
          {/* Left column - Hero image */}
          <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-10 md:p-16 flex items-center justify-center min-h-[500px] md:min-h-[700px] md:col-span-2 rounded-l-3xl overflow-hidden">
            {/* Success badge */}
            <div className="absolute top-6 left-6 z-10">
              <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
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
                Success Story
              </div>
            </div>

            {/* Case study card preview */}
            <div className="relative w-full max-w-md z-10 mx-auto">
              <article className="bg-white rounded-lg shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
                {/* Case study image with lock icon */}
                <div className="relative h-56 w-full bg-gradient-to-br from-emerald-100 to-teal-100">
                  <img
                    src="/images/og-images/Plastics.jpg"
                    alt="Case Study Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Lock Icon Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <svg
                        className="w-8 h-8 text-emerald-600"
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
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/* Popular Tag */}
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Popular
                    </span>
                    {/* Category Tag */}
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      Case Studies
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 line-clamp-2 text-neutral-900">
                    One small team, many complex constraints
                  </h2>

                  <p className="text-neutral-600 mb-4 line-clamp-3 text-sm">
                    Saved thousands per week from the first roster: how a junior doctor department with complex healthcare rostering needs moved from spreadsheets to evidence-based planning.
                  </p>
                </div>
              </article>

              {/* Call-to-action bubble */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 animate-float">
                <div className="relative">
                  {/* Pulse rings */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse opacity-30"></div>

                  {/* Main bubble */}
                  <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span>Fill form to unlock</span>
                    <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Sparkles */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-10 md:p-16 flex flex-col justify-center md:col-span-3 overflow-visible rounded-r-3xl bg-white">
            {isSubmitted ? (
              // Success state
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-emerald-600"
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
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {isContentGate ? "Case Study Unlocked!" : "Thank you!"}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {isContentGate ? "Loading your case study..." : "Redirecting you to the case study..."}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              // Form state
              <>
                {/* Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
                    Case Study • Workforce Planning
                  </span>
                </div>

                {/* Heading */}
                <h2
                  id="modal-heading"
                  className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight"
                >
                  Read How One Hospital Department{" "}
                  <span className="text-emerald-600">
                    Cut 15% in Costs
                  </span>{" "}
                  with Less Overtime
                </h2>

                {/* Subheading */}
                <p className="text-neutral-600 mb-6">
                  {isContentGate
                    ? "Enter your details below to unlock this case study and see how a Plastics Unit simulated roster changes, validated a 15% cost reduction, and eliminated unplanned overtime with confidence."
                    : "Enter your details to see how a Plastics Unit simulated roster changes, validated a 15% cost reduction, and eliminated unplanned overtime with confidence."
                  }
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Industry and Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Industry *
                      </label>
                      <div className="relative" ref={industryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                          className="w-full px-3 py-2 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-left bg-white"
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
                            <div className="h-[200px] overflow-y-auto overflow-x-hidden">
                              {["Healthcare", "Retail", "Manufacturing", "Transportation", "Business Services", "Others"].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setValue("industry", option, { shouldValidate: true });
                                    setIndustryDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors text-neutral-900 border-b border-neutral-100 last:border-b-0"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
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
                        className="block text-sm font-medium text-neutral-700 mb-1"
                      >
                        Role *
                      </label>
                      <input
                        {...register("role")}
                        type="text"
                        id="role"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="e.g., Operations Manager"
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-neutral-700 mb-1"
                    >
                      Company
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Your organization"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        Read Full Case Study
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
