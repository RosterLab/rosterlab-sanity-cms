import Image from "next/image";
import Container from "@/components/ui/Container";

interface TrustedLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizeClass?: string;
}

const DEFAULT_SIZE = "h-8 md:h-10";
const LARGER_SIZE = "h-10 md:h-12";
const SMALLER_SIZE = "h-6 md:h-8";

const trustedLogos: TrustedLogo[] = [
  {
    src: "/images/logos/new-logos/aus_gov.svg",
    alt: "Australian Government",
    width: 180,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/hospice_west_auckland.svg",
    alt: "Hospice West Auckland",
    width: 160,
    height: 60,
    sizeClass: LARGER_SIZE,
  },
  {
    src: "/images/logos/new-logos/legalaid.svg",
    alt: "Legal Aid",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/monash.svg",
    alt: "Monash Health",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/nsw.svg",
    alt: "NSW Health",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/peticare.svg",
    alt: "Peticare",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/royal_prince.svg",
    alt: "Royal Prince Alfred",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/singhealth.svg",
    alt: "SingHealth",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/st_george.svg",
    alt: "St George",
    width: 140,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/syd_kids.svg",
    alt: "Sydney Children's Hospital",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/ver_services_hawkes_bay.svg",
    alt: "Veterinary Services Hawke's Bay",
    width: 160,
    height: 60,
    sizeClass: SMALLER_SIZE,
  },
  {
    src: "/images/logos/new-logos/legal_aid_wa.svg",
    alt: "Legal Aid WA",
    width: 160,
    height: 60,
  },
  {
    src: "/images/logos/new-logos/womens_and_childrens_adelaide.svg",
    alt: "Women's and Children's Hospital Adelaide",
    width: 160,
    height: 60,
    sizeClass: LARGER_SIZE,
  },
  {
    src: "/images/logos/new-logos/central_island.svg",
    alt: "Central Island",
    width: 160,
    height: 60,
    sizeClass: LARGER_SIZE,
  },
];

// Split roughly in half so the two rows don't share the same logos.
const halfway = Math.ceil(trustedLogos.length / 2);
const topRow = trustedLogos.slice(0, halfway);
const bottomRow = trustedLogos.slice(halfway);

const ROW_DURATION_S = 45;

function Row({ logos, reverse }: { logos: TrustedLogo[]; reverse?: boolean }) {
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
            width={logo.width}
            height={logo.height}
            className={`max-w-full ${logo.sizeClass ?? DEFAULT_SIZE} w-auto object-contain grayscale opacity-70`}
          />
        </div>
      ))}
    </div>
  );
}

interface TrustedByDualRowProps {
  heading?: string;
}

export default function TrustedByDualRow({
  heading = "Join over 150+ teams already optimising their rosters",
}: TrustedByDualRowProps = {}) {
  return (
    <section className="py-6 md:py-16">
      <Container className="lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr),minmax(0,1.6fr)] gap-8 lg:gap-12 items-center">
          {/* Left: heading */}
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 leading-snug">
              {heading}
            </h2>
          </div>

          {/* Right: two marquee rows, opposite directions */}
          <div
            className="relative overflow-hidden space-y-5 md:space-y-6"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {/* Top row: right → left */}
            <Row logos={topRow} />
            {/* Bottom row: left → right */}
            <Row logos={bottomRow} reverse />
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
