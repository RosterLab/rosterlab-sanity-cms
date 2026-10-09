"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackButtonClick } from "@/components/analytics/tracking";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { usePinnedTabs } from "@/lib/hooks/usePinnedTabs";

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
 * Share of each tab's stretch of the scroll track (desktop) where its copy
 * holds still; the rest is the glide to the next tab.
 */
const COPY_HOLD = 0.5;

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
}: {
  id: string;
  playing?: boolean;
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = benefitTabs.length;
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  // The copy column scrolls with the page, Connecteam-style: every tab's copy
  // sits in one stack, and scroll position slides the stack through a fixed
  // window. Written straight to the DOM each frame, like the progress bars.
  //
  // `position` is 0 for the first tab's copy dead centre and count - 1 for
  // the last. Each tab's copy rests, still and centred, through the middle
  // COPY_HOLD of its stretch of the track (where a tab click also lands),
  // and eases across to the next tab in the scroll between. Without the rest
  // the copy was only ever centred at one exact scroll point, so it felt
  // like it was always sliding away from the reader.
  const moveCopy = (progress: number) => {
    const g = progress * count - 0.5;
    const base = Math.floor(g);
    const t = Math.min(
      1,
      Math.max(0, (g - base - COPY_HOLD / 2) / (1 - COPY_HOLD)),
    );
    // Ease in-out cubic, so the copy leaves and settles gently.
    const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
    let position = Math.min(count - 1, Math.max(0, base + eased));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      position = Math.round(position);
    copyRefs.current.forEach((el, i) => {
      if (!el) return;
      const offset = i - position;
      el.style.transform = `translateY(${offset * 100}%)`;
      el.style.opacity = String(Math.max(0, 1 - Math.abs(offset) * 1.4));
    });
  };

  const {
    active: activeIndex,
    trackRef,
    barRef,
    select,
  } = usePinnedTabs(count, moveCopy);
  const active = benefitTabs[activeIndex] ?? benefitTabs[0];

  const selectTab = (idx: number) => {
    const tab = benefitTabs[idx];
    trackButtonClick(`Tab: ${tab.label}`, LOCATION, {
      tab_id: tab.id,
      tab_index: idx,
    });
    select(idx);
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
      {/* Mobile: one benefit per swipe, no pinning. */}
      <div className="lg:hidden">
        {benefitTabs.map((tab) => (
          <BenefitCard
            key={tab.id}
            tab={tab}
            visual={<BenefitClip id={tab.id} />}
          />
        ))}
      </div>

      {/* Desktop: the same pinned scroller as the healthcare workforce
          section. The tabs and panel hold in place while the page scrolls
          through the track; scroll position picks the tab and fills its
          segment of the bar, and a tab click glides to that tab. One screen
          of pinned content plus 80vh of scroll per tab — the multiplier is
          the tab count, written out because Tailwind needs a literal. */}
      <div
        ref={trackRef}
        className="hidden lg:block relative h-[calc(100vh+4*80vh)]"
      >
        {/* pt clears the sticky site header. */}
        <div className="sticky top-0 h-screen flex flex-col justify-center pt-[60px]">
          <Container className="w-full lg:px-12 xl:px-20">
            {/* Tab bar: four connected cells under one hairline border, with
                each tab's scroll progress drawn along the box's bottom edge.
                Both rows are grid-cols-4 inside the same border, so a segment
                lines up with its tab without measuring anything. */}
            <div className="mx-auto mb-8 w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
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

              {/* Square ends, flush to the box's bottom edge. Each segment
                  fills as the page scrolls through its tab. */}
              <div aria-hidden="true" className="grid grid-cols-4">
                {benefitTabs.map((tab, i) => (
                  <span key={tab.id} className="h-[3px] overflow-hidden">
                    <span
                      ref={barRef(i)}
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
              className="grid grid-cols-[minmax(0,1fr),minmax(0,1.4fr)] gap-16"
            >
              {/* Copy window: every tab's copy is stacked here and slides
                  through as the page scrolls, fading out toward the edges.
                  Each block fills the window, so a 100% translate moves it
                  exactly one window. Blocks start one window apart; the
                  scroll handler takes over from the first frame. Off-tab
                  copy is inert so its CTA can't be tabbed to unseen. */}
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
                {benefitTabs.map((tab, i) => (
                  <div
                    key={tab.id}
                    ref={(el) => {
                      copyRefs.current[i] = el;
                    }}
                    inert={i !== activeIndex}
                    aria-hidden={i !== activeIndex}
                    className="absolute inset-0 flex items-center will-change-transform"
                    style={{
                      transform: `translateY(${i * 100}%)`,
                      opacity: i === 0 ? 1 : 0,
                    }}
                  >
                    <div className="max-w-md">
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
                  </div>
                ))}
              </div>

              {/* Capped by viewport height (as a 4:3 width) so the pinned
                  block always fits under the header and tab bar. Every tab's
                  poster is stacked here so a tab change cross-fades between
                  frames that are already loaded; only the active tab
                  fetches and plays its video. */}
              <div className="w-full max-w-[calc((100vh-15rem)*4/3)] ml-auto">
                <LazyVisual className={VISUAL_BOX}>
                  {benefitTabs.map((tab, i) => (
                    <div
                      key={tab.id}
                      aria-hidden={i !== activeIndex}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        i === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <BenefitClip id={tab.id} playing={i === activeIndex} />
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
