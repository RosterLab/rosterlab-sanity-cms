"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuGraduationCap,
  LuHeadset,
  LuLandmark,
  LuPlane,
  LuStore,
  LuUtensils,
} from "react-icons/lu";
import Container from "@/components/ui/Container";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Industries";

// Fades a tab's text up into place. `both` holds the start frame through each
// element's delay, so the stagger doesn't flash the text in first.
const FADE_UP =
  "motion-safe:animate-[rl-fade-up_500ms_cubic-bezier(0.22,1,0.36,1)_both]";

interface WorkforceGroup {
  name: string;
  /**
   * Tile illustration: a transparent webp of blue line art, about 400px
   * tall, trimmed to the figures. Shown with `contain`, so shapes can vary.
   */
  illustration: string;
  description: string;
  /** The group's roster-type landing page. */
  href: string;
  /** Link text for `href`; "Explore {name} rostering" where that reads well. */
  linkLabel: string;
  /** The few features that matter most to this group, listed beside its copy. */
  features: WorkforceFeature[];
}

interface WorkforceFeature {
  title: string;
  /** One or two sentences on what the feature does for this group. */
  description: string;
  /**
   * Product mockup, 1:1 (1100×1100 or larger). Not shown by the current
   * tiles-and-list layout; kept so the supplied mockups stay wired up for
   * reuse.
   */
  image?: { src: string; alt: string };
}

const WORKFORCE_GROUPS: WorkforceGroup[] = [
  {
    name: "Nursing",
    illustration: "/landing/workforce/illustrations/nursing.webp",
    href: "/industries/healthcare/nurse-rostering",
    linkLabel: "Explore nurse rostering",
    description:
      "Balance skill mix, ratios and a fair spread of nights and weekends across every ward, while honouring agreements and staff preferences.",
    features: [
      {
        title: "Shift preferences, straight from staff",
        description:
          "Nurses send shift preferences and special requests from the app, and they land on the manager's roster the moment they are sent. The AI then fits as many as it can while keeping the ward covered.",
        image: {
          src: "/landing/workforce/nursing-preferences.webp",
          alt: "A nurse picks a Short Day preference in the RosterLab app and it appears on the manager's Preferences view for the roster period",
        },
      },
      {
        title: "Fair nights & weekends",
        description:
          "Nights, weekends and public holidays are shared out evenly over the roster period, with the count visible to the whole team.",
      },
    ],
  },
  {
    name: "Junior doctors",
    illustration: "/landing/workforce/illustrations/junior-doctors.webp",
    href: "/industries/healthcare/junior-medical-officer-rostering",
    linkLabel: "Explore junior doctor rostering",
    description:
      "Cover every shift with compliant rosters that respect fatigue rules, protect training time and share nights and weekends fairly.",
    features: [
      {
        title: "Fatigue & safe-hours checks",
        description:
          "Maximum hours, minimum breaks and limits on consecutive nights are built into the roster, so safe-hours breaches are caught before they are rostered.",
      },
      {
        title: "Protected training time",
        description:
          "Teaching sessions, clinics and exam leave are blocked out first, and the roster is built around them rather than over them.",
      },
    ],
  },
  {
    name: "Senior doctors & consultants",
    illustration: "/landing/workforce/illustrations/senior-doctors.webp",
    href: "/industries/healthcare/senior-medical-officer-rostering",
    linkLabel: "Explore senior doctor rostering",
    description:
      "Plan sessions, on-call and leave across every service, with a fair share of after-hours work and clear visibility for the whole team.",
    features: [
      {
        title: "On-call & session planning",
        description:
          "Plan sessions, on-call and after-hours cover together, with a fair share of unsociable work across every consultant in the service.",
      },
      {
        title: "Leave across the service",
        description:
          "See every leave request against the service's cover in one place, and approve with confidence that clinics and lists stay staffed.",
      },
    ],
  },
  {
    name: "Allied health",
    illustration: "/landing/workforce/illustrations/allied-health.webp",
    href: "/industries/healthcare",
    linkLabel: "Explore allied health rostering",
    description:
      "Roster allied health teams across clinics, wards and sites by skill and availability, so every service has the right people on hand.",
    features: [
      {
        title: "Skill-based allocation across sites",
        description:
          "Match each clinician's skills and credentials to the clinics, wards and sites that need them, and keep travel between sites to a minimum.",
      },
    ],
  },
  {
    name: "Management",
    illustration: "/landing/workforce/illustrations/management.webp",
    // No management landing page yet, so this points at the healthcare hub.
    href: "/industries/healthcare",
    linkLabel: "Explore rostering for managers",
    description:
      "Give managers one view of coverage, cost and compliance across every team, with the detail to act on gaps before they reach the floor.",
    features: [
      {
        title: "Coverage & cost at a glance",
        description:
          "Coverage, overtime and agency spend for every team on one screen, so gaps and cost blow-outs are visible before the roster goes live.",
      },
      {
        title: "Compliance across every team",
        description:
          "Award, agreement and fatigue rules are checked on every roster across the organisation, with a clear audit trail when questions come up.",
      },
    ],
  },
];

