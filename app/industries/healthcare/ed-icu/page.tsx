import Container from "@/components/ui/Container";
import IndustryHero from "@/components/sections/IndustryHero";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import Reveal from "@/app/enterprise/Reveal";
import Image from "next/image";
import Link from "next/link";
import RosterComparison, { type ComparisonRow } from "./RosterComparison";
import { PiArrowRightBold, PiQuotesFill } from "react-icons/pi";

export const metadata = withHreflang(
  {
    title: "Emergency Department Rostering Software",
    description:
      "RosterLab automates complex ED rostering, ensuring the right skill mix on every shift, fair workloads for staff and reliable coverage around the clock.",
    alternates: {
      canonical: "https://rosterlab.com/industries/healthcare/ed-icu",
    },
    openGraph: {
      title: "Emergency Department Rostering Software - RosterLab",
      description:
        "RosterLab automates complex ED rostering, ensuring the right skill mix on every shift, fair workloads for staff and reliable coverage around the clock.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare/ed-icu",
      images: [
        {
          url: "/images/og-images/IndustryICUED.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Emergency Department Rostering Software - RosterLab",
      description:
        "RosterLab automates complex ED rostering, ensuring the right skill mix on every shift, fair workloads for staff and reliable coverage around the clock.",
      images: ["/images/og-images/IndustryICUED.png"],
    },
  },
  "/industries/healthcare/ed-icu",
);

const faqItems = [
  {
    question: "How does RosterLab automate ED rostering?",
    answer:
      "RosterLab replaces manual planning and outdated systems with AI that generates fair, compliant ED rosters in a fraction of the time. It balances your shift patterns, clinical skill mix, coverage needs and rostering rules to find the best-fit solution. As requirements change, you can easily adapt the roster without starting from scratch.",
  },
  {
    question: "What if we don’t have enough doctors to cover a shift?",
    answer:
      "RosterLab uses the coverage demands you set and flags unfilled shifts or unmet skill requirements. Review the gaps and decide where you need extra staffing before publishing.",
  },
  {
    question: "How can we cover a last-minute absence?",
    answer:
      "When a doctor calls in sick, RosterLab quickly identifies available, suitably qualified staff to safely cover the shift, enabling you to re-roster affected shifts promptly with minimal service disruption.",
  },
  {
    question:
      "Can we roster doctors who work part-time or at another hospital?",
    answer:
      "Yes. RosterLab accommodates doctors with part-time hours or commitments across multiple hospitals. Add each doctor’s contracted hours, availability and known commitments at other sites, and RosterLab will take these into account when generating the roster.",
  },
  {
    question: "Can I edit an AI-generated roster?",
    answer:
      "Absolutely. You can review and adjust AI-generated rosters before publishing. The AI does the heavy lifting, while you stay in control of all scheduling decisions",
  },
  {
    question: "How do I share rosters with my team?",
    answer:
      'Once you\'ve published your roster, clinicians can view their schedules directly in the <a href="/solutions/staff-roster-mobile-app" class="underline">RosterLab mobile app</a>. They can also sync shifts to their personal calendars and receive notifications about any roster changes.',
  },
];

const LOCATION = "Industry Page ED & ICU Rostering";
const PAGE_NAME = "ED & ICU Rostering";
const INTERACTIVE_DEMO = "/staff-rostering-interactive-demo";
const CASE_STUDY =
  "/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering";

const BENEFITS = [
  {
    title: "The right clinical cover, day and night",
    description:
      "From senior cover and junior doctor supervision to ED-specific capabilities, RosterLab builds your staffing and skill mix requirements directly into the roster, keeping every area covered.",
  },
  {
    title: "A fairer share of challenging shifts",
    description:
      "Distribute nights, weekends, public holidays and on-call duties equitably across the team, taking into account each clinician's FTE, leave and individual work patterns.",
  },
  {
    title: "Protecting time for rest and recovery",
    description:
      "Long shifts and nights make adequate rest essential. RosterLab applies your working-hour limits, minimum rest and post-night recovery rules to manage fatigue and support clinician wellbeing.",
  },
  {
    title: "Less disruption when plans change",
    description:
      "A last-minute absence shouldn't mean reworking the entire roster. Regenerate affected shifts while keeping existing allocations intact. Managers stay in firm control before publishing.",
  },
];

const CAPABILITIES = [
  {
    title: "Coordinate every aspect of ED staffing",
    description:
      "Acute care, resus and short stay each have distinct staffing needs. An ED roster must also account for the educational, supervisory and non-clinical commitments of different groups of doctors. RosterLab’s AI brings all these considerations together to build a roster that reflects your exact requirements.",
    link: {
      label: "Explore AI-rostering",
      href: "/solutions/ai-roster-generator",
    },
    image: {
      src: "/images/generating.webp",
      alt: "RosterLab generating a staff roster",
      className: "object-contain",
    },
  },
  {
    title: "Let clinicians shape their schedules",
    description:
      "Give clinicians more flexibility over when they work, with the ability to submit shift preferences, request swaps and pick up open shifts directly through the mobile app. RosterLab factors in these requests while maintaining fairness and the coverage your department needs.",
    link: {
      label: "Explore self-scheduling",
      href: "/feature/self-scheduling",
    },
    image: {
      src: "/images/industries/nursing/staff-preferences-v2.webp",
      alt: "Staff preferences in RosterLab on desktop and shift requests in the mobile app",
      className: "object-cover",
    },
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

const H2 =
  "text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight";

/** Proof points in the case study headline. */
function Mint({ children }: { children: React.ReactNode }) {
  return <span className="text-[#03F9BE]">{children}</span>;
}

export default function ICUEDPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <IndustryHero
        imageBelowCtasOnMobile
        title="Take the pressure off emergency care rostering"
        description="Generate ED schedules that balance workloads, protect recovery time, and maintain round-the-clock coverage — without the usual complexity."
        analyticsLocation="Industry Page ED & ICU Rostering"
        primaryCta={{
          href: "/book-a-demo",
          label: "Book a demo",
          analyticsProperties: {
            cta_type: "demo",
            page_name: "ED & ICU Rostering",
            section: "hero",
          },
        }}
        secondaryCta={{
          href: INTERACTIVE_DEMO,
          label: "Explore the product tour",
          analyticsProperties: {
            cta_type: "how_it_works",
            page_name: "ED & ICU Rostering",
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/icu-ed.webp",
          alt: "Emergency and intensive care staff on shift",
        }}
      />

      <TrustedByDualRow
        singleRow
        centerHeadingOnMobile
        headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
        logoColor="#1F2A5C"
        heading="Trusted by healthcare teams"
      />

      <section className="bg-[#F4F6FB] py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal as="h2" className={H2}>
              The roster shouldn&apos;t be another thing competing for your
              attention
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              There&apos;s already enough to juggle in a busy emergency
              department. RosterLab takes the complexity and admin work out of
              building and managing rosters, giving you more time to focus on
              your team, your patients, and the demands of the floor.
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
            <div className="relative hidden overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] md:rounded-[1.75rem] lg:block">
              <Image
                src="/images/industries/senior-doctor.webp"
                alt="Two doctors reviewing an X-ray together in a hospital corridor"
                fill
                sizes="340px"
                className="object-cover object-[57%_40%] saturate-[0.85] contrast-[1.08]"
              />

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
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  <Mint>120 hours</Mint> down to <Mint>40</Mint> on the very
                  first roster
                </h2>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  RosterLab helped a Sydney tertiary hospital ED cut rostering
                  time by 70%, making it easier to manage complex working
                  arrangements for more than 60 senior medical officers.
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

      <section className="bg-white py-16 md:py-28">
        <Container>
          <Reveal as="h2" className={`mx-auto max-w-4xl text-center ${H2}`}>
            Built for the complexity of emergency care rostering
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

      <section
        id="how-it-works"
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

      <section className="relative overflow-hidden bg-white pt-16 pb-32 md:pt-24 md:pb-40">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-[1.25] md:leading-[1.25] tracking-tight">
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

      <section className="bg-[#F4F6FB] pt-28 pb-16 md:pt-36 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Questions about rostering for emergency care.
              </p>
            </div>
            <EnterpriseFAQ items={faqItems} />
          </div>
        </Container>
      </section>

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
          { name: "ED/ICU", url: "/industries/healthcare/ed-icu" },
        ]}
      />
    </SiteLayout>
  );
}
