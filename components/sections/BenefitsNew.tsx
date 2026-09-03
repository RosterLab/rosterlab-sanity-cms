"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackButtonClick } from "@/components/analytics/tracking";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const StaffingEnvelopeChartSmall = dynamic(
  () => import("@/components/ui/StaffingEnvelopeChartSmall"),
  { ssr: false },
);
const WeekendRotationModule = dynamic(
  () => import("@/app/feature/shift-swaps/WeekendRotationModule"),
  { ssr: false },
);
const MobileAppPreferencesModule = dynamic(
  () => import("@/components/sections/animations/MobileAppPreferencesModule"),
  { ssr: false },
);
const GenerateScreenEmbed = dynamic(
  () => import("@/components/sections/animations/GenerateScreenEmbed"),
  { ssr: false },
);

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Benefits";

// Before/after timings for the tab visuals. The default 3s lead-in reads as
// "nothing is happening" when the tab has only just come into view, so the
// flip lands early and the result is held long enough to be read before the
// cycle restarts. START_MS is how long the "before RosterLab" state holds —
// long enough to register the problem, short of feeling stalled.
const START_MS = 1800;
const HOLD_MS = 3200;

// How long each tab holds before the carousel advances. Comfortably longer
// than a visual's START_MS + HOLD_MS beat, so the before/after lands and is
// read before the tab changes under you.
const TAB_MS = 8000;

// Longest frame delta the timer will credit. Without this, a main-thread stall
// — an extension, a devtools pause, an HMR recompile — is added to elapsed in
// one go when frames resume, so the bar appears to stick and then jump or
// hand over early. Capped, a stall just pauses the bar.
const MAX_FRAME_MS = 50;

export interface BenefitTab {
  id: string;
  label: string;
  title: string;
  description: string;
  /** Short capability bullets shown under the description. */
  highlights: string[];
  cta: { label: string; href: string };
  image?: string;
  /** Optional size override when the default heading size wraps to 3 lines. */
  titleClassName?: string;
}

export const BENEFIT_TABS_AU: BenefitTab[] = [
  {
    id: "time",
    label: "Save Time",
    title: "Generate rosters in minutes",
    description:
      "Let the AI handle complex contractual and operational constraints while you focus on what matters most. Manage last-minute changes with re-rostering, open shifts, and automatic shift-swaps based on predefined rules.",
    cta: {
      label: "Explore AI generation",
      href: "/feature/ai-staff-rostering-assistant",
    },
    highlights: [
      "Generate Rosters Automatically",
      "Handle Complex Rules and Staffing Requirements",
      "Reduce Admin for Last-minute Changes",
      "Dynamically re-roster staff",
    ],
  },
  {
    id: "optimisation",
    label: "Optimise Workforce",
    title: "Optimise your workforce with AI",
    description:
      "Harness our advanced mathematical optimisation engine to allocate staff efficiently. Reduce penalty costs, improve coverage, and plan ahead with confidence.",
    cta: {
      label: "Explore optimisation",
      href: "/solutions/ai-roster-generator",
    },
    highlights: [
      "Optimise Skill Mix",
      "Allocate Staff Efficiently",
      "Minimise Costs",
      "Dynamic Scenario Planning",
    ],
    image: "/images/illustration/optimise_workforce.svg",
  },
  {
    id: "turnover",
    label: "Reduce Turnover",
    title: "Improve staff retention",
    description:
      "Empower your team to plan ahead and manage their rosters with confidence, while staying aligned with business needs. Fewer shift swaps, reduced absenteeism, and better-matched preferences drive engagement.",
    cta: {
      label: "Explore retention",
      href: "/feature/self-scheduling",
    },
    highlights: [
      "Improve Work-Life Balance and Staff Satisfaction",
      "Meet a High Percentage of Preferences",
      "Reduce Unnecessary Sick Leave",
      "Reduce Staff Turnover",
    ],
  },
  {
    id: "safety",
    label: "Safety & Fairness",
    title: "Ensure compliance & equity",
    description:
      "Ensure clinical safety and fairness with every roster. By embedding equity and fatigue-management rules into our AI, you eliminate favouritism, reduce staff fatigue, and create safer, more inclusive rosters.",
    cta: { label: "Explore safety", href: "/feature/rules-engine" },
    // Longest of the four titles — one step down at lg so it holds 2 lines.
    titleClassName: "lg:text-[2.5rem]",
    highlights: [
      "Eliminate Favouritism",
      "Distribute Shifts Fairly",
      "Reduce Clinical Risks",
      "Reduce Fatigue",
    ],
  },
];

