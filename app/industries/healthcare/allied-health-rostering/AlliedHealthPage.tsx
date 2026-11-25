import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import IndustryHero from "@/components/sections/IndustryHero";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import Reveal from "@/app/enterprise/Reveal";
import DisciplineSelector from "./DisciplineSelector";
import {
  alliedHealthCopy,
  alliedHealthHref,
  alliedHealthAnswer,
} from "./localization";
import RosterComparison, {
  type ComparisonRow,
} from "../nurse-rostering/RosterComparison";
import { PiArrowRightBold, PiQuotesFill } from "react-icons/pi";

// Palette follows the enterprise page: navy #1F2A5C for headings and dark
// surfaces, site blue #3B7FE8 for actions, mint #03F9BE for proof points on
// navy, tint #F4F6FB for alternate sections. Workforce pages close on a teal
// banner where specialty pages (enterprise) close on blue.

const LOCATION = "Industry Page Allied Health Rostering";
const PAGE_NAME = "Allied Health Rostering";
const HOW_IT_WORKS = "how-it-works";
const FEATURED_CASE_STUDY = "/case-studies/radiology-department-auckland";
const CASE_STUDY =
  "/case-studies/whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab";

/* ---------------------------------------------------------------- content */

// Benefits share the intro’s grey background.
const BENEFITS: { title: string; description: string }[] = [
  {
    title: "Less time rostering, more time for care",
    description:
      "Auto-generate rosters in minutes around your staffing rules and requirements, so you can focus more on patients, not roster admin.",
  },
  {
    title: "Manage staffing across multiple sites",
    description:
      "Coordinate practitioners working across hospitals, clinics and community-based services, without double-booking staff or juggling separate schedules.",
  },
  {
    title: "Fair workloads, with time to recover",
    description:
      "Share weekends, on-call and after-hours duties fairly where relevant, with recovery time built into the roster to help manage fatigue.",
  },
  {
    title: "Accommodate working arrangements",
    description:
      "Consider contracted hours, part-time patterns, fixed working days and availability when planning the roster, so individual arrangements are included from the outset.",
  },
];

const CAPABILITIES = [
  {
    title: "Plan specialist cover and anticipate staffing gaps",
    description:
      "Whether you need a radiographer qualified in a specific modality or a physiotherapist with respiratory expertise, RosterLab matches staff to shifts based on their skills, qualifications and credentials.\n\nIt also identifies coverage gaps early, giving you time to arrange specialist cover before they result in service delays or cancellations.",
    link: {
      label: "Explore AI rostering",
      href: "/feature/automated-rostering",
    },
    image: {
      src: "/images/updated-hero/ai-rostering.webp",
      alt: "RosterLab automated rostering interface",
      className: "object-contain",
    },
  },
  {
    title: "Give staff a say in their roster",
    description:
      "Staff can submit their preferences, availability and leave requests through a dedicated app. Balance staff inputs with service needs, fair allocation rules and agreed rest requirements — all in one place.\n\nNo lost emails. No perceived favouritism.",
    link: {
      label: "Explore self-scheduling",
      href: "/feature/self-scheduling",
    },
    image: {
      src: "/images/updated-hero/self-scheduling.webp",
      alt: "RosterLab self-scheduling interface for staff preferences",
      className: "object-contain",
    },
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    task: "Applying rostering rules",
    manual:
      "Rest requirements and employment agreement rules can be overlooked",
    rosterlab: "Rostering rules applied automatically during roster generation",
  },
  {
    task: "Balancing staffing requirements",
    manual:
      "Each allocation needs to be manually checked against competing requirements",
    rosterlab:
      "Coverage needs, contracted hours, working arrangements and relevant skills considered together",
  },
  {
    task: "Handling absences",
    manual: "Hours spent finding suitable cover and reshuffling shifts",
    rosterlab: "Affected shifts re-rostered to maintain adequate coverage",
  },
];

