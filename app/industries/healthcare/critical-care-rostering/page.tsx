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
import { PiArrowRightBold, PiQuotesFill } from "react-icons/pi";

// Palette follows the enterprise page: navy #1F2A5C for headings and dark
// surfaces, site blue #3B7FE8 for actions, mint #03F9BE for proof points on
// navy, tint #F4F6FB for alternate sections. Workforce pages close on a teal
// banner where specialty pages (enterprise) close on blue.

const TITLE = "ICU and Critical Care Rostering Software";
const DESCRIPTION =
  "ICU rostering software that meets the demands of high-acuity care. Balance skill mix, staffing ratios and supervision all at once. Explore RosterLab.";
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
const INTERACTIVE_DEMO = "/staff-rostering-interactive-demo";
const CASE_STUDY = "/case-studies/icu-unit-western-australia";

/* ---------------------------------------------------------------- content */

const SPECIALTIES = [
  "Intensive Care Units",
  "NICU",
  "High Dependency Units",
  "Acute Medical Units",
];

// Benefits share the intro’s grey background.
const BENEFITS: {
  title: string;
  description: string;
}[] = [
  {
    title: "Less roster admin, more time for care",
    description:
      "Take days of manual planning off your workload. RosterLab’s AI works through your unit's staffing requirements, shift patterns and constraints to generate a complete ICU shift plan in minutes.",
  },
  {
    title: "Fairer rosters, with more room for recovery",
    description:
      "Distribute nights, weekends and on-call duties fairly across eligible clinicians, accounting for contracted hours and your unit’s rest rules.",
  },
  {
    title: "Support continuity of care",
    description:
      "Keep clinicians in the same role across consecutive days, supporting familiarity with patients’ progress and more informed care decisions and handovers.",
  },
  {
    title: "Plan for specialist cover and supervision",
    description:
      "RosterLab assigns clinicians based on their competencies and supervision requirements, highlighting any gaps that need your attention.",
  },
];

