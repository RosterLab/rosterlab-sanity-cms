"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import Button from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import {
  HERO_CONTENT_AU,
  type HeroNewContent,
} from "@/components/sections/HeroNew";

/**
 * The landing page hero: a centred text stack over a dotted blue field, with
 * an app window below it that grows to full size as it scrolls into view and
 * then holds while the logo wall rises into the blue beneath it.
 *
 * Proportions were taken from a design reference measured at 1440x1000:
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
 * Two cuts of the same recording, chosen at fetch time.
 *
 * The frame paints ~2560 device px on a retina laptop and ~720 on a phone, so
 * one file cannot serve both without either softening the desktop or handing a
 * phone four times the pixels it can show. `desktop` is 2560 wide — 1:1 at the
 * settled size — and `mobile` is 960, which saves the phone about 1.1MB and
 * the decode that goes with it.
 *
 * Picked in JS rather than with <source media>, because the src is attached
 * after load anyway (see useDeferredSrc) and doing it here keeps one code path.
 */
const VIDEO_SRC = {
  desktop: "/landing/mockup/hero-browser.mp4",
  mobile: "/landing/mockup/hero-browser-mobile.mp4",
};

/** Below this width the phone cut is the one worth fetching. */
const MOBILE_VIDEO_MAX_W = 640;
/**
 * The still that stands in for the video, in two sizes.
 *
 * It is frame 0 of the recording, so nothing moves when the video takes over,
 * and it is the hero's LCP element — which is why it is an <img srcset> rather
 * than the video's `poster` attribute. `poster` takes a single URL with no
 * responsive variants, so one file had to serve both a 716px phone and a
 * 2560px retina laptop; the phone was downloading four times the pixels it
 * could show.
 */
const POSTER = {
  mobile: "/landing/mockup/hero-browser-poster-960.webp",
  desktop: "/landing/mockup/hero-browser-poster.webp",
};
const POSTER_SRCSET = `${POSTER.mobile} 960w, ${POSTER.desktop} 1920w`;

/**
 * How wide the frame is at each breakpoint, so the browser can pick a
 * candidate before any layout exists. Mirrors the frame's own classes:
 * full width inside the section's padding below `lg`, three quarters of the
 * viewport capped at 1080px above it.
 */
const POSTER_SIZES = "(min-width: 1024px) min(75vw, 1080px), 100vw";

/**
 * The recording's own pixel size, which the frame draws its aspect ratio from
 * so the box is reserved at the right shape before the video loads.
 *
 * Must match whatever is in VIDEO_SRC. A stale value here crops the recording
 * under `object-cover` and takes the poster with it. This export is the
 * browser window edge to edge; an earlier one carried a grey backdrop around
 * the window, which had to be cropped back off in CSS — check a re-export for
 * one before trusting these numbers.
 */
const SCREEN = { w: 2560, h: 1300 };

/**
 * Holds the video's bytes back until the page has loaded, then fetches the cut
 * that suits the screen.
 *
 * Same reasoning as HeroStoolVideo, which measured it: the hero is the LCP
 * element, and starting the video in that contention window costs more than
 * the animation is worth. The poster carries the screen until then, and it is
 * the video's own first frame, so nothing moves when the src lands.
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
      const chosen = window.matchMedia(`(max-width: ${MOBILE_VIDEO_MAX_W}px)`)
        .matches
        ? VIDEO_SRC.mobile
        : VIDEO_SRC.desktop;
      if (typeof idle === "function") idle(() => !cancelled && setSrc(chosen));
      else window.setTimeout(() => !cancelled && setSrc(chosen), 300);
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

/**
 * The pin, and the oversized landing scale that feeds it, are desktop-only.
 *
 * At phone width the window is a 1.97:1 letterbox roughly 180px tall, so the
 * 50vh of pin rail below it reads as a field of empty blue rather than as
 * dwell time on the mockup — and the landing scale pushes its sides past the
 * section's horizontal clip. Both are switched off below `lg`.
 */
function useIsDesktopHero() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
}

