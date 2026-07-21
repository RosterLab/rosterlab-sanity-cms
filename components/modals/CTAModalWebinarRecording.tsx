"use client";

import { useEffect, useRef } from "react";
import { analytics } from "@/components/analytics/tracking";

interface CTAModalWebinarRecordingProps {
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
}

// Webinar URL with UTM tracking
const WEBINAR_URL = "https://rosterlab.com/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_c";

const trustedLogos = [
  { src: "/images/logos/new-logos/aus_gov.svg", alt: "Australian Government" },
  { src: "/images/logos/new-logos/central_island.svg", alt: "Central Island" },
  { src: "/images/logos/new-logos/hospice_west_auckland.svg", alt: "Hospice West Auckland" },
  { src: "/images/logos/new-logos/legalaid.svg", alt: "Legal Aid" },
  { src: "/images/logos/new-logos/monash.svg", alt: "Monash Health" },
  { src: "/images/logos/new-logos/nsw.svg", alt: "NSW Health" },
  { src: "/images/logos/new-logos/peticare.svg", alt: "Peticare" },
  { src: "/images/logos/new-logos/royal_prince.svg", alt: "Royal Prince Alfred" },
  { src: "/images/logos/new-logos/singhealth.svg", alt: "SingHealth" },
  { src: "/images/logos/new-logos/st_george.svg", alt: "St George" },
  { src: "/images/logos/new-logos/syd_kids.svg", alt: "Sydney Children's Hospital" },
  { src: "/images/logos/new-logos/ver_services_hawkes_bay.svg", alt: "Veterinary Services Hawke's Bay" },
  { src: "/images/logos/new-logos/legal_aid_wa.svg", alt: "Legal Aid WA" },
  { src: "/images/logos/new-logos/womens_and_childrens_adelaide.svg", alt: "Women's and Children's Hospital Adelaide" },
];

/**
 * Webinar Recording Modal: On-demand webinar case study
 * Target: Users interested in case studies and social proof
 */
export default function CTAModalWebinarRecording({
  isOpen,
  onClose,
  onConversion,
}: CTAModalWebinarRecordingProps) {
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (isOpen && !hasTrackedView.current) {
      // Track modal impression ONCE per session
      analytics.track("cta_modal_viewed", {
        variant: "C",
        test_name: "cta_modal_ab_test",
        modal_type: "webinar_recording",
      });
      hasTrackedView.current = true;
    }

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset tracking flag when modal closes for next session
      hasTrackedView.current = false;
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
    // Track as conversion - user is clicking to view case studies
    analytics.track("cta_modal_converted", {
      variant: "C",
      test_name: "cta_modal_ab_test",
      conversion_type: "case_study_view",
    });

    onConversion();

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
        className="relative bg-white rounded-2xl lg:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-auto animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
      >
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
          {/* Left column - Video */}
          <div className="relative bg-gradient-to-br from-[#1a3a52] to-[#0f2537] p-4 pt-14 sm:p-6 sm:pt-20 md:p-6 md:pt-20 lg:p-10 lg:pt-10 flex items-center justify-center min-h-[260px] sm:min-h-[340px] md:min-h-[360px] lg:min-h-[480px] lg:col-span-2">
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
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-sm lg:max-w-md z-10">
              {/* Video card */}
              <div className="bg-gradient-to-br from-[#234a63] to-[#1a3a52] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-2 sm:mb-3 lg:mb-4">
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
                  className="relative w-full aspect-video group cursor-pointer overflow-hidden block scale-90 sm:scale-95 lg:scale-100"
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
                <div className="p-2.5 sm:p-3 lg:p-4">
                  <h3 className="text-white font-bold text-xs sm:text-sm lg:text-base mb-0.5">
                    Building a Resilient Workforce
                  </h3>
                  <p className="text-teal-300 text-[10px] sm:text-xs line-clamp-1 sm:line-clamp-2">
                    A frontline perspective on AI rostering at Whanganui Hospital
                  </p>
                </div>
              </div>

              {/* Host profiles - stacked vertically */}
              <div className="flex flex-col items-stretch gap-1.5 sm:gap-2 lg:gap-2.5 w-full max-w-[280px] sm:max-w-xs">
                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-[#2a4a5e] rounded-full py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4 shadow-lg w-full animate-float">
                  <img
                    src="/images/og-images/Mike_profile.jpeg"
                    alt="Mike Peterson"
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full object-cover border-2 border-teal-400 flex-shrink-0"
                  />
                  <div className="text-[11px] sm:text-xs min-w-0 flex-1">
                    <div className="text-white font-semibold truncate">Mike Peterson</div>
                    <div className="text-teal-300 text-[9px] sm:text-[10px] truncate">Associate Radiology Manager</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 bg-[#2a4a5e] rounded-full py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4 shadow-lg w-full animate-float-delayed">
                  <img
                    src="/images/team/headshot-sunny.webp"
                    alt="Sunny Feng"
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full object-cover border-2 border-teal-400 flex-shrink-0"
                  />
                  <div className="text-[11px] sm:text-xs min-w-0 flex-1">
                    <div className="text-white font-semibold truncate">Sunny Feng</div>
                    <div className="text-teal-300 text-[9px] sm:text-[10px] truncate">Co-Founder of RosterLab</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="p-4 pt-10 sm:p-6 sm:pt-14 md:p-6 md:pt-14 lg:p-10 lg:pt-14 flex flex-col justify-center lg:col-span-3">
            {/* Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 lg:mb-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500 rounded-full" />
              <span className="text-teal-600 font-semibold text-[10px] sm:text-xs lg:text-sm uppercase tracking-wide">
                Webinar • On Demand
              </span>
            </div>

            {/* Heading */}
            <h2
              id="modal-heading"
              className="text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-900 mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight"
            >
              Watch how radiology team saved{" "}
              <span className="text-teal-500">170+ hours a year</span> on staff
              scheduling.
            </h2>

            {/* Description */}
            <div className="text-neutral-600 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg mb-3 sm:mb-4 md:mb-5 lg:mb-8 leading-relaxed space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4">
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
            <div className="flex flex-col sm:flex-row md:flex-row gap-2.5 sm:gap-3 md:gap-3 lg:gap-4 mb-4 sm:mb-6 md:mb-6 lg:mb-8">
              <a
                href={WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWatchRecording}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm sm:text-base md:text-sm py-2.5 sm:py-3 md:py-2.5 lg:py-4 px-4 sm:px-5 md:px-4 lg:px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                className="flex-1 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold text-sm sm:text-base md:text-sm py-2.5 sm:py-3 md:py-2.5 lg:py-4 px-4 sm:px-5 md:px-4 lg:px-6 rounded-lg transition-colors duration-200 border-2 border-neutral-200 hover:border-neutral-300 flex items-center justify-center gap-1.5 sm:gap-2"
              >
                See more case studies
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
              </a>
            </div>

            {/* Trust indicators - Rolling logos */}
            <div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wide mb-2 sm:mb-3 lg:mb-4">
                Trusted by
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll hover:[animation-play-state:paused]">
                  {[...trustedLogos, ...trustedLogos].map((logo, i) => (
                    <img
                      key={`${logo.src}-${i}`}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-6 sm:h-7 lg:h-8 object-contain grayscale opacity-60 flex-shrink-0"
                      aria-hidden={i >= trustedLogos.length ? "true" : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
