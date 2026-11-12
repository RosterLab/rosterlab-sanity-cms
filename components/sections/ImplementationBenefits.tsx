import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import Container from "@/components/ui/Container";

interface ImplementationBenefitsProps {
  heading: ReactNode;
  headingId?: string;
  description?: string;
  containerClassName?: string;
  cardHeadingAs?: "h3" | "h4";
  cardDescriptionClassName?: string;
  tone?: "navy" | "blue";
  cards: { icon: IconType; title: string; description: ReactNode }[];
}

export default function ImplementationBenefits({
  heading,
  headingId,
  description,
  containerClassName = "",
  cardHeadingAs: CardHeading = "h3",
  cardDescriptionClassName = "text-[#8A97B8]",
  tone = "navy",
  cards,
}: ImplementationBenefitsProps) {
  const isBlue = tone === "blue";

  return (
    <section
      aria-labelledby={headingId}
      className={`relative overflow-hidden py-16 md:py-24 ${
        isBlue
          ? "bg-[#3779DD] bg-[radial-gradient(ellipse_at_top_right,#4B88E6_0%,transparent_52%),linear-gradient(170deg,#3779DD_0%,#2E68BF_55%,#285FB4_100%)]"
          : "bg-[#141B3F]"
      }`}
    >
      {!isBlue && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[length:22px_22px] [mask-image:linear-gradient(to_left,black_20%,transparent_85%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#3B7FE8]/25 blur-[120px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[#03F9BE]/10 blur-[120px]"
          />
        </>
      )}
      <Container className={`relative text-left ${containerClassName}`}>
        <div className="max-w-3xl">
          <h2
            id={headingId}
            className="scroll-mt-24 text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight"
          >
            {heading}
          </h2>
          {description && (
            <p className="mt-6 max-w-2xl text-lg text-white/75 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-3 ${
            isBlue
              ? "mt-10 divide-y divide-white/30 md:mt-12 md:divide-x md:divide-y-0"
              : "mt-14 max-w-6xl gap-4 md:mt-16"
          }`}
        >
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className={
                isBlue
                  ? "min-w-0 py-6 first:pt-0 last:pb-0 md:px-5 md:py-0 md:first:pl-0 md:last:pr-0 lg:px-8"
                  : "rounded-xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
              }
            >
              <span
                aria-hidden="true"
                className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                  isBlue
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-white/10 bg-[#1F2A5C] text-[#03F9BE]"
                }`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <CardHeading
                className={`font-medium leading-tight tracking-tight text-white ${
                  isBlue
                    ? "mt-4 text-2xl md:max-lg:min-h-[2lh] lg:text-[26px]"
                    : "mt-7 text-2xl md:min-h-[2lh] md:text-3xl"
                }`}
              >
                {title}
              </CardHeading>
              <p
                className={`leading-relaxed ${isBlue ? "mt-3" : "mt-4"} ${cardDescriptionClassName}`}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