const CAPABILITIES = [
  {
    title: "Protect teaching time and plan ICU cover",
    description:
      "Block out agreed teaching sessions, study days and airway training for registrars, alongside consultants’ non-clinical commitments. RosterLab plans shifts around that time and flags gaps in ICU cover for review before you publish.",
    link: {
      label: "Explore rostering rules",
      href: "/feature/rules-engine",
    },
    image: {
      src: "/images/industries/nursing/critical-care-teaching-time-v2.webp",
      alt: "ICU roster in RosterLab with protected teaching shifts highlighted, and a rule requiring at least one teaching shift per two weeks for each skill level",
      className: "object-cover",
    },
    frame: "bg-[#3B7FE8]",
  },
  {
    title: "Adjust cover when plans change",
    description:
      "When a shift needs last-minute cover, RosterLab helps find a suitable replacement based on skills, availability and rest rules. Review changes to the affected shifts while keeping the rest of the roster in place.",
    link: {
      label: "Explore re-rostering",
      href: "/feature/re-rostering",
    },
    image: {
      src: "/images/industries/nursing/critical-care-adjust-cover.webp",
      alt: "Re-generating selected ICU shifts in RosterLab, choosing the dates, area, skills, shifts and staff to re-roster",
      className: "object-cover",
    },
    frame: "bg-[#3B7FE8]",
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    task: "Creating allocations",
    manual: "Shifts filled one by one, every rule checked manually.",
    rosterlab:
      "AI allocates shifts around staffing needs, rules and staff requests.",
  },
  {
    task: "Balancing connected needs",
    manual: "Competing requirements weighed up one decision at a time.",
    rosterlab:
      "Coverage, fairness and preferences balanced across the entire roster.",
  },
  {
    task: "Handling absences",
    manual:
      "Last-minute changes can mean hours of reshuffling and rechecking shifts.",
    rosterlab:
      "Affected shifts re-rostered automatically, ready for manager review.",
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
      "Set the staffing levels, competencies and rest rules your roster needs to meet. RosterLab uses these as requirements while balancing staff preferences where possible. It highlights staffing shortfalls, so managers can see where additional cover or a staffing decision is needed.",
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
  {
    question: "How do staff receive their published roster?",
    answer:
      "When you publish a roster, staff can view their shifts in the RosterLab app and sync them with their personal calendar. Staff can opt in to email notifications for published rosters and updates. Publishing changes also updates the live roster link.",
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
        imageBelowCtasOnMobile
        title={
          <>
            Build ICU rosters{" "}
            <br className="hidden xl:block" />
            around the care you deliver
          </>
        }
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
          href: INTERACTIVE_DEMO,
          label: "See how it works",
          analyticsProperties: {
            cta_type: "how_it_works",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/nursing/critical-care-hero-bedside.webp",
          alt: "A nurse adjusting a patient's oxygen mask while a doctor reviews notes on a clipboard at the bedside",
          objectPosition: "center 8%",
        }}
      />

      {/* Customer logos. */}
      <TrustedByDualRow
        singleRow
        centerHeadingOnMobile
        headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
        logoColor="#1F2A5C"
        heading="Trusted by healthcare teams"
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
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              RosterLab balances ICU skill mix, overnight cover, fatigue limits
              and working arrangements across your roster, helping you plan
              around-the-clock clinical coverage while reducing roster admin.
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
        </Container>
      </section>

      {/* 3 — Case study: a photo beside a navy panel, proof points in mint. */}
      <section className="py-16 md:py-24">
        <Container>
          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
            <div className="relative hidden overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] md:rounded-[1.75rem] lg:block">
              {/* Portrait photo: the crop is held on the patient monitor
                  above the bed. */}
              <Image
                src="/images/industries/nursing/critical-care-case-study-monitor.webp"
                alt="A patient monitor showing heart rate and breathing above an empty hospital bed"
                fill
                sizes="340px"
                className="object-cover object-[45%_28%] saturate-[0.85] contrast-[1.08]"
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

      {/* Core benefits. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-14">
            {BENEFITS.map(({ title, description }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.12}>
                <h3 className="text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-snug tracking-tight">
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

      {/* 4 — Core capabilities: alternating rows, large product imagery
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

      {/* 5 — Manual planning and automated rostering compared. */}
      <section
        id={HOW_IT_WORKS}
        className="relative scroll-mt-24 overflow-hidden bg-[#F4F6FB] pt-16 pb-20 md:pt-24 md:pb-28"
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
              Manual rostering and RosterLab compared
            </h3>
            <RosterComparison
              rows={COMPARISON}
              labels={{
                task: "Rostering task",
                manualHeading: "Manual rostering",
                manualNote: "in Excel or traditional software",
              }}
            />
          </div>
        </Container>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-12 w-full text-white md:h-20"
          fill="currentColor"
        >
          <path d="M0 32C360 96 960-32 1440 32V80H0Z" />
        </svg>
      </section>

      {/* 6 — Onboarding & support: heading left, copy right, on the FAQ's
          columns so the two sections line up. */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32 md:pt-24 md:pb-40">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.25] md:leading-[1.25] tracking-tight">
              Saving time from your first roster
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our specialists set up your unit’s rules, train your roster
              writers and review your first roster with you. We discuss how
              RosterLab fits your existing systems. Your rules stay documented,
              so a change of roster writer doesn’t mean starting again.
            </p>
          </div>
        </Container>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 -bottom-px h-12 w-full text-[#F4F6FB] md:h-20"
          fill="currentColor"
        >
          <path d="M0 32C480-32 1080 96 1440 32V80H0Z" />
        </svg>
      </section>

      {/* 7 — FAQ: the enterprise layout. */}
      <section className="bg-[#F4F6FB] pt-28 pb-16 md:pt-36 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Common questions about critical care rostering
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
                Bring your shift patterns, staffing requirements and biggest
                rostering challenges. We&apos;ll show you how RosterLab can
                help.
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
                  href={INTERACTIVE_DEMO}
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
