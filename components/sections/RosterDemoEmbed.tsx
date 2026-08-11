"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";

const IFRAME_CSS = `
  html, body {
    overflow: hidden !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    background: #ffffff !important;
    min-height: 0 !important;
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  [style*="rgba(20, 20, 20, 0.92)"] {
    display: none !important;
  }
`;

export default function RosterDemoEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const injectStyles = () => {
      const doc = iframe.contentDocument;
      if (!doc?.head) return false;
      // Avoid duplicate injection.
      if (doc.getElementById("__rl_iframe_style_overrides__")) return true;
      const style = doc.createElement("style");
      style.id = "__rl_iframe_style_overrides__";
      style.textContent = IFRAME_CSS;
      doc.head.appendChild(style);
      return true;
    };

    // The bundled demo rewrites its own document after the initial `load` event,
    // wiping any style tag we injected too early. Poll until injection succeeds
    // AND persists across re-renders.
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      injectStyles();
      // Keep polling for ~10 s so we catch late re-renders that clear the head.
      if (attempts > 40) clearInterval(interval);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="relative w-full aspect-[5/4] bg-white">
            <iframe
              ref={iframeRef}
              src="/landing/macbook-mock-up.html"
              title="RosterLab Interactive Demo"
              loading="lazy"
              scrolling="no"
              style={{ background: "#ffffff" }}
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
