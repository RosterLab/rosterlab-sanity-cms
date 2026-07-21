import type { ElementType } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface TrustedLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizeClass?: string;
}

const DEFAULT_SIZE = "h-10 md:h-12";
const LARGER_SIZE = "h-14 md:h-16";
const SMALLER_SIZE = "h-8 md:h-10";

const trustedLogos: TrustedLogo[] = [
  { src: "/images/logos/new-logos/aus_gov.svg", alt: "Australian Government", width: 180, height: 60 },
  { src: "/images/logos/new-logos/central_island.svg", alt: "Central Island", width: 160, height: 60, sizeClass: LARGER_SIZE },
  { src: "/images/logos/new-logos/hospice_west_auckland.svg", alt: "Hospice West Auckland", width: 160, height: 60, sizeClass: LARGER_SIZE },
  { src: "/images/logos/new-logos/legalaid.svg", alt: "Legal Aid", width: 160, height: 60 },
  { src: "/images/logos/new-logos/monash.svg", alt: "Monash Health", width: 160, height: 60 },
  { src: "/images/logos/new-logos/nsw.svg", alt: "NSW Health", width: 160, height: 60 },
  { src: "/images/logos/new-logos/peticare.svg", alt: "Peticare", width: 160, height: 60 },
  { src: "/images/logos/new-logos/royal_prince.svg", alt: "Royal Prince Alfred", width: 160, height: 60 },
  { src: "/images/logos/new-logos/singhealth.svg", alt: "SingHealth", width: 160, height: 60 },
  { src: "/images/logos/new-logos/st_george.svg", alt: "St George", width: 140, height: 60 },
  { src: "/images/logos/new-logos/syd_kids.svg", alt: "Sydney Children's Hospital", width: 160, height: 60 },
  { src: "/images/logos/new-logos/ver_services_hawkes_bay.svg", alt: "Veterinary Services Hawke's Bay", width: 160, height: 60, sizeClass: SMALLER_SIZE },
  { src: "/images/logos/new-logos/legal_aid_wa.svg", alt: "Legal Aid WA", width: 160, height: 60 },
  { src: "/images/logos/new-logos/womens_and_childrens_adelaide.svg", alt: "Women's and Children's Hospital Adelaide", width: 160, height: 60, sizeClass: LARGER_SIZE },
];

interface TrustedByProps {
  heading?: string | null;
  bare?: boolean;
}

export default function TrustedBy({
  heading = "Trusted by leading healthcare organisations",
  bare = false,
}: TrustedByProps = {}) {
  const loop = [...trustedLogos, ...trustedLogos];
  const showHeading = !bare && heading;
  const wrapperClass = bare ? "" : "pt-1.5 lg:pt-8 pb-12 bg-white";
  const Wrapper: ElementType = bare ? "div" : "section";

  return (
    <Wrapper className={wrapperClass}>
      {showHeading && (
        <Container>
          <div className="text-center">
            <h2
              className="font-semibold text-neutral-700 mb-8"
              style={{ fontSize: "23px" }}
            >
              {heading}
            </h2>
          </div>
        </Container>
      )}

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex w-max items-center gap-12 md:gap-16 animate-scroll [animation-duration:60s]">
          {loop.map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="flex items-center justify-center shrink-0"
              aria-hidden={i >= trustedLogos.length ? "true" : undefined}
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
      </div>
    </Wrapper>
  );
}
