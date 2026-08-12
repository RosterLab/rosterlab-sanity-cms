"use client";

import { useEffect } from "react";

/**
 * Direction-aware header hide:
 *   • Scroll down past the threshold → header slides up out of view.
 *   • Any scroll up (even a tiny one) → header slides back in.
 *   • At the very top of the page, header is always visible.
 * Cleans up on unmount so other routes keep the default sticky header.
 */
export default function HeaderHideOnScroll({
  threshold = 60,
}: {
  threshold?: number;
} = {}) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header[role="banner"]');
    if (!header) return;

    const prevTransition = header.style.transition;
    const prevTransform = header.style.transform;

    header.style.transition = "transform 300ms ease-out";

    let lastY = window.scrollY;
    let hidden = false;

    const setHidden = (next: boolean) => {
      if (next === hidden) return;
      hidden = next;
      header.style.transform = next ? "translateY(-100%)" : "translateY(0)";
    };

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      // Ignore very small movements to avoid jitter.
      if (Math.abs(delta) > 2) {
        if (y <= threshold) {
          setHidden(false);
        } else if (delta > 0) {
          setHidden(true); // scrolling down
        } else {
          setHidden(false); // any scroll up
        }
        lastY = y;
      }
    };
    update();

    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      header.style.transition = prevTransition;
      header.style.transform = prevTransform;
    };
  }, [threshold]);

  return null;
}
