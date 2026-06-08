"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { analytics } from "@/components/analytics/tracking";

const demoVideoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select your role"),
  industry: z.string().min(1, "Please select your industry"),
  lookingFor: z.array(z.string()).min(1, "Please select at least one option"),
});

type DemoVideoFormData = z.infer<typeof demoVideoFormSchema>;

interface CTAModalDemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
  testMode?: boolean;
}

/**
 * Demo Video Modal: Unlock demo video showing how RosterLab works
 * Target: Users wanting to see the product in action without booking a call
 */
export default function CTAModalDemoVideo({
  isOpen,
  onClose,
  onConversion,
  testMode = false,
}: CTAModalDemoVideoProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const industryDropdownRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<DemoVideoFormData>({
    resolver: zodResolver(demoVideoFormSchema),
    mode: "onChange",
    defaultValues: {
      lookingFor: [],
    },
  });

  const selectedIndustry = watch("industry");
  const lookingForValues = watch("lookingFor") || [];

  const toggleLookingFor = (value: string) => {
    const currentValues = lookingForValues;
    if (currentValues.includes(value)) {
      setValue("lookingFor", currentValues.filter((v) => v !== value), { shouldValidate: true });
    } else {
      setValue("lookingFor", [...currentValues, value], { shouldValidate: true });
    }
  };

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

  useEffect(() => {
    if (isOpen && !hasTrackedView.current) {
      // Track modal impression ONCE per session
      analytics.track("cta_modal_viewed", {
        variant: "D",
        test_name: "cta_modal_ab_test",
        modal_type: "demo_video",
      });
      hasTrackedView.current = true;
    }

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
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
  }, [isOpen, reset]);

  const onSubmit = async (data: DemoVideoFormData) => {
    setIsSubmitting(true);

    // CRITICAL: Identify user FIRST before any other tracking
    // This links the anonymous session to the user's email
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    console.log("🔍 [Variant D] About to identify user:", {
      email: data.email,
      anonymousId: analytics.getDeviceId(),
      timestamp: new Date().toISOString(),
    });

    analytics.identify(data.email, {
      email: data.email,
      firstName: firstName,
      lastName: lastName,
      industry: data.industry,
      role: data.role,
      lookingFor: data.lookingFor,
    });

    console.log("✅ [Variant D] User identification called");

    // Track form submission
    analytics.track("cta_modal_form_submitted", {
      variant: "D",
      test_name: "cta_modal_ab_test",
      modal_type: "demo_video",
      industry: data.industry,
      role: data.role,
      looking_for: data.lookingFor,
    });

    try {
      // Submit to your backend/CRM (e.g., HubSpot, custom API)
      const response = await fetch("/api/demo-video-gate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        analytics.track("cta_modal_converted", {
          variant: "D",
          test_name: "cta_modal_ab_test",
          conversion_type: "demo_video_view",
        });

        onConversion();
        setIsSubmitted(true);

        // Redirect to demo video after a brief delay using client-side navigation
        setTimeout(() => {
          router.push("/demo-video?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_d");
        }, 1500);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      analytics.track("cta_modal_form_error", {
        variant: "D",
        test_name: "cta_modal_ab_test",
        error_message: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    analytics.track("cta_modal_dismissed", {
      variant: "D",
      test_name: "cta_modal_ab_test",
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
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-neutral-400 hover:text-neutral-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-lg"
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
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0">
          {/* Left column - Video preview */}
          <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-3 pt-12 sm:p-5 sm:pt-18 md:p-5 md:pt-18 lg:p-10 lg:pt-10 flex items-center justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[480px] lg:col-span-2">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 sm:top-8 sm:left-8 md:top-10 md:left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full blur-3xl" />
            </div>

            {/* Video preview card */}
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-md z-10 scale-85 sm:scale-90 md:scale-95 lg:scale-100">
              {/* FREE ACCESS badge */}
              <div className="absolute -top-1.5 sm:-top-2 lg:-top-5 left-0 z-10 animate-pulse">
                <span className="inline-flex items-center gap-0.5 sm:gap-1 lg:gap-2 bg-yellow-400 text-yellow-900 text-[9px] sm:text-[10px] lg:text-sm font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-5 lg:py-2.5 rounded-md sm:rounded-lg uppercase tracking-wide shadow-xl">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlock Free Access
                </span>
              </div>

              {/* Video card */}
              <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/20 mt-2 sm:mt-4 md:mt-6 lg:mt-8">
                {/* Video thumbnail with play button */}
                <div className="relative w-full aspect-video flex items-center justify-center">
                  {/* Thumbnail image */}
                  <img
                    src="/images/og-images/demo_vid_thumbnail.png"
                    alt="RosterLab Demo Video"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Play icon */}
                  <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-purple-600 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 md:bottom-3 md:right-3 lg:bottom-4 lg:right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs md:text-sm font-semibold px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-2.5 md:py-1 lg:px-3 lg:py-1 rounded sm:rounded-md md:rounded-lg">
                    5:00
                  </div>
                </div>

                {/* Video info */}
                <div className="p-2 sm:p-3 md:p-4 lg:p-5 bg-white/5 backdrop-blur-sm">
                  <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-lg mb-0.5">
                    How RosterLab Works
                  </h3>
                  <p className="text-purple-200 text-[10px] sm:text-xs md:text-sm lg:text-base">
                    High-Level Product Walkthrough • 5 min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-4 pt-10 sm:p-6 sm:pt-14 md:p-6 md:pt-14 lg:p-10 lg:pt-14 flex flex-col justify-center lg:col-span-3">
            {isSubmitted ? (
              // Success state
              <div className="text-center py-6 sm:py-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600"
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
                  Thank you!
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4">
                  Opening demo video...
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              // Form state
              <>
                {/* Badge */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-600 font-semibold text-[10px] sm:text-xs lg:text-sm uppercase tracking-wide">
                    Product Demo • 5 Min Watch
                  </span>
                </div>

                {/* Heading */}
                <h2
                  id="modal-heading"
                  className="text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-900 mb-2 sm:mb-3 md:mb-3 lg:mb-4 leading-tight"
                >
                  See RosterLab in action:{" "}
                  <span className="text-purple-600">5-minute high-level product tour</span>
                </h2>

                {/* Subheading */}
                <p className="text-xs sm:text-sm md:text-sm lg:text-base text-neutral-600 mb-3 sm:mb-4 md:mb-4 lg:mb-5">
                  Watch a quick overview of how RosterLab automates scheduling, ensures compliance, and saves you hours every week.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3 md:space-y-3 lg:space-y-4">
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
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Jane Smith"
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
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="jane@hospital.com"
                      />
                      {errors.email && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Role and Industry */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                    {/* Role Input */}
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
                        className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g., Operations Manager"
                      />
                      {errors.role && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    {/* Industry Dropdown */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-0.5 sm:mb-1">
                        Industry *
                      </label>
                      <div className="relative" ref={industryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                          className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 pr-8 sm:pr-10 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white cursor-pointer hover:border-neutral-400 transition-colors text-left"
                        >
                          <span className={selectedIndustry ? "text-neutral-900" : "text-neutral-500"}>
                            {selectedIndustry || "Select industry"}
                          </span>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                            <svg
                              className={`w-4 h-4 transition-transform ${industryDropdownOpen ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </button>
                        {industryDropdownOpen && (
                          <div className="absolute z-[10000] mt-1 w-full bg-white border border-neutral-300 rounded-lg shadow-xl max-h-40 sm:max-h-48 overflow-auto">
                            {[
                              "Healthcare",
                              "Retail",
                              "Manufacturing",
                              "Transportation",
                              "Business Services",
                              "Others",
                            ].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setValue("industry", option, { shouldValidate: true });
                                  setIndustryDropdownOpen(false);
                                }}
                                className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm text-left hover:bg-purple-50 transition-colors text-neutral-900"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.industry && (
                        <p className="mt-0.5 text-xs text-red-600">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* What are you looking for */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-2 sm:mb-2.5 lg:mb-3">
                      What are you looking for? *
                    </label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {[
                        { value: "Automate scheduling", label: "Automate scheduling" },
                        { value: "Save time", label: "Save time" },
                        { value: "Reduce costs", label: "Reduce costs" },
                        { value: "Improve compliance", label: "Improve compliance" },
                        { value: "Reduce staff fatigue", label: "Reduce staff fatigue" },
                        { value: "Better quality schedules", label: "Better quality schedules" },
                        { value: "More efficient staffing", label: "More efficient staffing" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleLookingFor(option.value)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                            lookingForValues.includes(option.value)
                              ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-300"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    {errors.lookingFor && (
                      <p className="mt-0.5 text-xs text-red-600">
                        {errors.lookingFor.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base py-2 sm:py-2.5 lg:py-3 px-4 sm:px-5 lg:px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-1.5 sm:gap-2"
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
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Unlock Demo Video Now
                      </>
                    )}
                  </button>
                </form>

                {/* Spacer for logos */}
                <div className="mt-4 sm:mt-6 lg:mt-8"></div>
              </>
            )}

            {/* Trust indicators - Rolling logos */}
            <div>
              <div className="relative overflow-hidden">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 logo-scroll">
                  {/* First set of logos */}
                  <img
                    src="/images/logos/whanganui.png"
                    alt="Whanganui Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/department-of-health-western-australia.png"
                    alt="Department of Health Western Australia"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/rpa.png"
                    alt="RPA Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/hawkesbay.png"
                    alt="Hawke's Bay Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/nsw-south-eastern.png"
                    alt="NSW State Emergency Service"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  {/* Duplicate set for seamless loop */}
                  <img
                    src="/images/logos/whanganui.png"
                    alt="Whanganui Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/department-of-health-western-australia.png"
                    alt="Department of Health Western Australia"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/rpa.png"
                    alt="RPA Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/hawkesbay.png"
                    alt="Hawke's Bay Hospital"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/nsw-south-eastern.png"
                    alt="NSW State Emergency Service"
                    className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-scroll {
          animation: logoScroll 20s linear infinite;
        }

        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
