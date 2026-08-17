import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Matches the brand blue used by the refreshed landing hero.
const HERO_BLUE = "#3779DD";

interface HeroCta {
  href: string;
  label: string;
  analyticsLabel?: string;
  analyticsProperties?: Record<string, any>;
}

interface SolutionHeroProps {
  title: string;
  description: string;
  bullets: string[];
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  /** Small supporting ticks rendered under the CTA row. */
  footnotes?: string[];
  analyticsLocation?: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    /**
     * Per-page width override for the mockup, e.g. `lg:w-[170%]`. Each
     * asset carries a different amount of transparent padding, so the
     * width needed to make the device read at a given size varies by
     * image. Must be a literal class string so Tailwind can see it.
     */
    className?: string;
    /**
     * Slot width hint for the responsive srcset. Without it Next emits
     * only a 1x/2x pair off `width`, so phones download the 3840px
     * candidate to paint a ~350px image. Pages that override
     * `className` render wider than the default and need a matching
     * override here — the value must never undershoot the painted
     * width, or the browser picks a candidate that renders soft.
     */
    sizes?: string;
  };
}

/**
 * Tracks the default `lg:w-[118%]` mockup: ~90vw stacked, ~60vw beside
 * the text, then fixed once the container stops growing at 1536px.
 */
const DEFAULT_HERO_SIZES =
  "(min-width: 1536px) 860px, (min-width: 1024px) 60vw, 90vw";

/**
 * Rounded blue hero shared by the solution pages. Text stack on the
 * left, product mockup on the right, stacking to a single column below
 * `lg`.
 */
export default function SolutionHero({
  title,
  description,
  bullets,
  primaryCta,
  secondaryCta,
  footnotes,
  analyticsLocation,
  image,
}: SolutionHeroProps) {
  return (
    // Inset from the viewport edges so the rounded corners read, matching
    // the refreshed landing hero's radius.
    <div className="px-4 pt-4 lg:px-6 lg:pt-6">
      <section
        style={{ backgroundColor: HERO_BLUE }}
        className="relative overflow-hidden rounded-3xl lg:rounded-[48px]"
      >
        {/* Dot pattern overlay, concentrated behind the mockup. */}
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

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] gap-10 lg:gap-8 items-center py-14 sm:py-16 lg:py-24">
            <div className="text-white">
              <h1 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight sm:leading-[1.1] tracking-tight">
                {title}
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-lg">
                {description}
              </p>

              <ul className="mt-7 space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 shrink-0 mt-0.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/90">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center bg-blue-900 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-950 transition"
                  analyticsLabel={primaryCta.analyticsLabel ?? primaryCta.label}
                  analyticsLocation={analyticsLocation}
                  analyticsProperties={primaryCta.analyticsProperties}
                >
                  {primaryCta.label}
                </Button>
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center bg-white text-blue-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-50 transition"
                    analyticsLabel={
                      secondaryCta.analyticsLabel ?? secondaryCta.label
                    }
                    analyticsLocation={analyticsLocation}
                    analyticsProperties={secondaryCta.analyticsProperties}
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </div>

              {footnotes && footnotes.length > 0 && (
                <ul className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 text-sm text-white/80">
                  {footnotes.map((footnote) => (
                    <li
                      key={footnote}
                      className="flex items-center font-medium"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-1.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {footnote}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* The mockup runs wider than its grid cell and bleeds past the
              container's right gutter, so it reads at full size. The
              section's overflow-hidden clips it at the rounded edge. */}
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1200}
                height={image.height ?? 800}
                priority
                fetchPriority="high"
                sizes={image.sizes ?? DEFAULT_HERO_SIZES}
                className={cn(
                  "w-full max-w-2xl sm:max-w-3xl lg:max-w-none lg:w-[118%] lg:shrink-0 lg:-mr-[6vw] h-auto",
                  image.className,
                )}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
