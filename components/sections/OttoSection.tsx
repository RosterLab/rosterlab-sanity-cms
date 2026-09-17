"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Otto";

/** How long each feature holds before the progress bar advances to the next. */
const STEP_DURATION_MS = 6000;

interface OttoFeature {
  /** Heading for the list item on the right. */
  title: string;
  description: string;
  /** Placeholder label for the media panel shown while this item is active. */
  mediaLabel: string;
}

const FEATURES: OttoFeature[] = [
  {
    title: "Answer your roster questions instantly",
    description:
      "Check staffing coverage, skill mix, leave, fairness, and more. Otto searches your live roster and audit trail to give you contextual answers, including who worked when and what's changed.",
    mediaLabel: "Visual placeholder — Instant answers",
  },
  {
    title: "Get recommendations for better roster decisions",
    description:
      "Need to fill a gap, assess a shift swap or improve your roster? Otto weighs availability, skills, workload, rest requirements and roster rules to recommend the best way forward.",
    mediaLabel: "Visual placeholder — Recommendations",
  },
  {
    title: "Analyse your roster from every angle",
    description:
      "Turn your roster data into insights you can act on. Otto can analyse any part of your roster to create charts, summaries and reports that support confident workforce decisions.",
    mediaLabel: "Visual placeholder — Analysis",
  },
];

/** Small square accent marker used on the eyebrow and each list item. */
function Marker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 bg-blue-600 ${className}`}
    />
  );
}

export default function OttoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // The timer only runs while the list is on screen and nobody is reading it.
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Auto-advancing is motion the visitor didn't ask for, so honour the setting
  // and fall back to a static bar the visitor steps through themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Don't burn through the steps while the section is scrolled out of view.
  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isPaused = isHovered || !isInView;
  const showTimer = !prefersReducedMotion;

  const advance = () =>
    setActiveIndex((current) => (current + 1) % FEATURES.length);

  const active = FEATURES[activeIndex];

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* ---- Intro: copy on the left, decorative visual on the right ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 items-start">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gray-900">
              <Marker />
              Otto AI Assistant
            </p>

            <h2 className="mt-5 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-gray-900">
              Make smarter roster decisions with Otto, your AI rostering
              assistant
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600">
              Otto understands your roster and the context behind it, so you can
              get answers, test changes and build reports in seconds.
            </p>

            <div className="mt-8">
              <Button
                href="/feature/ai-staff-rostering-assistant"
                analyticsLabel="See Otto in Action"
                analyticsLocation={LOCATION}
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
              >
                See Otto in Action
              </Button>
            </div>
          </div>

          {/* Decorative visual placeholder. */}
          <div
            aria-hidden="true"
            className="hidden lg:flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
              Decorative visual
            </span>
          </div>
        </div>

        {/* ---- Pinned media panel on the left, feature list on the right ---- */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Media panel — sticks while the list scrolls past it. */}
          <div className="lg:sticky lg:top-24">
            <div className="flex aspect-square items-center justify-center bg-gray-100">
              <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                {active.mediaLabel}
              </span>
            </div>
          </div>

          {/* Feature list — the active item sits on a panel that bleeds right. */}
          <ul
            ref={listRef}
            className="flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {FEATURES.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={feature.title} className="relative">
                  {/* Highlight panel, extended past the container to the viewport edge. */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gray-50"
                    />
                  )}

                  {/* Progress track: the fill runs to the end, then advances. */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -top-px h-0.5 overflow-hidden bg-gray-200"
                    >
                      <span
                        // Remounting on each step restarts the animation.
                        key={activeIndex}
                        onAnimationEnd={advance}
                        style={{
                          ["--otto-progress-duration" as string]: `${STEP_DURATION_MS}ms`,
                        }}
                        className={`block h-full w-full origin-left bg-blue-600 ${
                          showTimer ? "animate-otto-progress" : "scale-x-100"
                        } ${isPaused ? "[animation-play-state:paused]" : ""}`}
                      />
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={isActive}
                    className="relative w-full px-6 py-10 text-left"
                  >
                    <h3 className="flex items-start gap-3 text-lg font-semibold leading-snug text-gray-900">
                      <Marker className="mt-[0.45em]" />
                      {feature.title}
                    </h3>
                    <p
                      className={`mt-3 pl-5 text-sm leading-relaxed transition-colors ${
                        isActive ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
