import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import IndustryHero from "@/components/sections/IndustryHero";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import { getUSPath, withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import Reveal from "@/app/enterprise/Reveal";
import RosterComparison, {
  type ComparisonRow,
} from "@/app/industries/healthcare/nurse-rostering/RosterComparison";
import {
  PiArrowRightBold,
  PiHandshake,
  PiMagnifyingGlass,
  PiMoonStars,
  PiQuotesFill,
  PiUsersThree,
} from "react-icons/pi";
import type { IconType } from "react-icons";

// Palette follows the enterprise page: navy #1F2A5C for headings and dark
// surfaces, site blue #3B7FE8 for actions, mint #03F9BE for proof points on
// navy, tint #F4F6FB for alternate sections. Workforce pages close on a teal
// banner where specialty pages (enterprise) close on blue.

// Written out in full rather than through constants: the US SEO test reads
// this expression on its own (lib/localization/__tests__/us-seo.test.ts).
export const metadata = withHreflang(
  {
    title: "Nursing & Midwifery AI Scheduling Software",
    description:
      "Generate nursing and midwifery schedules around skill mix, labor laws and staff preferences. Less scheduling admin, with managers in control. Explore RosterLab.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/industries/healthcare/nurse-scheduling",
    },
    openGraph: {
      title: "Nursing & Midwifery AI Scheduling Software | RosterLab",
      description:
        "Generate nursing and midwifery schedules around skill mix, labor laws and staff preferences. Less scheduling admin, with managers in control. Explore RosterLab.",
      type: "website",
      url: "https://rosterlab.com/us/industries/healthcare/nurse-scheduling",
      images: [
        {
          url: "/images/us-images/iStock-2232242180.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nursing & Midwifery AI Scheduling Software | RosterLab",
      description:
        "Generate nursing and midwifery schedules around skill mix, labor laws and staff preferences. Less scheduling admin, with managers in control. Explore RosterLab.",
      images: ["/images/us-images/iStock-2232242180.jpg"],
    },
  },
  "/us/industries/healthcare/nurse-scheduling",
);

const LOCATION = "US Industry Page Nurse Scheduling";
const PAGE_NAME = "Nurse Scheduling";
const HOW_IT_WORKS = "how-it-works";
const CASE_STUDY =
  getUSPath("/case-studies/dargaville-medical-centre-new-zealand") ??
  "/us/case-studies";

/* ---------------------------------------------------------------- content */

const SPECIALTIES = [
  "Medical & surgical units",
  "Emergency",
  "Critical care",
  "Perioperative",
  "Maternity & midwifery",
  "Palliative care",
  "Mental health",
  "Long-term care",
];

// Open on the intro's grey, each benefit marked by its own coloured tile.
const BENEFITS: {
  icon: IconType;
  title: string;
  description: string;
  tile: string;
}[] = [
  {
    icon: PiUsersThree,
    title: "Less juggling. More time for your team.",
    description:
      "Balancing everyone’s needs takes time and care. RosterLab builds the schedule around your rules and staff requests, so you spend less time piecing shifts together and more time supporting your team.",
    tile: "bg-[#3B7FE8]",
  },
  {
    icon: PiMoonStars,
    title: "Fairer shifts, with room to recover",
    description:
      "A fair schedule helps staff plan their lives and recover between shifts. RosterLab balances nights and weekends around contracted hours, agreed arrangements and preferences, while applying your team’s rest rules.",
    tile: "bg-[#5B67D8]",
  },
  {
    icon: PiHandshake,
    title: "Honor the agreements your team relies on",
    description:
      "Your team should be able to rely on the arrangements agreed with them. RosterLab applies your compliance rules, contracted hours and rest requirements during generation, and flags violations when you make changes.",
    tile: "bg-[#E57200]",
  },
  {
    icon: PiMagnifyingGlass,
    title: "See where your team needs more support",
    description:
      "You shouldn’t have to hold every staffing detail in your head. See gaps in headcount, senior cover and clinical skills before publishing, so you know where extra support is needed.",
    tile: "bg-[#0E9F7E]",
  },
];

const CAPABILITIES = [
  {
    title: "Generate the whole schedule around your rules",
    description:
      "For example, a unit needs a charge nurse each night. One nurse has approved time off; another has a fixed working pattern. RosterLab considers these commitments alongside RN/LPN mix, preferences and rest rules. Midwifery teams can define competencies needed across antenatal, birthing and postnatal services.",
    link: {
      label: "Explore AI scheduling",
      href: "/us/solutions/ai-staff-schedule-maker",
    },
    image: {
      src: "/images/industries/nursing/us-ai-schedule-generating.webp",
      alt: "RosterLab generating a unit schedule in front of the Rule Builder, balancing rules, staffing demand and staff preferences",
      className: "object-cover object-[center_40%]",
    },
  },
  {
    title: "Meet more staff preferences",
    description:
      "Nurses and midwives submit preferences, request swaps and apply for open shifts through the app. RosterLab weighs requests across the team alongside coverage and agreement rules, helping you find a fairer balance.",
    link: {
      label: "Explore self-scheduling",
      href: "/us/feature/self-scheduling",
    },
    image: {
      src: "/images/industries/nursing/us-staff-preferences.webp",
      alt: "Staff preferences in RosterLab on desktop, with a nurse requesting a shift and accepting an open shift in the mobile app",
      className: "object-cover object-[center_40%]",
    },
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    task: "Creating allocations",
    manual: "The scheduler assigns shifts and checks requirements.",
    rosterlab:
      "AI generates allocations around staffing requirements, agreements and staff requests.",
  },
  {
    task: "Balancing connected needs",
    manual: "The scheduler checks the effects of each allocation.",
    rosterlab:
      "Optimization considers connected requirements across the schedule.",
  },
  {
    task: "Handling absences",
    manual: "The scheduler rearranges shifts and checks the consequences.",
    rosterlab: "Re-scheduling helps adjust affected shifts for manager review.",
  },
];

const FAQ_ITEMS = [
  {
    question:
      "How is automated nurse scheduling different from digital schedule management?",
    answer:
      "A schedule can be digital and still be built by hand. RosterLab’s AI generates allocations around staffing requirements, agreement rules and staff requests. Your team reviews and approves the result, then manages preferences, swaps and later changes in the same platform.",
  },
  {
    question:
      "How does RosterLab help us meet staffing and skill requirements?",
    answer:
      "Set the staffing levels and competencies each shift needs. RosterLab uses these during generation and highlights shortfalls, so managers can see where additional cover or a staffing decision is needed.",
  },
  {
    question:
      "Can nurses and midwives request their preferred shifts and time off?",
    answer:
      "Yes. Staff submit shift preferences, time-off requests and availability through the app. RosterLab balances requests across the team against coverage and agreement rules. Managers can review unmet requests before publishing.",
  },
  {
    question:
      "What happens when a nurse or midwife calls in sick at the last minute?",
    answer:
      "Review staff whose recorded skills and availability match the gap, along with their scheduled hours and rest requirements. Re-scheduling helps adjust affected shifts; managers review the changes and address any remaining shortfall.",
  },
  {
    question: "How does RosterLab help distribute nights and weekends fairly?",
    answer:
      "Set allocation rules for nights and weekends around contracted hours and agreed working arrangements. RosterLab applies them consistently during generation, while considering preferences. Review workloads and unmet requests before approving the schedule.",
  },
  {
    question: "Can we keep our existing payroll and workforce systems?",
    answer:
      "We’ll confirm the exports or integrations available for your systems and identify any manual steps before rollout. This includes how schedule changes would be kept in sync, so you can assess the full workflow.",
  },
  {
    question: "What information do we need to get started?",
    answer:
      "We start by reviewing your current schedule, staff list, contracted hours, shift types, clinical skill requirements and compliance rules. We’ll help separate fixed commitments from preferences and confirm the rules, data and system requirements for your team.",
  },
  {
    question: "Can we keep fixed working arrangements and approved time off?",
    answer:
      "Yes. Approved time off and fixed working arrangements are set separately from preferences, so the generated schedule accounts for commitments already agreed with staff.",
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

export default function USNurseSchedulingPage() {
  return (
    <SiteLayout>
      {/* 1 — Hero: the shared industry layout. */}
      <IndustryHero
        title="Less scheduling admin. More time for care."
        description="RosterLab automatically generates nursing and midwifery schedules around staff preferences, skill mix, coverage and labor laws. Less juggling, more time for your team and patients."
        analyticsLocation={LOCATION}
        primaryCta={{
          href: "/us/book-a-demo",
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
          src: "/images/industries/nurses.webp",
          alt: "Nurses on a hospital unit",
        }}
      />

      {/* 2 — Intro: centred heading and copy, the specialties in one white
          bubble on the grey. */}
      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal as="h2" className={H2}>
              The schedule shouldn&apos;t make a demanding job harder
            </Reveal>
            <Reveal
              delay={0.12}
              className="mt-6 space-y-4 text-lg text-gray-600 leading-relaxed"
            >
              <p>
                Nurses and midwives deserve schedules that give them enough time
                to recover between shifts, plan ahead and balance work with life
                outside it.
              </p>
              <p>
                For nursing and midwifery leads, every schedule means balancing
                time off, working arrangements and the right clinical cover.
                RosterLab brings those needs together, so less of that balancing
                falls on you.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.24}
            className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white px-5 py-6 text-center sm:px-8"
          >
            <p className="font-medium text-[#1F2A5C]">
              Designed for nursing and midwifery scheduling across:
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
            Built for the complexity of nursing and midwifery scheduling
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
                  className={`relative aspect-[3/2] overflow-hidden rounded-2xl bg-[#EAF1FD] shadow-sm ring-1 ring-[#1F2A5C]/5 ${
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
                  the nurse, who stands right of centre. */}
              <Image
                src="/images/industries/nursing/nurse-case-study.webp"
                alt="A smiling nurse in scrubs holding a coffee and a folder"
                fill
                sizes="(min-width: 1024px) 340px, 100vw"
                className="object-cover object-[60%_30%] saturate-[0.85] contrast-[1.08]"
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
                    Primary care nursing
                  </span>
                  <span
                    aria-hidden="true"
                    className="mx-3 hidden text-white/50 sm:inline"
                  >
                    |
                  </span>
                  <span className="sr-only"> | </span>
                  <span className="mt-1 block sm:mt-0 sm:inline sm:whitespace-nowrap">
                    Dargaville Medical Centre, New Zealand
                  </span>
                </p>
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  From <Mint>2–3 days</Mint> to around <Mint>three hours</Mint>
                </h3>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  Dargaville Medical Centre reduced preparation of its four-week
                  schedule from 2–3 days to around three hours, including review
                  and adjustments, while accommodating nurses’ working
                  arrangements and preferences.
                </p>
                <figure className="mt-7 flex gap-4">
                  <PiQuotesFill
                    aria-hidden="true"
                    className="mt-0.5 h-9 w-9 shrink-0 rotate-180 text-[#03F9BE]"
                  />
                  <div className="border-l border-white/25 pl-5">
                    <blockquote className="text-lg italic text-white/90 leading-relaxed">
                      “With RosterLab, the rostering process has been
                      dramatically reduced, and we believe it will only get
                      quicker.”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-xs">
                      Judy Harris, Practice Manager, Dargaville Medical Centre
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
              The whole schedule, considered together
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              One shift change can affect someone’s rest, contracted hours or
              availability tomorrow. RosterLab’s optimization works through
              these connected requirements across the schedule, helping you find
              a workable balance without checking every combination by hand.
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <h3 className="mb-6 text-center text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              Manual planning in Excel and RosterLab compared
            </h3>
            <RosterComparison
              rows={COMPARISON}
              labels={{
                task: "Scheduling task",
                manualNote: "(Manual scheduling)",
              }}
            />
          </div>
        </Container>
      </section>

      {/* 6 — Onboarding & support: heading left, copy right, on the FAQ's
          columns so the two sections line up. */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.1] tracking-tight">
              Saving time from your first schedule
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our implementation specialists help turn your existing rules and
              working arrangements into a schedule setup for your team. We train
              your schedulers, review the first generated schedule with you and
              discuss how RosterLab fits your current systems.
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
                Questions we hear from nursing and midwifery managers
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
                scheduling challenge. See how RosterLab handles your
                requirements, with time to discuss setup, existing systems and
                next steps.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href="/us/book-a-demo"
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
          { name: "Home", url: "/us" },
          { name: "Industries", url: "/us/industries" },
          { name: "Healthcare", url: "/us/industries/healthcare-scheduling" },
          { name: "Nursing & Midwifery" },
        ]}
      />
    </SiteLayout>
  );
}
