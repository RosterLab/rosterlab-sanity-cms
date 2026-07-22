"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { analytics } from "@/components/analytics/tracking";
import Image from "next/image";

interface CTAModalDemoBookingProps {
  isOpen: boolean;
  onClose: () => void;
  onConversion: () => void;
  testMode?: boolean; // Add test mode flag
}

/**
 * Demo Booking Modal: Direct demo booking CTA with Live Demo showcase
 * Target: Users wondering if RosterLab can handle their complex situation
 */
export default function CTAModalDemoBooking({
  isOpen,
  onClose,
  onConversion,
  testMode = false,
}: CTAModalDemoBookingProps) {
  const router = useRouter();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (isOpen && !hasTrackedView.current) {
      // Track modal impression ONCE per session
      analytics.track("cta_modal_viewed", {
        variant: "A",
        test_name: "cta_modal_ab_test",
        modal_type: "live_demo",
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

  const handleBookDemo = () => {
    analytics.track("cta_modal_converted", {
      variant: "A",
      test_name: "cta_modal_ab_test",
      conversion_type: "demo_booking",
    });

    onConversion();

    // Only redirect in production (not test mode)
    if (!testMode) {
      setTimeout(() => {
        router.push("/book-a-demo?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_a");
      }, 300);
    } else {
      console.log("🎯 TEST MODE: Would redirect to /book-a-demo?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_a");
    }
  };

  const handleClose = () => {
    analytics.track("cta_modal_dismissed", {
      variant: "A",
      test_name: "cta_modal_ab_test",
    });

    onClose();
  };

  if (!isOpen) return null;

  const logos = [
    { src: "/images/logos/new-logos/aus_gov.svg", alt: "Australian Government" },
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
    { src: "/images/logos/new-logos/central_island.svg", alt: "Central Island" },
  ];

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
        className="relative bg-white rounded-2xl lg:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        onClick={(e) => e.stopPropagation()}
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
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-neutral-400 hover:text-neutral-600 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-lg"
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

        <div className="flex flex-col lg:grid lg:grid-cols-2">
          {/* Left Side - Illustration */}
          <div className="relative bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 p-6 pt-20 sm:p-8 sm:pt-24 md:p-8 md:pt-24 lg:p-8 lg:pt-8 flex items-center justify-center min-h-[320px] md:min-h-[380px] lg:min-h-[500px]">
            {/* Live Demonstration Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-[calc(100%-100px)] sm:max-w-[calc(100%-80px)]">
              <div className="flex items-center gap-2 bg-cyan-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-sm font-semibold tracking-wide shadow-lg">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                LIVE DEMONSTRATION
              </div>
            </div>

            {/* App Screenshot Illustration */}
            <div className="relative w-full max-w-xl">
              <Image
                src="/images/illustration/CTA Popup Illu.png"
                alt="RosterLab App Demo - Auto-generating rosters and solution analysis"
                width={1200}
                height={800}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="p-6 pt-14 sm:p-8 sm:pt-16 md:p-10 md:pt-14 lg:p-12 lg:pt-16 flex flex-col justify-between">
            <div>
              {/* Heading - Smaller size, stays on one line */}
              <h2
                id="modal-heading"
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4 md:mb-4 leading-tight"
              >
                See RosterLab <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">in action!</span>
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-neutral-600 mb-3 md:mb-3 lg:mb-4 leading-relaxed">
                Book a{" "}
                <span className="font-semibold text-neutral-900">
                  FREE walkthrough
                </span>{" "}
                to see how we can solve your scheduling challenges within
                minutes.
              </p>

              <p className="text-sm sm:text-base md:text-base lg:text-lg text-neutral-600 mb-4 md:mb-5 lg:mb-6 leading-relaxed">
                Start saving{" "}
                <span className="font-semibold text-neutral-900">
                  90% of your admin work
                </span>
                , so you can focus on what truly matters.
              </p>

              {/* CTA Button - Full width */}
              <button
                onClick={handleBookDemo}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-extrabold text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl px-6 sm:px-8 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-3.5 lg:py-4 xl:py-5 rounded-xl lg:rounded-2xl hover:from-cyan-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 sm:gap-3 group"
              >
                BOOK YOUR SPOT NOW
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Trust Indicators with Rolling Animation */}
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-6 md:pt-6 lg:pt-8 border-t border-neutral-200 overflow-hidden">
              <p className="text-xs font-semibold text-neutral-500 tracking-wider uppercase mb-4 lg:mb-6 text-center">
                TRUSTED BY LEADING HEALTHCARE ORGANISATIONS
              </p>

              {/* Scrolling Logo Container */}
              <div className="relative">
                {/* Gradient overlays for smooth fade */}
                <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Animated Logo Track */}
                <div className="flex overflow-hidden">
                  <div className="flex animate-scroll-logos">
                    {/* First set of logos */}
                    {logos.map((logo, index) => (
                      <div
                        key={`logo-1-${index}`}
                        className="relative h-10 lg:h-12 w-32 lg:w-40 flex-shrink-0 mx-4 lg:mx-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {logos.map((logo, index) => (
                      <div
                        key={`logo-2-${index}`}
                        className="relative h-10 lg:h-12 w-32 lg:w-40 flex-shrink-0 mx-4 lg:mx-6 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-logos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-logos {
          animation: scroll-logos 90s linear infinite;
        }

        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
