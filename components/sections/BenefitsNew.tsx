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

// The breakpoint the pinned layout runs at; below it the benefits stack.
const DESKTOP_QUERY = "(min-width: 1024px)";

// How long the page takes to glide to a tab's stretch of the track on a click.
const GLIDE_MS = 1400;

// The condensed site header's height, which the pinned block must clear.
const HEADER_PX = 60;

// Scroll each tab owns while the block is pinned, in vh.
const TAB_SCROLL_VH = 80;

// A staggered, softly focused reveal makes a tab change easy to notice.
const COPY_REVEAL =
  "transition-[opacity,transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:blur-none";
// Give the first benefit more breathing room after arriving from the hero.
const FIRST_TAB_SCROLL_WEIGHT = 1.5;

/** Convert track progress into a tab index plus that tab's fractional fill. */
function tabProgress(progress: number, count: number): number {
  const units = progress * (count + FIRST_TAB_SCROLL_WEIGHT - 1);
  return units < FIRST_TAB_SCROLL_WEIGHT
    ? units / FIRST_TAB_SCROLL_WEIGHT
    : units - FIRST_TAB_SCROLL_WEIGHT + 1;
}

/** Inverse of tabProgress, used when gliding to a selected tab. */
function tabPosition(index: number, fraction: number, count: number): number {
  const units =
    index === 0
      ? fraction * FIRST_TAB_SCROLL_WEIGHT
      : FIRST_TAB_SCROLL_WEIGHT + index - 1 + fraction;
  return units / (count + FIRST_TAB_SCROLL_WEIGHT - 1);
}

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
 * poster so the slot is never empty. Videos load on first activation and pause
 * on their last frame when inactive, so the outgoing visual can fade smoothly.
 * Under reduced motion, only the poster is shown.
 */
function BenefitClip({
  id,
  playing = true,
}: {
  id: string;
  playing?: boolean;
}) {
  const clip = CLIPS[id];
  const reduceMotion = usePrefersReducedMotion();
  const [src, setSrc] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!clip || reduceMotion) {
      setSrc(undefined);
      return;
    }
    if (!playing) return;
    setSrc(
      window.matchMedia(`(max-width: ${MOBILE_CLIP_MAX_W}px)`).matches
        ? clip.mobile
        : clip.desktop,
    );
  }, [clip, reduceMotion, playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && !reduceMotion) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [src, playing, reduceMotion]);

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
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

