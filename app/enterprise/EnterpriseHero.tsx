"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import EnterpriseFlow from "./EnterpriseFlow";
import EnterpriseFlowMobile from "./EnterpriseFlowMobile";

/**
 * The enterprise hero: a centred stack (headline, copy, CTAs) on white, with
 * the roster flow animation beneath it.
 *
 * The faint dot grid and its cursor-following focal point are LandingHero's
 * treatment, in navy on white rather than white on blue.
 */

// The page colour, and the same value at zero alpha (an explicit rgba: some
// engines fade `transparent` through grey, which would haze the falloff).
const FIELD = "#FFFFFF";
const FIELD_CLEAR = "rgba(255,255,255,0)";

/** Resting focal point, in % of the section — behind the headline. */
const SPOT_HOME = { x: 50, y: 30 };
/** How far the focal point may travel from home, in percentage points. */
const SPOT_TRAVEL = 15;
/** Damping for the focal point; ambient, so it lags the cursor. */
const SPOT_SMOOTHING = 0.08;
/** Below this (in %), the focal point has arrived and the loop can stop. */
const SPOT_EPSILON = 0.01;

type Cta = {
  href: string;
  label: string;
  analyticsProperties?: Record<string, unknown>;
};

export default function EnterpriseHero({
  title,
  description,
  primaryCta,
  analyticsLocation,
}: {
  title: string;
  description: string;
  primaryCta: Cta;
  analyticsLocation: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  // The dots' focal point drifts toward the cursor — same approach as
  // LandingHero: only a gradient's centre moves, written straight to the node
  // as custom properties so React never re-renders on pointer moves.
  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = SPOT_HOME.x;
    let targetY = SPOT_HOME.y;
    let currentX = SPOT_HOME.x;
    let currentY = SPOT_HOME.y;
    let frame = 0;
    let lastTime = 0;

    const clamp = (value: number, home: number) =>
      Math.max(home - SPOT_TRAVEL, Math.min(home + SPOT_TRAVEL, value));

    const tick = (now: number) => {
      // Frame-rate independent damping.
      const deltaFrames = lastTime ? Math.min((now - lastTime) / 16.667, 4) : 1;
      lastTime = now;
      const k = 1 - Math.pow(1 - SPOT_SMOOTHING, deltaFrames);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      spot.style.setProperty("--spot-x", `${currentX}%`);
      spot.style.setProperty("--spot-y", `${currentY}%`);
      if (
        Math.abs(targetX - currentX) < SPOT_EPSILON &&
        Math.abs(targetY - currentY) < SPOT_EPSILON
      ) {
        frame = 0;
        lastTime = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = clamp(
        ((event.clientX - rect.left) / rect.width) * 100,
        SPOT_HOME.x,
      );
      targetY = clamp(
        ((event.clientY - rect.top) / rect.height) * 100,
        SPOT_HOME.y,
      );
      start();
    };
    const onLeave = () => {
      targetX = SPOT_HOME.x;
      targetY = SPOT_HOME.y;
      start();
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-white">
      {/* Faint navy dots, gathered around a focal point that drifts after the
          cursor, fading out to white toward the edges. */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className="absolute inset-0"
        style={
          {
            "--spot-x": `${SPOT_HOME.x}%`,
            "--spot-y": `${SPOT_HOME.y}%`,
            backgroundImage: [
              `radial-gradient(ellipse 60% 70% at var(--spot-x) var(--spot-y), ${FIELD_CLEAR} 0%, ${FIELD_CLEAR} 35%, ${FIELD} 90%)`,
              "radial-gradient(circle, rgba(31,42,92,0.16) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "100% 100%, 22px 22px",
          } as CSSProperties
        }
      />

      {/* Heading uses the home page's responsive type scale. */}
      <Container className="relative pt-6 pb-10 text-center md:pt-12 md:pb-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-balance text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.024em] text-[#1F2A5C]">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-[46em] text-balance text-[15px] leading-[1.55] text-gray-600 md:mt-4 md:text-[17px] md:leading-[1.6]">
            {description}
          </p>
          <div className="mt-5 flex flex-row flex-wrap items-center justify-center gap-3 md:mt-7">
            <Button
              href={primaryCta.href}
              prefetch={true}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#3B7FE8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2A3F8F] focus:ring-[#3B7FE8] sm:px-8 sm:py-3.5 sm:text-base"
              analyticsLabel={primaryCta.label}
              analyticsLocation={analyticsLocation}
              analyticsProperties={primaryCta.analyticsProperties}
            >
              {primaryCta.label}
            </Button>
          </div>
        </div>

        {/* The roster flow, under the copy. */}
        {/* Wrapped: the diagram's own CSS sets its margin. */}
        {/* The 900px desktop diagram shrinks past reading on a phone, so
            phones get the four-roster mobile cut instead. */}
        <div className="mx-auto mt-10 hidden max-w-[820px] text-left sm:block">
          <EnterpriseFlow />
        </div>
        <div className="mt-5 text-left sm:hidden">
          <EnterpriseFlowMobile fitToScreen />
        </div>
      </Container>
    </section>
  );
}
