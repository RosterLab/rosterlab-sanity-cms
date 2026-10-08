"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackButtonClick } from "@/components/analytics/tracking";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Benefits";

/**
 * The recording behind each tab, keyed by tab id so AU and US share them.
 *
 * All four are 4:3. `desktop` is 1440x1080 — about 2x the widest the slot
 * gets — and `mobile` is 800x600 for phones, picked at mount. `poster` is the
 * clip's own first frame, so nothing shifts when the video takes over.
 */
const CLIPS: Record<
  string,
  { desktop: string; mobile: string; poster: string }
> = Object.fromEntries(
  ["time", "turnover", "safety", "optimisation"].map((id) => [
    id,
    {
      desktop: `/landing/benefits/${id}.mp4`,
      mobile: `/landing/benefits/${id}-mobile.mp4`,
      poster: `/landing/benefits/${id}-poster.webp`,
    },
  ]),
);

/** Below this width the phone cut is the one worth fetching. */
const MOBILE_CLIP_MAX_W = 640;

/**
 * How many times a tab's clip plays before the carousel moves on. Twice gives
 * a reader who arrived mid-clip a full run from the start.
 */
const PLAYS_PER_TAB = 2;

/**
 * How long a tab holds before its clip has reported a length. Once it has,
 * the tab holds for PLAYS_PER_TAB full play-throughs.
 */
const FALLBACK_TAB_MS = 8000;

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
    title: "Roster your entire clinical team in minutes",
    description:
      "Take the manual work out of complex rostering. Spend less time planning and reworking schedules, and give clinical teams more time back for patient care.",
    cta: {
      label: "Explore AI rostering",
      href: "/solutions/ai-roster-generator",
    },
    highlights: [
      "Up to 90% less roster admin",
      "More headspace for patient care",
      "Less time spent juggling roster changes",
    ],
  },
  {
    id: "turnover",
    label: "Retain Staff",
    title: "Retain the clinicians your service depends on",
    description:
      "Give staff fairer rosters that protect their personal time. Promote a healthier work-life balance to help reduce burnout, absenteeism, and turnover.",
    cta: {
      label: "Explore fair rostering",
      href: "/feature/self-scheduling",
    },
    highlights: [
      "Fairer workloads",
      "Greater staff input and engagement",
      "Fewer avoidable last-minute absences",
    ],
  },
  {
    id: "safety",
    label: "Stay Compliant",
    title: "Ensure clinical safety and compliance",
    description:
      "Assign the best-fit people to each shift based on skills, qualifications, and demand. Keep coverage, fatigue limits and compliance requirements accounted for throughout the roster.",
    cta: { label: "Explore smarter coverage", href: "/feature/rules-engine" },
    highlights: [
      "Safer staffing",
      "Reliable clinical coverage by skills",
      "Confidence in roster compliance",
    ],
  },
  {
    id: "optimisation",
    label: "Optimise Workforce",
    title: "Unlock hidden capacity in your workforce",
    description:
      "Allocate staff more effectively to make better use of available capacity, reducing costly overtime and reliance on locum and agency cover.",
    cta: {
      label: "Explore workforce optimisation",
      href: "/solutions/ai-roster-generator",
    },
    highlights: [
      "Minimised overtime and penalty costs",
      "Reduced locum needs",
      "More provider capacity",
    ],
    image: "/images/illustration/optimise_workforce.svg",
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
 * One tab's recording: muted, inline, looping, with its first frame as a
 * poster so the slot is never empty. Under reduced motion the poster is all
 * that shows and the video is never fetched.
 */
function BenefitClip({
  id,
  onDuration,
}: {
  id: string;
  onDuration?: (ms: number) => void;
}) {
  const clip = CLIPS[id];
  const reduceMotion = usePrefersReducedMotion();
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!clip || reduceMotion) return;
    setSrc(
      window.matchMedia(`(max-width: ${MOBILE_CLIP_MAX_W}px)`).matches
        ? clip.mobile
        : clip.desktop,
    );
  }, [clip, reduceMotion]);

  if (!clip) return null;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={clip.poster}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {src && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) onDuration?.(d * 1000);
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/**
 * The slot every tab's clip plays in. All four recordings are 4:3, so one
 * aspect-ratio box reserves the exact space before anything mounts — no
 * per-tab height guesses, and no layout shift when a tab auto-advances.
 */
const VISUAL_BOX = "relative aspect-[4/3] w-full";

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
        <LazyVisual className={`mt-8 ${VISUAL_BOX}`}>{visual}</LazyVisual>
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
  // restarts its run instead, which covers the same "do not change under the
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
  // Each tab's hold once its clip's length is known: PLAYS_PER_TAB plays.
  // Read by the timer every frame, so a length arriving mid-run applies at
  // once without restarting the bar.
  const tabMsRef = useRef<Record<string, number>>({});

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
      const tabMs = tabMsRef.current[active.id] ?? FALLBACK_TAB_MS;
      const fraction = Math.min(elapsedRef.current / tabMs, 1);
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

  // Each visual is only mounted for the tab on screen (desktop) or once its
  // card scrolls into view (mobile), so autoplay never runs off screen.
  const renderVisual = (tab: BenefitTab) => (
    <BenefitClip
      id={tab.id}
      onDuration={(ms) => {
        tabMsRef.current[tab.id] = ms * PLAYS_PER_TAB;
      }}
    />
  );

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

      {/* Desktop: a timed tab carousel. Each tab holds for PLAYS_PER_TAB plays of its clip with the
          remaining time drawn under the active tab, then hands over to the
          next one; clicking a tab takes it immediately and restarts its run. This used to be a
          500vh scroll-pinned scroller, which spent ~1,100px of wheeling per
          tab to produce four discrete jump-cuts — nearly half the page's
          scroll length for a section that now reads in place. */}
      <div ref={sectionRef} className="hidden lg:block py-16 xl:py-20">
        <Container className="w-full lg:px-12 xl:px-20">
          {/* Tab bar: four connected cells under one hairline border, with the
              active tab's remaining time drawn along the box's bottom edge.
              Both rows are grid-cols-4 inside the same border, which is what
              keeps a segment aligned to its tab without measuring anything.

              The timer stays out of the <button> so both rows stay siblings in
              the same grid. It also used to be a hard requirement: a global
              `button { transform: translateZ(0) }` meant a child whose geometry
              changed inside the cell's clip could stop painting while keeping
              its box and hit-testing. That rule is gone, but there's no reason
              to move the timer back in. */}
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
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3 md:mb-4 ${active.titleClassName ?? ""}`}
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
              <LazyVisual className={VISUAL_BOX}>
                {renderVisual(active)}
              </LazyVisual>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
