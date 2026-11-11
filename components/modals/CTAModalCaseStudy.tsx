"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { analytics } from "@/components/analytics/tracking";

interface CTAModalCaseStudyProps {
  isUS?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
  testMode?: boolean;
}

/**
 * Case Study Modal: Featured case study with results
 * Target: Users wanting to see proof and real-world results
 */
export default function CTAModalCaseStudy({
  isUS = false,
  isOpen,
  onClose,
  onConversion,
  testMode = false,
}: CTAModalCaseStudyProps) {
  const router = useRouter();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasTrackedView.current = false;
      return;
    }
    if (!testMode && !hasTrackedView.current) {
      analytics.track("cta_modal_viewed", {
        variant: "B",
        test_name: "cta_modal_ab_test",
        modal_type: "case_study",
      });
      hasTrackedView.current = true;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (!testMode)
          analytics.track("cta_modal_dismissed", {
            variant: "B",
            test_name: "cta_modal_ab_test",
          });
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, testMode]);

  const handleReadCaseStudy = () => {
    if (testMode) return;
    analytics.track("cta_modal_converted", {
      variant: "B",
      test_name: "cta_modal_ab_test",
      conversion_type: "case_study_view",
    });
    onConversion();
    router.push(
      `${isUS ? "/us/case-studies/how-plastics-department-used-schedule-simulation-to-cut-in-costs" : "/case-studies/how-plastics-department-used-roster-simulation-to-cut-in-costs"}?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_b`,
    );
  };

  const handleClose = () => {
    if (!testMode)
      analytics.track("cta_modal_dismissed", {
        variant: "B",
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
                {/* Case study image */}
                <div className="relative h-32 sm:h-40 md:h-36 lg:h-40 xl:h-48 w-full bg-gradient-to-br from-emerald-100 to-teal-100">
                  <img
                    src="/images/og-images/Plastics.jpg"
                    alt="Case Study Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card content */}
                <div className="p-3 sm:p-4 lg:p-5">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 mb-1.5 sm:mb-2 lg:mb-3">
                    {/* Popular Tag */}
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-sm">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
                    {isUS ? (
                      <>
                        Saved thousands per week from the first schedule: how a
                        junior doctor department with complex healthcare
                        scheduling needs moved from spreadsheets to
                        evidence-based planning.
                      </>
                    ) : (
                      <>
                        Saved thousands per week from the first roster: how a
                        junior doctor department with complex healthcare
                        rostering needs moved from spreadsheets to
                        evidence-based planning.
                      </>
                    )}
                  </p>
                </div>
              </article>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-4 pt-10 sm:p-6 sm:pt-14 md:p-6 md:pt-14 lg:p-10 lg:pt-14 flex flex-col justify-center lg:col-span-3 overflow-visible bg-white">
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
              <span className="text-emerald-600">Cut 15% in Costs</span> with
              Less Overtime
            </h2>

            {/* Subheading */}
            <p className="text-xs sm:text-sm lg:text-base text-neutral-600 mb-3 sm:mb-4 lg:mb-5">
              See how a Plastics Unit simulated {isUS ? "schedule" : "roster"}{" "}
              changes, validated a 15% cost reduction, and eliminated unplanned
              overtime with confidence.
            </p>

            <button
              type="button"
              onClick={handleReadCaseStudy}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              Read Full Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