export default function LandingHero({
  content = HERO_CONTENT_AU,
  trustedHeading,
}: {
  content?: HeroNewContent;
  /** Heading for the logo wall carried inside the blue field. */
  trustedHeading?: string;
} = {}) {
  const windowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  /** The layer carrying the dots and their painted falloff. */
  const spotRef = useRef<HTMLDivElement>(null);
  /** Untransformed wrapper, used for measurement — see targetScale() below. */
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktopHero();
  /** The logo wall in the blue field below the mockup, and whether it is in. */
  const trustedRef = useRef<HTMLDivElement>(null);
  const [trustedIn, setTrustedIn] = useState(false);
  /**
   * The reveal is applied only after mount, so the wall is plain visible in
   * the server HTML: hiding it there would leave it invisible to anyone whose
   * JS never arrives. It sits well below the fold, so the hide-then-fade on
   * hydration is not something a reader can see.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Under reduced motion the poster is the whole story — never fetch the video.
  const videoSrc = useDeferredSrc(!reduceMotion);

  useEffect(() => {
    const element = windowRef.current;
    const track = trackRef.current;
    if (!element || !track) return;

    // Someone who has asked for less motion — and everyone below `lg`, where
    // there is no pin to scale into — gets the window at its own size.
    if (
      !isDesktop ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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
  }, [isDesktop]);

  // The logo wall fades up as the pin rail brings it into the blue.
  //
  // One-shot: it stays put once it has arrived, so scrolling back up does not
  // replay it. `threshold` is low because on desktop only the top band of the
  // wall clears the pinned mockup before it should be on.
  useEffect(() => {
    const element = trustedRef.current;
    if (!element) return;
    if (reduceMotion) {
      setTrustedIn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrustedIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

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
      {/*
        The poster is the hero's LCP candidate, and it is only discoverable
        inside the <video> tag's `poster` attribute — which the preload scanner
        does not follow. This hoists it to <head> (React 19) so the fetch starts
        with the document rather than after the video element is parsed, and
        marks it high priority so it outranks the below-the-fold images the
        scanner finds first. Same URL as `poster` below, or the browser fetches
        the image twice.
      */}
      <link
        rel="preload"
        as="image"
        href={POSTER.desktop}
        imageSrcSet={POSTER_SRCSET}
        imageSizes={POSTER_SIZES}
        fetchPriority="high"
      />
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
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-950 sm:px-8 sm:py-3.5 sm:text-base"
              analyticsLabel={content.primaryCta.label}
              analyticsLocation="Hero"
            >
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:px-8 sm:py-3.5 sm:text-base"
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
        <div ref={trackRef} className="mt-12 px-4 pb-10 lg:mt-20 lg:pb-24">
          {/* Pin rail. The mockup holds the top of this box while the rest of
              it scrolls past, then releases on its own.

              The extra length is an in-flow spacer, NOT padding on this rail.
              A sticky box is constrained to its parent's *content* box, so
              padding here adds height the pin cannot use and the mockup just
              scrolls away — which is exactly what it did on the first pass. */}
          <div>
            <div className="flex flex-col items-center lg:sticky lg:top-20">
              <div
                ref={windowRef}
                // Anchored at the top, so shrinking draws the bottom edge up
                // into view rather than pulling both edges to the middle.
                // No bezel: the recording is already a browser window, so a
                // frame drawn around it would read as a second one. The clip
                // trims the corner radius baked into the recording; the ring
                // and shadow are what lift it off the field.
                className="relative w-full max-w-[1080px] origin-top scale-100 overflow-hidden rounded-2xl lg:scale-[1.25] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-8px_rgba(16,24,40,0.10),0_40px_80px_-32px_rgba(16,24,40,0.22)] ring-1 ring-black/[0.04] will-change-transform lg:w-3/4"
                // The landing scale is a class, not an inline style, so the
                // first paint is already right on both sizes — 1 below `lg`,
                // oversized above it — before the effect below takes the
                // transform over.
                style={{ aspectRatio: `${SCREEN.w} / ${SCREEN.h}` }}
              >
                {/*
                  The still, and the hero's LCP element. Sized per screen by
                  the browser off POSTER_SIZES, and preloaded above with the
                  same srcset so the fetch starts with the document.

                  A plain <img> on purpose: both files are already WebP at the
                  exact widths served, so next/image would only add an
                  optimizer hop in front of the one fetch on the critical path.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={POSTER.desktop}
                  srcSet={POSTER_SRCSET}
                  sizes={POSTER_SIZES}
                  alt=""
                  aria-hidden="true"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 block h-full w-full object-cover"
                />

                {/*
                  Mounted only once its src is ready, so there is never an
                  empty video box over the still. It paints frame 0 first,
                  which is the still, so the swap is invisible.
                */}
                {videoSrc && (
                  <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // The bytes are held back until the page has loaded (see
                    // useDeferredSrc), so there is nothing to preload before
                    // then and nothing to guess about after: `none` keeps the
                    // fetch off the critical path and out of the still's way.
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="absolute inset-0 block h-full w-full object-cover"
                  />
                )}
              </div>

              {/*
                The logo wall, pinned with the mockup rather than after it.

                It has to be inside the sticky box: anything following the
                mockup in the rail scrolls *under* it while the pin holds, so
                a wall placed there is covered by the mockup for exactly as
                long as the pin lasts. Riding along means it holds in the band
                below the mockup instead, which is the blue this was meant to
                fill.
              */}
              <div
                ref={trustedRef}
                // Gap kept tight: the sticky group is the mockup plus this,
                // and it has to clear the 80px header and still fit a laptop
                // viewport while the pin holds.
                className="mt-8 w-full lg:mt-10"
                style={
                  mounted
                    ? {
                        opacity: trustedIn ? 1 : 0,
                        transform: trustedIn ? "none" : "translateY(24px)",
                        transition:
                          "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
                      }
                    : undefined
                }
              >
                <TrustedByDualRow onDark heading={trustedHeading} />
              </div>
            </div>
            {/*
              The rail is what the mockup holds still against: it stays put
              while this much of the page passes it, which is a sticky pin
              rather than wheel interception — the reader's scroll always does
              exactly what they asked. It used to be half a screen of bare
              spacer, i.e. dead blue under the mockup; the logo wall above now
              rides the pin with it and fills that band, so the rail only has
              to be long enough to hold the pair still for a beat.

              A class rather than the old JS constant, so the rail is the right
              length in the server HTML — before the hero's media query has
              been read.
            */}
            <div aria-hidden="true" className="hidden lg:block lg:h-[28vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
