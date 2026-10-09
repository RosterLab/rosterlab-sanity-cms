"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Capabilities";

/** How long each capability holds on desktop before the next takes over. */
const HOLD_MS = 7000;

// Longest frame delta the timer will credit, so a main-thread stall pauses
// the bar instead of jumping it forward when frames resume.
const MAX_FRAME_MS = 50;

export interface Capability {
  /** Short uppercase tag above the title: BUILD, ADAPT, ENGAGE. */
  tag: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  /**
   * Product image, exported 3:2 (2000×1333). The desktop showcase shows it
   * 16:10 with the crop set a little above centre, which trims about 2% off
   * the top and 4% off the bottom; keep the subject clear of those edges.
   */
  image: { src: string; alt: string };
}

export const CAPABILITIES_AU: Capability[] = [
  {
    tag: "Build",
    title: "Build the rosters spreadsheets can't",
    description:
      "RosterLab generates fully optimised rosters using an automated rules-based engine to balance staffing demand, skill mix, fatigue limits, union agreements, and other constraints.",
    cta: {
      label: "Explore automated rostering",
      href: "/feature/automated-rostering",
    },
    image: {
      src: "/landing/capabilities/build-rules.webp",
      alt: "The RosterLab Rule Builder listing hours, night-shift and days-off rules, in front of a roster being generated from them",
    },
  },
  {
    tag: "Adapt",
    title: "Adapt the roster as plans change",
    description:
      "Handle absences and last-minute changes without rebuilding the roster from scratch. Automate shift swaps and fill gaps instantly while keeping coverage and compliance intact.",
    cta: { label: "Explore re-rostering", href: "/feature/re-rostering" },
    image: {
      src: "/landing/capabilities/adapt-open-shifts.webp",
      alt: "An open night shift on the roster, with a staff member accepting it from the RosterLab app",
    },
  },
  {
    tag: "Engage",
    title: "Let staff shape their rosters",
    description:
      "Give staff greater flexibility around when they work with self-service tools to submit preferences, request leave, and see their latest shifts in one app.",
    cta: { label: "Explore self-scheduling", href: "/feature/self-scheduling" },
    image: {
      src: "/landing/capabilities/engage-preferences.webp",
      alt: "A staff member picks a Short Day preference in the RosterLab app and it appears on the manager's Preferences view",
    },
  },
];

/**
 * One capability as a stacked card — the mobile layout, where the three sit
 * one after another instead of sharing a showcase.
 */
function CapabilityCard({ capability }: { capability: Capability }) {
  const { tag, title, description, cta, image } = capability;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-[3/2] w-full border-b border-gray-200 bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {tag}
        </p>
        <h3 className="mt-2 text-xl font-bold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
        <CapabilityLink cta={cta} />
      </div>
    </article>
  );
}

function CapabilityLink({ cta }: { cta: Capability["cta"] }) {
  return (
    <Link
      href={cta.href}
      onClick={() => trackSmartButtonClick(cta.label, cta.href, LOCATION)}
      className="group mt-5 inline-flex items-center gap-2 self-start text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
    >
      {cta.label}
      <LuArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

/**
 * Desktop showcase, after Intercom's helpdesk section: one wide product image
 * over a row of the three capabilities. The row works as tabs — the active
 * one is lifted onto white with a bar along its top edge that fills over
 * HOLD_MS, then hands over to the next. Clicking one takes it and restarts
 * its run. Runs only while on screen, and not at all under reduced motion.
 */
function CapabilityShowcase({ capabilities }: { capabilities: Capability[] }) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);
  const count = capabilities.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The bar is written straight to the DOM each frame so the timer doesn't
  // re-render the section; state only changes on hand-over.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (reduceMotion) {
      bar.style.transform = "scaleX(1)";
      return;
    }
    bar.style.transform = `scaleX(${elapsedRef.current / HOLD_MS})`;
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsedRef.current += Math.min(now - last, MAX_FRAME_MS);
      last = now;
      const fraction = Math.min(elapsedRef.current / HOLD_MS, 1);
      bar.style.transform = `scaleX(${fraction})`;
      if (fraction >= 1) {
        elapsedRef.current = 0;
        setActive((i) => (i + 1) % count);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, inView, reduceMotion, count]);

  const select = (i: number) => {
    trackButtonClick(`Capability: ${capabilities[i].tag}`, LOCATION);
    // Re-picking the current one restarts its run; setting the same index is
    // a no-op for React, so the bar is zeroed here too.
    elapsedRef.current = 0;
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    setActive(i);
  };

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Every image is stacked here so a hand-over cross-fades between
          frames that are already loaded. */}
      <div
        id="capability-showcase-media"
        className="relative aspect-[16/10] w-full bg-slate-100"
      >
        {capabilities.map((c, i) => (
          <Image
            key={c.tag}
            src={c.image.src}
            alt={i === active ? c.image.alt : ""}
            aria-hidden={i !== active}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className={`object-cover object-[center_30%] transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 border-t border-gray-200 bg-slate-50">
        {capabilities.map((c, i) => {
          const isActive = i === active;
          return (
            <div
              key={c.tag}
              className={`relative flex flex-col px-7 pb-7 pt-6 transition-colors duration-300 ${
                isActive ? "bg-white" : ""
              } ${i > 0 ? "border-l border-gray-200" : ""}`}
            >
              {/* Timer along the active column's top edge. */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] overflow-hidden"
                >
                  <span
                    ref={barRef}
                    className="block h-full w-full origin-left bg-blue-600"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              )}
              <button
                type="button"
                aria-pressed={isActive}
                aria-controls="capability-showcase-media"
                onClick={() => select(i)}
                className="flex flex-1 flex-col items-start justify-start text-left"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 transition-colors ${
                      isActive ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {c.tag}
                  </span>
                </span>
                <span
                  className={`mt-2 block text-xl xl:text-2xl font-bold leading-snug transition-colors ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {c.title}
                </span>
                <span
                  className={`mt-3 block text-sm xl:text-base leading-relaxed transition-colors ${
                    isActive ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {c.description}
                </span>
              </button>
              <CapabilityLink cta={c.cta} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CapabilitiesSection({
  capabilities = CAPABILITIES_AU,
  heading = "Keep rosters running smoothly with RosterLab",
}: {
  capabilities?: Capability[];
  heading?: string;
} = {}) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      {/* Narrower than the page container so the image and the row of three
          fit on one desktop screen together. */}
      <Container className="lg:max-w-5xl">
        <h2 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {heading}
        </h2>

        {/* Mobile: the three as stacked cards. */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:hidden">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.tag} capability={capability} />
          ))}
        </div>

        {/* Desktop: one image over a row of three. */}
        <div className="mt-12 hidden lg:block">
          <CapabilityShowcase capabilities={capabilities} />
        </div>
      </Container>
    </section>
  );
}
