"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroStoolPoster from "@/components/sections/animations/roster-mockup/HeroStoolPoster";

const HERO_BLUE = "#3779DD";

// The animated scene is a few hundred nodes; keeping it out of the server
// render keeps the document small so the headline still paints first. The
// poster below is the same artwork, so there is nothing to see swapping in.
const HeroStoolMockup = dynamic(
  () =>
    import("@/components/sections/animations/roster-mockup/HeroStoolMockup"),
  { ssr: false },
);

/**
 * The hero lays the mockup out twice — absolutely positioned on desktop,
 * in flow on mobile — but only one of them is ever visible. Mount the
 * animation into whichever one that is, so we aren't running two timelines.
 */
const useIsDesktopHero = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isDesktop;
};

export interface HeroNewContent {
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Locale for the copy rendered *inside* the laptop mockup. */
  locale?: "au" | "us";
}

export const HERO_CONTENT_AU: HeroNewContent = {
  headline: "AI rostering software built for complex teams.",
  description:
    "Generate and optimise staff rosters in minutes, not days. Built for healthcare, 24/7 operations, and teams with rules too complex for spreadsheets.",
  primaryCta: { label: "Book a demo", href: "/book-a-demo" },
  secondaryCta: {
    label: "See an example",
    href: "/staff-rostering-interactive-demo",
  },
  locale: "au",
};

export default function HeroNew({
  content = HERO_CONTENT_AU,
}: {
  content?: HeroNewContent;
} = {}) {
  const isDesktop = useIsDesktopHero();
  const locale = content.locale ?? "au";

  return (
    // On mobile the hero fits within one viewport (100dvh minus a small
    // gutter). Text stack is compact, mockup fills the remaining space
    // below the CTAs. On desktop we go full-bleed with the mockup
    // absolutely positioned on the right.
    // The desktop hero is full-bleed, so its only separation from the white
    // header is this top padding — without it the blue butts straight up
    // against the nav.
    <div className="px-4 pt-4 lg:px-0 lg:pt-5">
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
          <HeroStoolPoster />
          {isDesktop === true && (
            <div className="absolute inset-0">
              <HeroStoolMockup locale={locale} />
            </div>
          )}
        </div>

        {/* Text content — H1, description and the CTAs, on every size. */}
        <Container className="relative z-10 lg:h-full shrink-0 lg:shrink">
          <div className="flex flex-col lg:justify-center h-full pt-8 pb-0 sm:pt-10 sm:pb-0 md:py-20 lg:py-24">
            <div className="max-w-xl text-white">
              <h1 className="text-[2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:leading-[1.05] tracking-tight">
                {content.headline}
              </h1>

              <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-md">
                {content.description}
              </p>

              {/* Mobile CTA row — above the mockup, so the buttons are the
                  first thing under the pitch rather than floating over the
                  screenshot. */}
              <div className="lg:hidden mt-5 sm:mt-6 flex flex-row gap-2">
                <Button
                  href={content.primaryCta.href}
                  className="flex-1 inline-flex items-center justify-center whitespace-nowrap bg-blue-900 text-white px-3 py-3 rounded-full text-[13px] sm:text-sm font-semibold hover:bg-blue-950 transition shadow-lg"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Landing New Hero"
                >
                  {content.primaryCta.label}
                </Button>
                <Button
                  href={content.secondaryCta.href}
                  className="flex-1 inline-flex items-center justify-center whitespace-nowrap bg-white text-blue-700 px-3 py-3 rounded-full text-[13px] sm:text-sm font-semibold hover:bg-blue-50 transition shadow-lg"
                  analyticsLabel="See an example"
                  analyticsLocation="Landing New Hero"
                >
                  {content.secondaryCta.label}
                </Button>
              </div>

              {/* Desktop CTA row — inline with the text stack. */}
              <div className="hidden lg:flex mt-8 flex-row gap-3">
                <Button
                  href={content.primaryCta.href}
                  className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-950 transition"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Landing New Hero"
                >
                  {content.primaryCta.label}
                </Button>
                <Button
                  href={content.secondaryCta.href}
                  className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-50 transition"
                  analyticsLabel="See an example"
                  analyticsLocation="Landing New Hero"
                >
                  {content.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile mockup — fills whatever space is left below the text. */}
        <div className="lg:hidden relative w-full flex-1 min-h-[200px] overflow-hidden -mt-2">
          <div
            className="absolute"
            style={{
              top: "-4%",
              left: "-25%",
              width: "150%",
              height: "160%",
            }}
          >
            <HeroStoolPoster />
            {isDesktop === false && <HeroStoolMockup locale={locale} />}
          </div>
        </div>
      </section>
    </div>
  );
}
