"use client";

import { useEffect, useRef, useState } from "react";

// The breakpoint the pinned layout runs at; below it, tabs are plain tabs.
const DESKTOP_QUERY = "(min-width: 1024px)";

// How long a tab click takes to scroll the page to its stretch of the track.
const JUMP_MS = 800;

/**
 * Scroll-driven tabs for a section that pins while the page scrolls through
 * a tall track (`trackRef`). On desktop the scroll position picks the active
 * tab and fills one progress segment per tab (`barRef(i)`); a tab click
 * glides the page to that tab's stretch of the track. Below `lg` there is no
 * pinning, so `select` just switches tabs.
 *
 * `onProgress` gets the raw 0–1 progress through the track every frame it
 * changes, for anything that should move continuously with the scroll.
 */
export function usePinnedTabs(
  count: number,
  onProgress?: (progress: number) => void,
) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // A tab-click scroll in progress. While it runs, the clicked tab stays
  // active — the scroll would otherwise pass through, and flash up, every
  // tab in between.
  const jumpRef = useRef<{ frame: number; stop: () => void } | null>(null);
  // Read each frame, so a new callback every render needs no effect restart.
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // Scroll → progress. The bars are written straight to the DOM each frame so
  // scrolling doesn't re-render the section; state only changes when the
  // active tab does.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track || !desktop.matches) return;
      const { top, height } = track.getBoundingClientRect();
      const range = height - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0;
      barRefs.current.forEach((bar, i) => {
        if (bar)
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress * count - i))})`;
      });
      onProgressRef.current?.(progress);
      if (!jumpRef.current)
        setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      jumpRef.current?.stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  // Scrolls the page to `top` with an ease in-out, so the progress bar fills
  // smoothly on the way. Any input from the reader hands the scroll straight
  // back to them.
  const jumpScroll = (top: number) => {
    jumpRef.current?.stop();
    const from = window.scrollY;
    const start = performance.now();
    const stop = () => {
      if (!jumpRef.current) return;
      cancelAnimationFrame(jumpRef.current.frame);
      jumpRef.current = null;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / JUMP_MS);
      // Ease in-out cubic.
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      window.scrollTo({
        top: from + (top - from) * eased,
        behavior: "instant",
      });
      if (t < 1 && jumpRef.current)
        jumpRef.current.frame = requestAnimationFrame(step);
      else stop();
    };
    jumpRef.current = { frame: requestAnimationFrame(step), stop };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
  };

  const select = (i: number) => {
    const track = trackRef.current;
    if (!track || !window.matchMedia(DESKTOP_QUERY).matches) {
      setActive(i);
      return;
    }
    // On desktop the scroll position owns the active tab, so a click scrolls
    // to the middle of that tab's stretch of the track, where anything moving
    // with `onProgress` sits at rest. The tab goes active straight away rather
    // than once the scroll arrives.
    const range = track.offsetHeight - window.innerHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const top = trackTop + (range * (i + 0.5)) / count;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top, behavior: "instant" });
      return;
    }
    setActive(i);
    jumpScroll(top);
  };

  const barRef = (i: number) => (el: HTMLSpanElement | null) => {
    barRefs.current[i] = el;
  };

  return { active, trackRef, barRef, select };
}