const FAQ_ITEMS = [
  {
    question:
      "How is RosterLab different from managing an allied health roster in Excel?",
    answer:
      "Excel leaves the planning to you. Every allocation needs to be checked against staff availability, specialist skills and rostering rules, often with changes rippling through the rest of the roster. RosterLab does that planning work using its optimisation engine, generating a roster for you to review and approve.",
  },
  {
    question: "Can RosterLab support different allied health working patterns?",
    answer:
      "RosterLab is configured around your team’s staffing requirements, skills, contracted hours and working patterns. During setup, we review how you currently roster and confirm how your requirements can be represented.",
  },
  {
    question: "What happens when someone calls in sick?",
    answer:
      "RosterLab helps you find suitable cover based on who's available, qualified and eligible to work. You can offer open shifts, re-roster affected allocations or ask <a href='/feature/ai-staff-rostering-assistant' class='text-blue-600 underline hover:text-blue-700'>Otto</a>, RosterLab's AI assistant, to help identify suitable replacements.",
  },
  {
    question: "Can we accommodate part-time hours and fixed working patterns?",
    answer:
      "Yes. RosterLab records each practitioner's contracted hours, availability and agreed working patterns, then takes these into account when generating rosters. There's no need to manually work around the same arrangements each roster cycle.",
  },
  {
    question: "Can I edit an AI-generated roster?",
    answer:
      "Yes. Every AI-generated roster can be reviewed and adjusted before it's published. RosterLab handles the initial allocations, but the final decisions stay with your roster writers.",
  },
  {
    question: "Can we roster staff who work across multiple sites or services?",
    answer:
      "Yes. RosterLab considers where allied health staff are needed and when they're available, so someone working across different locations isn't assigned to overlapping shifts. You can plan staffing across services together rather than managing separate rosters in isolation.",
  },
  {
    question: "Can RosterLab work with our existing systems?",
    answer:
      "RosterLab offers enterprise integrations and API access. We'll review your existing HR, payroll and reporting workflows to confirm the supported connections, export options and setup your team needs. <a href='/book-a-demo' class='text-blue-600 underline hover:text-blue-700'>Discuss your systems with our team</a>",
  },
];

/* ------------------------------------------------------------- building blocks */

const H2 =
  "text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight";

/* ------------------------------------------------------------------ page */

