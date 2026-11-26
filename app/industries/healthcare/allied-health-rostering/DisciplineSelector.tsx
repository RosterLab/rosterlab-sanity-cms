"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

import { alliedHealthCopy, alliedHealthHref } from "./localization";

interface Discipline {
  label?: string;
  name: string;
  description: string;
  practitioners?: string;
  details: string[];
  link?: { label: string; href: string };
}

const GLOBAL_DISCIPLINES: Discipline[] = [
  {
    name: "Medical imaging",
    description:
      "Balance complex skill mixes, equipment availability and staffing needs across imaging modalities while meeting fatigue and union requirements.",
    details: [
      "Modality & skill mix",
      "Rest & sleep rules",
      "Fair on-call allocation",
    ],
    link: {
      label: "Explore radiography rostering",
      href: "/industries/healthcare/radiography",
    },
  },
  {
    label: "Pathology & lab",
    name: "Pathology & laboratory services",
    description:
      "Match staff to haematology, biochemistry and transfusion benches, with independent overnight cover and time for supervised training.",
    details: [
      "Bench competencies",
      "24/7 core lab cover",
      "Supervised bench rotations",
    ],
    link: {
      label: "Explore pathology rostering",
      href: "/industries/healthcare/pathology-rostering",
    },
  },
  {
    label: "Anaesthetic tech",
    name: "Anaesthetic technology",
    description:
      "Coordinate technician allocations around surgical lists, specialist competencies and clinical team requirements.",
    details: [
      "Theatre & list allocations",
      "Clinical team coordination",
      "Skill mix & supervision",
    ],
  },
  {
    label: "Pharmacy",
    name: "Pharmacy",
    description:
      "Balance staffing across wards, dispensaries and specialist pharmacy services.",
    details: ["Service coverage", "Specialist skills", "Weekend & on-call"],
  },
  {
    label: "Mental health",
    name: "Mental health",
    description:
      "Balance multidisciplinary teams, specialist competencies and staffing requirements across inpatient, community and crisis services.",
    details: [
      "Multidisciplinary skill mix",
      "Cross-service allocations",
      "Specialist & senior cover",
    ],
  },
  {
    name: "Other Services",
    description:
      "Plan cover for ward referrals, specialist clinics, rehabilitation sessions and community visits, allocating practitioners according to the clinical expertise each service needs.",
    practitioners:
      "Physiotherapy · Occupational therapy · Clinical physiology · Podiatry · Audiology",
    details: [],
  },
];

const LOCATION = "Allied Health Discipline Selector";

