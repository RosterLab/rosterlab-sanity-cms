"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { trackButtonClick } from "@/components/analytics/tracking";

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
 * Geometry the tab-switching maths runs on.
 *
 * `totalScrollable` is the distance the page scrolls while the section stays
 * pinned: the wrapper height minus the pinned child, because the pin releases
 * when the wrapper bottom reaches the child bottom (the child is capped below
 * one viewport on tall screens, so it is measured, not assumed).
 *
 * `entry` is the approach — from the moment the section's top crosses the
 * bottom of the viewport it is on screen reading as tab one, a whole viewport
 * before it ever pins, so that distance counts towards the first tab's share.
 */
function measureSection(wrapper: HTMLElement, sticky: HTMLElement | null) {
  const stickyH = sticky?.offsetHeight ?? window.innerHeight;
  return {
    totalScrollable: wrapper.offsetHeight - stickyH,
    entry: window.innerHeight,
  };
}

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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  // Set while a tab-bar click is animating its smooth scroll. The scroll
  // crosses every tab in between on the way, so without this the pills flicker
  // through them before settling on the one that was clicked.
  const jumpTargetRef = useRef<{ index: number; y: number } | null>(null);
  const jumpTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = benefitTabs[activeIndex] ?? benefitTabs[0];

  // Scroll budget for the pinned section: a full viewport per tab plus one
  // more for the initial sticky pin. Each tab holds twice as long as it used
  // to, so its animation has room to loop before the next one takes over.
  const perTabVh = 100;
  const scrollBudgetVh = useMemo(
    () => 100 + benefitTabs.length * perTabVh,
    [benefitTabs.length],
  );

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const compute = () => {
      const jump = jumpTargetRef.current;
      if (jump) {
        // Hold the clicked tab until the animation lands on it.
        if (Math.abs(window.scrollY - jump.y) > 2) return;
        jumpTargetRef.current = null;
      }
      const rect = wrapper.getBoundingClientRect();
      const { totalScrollable, entry } = measureSection(
        wrapper,
        stickyRef.current,
      );
      if (totalScrollable <= 0) return;
      // Counting from the pin start gave the first tab an extra viewport of
      // dwell — it is already on screen for the whole approach. Counting from
      // the moment the section enters view instead makes all four equal.
      const travelled = Math.min(
        Math.max(entry - rect.top, 0),
        totalScrollable + entry,
      );
      const progress = travelled / (totalScrollable + entry);
      const idx = Math.min(
        benefitTabs.length - 1,
        Math.floor(progress * benefitTabs.length),
      );
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        compute();
        raf = 0;
      });
    };

    // Grabbing the page mid-animation cancels the jump, so drop the hold and
    // let the scroll position drive the tabs again.
    const releaseJump = () => {
      jumpTargetRef.current = null;
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", releaseJump, { passive: true });
    window.addEventListener("touchstart", releaseJump, { passive: true });
    window.addEventListener("keydown", releaseJump);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", releaseJump);
      window.removeEventListener("touchstart", releaseJump);
      window.removeEventListener("keydown", releaseJump);
      if (jumpTimerRef.current) window.clearTimeout(jumpTimerRef.current);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [benefitTabs.length]);

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

  const jumpToTab = (idx: number) => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;
    const { totalScrollable, entry } = measureSection(
      wrapper,
      stickyRef.current,
    );
    if (totalScrollable <= 0) {
      setActiveIndex(idx);
      return;
    }
    // Inverse of compute(): land in the middle of the tab's slice. Clamped to
    // the document, otherwise an unreachable target would leave the tab held
    // forever (see jumpTargetRef).
    const progress = (idx + 0.5) / benefitTabs.length;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const target = Math.round(
      Math.min(
        Math.max(
          wrapper.offsetTop - entry + progress * (totalScrollable + entry),
          0,
        ),
        maxScroll,
      ),
    );
    jumpTargetRef.current = { index: idx, y: target };
    setActiveIndex(idx);
    window.scrollTo({ top: target, behavior: "smooth" });
    // Belt and braces: if the animation is cut short and never lands exactly
    // on the target, hand control back rather than freezing the tabs.
    if (jumpTimerRef.current) window.clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = window.setTimeout(() => {
      jumpTargetRef.current = null;
    }, 1500);
  };

  return (
    <>
      {/* Mobile: one benefit per swipe, no pinning. */}
      <div className="lg:hidden">
        {benefitTabs.map((tab) => (
          <BenefitCard key={tab.id} tab={tab} visual={renderVisual(tab)} />
        ))}
      </div>

      {/* Desktop: the pinned tab scroller. Hidden below lg, so the wrapper
          measures 0 there and the scroll maths bails out. */}
      <div
        ref={scrollWrapperRef}
        className="relative hidden lg:block"
        style={{ height: `${scrollBudgetVh}vh` }}
      >
        {/* Top-aligned rather than centred: the content is ~580px in a ~950px
          viewport, so centring parked a large dead band above the tab bar.
          The 60px term clears the sticky site header — this section also pins
          at top:0, so it sits UNDERNEATH the header and padding below that
          height is invisible. Keep the two in sync if the condensed header
          height changes. The vh term is the actual breathing room, and being
          viewport-relative it gives way on short screens instead of pushing
          the mockup out of the pinned area.

          Heights are pinned to what the content actually measures — 763px at
          lg (where the copy column is narrowest and wraps most) and 663px
          from xl up. A viewport-height pin left a few hundred px of white
          between the last tab and the next section on tall screens. Below lg
          the layout stacks, so the height is left to the content. */}
        <section
          ref={stickyRef}
          className="sticky top-0 flex flex-col justify-start overflow-hidden pt-[calc(60px+2.5vh)] pb-10 lg:pb-0 lg:h-[800px] xl:h-[700px]"
        >
          <Container className="w-full lg:px-12 xl:px-20">
            {/* Tab bar. On mobile all 4 pills fit in one row by wrapping
              their labels to 2 lines; on desktop a single-line pill bar. */}
            <div className="mb-6 md:mb-8">
              <div
                role="tablist"
                aria-label="Benefits"
                className="flex justify-center gap-1 bg-white rounded-full p-1.5 shadow-sm border border-gray-200 w-fit mx-auto"
              >
                {benefitTabs.map((tab, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        trackButtonClick(`Tab: ${tab.label}`, LOCATION, {
                          tab_id: tab.id,
                          tab_index: i,
                        });
                        jumpToTab(i);
                      }}
                      className={`px-2 py-2 lg:px-5 xl:px-6 lg:py-2.5 rounded-2xl lg:rounded-full text-xs sm:text-sm md:text-base font-medium leading-tight lg:whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white lg:bg-transparent text-gray-700 lg:text-gray-600 border border-gray-200 lg:border-0 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={active.id}
              className="grid lg:grid-cols-[minmax(0,1fr),minmax(0,1.4fr)] gap-6 lg:gap-16 items-center animate-fade-in"
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

            {/* Progress dots — visual cue that there's more to scroll through. */}
            <div className="flex justify-center gap-2 mt-4 md:mt-5">
              {benefitTabs.map((tab, i) => (
                <div
                  key={tab.id}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-blue-600" : "w-4 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