interface OtherIndustry {
  name: string;
  icon: IconType;
  description: string;
  href: string;
}

const OTHER_INDUSTRIES: OtherIndustry[] = [
  {
    name: "Hospitality",
    icon: LuUtensils,
    description:
      "Match staff to bookings and peak service times across venues, without blowing out wage costs.",
    href: "/industries/hospitality-roster",
  },
  {
    name: "24/7 support teams",
    icon: LuHeadset,
    description:
      "Keep round-the-clock queues covered with fair shift patterns and fewer last-minute gaps.",
    href: "/industries/call-centre-rostering",
  },
  {
    name: "Retail",
    icon: LuStore,
    description:
      "Balance staff coverage with sales demand to keep customers happy and labour costs down.",
    href: "/industries/retail-roster",
  },
  {
    name: "Education",
    icon: LuGraduationCap,
    description:
      "Schedule teaching and support staff across timetables, campuses and term dates.",
    href: "/industries/education-roster",
  },
  {
    name: "Airport & transportation",
    icon: LuPlane,
    description:
      "Roster ground crew and operations staff around schedules, certifications and fatigue rules.",
    href: "/industries/airports-and-transportation-roster",
  },
  {
    name: "Public services",
    icon: LuLandmark,
    description:
      "Meet award conditions and service levels across departments, sites and shifts.",
    href: "/industries/public-services-roster",
  },
];

/**
 * A card with a row of group tiles over the active group's detail: its copy
 * and link on the left, its key features as a divided list on the right.
 * Clicking a tile (or arrowing to it) switches the group in place.
 */