/**
 * The slot every tab's clip plays in. All four recordings are 4:3, so one
 * aspect-ratio box reserves the exact space before anything mounts — no
 * per-tab height guesses, and no layout shift when the tab changes.
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
          prefetch={true}
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
  const count = benefitTabs.length;
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  // The pinned block at its natural height, and where it sticks: centred in
  // the space under the header. Pinning a full-viewport box instead left a
  // band of empty space above and below the content on tall screens.
  const pinMetrics = useRef({ top: HEADER_PX, height: 0 });
  const syncScrollRef = useRef<() => void>(() => {});
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const active = benefitTabs[activeIndex] ?? benefitTabs[0];
  // A glide in progress. While it runs the target tab stays active — the
  // scroll would otherwise pass through, and flash up, every tab in between.
  const glideRef = useRef<{ frame: number; stop: () => void } | null>(null);

  // The clip and its timer only run while the track is on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = pinRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const height = el.offsetHeight;
      if (!height) return; // The desktop panel is hidden on small screens.
      const top = Math.max(
        HEADER_PX,
        HEADER_PX + (window.innerHeight - HEADER_PX - height) / 2,
      );
      const previous = pinMetrics.current;
      if (previous.top === top && previous.height === height) return;
      pinMetrics.current = { top, height };
      // Layout measurements stay out of React state: observing the panel must
      // not restart the scroll effect and synchronously update the active tab.
      track.style.setProperty("--benefit-pin-height", `${height}px`);
      track.style.setProperty("--benefit-pin-top", `${top}px`);
      syncScrollRef.current();
    };
    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    scheduleMeasure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleMeasure);
    observer?.observe(el);
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  /** Where the track is, and how far the page scrolls while it is pinned. */
  const geometry = () => {
    const track = trackRef.current;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    const { top, height } = pinMetrics.current;
    return { rect, top, height, range: track.offsetHeight - height };
  };

  // Pinned scroll: the block holds while the page scrolls through a tall
  // track, and the scroll position picks the tab. Save Time owns a longer
  // stretch so the entrance does not rush straight into the next benefit.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const g = geometry();
      if (!g || !desktop.matches || glideRef.current) return;
      const progress =
        g.range > 0
          ? Math.min(1, Math.max(0, (g.top - g.rect.top) / g.range))
          : 0;
      const position = tabProgress(progress, count);
      // Each segment fills with its stretch of the track in either direction.
      // A click keeps its initial fill while gliding to the selected tab.
      barRefs.current.forEach((bar, i) => {
        if (bar) {
          const fill = Math.min(1, Math.max(0, position - i));
          bar.style.transform = `scaleX(${fill})`;
        }
      });
      const nextIndex = Math.min(count - 1, Math.max(0, Math.floor(position)));
      setActiveIndex((previous) =>
        previous === nextIndex ? previous : nextIndex,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    syncScrollRef.current = onScroll;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      syncScrollRef.current = () => {};
      glideRef.current?.stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  // Catch a fast downward gesture at the entrance instead of letting its
  // momentum skip the first few tabs. Only that entrance gesture is eased;
  // a fresh gesture, reverse scroll or keyboard input resumes normal scrolling.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    let catchingEntry = false;
    let lastWheel = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      catchingEntry = false;
    };
    const onWheel = (event: WheelEvent) => {
      if (
        !desktop.matches ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.cancelable
      )
        return;

      const now = performance.now();
      const sameGesture = now - lastWheel < 180;
      lastWheel = now;
      if (catchingEntry) {
        if (event.deltaY > 0 && sameGesture) {
          event.preventDefault();
          return;
        }
        stop();
      }
      if (event.deltaY <= 0) return;
      const g = geometry();
      if (!g || g.range <= 0) return;
      const from = window.scrollY;
      const entrance = from + g.rect.top - g.top;
      const delta =
        event.deltaY *
        (event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1);
      if (from >= entrance || from + delta < entrance) return;

      event.preventDefault();
      glideRef.current?.stop();
      catchingEntry = true;
      // Settle just inside Save Time, leaving its scroll range to explore.
      const target =
        entrance + Math.min(delta, g.range * tabPosition(0, 0.1, count));
      if (reduceMotion) {
        window.scrollTo({ top: target, behavior: "instant" });
        return;
      }
      const started = performance.now();
      const step = (time: number) => {
        const progress = Math.min(1, (time - started) / 650);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo({
          top: from + (target - from) * eased,
          behavior: "instant",
        });
        if (progress < 1) frame = requestAnimationFrame(step);
        else frame = 0;
      };
      frame = requestAnimationFrame(step);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, [count, reduceMotion]);

  // Tab clicks glide just inside the selected stretch. Wheel, touch or
  // key input hands scrolling straight back to the user.
  const glideTo = (i: number) => {
    const g = geometry();
    setActiveIndex(i);
    if (!g || !window.matchMedia(DESKTOP_QUERY).matches) return;
    glideRef.current?.stop();
    // Give the clicked tab a visible start, without jumping halfway through.
    const initialFill = 0.1;
    barRefs.current.forEach((bar, index) => {
      if (bar) {
        const fill = index < i ? 1 : index === i ? initialFill : 0;
        bar.style.transform = `scaleX(${fill})`;
      }
    });
    const top =
      g.rect.top +
      window.scrollY -
      g.top +
      g.range * tabPosition(i, initialFill, count);
    if (reduceMotion) {
      window.scrollTo({ top, behavior: "instant" });
      return;
    }
    const from = window.scrollY;
    const start = performance.now();
    const stop = () => {
      if (!glideRef.current) return;
      cancelAnimationFrame(glideRef.current.frame);
      glideRef.current = null;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / GLIDE_MS);
      // Ease in-out sine.
      const eased = -(Math.cos(Math.PI * t) - 1) / 2;
      window.scrollTo({
        top: from + (top - from) * eased,
        behavior: "instant",
      });
      if (t < 1 && glideRef.current)
        glideRef.current.frame = requestAnimationFrame(step);
      else stop();
    };
    glideRef.current = { frame: requestAnimationFrame(step), stop };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
  };

  const selectTab = (idx: number) => {
    const tab = benefitTabs[idx];
    trackButtonClick(`Tab: ${tab.label}`, LOCATION, {
      tab_id: tab.id,
      tab_index: idx,
    });
    glideTo(idx);
  };

  // Roving tabindex: arrows move between tabs, as the tabs pattern expects.
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (activeIndex + delta + count) % count;
    selectTab(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Mobile: one benefit per swipe. */}
      <div className="lg:hidden">
        {benefitTabs.map((tab) => (
          <BenefitCard
            key={tab.id}
            tab={tab}
            visual={<BenefitClip id={tab.id} />}
          />
        ))}
      </div>

      {/* Desktop: a pinned scroller. The tabs and panel hold in place while
          the page scrolls through the track, and scroll position picks the
          tab. Progress follows scrolling in either direction; the active clip
          loops until the user moves on. The track is the block's
          own height plus TAB_SCROLL_VH per tab, with extra room for Save Time. */}
      <div
        ref={trackRef}
        className="hidden lg:block relative [overflow-anchor:none]"
        style={{
          height: `calc(var(--benefit-pin-height, 100vh) + ${(count + FIRST_TAB_SCROLL_WEIGHT - 1) * TAB_SCROLL_VH}vh)`,
        }}
      >
        <div
          ref={pinRef}
          className="sticky py-16"
          style={{ top: `var(--benefit-pin-top, ${HEADER_PX}px)` }}
        >
          <Container className="w-full lg:px-12 xl:px-20">
            {/* Tab bar: four connected cells under one hairline border, with
              each tab's progress drawn along the box's bottom edge. Both rows
              are grid-cols-4 inside the same border, so a segment lines up
              with its tab without measuring anything. */}
            <div className="mx-auto mb-14 w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div
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
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`benefit-tab-${tab.id}`}
                      aria-selected={isActive}
                      aria-controls={`benefit-panel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectTab(i)}
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

              {/* Square ends, flush to the box's bottom edge. */}
              <div aria-hidden="true" className="grid grid-cols-4">
                {benefitTabs.map((tab, i) => (
                  <span key={tab.id} className="h-[3px] overflow-hidden">
                    <span
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="block h-full bg-blue-600 origin-left transition-transform duration-100 ease-linear motion-reduce:transition-none"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div
              id={`benefit-panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`benefit-tab-${active.id}`}
              className="grid grid-cols-[minmax(0,1fr),minmax(0,1.4fr)] items-center gap-16"
            >
              {/* Copy: every tab's copy shares one grid cell, so the column is
                as tall as the longest and nothing below moves on a change.
                Only the active one shows; the rest are faded out and inert. */}
              <div className="grid">
                {benefitTabs.map((tab, i) => {
                  const isActive = i === activeIndex;
                  const revealState = isActive
                    ? "opacity-100 translate-y-0 blur-none"
                    : "opacity-0 translate-y-4 blur-[3px]";
                  return (
                    <div
                      key={tab.id}
                      inert={!isActive}
                      aria-hidden={!isActive}
                      className={`[grid-area:1/1] self-center max-w-md transition-opacity duration-500 motion-reduce:transition-none ${
                        isActive
                          ? "opacity-100"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      <h2
                        className={`text-4xl font-bold text-gray-900 leading-tight mb-4 ${COPY_REVEAL} ${revealState} ${tab.titleClassName ?? ""}`}
                      >
                        {tab.title}
                      </h2>
                      <p
                        className={`text-lg text-gray-600 leading-relaxed mb-5 ${COPY_REVEAL} ${revealState} ${isActive ? "delay-[120ms]" : "delay-0"}`}
                      >
                        {tab.description}
                      </p>
                      <ul
                        className={`mb-6 space-y-2 ${COPY_REVEAL} ${revealState} ${isActive ? "delay-[240ms]" : "delay-0"}`}
                      >
                        {tab.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start">
                            <span
                              aria-hidden="true"
                              className="mt-[0.5em] mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                            />
                            <span className="text-base font-semibold text-gray-800">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div
                        className={`${COPY_REVEAL} ${revealState} ${isActive ? "delay-[360ms]" : "delay-0"}`}
                      >
                        <Button
                          href={tab.cta.href}
                          prefetch={true}
                          analyticsLabel={tab.cta.label}
                          analyticsLocation={LOCATION}
                          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition"
                        >
                          {tab.cta.label}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Capped by viewport height (as a 4:3 width) so the tabs, copy
                and clip fit on one screen. Every tab's poster is stacked here
                so a change cross-fades between frames that are already
                loaded; only the active tab fetches and plays its video. */}
              <div
                ref={visualRef}
                className="w-full max-w-[calc((100vh-16.5rem)*4/3)] ml-auto"
              >
                <LazyVisual className={VISUAL_BOX}>
                  {benefitTabs.map((tab, i) => (
                    <div
                      key={tab.id}
                      data-clip={i}
                      aria-hidden={i !== activeIndex}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                        i === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <BenefitClip
                        id={tab.id}
                        playing={i === activeIndex && inView}
                      />
                    </div>
                  ))}
                </LazyVisual>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
