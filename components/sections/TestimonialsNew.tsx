"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Testimonials";

// A wash of the brand blue — light enough that the page dot grid still shows
// through. The curved edges below are filled with the same value so the band
// reads as one shape.
const BAND_TINT = "rgba(55, 121, 221, 0.07)";

/**
 * A quote is a list of fragments. Plain strings render as normal text;
 * fragments wrapped as `{ highlight: "…" }` render in the brand blue so
 * the section can lean on colour to draw the eye to key phrases.
 */
export type QuoteFragment = string | { highlight: string };

export interface Testimonial {
  quote: QuoteFragment[];
  author: string;
  role: string;
  caseStudyLink?: string | null;
  link?: { href: string; label: string } | null;
}

// Mike (Whanganui, "7-8 days → 2-3 hours") is deliberately absent: he is the
// featured quote in <FeatureTestimonial> higher up the page, and carrying him
// here as well showed the same testimonial twice on one screen.
export const TESTIMONIALS_AU: Testimonial[] = [
  {
    quote: [
      "RosterLab has ",
      { highlight: "saved me countless hours" },
      ". I have recommended this service to ",
      { highlight: "everyone I know" },
      " who writes medical rosters.",
    ],
    author: "Peter",
    role: "Senior Registrar ICU, Western Australia",
    caseStudyLink: "/case-studies/icu-unit-western-australia",
  },
  {
    quote: [
      "If RosterLab can help with our ",
      { highlight: "complicated rostering needs" },
      ", we're confident it will work for anyone.",
    ],
    author: "Judy Harris",
    role: "Practice Manager, Dargaville Hospital",
    caseStudyLink: "/case-studies/dargaville-medical-centre-new-zealand",
  },
  {
    quote: [
      "We wanted more ",
      { highlight: "continuity of care" },
      " built into the rosters, and RosterLab was easily able to incorporate that into every roster they generated for us.",
    ],
    author: "Rebecca",
    role: "Staff Specialist Neonatologist, RPA Newborn Care",
  },
  {
    quote: [
      "Since using RosterLab, I've felt the rosters are ",
      { highlight: "better for my circadian rhythm" },
      ", with less up-and-down cycling.",
    ],
    author: "Anthea",
    role: "MIT, Hawke's Bay Hospital",
  },
  {
    quote: [
      "RosterLab has been a ",
      { highlight: "game-changer" },
      " for our radiology department. It has allowed us to ",
      { highlight: "maximise leave provisions" },
      " while maintaining a safer roster.",
    ],
    author: "Dr. Fernando",
    role: "Junior Consultant, Auckland Tertiary Hospital",
    caseStudyLink:
      "/case-studies/auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
  },
];

const AUTOPLAY_MS = 7000;

export default function TestimonialsNew({
  testimonials = TESTIMONIALS_AU,
}: {
  testimonials?: Testimonial[];
} = {}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const current = testimonials[index];

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, testimonials.length]);

  // Tinted band — alternates with the white sections either side. Both edges
  // arc rather than cutting straight across, echoing the hero's soft corners.
  return (
    <section
      className="relative py-20 md:py-24"
      style={{ backgroundColor: BAND_TINT }}
    >
      {/* One long S across the full width — two cubics meeting at the
          midpoint, control points at 1/3 and 2/3 of each span so the tangents
          line up and the curve has no crease. The edges butt up against the
          band exactly: overlapping them would double the translucent fill and
          draw a visible hairline. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 -translate-y-full w-full h-10 md:h-20"
      >
        <path
          d="M0,32 C240,8 480,8 720,32 C960,56 1200,56 1440,32 L1440,64 L0,64 Z"
          fill={BAND_TINT}
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 translate-y-full w-full h-10 md:h-20"
      >
        <path
          d="M0,32 C240,56 480,56 720,32 C960,8 1200,8 1440,32 L1440,0 L0,0 Z"
          fill={BAND_TINT}
        />
      </svg>
      <Container className="lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.4fr)] gap-12 lg:gap-20 items-start">
          {/* Left: heading + description + arrow controls */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="block text-gray-900">From our</span>
              <span className="block text-gray-900">community.</span>
            </h2>
            <p className="mt-8 text-base md:text-lg text-gray-600 max-w-sm leading-relaxed">
              Here&rsquo;s what other rostering leads had to say about
              RosterLab.
            </p>

            <div className="hidden lg:flex mt-10 items-center gap-3">
              <button
                onClick={() => {
                  trackButtonClick("Testimonials: Previous", LOCATION);
                  prev();
                }}
                aria-label="Previous testimonial"
                className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  trackButtonClick("Testimonials: Next", LOCATION);
                  next();
                }}
                aria-label="Next testimonial"
                className="w-14 h-14 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: big quote with quote glyph, then attribution. Touch
              swipe (left/right) advances the testimonial on mobile. */}
          <div
            key={index}
            className="animate-fade-in touch-pan-y"
            onTouchStart={(e) => {
              (e.currentTarget as HTMLDivElement).dataset.startX = String(
                e.touches[0].clientX,
              );
            }}
            onTouchEnd={(e) => {
              const startX = Number(
                (e.currentTarget as HTMLDivElement).dataset.startX,
              );
              if (Number.isNaN(startX)) return;
              const endX = e.changedTouches[0].clientX;
              const dx = endX - startX;
              // 40px minimum drag to count as a swipe.
              if (Math.abs(dx) < 40) return;
              if (dx < 0) next();
              else prev();
            }}
          >
            <div
              aria-hidden="true"
              className="text-6xl md:text-7xl font-bold text-blue-600 leading-none mb-6"
            >
              &ldquo;
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-[1.25] tracking-tight">
              {current.quote.map((frag, i) =>
                typeof frag === "string" ? (
                  <span key={i}>{frag}</span>
                ) : (
                  <span key={i} className="text-blue-600">
                    {frag.highlight}
                  </span>
                ),
              )}
              {/* Matches the opening glyph above — the pair reads as one mark. */}
              <span className="text-blue-600">&rdquo;</span>
            </blockquote>

            <div className="mt-10">
              <p className="font-semibold text-gray-900">{current.author}</p>
              <p className="text-sm text-gray-600">{current.role}</p>
              {current.link && (
                <Link
                  href={current.link.href}
                  onClick={() =>
                    trackSmartButtonClick(
                      current.link!.label,
                      current.link!.href,
                      LOCATION,
                      { testimonial_author: current.author },
                    )
                  }
                  className="inline-block mt-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {current.link.label}
                </Link>
              )}
              {!current.link && current.caseStudyLink && (
                <Link
                  href={current.caseStudyLink}
                  onClick={() =>
                    trackSmartButtonClick(
                      "Read case study",
                      current.caseStudyLink!,
                      LOCATION,
                      { testimonial_author: current.author },
                    )
                  }
                  className="inline-block mt-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Read case study →
                </Link>
              )}
            </div>

            {/* Mobile-only dots. Click to jump; visible on all screens
                below `lg` where the arrow buttons are hidden. */}
            <div className="lg:hidden mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    trackButtonClick("Testimonials: Dot", LOCATION, {
                      dot_index: i,
                    });
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
