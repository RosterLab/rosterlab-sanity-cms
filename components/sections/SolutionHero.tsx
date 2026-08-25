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
    /**
     * Scale applied to the mockup *inside* its fixed-height media box.
     * This is a transform, so it never feeds back into layout — the blue
     * section is the same height on every solution page regardless of
     * what this is set to. Use it only to compensate for how much
     * transparent margin a given asset carries; 1 means "this asset is
     * cropped tight to its content".
     */
    scale?: number;
    /** Optional position nudge, e.g. `lg:translate-x-6`. */
    className?: string;
  };
}

/**
 * Fixed height of the media box per breakpoint. The mockup is contained
 * inside this box, so swapping an asset for one with a different aspect
 * ratio or a different amount of transparent padding cannot change the
 * height of the blue section. `MEDIA_BOX` and `SECTION_MIN_H` are the
 * only two things that set the hero's size.
 */
const MEDIA_BOX = "h-[220px] sm:h-[300px] lg:h-[420px] xl:h-[480px]";

/**
 * Floor for the blue section so pages whose headline wraps to fewer
 * lines still match the others. Sized to the tallest text column
 * (4 bullets + 2 CTAs + a 3-line headline) plus the vertical padding.
 */
const SECTION_MIN_H = "lg:min-h-[672px]";

/**
 * Slot width hint for the responsive srcset. The unscaled media box is
 * ~55vw beside the text and ~92vw once stacked (860px once the container
 * stops growing at 1536px), but `scale` paints the asset wider than its
 * box — so the hint has to be scaled with it. Undershooting here makes
 * the browser pick a candidate that renders soft.
 */
function heroSizes(scale: number) {
  const fixed = Math.round(860 * scale);
  const lg = Math.round(55 * scale);
  const base = Math.min(100, Math.round(92 * scale));
  return `(min-width: 1536px) ${fixed}px, (min-width: 1024px) ${lg}vw, ${base}vw`;
}

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
        className={cn(
          "relative overflow-hidden rounded-3xl lg:rounded-[48px]",
          SECTION_MIN_H,
        )}
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

            {/* Fixed-height media box. The mockup is contained within it and
              any `scale` is a transform, so the asset can grow past the
              container's right gutter (clipped by the section's rounded
              edge) without ever changing the hero's height. */}
            <div className={cn("relative w-full", MEDIA_BOX)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes={heroSizes(image.scale ?? 1)}
                style={
                  image.scale && image.scale !== 1
                    ? { transform: `scale(${image.scale})` }
                    : undefined
                }
                className={cn("object-contain object-center", image.className)}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