export default function AlliedHealthPage({ isUS = false }: { isUS?: boolean }) {
  const copy = (text: string) => alliedHealthCopy(text, isUS);
  const href = (path: string) => alliedHealthHref(path, isUS);
  const location = isUS
    ? "US Industry Page Allied Health Scheduling"
    : LOCATION;
  const pageName = copy(PAGE_NAME);
  return (
    <SiteLayout>
      {/* 1 — Hero: the shared industry layout. */}
      <IndustryHero
        imageBelowCtasOnMobile
        title={
          <>
            <span className="lg:block">{copy("Allied health rostering")}</span>{" "}
            <span className="lg:block">
              {copy("that brings it all together")}
            </span>
          </>
        }
        description={copy(
          "Build AI-powered schedules for allied health teams. Match specialist skills, balance workloads fairly, and accommodate individual working arrangements.",
        )}
        analyticsLocation={location}
        primaryCta={{
          href: "https://rosterlab.com/book-a-demo",
          label: "Book a demo",
          analyticsProperties: {
            cta_type: "demo",
            page_name: pageName,
            section: "hero",
          },
        }}
        secondaryCta={{
          href: href(FEATURED_CASE_STUDY),
          label: "See case study",
          analyticsProperties: {
            cta_type: "case_study",
            page_name: pageName,
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/allied-health/physiotherapy-hero.webp",
          alt: "Clinician assisting a patient with resistance-band exercises",
          objectPosition: "65% 40%",
        }}
      />

      {/* Customer logos. */}
      <TrustedByDualRow
        singleRow
        centerHeadingOnMobile
        headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
        logoColor="#1F2A5C"
        heading={copy("Trusted by healthcare teams")}
      />

      {/* 2 — Intro: centred heading and copy, the specialties in one white
          bubble on the grey. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal as="h2" className={H2}>
              {copy(
                "Roster all the moving parts, without the endless planning",
              )}
            </Reveal>
          </div>

          <DisciplineSelector isUS={isUS} />
        </Container>
      </section>

      {/* Core benefits. */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-14">
            {BENEFITS.map(({ title, description }, i) => (
              <Reveal
                key={copy(title)}
                delay={(i % 2) * 0.12}
                className="min-w-0"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-snug tracking-tight md:text-balance">
                  {copy(title)}
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed md:mt-4 md:text-pretty">
                  {copy(description)}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 — Case study: a photo beside a navy panel, proof points in mint. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,2fr)]">
            <div className="relative hidden overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] md:rounded-[1.75rem] lg:order-last lg:block">
              {/* Allied health customer story, using the existing case study image. */}
              <Image
                src="/landing/case-studies/whanganui-radiography-mri.webp"
                alt="An MRI scanner in a hospital imaging room"
                fill
                sizes="340px"
                className="object-cover object-[45%_25%] saturate-[0.85] contrast-[1.08]"
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
                    {copy("Radiography")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 hidden text-white/50 sm:inline"
                  >
                    {copy("|")}
                  </span>
                  <span className="sr-only">{copy("|")}</span>
                  <span className="mt-1 block sm:mt-0 sm:inline sm:whitespace-nowrap">
                    {copy("Whanganui Hospital, New Zealand")}
                  </span>
                </p>
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  <span className="text-[#03F9BE]">{copy("179+ hours")}</span>
                  {copy(" a year back for clinical work")}
                </h3>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  {copy(
                    "Whanganui Radiography uses RosterLab to coordinate staffing across its 24/7 imaging services, significantly reducing the time spent preparing rosters.",
                  )}
                </p>
                <figure className="mt-7 flex gap-4">
                  <PiQuotesFill
                    aria-hidden="true"
                    className="mt-0.5 h-9 w-9 shrink-0 rotate-180 text-[#03F9BE]"
                  />
                  <div className="border-l border-white/25 pl-5">
                    <blockquote className="text-lg italic text-white/90 leading-relaxed">
                      “Rostering would take 7-8 days, now it takes 2-3 hours,
                      allowing me to focus more on patient care.”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-xs">
                      {copy(
                        "Mike, Associate Clinical Manager, Radiology, Whanganui Hospital",
                      )}
                    </figcaption>
                  </div>
                </figure>
                <Link
                  href={href(CASE_STUDY)}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1F2A5C] transition hover:bg-[#03F9BE] md:text-base"
                >
                  {copy("Read the case study")}
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

      {/* 4 — Core capabilities: alternating rows, large product imagery
          (first image right, second left). */}
      <section className="bg-white py-16 md:py-28">
        <Container>
          <Reveal as="h2" className={`mx-auto max-w-4xl text-center ${H2}`}>
            {copy("Built for the complexity of allied health rostering")}
          </Reveal>

          <div className="mx-auto mt-12 max-w-6xl space-y-16 md:mt-20 md:space-y-28">
            {CAPABILITIES.map((c, i) => (
              <div
                key={copy(c.title)}
                className={`grid grid-cols-1 items-center gap-8 md:gap-12 lg:gap-16 ${
                  i % 2 === 0
                    ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
                    : "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                }`}
              >
                <Reveal>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                    {copy(c.title)}
                  </h3>
                  <div className="mt-4 space-y-4 text-lg text-gray-600 leading-relaxed">
                    {copy(c.description)
                      .split("\n\n")
                      .map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                  </div>
                  <Button
                    href={href(c.link.href)}
                    className="group mt-6 gap-2 bg-transparent px-0 py-0 text-base font-semibold text-[#1F2A5C] hover:bg-transparent hover:text-[#3B7FE8]"
                    analyticsLabel={copy(c.link.label)}
                    analyticsLocation={location}
                    analyticsProperties={{
                      cta_type: "learn_more",
                      page_name: pageName,
                      section: "capabilities",
                    }}
                  >
                    {copy(c.link.label)}
                    <PiArrowRightBold
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                </Reveal>
                <Reveal
                  delay={0.12}
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#3B7FE8] shadow-sm ring-1 ring-[#1F2A5C]/5 ${
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
              {copy("The whole roster, considered together")}
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed lg:mx-auto lg:max-w-3xl"
            >
              {copy(
                "RosterLab's optimisation engine considers how every shift fits together, helping you find the best workable schedule. You review, adjust and publish.",
              )}
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <h3 className="mb-6 text-center text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              {copy("Manual planning and RosterLab compared")}
            </h3>
            <RosterComparison
              rows={COMPARISON.map((row) => ({
                task: copy(row.task),
                manual: copy(row.manual),
                rosterlab: copy(row.rosterlab),
              }))}
              labels={{
                task: copy("Rostering task"),
                manualHeading: copy("Manual rostering"),
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
            <h2 className={H2}>{copy("Saving time from your first roster")}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {copy(
                "Our specialists set up your unit’s rules, train your roster writers and review your first roster with you. We discuss how RosterLab fits your existing systems. Your rules stay documented, so a change of roster writer doesn’t mean starting again.",
              )}
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
              <h2 className={H2}>{copy("Frequently Asked Questions")}</h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                {copy("Common questions about allied health rostering")}
              </p>
            </div>
            <EnterpriseFAQ
              items={FAQ_ITEMS.map((item) => ({
                question: copy(item.question),
                answer: alliedHealthAnswer(item.answer, isUS),
              }))}
            />
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
                {copy("See how RosterLab could work for your team")}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-[#053B3D]/90">
                {copy(
                  "Bring your shift patterns, staffing requirements and biggest rostering challenges. We'll show you how RosterLab can help.",
                )}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href="https://rosterlab.com/book-a-demo"
                  className="rounded-md bg-[#053B3D] px-7 py-3.5 text-base font-semibold text-white hover:bg-[#032A2C]"
                  analyticsLabel={copy("Book a demo")}
                  analyticsLocation={location}
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: pageName,
                    section: "final_cta",
                  }}
                >
                  {copy("Book a demo")}
                </Button>
                <Button
                  href={href(FEATURED_CASE_STUDY)}
                  variant="outline"
                  className="rounded-md border-2 border-[#053B3D] px-7 py-3.5 text-base font-semibold text-[#053B3D] hover:bg-[#053B3D] hover:text-white"
                  analyticsLabel={copy("See case study")}
                  analyticsLocation={location}
                  analyticsProperties={{
                    cta_type: "case_study",
                    page_name: pageName,
                    section: "final_cta",
                  }}
                >
                  {copy("See case study")}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: href("/") },
          { name: "Industries", url: href("/industries") },
          { name: "Healthcare", url: href("/industries/healthcare") },
          { name: "Allied Health" },
        ]}
      />
    </SiteLayout>
  );
}
