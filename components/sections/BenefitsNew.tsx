"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
// cycle restarts.
const START_MS = 900;
const HOLD_MS = 3200;

interface BenefitTab {
  id: string;
  label: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  image?: string;
}

const benefitTabs: BenefitTab[] = [
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
      href: "/feature/preferences-and-requests",
    },
  },
  {
    id: "safety",
    label: "Safety & Fairness",
    title: "Ensure compliance and equity",
    description:
      "Ensure clinical safety and fairness with every roster. By embedding equity and fatigue-management rules into our AI, you eliminate favouritism, reduce staff fatigue, and create safer, more inclusive rosters.",
    cta: { label: "Explore safety", href: "/feature/rules-engine" },
  },
];

export default function BenefitsNew() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const active = benefitTabs[activeIndex] ?? benefitTabs[0];

  // Scroll budget for the pinned section: a full viewport per tab plus one
  // more for the initial sticky pin. Each tab holds twice as long as it used
  // to, so its animation has room to loop before the next one takes over.
  const perTabVh = 100;
  const scrollBudgetVh = useMemo(() => 100 + benefitTabs.length * perTabVh, []);

  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const compute = () => {
      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Total scrollable distance INSIDE the pinned section (element
      // height minus one viewport, because the last viewport is when
      // the sticky child bottom aligns with the viewport bottom).
      const totalScrollable = rect.height - viewportH;
      if (totalScrollable <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = scrolled / totalScrollable;
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

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const renderVisual = (id: string) => {
    // Each visual is only mounted for the active tab, so autoplay is safe
    // to enable on all of them — an offscreen tab isn't in the tree.
    switch (id) {
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
        return active.image ? (
          <Image
            src={active.image}
            alt={active.title}
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
    const viewportH = window.innerHeight;
    const totalScrollable = wrapper.offsetHeight - viewportH;
    if (totalScrollable <= 0) {
      setActiveIndex(idx);
      return;
    }
    const target =
      wrapper.offsetTop + (totalScrollable * (idx + 0.5)) / benefitTabs.length;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={scrollWrapperRef}
      className="relative"
      style={{ height: `${scrollBudgetVh}vh` }}
    >
      {/* Top-aligned rather than centred: the content is ~580px in a ~950px
          viewport, so centring parked a large dead band above the tab bar.
          The 60px term clears the sticky site header — this section also pins
          at top:0, so it sits UNDERNEATH the header and padding below that
          height is invisible. Keep the two in sync if the condensed header
          height changes. The vh term is the actual breathing room, and being
          viewport-relative it gives way on short screens instead of pushing
          the mockup out of the pinned area. */}
      <section className="sticky top-0 flex flex-col justify-start overflow-hidden pt-[calc(60px+6vh)] h-[max(720px,calc(100vh-100px))]">
        <Container className="w-full">
          {/* Tab bar. On mobile all 4 pills fit in one row by wrapping
              their labels to 2 lines; on desktop a single-line pill bar. */}
          <div className="mb-8 md:mb-14">
            <div
              role="tablist"
              aria-label="Benefits"
              className="grid grid-cols-4 gap-2 lg:flex lg:justify-center lg:gap-1 lg:bg-white lg:rounded-full lg:p-1.5 lg:shadow-sm lg:border lg:border-gray-200 lg:w-fit lg:mx-auto"
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-6">
                {active.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-8">
                {active.description}
              </p>
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
              <div className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[420px] flex items-center justify-center [&>*]:w-full">
                {renderVisual(active.id)}
              </div>
            </div>
          </div>

          {/* Progress dots — visual cue that there's more to scroll through. */}
          <div className="flex justify-center gap-2 mt-6 md:mt-10">
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
  );
}
