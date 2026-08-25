import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * The panel is laid over the photograph rather than beside it, so it is
 * deliberately not fully opaque — the image reads faintly through it.
 * Kept high because white body copy on solid #3779DD is already only
 * 4.25:1, and every point of transparency lightens the panel further.
 *
 * Written as a Tailwind arbitrary value rather than an inline style: the
 * wrapper has to drop this fill at `lg`, and an inline style would
 * outrank the `lg:` variant.
 */
const PANEL_FILL = "bg-[rgba(55,121,221,0.94)]";

interface HeroCta {
  href: string;
  label: string;
  analyticsLabel?: string;
  analyticsProperties?: Record<string, any>;
}

interface IndustryHeroProps {
  title: string;
  description: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
  analyticsLocation?: string;
  image: {
    src: string;
    alt: string;
    /** Focal point for the crop, e.g. "center 30%". Defaults to centre. */
    objectPosition?: string;
  };
}

/**
 * Hero for the industry pages.
 *
 * Two genuinely different layouts share one DOM tree so the photograph is
 * only ever fetched once:
 *
 * - Below `lg`, the blue panel is the outer container. Text stacks on top,
 *   and the photo sits inside it with an arched top, running off the
 *   bottom edge.
 * - At `lg` and up, the panel detaches and is absolutely positioned over
 *   the lower-left of the photo, which is inset from the left instead.
 *
 * The panel is square at the bottom on purpose: it is flush with the end of
 * the section, so whatever follows butts straight up against it.
 */
export default function IndustryHero({
  title,
  description,
  primaryCta,
  secondaryCta,
  analyticsLocation,
  image,
}: IndustryHeroProps) {
  return (
    <section className="relative pt-6 lg:pt-10 overflow-hidden">
      {/* Tinted wash, deepest top-right behind the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 110% at 78% 0%, #E1EBFC 0%, #F1F6FE 48%, #FFFFFF 100%)",
        }}
      />
      {/* Dots across the whole hero. Only the margins around the photo are
        ever visible, so they are left unmasked and pitched to read there. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,23,42,0.15) 1.2px, transparent 1.2px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/*
        Full-bleed below `lg` so the blue panel reaches both screen edges as
        it does in the design; only picks up container gutters at `lg`.
      */}
      <div className="relative z-10 w-full lg:container lg:mx-auto lg:px-8">
        {/*
          Mobile: this wrapper *is* the blue panel.
          Desktop: it goes transparent and only positions its children. The
          bottom padding is what lets the absolutely-positioned panel hang
          below the photo the way it does in the design.
        */}
        <div
          className={cn(
            "relative rounded-t-2xl",
            PANEL_FILL,
            "lg:rounded-none lg:bg-transparent lg:pb-12",
          )}
        >
          {/* Text panel */}
          <div
            className={cn(
              "px-6 pt-10 pb-8 text-white",
              PANEL_FILL,
              "lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[53%]",
              "lg:px-12 lg:pt-12 lg:pb-20",
              "lg:rounded-tl-2xl lg:rounded-tr-[9rem]",
            )}
          >
            <h1 className="text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
              {title}
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-[1.0625rem] leading-relaxed max-w-md">
              {description}
            </p>

            <div className="mt-8 flex flex-row flex-wrap gap-3">
              <Button
                href={primaryCta.href}
                className="inline-flex items-center justify-center bg-white text-blue-700 px-7 py-3 rounded-full text-base font-semibold hover:bg-blue-50 transition"
                analyticsLabel={primaryCta.analyticsLabel ?? primaryCta.label}
                analyticsLocation={analyticsLocation}
                analyticsProperties={primaryCta.analyticsProperties}
              >
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center bg-transparent border border-white text-white px-7 py-3 rounded-full text-base font-semibold hover:bg-white/10 transition"
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
          </div>

          {/*
            Photo. Arched top on mobile via an elliptical radius; on desktop
            it squares off to the design's single oversized top-left corner
            and is inset from the left so the panel can sit over it.
          */}
          <div
            className={cn(
              "relative mx-9 h-[420px] sm:h-[480px] overflow-hidden",
              "rounded-tl-[50%_45%] rounded-tr-[50%_45%]",
              "lg:mx-0 lg:ml-[13%] lg:h-auto lg:aspect-[194/100]",
              "lg:rounded-tl-[3.5rem] lg:rounded-tr-2xl lg:rounded-b-2xl",
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              fetchPriority="high"
              /*
                The wrapper is `lg:container`, so the slot stops growing at
                the 1536px container: 87% of (1536 - 64) = 1281px. Past that
                a plain `87vw` would over-request by ~75% on a wide monitor.
                Below `lg` the box is inset by mx-9 on both sides.
              */
              sizes="(min-width: 1536px) 1281px, (min-width: 1024px) 87vw, calc(100vw - 72px)"
              className="object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
