import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const HERO_BLUE = "#3779DD";

// Pre-rendered loop of the product mockup animation. This used to be an
// exported artifact bundle in an iframe, which shipped React, ReactDOM and
// @babel/standalone and compiled its JSX in the browser — ~2 MB and several
// seconds of main-thread work on the most important page we have.
// Regenerate with scripts/record-hero-mockup.js + scripts/encode-hero-mockup.sh.
const MockupVideo = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    poster="/landing/hero-mockup-poster.webp"
    aria-hidden="true"
    className={className}
    // `contain` reproduces how the old iframe framed this: the Stage scaled
    // the scene to fit its box and let the blue background fill the rest,
    // rather than cropping to fill.
    style={{ background: HERO_BLUE, objectFit: "contain", ...style }}
  >
    <source src="/landing/hero-mockup.webm" type="video/webm" />
    <source src="/landing/hero-mockup.mp4" type="video/mp4" />
  </video>
);

export default function HeroNew() {
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
          <MockupVideo className="absolute inset-0 w-full h-full border-0" />
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
          <MockupVideo
            className="absolute border-0"
            style={{
              top: "-4%",
              left: "-25%",
              width: "150%",
              height: "160%",
            }}
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
