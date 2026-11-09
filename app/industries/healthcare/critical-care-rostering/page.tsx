import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import IndustryHero from "@/components/sections/IndustryHero";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import Reveal from "@/app/enterprise/Reveal";
import RosterComparison, {
  type ComparisonRow,
} from "@/app/industries/healthcare/nurse-rostering/RosterComparison";
import {
  PiArrowRightBold,
  PiArrowsLeftRight,
  PiClockCountdown,
  PiMoonStars,
  PiQuotesFill,
  PiStethoscope,
} from "react-icons/pi";
import type { IconType } from "react-icons";

// Palette follows the enterprise page: navy #1F2A5C for headings and dark
// surfaces, site blue #3B7FE8 for actions, mint #03F9BE for proof points on
// navy, tint #F4F6FB for alternate sections. Workforce pages close on a teal
// banner where specialty pages (enterprise) close on blue.

const TITLE = "ICU and Critical Care Rostering Software";
const DESCRIPTION =
  "ICU rostering software that meets the demands of high-acuity care. Balance skill mix, staffing ratios, supervision all at once. Explore RosterLab.";
const PATH = "/industries/healthcare/critical-care-rostering";
const OG_IMAGE = "/images/og-images/IndustryICUED.png";

export const metadata = withHreflang(
  {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://rosterlab.com${PATH}` },
    openGraph: {
      title: `${TITLE} | RosterLab`,
      description: DESCRIPTION,
      type: "website",
      url: `https://rosterlab.com${PATH}`,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${TITLE} | RosterLab`,
      description: DESCRIPTION,
      images: [OG_IMAGE],
    },
  },
  PATH,
);

const LOCATION = "Industry Page Critical Care Rostering";
const PAGE_NAME = "Critical Care Rostering";
const HOW_IT_WORKS = "how-it-works";
const CASE_STUDY = "/case-studies/icu-unit-western-australia";

/* ---------------------------------------------------------------- content */

const SPECIALTIES = [
  "Intensive Care Units",
  "High Dependency Units",
  "Acute Medical Units",
];

// Open on the intro's grey, each benefit marked by its own coloured tile.
const BENEFITS: {
  icon: IconType;
  title: string;
  description: string;
  tile: string;
}[] = [
  {
    icon: PiClockCountdown,
    title: "Less roster admin, more time for care",
    description:
      "Take days of manual roster preparation off your workload. RosterLab’s AI works through your unit's staffing requirements, shift patterns and constraints to generate a complete ICU roster in minutes, ready for your review.",
    tile: "bg-[#3B7FE8]",
  },
  {
    icon: PiMoonStars,
    title: "Fairer rosters, with more room for recovery",
    description:
      "Distribute nights, weekends, and on-call duties fairly across the team. RosterLab enforces your rest rules automatically, giving staff adequate recovery between long intensive shifts.",
    tile: "bg-[#5B67D8]",
  },
  {
    icon: PiArrowsLeftRight,
    title: "Support continuity of care",
    description:
      "Keep at least one team member from the previous shift rostered on to maintain continuity of care, supporting smoother handovers and improved patient outcomes.",
    tile: "bg-[#E57200]",
  },
  {
    icon: PiStethoscope,
    title: "Plan for specialist cover and supervision",
    description:
      "No more cross-checking spreadsheets to see who can cover which shift or task. RosterLab assigns clinicians based on their competencies and supervision requirements, highlighting any gaps that need your attention.",
    tile: "bg-[#0E9F7E]",
  },
];

const CAPABILITIES = [
  {
    title: "Give your clinicians a say in the roster",
    description:
      "Staff can submit preferences, request swaps and apply for open shifts through the app. RosterLab weighs requests across the team alongside coverage and the agreement rules your roster needs to meet.",
    link: {
      label: "Explore self-scheduling",
      href: "/feature/self-scheduling",
    },
    image: {
      src: "/images/industries/nursing/staff-preferences-v2.webp",
      alt: "Staff preferences in RosterLab on desktop, with a clinician requesting a shift and accepting an open shift in the mobile app",
      className: "object-cover",
    },
    frame: "bg-[#3B7FE8]",
  },
  {
    title: "Handle absences without rebuilding the roster",
    description:
      "When someone calls in sick, RosterLab helps find suitable replacement cover and adjust affected shifts around skills, availability, working hours and roster rules. The rest of your roster stays intact, and you remain in control of every change.",
    link: {
      label: "Explore re-rostering",
      href: "/feature/re-rostering",
    },
    image: {
      src: "/images/industries/nursing/re-rostering-absences.webp",
      alt: "Re-generating selected shifts in RosterLab after staff call in sick, choosing the dates, area, skills, shifts and staff to re-roster",
      className: "object-cover",
    },
    frame: "bg-[#3B7FE8]",
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    task: "Creating allocations",
    manual: "The roster writer assigns shifts and checks requirements.",
    rosterlab:
      "AI generates allocations around staffing requirements, agreements and staff requests.",
  },
  {
    task: "Balancing connected needs",
    manual: "The roster writer checks the effects of each allocation.",
    rosterlab:
      "Optimisation considers connected requirements across the roster.",
  },
  {
    task: "Handling absences",
    manual: "The roster writer rearranges shifts and checks the consequences.",
    rosterlab: "Re-rostering helps adjust affected shifts for manager review.",
  },
];

const FAQ_ITEMS = [
  {
    question:
      "How is automated rostering different from digital roster management?",
    answer:
      "A roster can be digital and still be built by hand. RosterLab’s AI generates allocations around staffing requirements, agreement rules and staff requests. Your team reviews and approves the result, then manages preferences, swaps and later changes in the same platform.",
  },
  {
    question:
      "How does RosterLab help us meet staffing and skill requirements?",
    answer:
      "Set the staffing levels and competencies each shift needs. RosterLab uses these during generation and highlights shortfalls, so managers can see where additional cover or a staffing decision is needed.",
  },
  {
    question: "Can we roster on-call duties alongside regular clinical shifts?",
    answer:
      "Yes. On-call duties can be scheduled alongside regular shifts, accounting for clinician eligibility, working-hour limits and rest requirements. This helps prevent on-call commitments from conflicting with other rostered duties.",
  },
  {
    question: "How does RosterLab manage night shifts and recovery time?",
    answer:
      "RosterLab builds your unit’s rest requirements and working-hour limits into the roster, while sharing night shifts fairly across eligible clinicians. This helps staff get adequate recovery time between shifts and helps prevent demanding shifts from falling on the same individuals.",
  },
  {
    question: "Can we keep our existing payroll and workforce systems?",
    answer:
      "We’ll confirm the exports or integrations available for your systems and identify any manual steps before rollout. This includes how roster changes would be kept in sync, so you can assess the full workflow.",
  },
  {
    question:
      "Can RosterLab accommodate leave, training and fixed commitments?",
    answer:
      "Yes. Approved leave, training commitments, and fixed working arrangements are set separately from preferences, so the generated roster accounts for commitments already agreed with staff.",
  },
];

/* ------------------------------------------------------------- building blocks */

const H2 =
  "text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight";

/** Proof points in the case study headline. */
function Mint({ children }: { children: React.ReactNode }) {
  return <span className="text-[#03F9BE]">{children}</span>;
}

/* ------------------------------------------------------------------ page */

export default function CriticalCareRosteringPage() {
  return (
    <SiteLayout>
      {/* 1 — Hero: the shared industry layout. */}
      <IndustryHero
        title="Build ICU rosters around the care you deliver"
        description="RosterLab simplifies intensive care rostering, helping your team plan for 24/7 clinical cover, maintain continuity of care, and manage complex staffing needs without tracking every detail by hand."
        analyticsLocation={LOCATION}
        primaryCta={{
          href: "/book-a-demo",
          label: "Book a demo",
          analyticsProperties: {
            cta_type: "demo",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        secondaryCta={{
          href: `#${HOW_IT_WORKS}`,
          label: "See how it works",
          analyticsProperties: {
            cta_type: "how_it_works",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/icu-ed.webp",
          alt: "A clinician in scrubs and a white coat checking her phone in a hospital corridor",
        }}
      />

      {/* 2 — Intro: centred heading and copy, the specialties in one white
          bubble on the grey. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal as="h2" className={H2}>
              Every critical hour, safely staffed
            </Reveal>
            <Reveal
              delay={0.12}
              className="mt-6 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                Behind every ICU roster are dozens of staffing decisions to get
                right, from skill mix and overnight cover to fatigue limits and
                individual working arrangements.
              </p>
              <p>
                RosterLab balances these requirements across the entire roster,
                keeping your unit safely covered around the clock and your team
                well supported.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.24}
            className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white px-5 py-6 text-center sm:px-8"
          >
            <p className="font-medium text-[#1F2A5C]">
              Designed for rostering across:
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {SPECIALTIES.map((s) => (
                <li
                  key={s}
                  className="rounded-lg bg-[#F4F6FB] px-3.5 py-2 text-[15px] text-[#1F2A5C]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Core benefits: open on the same grey, no cards, each marked by
              its coloured tile. */}
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-16 gap-y-10 md:mt-24 md:grid-cols-2 md:gap-y-14">
            {BENEFITS.map(({ icon: Icon, title, description, tile }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.12}>
                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${tile}`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </span>
                <h3 className="mt-5 text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Core capabilities: alternating rows, large product imagery
          (first image right, second left). */}
      <section className="bg-white py-16 md:py-28">
        <Container>
          <Reveal as="h2" className={`mx-auto max-w-4xl text-center ${H2}`}>
            Keeping intensive care teams running smoothly
          </Reveal>

          <div className="mx-auto mt-12 max-w-6xl space-y-16 md:mt-20 md:space-y-28">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className={`grid grid-cols-1 items-center gap-8 md:gap-12 lg:gap-16 ${
                  i % 2 === 0
                    ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
                    : "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                }`}
              >
                <Reveal>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                    {c.description}
                  </p>
                  <Button
                    href={c.link.href}
                    className="group mt-6 gap-2 bg-transparent px-0 py-0 text-base font-semibold text-[#1F2A5C] hover:bg-transparent hover:text-[#3B7FE8]"
                    analyticsLabel={c.link.label}
                    analyticsLocation={LOCATION}
                    analyticsProperties={{
                      cta_type: "learn_more",
                      page_name: PAGE_NAME,
                      section: "capabilities",
                    }}
                  >
                    {c.link.label}
                    <PiArrowRightBold
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                </Reveal>
                <Reveal
                  delay={0.12}
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ring-1 ring-[#1F2A5C]/5 ${c.frame} ${
                    i % 2 === 1 ? "md:order-first" : ""
                  }`}
                >
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1152px) 690px, (min-width: 768px) 60vw, 100vw"
                    className={c.image.className}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 — Customer logos (the enterprise row) and the case study callout:
          a photo beside a navy panel, proof points in mint. */}
      <TrustedByDualRow
        singleRow
        headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
        logoColor="#1F2A5C"
        heading="Trusted by healthcare teams"
      />
      <section className="pb-16 md:pb-24">
        <Container>
          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] md:rounded-[1.75rem] lg:aspect-auto">
              {/* Landscape photo in a tall slot on desktop: the crop is held on
                  the group of clinicians at the centre. */}
              <Image
                src="/images/industries/junior-doctor.webp"
                alt="A team of clinicians in white coats and scrubs talking as they walk through a hospital"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="object-cover object-[50%_35%] saturate-[0.85] contrast-[1.08]"
              />
              {/* Grade the warm photo towards the navy panel beside it: a
                  cool tint over everything, then a navy fade from the
                  bottom so the two pieces read as one block. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#3B7FE8] opacity-20 mix-blend-multiply"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1F2A5C]/80 via-[#1F2A5C]/15 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[#1F2A5C]/10"
              />
            </div>

            {/* Navy panel with the RosterLab mark (capsule, bar, dot) drawn
                in tone-on-tone outline off the right edge. */}
            <div className="relative overflow-hidden rounded-[1.25rem] bg-[#1F2A5C] p-6 text-white sm:p-9 md:rounded-[1.75rem] md:p-12">
              <svg
                aria-hidden="true"
                viewBox="0 0 300 420"
                className="pointer-events-none absolute -right-[17rem] top-1/2 hidden h-[115%] -translate-y-1/2 text-[#2A3F8F]/70 lg:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="22"
              >
                <rect x="11" y="11" width="278" height="98" rx="49" />
                <rect x="11" y="161" width="178" height="98" rx="49" />
                <circle cx="60" cy="360" r="49" />
              </svg>
              <div className="relative lg:pr-16">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 md:text-xs">
                  {/* Stacked on a phone; from sm up each half is kept whole,
                      so the line breaks at the divider, not mid-name. */}
                  <span className="block sm:inline sm:whitespace-nowrap">
                    Intensive Care Unit
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 hidden text-white/50 sm:inline"
                  >
                    |
                  </span>
                  <span className="sr-only"> | </span>
                  <span className="mt-1 block sm:mt-0 sm:inline sm:whitespace-nowrap">
                    Western Australia
                  </span>
                </p>
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  A month&apos;s ICU roster generated in{" "}
                  <Mint>under an hour</Mint>
                </h3>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  A Western Australian ICU uses RosterLab to create 24/7 medical
                  rosters for over 20 clinicians, balancing specialist skills,
                  supervision, fairness, and continuity of care.
                </p>
                <figure className="mt-7 flex gap-4">
                  <PiQuotesFill
                    aria-hidden="true"
                    className="mt-0.5 h-9 w-9 shrink-0 rotate-180 text-[#03F9BE]"
                  />
                  <div className="border-l border-white/25 pl-5">
                    <blockquote className="text-lg italic text-white/90 leading-relaxed">
                      “RosterLab has saved me countless hours and made this
                      process manageable.”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-xs">
                      Peter, Senior Registrar, ICU, Western Australia
                    </figcaption>
                  </div>
                </figure>
                <Link
                  href={CASE_STUDY}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1F2A5C] transition hover:bg-[#03F9BE] md:text-base"
                >
                  Read the case study
                  <PiArrowRightBold
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* 5 — How it works: the comparison, played out. Target of every
          "See how it works". */}
      <section
        id={HOW_IT_WORKS}
        className="scroll-mt-24 bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal as="h2" className={H2}>
              The whole roster, considered together
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              One shift change can affect someone’s rest, contracted hours or
              availability tomorrow. RosterLab’s optimisation works through
              these connected requirements across the roster, helping you find a
              workable balance without checking every combination by hand.
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <h3 className="mb-6 text-center text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              Manual planning in Excel and RosterLab compared
            </h3>
            <RosterComparison rows={COMPARISON} />
          </div>
        </Container>
      </section>

      {/* 6 — Onboarding & support: heading left, copy right, on the FAQ's
          columns so the two sections line up. */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight">
              Saving time from your first roster
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our implementation specialists help turn your existing rules and
              working arrangements into a roster setup for your team. We train
              your roster writers, review the first generated roster with you
              and discuss how RosterLab fits your current systems.
            </p>
          </div>
        </Container>
      </section>

      {/* 7 — FAQ: the enterprise layout. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Common questions about critical care scheduling
              </p>
            </div>
            <EnterpriseFAQ items={FAQ_ITEMS} />
          </div>
        </Container>
      </section>

      {/* 8 — Final CTA: the enterprise banner in a light workforce teal,
          with text in a deep teal from the same hue. Lightened from #06C8CC
          so the text stands out more. */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-[#7ADFE1] px-6 py-16 text-center text-[#053B3D] sm:px-12 md:py-24">
            <svg
              aria-hidden="true"
              viewBox="0 0 300 420"
              className="pointer-events-none absolute -left-24 top-1/2 h-[130%] -translate-y-1/2 text-[#5CD2D5]/70 md:-left-16"
              fill="none"
              stroke="currentColor"
              strokeWidth="22"
            >
              <rect x="11" y="11" width="278" height="98" rx="49" />
              <rect x="11" y="161" width="178" height="98" rx="49" />
              <circle cx="60" cy="360" r="49" />
            </svg>
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
                See how RosterLab could work for your team
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-[#053B3D]/90">
                Bring your shift patterns, skill requirements and biggest
                rostering challenge. See how RosterLab handles your
                requirements, with time to discuss setup, existing systems and
                next steps.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href="/book-a-demo"
                  className="rounded-md bg-[#053B3D] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#032A2C]"
                  analyticsLabel="Book a demo"
                  analyticsLocation={LOCATION}
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: PAGE_NAME,
                    section: "final_cta",
                  }}
                >
                  Book a demo
                </Button>
                <Button
                  href={`#${HOW_IT_WORKS}`}
                  variant="outline"
                  className="rounded-md border-2 border-[#053B3D] px-7 py-3.5 text-base font-semibold text-[#053B3D] hover:bg-[#053B3D] hover:text-white"
                  analyticsLabel="See how it works"
                  analyticsLocation={LOCATION}
                  analyticsProperties={{
                    cta_type: "how_it_works",
                    page_name: PAGE_NAME,
                    section: "final_cta",
                  }}
                >
                  See how it works
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: "Healthcare", url: "/industries/healthcare" },
          { name: "Critical Care" },
        ]}
      />
    </SiteLayout>
  );
}
