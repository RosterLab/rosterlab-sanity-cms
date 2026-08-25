"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { trackSmartButtonClick } from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Featured Testimonial";

/**
 * Single hero-adjacent testimonial. Sits directly under the trusted-by row
 * to reinforce credibility. Grows/fades in when scrolled into view.
 */
export interface FeatureTestimonialContent {
  /** Rendered before the highlighted duration figures. */
  lead: string;
  before: string;
  after: string;
  /** Rendered after the figures, closing the sentence. */
  tail: string;
  author: string;
  role: string;
  link: { href: string; label: string };
}

export const FEATURE_TESTIMONIAL_AU: FeatureTestimonialContent = {
  lead: "Rostering would take ",
  before: "7-8 days",
  after: "2-3 hours",
  tail: ", allowing me to focus more on patient care.",
  author: "Mike",
  role: "Associate Clinical Manager Radiology",
  link: {
    href: "/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare",
    label: "Watch the webinar",
  },
};

export default function FeatureTestimonial({
  content = FEATURE_TESTIMONIAL_AU,
}: {
  content?: FeatureTestimonialContent;
} = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-12 md:pt-16 pb-4 md:pb-6">
      <Container className="lg:px-12 xl:px-20">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            inView
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          {/* Both marks are the same blue, matching the community
              testimonials further down the page. */}
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-[1.25] tracking-tight">
            <span className="text-blue-600">&ldquo;</span>
            {content.lead}
            <span className="text-blue-600">{content.before}</span>, now it
            takes <span className="text-blue-600">{content.after}</span>
            {content.tail}
            <span className="text-blue-600">&rdquo;</span>
          </blockquote>

          {/* Attribution reads person first, then the organisation they
              speak for, then the CTA — most specific to least. The short
              rule detaches the block from the quote without a hard border
              across the full column. */}
          <div className="mt-8 flex flex-col items-center">
            <span aria-hidden="true" className="h-px w-10 bg-gray-300" />

            {/* Logo sits beside the name so the person and the organisation
                read as one attribution line. */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Image
                src="/images/logos/whanganui.png"
                alt="Te Whatu Ora Whanganui"
                width={140}
                height={70}
                className="h-8 md:h-9 w-auto object-contain opacity-75"
                style={{ filter: "brightness(0)" }}
              />

              <span
                aria-hidden="true"
                className="hidden sm:block self-stretch w-px bg-gray-300"
              />

              <div className="text-center sm:text-left">
                <p className="text-base font-semibold text-gray-900">
                  {content.author}
                </p>
                <p className="mt-0.5 text-sm text-gray-600">{content.role}</p>
              </div>
            </div>

            <Link
              onClick={() =>
                trackSmartButtonClick(
                  content.link.label,
                  content.link.href,
                  LOCATION,
                )
              }
              href={content.link.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              {content.link.label}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
