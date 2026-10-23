"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  PiArrowRightBold,
  PiUsersThree,
  PiSmiley,
  PiTimer,
} from "react-icons/pi";
import type { IconType } from "react-icons";
import { trackButtonClick } from "@/components/analytics/tracking";
import CountUp from "./CountUp";

// `tint` is one of the palette's data-chip tints, behind the metric's icon.
const OUTCOMES: {
  stat: string;
  label: string;
  icon: IconType;
  tint: string;
}[] = [
  {
    stat: "90%",
    label: "less time spent on rostering",
    icon: PiTimer,
    tint: "bg-[#9CE4FF]",
  },
  {
    stat: "5%",
    label: "improvement in staffing efficiency",
    icon: PiUsersThree,
    tint: "bg-[#FFD08A]",
  },
  {
    stat: "10%",
    label: "improvement in staff satisfaction",
    icon: PiSmiley,
    tint: "bg-[#C7D2FF]",
  },
];

const QUOTE =
  "“The introduction of Rosterlab is an important step forward in how we support our junior doctors. By improving transparency, enabling preferences, and simplifying processes such as shift swaps, we are supporting both wellbeing and a more positive training experience.”";

/**
 * The running order, in seconds from the moment the block is a third on
 * screen. One clock for the whole block — rather than each piece waiting to
 * scroll into view on its own — so the order holds however fast the reader
 * scrolls: the three metrics land in turn and count up, the quote card
 * fades in as the last count settles, then the newsroom strip and the link
 * follow.
 */
const T = {
  stat: (i: number) => 0.15 + i * 0.35,
  count: (i: number) => 0.35 + i * 0.35,
  quote: 1.3,
  newsroom: 2.0,
  cta: 2.3,
};

/** Expo-out: quick to arrive, long soft settle. Reads as weighty, not bouncy. */
const EASE = [0.16, 1, 0.3, 1] as const;

export default function EnterpriseOutcomes({
  newsroom,
  analyticsLocation,
}: {
  newsroom: { title: string; href: string; image: string };
  analyticsLocation: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const state = inView ? "show" : "hidden";

  // Fade in with a short lift. Under reduced motion it is a plain fade.
  const rise = (delay: number, y = 24): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : 1.2, delay, ease: EASE },
    },
  });
  const pop = (delay: number): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -12 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: reduce
        ? { duration: 0.3, delay }
        : { type: "spring", stiffness: 420, damping: 18, delay },
    },
  });

  return (
    <div ref={ref}>
      {/* The three metrics stack on the left, number and label on one line;
          the quote takes the right column at full height.

          The quote, metrics and newsroom strip read as one block: only its
          top-right and bottom-left corners are rounded, and every other
          corner is square. */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
        <dl className="grid gap-3">
          {OUTCOMES.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.stat}
                initial="hidden"
                animate={state}
                variants={rise(T.stat(i))}
                whileHover={reduce ? undefined : { y: -3 }}
                className={`flex items-center gap-5 bg-white px-7 py-4 shadow-[0_1px_2px_rgba(31,42,92,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-12px_rgba(31,42,92,0.25)] ${i === 0 ? "rounded-tr-3xl md:rounded-none" : ""}`}
              >
                <motion.span
                  aria-hidden="true"
                  initial="hidden"
                  animate={state}
                  variants={pop(T.stat(i) + 0.15)}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${o.tint}`}
                >
                  <Icon className="h-6 w-6 text-[#1F2A5C]" />
                </motion.span>
                {/* <dt> first, as a <dl> group needs; the number is drawn
                    first with `order`. */}
                <dt className="order-2 min-w-0 flex-1 text-gray-600 leading-snug">
                  {o.label}
                </dt>
                <dd className="order-1 w-[2.25em] shrink-0 text-4xl md:text-5xl font-medium tabular-nums tracking-tight text-[#1F2A5C]">
                  <CountUp
                    value={o.stat}
                    play={inView}
                    delay={T.count(i)}
                    duration={1.6}
                  />
                </dd>
              </motion.div>
            );
          })}
        </dl>

        <motion.figure
          initial="hidden"
          animate={state}
          variants={rise(T.quote, 32)}
          className="flex flex-col justify-between gap-6 bg-[#1F2A5C] p-7 md:rounded-tr-3xl"
        >
          <blockquote className="text-base md:text-[17px] font-medium text-white leading-relaxed">
            {QUOTE}
          </blockquote>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <figcaption className="text-sm">
              <span className="block font-semibold text-white">Natalie</span>
              <span className="block text-[#8A97B8]">
                Deputy Director of Medical Services, Western Australia Health
              </span>
            </figcaption>
          </div>
        </motion.figure>
      </div>

      {/* Newsroom callout: image on the left, a white panel on the right; the
          image's bottom-left is the block's one rounded corner down here. */}
      <motion.div
        initial="hidden"
        animate={state}
        variants={rise(T.newsroom)}
        className="mx-auto mt-6 max-w-5xl"
      >
        <Link
          href={newsroom.href}
          className="group grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          <div className="relative aspect-[16/7] h-full overflow-hidden bg-white sm:aspect-auto sm:min-h-40 sm:rounded-bl-3xl sm:bg-slate-200">
            <Image
              src={newsroom.image}
              alt=""
              fill
              sizes="(min-width: 640px) 400px, 100vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:object-cover"
            />
          </div>
          <div className="flex flex-col justify-center rounded-b-3xl bg-white p-6 sm:rounded-none md:px-10 md:py-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#3B7FE8]">
              Newsroom
            </span>
            <span className="mt-2 text-base md:text-[17px] font-semibold italic text-[#1F2A5C] leading-relaxed">
              {newsroom.title}
            </span>
            <span className="mt-4 inline-flex items-center gap-1 self-start border-b-2 border-[#3B7FE8] pb-0.5 font-semibold text-[#2A3F8F] group-hover:text-[#1F2A5C]">
              Read the announcement
              <PiArrowRightBold
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={state}
        variants={rise(T.cta, 12)}
        className="mt-10 flex justify-center md:mt-12"
      >
        <Link
          href="/tools/roi-calculator"
          onClick={() =>
            trackButtonClick("Calculate your ROI", analyticsLocation, {
              cta_type: "roi_calculator",
              page_name: "Enterprise",
              section: "roi",
            })
          }
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F2A5C] hover:text-[#3B7FE8]"
        >
          Calculate your ROI
          <PiArrowRightBold
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </div>
  );
}
