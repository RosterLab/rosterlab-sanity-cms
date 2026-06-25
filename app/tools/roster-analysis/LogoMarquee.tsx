import Image from "next/image";
import Container from "@/components/ui/Container";

interface MarqueeLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const logos: MarqueeLogo[] = [
  { src: "/images/logos/new-logos/aus_gov.png", alt: "Australian Government", width: 180, height: 60 },
  { src: "/images/logos/new-logos/hawkes.png", alt: "Hawkes Bay", width: 160, height: 60 },
  { src: "/images/logos/new-logos/layer_8.png", alt: "Layer 8", width: 140, height: 60 },
  { src: "/images/logos/new-logos/logo_upscales_05.png", alt: "Customer logo", width: 160, height: 60 },
  { src: "/images/logos/new-logos/logo_upscales_10.png", alt: "Customer logo", width: 160, height: 60 },
  { src: "/images/logos/new-logos/monash.png", alt: "Monash Health", width: 160, height: 60 },
  { src: "/images/logos/new-logos/royal_prince.png", alt: "Royal Prince Alfred", width: 160, height: 60 },
  { src: "/images/logos/new-logos/singhealth.png", alt: "SingHealth", width: 160, height: 60 },
  { src: "/images/logos/new-logos/st_george.png", alt: "St George", width: 140, height: 60 },
  { src: "/images/logos/new-logos/syd_kids.png", alt: "Sydney Children's Hospital", width: 160, height: 60 },
  { src: "/images/logos/new-logos/whanga.png", alt: "Whanganui", width: 140, height: 60 },
];

export default function LogoMarquee() {
  const loop = [...logos, ...logos];

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <Container>
        <h2
          className="text-center font-semibold text-neutral-700 mb-8"
          style={{ fontSize: "23px" }}
        >
          Trusted by leading healthcare organisations
        </h2>
      </Container>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max items-center gap-12 md:gap-16 animate-scroll [animation-duration:60s] hover:[animation-play-state:paused]">
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
                className="max-w-full h-12 md:h-14 w-auto object-contain grayscale opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
