"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import {
  HERO_CONTENT_AU,
  type HeroNewContent,
} from "@/components/sections/HeroNew";

/**
 * Layout study modelled on attio.com's hero: a centred text stack over a
 * dotted blue field, with an app window below it that grows to full size as
 * it scrolls into view.
 *
 * Proportions taken from the reference measured at 1440x1000:
 *  - text column 864px wide, centred; 36px pill-to-headline gap
 *  - headline weight 600, leading 0.95, tracking -0.024em
 *  - window 75% of viewport width, 16px radius
 *
 * The screen is a recording of the app generating a roster. The reference's
 * 1.745 window ratio is not used: the recording brings its own browser chrome,
 * so the frame takes the recording's shape (1.967) and the fake title bar that
 * stood in for it is gone.
 */

/**
 * Scale the window lands at, before any scrolling. It shrinks from here to 1
 * — its natural size — as the reader scrolls down to it, so the whole window
 * comes into view rather than being cropped by the fold.
 */
const LANDING_SCALE = 1.25;

/**
 * How far the window's scale closes toward its scroll-derived target each
 * 60Hz frame. Lower is heavier and smoother; too low and it lags the scroll
 * enough to feel disconnected. This is what keeps the motion off the raw
 * wheel input — a scroll-linked scale with no damping picks up every notch of
 * a mouse wheel and every stutter in trackpad momentum.
 */
const SMOOTHING = 0.1;

/** Below this, the scale has arrived and the loop can stop. */
const EPSILON = 0.0002;

/** Smoothstep — symmetric ease in and out, no snap at either end. */
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** The live hero's field colour (HeroNew's HERO_BLUE), and the same value at
 * zero alpha — needed as an explicit rgba because some engines interpolate
 * `transparent` through grey, which would haze the dots' falloff. */
const HERO_BLUE = "#3779DD";
const HERO_BLUE_CLEAR = "rgba(55,121,221,0)";

/**
 * Where the dots' focal point sits when the pointer is away, in % of the
 * section. Deliberately above centre: this is the band the headline sits in.
 */
const SPOT_HOME = { x: 50, y: 38 };

/**
 * How far the focal point may travel from home, in percentage points. Tracking
 * the cursor all the way pulls the dots off the headline entirely when someone
 * parks the pointer in a corner, which is worse than not moving at all.
 */
const SPOT_TRAVEL = 15;

/**
 * Damping for the focal point. Heavier than the window's — this is ambient, so
 * it should lag the cursor rather than stick to it. Raw pointer coordinates
 * with no smoothing read as twitchy.
 */
const SPOT_SMOOTHING = 0.08;

/** Below this (in %), the focal point has arrived and the loop can stop. */
const SPOT_EPSILON = 0.01;

/**
 * How far the mockup holds still, as a share of the viewport height.
 *
 * This is a sticky pin, not wheel interception: the reader's scroll always does
 * exactly what they asked, the mockup simply stays put while this much of the
 * page passes behind it. Long enough that the roster generating is hard to miss,
 * short enough that nobody feels held. The whole value is empty field below the
 * mockup, so raising it buys dwell time at the cost of dead blue.
 */
const PIN_SCROLL_VH = 50;

const VIDEO_SRC = "/landing/mockup/hero-browser.mp4";
const VIDEO_POSTER = "/landing/mockup/hero-browser-poster.webp";

/**
 * The recording's own pixel size, which sets the screen's aspect ratio. The
 * source export sat on a grey backdrop with a drop shadow around the window;
 * both were cropped off on encode, so this is the browser window edge to edge
 * and the frame below can sit flush against it.
 */
const SCREEN = { w: 1812, h: 920 };

/**
 * Holds the video's bytes back until the page has loaded.
 *
 * Same reasoning as HeroStoolVideo, which measured it: the hero is the LCP
 * element, and starting a 1.4MB fetch in that contention window costs more
 * than the animation is worth. The poster carries the screen until then,
 * and it is the video's own first frame, so nothing moves when the src lands.
 */
