import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

interface ClosingCtaProps {
  heading: string;
  headingId?: string;
  description?: string;
  children: ReactNode;
}

export default function ClosingCta({
  heading,
  headingId,
  description,
  children,
}: ClosingCtaProps) {
  return (
    <section aria-labelledby={headingId} className="py-16 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-[#3B7FE8] px-6 py-16 text-center text-white sm:px-12 md:py-24">
          <svg
            aria-hidden="true"
            viewBox="0 0 300 420"
            className="pointer-events-none absolute -left-24 top-1/2 h-[130%] -translate-y-1/2 text-[#2A3F8F]/45 md:-left-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="22"
          >
            <rect x="11" y="11" width="278" height="98" rx="49" />
            <rect x="11" y="161" width="178" height="98" rx="49" />
            <circle cx="60" cy="360" r="49" />
          </svg>
          <div className="relative mx-auto max-w-3xl">
            <h2
              id={headingId}
              className="scroll-mt-24 text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            >
              {heading}
            </h2>
            {description && (
              <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-white/90">
                {description}
              </p>
            )}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
