"use client";

import { useEffect } from "react";

/** Elements the pager stops at, top to bottom. */
export const SECTION_CLASS = "rl-section";

/** Below this gap between wheel events, they belong to one gesture. */
const GESTURE_GAP_MS = 150;
/** Fallback for browsers without `scrollend`. */
const SCROLL_MS = 900;

/**
 * Section-by-section scrolling on desktop: one wheel gesture (or Page Down,
 * Space, an arrow key) moves to the next section.
 *
 * CSS scroll snapping was tried first and trapped the reader: with
 * `mandatory`, a section taller than the screen (the hero, with its logo wall
 * below the fold) snaps every small wheel step back to its own end. So this
 * pages in script instead, with one rule for tall sections — they scroll
 * natively through their own content, stopping at their bottom edge, and only
 * then hand over to the next section.
 *
 * A trackpad keeps firing wheel events for a second or more after the finger
 * lifts. Those are swallowed until the page has settled and the events pause,
 * so one swipe moves exactly one section.
 *
 * Phones and tablets keep ordinary scrolling.
 */
export default function SectionPager() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let animating = false;
    let swallowing = false;
    let lastWheel = 0;
    let fallback = 0;

    const sections = () => [
      ...document.querySelectorAll<HTMLElement>(`.${SECTION_CLASS}`),
    ];
    const top = (el: HTMLElement) =>
      Math.round(el.getBoundingClientRect().top + window.scrollY);

    /** Where a move in `dir` should land, or null to let it scroll natively. */
    const targetFor = (dir: 1 | -1, delta: number): number | null => {
      const list = sections();
      const y = Math.round(window.scrollY);
      const vh = window.innerHeight;
      let idx = -1;
      list.forEach((el, i) => {
        if (top(el) <= y + 2) idx = i;
      });
      if (idx === -1) return null;
      const cur = list[idx];
      const curTop = top(cur);
      const curBottom = curTop + cur.offsetHeight;

      if (dir > 0) {
        // Still content below in this section: scroll through it, but stop
        // at its bottom edge rather than running into the next one.
        if (y + vh < curBottom - 2) {
          return y + vh + delta > curBottom ? curBottom - vh : null;
        }
        const next = list[idx + 1];
        return next ? top(next) : null; // past the last: on to the footer
      }

      // Scrolling up from inside a tall section: native until its top.
      if (y > curTop + 2) {
        if (cur.offsetHeight > vh + 2 && y + delta > curTop) return null;
        return curTop;
      }
      const prev = list[idx - 1];
      if (!prev) return null;
      // Land on a tall previous section's end, so the reader backs into it.
      return prev.offsetHeight > vh + 2
        ? top(prev) + prev.offsetHeight - vh
        : top(prev);
    };

    const settle = () => {
      animating = false;
      window.clearTimeout(fallback);
    };

    const go = (to: number) => {
      animating = true;
      swallowing = true;
      window.scrollTo({
        top: to,
        behavior: reduce.matches ? "auto" : "smooth",
      });
      window.clearTimeout(fallback);
      fallback = window.setTimeout(settle, SCROLL_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (!desktop.matches || e.ctrlKey) return; // ctrl+wheel is zoom
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;

      if (swallowing) {
        // Momentum from the gesture that started this move.
        if (animating || gap < GESTURE_GAP_MS) {
          e.preventDefault();
          return;
        }
        swallowing = false;
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      const to = targetFor(dir, e.deltaY);
      if (to == null) return;
      e.preventDefault();
      if (Math.abs(to - window.scrollY) > 1) go(to);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!desktop.matches || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable]")) return;
      // Space activates a focused button or link; leave it to them.
      if (e.key === " " && t?.closest("button, a, summary")) return;
      const down =
        e.key === "PageDown" ||
        e.key === "ArrowDown" ||
        (e.key === " " && !e.shiftKey);
      const up =
        e.key === "PageUp" ||
        e.key === "ArrowUp" ||
        (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (animating) {
        e.preventDefault();
        return;
      }
      const dir = down ? 1 : -1;
      const to = targetFor(dir, dir * window.innerHeight * 0.9);
      if (to == null) return;
      e.preventDefault();
      go(to);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scrollend", settle);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scrollend", settle);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
