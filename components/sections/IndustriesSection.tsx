"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuBriefcase,
  LuBriefcaseMedical,
  LuGraduationCap,
  LuHandHeart,
  LuHeadset,
  LuIdCard,
  LuLandmark,
  LuPlane,
  LuStethoscope,
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

// How long a tab click takes to scroll the page to its group.
const JUMP_MS = 800;

interface WorkforceGroup {
  name: string;
  icon: IconType;
  description: string;
  /** The group's roster-type landing page. */
  href: string;
  /** Link text for `href`; "Explore {name} rostering" where that reads well. */
  linkLabel: string;
  /**
   * The few features that matter most to this group. Each is stepped through
   * beside the copy: its title and description show in the text column while
   * its product mockup fills the slide.
   */
  features: WorkforceFeature[];
}

interface WorkforceFeature {
  title: string;
  /** One or two sentences on what the feature does for this group. */
  description: string;
  /**
   * Product mockup for the slide — a 1:1 export (1100×1100 or larger) with
   * its background baked in; it fills the slide edge to edge. Optional until
   * the asset exists; the slide shows a neutral placeholder in the meantime.
   */
  image?: { src: string; alt: string };
}

const WORKFORCE_GROUPS: WorkforceGroup[] = [
  {
    name: "Nursing",
    icon: LuBriefcaseMedical,
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
    icon: LuStethoscope,
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
    icon: LuIdCard,
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
    icon: LuHandHeart,
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
    icon: LuBriefcase,
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

function ArrowButton({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-11 h-11 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-700 transition enabled:hover:border-blue-600 enabled:hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <LuArrowRight
        aria-hidden="true"
        className={`w-4 h-4 ${dir === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

/**
 * One group's copy and its features. The features sit in a horizontal
 * scroll-snap track, so they can be swiped or trackpad-scrolled as well as
 * stepped through with the arrows under the copy; the arrows and counter
 * follow the track whichever way it moves.
 *
 * Renders the panel's two grid cells. Keyed by group, so a new group starts
 * on its first feature.
 */
function GroupPanel({ group }: { group: WorkforceGroup }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [feature, setFeature] = useState(0);
  const count = group.features.length;
  const Icon = group.icon;

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setFeature(Math.round(track.scrollLeft / track.clientWidth));
  };

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    trackButtonClick(
      `Workforce feature: ${group.features[i].title}`,
      LOCATION,
      {
        workforce_group: group.name,
      },
    );
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: i * track.clientWidth,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className={FADE_UP}>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {group.name}
        </h3>
        <p className="mt-5 max-w-xl text-base md:text-lg text-gray-600 leading-relaxed">
          {group.description}
        </p>

        {/* The active feature's copy. It follows the slide track, so it
            updates whether the reader used the arrows or swiped. */}
        <div
          aria-live="polite"
          className="mt-8 border-l-2 border-blue-600 pl-5"
        >
          {count > 1 && (
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Feature {feature + 1} of {count}
            </p>
          )}
          <p className="mt-1 text-lg md:text-xl font-semibold text-gray-900">
            {group.features[feature].title}
          </p>
          <p className="mt-2 max-w-md text-sm md:text-base text-gray-600 leading-relaxed">
            {group.features[feature].description}
          </p>
        </div>

        {count > 1 && (
          <div className="mt-6 flex gap-2">
            <ArrowButton
              dir="prev"
              label="Previous feature"
              disabled={feature === 0}
              onClick={() => go(feature - 1)}
            />
            <ArrowButton
              dir="next"
              label="Next feature"
              disabled={feature === count - 1}
              onClick={() => go(feature + 1)}
            />
          </div>
        )}

        <Link
          href={group.href}
          onClick={() =>
            trackSmartButtonClick(group.linkLabel, group.href, LOCATION, {
              workforce_group: group.name,
            })
          }
          className="group mt-8 inline-flex items-center gap-2 text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
        >
          {group.linkLabel}
          <LuArrowRight
            aria-hidden="true"
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Capped by viewport height on desktop so the pinned block always
          fits. */}
      <div className="w-full lg:max-w-[min(100%,calc(100vh-20rem))] lg:ml-auto">
        <div
          ref={trackRef}
          onScroll={onScroll}
          aria-label={`${group.name} features`}
          className="flex overflow-x-auto snap-x snap-mandatory rounded-3xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {group.features.map((f, i) => (
            // One slide per feature. Mockups are exported square with their
            // own background, so they fill the slide edge to edge.
            <div
              key={f.title}
              aria-label={`${i + 1} of ${count}: ${f.title}`}
              className="relative shrink-0 w-full snap-center aspect-square overflow-hidden bg-blue-50"
            >
              {f.image ? (
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // Placeholder until the feature's mockup is supplied.
                <div className="flex h-full flex-col items-center justify-center gap-5 px-8 text-center">
                  <Icon
                    aria-hidden="true"
                    className="w-20 h-20 md:w-24 md:h-24 text-blue-600"
                  />
                  <p className="text-lg md:text-xl font-semibold text-gray-900">
                    {f.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Tabs above a single panel. On desktop the tabs and panel pin in place while
 * the page scrolls through a tall track: scroll position picks the active
 * group, and a progress bar under the tabs fills as you go. On smaller
 * screens the pinned block would not fit, so it is plain tabs.
 */
function WorkforceGroups() {
  const id = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // A tab-click scroll in progress. While it runs, the clicked group stays
  // active — the scroll would otherwise pass through, and flash up, every
  // group in between.
  const jumpRef = useRef<{ frame: number; stop: () => void } | null>(null);
  const group = WORKFORCE_GROUPS[active];
  const count = WORKFORCE_GROUPS.length;

  // Scroll → progress. The bar is written straight to the DOM each frame so
  // scrolling doesn't re-render the section; state only changes when the
  // active group does.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track || !desktop.matches) return;
      const { top, height } = track.getBoundingClientRect();
      const range = height - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0;
      barRefs.current.forEach((bar, i) => {
        if (bar)
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress * count - i))})`;
      });
      if (!jumpRef.current)
        setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      jumpRef.current?.stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  // Scrolls the page to `top` with an ease in-out, so the progress bar fills
  // smoothly on the way. Any input from the reader hands the scroll straight
  // back to them.
  const jumpScroll = (top: number) => {
    jumpRef.current?.stop();
    const from = window.scrollY;
    const start = performance.now();
    const stop = () => {
      if (!jumpRef.current) return;
      cancelAnimationFrame(jumpRef.current.frame);
      jumpRef.current = null;
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / JUMP_MS);
      // Ease in-out cubic.
      const eased = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      window.scrollTo({
        top: from + (top - from) * eased,
        behavior: "instant",
      });
      if (t < 1 && jumpRef.current)
        jumpRef.current.frame = requestAnimationFrame(step);
      else stop();
    };
    jumpRef.current = { frame: requestAnimationFrame(step), stop };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
  };

  const select = (i: number) => {
    trackButtonClick(`Workforce group: ${WORKFORCE_GROUPS[i].name}`, LOCATION);
    const track = trackRef.current;
    if (!track || !window.matchMedia(DESKTOP_QUERY).matches) {
      setActive(i);
      return;
    }
    // On desktop the scroll position owns the active group, so a tab click
    // scrolls to the start of that group's stretch of the track. The group
    // goes active straight away rather than once the scroll arrives.
    const range = track.offsetHeight - window.innerHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const top = trackTop + (range * (i + 0.02)) / count;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top, behavior: "instant" });
      return;
    }
    setActive(i);
    jumpScroll(top);
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
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          Rostering tailored to every healthcare workforce group
        </h2>
        <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
          RosterLab adapts to the rules, working patterns, and staffing
          requirements unique to each workforce group.
        </p>
      </div>

      {/* Desktop: one screen of pinned content plus 60vh of scroll per group.
          The multiplier is WORKFORCE_GROUPS.length, written out because
          Tailwind needs the class to be a literal. */}
      <div ref={trackRef} className="relative lg:h-[calc(100vh+5*60vh)]">
        {/* pt clears the sticky site header. */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:pt-[60px]">
          <div
            role="tablist"
            aria-label="Healthcare workforce groups"
            className="mt-10 lg:mt-0 flex flex-wrap gap-3"
          >
            {WORKFORCE_GROUPS.map((g, i) => {
              const Icon = g.icon;
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
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm md:text-base font-semibold transition ${
                    selected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-gray-900 border border-gray-200 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`w-5 h-5 ${selected ? "text-white" : "text-blue-600"}`}
                  />
                  {g.name}
                </button>
              );
            })}
          </div>

          {/* Scroll progress, one segment per group. Desktop only — it tracks
              the pinned scroll, which smaller screens don't have. */}
          <div
            aria-hidden="true"
            className="hidden lg:grid grid-cols-5 gap-2 mt-6"
          >
            {WORKFORCE_GROUPS.map((g, i) => (
              <span
                key={g.name}
                className="h-1 rounded-full bg-gray-200 overflow-hidden"
              >
                <span
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  className="block h-full bg-blue-600 origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${active}`}
            className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center"
          >
            {/* Keyed by tab so the panel remounts: the copy replays its
                entrance and the features start from the first. */}
            <GroupPanel key={group.name} group={group} />
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
