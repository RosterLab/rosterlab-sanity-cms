import Image from "next/image";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * The mobile and desktop panels are the same brand blue, but only the
 * desktop one is translucent: there the panel is laid over the photograph
 * rather than beside it, so the image is meant to read faintly through.
 * 0.94 is as low as it goes — white body copy on solid #3779DD is already
 * only 4.25:1, and every point of transparency lightens the panel further.
 *
 * Below `lg` nothing sits behind the panel worth showing, so it is solid.
 * That also keeps it a single flat blue: the translucent fill picks up the
 * radial wash underneath and drifts a shade across the section.
 *
 * Written as Tailwind arbitrary values rather than inline styles: the fill
 * has to change at `lg`, and an inline style would outrank the `lg:`
 * variant.
 */
const PANEL_FILL = "bg-[#3779DD]";
const PANEL_FILL_LG = "lg:bg-[rgba(55,121,221,0.94)]";

/**
 * Faint white dot texture for the blue surfaces. Written as background-image
 * utilities rather than an overlay element: an absolutely-positioned overlay
 * paints above the in-flow heading and body copy, which would lay the dots
 * over the white text.
 *
 * `_` is Tailwind's escape for the spaces inside an arbitrary value.
 */
const DOTS =
  "bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1.2px,transparent_1.2px)] bg-[length:18px_18px]";
const DOTS_LG =
  "lg:bg-[radial-gradient(circle,rgba(255,255,255,0.10)_1.2px,transparent_1.2px)] lg:bg-[length:18px_18px]";

/**
 * Brand mint, taken from the logo mark. Used below `lg` as a stroke along the
 * top and left of the arch — the only accent in an otherwise flat blue field.
 */
const ARCH_STROKE = "border-[#03FABF]";

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
 * - Below `lg` the whole section is a flat blue field that runs up under the
 *   site header (which paints itself the same blue on these routes, see
 *   `Header`). Content stacks title → photo → body copy → buttons, which the
 *   photo achieves by being ordered between the text panel's own children —
 *   see the `display: contents` note on that panel.
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
    <section className="relative lg:pt-10 overflow-hidden">
      {/*
        Square grid, desktop only — below `lg` the blue panel covers the whole
        section and nothing of the backdrop shows. Purely decorative.

        Drawn in the brand blue at low alpha rather than a fixed pale hex, so
        the lines stay a tint of the panel they sit beside. Only the margins
        around the photo are ever visible, so it is left unmasked and pitched
        to read there.
      */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(55,121,221,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(55,121,221,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/*
        Full-bleed below `lg` so the blue panel reaches both screen edges as
        it does in the design; only picks up container gutters at `lg`.
      */}
      <div className="relative z-10 w-full lg:container lg:mx-auto lg:px-8">
        {/*
          Mobile: this wrapper *is* the blue panel, and the flex column that
          orders the photo between the heading and the body copy.
          Desktop: it goes transparent and only positions its children. The
          bottom padding is what lets the absolutely-positioned panel hang
          below the photo the way it does in the design.
        */}
        <div
          className={cn(
            "relative flex flex-col px-6 pt-6 pb-12",
            PANEL_FILL,
            DOTS,
            "lg:block lg:px-0 lg:pt-0 lg:pb-12 lg:bg-transparent lg:bg-none",
          )}
        >
          {/*
            Text panel.

            Below `lg` this is `display: contents`: it stops generating a box
            of its own so the heading, body copy and buttons become direct
            flex children of the panel above, which is what lets the photo be
            ordered *between* them without a second copy of it in the DOM.
            Inherited styling (the white text) still passes through.

            At `lg` it becomes a real box again — the translucent panel
            sitting over the lower-left of the photo — and the `order-*` on
            its children is inert because the parent is no longer a flex
            container.
          */}
          <div
            className={cn(
              "contents text-white",
              "lg:block lg:absolute lg:bottom-0 lg:left-0 lg:z-10 lg:w-[53%]",
              PANEL_FILL_LG,
              DOTS_LG,
              "lg:px-12 lg:pt-12 lg:pb-20",
              "lg:rounded-tl-2xl lg:rounded-tr-[9rem]",
            )}
          >
            <h1 className="order-1 text-[2rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
              {title}
            </h1>

            <p className="order-3 mt-7 lg:mt-5 text-base sm:text-lg lg:text-[1.0625rem] leading-relaxed max-w-md">
              {description}
            </p>

            <div className="order-4 mt-8 flex flex-row flex-wrap gap-3">
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
            Photo. Arched top on mobile via an elliptical radius, with the
            mint stroke on the top and left edges only: because the top-right
            radius is the full half-width, the border tapers itself away
            around that curve rather than stopping at a hard end.

            On desktop it squares off to the design's single oversized
            top-left corner, drops the stroke, and is inset from the left so
            the panel can sit over it.
          */}
          <div
            className={cn(
              "order-2 relative mt-7 aspect-[7/5] sm:aspect-[16/9] overflow-hidden",
              "rounded-tl-[50%_60%] rounded-tr-[50%_60%]",
              "border-t-[3px] border-l-[3px]",
              ARCH_STROKE,
              "lg:mt-0 lg:ml-[13%] lg:aspect-[194/100] lg:border-0",
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
                Below `lg` the box is inset by the panel's `px-6`.
              */
              sizes="(min-width: 1536px) 1281px, (min-width: 1024px) 87vw, calc(100vw - 48px)"
              className="object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
