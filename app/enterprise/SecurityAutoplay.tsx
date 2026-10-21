"use client";

import { useEffect, useRef } from "react";

/**
 * Plays the security section through on a timer: every `dwell` ms the next
 * badge becomes the active one, written as `data-active` on the section so
 * its CSS (SECURITY_HOVER_CSS in the page) can highlight the badge and its
 * point exactly as a hover would.
 *
 * It starts once the section is on screen, holds while the pointer is over
 * the section (a hover takes over the highlight), and stays off entirely
 * under reduced motion. Renders nothing; it attaches to its parent section.
 */
export default function SecurityAutoplay({
  count,
  dwell,
}: {
  count: number;
  dwell: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>(".rl-security");
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = -1;
    let timer = 0;
    let hovered = false;
    let visible = false;

    // Cleared and re-set across a reflow, so the badge's progress bar
    // restarts even when the same badge is shown again.
    const show = (k: number) => {
      active = k;
      delete section.dataset.active;
      void section.offsetWidth;
      section.dataset.active = String(k);
    };
    const schedule = () => {
      window.clearTimeout(timer);
      if (!visible || hovered) return;
      timer = window.setTimeout(() => {
        show((active + 1) % count);
        schedule();
      }, dwell);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && active === -1) show(0);
        schedule();
      },
      { threshold: 0.4 },
    );
    observer.observe(section);

    const onEnter = () => {
      hovered = true;
      window.clearTimeout(timer);
    };
    // Picks up where it left off, with a fresh full dwell on that badge.
    const onLeave = () => {
      hovered = false;
      if (active >= 0) show(active);
      schedule();
    };
    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      delete section.dataset.active;
    };
  }, [count, dwell]);

  return <span ref={ref} hidden />;
}
