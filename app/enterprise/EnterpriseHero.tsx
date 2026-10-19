"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { HEADER_OVERLAY_ATTR } from "@/components/layout/Header";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";

/**
 * The enterprise hero: a centred stack (eyebrow, headline, copy, CTAs) over
 * the same dotted blue field as the home page's LandingHero.
 *
 * It behaves like the home hero: it tucks up under the header, which stays
 * painted blue until this section scrolls past it (ClientHeader turns on
 * `blueOverHero` for /enterprise), and the dots' focal point drifts after the
 * cursor. The field colour, dot grid, falloff and damping are LandingHero's.
 */

const HERO_BLUE = "#3779DD";
const HERO_BLUE_CLEAR = "rgba(55,121,221,0)";

/** Resting focal point, in % of the section — behind the headline. */
const SPOT_HOME = { x: 50, y: 42 };
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
  secondaryCta,
  analyticsLocation,
  trustedHeading,
}: {
  title: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  analyticsLocation: string;
  /** Heading for the logo wall carried in the blue below the hero copy. */
  trustedHeading?: string;
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
    // Pulled up under the 80px header so the two read as one blue field; the
    // top padding grows by the same 80px to hold the content's place.
    <section
      ref={sectionRef}
      {...{ [HEADER_OVERLAY_ATTR]: "" }}
      className="rl-section relative -mt-20 flex min-h-svh flex-col overflow-x-clip bg-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-b-3xl lg:rounded-b-[48px]"
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: HERO_BLUE }}
        />
        <div
          ref={spotRef}
          className="absolute inset-0"
          style={
            {
              "--spot-x": `${SPOT_HOME.x}%`,
              "--spot-y": `${SPOT_HOME.y}%`,
              backgroundImage: [
                `radial-gradient(ellipse 55% 65% at var(--spot-x) var(--spot-y), ${HERO_BLUE_CLEAR} 0%, ${HERO_BLUE_CLEAR} 30%, ${HERO_BLUE} 85%)`,
                "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "100% 100%, 22px 22px",
            } as CSSProperties
          }
        />
      </div>

      {/* The section is one screen tall: the copy takes the free space and
          centres in it, and the logo wall sits along the bottom. */}
      <Container className="relative flex flex-1 flex-col items-center justify-center pt-32 pb-12 text-center lg:pt-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-base font-semibold text-white/90">Enterprise</p>
          <h1 className="mt-5 text-balance text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.024em] text-white">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-[36em] text-balance text-[18px] font-medium leading-[1.55] text-white/85 md:text-xl">
            {description}
          </p>
          <div className="mt-9 flex flex-row flex-wrap items-center justify-center gap-3">
            <Button
              href={primaryCta.href}
              prefetch={true}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-950 sm:px-8 sm:py-3.5 sm:text-base"
              analyticsLabel={primaryCta.label}
              analyticsLocation={analyticsLocation}
              analyticsProperties={primaryCta.analyticsProperties}
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              prefetch={true}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:px-8 sm:py-3.5 sm:text-base"
              analyticsLabel={secondaryCta.label}
              analyticsLocation={analyticsLocation}
              analyticsProperties={secondaryCta.analyticsProperties}
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* The logo wall rides in the blue, as it does on the home hero. */}
      <div className="relative pb-12 lg:pb-14">
        <TrustedByDualRow onDark heading={trustedHeading} />
      </div>
    </section>
  );
}
