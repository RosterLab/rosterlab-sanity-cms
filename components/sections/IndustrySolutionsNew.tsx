"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Industries";

// How long each set of cards holds before the row creeps on by one.
const AUTOPLAY_MS = 4000;

export interface Industry {
  name: string;
  category: string;
  description: string;
  href: string;
  image?: string; // Optional — falls back to gradient placeholder when absent.
}

export const INDUSTRIES_AU: Industry[] = [
  {
    name: "ICU/ED",
    category: "Healthcare",
    description: "Critical care rostering with complex skill-mix.",
    href: "/industries/healthcare/ed-icu",
    image: "/landing/industries/icu.webp",
  },
  {
    name: "Radiology",
    category: "Healthcare",
    description: "Plan your rosters by sessions.",
    href: "/industries/healthcare/radiology",
    image: "/landing/industries/radi.webp",
  },
  {
    name: "Aged Care",
    category: "Healthcare",
    description: "Allocate your staff more effectively for continuity of care.",
    href: "/industries/healthcare/aged-care",
    image: "/landing/industries/aged.webp",
  },
  {
    name: "Vets",
    category: "Healthcare",
    description: "Rostering for veterinary clinics with mixed skill mixes.",
    href: "/industries/healthcare/veterinary-rostering",
    image: "/landing/industries/vet.webp",
  },
  {
    name: "Hospitality",
    category: "Other Industries",
    description: "Restaurant and hotel staff scheduling.",
    href: "/industries/hospitality-roster",
    image: "/landing/industries/service.webp",
  },
  {
    name: "24/7 Support Teams",
    category: "Other Industries",
    description: "Round-the-clock customer service scheduling.",
    href: "/industries/call-centre-rostering",
    image: "/landing/industries/247.webp",
  },
  {
    name: "Manufacturing",
    category: "Other Industries",
    description: "Shift work optimisation for production lines.",
    href: "/industries/manufacturing-roster",
    image: "/landing/industries/manu.webp",
  },
];

interface IndustryCardProps {
  industry: Industry;
  className: string;
}

