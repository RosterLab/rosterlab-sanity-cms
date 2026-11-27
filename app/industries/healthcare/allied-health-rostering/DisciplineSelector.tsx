"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

import {
  alliedHealthCopy,
  alliedHealthHref,
  alliedHealthImage,
} from "./localization";

interface Discipline {
  label?: string;
  name: string;
  description: string;
  practitioners?: string;
  details: string[];
  link?: { label: string; href: string };
  image?: { src: string; alt: string };
}

const GLOBAL_DISCIPLINES: Discipline[] = [
  {
    name: "Medical imaging",
    description:
      "Match staff with the right skills to cover imaging equipment and service needs, while accounting for fatigue and employment requirements.",
    details: [
      "Modality & skill mix",
      "Rest & sleep rules",
      "Fair on-call allocation",
    ],
    link: {
      label: "Explore radiography rostering",
      href: "/industries/healthcare/radiography",
    },
    image: {
      src: "/images/industries/allied-health/discipline-medical-imaging-v14.webp",
      alt: "Radiographer with a patient beside a scanner, next to a RosterLab roster of multi-skilled imaging staff covering CT, MRI, ultrasound and X-ray every day",
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
    image: {
      src: "/images/industries/allied-health/discipline-pathology-v12.webp",
      alt: "Laboratory scientist at a microscope, next to a RosterLab demand for haematology, biochemistry and senior cover on night shifts, with at most one trainee",
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
    image: {
      src: "/images/industries/allied-health/discipline-anaesthetic-technology-v14.webp",
      alt: "Anaesthetic technician in theatre, next to the RosterLab shift view split by cardiac theatre, paediatric theatre and on-call, with technicians allocated each day",
    },
  },
  {
    label: "Pharmacy",
    name: "Pharmacy",
    description:
      "Balance staffing across wards, dispensaries and specialist pharmacy services.",
    details: ["Service coverage", "Specialist skills", "Weekend & on-call"],
    image: {
      src: "/images/industries/allied-health/discipline-pharmacy-v12.webp",
      alt: "Pharmacist checking stock in a dispensary, next to a RosterLab open shift card for a Saturday pharmacy day shift with on-call overnight",
    },
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
    image: {
      src: "/images/industries/allied-health/discipline-mental-health-v12.webp",
      alt: "Clinician in a one-on-one session, next to a RosterLab roster of a psychologist, occupational therapist, social worker and senior psychologist across inpatient, community and crisis services",
    },
  },
  {
    name: "Therapy & other services",
    description:
      "Plan cover for ward referrals, specialist clinics, rehabilitation sessions and community visits, allocating practitioners according to the clinical expertise each service needs.",
    practitioners:
      "Physiotherapy · Occupational therapy · Clinical physiology · Podiatry · Audiology",
    details: [],
    image: {
      src: "/images/industries/allied-health/discipline-other-services-v14.webp",
      alt: "Physiotherapist guiding a patient through a rehab exercise, next to RosterLab notifications for physiotherapy, audiology and podiatry staff",
    },
  },
];

const LOCATION = "Allied Health Discipline Selector";

export default function DisciplineSelector({
  isUS = false,
}: {
  isUS?: boolean;
}) {
  const copy = (text: string) => alliedHealthCopy(text, isUS);
  const disciplines = GLOBAL_DISCIPLINES.map((discipline) => ({
    ...discipline,
    name: copy(discipline.name),
    label: copy(discipline.label ?? discipline.name),
    description: copy(discipline.description),
    practitioners: discipline.practitioners
      ? copy(discipline.practitioners)
      : undefined,
    details: discipline.details.map(copy),
    image: discipline.image
      ? {
          ...discipline.image,
          src: alliedHealthImage(discipline.image.src, isUS),
          alt: copy(discipline.image.alt),
        }
      : undefined,
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
  const activeImage = disciplines[active].image;

  function select(index: number) {
    setActive(index);
    trackButtonClick(`Discipline: ${disciplines[index].name}`, LOCATION);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % disciplines.length;
        break;
      case "ArrowLeft":
        next = (index + disciplines.length - 1) % disciplines.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = disciplines.length - 1;
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
        {disciplines.map((discipline, index) => (
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

      <div className="mt-6 rounded-2xl border border-[#1F2A5C]/10 bg-white p-3 md:mt-8 md:rounded-3xl md:p-4 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-4">
        {/* Preserve the full artwork; the controls have their own blue strip. */}
        <div className="self-center overflow-hidden rounded-xl bg-[#3779DD] lg:rounded-2xl">
          <div className="relative aspect-[4/3]">
            {activeImage && (
              <Image
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                unoptimized
                className="object-contain"
              />
            )}
          </div>
          <div
            className="flex items-center justify-center gap-0.5 px-3 pb-2 pt-1"
            aria-label="Discipline selection controls"
          >
            {disciplines.map((discipline, index) => (
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
                  className={`block h-2 rounded-full bg-white ring-1 ring-[#1F2A5C]/10 ${active === index ? "w-10" : "w-2"}`}
                />
              </button>
            ))}
          </div>
        </div>
        {/* Desktop panels share a height; mobile content uses only the space it needs. */}
        <div className="lg:grid">
          {disciplines.map((discipline, index) => (
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
