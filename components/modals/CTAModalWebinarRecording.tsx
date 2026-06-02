"use client";

import { useEffect } from "react";
import { analytics } from "@/components/analytics/tracking";

interface CTAModalWebinarRecordingProps {
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
}

// Webinar URL with UTM tracking
const WEBINAR_URL = "https://rosterlab.com/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_c";

/**
 * Webinar Recording Modal: On-demand webinar case study
 * Target: Users interested in case studies and social proof
 */
export default function CTAModalWebinarRecording({
  isOpen,
  onClose,
  onConversion,
}: CTAModalWebinarRecordingProps) {
  useEffect(() => {
    if (isOpen) {
      // Track modal impression
      analytics.track("cta_modal_viewed", {
        variant: "C",
        test_name: "cta_modal_ab_test",
        modal_type: "webinar_recording",
      });

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleWatchRecording = () => {
    analytics.track("cta_modal_converted", {
      variant: "C",
      test_name: "cta_modal_ab_test",
      conversion_type: "webinar_view",
    });

    onConversion();

    // Open webinar recording with UTM tracking
    window.open(WEBINAR_URL, "_blank");
  };

  const handleCaseStudies = () => {
    analytics.track("cta_modal_secondary_action", {
      variant: "C",
      test_name: "cta_modal_ab_test",
      action: "case_studies_click",
    });

    // Restore body scroll before navigation
    document.body.style.overflow = "";

    // Close the modal
    onClose();
  };

  const handleClose = () => {
    analytics.track("cta_modal_dismissed", {
      variant: "C",
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
        className="relative bg-white rounded-3xl shadow-2xl max-w-7xl w-full overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 text-neutral-400 hover:text-neutral-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white"
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
        <div className="grid md:grid-cols-5 gap-0">
          {/* Left column - Video */}
          <div className="relative bg-gradient-to-br from-[#1a3a52] to-[#0f2537] p-10 md:p-16 flex items-center justify-center min-h-[500px] md:min-h-[700px] md:col-span-2">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Video thumbnail */}
            <div className="relative w-full max-w-md z-10">
              {/* Video card */}
              <div className="bg-gradient-to-br from-[#234a63] to-[#1a3a52] rounded-2xl overflow-hidden shadow-2xl mb-6">
                {/* Webinar thumbnail - clickable */}
                <a
                  href={WEBINAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    analytics.track("cta_modal_converted", {
                      variant: "C",
                      test_name: "cta_modal_ab_test",
                      conversion_type: "webinar_view",
                    });
                    onConversion();
                  }}
                  className="relative w-full aspect-video group cursor-pointer overflow-hidden block"
                  aria-label="Play webinar recording"
                >
                  {/* Background Image */}
                  <img
                    src="/images/illustration/webinar rad popup modal.jpg"
                    alt="Webinar preview"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </a>

                {/* Video info */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-1">
                    Building a Resilient Workforce
                  </h3>
                  <p className="text-teal-300 text-sm">
                    A frontline perspective on AI rostering at Whanganui Hospital
                  </p>
                </div>
              </div>

              {/* Host profiles - stacked vertically */}
              <div className="flex flex-col items-stretch gap-3 w-full max-w-xs">
                <div className="flex items-center gap-3 bg-[#2a4a5e] rounded-full py-2 px-4 shadow-lg w-full animate-float">
                  <img
                    src="/images/og-images/Mike_profile.jpeg"
                    alt="Mike Peterson"
                    className="w-12 h-12 rounded-full object-cover border-3 border-teal-400 flex-shrink-0"
                  />
                  <div className="text-sm min-w-0 flex-1">
                    <div className="text-white font-semibold">Mike Peterson</div>
                    <div className="text-teal-300 text-xs">Associate Radiology Manager</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#2a4a5e] rounded-full py-2 px-4 shadow-lg w-full animate-float-delayed">
                  <img
                    src="/images/team/headshot-sunny.webp"
                    alt="Sunny Feng"
                    className="w-12 h-12 rounded-full object-cover border-3 border-teal-400 flex-shrink-0"
                  />
                  <div className="text-sm min-w-0 flex-1">
                    <div className="text-white font-semibold">Sunny Feng</div>
                    <div className="text-teal-300 text-xs">Co-Founder of RosterLab</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-10 md:p-16 flex flex-col justify-center md:col-span-3">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-teal-500 rounded-full" />
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
                Webinar • On Demand
              </span>
            </div>

            {/* Heading */}
            <h2
              id="modal-heading"
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight"
            >
              Watch how radiology team saved{" "}
              <span className="text-teal-500">170+ hours a year</span> on staff
              scheduling.
            </h2>

            {/* Description */}
            <div className="text-neutral-600 text-xl mb-10 leading-relaxed space-y-4">
              <p>
                Mike Peterson (Associate Radiology Manager) sits down with{" "}
                <a
                  href="/about?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_c_bio#team"
                  className="text-teal-600 hover:text-teal-700 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sunny Feng
                </a>{" "}
                (Co-Founder) to discuss how AI-powered rostering replaced
                spreadsheets in a 24/7 radiology department.
              </p>
              <p className="font-medium text-neutral-700">
                The result: less time spent scheduling and more time focused on
                patients.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWatchRecording}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the recording
              </a>

              <a
                href="/case-studies?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_c_secondary"
                onClick={handleCaseStudies}
                className="flex-1 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 border-2 border-neutral-200 hover:border-neutral-300 flex items-center justify-center gap-2"
              >
                See more case studies
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

            {/* Trust indicators - Rolling logos */}
            <div>
              <div className="text-xs text-neutral-400 uppercase tracking-wide mb-4">
                Trusted by
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused]">
                  {/* First set of logos */}
                  <img
                    src="/images/logos/whanganui.png"
                    alt="Whanganui Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/department-of-health-western-australia.png"
                    alt="Department of Health Western Australia"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/rpa.png"
                    alt="RPA Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/hawkesbay.png"
                    alt="Hawke's Bay Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/nsw-south-eastern.png"
                    alt="NSW State Emergency Service"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  {/* Duplicate set for seamless loop */}
                  <img
                    src="/images/logos/whanganui.png"
                    alt="Whanganui Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/department-of-health-western-australia.png"
                    alt="Department of Health Western Australia"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/rpa.png"
                    alt="RPA Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/hawkesbay.png"
                    alt="Hawke's Bay Hospital"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                  <img
                    src="/images/logos/nsw-south-eastern.png"
                    alt="NSW State Emergency Service"
                    className="h-8 object-contain grayscale opacity-60 flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