function WorkforceGroups() {
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = WORKFORCE_GROUPS.length;
  const [active, setActive] = useState(0);
  const group = WORKFORCE_GROUPS[active];

  const select = (i: number) => {
    trackButtonClick(`Workforce group: ${WORKFORCE_GROUPS[i].name}`, LOCATION);
    setActive(i);
  };

  // Arrow keys move between tabs, as the tabs pattern expects.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = count - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          Rostering tailored to every healthcare workforce group
        </h2>
        <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
          RosterLab adapts to the rules, working patterns, and staffing
          requirements unique to each workforce group.
        </p>
      </div>

      <div className="mt-10 md:mt-12 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        {/* Group tiles. A swipeable row on phones, five across from md. */}
        <div
          role="tablist"
          aria-label="Healthcare workforce groups"
          className="flex gap-3 overflow-x-auto snap-x pt-1 md:pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-5 md:overflow-visible"
        >
          {WORKFORCE_GROUPS.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
                className={`group relative flex h-44 w-36 shrink-0 snap-start flex-col items-center overflow-hidden rounded-xl border px-3 pb-3 pt-4 transition duration-300 ease-out active:scale-[0.97] md:h-56 md:w-auto ${
                  selected
                    ? "border-blue-200 bg-white shadow-md"
                    : "border-gray-200 bg-slate-50 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
                }`}
              >
                <span
                  className={`text-center text-sm md:text-base font-medium leading-tight transition-colors ${
                    selected
                      ? "text-gray-900"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {g.name}
                </span>
                {/* Faded to grey off-tab, so the active group is the one
                    in colour. Hovering brings a tile's colour up, and picking
                    one lets its colour wash in slowly. */}
                <span className="relative z-10 mt-2 w-full flex-1">
                  <Image
                    src={g.illustration}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 220px, 144px"
                    className={`object-contain object-bottom transition duration-500 ease-out ${
                      selected
                        ? ""
                        : "opacity-40 grayscale group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mx-1 mt-3 border-t border-gray-200" />

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
        >
          {/* Keyed by group so the detail replays its entrance. */}
          <div
            key={group.name}
            className={`grid grid-cols-1 gap-10 px-4 py-8 md:px-10 md:py-12 lg:grid-cols-2 lg:gap-16 ${FADE_UP}`}
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {group.name}
              </h3>
              <p className="mt-4 max-w-md text-base md:text-lg text-gray-600 leading-relaxed">
                {group.description}
              </p>
              <Link
                href={group.href}
                onClick={() =>
                  trackSmartButtonClick(group.linkLabel, group.href, LOCATION, {
                    workforce_group: group.name,
                  })
                }
                className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm md:text-base font-semibold text-gray-900 transition hover:border-blue-600 hover:text-blue-700"
              >
                {group.linkLabel}
                <LuArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <ul className="divide-y divide-gray-200">
              {group.features.map((f) => (
                <li key={f.title} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900">
                    {f.title}
                  </h4>
                  <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-14 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Scale rostering across departments and workforce groups.
            </span>
          </p>
          <Link
            href="/pricing"
            onClick={() =>
              trackSmartButtonClick(
                "Explore enterprise rostering",
                "/pricing",
                LOCATION,
              )
            }
            className="group mt-2 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
          >
            Explore enterprise rostering
            <LuArrowRight
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              Looking for your specialty?
            </span>{" "}
            Explore rostering for Emergency &amp; Critical Care, Radiology,
            Surgery &amp; Perioperative, and more.
          </p>
          <Link
            href="/industries/healthcare"
            onClick={() =>
              trackSmartButtonClick(
                "View all healthcare specialties",
                "/industries/healthcare",
                LOCATION,
              )
            }
            className="group mt-2 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
          >
            View all healthcare specialties
            <LuArrowRight
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function OtherIndustries() {
  const [active, setActive] = useState(0);
  const industry = OTHER_INDUSTRIES[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10 lg:gap-16 items-start">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
          Workforce management for shift-based industries
        </h2>
        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          RosterLab brings intelligent rostering and workforce optimisation to
          shift-based teams across a range of industries.
        </p>
        <Link
          href="/industries"
          onClick={() =>
            trackSmartButtonClick(
              "View all industries",
              "/industries",
              LOCATION,
            )
          }
          className="group mt-6 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
        >
          View all industries
          <LuArrowRight
            aria-hidden="true"
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {OTHER_INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const selected = i === active;
            return (
              <button
                key={ind.name}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActive(i);
                  trackButtonClick(`Industry: ${ind.name}`, LOCATION);
                }}
                className={`flex items-center gap-3 rounded-xl px-3 sm:px-4 py-4 text-left text-sm md:text-base font-semibold leading-snug transition ${
                  selected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-900 border border-gray-200 hover:border-blue-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    selected ? "bg-white/15" : "bg-blue-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${selected ? "text-white" : "text-blue-600"}`}
                  />
                </span>
                {ind.name}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl bg-white border border-gray-200 border-l-4 border-l-blue-600 px-6 py-5"
        >
          <p className="flex-1 text-sm md:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              {industry.name}.
            </span>{" "}
            {industry.description}
          </p>
          <Link
            href={industry.href}
            onClick={() =>
              trackSmartButtonClick(
                `Learn more: ${industry.name}`,
                industry.href,
                LOCATION,
              )
            }
            aria-label={`Learn more about ${industry.name} rostering`}
            className="group shrink-0 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
          >
            Learn more
            <LuArrowRight
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

/*
  Two sections rather than one, so the page can set other content — the
  testimonials — between the healthcare groups and the other industries.
*/
export function HealthcareWorkforceSection() {
  return (
    <section className="py-20 md:py-24">
      <Container className="lg:px-12 xl:px-20">
        <WorkforceGroups />
      </Container>
    </section>
  );
}

export function OtherIndustriesSection() {
  return (
    <section className="py-20 md:py-24">
      <Container className="lg:px-12 xl:px-20">
        <OtherIndustries />
      </Container>
    </section>
  );
}
