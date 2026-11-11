"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { cn } from "@/lib/utils";

export interface CaseStudy {
  /** Small label over the title, e.g. "Case study" or "Newsroom". */
  kind: string;
  title: string;
  href: string;
  image: string;
  quote?: string;
  attribution?: string;
  stats: { value: string; label: string }[];
}

/** Expo-out: quick to arrive, long soft settle. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Each story is in one of three states: `in` (on show), `out` (the one just
 * left, sliding away to the left) or `waiting` (parked off to the right,
 * ready to slide in). Moving on turns the current story `out` and the next
 * `in`, so the two pass each other rather than one blinking into the other.
 */
type Phase = "in" | "out" | "waiting";

/**
 * One case study at a time: a photo on the left, a navy panel on the right
 * with the title, an optional quote and the headline figures. A round notch cut into
 * the panel's right edge holds the arrow to the next story.
 *
 * Every story is laid into the same grid cell, so the card takes the height
 * of the tallest and never jumps. On moving on, the stories cross-fade with
 * a slight drift and the panel's contents settle in just behind, the key
 * figures first.
 */
export default function EnterpriseCaseStudies({
  stories,
  isUS = false,
}: {
  stories: CaseStudy[];
  isUS?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const go = (to: number) => {
    setPrev(index);
    setIndex((to + stories.length) % stories.length);
  };
  const next = () => go(index + 1);
  const back = () => go(index - 1);

  // Swipe left or right on a phone to move between stories.
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next();
    else back();
  };
  const phaseOf = (i: number): Phase =>
    i === index ? "in" : i === prev ? "out" : "waiting";

  // Under reduced motion every variant is a plain cross-fade.
  const fade = (opacity: number) => ({ opacity });

  // Kept quiet: a short cross-fade with a few pixels of drift, and the
  // panel's contents settling in just behind it.
  const photo: Variants = reduce
    ? { in: fade(1), out: fade(0), waiting: fade(0) }
    : {
        in: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
        out: { opacity: 0, x: -12, transition: { duration: 0.35 } },
        waiting: { opacity: 0, x: 12, transition: { duration: 0 } },
      };
  const panel: Variants = reduce
    ? { in: fade(1), out: fade(0), waiting: fade(0) }
    : {
        in: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay: 0.05,
            ease: EASE,
          },
        },
        out: { opacity: 0, x: -12, transition: { duration: 0.35 } },
        waiting: { opacity: 0, x: 12, transition: { duration: 0 } },
      };
  // `custom` is each item's place in the running order: the key figures go
  // first (0, 1), then the label, title, quote, name and button.
  const item: Variants = reduce
    ? { in: fade(1), out: fade(1), waiting: fade(1) }
    : {
        in: (order: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.12 + order * 0.06, ease: EASE },
        }),
        out: { opacity: 1 },
        waiting: { opacity: 0, y: 6, transition: { duration: 0 } },
      };

  return (
    <div
      className="relative mx-auto grid max-w-6xl"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {stories.map((s, i) => {
        const current = i === index;
        const phase = phaseOf(i);
        const hasQuote = Boolean(s.quote?.trim());
        const stats = (
          <dl
            className={cn(
              "flex flex-row gap-6",
              hasQuote
                ? "border-t border-white/10 pt-4 sm:gap-10 md:self-end md:border-0 md:pt-0 xl:flex-col xl:gap-6"
                : "my-auto py-6 md:py-8",
            )}
          >
            {s.stats.map((stat, k) => (
              <motion.div
                key={stat.label}
                variants={item}
                custom={k}
                className="flex min-w-0 flex-col"
              >
                <dt
                  className={cn(
                    "order-2 mt-1 max-w-[14rem] text-white/80",
                    hasQuote ? "text-xs md:text-sm" : "text-sm md:text-base",
                  )}
                >
                  {stat.label}
                </dt>
                <dd
                  className={cn(
                    "order-1 font-medium tracking-tight text-[#03F9BE]",
                    hasQuote ? "text-xl md:text-2xl" : "text-4xl md:text-5xl",
                  )}
                >
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        );
        return (
          <article
            key={s.href}
            aria-hidden={!current}
            className={cn(
              "[grid-area:1/1] grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]",
              // The outgoing story stays visible while it slides away; any
              // other story not on show is out of the way entirely.
              current ? "z-10" : "pointer-events-none",
              phase === "waiting" && prev !== null && "invisible",
            )}
          >
            <motion.div
              initial={i === 0 ? "in" : "waiting"}
              animate={phase}
              variants={photo}
              className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] min-[480px]:aspect-[4/1] md:aspect-auto md:rounded-[1.75rem]"
            >
              <Image
                src={s.image}
                alt=""
                fill
                loading={current ? "eager" : "lazy"}
                unoptimized={s.image.endsWith(".webp")}
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={i === 0 ? "in" : "waiting"}
              animate={phase}
              variants={panel}
              className={cn(
                "grid min-w-0 grid-cols-1 gap-5 rounded-[1.25rem] bg-[#1F2A5C] p-5 text-white sm:p-9 md:gap-8 md:rounded-[1.75rem]",
                hasQuote &&
                  "xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-12 xl:pr-16",
              )}
            >
              <div className="flex flex-col">
                <motion.p
                  variants={item}
                  custom={2}
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80"
                >
                  {s.kind}
                </motion.p>
                <motion.h3
                  variants={item}
                  custom={3}
                  className="mt-2 text-xl md:mt-3 md:text-3xl font-medium leading-tight tracking-tight"
                >
                  <Link
                    href={s.href}
                    tabIndex={current ? undefined : -1}
                    className="hover:text-[#03F9BE]"
                  >
                    {s.title}
                  </Link>
                </motion.h3>
                {hasQuote && (
                  <motion.blockquote
                    variants={item}
                    custom={4}
                    className="mt-3 text-sm text-white/85 leading-relaxed md:mt-8 md:text-[15px] xl:mt-auto xl:pt-10"
                  >
                    &ldquo;{s.quote}&rdquo;
                  </motion.blockquote>
                )}
                {hasQuote && s.attribution && (
                  <motion.p
                    variants={item}
                    custom={5}
                    className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white md:mt-4 md:text-xs"
                  >
                    {s.attribution}
                  </motion.p>
                )}
                {!hasQuote && stats}
                <motion.div
                  variants={item}
                  custom={6}
                  className={cn(
                    "self-start",
                    hasQuote ? "mt-4 md:mt-7" : "pt-1",
                  )}
                >
                  <Link
                    href={s.href}
                    tabIndex={current ? undefined : -1}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1F2A5C] transition hover:bg-[#03F9BE] md:px-5 md:py-2.5"
                  >
                    {s.kind === "Newsroom"
                      ? "Read the article"
                      : "Read the case study"}
                    <PiArrowRightBold
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </motion.div>
              </div>

              {hasQuote && stats}
            </motion.div>
          </article>
        );
      })}

      {/* The notch: a page-coloured disc over the panel's right edge, with
          the arrow sitting in it. */}
      <button
        type="button"
        onClick={next}
        aria-label="Next case study"
        className="group absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-[#1F2A5C] transition hover:text-[#3B7FE8] md:flex lg:h-16 lg:w-16"
      >
        <PiArrowRightBold
          aria-hidden="true"
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
      {/* Under the card: round back/next arrows and a counter on phones
          (no room for the notch there), and the link to every case study. */}
      <div className="mt-4 flex items-center justify-between gap-4 md:mt-5 md:justify-end">
        <div className="flex items-center gap-2 md:hidden">
          {(
            [
              ["Previous case study", back, PiArrowLeftBold],
              ["Next case study", next, PiArrowRightBold],
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
          <span className="ml-1 text-sm tabular-nums text-gray-500">
            {index + 1} / {stories.length}
          </span>
        </div>
        <Link
          href={isUS ? "/us/case-studies" : "/case-studies"}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F2A5C] hover:text-[#3B7FE8]"
        >
          View all case studies
          <PiArrowRightBold
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
