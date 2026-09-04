"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

/**
 * Layout study modelled on ivo.ai's hero: a compact left-aligned pitch, a row
 * of feature tabs, and a media card that cycles through one panel per tab.
 *
 * Proportions are taken from the reference measured at 1440x1000:
 *  - media card 1432x900 (inset 4px from the viewport, 12px radius)
 *  - mockup 1002x626, centred, starting 15% down the card — it sits fully
 *    inside the card rather than bleeding off the bottom
 *  - progress bar 5px, pinned to the top edge of the card, running the full
 *    width across all three tabs rather than resetting per tab
 *
 * Every visual is a labelled placeholder box for now — this pass is about the
 * structure and the responsive behaviour, not the artwork.
 */

/** Dwell per tab. The reference bar crosses ~32px/s over 1432px ≈ 15s a tab. */
const TAB_DURATION_MS = 15000;

interface HeroTab {
  id: string;
  label: string;
  /** Copy for the placeholder standing in for that tab's mockup. */
  mockupLabel: string;
}

const TABS: HeroTab[] = [
  {
    id: "generate",
    label: "Generate rosters that follow every rule",
    mockupLabel: "Roster generation mockup",
  },
  {
    id: "balance",
    label: "Balance fairness across the whole team",
    mockupLabel: "Fairness dashboard mockup",
  },
  {
    id: "changes",
    label: "Handle last-minute changes in seconds",
    mockupLabel: "Shift swap mockup",
  },
];

const TOTAL_MS = TAB_DURATION_MS * TABS.length;

export default function HeroIvo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);
  /** Position in the cycle, in ms. Lives in a ref so the bar can be driven at
   *  frame rate without re-rendering the section 60 times a second. */
  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);

  const seekToTab = useCallback((index: number) => {
    elapsedRef.current = index * TAB_DURATION_MS;
    setActiveIndex(index);
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${elapsedRef.current / TOTAL_MS})`;
    }
  }, []);

  useEffect(() => {
    // Someone who has asked for less motion gets the tabs, but not the
    // auto-advance or the crawling bar.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused) {
      lastFrameRef.current = null;
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      if (lastFrameRef.current === null) lastFrameRef.current = now;
      elapsedRef.current =
        (elapsedRef.current + (now - lastFrameRef.current)) % TOTAL_MS;
      lastFrameRef.current = now;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${elapsedRef.current / TOTAL_MS})`;
      }
      const index = Math.floor(elapsedRef.current / TAB_DURATION_MS);
      setActiveIndex((previous) => (previous === index ? previous : index));

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const active = TABS[activeIndex] ?? TABS[0];

  return (
    <section className="bg-neutral-50">
      {/* Announcement pill — centred above the pitch. */}
      <Container className="pt-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-blue-100 px-5 py-2 text-sm text-blue-900">
            <span>Announcement bar — short product news goes here</span>
            <a href="#" className="font-semibold underline underline-offset-2">
              Learn more
            </a>
          </div>
        </div>
      </Container>

      {/* Pitch — left aligned and deliberately narrow, so the headline breaks
          onto two lines the way the reference does. */}
      <Container className="pt-10 pb-14">
        <div className="max-w-[691px]">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-none tracking-tight text-neutral-900">
            AI rostering built for complex teams
          </h1>
          <p className="mt-6 text-base text-neutral-600">
            Generate and optimise staff rosters in minutes, not days.
          </p>
          <div className="mt-8">
            <Button
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-full bg-[#3779DD] px-8 py-3.5 text-base font-semibold text-white transition hover:opacity-90"
              analyticsLabel="Book a Demo"
              analyticsLocation="Hero Ivo"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </Container>

      {/* Tabs and media card share a 4px gutter and sit in one rounded block,
          so the card reads as a panel belonging to the tabs above it. */}
      <div
        className="p-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden rounded-xl">
          <div
            role="tablist"
            aria-label="Product highlights"
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {TABS.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`hero-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="hero-tabpanel"
                  onClick={() => seekToTab(index)}
                  className={`px-8 py-8 text-left text-base transition-colors ${
                    isActive
                      ? "bg-neutral-200 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Media card — a fixed aspect ratio rather than a fixed height, so
              it scales with the viewport instead of filling it. */}
          <div
            role="tabpanel"
            id="hero-tabpanel"
            aria-labelledby={`hero-tab-${active.id}`}
            className="relative aspect-[4/3] overflow-hidden md:aspect-[1432/900]"
          >
            {/* Progress bar — one continuous run across all three tabs, so its
                leading edge sits under whichever tab is currently active. */}
            <div className="absolute inset-x-0 top-0 z-20 h-[5px]">
              <div
                ref={barRef}
                className="h-full w-full origin-left bg-[#3779DD]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            {/* Background illustration placeholder — covers the whole card. */}
            <div className="absolute inset-0 flex items-start justify-center bg-neutral-300 pt-8">
              <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                Background illustration
              </span>
            </div>

            {/* Mockup placeholder — 70% of the card's width, centred, starting
                15% down. Keyed on the active tab so it re-mounts and replays
                its entrance on every switch. */}
            <div
              key={active.id}
              className="animate-slide-up absolute left-1/2 top-[15%] aspect-[1002/626] w-[86%] -translate-x-1/2 overflow-hidden rounded-lg bg-white shadow-2xl md:w-[70%]"
            >
              {/* Window chrome. */}
              <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-neutral-300" />
                <span className="h-3 w-3 rounded-full bg-neutral-300" />
                <span className="h-3 w-3 rounded-full bg-neutral-300" />
              </div>
              <div className="absolute inset-x-0 bottom-0 top-[45px] flex items-center justify-center p-8">
                <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">
                  {active.mockupLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
