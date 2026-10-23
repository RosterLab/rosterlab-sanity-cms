"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import Container from "@/components/ui/Container";
import {
  TESTIMONIALS_AU,
  type Testimonial,
} from "@/components/sections/TestimonialsNew";
import { cn } from "@/lib/utils";

/** How long each quote stays up before the next fades in. */
const AUTOPLAY_MS = 7000;

/**
 * The enterprise page's testimonials: one navy card, centred, with the quote
 * set large and the author beneath it — after a single-quote reference
 * layout rather than the home page's two-column carousel.
 *
 * The quotes cycle on their own, cross-fading in place. Every quote is laid
 * into the same grid cell, so the card takes the height of the longest and
 * never jumps between them. Arrows in notches on either edge step through them; hovering
 * the card holds the current one.
 */
export default function EnterpriseTestimonials({
  testimonials = TESTIMONIALS_AU,
}: {
  testimonials?: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const back = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const timer = window.setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, testimonials.length]);

  return (
    <section className="bg-[#F4F6FB] py-16 md:py-24">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2A5C] leading-tight tracking-tight">
            From our community.
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Here&rsquo;s what other rostering leads had to say about RosterLab.
          </p>
        </div>
        {/* Navy card with a faint dot grid. The back and next arrows sit in
            notches on its edges, as on the case studies. */}
        <div
          className="relative mx-auto max-w-5xl rounded-[2.5rem] bg-[#1F2A5C] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:22px_22px] px-6 py-12 text-center sm:px-16 md:rounded-[3rem] md:py-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid">
            {testimonials.map((t, i) => {
              const current = i === index;
              return (
                <figure
                  key={t.author}
                  aria-hidden={!current}
                  className={cn(
                    "[grid-area:1/1] mx-auto flex max-w-3xl flex-col items-center transition-opacity duration-700 motion-reduce:transition-none",
                    current
                      ? "visible opacity-100"
                      : "invisible pointer-events-none opacity-0",
                  )}
                >
                  <blockquote className="text-balance text-lg md:text-xl font-semibold text-white leading-[1.45] tracking-tight">
                    &ldquo;
                    {t.quote.map((frag, k) =>
                      typeof frag === "string" ? (
                        <span key={k}>{frag}</span>
                      ) : (
                        <span key={k} className="text-[#03F9BE]">
                          {frag.highlight}
                        </span>
                      ),
                    )}
                    &rdquo;
                  </blockquote>
                  <figcaption className="mt-6 w-full text-center text-sm leading-relaxed">
                    <span className="block font-semibold text-white">
                      {t.author}
                    </span>
                    <span className="block text-white/75">{t.role}</span>
                    {t.caseStudyLink && (
                      <Link
                        href={t.caseStudyLink}
                        tabIndex={current ? undefined : -1}
                        className="mt-1 inline-flex items-center gap-1 font-medium text-[#03F9BE] hover:text-white"
                      >
                        Read case study
                        <PiArrowRightBold
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
                      </Link>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <button
            type="button"
            onClick={back}
            aria-label="Previous testimonial"
            className="group absolute left-0 top-1/2 hidden h-16 w-16 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full bg-[#F4F6FB] text-[#1F2A5C] transition hover:text-[#3B7FE8] md:flex"
          >
            <PiArrowLeftBold
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
            />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="group absolute right-0 top-1/2 hidden h-16 w-16 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#F4F6FB] text-[#1F2A5C] transition hover:text-[#3B7FE8] md:flex"
          >
            <PiArrowRightBold
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
        {/* No room for the notches on phones: round arrows under the card,
            as on the case studies. */}
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          {(
            [
              ["Previous testimonial", back, PiArrowLeftBold],
              ["Next testimonial", next, PiArrowRightBold],
            ] as const
          ).map(([label, onClick, Icon]) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F2A5C]/15 bg-white text-[#1F2A5C] shadow-sm active:bg-[#F4F6FB]"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
