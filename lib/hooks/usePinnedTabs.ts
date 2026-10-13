"use client";

import { useEffect, useRef, useState } from "react";

// The breakpoint the pinned layout runs at; below it, tabs are plain tabs.
const DESKTOP_QUERY = "(min-width: 1024px)";

// How long a tab click takes to scroll the page to its stretch of the track.
const JUMP_MS = 800;

// How long the reader has to leave the scroll alone before auto-advance
// starts on the tab they're resting on.
const IDLE_MS = 1000;

// How far a plain scroll event has to move the track before it counts as the
// reader scrolling, rather than layout above settling.
const SCROLL_INPUT_PX = 24;

// Longest frame delta the auto-advance timer will credit, so a main-thread
// stall pauses the bar instead of jumping it forward.
const MAX_FRAME_MS = 50;

export interface PinnedTabsOptions {
  /**
   * Opts in to auto-advance. While the section is pinned and the reader has
   * stopped scrolling, the active tab's bar fills over the time this returns
   * (ms), then the page glides on to the next tab. Any scroll, touch or key
   * hands control straight back; it stops at the last tab.
   */
  autoAdvanceMs?: (index: number) => number;
}

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
  { autoAdvanceMs }: PinnedTabsOptions = {},
) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Last scroll progress, so the auto-advance timer can repaint the bars
  // without waiting for a scroll event.
  const progressRef = useRef(0);
  // The auto-advance run on the tab the reader is resting on: how far through
  // it is, as a 0–1 fraction of its dwell.
  const autoRef = useRef<{
    index: number;
    elapsed: number;
    dwell: number;
  } | null>(null);
  // Set by `pauseProps` while the pointer is over the copy being read.
  const pausedRef = useRef(false);
  const autoAdvanceRef = useRef(autoAdvanceMs);
  autoAdvanceRef.current = autoAdvanceMs;
  // A tab-click scroll in progress. While it runs, the clicked tab stays
  // active — the scroll would otherwise pass through, and flash up, every
  // tab in between.
  const jumpRef = useRef<{ frame: number; stop: () => void } | null>(null);
  // Read each frame, so a new callback every render needs no effect restart.
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  // Each tab's segment shows how far the scroll is through its stretch. On the
  // tab being auto-advanced, the rest of the segment fills over the dwell, so
  // it reaches the end just as the glide to the next tab begins.
  const paintBars = () => {
    const progress = progressRef.current;
    const auto = autoRef.current;
    barRefs.current.forEach((bar, i) => {
      if (!bar) return;
      let fill = Math.min(1, Math.max(0, progress * count - i));
      if (auto && auto.index === i)
        fill += (1 - fill) * Math.min(1, auto.elapsed / auto.dwell);
      bar.style.transform = `scaleX(${fill})`;
    });
  };

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
      progressRef.current = progress;
      paintBars();
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
    // paintBars only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Auto-advance. A frame loop watches for the reader resting inside the
  // pinned stretch, runs the active tab's dwell, then glides to the next tab
  // with the same scroll a tab click uses. Input from the reader cancels the
  // run and restarts the idle wait; the glide's own scrolling doesn't count.
  const enabled = Boolean(autoAdvanceMs);
  useEffect(() => {
    if (!enabled) return;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastInput = performance.now();
    let last = lastInput;
    let frame = 0;

    // Wheel, touch and keys always count as the reader's. A bare scroll event
    // (a scrollbar drag) only counts once it has moved the track
    // SCROLL_INPUT_PX: content above settling as it animates in nudges the
    // page a few pixels too, and that shouldn't reset the run.
    const trackTop = () => trackRef.current?.getBoundingClientRect().top ?? 0;
    let restTop = trackTop();
    const cancel = () => {
      lastInput = performance.now();
      restTop = trackTop();
      if (!autoRef.current) return;
      autoRef.current = null;
      paintBars();
    };
    const onScroll = () => {
      if (jumpRef.current) return;
      const top = trackTop();
      if (Math.abs(top - restTop) < SCROLL_INPUT_PX) return;
      restTop = top;
      cancel();
    };

    const isPinned = () => {
      const track = trackRef.current;
      if (!track) return false;
      const { top, bottom } = track.getBoundingClientRect();
      return top <= 1 && bottom >= window.innerHeight - 1;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, MAX_FRAME_MS);
      last = now;
      frame = requestAnimationFrame(tick);

      if (jumpRef.current) return;
      if (
        !desktop.matches ||
        reduce.matches ||
        document.hidden ||
        !isPinned()
      ) {
        if (autoRef.current) cancel();
        return;
      }

      const index = activeRef.current;
      let auto = autoRef.current;
      // A finished run whose glide has landed: start the idle wait afresh.
      if (auto && auto.index !== index) {
        autoRef.current = auto = null;
        lastInput = now;
        restTop = trackTop();
      }
      if (!auto) {
        if (index >= count - 1 || now - lastInput < IDLE_MS) return;
        const dwell = autoAdvanceRef.current?.(index) ?? 0;
        if (!(dwell > 0)) return;
        autoRef.current = auto = { index, elapsed: 0, dwell };
      }

      if (!pausedRef.current) auto.elapsed += dt;
      paintBars();
      if (auto.elapsed >= auto.dwell) {
        auto.elapsed = auto.dwell;
        select(index + 1);
      }
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      cancelAnimationFrame(frame);
      autoRef.current = null;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
    // select and paintBars only read refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, count]);

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

  // Spread on whatever the reader reads, so auto-advance holds while the
  // pointer is over it.
  const pauseProps = {
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
  };

  return { active, trackRef, barRef, select, pauseProps };
}
