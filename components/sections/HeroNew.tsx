"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const HERO_BLUE = "#3779DD";

const IFRAME_CSS = `
  html, body {
    overflow: hidden !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    background: ${HERO_BLUE} !important;
    min-height: 0 !important;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  /* Hide the demo's playback bar. */
  [style*="rgba(20, 20, 20, 0.92)"] {
    display: none !important;
  }
  #dc-root,
  #dc-root > div,
  #dc-root > div > div,
  #dc-root > div > div > div {
    background-color: ${HERO_BLUE} !important;
  }
  [style*="rgb(10, 10, 10)"],
  [style*="#0a0a0a"] {
    background-color: ${HERO_BLUE} !important;
  }
`;

// Hook: inject CSS overrides + repaint scene backdrops into a mockup
// iframe. Handles both desktop and mobile instances the same way.
const useIframeOverrides = (
  ref: React.RefObject<HTMLIFrameElement | null>,
) => {
  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    const injectStyles = () => {
      const doc = iframe.contentDocument;
      if (!doc?.head) return false;
      if (!doc.getElementById("__rl_iframe_style_overrides__")) {
        const style = doc.createElement("style");
        style.id = "__rl_iframe_style_overrides__";
        style.textContent = IFRAME_CSS;
        doc.head.appendChild(style);
      }
      const win = doc.defaultView;
      if (!win) return true;
      const vw = win.innerWidth;
      const vh = win.innerHeight;
      doc.querySelectorAll<HTMLElement>("div").forEach((el) => {
        const r = el.getBoundingClientRect();
        // Repaint any big scene backdrop to blue so the letterbox disappears.
        if (r.width >= vw * 0.7 || r.height >= vh * 0.7) {
          const style = win.getComputedStyle(el);
          const bg = style.backgroundColor;
          const isSceneBg =
            bg === "rgb(255, 255, 255)" ||
            bg === "rgb(250, 249, 245)" ||
            bg === "rgb(230, 231, 232)" ||
            bg === "rgb(10, 10, 10)";
          if (isSceneBg) {
            el.style.setProperty("background-color", HERO_BLUE, "important");
          }
          if (style.boxShadow && style.boxShadow !== "none") {
            el.style.setProperty("box-shadow", "none", "important");
          }
        }
      });
      return true;
    };

    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      injectStyles();
      if (attempts > 40) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [ref]);
};

export default function HeroNew() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mobileIframeRef = useRef<HTMLIFrameElement>(null);
  useIframeOverrides(iframeRef);
  useIframeOverrides(mobileIframeRef);

  return (
    // On mobile the hero fits within one viewport (100dvh minus a small
    // gutter). Text stack is compact, mockup fills the remaining space
    // below the CTAs. On desktop we go full-bleed with the mockup
    // absolutely positioned on the right.
    <div className="px-4 pt-4 lg:px-0 lg:pt-0">
      <section
        style={{ backgroundColor: HERO_BLUE }}
        className="relative lg:w-screen lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] overflow-hidden rounded-3xl lg:rounded-[48px] flex flex-col h-[calc(100dvh-320px)] min-h-[500px] lg:min-h-[640px] lg:h-screen lg:max-h-[900px]"
      >
        {/* Dot pattern overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 55% 65% at 70% 45%, black 0%, black 30%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 65% at 70% 45%, black 0%, black 30%, transparent 85%)",
          }}
        />

        {/* Desktop mockup — absolute, right side, taller than section
            so excess is clipped. */}
        <div
          aria-hidden="true"
          className="absolute right-0 hidden lg:block pointer-events-none"
          style={{
            top: "-14%",
            width: "70%",
            height: "180%",
          }}
        >
          <iframe
            ref={iframeRef}
            src="/landing/stool-mockup.html"
            title="RosterLab Interactive Demo"
            loading="lazy"
            scrolling="no"
            style={{ background: HERO_BLUE }}
            className="absolute inset-0 w-full h-full border-0 pointer-events-auto"
          />
        </div>

        {/* Text content. On mobile: only H1 + description; the CTAs are
            pinned to the bottom of the blue box below. On desktop the
            CTAs sit inline in the text stack. */}
        <Container className="relative z-10 lg:h-full shrink-0 lg:shrink">
          <div className="flex flex-col lg:justify-center h-full pt-8 pb-0 sm:pt-10 sm:pb-0 md:py-20 lg:py-24">
            <div className="max-w-xl text-white">
              <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:leading-[1.05] tracking-tight">
                Rostering solved. In minutes, not days.
              </h1>

              <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-md">
                AI-built rosters for healthcare and 24/7 teams. Every rule,
                preference, and skill mix respected.
              </p>

              {/* Desktop CTA row — inline with the text stack. */}
              <div className="hidden lg:flex mt-8 flex-row gap-3">
                <Button
                  href="/book-a-demo"
                  className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-950 transition"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Landing New Hero"
                >
                  Book a demo
                </Button>
                <Button
                  href="/staff-rostering-interactive-demo"
                  className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-50 transition"
                  analyticsLabel="See an example"
                  analyticsLocation="Landing New Hero"
                >
                  See an example
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile mockup — fills the whole remaining space below the
            text. CTAs float ON TOP of the mockup at the bottom, so
            the mockup itself is never cropped. */}
        <div className="lg:hidden relative w-full flex-1 min-h-[200px] overflow-hidden -mt-2">
          <iframe
            ref={mobileIframeRef}
            src="/landing/stool-mockup.html"
            title="RosterLab Interactive Demo"
            loading="lazy"
            scrolling="no"
            style={{
              background: HERO_BLUE,
              top: "-4%",
              left: "-25%",
              width: "150%",
              height: "160%",
            }}
            className="absolute border-0"
          />

          {/* Mobile CTA row — absolutely positioned over the mockup's
              bottom edge, so the mockup keeps its full framing. */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-5 flex flex-row gap-2">
            <Button
              href="/book-a-demo"
              className="flex-1 inline-flex items-center justify-center bg-blue-900 text-white py-3 rounded-full text-sm font-semibold hover:bg-blue-950 transition shadow-lg"
              analyticsLabel="Book a Demo"
              analyticsLocation="Landing New Hero"
            >
              Book a demo
            </Button>
            <Button
              href="/staff-rostering-interactive-demo"
              className="flex-1 inline-flex items-center justify-center bg-white text-blue-700 py-3 rounded-full text-sm font-semibold hover:bg-blue-50 transition shadow-lg"
              analyticsLabel="See an example"
              analyticsLocation="Landing New Hero"
            >
              See an example
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