export default function DisciplineSelector({
  isUS = false,
}: {
  isUS?: boolean;
}) {
  const copy = (text: string) => alliedHealthCopy(text, isUS);
  const DISCIPLINES = GLOBAL_DISCIPLINES.map((discipline) => ({
    ...discipline,
    name: copy(discipline.name),
    label: copy(discipline.label ?? discipline.name),
    description: copy(discipline.description),
    practitioners: discipline.practitioners
      ? copy(discipline.practitioners)
      : undefined,
    details: discipline.details.map(copy),
    link: discipline.link
      ? {
          label: copy(discipline.link.label),
          href: alliedHealthHref(discipline.link.href, isUS),
        }
      : undefined,
  }));
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const card = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) setIsPlaying(false);
    const onMotion = () => {
      if (motion.matches) setIsPlaying(false);
    };
    const onVisibility = () => setIsDocumentVisible(!document.hidden);
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (card.current) observer.observe(card.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || hasFocus || !isInView || !isDocumentVisible)
      return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      elapsed.current += now - previous;
      previous = now;
      if (elapsed.current >= 10000) {
        elapsed.current = 0;
        setActive((index) => (index + 1) % GLOBAL_DISCIPLINES.length);
      }
      setProgress(elapsed.current / 10000);
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying, hasFocus, isInView, isDocumentVisible]);

  function select(index: number) {
    elapsed.current = 0;
    setProgress(0);
    setActive(index);
    trackButtonClick(`Discipline: ${DISCIPLINES[index].name}`, LOCATION);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % DISCIPLINES.length;
        break;
      case "ArrowLeft":
        next = (index + DISCIPLINES.length - 1) % DISCIPLINES.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = DISCIPLINES.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className="mx-auto mt-12 max-w-6xl md:mt-16">
      <h2 className="mx-auto max-w-3xl text-balance text-center text-lg font-medium leading-snug tracking-tight text-[#1F2A5C] md:text-xl">
        {copy("Allied health rostering tailored to your discipline")}
      </h2>

      <div
        role="tablist"
        aria-label="Allied health disciplines"
        className="mt-8 flex flex-wrap justify-center gap-x-1 gap-y-2 border-b border-[#1F2A5C]/15 pb-5 md:mt-10 md:gap-x-2 md:gap-y-3 md:pb-8"
      >
        {DISCIPLINES.map((discipline, index) => (
          <button
            key={discipline.name}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={active === index}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`max-w-full rounded-full border px-3 py-2.5 text-left text-sm font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B7FE8] sm:px-4 sm:text-base ${
              active === index
                ? "border-[#2563EB] bg-[#2563EB] text-white"
                : "border-[#1F2A5C]/10 bg-white text-[#1F2A5C] hover:border-[#2563EB]/40 hover:bg-blue-50"
            }`}
          >
            {discipline.label}
          </button>
        ))}
      </div>

      <div
        ref={card}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setHasFocus(false);
        }}
        className="mt-6 rounded-2xl border border-[#1F2A5C]/10 bg-white p-3 md:mt-8 md:rounded-3xl md:p-4 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-4"
      >
        {/* Reserved for discipline photography in a later update. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#EDF3FB] sm:aspect-video lg:aspect-auto lg:rounded-2xl">
          <div
            className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-0.5"
            aria-label="Discipline slideshow controls"
          >
            {DISCIPLINES.map((discipline, index) => (
              <button
                key={discipline.name}
                type="button"
                aria-label={`Show ${discipline.name}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => select(index)}
                className="flex h-8 min-w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563EB]"
              >
                <span
                  aria-hidden="true"
                  className={`relative block h-2 overflow-hidden rounded-full bg-white ring-1 ring-[#1F2A5C]/10 ${active === index ? "w-10" : "w-2"}`}
                >
                  {active === index && (
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-[#2563EB]"
                      style={{ transform: `scaleX(${progress})` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Desktop panels share a height; mobile content uses only the space it needs. */}
        <div className="lg:grid">
          {DISCIPLINES.map((discipline, index) => (
            <div
              key={discipline.name}
              role="tabpanel"
              id={`${id}-panel-${index}`}
              aria-labelledby={`${id}-tab-${index}`}
              aria-hidden={active !== index}
              inert={active !== index}
              tabIndex={active === index ? 0 : -1}
              className={`min-w-0 px-3 py-6 text-[#1F2A5C] lg:[grid-area:1/1] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#03F9BE] sm:p-8 lg:p-10 ${
                active === index
                  ? "block"
                  : "hidden lg:invisible lg:pointer-events-none lg:block"
              }`}
            >
              <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-tight sm:text-2xl lg:text-3xl">
                {discipline.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-gray-600 lg:text-lg">
                {discipline.description}
              </p>
              {discipline.practitioners && (
                <ul className="mt-6 grid gap-x-6 gap-y-3 border-t border-[#1F2A5C]/10 pt-5 text-sm font-medium leading-relaxed text-[#1F2A5C] sm:grid-cols-2 lg:text-base">
                  {discipline.practitioners.split(" · ").map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              )}
              {discipline.details.length > 0 && (
                <ul className="mt-5 grid gap-y-2.5 text-sm leading-relaxed text-gray-600 sm:flex sm:flex-wrap sm:gap-x-5 lg:mt-6 lg:text-base">
                  {discipline.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              {discipline.link && (
                <Link
                  href={discipline.link.href}
                  onClick={() =>
                    trackSmartButtonClick(
                      discipline.link!.label,
                      discipline.link!.href,
                      LOCATION,
                      { discipline: discipline.name },
                    )
                  }
                  className="group mt-5 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm py-2 text-sm font-medium leading-relaxed text-[#2563EB] sm:text-base lg:mt-6 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#03F9BE]"
                >
                  {discipline.link.label}
                  <PiArrowRightBold
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link
          href={alliedHealthHref("/enterprise", isUS)}
          onClick={() =>
            trackSmartButtonClick(
              "See RosterLab for Enterprise",
              alliedHealthHref("/enterprise", isUS),
              LOCATION,
            )
          }
          className="group inline-flex min-h-11 items-center gap-2 rounded-sm py-2 text-sm font-semibold text-[#2563EB] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] md:text-base"
        >
          See RosterLab for Enterprise
          <PiArrowRightBold
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
