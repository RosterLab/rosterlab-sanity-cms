"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Embeds the standalone "generate screen" HTML mockup as the Save Time
 * animation. Waits until the whole embed is on screen before starting,
 * then auto-loops every LOOP_MS.
 */
const IFRAME_CSS = `
  html, body {
    overflow: hidden !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    background: transparent !important;
    min-height: 0 !important;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  /* Repaint the bundler's outer wrapper chain to transparent so the
     surrounding page (dot pattern etc.) shows through instead of a
     white or dark letterbox. */
  #dc-root,
  #dc-root > div,
  #dc-root > div > div,
  #dc-root > div > div > div {
    background-color: transparent !important;
  }
  [style*="rgb(10, 10, 10)"],
  [style*="#0a0a0a"] {
    background-color: transparent !important;
  }
`;

// Strip the mockup's playback chrome AND the scene backdrop's drop shadow
// (which reads as a "white box around it" from outside). Runs on every DOM
// change so nothing sneaks back in after re-renders.
const stripPlaybackChrome = (doc: Document) => {
  doc.querySelectorAll<HTMLElement>("div").forEach((el) => {
    const s = doc.defaultView?.getComputedStyle(el);
    if (!s) return;
    const bg = s.backgroundColor;
    // Dark playback bar.
    if (bg === "rgba(20, 20, 20, 0.92)" || bg === "rgb(20, 20, 20)") {
      el.style.setProperty("display", "none", "important");
      return;
    }
    // Semi-transparent progress track that lives inside it.
    if (bg === "rgba(255, 255, 255, 0.12)") {
      el.style.setProperty("display", "none", "important");
      return;
    }
    // Kill any big drop-shadow anywhere — that's the "boxed" halo around
    // the scene backdrop that we can't otherwise get rid of.
    if (s.boxShadow && s.boxShadow !== "none") {
      el.style.setProperty("box-shadow", "none", "important");
    }
  });
};

const LOOP_MS = 20000;
const SRC = "/landing/generate-screen.html";

export default function GenerateScreenEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cleanersRef = useRef<Array<() => void>>([]);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  // Bump to force an iframe reload for replay + auto-loop.
  const [playToken, setPlayToken] = useState(0);

  // Wait until the whole embed is fully on screen before starting.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setHasEnteredView(true);
      return;
    }
    // On mobile it's often impossible to reach 99% visibility (element
    // taller than the viewport). Use a more forgiving threshold: fire as
    // soon as the majority of the embed is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: [0.5, 0.75, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Force the iframe to reload the src every time playToken changes. A
  // `#hash` change won't reload the doc, so we swap through `about:blank`
  // first — that guarantees the bundled script re-runs from scratch.
  useEffect(() => {
    if (!hasEnteredView) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.src = "about:blank";
    // Reload the real src on the next frame so the browser registers
    // both transitions.
    const raf = window.requestAnimationFrame(() => {
      if (iframeRef.current === iframe) {
        iframe.src = `${SRC}?t=${playToken}`;
      }
    });

    // Attach a load listener that injects styles and starts observing the
    // iframe's DOM for new elements to strip (bar, progress track).
    const onLoad = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      // Inject scoped CSS once per load.
      if (!doc.getElementById("__rl_generate_screen_overrides__")) {
        const style = doc.createElement("style");
        style.id = "__rl_generate_screen_overrides__";
        style.textContent = IFRAME_CSS;
        doc.head?.appendChild(style);
      }

      // Initial strip pass.
      stripPlaybackChrome(doc);

      // Watch for any new nodes the mockup adds later — repeatedly strip.
      const mo = new MutationObserver(() => stripPlaybackChrome(doc));
      mo.observe(doc.body, { childList: true, subtree: true });

      // Belt-and-braces: keep stripping periodically for the first 4s in
      // case the bundler renders the bar in stages that our observer
      // misses.
      const iv = window.setInterval(() => stripPlaybackChrome(doc), 300);
      const clearIv = window.setTimeout(
        () => window.clearInterval(iv),
        4000,
      );

      cleanersRef.current.push(() => {
        mo.disconnect();
        window.clearInterval(iv);
        window.clearTimeout(clearIv);
      });
    };
    iframe.addEventListener("load", onLoad);

    return () => {
      window.cancelAnimationFrame(raf);
      iframe.removeEventListener("load", onLoad);
      cleanersRef.current.forEach((fn) => fn());
      cleanersRef.current = [];
    };
  }, [hasEnteredView, playToken]);

  // Auto-loop.
  useEffect(() => {
    if (!hasEnteredView) return;
    const id = window.setInterval(() => {
      setPlayToken((n) => n + 1);
    }, LOOP_MS);
    return () => window.clearInterval(id);
  }, [hasEnteredView, playToken]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
        {hasEnteredView ? (
          <iframe
            ref={iframeRef}
            title="Generate roster in minutes"
            loading="lazy"
            scrolling="no"
            className="absolute inset-0 w-full h-full border-0 bg-transparent"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full bg-transparent"
          />
        )}
      </div>
    </div>
  );
}
