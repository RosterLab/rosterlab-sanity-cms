"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuChevronRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import {
  trackButtonClick,
  trackSmartButtonClick,
} from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Industries";

// The brand-blue wash the testimonials band uses.
const CARD_TINT = "rgba(55, 121, 221, 0.07)";

// Fades a tab's text up into place. `both` holds the start frame through each
// element's delay, so the stagger doesn't flash the text in first.
const FADE_UP =
  "motion-safe:animate-[rl-fade-up_500ms_cubic-bezier(0.22,1,0.36,1)_both]";

export interface WorkforceGroup {
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

export interface WorkforceFeature {
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

const WORKFORCE_GROUPS_AU: WorkforceGroup[] = [
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
];

export interface OtherIndustry {
  name: string;
  href: string;
}

const OTHER_INDUSTRIES_AU: OtherIndustry[] = [
  { name: "Hospitality", href: "/industries/hospitality-roster" },
  { name: "24/7 support teams", href: "/industries/call-centre-rostering" },
  { name: "Retail", href: "/industries/retail-roster" },
  { name: "Education", href: "/industries/education-roster" },
  {
    name: "Airport & transportation",
    href: "/industries/airports-and-transportation-roster",
  },
  { name: "Public services", href: "/industries/public-services-roster" },
];

/** Everything the healthcare workforce section says or links to. */
export interface WorkforceContent {
  heading: string;
  description: string;
  groups: WorkforceGroup[];
  /** The two follow-on prompts under the card. */
  enterprise: { lead: string; label: string; href: string };
  specialties: { lead: string; body: string; label: string; href: string };
}

export const WORKFORCE_CONTENT_AU: WorkforceContent = {
  heading: "Rostering tailored to every healthcare workforce group",
  description:
    "RosterLab adapts to the rules, working patterns, and staffing requirements unique to each workforce group.",
  groups: WORKFORCE_GROUPS_AU,
  enterprise: {
    lead: "Scale rostering across departments and workforce groups.",
    label: "Explore enterprise rostering",
    href: "/pricing",
  },
  specialties: {
    lead: "Looking for your specialty?",
    body: "Explore rostering for Emergency & Critical Care, Radiology, Surgery & Perioperative, and more.",
    label: "View all healthcare specialties",
    href: "/industries/healthcare",
  },
};

/** Everything the other-industries card says or links to. */
export interface OtherIndustriesContent {
  heading: string;
  description: string;
  viewAll: { label: string; href: string };
  industries: OtherIndustry[];
}

export const OTHER_INDUSTRIES_CONTENT_AU: OtherIndustriesContent = {
  heading: "Workforce management for shift-based industries",
  description:
    "RosterLab brings intelligent rostering and workforce optimisation to shift-based teams across a range of industries.",
  viewAll: { label: "View all industries", href: "/industries" },
  industries: OTHER_INDUSTRIES_AU,
};

/**
 * A card with a row of group tiles over the active group's detail: its copy
 * and link on the left, its key features as a divided list on the right.
 * Clicking a tile (or arrowing to it) switches the group in place.
 */
function WorkforceGroups({ content }: { content: WorkforceContent }) {
  const groups = content.groups;
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = groups.length;
  const [active, setActive] = useState(0);
  const group = groups[active];

  const select = (i: number) => {
    trackButtonClick(`Workforce group: ${groups[i].name}`, LOCATION);
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
      {/* Sized so the heading, tiles, detail and follow-on links fit on one
          laptop screen together. */}
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-3xl md:text-4xl lg:text-[min(2.25rem,2.8vw)] font-bold text-gray-900 leading-tight tracking-tight">
          {content.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base md:text-lg text-gray-600 leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        {/* Group tiles. A swipeable row on phones, four across from md. */}
        <div
          role="tablist"
          aria-label="Healthcare workforce groups"
          className="flex gap-3 overflow-x-auto snap-x pt-1 md:pt-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible"
        >
          {groups.map((g, i) => {
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
                className={`group relative flex h-44 w-36 shrink-0 snap-start flex-col items-center overflow-hidden rounded-xl border px-3 pb-3 pt-4 transition duration-300 ease-out active:scale-[0.97] md:h-36 md:w-auto ${
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
            className={`grid grid-cols-1 gap-8 px-4 py-6 md:px-8 lg:grid-cols-2 lg:gap-16 ${FADE_UP}`}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                {group.name}
              </h3>
              <p className="mt-3 max-w-md text-base text-gray-600 leading-relaxed">
                {group.description}
              </p>
              <Link
                href={group.href}
                onClick={() =>
                  trackSmartButtonClick(group.linkLabel, group.href, LOCATION, {
                    workforce_group: group.name,
                  })
                }
                className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm md:text-base font-semibold text-gray-900 transition hover:border-blue-600 hover:text-blue-700"
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
                <li key={f.title} className="py-3 first:pt-0 last:pb-0">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              {content.enterprise.lead}
            </span>
          </p>
          <Link
            href={content.enterprise.href}
            onClick={() =>
              trackSmartButtonClick(
                content.enterprise.label,
                content.enterprise.href,
                LOCATION,
              )
            }
            className="group mt-2 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
          >
            {content.enterprise.label}
            <LuArrowRight
              aria-hidden="true"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900">
              {content.specialties.lead}
            </span>{" "}
            {content.specialties.body}
          </p>
          <Link
            href={content.specialties.href}
            onClick={() =>
              trackSmartButtonClick(
                content.specialties.label,
                content.specialties.href,
                LOCATION,
              )
            }
            className="group mt-2 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
          >
            {content.specialties.label}
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

/** Keeps words like "shift-based" on one line by swapping in U+2011. */
const noBreakHyphens = (text: string) =>
  text.replace(/(\w)-(\w)/g, "$1\u2011$2");

/**
 * A tinted card: heading and copy on the left, the industries as a two-column
 * list of links on the right, each ruled off underneath.
 */
function OtherIndustries({ content }: { content: OtherIndustriesContent }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] gap-10 lg:gap-14 items-center rounded-2xl px-6 py-10 md:px-12 md:py-14"
      style={{ backgroundColor: CARD_TINT }}
    >
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-[1.2] tracking-tight text-balance">
          {noBreakHyphens(content.heading)}
        </h2>
        <p className="mt-6 max-w-sm text-base md:text-lg text-gray-600 leading-relaxed">
          {noBreakHyphens(content.description)}
        </p>
        <Link
          href={content.viewAll.href}
          onClick={() =>
            trackSmartButtonClick(
              content.viewAll.label,
              content.viewAll.href,
              LOCATION,
            )
          }
          className="group mt-8 inline-flex items-center gap-2 text-base md:text-lg font-semibold text-blue-600 hover:text-blue-700"
        >
          {content.viewAll.label}
          <LuChevronRight
            aria-hidden="true"
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
        {content.industries.map((ind) => (
          <li key={ind.name}>
            <Link
              href={ind.href}
              onClick={() =>
                trackSmartButtonClick(
                  `Industry: ${ind.name}`,
                  ind.href,
                  LOCATION,
                )
              }
              className="group flex sm:min-h-[5.5rem] items-center justify-between gap-4 border-b border-gray-200 py-5 text-base md:text-lg font-semibold text-gray-900 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              {ind.name}
              <LuChevronRight
                aria-hidden="true"
                className="w-5 h-5 shrink-0 text-blue-600 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
  Two sections rather than one, so the page can set other content — the
  testimonials — between the healthcare groups and the other industries.
*/
export function HealthcareWorkforceSection({
  content = WORKFORCE_CONTENT_AU,
}: {
  content?: WorkforceContent;
} = {}) {
  return (
    <section className="py-16 md:py-20">
      <Container className="lg:px-12 xl:px-20">
        <WorkforceGroups content={content} />
      </Container>
    </section>
  );
}

export function OtherIndustriesSection({
  content = OTHER_INDUSTRIES_CONTENT_AU,
}: {
  content?: OtherIndustriesContent;
} = {}) {
  return (
    // Extra top padding: this follows the testimonials band, whose curved
    // bottom edge hangs 40px (80px from md) into the top of this section.
    <section className="pt-32 pb-20 md:pt-44 md:pb-24">
      <Container className="lg:px-12 xl:px-20">
        <OtherIndustries content={content} />
      </Container>
    </section>
  );
}