function useDeferredSrc(enabled: boolean) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const idle = (
        window as unknown as { requestIdleCallback?: typeof setTimeout }
      ).requestIdleCallback;
      if (typeof idle === "function")
        idle(() => !cancelled && setSrc(VIDEO_SRC));
      else window.setTimeout(() => !cancelled && setSrc(VIDEO_SRC), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, [enabled]);
  return src;
}

export default function HeroAttio({
  content = HERO_CONTENT_AU,
}: {
  content?: HeroNewContent;
} = {}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  /** The layer carrying the dots and their painted falloff. */
  const spotRef = useRef<HTMLDivElement>(null);
  /** Untransformed wrapper, used for measurement — see targetScale() below. */
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  // Under reduced motion the poster is the whole story — never fetch the video.
  const videoSrc = useDeferredSrc(!reduceMotion);

  useEffect(() => {
    const element = windowRef.current;
    const track = trackRef.current;
    if (!element || !track) return;

    // Someone who has asked for less motion gets the window at its own size.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.transform = "scale(1)";
      return;
    }

    const targetScale = () => {
      // Measured off the wrapper and the window's *layout* height, both of
      // which ignore the transform. Reading the scaled rect instead would feed
      // each frame's scale back into the next frame's progress.
      const top = track.getBoundingClientRect().top;
      const centre = top + element.offsetHeight / 2;
      const viewportHeight = window.innerHeight;

      // 0 while the window's centre is still below the fold — where it lands —
      // reaching 1 once that centre has risen to just above the middle of the
      // viewport, by which point the window is fully on screen. The range is
      // deliberately long, so the change is never hurried.
      const start = viewportHeight * 1.1;
      const end = viewportHeight * 0.3;
      const progress = Math.min(
        1,
        Math.max(0, (start - centre) / (start - end)),
      );
      return LANDING_SCALE - (LANDING_SCALE - 1) * smoothstep(progress);
    };

    let current = targetScale();
    let frame = 0;
    let lastTime = 0;

    const tick = (now: number) => {
      const target = targetScale();
      // Frame-rate independent damping. A fixed per-frame fraction settles
      // twice as fast on a 120Hz display as on a 60Hz one, which is exactly
      // the kind of inconsistency that reads as cheap on nicer hardware.
      const deltaFrames = lastTime ? Math.min((now - lastTime) / 16.667, 4) : 1;
      lastTime = now;
      current +=
        (target - current) * (1 - Math.pow(1 - SMOOTHING, deltaFrames));

      if (Math.abs(target - current) < EPSILON) {
        current = target;
        element.style.transform = `scale(${current})`;
        frame = 0;
        lastTime = 0;
        return;
      }

      element.style.transform = `scale(${current})`;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame) return;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };

    element.style.transform = `scale(${current})`;
    start();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", start, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
    };
  }, []);

  // The dots' focal point drifts toward the cursor.
  //
  // This only moves a gradient's centre, which is why it is cheap: the falloff
  // is painted rather than masked, so there is no per-dot work and nothing to
  // re-rasterise. The coordinates go out as custom properties written straight
  // to the node — putting them in React state would re-render the section on
  // every pointer move for a value only CSS reads.
  useEffect(() => {
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    // Nothing to follow on touch, and nothing should chase the cursor for
    // someone who has asked for less motion.
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
      // Same frame-rate independent damping as the window scale above, for the
      // same reason: a fixed per-frame fraction settles twice as fast at 120Hz.
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

    // Drift home rather than freezing wherever the pointer happened to exit.
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
    // `overflow-x: clip` rather than `overflow-hidden`. The mockup is scaled to
    // 1.25 while it lands, which overhangs the viewport on narrow screens, so
    // the horizontal clip has to stay — but `hidden` would make this section a
    // scroll container, and a `position: sticky` descendant then has nothing to
    // stick against. `clip` crops without creating one, so the pin below works.
    // The rounding moved onto the background layer, which is the only thing
    // that needed clipping to the radius.
    <section ref={sectionRef} className="relative overflow-x-clip bg-white">
      {/* Background — the same treatment as the live hero (HeroNew): the flat
          brand blue with a 22px grid of white dots over it, concentrated at a
          focal point and dissolving toward the edges.

          HeroNew masks the dots with `mask-image`. This paints the fade on top
          in the field colour instead, which is the approach DotFocalOverlay
          settled on for the same effect: a masked element has to rasterise as
          one texture, capped at 16,384px per side, and a pinch-zoom on a hero
          this tall can blow that cap and drop the layer. A plain background
          paints into ordinary tiles with no such cap. */}
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
              // Written by the pointer effect above; these are the resting
              // values, and the ones a touch or no-JS visitor keeps.
              "--spot-x": `${SPOT_HOME.x}%`,
              "--spot-y": `${SPOT_HOME.y}%`,
              backgroundImage: [
                // Topmost: field colour, clear over the focal point and opaque
                // by 85% out — the falloff HeroNew's mask describes.
                `radial-gradient(ellipse 55% 65% at var(--spot-x) var(--spot-y), ${HERO_BLUE_CLEAR} 0%, ${HERO_BLUE_CLEAR} 30%, ${HERO_BLUE} 85%)`,
                "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "100% 100%, 22px 22px",
            } as CSSProperties
          }
        />
      </div>

      <div className="relative">
        {/* Text stack — centred, on the reference's 864px column. */}
        <Container className="pt-24 text-center">
          {/* Two balanced lines. The reference holds one, but Poppins is far
              wider than its display face and this headline is longer. */}
          <h1 className="mx-auto max-w-[864px] text-balance text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.024em] text-white">
            {content.headline}
          </h1>

          <p className="mx-auto mt-9 max-w-[40em] text-balance text-[18px] font-medium leading-[1.4] tracking-[-0.18px] text-white/85">
            {content.description}
          </p>

          {/* Copy and CTAs come from the same content objects HeroNew uses, so
              the AU and US wording stays in one place. */}
          <div className="mt-8 flex flex-row items-center justify-center gap-3">
            <Button
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-blue-900 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-blue-950"
              analyticsLabel={content.primaryCta.label}
              analyticsLocation="Hero"
            >
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-blue-700 transition hover:bg-blue-50"
              analyticsLabel={content.secondaryCta.label}
              analyticsLocation="Hero"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </Container>

        {/* Window — 75% of the viewport width, landing oversized and shrinking
            to its own size as it is scrolled to. Scaling is a transform, so it
            never reflows the page.

            trackRef stays on this outer wrapper: it is the last element above
            the pin that still moves with the scroll, so the landing scale
            finishes before the mockup goes sticky. */}
        {/* The bottom padding is load-bearing now that this section clips only
            horizontally: it keeps the mockup's square bottom edge clear of the
            section's rounded corner, which it would otherwise sit flush against
            and overhang as the pin releases. */}
        <div ref={trackRef} className="mt-20 px-4 pb-24">
          {/* Pin rail. The mockup holds the top of this box while the rest of
              it scrolls past, then releases on its own.

              The extra length is an in-flow spacer, NOT padding on this rail.
              A sticky box is constrained to its parent's *content* box, so
              padding here adds height the pin cannot use and the mockup just
              scrolls away — which is exactly what it did on the first pass. */}
          <div>
            <div className="sticky top-24 flex justify-center lg:top-28">
              <div
                ref={windowRef}
                // Anchored at the top, so shrinking draws the bottom edge up
                // into view rather than pulling both edges to the middle.
                // No bezel: the recording is already a browser window, so a
                // frame drawn around it would read as a second one. The clip
                // trims the corner radius baked into the recording; the ring
                // and shadow are what lift it off the field.
                className="relative w-full max-w-[1080px] origin-top overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10),0_40px_80px_-32px_rgba(16,24,40,0.22)] ring-1 ring-black/[0.04] will-change-transform lg:w-3/4"
                style={{
                  transform: `scale(${LANDING_SCALE})`,
                  aspectRatio: `${SCREEN.w} / ${SCREEN.h}`,
                }}
              >
                <video
                  src={videoSrc}
                  poster={VIDEO_POSTER}
                  autoPlay
                  loop
                  muted
                  playsInline
                  // src is attached after load, so there is nothing to preload
                  // before then and nothing to guess about afterwards.
                  preload="none"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
            <div aria-hidden="true" style={{ height: `${PIN_SCROLL_VH}vh` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
