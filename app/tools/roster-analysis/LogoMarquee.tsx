import Image from "next/image";
import Container from "@/components/ui/Container";

interface MarqueeLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const logos: MarqueeLogo[] = [
  { src: "/images/logos/new-logos/aus_gov.svg", alt: "Australian Government", width: 180, height: 60 },
  { src: "/images/logos/new-logos/hawkes.svg", alt: "Hawke's Bay", width: 160, height: 60 },
  { src: "/images/logos/new-logos/legalaid.svg", alt: "Legal Aid", width: 160, height: 60 },
  { src: "/images/logos/new-logos/monash.svg", alt: "Monash Health", width: 160, height: 60 },
  { src: "/images/logos/new-logos/nsw.svg", alt: "NSW Health", width: 160, height: 60 },
  { src: "/images/logos/new-logos/peticare.svg", alt: "Peticare", width: 160, height: 60 },
  { src: "/images/logos/new-logos/royal_prince.svg", alt: "Royal Prince Alfred", width: 160, height: 60 },
  { src: "/images/logos/new-logos/singhealth.svg", alt: "SingHealth", width: 160, height: 60 },
  { src: "/images/logos/new-logos/st_george.svg", alt: "St George", width: 140, height: 60 },
  { src: "/images/logos/new-logos/syd_kids.svg", alt: "Sydney Children's Hospital", width: 160, height: 60 },
  { src: "/images/logos/new-logos/whanga.svg", alt: "Whanganui", width: 140, height: 60 },
];

export default function LogoMarquee() {
  const loop = [...logos, ...logos];

  return (
    <section className="pt-12 pb-8 bg-gray-50 border-t border-gray-100">
      <Container>
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-[0.15em] mb-8">
          Trusted by
        </p>
      </Container>

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
              aria-hidden={i >= logos.length ? "true" : undefined}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="max-w-full h-10 md:h-12 w-auto object-contain grayscale opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
