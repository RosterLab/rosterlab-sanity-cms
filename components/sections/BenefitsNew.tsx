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
 * How long a tab holds when its clip can't report its own length (it hasn't
 * loaded, or failed to): the bar fills over this instead.
 */
const FALLBACK_DWELL_MS = 8000;

// Longest frame delta the fallback timer will credit, so a main-thread stall
// pauses the bar instead of jumping it forward.
const MAX_FRAME_MS = 50;

// The breakpoint the pinned layout runs at; below it the benefits stack.
const DESKTOP_QUERY = "(min-width: 1024px)";

// How long the page takes to glide to a tab's stretch of the track, on a tab
// click or when a clip finishes and hands over to the next tab.
const GLIDE_MS = 1400;

// The condensed site header's height, which the pinned block must clear.
const HEADER_PX = 60;

// Scroll each tab owns while the block is pinned, in vh.
const TAB_SCROLL_VH = 80;

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
 * poster so the slot is never empty. Under reduced motion, or while `playing`
 * is false, the poster is all that shows and the video is never fetched.
 */
function BenefitClip({
  id,
  playing = true,
  loop = true,
  onEnded,
}: {
  id: string;
  playing?: boolean;
  /** Off for the desktop tabs, where the clip ending moves to the next tab. */
  loop?: boolean;
  onEnded?: () => void;
}) {
  const clip = CLIPS[id];
  const reduceMotion = usePrefersReducedMotion();
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!clip || reduceMotion || !playing) {
      setSrc(undefined);
      return;
    }
    setSrc(
      window.matchMedia(`(max-width: ${MOBILE_CLIP_MAX_W}px)`).matches
        ? clip.mobile
        : clip.desktop,
    );
  }, [clip, reduceMotion, playing]);

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
          loop={loop}
          onEnded={onEnded}
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
  const [pin, setPin] = useState({ top: HEADER_PX, height: 0 });
  const pinMetrics = useRef(pin);
  pinMetrics.current = pin;
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = activeIndex;
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
    if (!el) return;
    const measure = () => {
      const height = el.offsetHeight;
      const top = Math.max(
        HEADER_PX,
        HEADER_PX + (window.innerHeight - HEADER_PX - height) / 2,
      );
      setPin((p) =>
        p.top === top && p.height === height ? p : { top, height },
      );
    };
    measure();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
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
  // track, and the scroll position picks the tab — each tab owns an equal
  // stretch of it.
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
      setActiveIndex(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      glideRef.current?.stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-run when the pin is re-measured, so the active tab is re-read.
  }, [count, pin]);

  const isPinned = () => {
    const g = geometry();
    if (!g) return false;
    return g.rect.top <= g.top + 1 && g.rect.bottom >= g.top + g.height - 1;
  };

  // Glides the page to the middle of tab i's stretch of the track, easing in
  // and out. Any wheel, touch or key input hands the scroll straight back.
  const glideTo = (i: number) => {
    const g = geometry();
    setActiveIndex(i);
    if (!g || !window.matchMedia(DESKTOP_QUERY).matches) return;
    // The scroll at which the block is pinned and halfway through tab i.
    const top =
      g.rect.top + window.scrollY - g.top + (g.range * (i + 0.5)) / count;
    glideRef.current?.stop();
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

  // A clip has played through. While pinned, the page glides on to the next
  // tab; on the last tab, or before the section has pinned, the clip replays.
  const onClipEnded = (i: number) => {
    if (i !== activeRef.current) return;
    if (i < count - 1 && isPinned() && !glideRef.current) {
      glideTo(i + 1);
      return;
    }
    const video = visualRef.current?.querySelector<HTMLVideoElement>(
      `[data-clip="${i}"] video`,
    );
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    }
  };

  // Progress bars follow the active clip's playback: tabs before it are full,
  // tabs after it empty, and its own segment tracks currentTime / duration.
  // When a clip can't report a length, the segment fills over
  // FALLBACK_DWELL_MS and counts as ended. Written straight to the DOM each
  // frame, so playback doesn't re-render the section.
  useEffect(() => {
    const paint = (fraction: number) =>
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const fill = i < activeIndex ? 1 : i === activeIndex ? fraction : 0;
        bar.style.transform = `scaleX(${fill})`;
      });
    if (reduceMotion) {
      paint(1);
      return;
    }
    paint(0);
    if (!inView) return;

    let raf = 0;
    let last = performance.now();
    let fallback = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, MAX_FRAME_MS);
      last = now;
      const video = visualRef.current?.querySelector<HTMLVideoElement>(
        `[data-clip="${activeIndex}"] video`,
      );
      if (video && Number.isFinite(video.duration) && video.duration > 0) {
        paint(Math.min(1, video.currentTime / video.duration));
      } else {
        fallback += dt;
        paint(Math.min(1, fallback / FALLBACK_DWELL_MS));
        if (fallback >= FALLBACK_DWELL_MS) {
          fallback = 0;
          onClipEnded(activeIndex);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // onClipEnded only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, inView, reduceMotion]);

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
          tab. Each tab's bar fills with its clip's playback; when the clip
          ends the page glides on to the next tab. The track is the block's
          own height plus TAB_SCROLL_VH of scroll per tab. */}
      <div
        ref={trackRef}
        className="hidden lg:block relative"
        style={{
          height: `calc(${pin.height ? `${pin.height}px` : "100vh"} + ${count * TAB_SCROLL_VH}vh)`,
        }}
      >
        <div ref={pinRef} className="sticky py-16" style={{ top: pin.top }}>
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
                      className="block h-full bg-blue-600 origin-left"
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
                  return (
                    <div
                      key={tab.id}
                      inert={!isActive}
                      aria-hidden={!isActive}
                      className={`[grid-area:1/1] self-center max-w-md transition duration-500 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 translate-y-2"
                      }`}
                    >
                      <h2
                        className={`text-4xl font-bold text-gray-900 leading-tight mb-4 ${tab.titleClassName ?? ""}`}
                      >
                        {tab.title}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed mb-5">
                        {tab.description}
                      </p>
                      <ul className="mb-6 space-y-2">
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
                      <Button
                        href={tab.cta.href}
                        analyticsLabel={tab.cta.label}
                        analyticsLocation={LOCATION}
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition"
                      >
                        {tab.cta.label}
                      </Button>
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
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        i === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <BenefitClip
                        id={tab.id}
                        playing={i === activeIndex && inView}
                        loop={false}
                        onEnded={() => onClipEnded(i)}
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
