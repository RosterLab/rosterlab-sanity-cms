"use client";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { trackButtonClick } from "@/components/analytics/tracking";
import { TESTIMONIALS_AU } from "@/components/sections/TestimonialsNew";

const testimonials = [
  {
    quote: [
      "You can generate the roster automatically, but you can also switch roster views by employee and by shift, making it easier to manage … It's ",
      { highlight: "made management's life easier" },
      ".",
    ],
    attribution: "Auckland-based Radiology Department, MRT Lead",
  },
  ...TESTIMONIALS_AU.slice(0, 4).map(({ quote, author, role }) => ({
    quote,
    attribution: `${author}, ${role}`,
  })),
];

const arrowClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2B68C4] text-[#2B68C4] transition-colors hover:bg-[#2B68C4] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B68C4]";

export default function RoiTestimonials({
  analyticsLocation,
}: {
  analyticsLocation: string;
}) {
  const [index, setIndex] = useState(0);

  function move(direction: -1 | 1) {
    setIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );
    trackButtonClick(
      direction === -1 ? "Testimonials: Previous" : "Testimonials: Next",
      analyticsLocation,
    );
  }

  return (
    <div
      role="group"
      aria-label="Customer testimonials"
      className="min-w-0 rounded-2xl border border-[#D8E1F0] bg-white p-5 sm:p-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
    >
      <span
        aria-hidden="true"
        className="block h-8 select-none font-serif text-5xl leading-none text-[#3779DD]/70 lg:self-end"
      >
        &ldquo;
      </span>
      <div>
        <div aria-live="polite" aria-atomic="true" className="grid">
          {testimonials.map(({ quote, attribution }, quoteIndex) => (
            <figure
              key={attribution}
              aria-hidden={quoteIndex !== index}
              className={`col-start-1 row-start-1 text-pretty text-[17px] leading-relaxed text-[#1F2A5C] sm:text-[19px] ${quoteIndex === index ? "" : "invisible"}`}
            >
              <blockquote>
                {quote.map((fragment, fragmentIndex) =>
                  typeof fragment === "string" ? (
                    fragment
                  ) : (
                    <strong
                      key={fragmentIndex}
                      className="font-semibold text-[#2B68C4]"
                    >
                      {fragment.highlight}
                    </strong>
                  ),
                )}
              </blockquote>
              <figcaption className="sr-only">{attribution}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p aria-hidden="true" className="text-sm font-semibold text-gray-600">
            {testimonials[index].attribution}
          </p>
          <div className="flex shrink-0 gap-3 self-end sm:self-auto">
            <button
              type="button"
              aria-label="Previous testimonial"
              className={arrowClass}
              onClick={() => move(-1)}
            >
              <HiChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className={arrowClass}
              onClick={() => move(1)}
            >
              <HiChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
