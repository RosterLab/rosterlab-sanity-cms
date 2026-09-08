import type { CSSProperties } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface TrustedLogo {
  src: string;
  alt: string;
  /** Desktop draw height in px — see the note on trustedLogos below. */
  opticalHeight: number;
}

/**
 * Height each logo is drawn at, in px, on desktop.
 *
 * These are NOT a shared height. Marks this varied cannot be normalised by one:
 * a single-line wordmark like Legal Aid and a dense stacked crest like St
 * George put down wildly different amounts of ink at the same height, and the
 * wall ended up with a 3.7x spread in visual weight — Legal Aid and Monash
 * shouting while Hospice and St George disappeared.
 *
 * So each height is set from the mark's measured ink: every logo was rendered
 * at a common height and its coverage summed, weighted by how dark each pixel
 * is, then scaled by 1/sqrt(ink) against the median. Heavy marks come down,
 * light and detailed ones come up — the detailed crests needed the size to be
 * legible anyway. Re-measure if a logo is added; do not eyeball it.
 */
const trustedLogos: TrustedLogo[] = [
  {
    src: "/images/logos/new-logos/aus_gov.svg",
    alt: "Australian Government",
    opticalHeight: 40,
  },
  {
    src: "/images/logos/new-logos/hospice_west_auckland.svg",
    alt: "Hospice West Auckland",
    opticalHeight: 56,
  },
  {
    src: "/images/logos/new-logos/legalaid.svg",
    alt: "Legal Aid",
    opticalHeight: 30,
  },
  {
    src: "/images/logos/new-logos/monash.svg",
    alt: "Monash Health",
    opticalHeight: 32,
  },
  {
    src: "/images/logos/new-logos/nsw.svg",
    alt: "NSW Health",
    opticalHeight: 40,
  },
  {
    src: "/images/logos/new-logos/peticare.svg",
    alt: "Peticare",
    opticalHeight: 38,
  },
  {
    src: "/images/logos/new-logos/royal_prince.svg",
    alt: "Royal Prince Alfred",
    opticalHeight: 50,
  },
  {
    src: "/images/logos/new-logos/singhealth.svg",
    alt: "SingHealth",
    opticalHeight: 40,
  },
  {
    src: "/images/logos/new-logos/st_george.svg",
    alt: "St George",
    opticalHeight: 48,
  },
  {
    src: "/images/logos/new-logos/syd_kids.svg",
    alt: "Sydney Children's Hospital",
    opticalHeight: 52,
  },
  {
    src: "/images/logos/new-logos/ver_services_hawkes_bay.svg",
    alt: "Veterinary Services Hawke's Bay",
    opticalHeight: 30,
  },
  {
    src: "/images/logos/new-logos/legal_aid_wa.svg",
    alt: "Legal Aid WA",
    opticalHeight: 32,
  },
  {
    src: "/images/logos/new-logos/womens_and_childrens_adelaide.svg",
    alt: "Women's and Children's Hospital Adelaide",
    opticalHeight: 48,
  },
  {
    src: "/images/logos/new-logos/central_island.svg",
    alt: "Central Island",
    opticalHeight: 56,
  },
];

// Split roughly in half so the two rows don't share the same logos.
const halfway = Math.ceil(trustedLogos.length / 2);
const topRow = trustedLogos.slice(0, halfway);
const bottomRow = trustedLogos.slice(halfway);

const ROW_DURATION_S = 45;

function Row({
  logos,
  reverse,
  onDark,
}: {
  logos: TrustedLogo[];
  reverse?: boolean;
  onDark?: boolean;
}) {
  // Duplicate the logos so translateX(-50%) produces a seamless loop.
  const loop = [...logos, ...logos];
  return (
    <div
      className="flex w-max items-center gap-10 md:gap-14"
      style={{
        animation: `${reverse ? "rl-marquee-reverse" : "rl-marquee"} ${ROW_DURATION_S}s linear infinite`,
      }}
    >
      {loop.map((logo, i) => (
        <div
          key={`${logo.src}-${i}`}
          className="flex items-center justify-center shrink-0"
          aria-hidden={i >= logos.length ? "true" : undefined}
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={240}
            height={logo.opticalHeight}
            style={{ "--logo-h": `${logo.opticalHeight}px` } as CSSProperties}
            className={cn(
              "w-auto object-contain md:h-[var(--logo-h)] md:max-w-[220px]",
              onDark
                ? // The hero gives the wall the full width of the phone with
                  // nothing beside it, so the marks are drawn *above* their
                  // desktop height there rather than the 0.72 the boxed
                  // light version uses — at 0.72 a 30px wordmark is a smudge
                  // on a 390px screen. Desktop is unchanged.
                  "h-[calc(var(--logo-h)*1.35)] max-w-[280px]"
                : "h-[calc(var(--logo-h)*0.72)] max-w-[220px]",
              onDark
                ? // brightness(0) flattens each mark to black whatever its own
                  // colours are, and invert(1) then takes that to white — the
                  // only way to get one consistent silhouette out of a wall
                  // this mixed. Held under full opacity so the logos stay
                  // second to the headline above them.
                  "opacity-80 brightness-0 invert"
                : "opacity-70 grayscale",
            )}
          />
        </div>
      ))}
    </div>
  );
}

interface TrustedByDualRowProps {
  heading?: string;
  /**
   * Renders the wall for a dark background: white heading, logos inverted to
   * white silhouettes, and no vertical padding of its own — whatever it is
   * embedded in owns the spacing. Used by the hero, which carries it inside
   * the blue field.
   */
  onDark?: boolean;
}

export default function TrustedByDualRow({
  heading = "Join hundreds of teams already optimising their rosters",
  onDark = false,
}: TrustedByDualRowProps = {}) {
  return (
    <section className={onDark ? "" : "py-6 md:py-16"}>
      <Container className="lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.6fr)] gap-8 lg:gap-12 items-center">
          {/* Left: heading */}
          <div className="max-w-md">
            <h2
              className={cn(
                "text-balance text-2xl font-semibold leading-snug md:text-3xl",
                onDark ? "text-white" : "text-neutral-900",
              )}
            >
              {heading}
            </h2>
          </div>

          {/* Right: two marquee rows, opposite directions */}
          <div
            className={cn(
              "relative overflow-hidden md:space-y-6",
              onDark ? "space-y-8 md:space-y-6" : "space-y-5",
              // The edge fade has to pull in on a phone once the marks are
              // drawn this large: at the desktop 12% only about a logo and a
              // half of each row is clear of the gradient, so most of what is
              // on screen is a half-dissolved mark. Classes rather than the
              // inline style below, which cannot carry a breakpoint.
              onDark &&
                "[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
            )}
            style={
              onDark
                ? undefined
                : {
                    maskImage:
                      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  }
            }
          >
            {/* Top row: right → left */}
            <Row logos={topRow} onDark={onDark} />
            {/* Bottom row: left → right */}
            <Row logos={bottomRow} reverse onDark={onDark} />
          </div>
        </div>
      </Container>

      {/* Local keyframes — scoped so they don't collide with the site-wide
          `animate-scroll`. */}
      <style>{`
        @keyframes rl-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes rl-marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