/**
 * Holds a tab's visual until the slot first scrolls into view.
 *
 * Both layouts are always in the DOM — one is hidden by a breakpoint — so
 * without this a phone would mount and animate the desktop panel's visual it
 * can never see, and vice versa. A `display: none` ancestor never intersects,
 * so the hidden layout stays inert until a resize reveals it.
 */
function LazyVisual({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
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
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}

/**
 * One benefit as a plain, self-contained block — the mobile layout.
 *
 * The pinned tab scroller only works when the whole panel fits the viewport.
 * On a phone the copy alone runs past the fold, so the visual sat below it
 * unreachable: swiping advanced the tabs instead of scrolling to the artwork.
 * Below `lg` the four benefits are stacked normally instead, one per swipe,
 * and each visual mounts as it comes into view rather than all four at once.
 */
function BenefitCard({ tab, visual }: { tab: BenefitTab; visual: ReactNode }) {
  return (
    <section className="py-10 first:pt-4">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
          {tab.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
          {tab.description}
        </p>
        <ul className="mb-5 space-y-2">
          {tab.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start">
              <span
                aria-hidden="true"
                className="mt-[0.5em] mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
        <Button
          href={tab.cta.href}
          analyticsLabel={tab.cta.label}
          analyticsLocation={LOCATION}
          className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
        >
          {tab.cta.label}
        </Button>
        <LazyVisual className="mt-8 relative min-h-[280px] sm:min-h-[320px] flex items-center justify-center [&>*]:w-full">
          {visual}
        </LazyVisual>
      </Container>
    </section>
  );
}

export default function BenefitsNew({
  tabs = BENEFIT_TABS_AU,
}: {
  tabs?: BenefitTab[];
} = {}) {
  const benefitTabs = tabs;
  const sectionRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Autoplay only while the section is actually on screen.
  //
  // There is deliberately no hover or focus pause. Both looked reasonable and
  // both broke clicking: reaching a tab puts the pointer inside the section,
  // and clicking a button focuses it, so the timer was pinned paused from the
  // moment you picked a tab — the bar sat at 0 and never moved. Clicking a tab
  // restarts its 8s instead, which covers the same "do not change under the
  // reader" ground without a state that can stick.
  const [inView, setInView] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const active = benefitTabs[activeIndex] ?? benefitTabs[0];
  const timerRunning = inView && !reduceMotion;

  // The timer bar is written straight to the node instead of going through
  // state: a 50ms setState re-rendered this whole section — the mounted visual
  // included — twenty times a second, and that is what made the bar stutter.
  const barRef = useRef<HTMLSpanElement>(null);
  // Elapsed lives in a ref so pausing and resuming picks up where it left off
  // rather than restarting the tab.
  const elapsedRef = useRef(0);

  const advance = () => setActiveIndex((i) => (i + 1) % benefitTabs.length);

  // Zero the bar on every tab change, before the loop below picks it up.
  useEffect(() => {
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.width = "0%";
  }, [activeIndex]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (reduceMotion) {
      bar.style.width = "100%";
      return;
    }
    if (!timerRunning) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsedRef.current += Math.min(now - last, MAX_FRAME_MS);
      last = now;
      const fraction = Math.min(elapsedRef.current / TAB_MS, 1);
      bar.style.width = `${fraction * 100}%`;
      // Hand over the moment the bar lands, not on the next tick.
      if (fraction >= 1) {
        advance();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // advance is re-created every render; activeIndex is what restarts the run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, timerRunning, reduceMotion, benefitTabs.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Start as soon as the section is meaningfully on screen. Waiting for half
    // of it left the first tab sitting idle while the reader was already
    // looking at it.
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Roving tabindex: arrows move between tabs, which is what a tablist owes a
  // keyboard user now that the tabs are the only way to navigate.
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next =
      (activeIndex + delta + benefitTabs.length) % benefitTabs.length;
    setActiveIndex(next);
    tablistRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  const renderVisual = (tab: BenefitTab) => {
    // Each visual is only mounted for the tab on screen, so autoplay is safe
    // to enable on all of them — an offscreen tab isn't in the tree.
    switch (tab.id) {
      case "safety":
        return (
          <WeekendRotationModule
            autoplay
            loop
            autoplayIntervalMs={START_MS}
            loopHoldMs={HOLD_MS}
          />
        );
      case "turnover":
        return (
          <MobileAppPreferencesModule
            autoplay
            loop
            autoplayIntervalMs={START_MS}
            loopHoldMs={HOLD_MS}
          />
        );
      case "time":
        return <GenerateScreenEmbed />;
      case "optimisation":
        return (
          <StaffingEnvelopeChartSmall
            autoplay
            loop
            autoplayIntervalMs={START_MS}
            loopHoldMs={HOLD_MS}
          />
        );
      default:
        return tab.image ? (
          <Image
            src={tab.image}
            alt={tab.title}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
            priority
          />
        ) : null;
    }
  };

  const selectTab = (idx: number, tab: BenefitTab) => {
    trackButtonClick(`Tab: ${tab.label}`, LOCATION, {
      tab_id: tab.id,
      tab_index: idx,
    });
    setActiveIndex(idx);
    // Re-picking the current tab restarts its timer, which is the only sane
    // reading of clicking the tab you are already on. The reset effect misses
    // that case, because setting the same index is a no-op for React.
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.width = "0%";
  };

  return (
    <>
      {/* Mobile: one benefit per swipe, no pinning. */}
      <div className="lg:hidden">
        {benefitTabs.map((tab) => (
          <BenefitCard key={tab.id} tab={tab} visual={renderVisual(tab)} />
        ))}
      </div>

      {/* Desktop: a timed tab carousel. Each tab holds for TAB_MS with the
          remaining time drawn under the active tab, then hands over to the
          next one; clicking a tab takes it immediately and restarts its run. This used to be a
          500vh scroll-pinned scroller, which spent ~1,100px of wheeling per
          tab to produce four discrete jump-cuts — nearly half the page's
          scroll length for a section that now reads in place. */}
      <div
        ref={sectionRef}
        className="hidden lg:block py-16 xl:py-20"
      >
        <Container className="w-full lg:px-12 xl:px-20">
          {/* Tab bar: four connected cells under one hairline border, with the
              active tab's remaining time drawn along the box's bottom edge.
              Both rows are grid-cols-4 inside the same border, which is what
              keeps a segment aligned to its tab without measuring anything.

              The timer stays out of the <button>: performance.css gives every
              button `transform: translateZ(0)`, and a child of that whose
              geometry changes inside the cell's clip can stop painting
              altogether while keeping its box and hit-testing. */}
          <div className="mx-auto mb-8 w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div
              ref={tablistRef}
              role="tablist"
              aria-label="Benefits"
              onKeyDown={onTabKeyDown}
              className="grid grid-cols-4 divide-x divide-gray-200"
            >
              {benefitTabs.map((tab, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`benefit-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`benefit-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTab(i, tab)}
                    className={`px-3 py-3.5 text-sm xl:text-base font-medium leading-tight transition-colors ${
                      isActive
                        ? "text-gray-900"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Inside the same bordered box as the tabs, so both grids share one
                content box and a segment is exactly as wide as its tab. Square
                ends, flush to the box's bottom edge — a rounded bar floating
                below the border read as a stray lozenge. */}
            <div aria-hidden="true" className="grid grid-cols-4">
              <span
                ref={barRef}
                className="h-[3px] w-0 bg-blue-600"
                style={{ gridColumnStart: activeIndex + 1 }}
              />
            </div>
          </div>

          {/* Fixed minimum height so an auto-advance never reflows the page
              under the reader. Sized to the tallest panel: the copy column is
              narrowest at lg and wraps most there. */}
          <div
            key={active.id}
            id={`benefit-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`benefit-tab-${active.id}`}
            className="grid lg:grid-cols-[minmax(0,1fr),minmax(0,1.4fr)] gap-6 lg:gap-16 items-center animate-fade-in lg:min-h-[520px] xl:min-h-[480px]"
          >
            <div className="max-w-md">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4 ${active.titleClassName ?? ""}`}
              >
                {active.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-5">
                {active.description}
              </p>
              <ul className="mb-5 md:mb-6 space-y-2">
                {active.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start">
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                    />
                    <span className="text-sm md:text-base font-semibold text-gray-800">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                href={active.cta.href}
                analyticsLabel={active.cta.label}
                analyticsLocation={LOCATION}
                className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-blue-700 transition"
              >
                {active.cta.label}
              </Button>
            </div>

            <div className="relative">
              <LazyVisual className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[420px] flex items-center justify-center [&>*]:w-full">
                {renderVisual(active)}
              </LazyVisual>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
