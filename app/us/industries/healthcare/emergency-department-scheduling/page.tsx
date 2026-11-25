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
import RosterComparison, {
  type ComparisonRow,
} from "@/app/industries/healthcare/emergency-department-rostering/RosterComparison";
import { PiArrowRightBold, PiQuotesFill } from "react-icons/pi";

export const metadata = withHreflang(
  {
    title: "Emergency Department Scheduling Software",
    description:
      "RosterLab automates complex ED scheduling, ensuring the right skill mix on every shift, fair workloads for staff, and reliable coverage around the clock.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/industries/healthcare/emergency-department-scheduling",
    },
    openGraph: {
      title: "Emergency Department Scheduling Software - RosterLab",
      description:
        "RosterLab automates complex ED scheduling, ensuring the right skill mix on every shift, fair workloads for staff, and reliable coverage around the clock.",
      type: "website",
      url: "https://rosterlab.com/us/industries/healthcare/emergency-department-scheduling",
      images: [
        {
          url: "/images/og-images/emergency-department.webp",
          alt: "Healthcare worker in blue scrubs in a hospital corridor",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Emergency Department Scheduling Software - RosterLab",
      description:
        "RosterLab automates complex ED scheduling, ensuring the right skill mix on every shift, fair workloads for staff, and reliable coverage around the clock.",
      images: ["/images/og-images/emergency-department.webp"],
    },
  },
  "/us/industries/healthcare/emergency-department-scheduling",
);

const faqItems = [
  {
    question: "What happens when a doctor calls in sick?",
    answer:
      "When a doctor calls in sick, RosterLab helps find suitable cover based on skills, availability, and rest requirements. Affected shifts can then be rescheduled automatically, minimizing service disruption.",
  },
  {
    question: "Can I edit an AI-generated schedule?",
    answer:
      "Absolutely. You can review and adjust AI-generated schedules before publishing. The AI does the heavy lifting, while your team stays in control of the final schedule.",
  },
  {
    question: "Can doctors submit shift preferences and request time off?",
    answer:
      'Yes. Doctors can submit availability, shift preferences and time-off requests through the <a href="/us/solutions/staff-scheduling-mobile-app" class="underline">RosterLab mobile app</a>. Availability sets when doctors can work; preferences indicate when they’d like to. Your department’s rules define how challenging shifts are shared. Managers review time-off requests, and approved time off is included when generating the schedule.',
  },
  {
    question: "What if we don't have enough staff to cover a shift?",
    answer:
      "RosterLab flags unfilled shifts and unmet skill requirements, so you can see where additional cover is needed and plan accordingly.",
  },
  {
    question: "What do we need to set up our first ED schedule?",
    answer:
      "Bring your current schedule, shift patterns, staffing and skill requirements, contracted hours, availability and department rules. Our implementation specialists help configure these requirements, train your team and review the first generated schedule with you.",
  },
  {
    question: "Can RosterLab work with our existing systems?",
    answer:
      'RosterLab offers enterprise integrations and API access. We review your payroll, HR and reporting workflows with you to confirm the supported connections, export options and setup your team needs. <a href="/us/book-a-demo" class="underline">Discuss your systems with our team</a>.',
  },
];

const LOCATION = "US Industry Page Emergency Department Scheduling";
const PAGE_NAME = "Emergency Department Scheduling";
const INTERACTIVE_DEMO = "/us/product-tour";
const CASE_STUDY =
  "/us/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-scheduling";

const BENEFITS = [
  {
    title: "The right skills. Every shift.",
    description:
      "Set staffing and skill requirements for each area. Spot gaps before publishing.",
  },
  {
    title: "A fair share of tough shifts",
    description:
      "Share nights, weekends, and holidays using your department’s fairness rules.",
  },
  {
    title: "Protect recovery after nights",
    description:
      "Build in working-hour limits, rest between shifts, and post-night recovery.",
  },
  {
    title: "Handle last-minute absences",
    description:
      "Find suitable cover and adjust affected shifts with minimal disruption.",
  },
];

const CAPABILITIES = [
  {
    title: "Coordinate clinical coverage, teaching and supervision",
    description:
      "Coordinate attending and resident physician coverage across ED areas, while accounting for teaching sessions, supervision, and non-clinical commitments.",
    link: {
      label: "Explore AI scheduling",
      href: "/us/solutions/ai-staff-schedule-maker",
    },
    image: {
      src: "/images/industries/us-emergency-department-teaching-time.webp",
      alt: "RosterLab schedule with highlighted teaching shifts and teaching allocation rules by skill level",
      className: "object-cover",
    },
  },
  {
    title: "Build fair schedules around individual availability",
    description:
      "Fit part-time hours, rotations, and known commitments at other hospitals into one schedule. RosterLab applies your department’s fairness targets when allocating nights and weekends.",
    link: {
      label: "Explore scheduling rules",
      href: "/us/feature/rules-engine",
    },
    image: {
      src: "/images/industries/emergency-department-fairness-rules.webp",
      alt: "ED schedule highlighting night shifts, recovery days and weekends off, with rules for night allocation and time off",
      className: "object-cover",
    },
  },
];

const COMPARISON: ComparisonRow[] = [
  {
    task: "Finding cover",
    manual: "Hours spent contacting staff and checking availability",
    rosterlab: "Suitable cover suggested without the chasing",
  },
  {
    task: "Maintaining coverage",
    manual: "Filling one gap can leave another shift short-staffed",
    rosterlab: "Affected shifts are rescheduled to maintain adequate coverage",
  },
  {
    task: "Clinical safety and rest checks",
    manual: "Essential skills and rest requirements can be overlooked",
    rosterlab: "Skill mix and rest requirements checked automatically",
  },
];

const H2 =
  "text-balance text-3xl md:text-[2.75rem] font-semibold text-[#1F2A5C] leading-tight tracking-tight";

/** Proof points in the case study headline. */
function Mint({ children }: { children: React.ReactNode }) {
  return <span className="text-[#03F9BE]">{children}</span>;
}

export default function EmergencyDepartmentPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <IndustryHero
        imageBelowCtasOnMobile
        title="Take the pressure off ED scheduling"
        description="AI scheduling software for emergency departments. Balance clinical coverage, teaching, availability, and workloads fairly."
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
          href: INTERACTIVE_DEMO,
          label: "Explore the product tour",
          analyticsProperties: {
            cta_type: "product_tour",
            page_name: PAGE_NAME,
            section: "hero",
          },
        }}
        image={{
          src: "/images/industries/icu-ed.webp",
          alt: "Emergency department staff on shift",
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
              ED is demanding.
              <br className="hidden lg:block" /> Scheduling shouldn’t be.
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              There&apos;s enough competing for your attention in a busy
              emergency department. Spend less time sorting out schedules and
              more time where you&apos;re needed on the floor.
            </Reveal>
          </div>
          <Reveal
            delay={0.24}
            className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white px-5 py-6 text-center sm:px-8"
          >
            <p className="font-medium text-[#1F2A5C]">
              Designed for scheduling across:
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Adult Emergency Departments",
                "Pediatric Emergency Departments",
                "Emergency Observation Units",
              ].map((specialty) => (
                <li
                  key={specialty}
                  className="rounded-lg bg-[#F4F6FB] px-3.5 py-2 text-[15px] text-[#1F2A5C]"
                >
                  {specialty}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <article className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
            <div className="relative hidden overflow-hidden rounded-[1.25rem] bg-[#F4F6FB] md:rounded-[1.75rem] lg:block">
              <Image
                src="/images/industries/emergency-care-case-study.webp"
                alt="Healthcare worker in blue scrubs pushing a stretcher through a hospital corridor"
                fill
                sizes="340px"
                className="object-cover object-[65%_35%] saturate-[0.85] contrast-[1.08]"
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
                <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                  <Mint>70% time saved</Mint> on the first schedule
                </h3>
                <p className="mt-5 max-w-2xl text-white/85 leading-relaxed md:text-lg">
                  At a Sydney tertiary hospital ED scheduling 60+ senior medical
                  officers every quarter.
                </p>
                <figure className="mt-7 flex gap-4">
                  <PiQuotesFill
                    aria-hidden="true"
                    className="mt-0.5 h-9 w-9 shrink-0 rotate-180 text-[#03F9BE]"
                  />
                  <div className="border-l border-white/25 pl-5">
                    <blockquote className="text-lg italic text-white/90 leading-relaxed">
                      “It’s not just about saving hours. It&apos;s about
                      confidence in the roster, about fairness, and about giving
                      senior clinicians time back for patient care.”
                    </blockquote>
                    <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white/60 md:text-xs">
                      — Emergency physician
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
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:gap-x-12">
            {BENEFITS.map(({ title, description }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.12}>
                <h3 className="text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="mt-3 text-lg text-gray-600 leading-relaxed">
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
            Built for the complexity of ED scheduling
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
              The whole schedule, considered together
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 text-lg text-gray-600 leading-relaxed"
            >
              RosterLab balances cover and rules. You review and publish.
            </Reveal>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <h3 className="mb-6 text-center text-xl md:text-2xl font-semibold text-[#1F2A5C] leading-tight tracking-tight">
              See how manual scheduling and RosterLab compare
            </h3>
            <RosterComparison
              rows={COMPARISON}
              labels={{
                task: "Scheduling task",
                manualHeading: "Manual scheduling",
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
            <h2 className={H2}>Easy transition, backed by expert support</h2>
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bring your existing schedule, shift patterns, staffing needs and
                working arrangements. Our implementation specialists help
                configure your department’s rules, train your schedulers and
                review the first generated schedule with you.
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                We also review your current systems and confirm the integration
                or export options your team needs before agreeing the setup.
              </p>
              <Button
                href="/us/book-a-demo"
                className="mt-5 bg-[#1F2A5C] hover:bg-[#2A3F8F]"
                analyticsLabel="Discuss your ED setup"
                analyticsLocation={LOCATION}
                analyticsProperties={{
                  cta_type: "demo",
                  page_name: PAGE_NAME,
                  section: "onboarding",
                }}
              >
                Discuss your ED setup
              </Button>
            </div>
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
              <h2 className={H2}>Frequently Asked Questions</h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Questions about scheduling for emergency care.
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
                See how RosterLab could handle your ED’s requirements in a
                tailored demo.
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
                  href={INTERACTIVE_DEMO}
                  variant="outline"
                  className="rounded-md border-2 border-[#053B3D] px-7 py-3.5 text-base font-semibold text-[#053B3D] hover:bg-[#053B3D] hover:text-white"
                  analyticsLabel="See how it works"
                  analyticsLocation={LOCATION}
                  analyticsProperties={{
                    cta_type: "product_tour",
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
          {
            name: "Emergency Department",
            url: "/us/industries/healthcare/emergency-department-scheduling",
          },
        ]}
      />
    </SiteLayout>
  );
}
