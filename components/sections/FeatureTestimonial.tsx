"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

/**
 * Single hero-adjacent testimonial. Sits directly under the trusted-by row
 * to reinforce credibility. Grows/fades in when scrolled into view.
 */
export default function FeatureTestimonial() {
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
      <Container>
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            inView
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
        >
          {/* Logo + quote glyph sit inline together so the attribution
              lines up visually with the quote body. */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <Image
              src="/images/logos/whanganui.png"
              alt="Whanganui"
              width={140}
              height={70}
              className="h-10 md:h-12 w-auto object-contain"
              style={{ filter: "brightness(0)" }}
            />
            <span aria-hidden="true" className="h-8 w-px bg-gray-300" />
            <span
              aria-hidden="true"
              className="text-4xl md:text-5xl font-bold text-blue-600 leading-none"
            >
              &ldquo;
            </span>
          </div>

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-[1.25] tracking-tight">
            Rostering would take{" "}
            <span className="text-blue-600">7-8 days</span>, now it takes{" "}
            <span className="text-blue-600">2-3 hours</span>, allowing me to
            focus more on patient care.
            <span className="text-gray-400">&rdquo;</span>
          </blockquote>

          <div className="mt-6 flex flex-col items-center gap-1">
            <p className="font-semibold text-gray-900">Mike</p>
            <p className="text-sm text-gray-600">
              Associate Clinical Manager Radiology
            </p>
            <Link
              href="/webinars/building-a-resilient-workforce-with-ai-rostering-in-healthcare"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Watch the webinar
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