function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <div data-card className={`shrink-0 ${className}`}>
      <Link
        href={industry.href}
        onClick={() =>
          trackSmartButtonClick(industry.name, industry.href, LOCATION, {
            industry_category: industry.category,
          })
        }
        className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800"
      >
        {/* Background image or gradient placeholder */}
        {industry.image ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${industry.image})` }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-black transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Dark overlay for legible text — same treatment for all cards. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"
        />

        {/* Foreground content */}
        <div className="relative h-full flex flex-col p-6 md:p-7 text-white">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
            {industry.name}
          </h3>
          <p className="text-sm md:text-base text-white/85 leading-relaxed">
            {industry.description}
          </p>

          <div className="mt-auto flex items-center gap-2 text-sm font-semibold">
            Explore solutions
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Click-and-drag horizontal scrolling for the card track.
 *
 * The track is already `overflow-x-auto`, so trackpads and touch work — but
 * with a mouse there was no way to move it except the arrow buttons. Mouse
 * only: touch scrolls natively and hijacking it would break momentum.
 *
 * While dragging, scroll snapping and smooth scrolling are switched off —
 * both fight per-frame scrollLeft updates and make the drag feel like it is
 * sticking.
 */
const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    let moved = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = 0;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 3) el.setPointerCapture?.(e.pointerId);
      el.scrollLeft = startScroll - dx;
    };

    const end = () => {
      if (!dragging) return;
      dragging = false;
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
      el.style.cursor = "";
    };

    // A drag that ends over a card would otherwise follow its link.
    const onClickCapture = (e: MouseEvent) => {
      if (moved > 5) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };

    // Each card is an <a>, and Chrome starts its own native link-drag as soon
    // as the pointer moves — which cancels the pointer stream and leaves the
    // track stuck. Suppressing dragstart is what makes the drag work at all.
    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener("dragstart", onDragStart);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("pointerleave", end);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("dragstart", onDragStart);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("pointerleave", end);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [ref]);
};

export const INDUSTRIES_HEADING_AU = {
  title: "Workforce management built around how your industry works.",
  subtitle:
    "Designed for the real operational demands of each industry, from shift-heavy healthcare and hospitality to 24/7 operations and highly regulated public services. Explore how we tailor scheduling, forecasting, and compliance to your team.",
};

export default function IndustrySolutionsNew({
  industries = INDUSTRIES_AU,
  heading = INDUSTRIES_HEADING_AU,
}: {
  industries?: Industry[];
  heading?: { title: string; subtitle: string };
} = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useDragScroll(trackRef);
  // Which card index sits at the left edge of the visible window.
  const [activeIndex, setActiveIndex] = useState(0);
  // Autoplay yields to anyone touching the row — hover, drag or keyboard. A
  // ref rather than state: the pause must not tear down and restart the timer.
  const autoplayPausedRef = useRef(false);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 /* gap */ : 320;
    track.scrollBy({ left: cardWidth * dir, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 24 : 320;
    track.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-card]");
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      const idx = Math.round(track.scrollLeft / cardWidth);
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Creeps one card to the right on its own, then rewinds to the start.
  // Desktop only: the mobile track is finger-driven and moving it under the
  // reader's thumb would fight them.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 1024px)");

    // No point animating a row nobody is looking at.
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(track);

    const pause = () => {
      autoplayPausedRef.current = true;
    };
    const resume = () => {
      autoplayPausedRef.current = false;
    };
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    const id = window.setInterval(() => {
      if (!inView || autoplayPausedRef.current || !desktop.matches) return;
      const card = track.querySelector<HTMLElement>("[data-card]");
      const cardWidth = card ? card.offsetWidth + 24 : 320;
      const atEnd =
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(id);
      observer.disconnect();
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, []);

  // How many "pages" (start positions) exist for the dot tracker. On desktop
  // 4 cards are visible at once, so the last valid start index is length - 4.
  const pageCount = Math.max(1, industries.length - 3);

  return (
    <section className="pt-8 md:pt-10 pb-20 md:pb-24">
      <Container className="lg:px-12 xl:px-20">
        {/* Header row: heading + description on the left, arrows on the right. */}
        <div className="grid lg:grid-cols-[minmax(0,1fr),auto] gap-6 items-end mb-12 md:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {heading.title}
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
              {heading.subtitle}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 self-end">
            <button
              type="button"
              onClick={() => {
                trackButtonClick("Industries: Previous", LOCATION);
                scrollByCard(-1);
              }}
              aria-label="Previous industry"
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-gray-900 transition"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                trackButtonClick("Industries: Next", LOCATION);
                scrollByCard(1);
              }}
              aria-label="Next industry"
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-gray-900 transition"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop track — exactly 4 cards visible; each card takes
            (containerWidth − 3 gaps) ÷ 4 of the row width. */}
        <div
          ref={trackRef}
          className="hidden lg:flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {industries.map((industry) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              className="basis-[calc((100%-3*1.5rem)/4)]"
            />
          ))}
        </div>

        {/* Dot tracker — one dot per scrollable position on desktop. */}
        <div className="hidden lg:flex justify-center gap-2 mt-8">
          {Array.from({ length: pageCount }).map((_, i) => {
            const isActive = i === Math.min(activeIndex, pageCount - 1);
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  trackButtonClick("Industries: Dot", LOCATION, {
                    dot_index: i,
                  });
                  scrollToIndex(i);
                }}
                aria-label={`Go to industry group ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  isActive
                    ? "w-8 bg-gray-900"
                    : "w-4 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            );
          })}
        </div>
      </Container>

      {/* Mobile / tablet track — bleeds past the Container so cards can peek
          past the viewport edge. Uses explicit shrink-0 spacer divs at the
          start and end because `padding` on an `overflow-x-auto` flex
          container isn't reliably respected by browsers when scrolling. */}
      <div className="lg:hidden mt-0">
        {/* `scroll-padding-*` tells the browser that snap points should
            respect the left/right gutter, so when snap-mandatory settles
            it doesn't skip past our padding and leave the first card
            flush against x=0. */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pl-6 sm:pl-8 pr-6 sm:pr-8"
          style={{
            scrollPaddingLeft: "1.5rem",
          }}
        >
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`shrink-0 snap-start ${i > 0 ? "ml-5" : ""}`}
            >
              <IndustryCard
                industry={industry}
                className="w-[75vw] max-w-[360px] sm:w-[320px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
