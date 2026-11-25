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

// Placeholder page: sections 2 and 3 are still being written, so it is kept
// out of search (noindex) and out of the menu until they land. No SEO title
// or meta description was supplied yet; both are taken from the hero.
const TITLE = "Emergency Department Rostering Software";
const DESCRIPTION =
  "Generate medical rosters that balance senior cover, supervision, recovery after nights and individual working arrangements. RosterLab’s AI generates the allocations; you review, adjust and publish.";
const PATH = "/industries/healthcare/emergency-department-rostering";
const OG_IMAGE = "/images/og-images/IndustryICUED.png";

export const metadata = withHreflang(
  {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://rosterlab.com${PATH}` },
    robots: { index: false, follow: true },
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

const LOCATION = "Industry Page Emergency Department Rostering";
const PAGE_NAME = "Emergency Department Rostering";
const HOW_IT_WORKS = "how-it-works";
const CASE_STUDY =
  "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering";

/* ---------------------------------------------------------------- content */

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
      "How is RosterLab different from a spreadsheet or a manually built digital roster?",
    answer:
      "With a manual roster, you assign shifts and work through the knock-on effects yourself. RosterLab generates allocations across the roster using your staffing requirements, skills, mandatory rules and weighted preferences. You can review and edit the result before publishing.",
  },
  {
    question: "How does RosterLab manage fatigue?",
    answer:
      "You configure the rest and working-hour requirements that apply to your department and each staff group: minimum breaks, consecutive-shift limits, shift sequencing and recovery after nights. RosterLab uses those rules during generation. Your team reviews the roster before publishing.",
  },
  {
    question:
      "Can clinicians submit leave, availability and shift preferences?",
    answer:
      "Yes. Clinicians can submit leave requests, availability and shift preferences through the RosterLab mobile app. You decide which requests are approved or treated as mandatory, and which remain preferences for the AI to balance against coverage needs. Agreed fixed availability can be included in the roster inputs.",
  },
  {
    question: "How do I publish and share rosters with my team?",
    answer:
      "Publish the final roster for clinicians to access in the mobile app and sync to personal calendars. Share a live roster view with relevant hospital teams; when published allocations change, affected staff receive notifications.",
  },
  {
    question:
      "What happens if there are not enough available doctors to meet staffing requirements?",
    answer:
      "RosterLab prioritises coverage using the demand priorities you set and highlights unfilled shifts or skill requirements. You can review the shortfall and decide what needs to change before publishing, including where additional cover is needed.",
  },
  {
    question:
      "Can it accommodate part-time doctors and work at other hospitals?",
    answer:
      "Yes. Configure contracted hours, fixed availability and individual working patterns for each doctor. RosterLab uses the availability and commitments you enter when generating the ED roster, so part-time and cross-site arrangements can be reflected in the allocations.",
  },
  {
    question: "Can I change an AI-generated roster?",
    answer:
      "Yes. Review the generated roster, make manual changes and follow your department’s approval process before publishing. You retain control of the clinical roster and which changes go live.",
  },
  {
    question:
      "Will it integrate with our hospital payroll or existing rostering system?",
    answer:
      "Compatibility depends on your system and the required workflow. RosterLab can export roster data to Excel; discuss direct integration, export formats and any manual steps with our team during the demo.",
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

export default function EmergencyDepartmentRosteringPage() {
  return (
    <SiteLayout>
      {/* 1 — Hero: the shared industry layout. */}
      <IndustryHero
        stackedContentFirst
        title="Emergency department rostering software that gives clinicians time back"
        description="Generate medical rosters that balance senior cover, supervision, recovery after nights and individual working arrangements. RosterLab’s AI generates the allocations; you review, adjust and publish."
        analyticsLocation={LOCATION}
        primaryCta={{
          href: "/book-a-demo",
          label: "Book an ED rostering demo",
          analyticsProperties: {
            cta_type: "demo",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        secondaryCta={{
          href: "/staff-rostering-interactive-demo",
          label: "Explore the product tour",
          analyticsProperties: {
            cta_type: "product_tour",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/icu-ed.webp",
          alt: "A clinician in scrubs and a white coat checking her phone in a hospital corridor",
        }}
      />

      {/* 2–3 — Placeholder: core benefits and core capabilities are still
          being written. A visible empty slot rather than filler, so
          reviewers can see where they will go. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#1F2A5C]/20 px-6 py-20 text-center md:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1F2A5C]/60">
              Placeholder
            </p>
            <p className="mt-3 text-xl md:text-2xl font-semibold text-[#1F2A5C]">
              Sections 2–3: core benefits and capabilities
            </p>
            <p className="mt-2 text-gray-600">Content to come</p>
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
                  the two doctors, just right of centre. */}
              <Image
                src="/images/industries/senior-doctor.webp"
                alt="Two doctors reviewing an X-ray together in a hospital corridor"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="object-cover object-[57%_40%] saturate-[0.85] contrast-[1.08]"
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
                    Emergency Department
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 hidden text-white/50 sm:inline"
                  >
                    |
                  </span>
                  <span className="sr-only"> | </span>
                  <span className="mt-1 block sm:mt-0 sm:inline sm:whitespace-nowrap">
                    Sydney Tertiary Hospital
                  </span>
                </p>
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  <Mint>120 hours</Mint> down to <Mint>40</Mint> on the very
                  first roster
                </h3>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  RosterLab helped a Sydney tertiary ED build a roster for more
                  than 60 senior medical officers, accounting for part-time
                  availability, cross-hospital commitments and shift fairness.
                </p>
                <figure className="mt-7 flex gap-4">
                  <PiQuotesFill
                    aria-hidden="true"
                    className="mt-0.5 h-9 w-9 shrink-0 rotate-180 text-[#03F9BE]"
                  />
                  <div className="border-l border-white/25 pl-5">
                    <blockquote className="text-lg italic text-white/90 leading-relaxed">
                      “It&apos;s about confidence in the roster, about fairness,
                      and about giving senior clinicians time back for patient
                      care - not spreadsheets.”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-xs">
                      Emergency physician, Sydney tertiary hospital ED
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
                Questions ED roster leads ask
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
                rostering challenge. See how RosterLab handles your rosters.
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
          { name: "Emergency Department" },
        ]}
      />
    </SiteLayout>
  );
}
