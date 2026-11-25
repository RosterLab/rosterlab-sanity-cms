"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

import { alliedHealthCopy, alliedHealthHref } from "./localization";

interface Discipline {
  name: string;
  description: string;
  details: string[];
  link?: { label: string; href: string };
}

const GLOBAL_DISCIPLINES: Discipline[] = [
  {
    name: "Medical imaging & radiography",
    description:
      "Assign radiographers to CT, MRI and X-ray based on their modality skills, while keeping imaging services covered across sites and after hours.",
    details: [
      "Modality cover",
      "Multi-site allocations",
      "After-hours & on-call",
    ],
    link: {
      label: "Explore radiography rostering",
      href: "/industries/healthcare/radiography",
    },
  },
  {
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
    name: "Clinical physiology",
    description:
      "Build rosters around specialist test lists, from echocardiography to lung function testing, and coordinate staff who work across clinics.",
    details: [
      "Test-specific competencies",
      "Specialist clinic lists",
      "Shared staff across clinics",
    ],
  },
  {
    name: "Audiology",
    description:
      "Match audiologists to paediatric clinics and specialist hearing or balance tests, including when clinicians work across multiple sites.",
    details: [
      "Paediatric clinic cover",
      "Diagnostic test skills",
      "Multi-site clinic staffing",
    ],
  },
  {
    name: "Physiotherapy",
    description:
      "Cover priority wards and specialist services, such as respiratory care or ED, while sharing weekend duties across eligible staff.",
    details: [
      "Acute ward cover",
      "Specialist service skills",
      "Weekend rotations",
    ],
  },
  {
    name: "Occupational therapy",
    description:
      "Make time for discharge assessments alongside rehabilitation sessions and community visits, with therapists assigned where they’re needed.",
    details: [
      "Discharge assessment cover",
      "Acute & rehab allocations",
      "Community visit time",
    ],
  },
  {
    name: "Podiatry",
    description:
      "Roster clinicians with high-risk foot expertise and plan clinic staffing around demand, including capacity for urgent referrals.",
    details: [
      "High-risk foot cover",
      "Ward referral cover",
      "Clinic & outreach staffing",
    ],
  },
  {
    name: "Pharmacy",
    description:
      "Allocate pharmacists across wards and dispensary shifts, with specialist expertise where services need it and cover for weekends and on-call duties.",
    details: [
      "Ward & dispensary cover",
      "Specialist pharmacy skills",
      "Weekend & on-call duties",
    ],
  },
  {
    name: "Anaesthetic technology",
    description:
      "Assign anaesthetic technicians to planned theatre lists and make sure emergency work has technician cover after hours.",
    details: [
      "Theatre list allocations",
      "Emergency theatre cover",
      "On-call rotations",
    ],
  },
  {
    name: "Mental health",
    description:
      "Build acute and community crisis rosters with the mix of clinicians needed on each shift, including overnight and on-call cover.",
    details: [
      "Crisis response cover",
      "Multidisciplinary skill mix",
      "Overnight & on-call",
    ],
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
    description: copy(discipline.description),
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

  function select(index: number) {
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
            className={`max-w-full rounded-full px-3 py-2.5 text-left text-sm font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B7FE8] sm:px-4 sm:text-base ${
              active === index
                ? "bg-[#2563EB] text-white"
                : "text-[#1F2A5C] hover:bg-white"
            }`}
          >
            {discipline.name}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl bg-[#2563EB] md:mt-8 md:rounded-3xl lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Reserved for discipline photography in a later update. */}
        <div
          aria-hidden="true"
          className="aspect-[16/10] bg-[#DFE7F5] sm:aspect-video lg:aspect-auto"
        />
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
              className={`min-w-0 p-6 text-white lg:[grid-area:1/1] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#03F9BE] sm:p-8 lg:p-10 ${
                active === index
                  ? "block"
                  : "hidden lg:invisible lg:pointer-events-none lg:block"
              }`}
            >
              <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-tight sm:text-2xl lg:text-3xl">
                {discipline.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white lg:text-lg">
                {discipline.description}
              </p>
              <ul className="mt-5 grid gap-y-2.5 text-sm leading-relaxed text-white sm:flex sm:flex-wrap sm:gap-x-5 lg:mt-6 lg:text-base">
                {discipline.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#03F9BE]"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
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
                  className="group mt-5 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm py-2 text-sm font-medium leading-relaxed text-white sm:text-base lg:mt-6 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#03F9BE]"
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
    </div>
  );
}
