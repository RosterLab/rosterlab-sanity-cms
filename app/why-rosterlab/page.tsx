import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InlineCtaLink from "@/components/ui/InlineCtaLink";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiCheck } from "react-icons/hi";
import {
  PiChartLineUp,
  PiCheckCircle,
  PiLightning,
} from "react-icons/pi";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import ImplementationBenefits from "@/components/sections/ImplementationBenefits";
import ClosingCta from "@/components/sections/ClosingCta";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import EnterpriseCaseStudies from "@/app/enterprise/EnterpriseCaseStudies";
import { enterpriseStories } from "@/app/enterprise/enterprise-stories";
import RoiTestimonials from "./RoiTestimonials";

const metaDescription =
  "See why healthcare teams choose RosterLab as their AI rostering platform. Create smarter, fairer schedules that put people first.";

export const metadata = withHreflang(
  {
    title: "Why Teams Choose Us for Staff Rostering",
    description: metaDescription,
    alternates: {
      canonical: "https://rosterlab.com/why-rosterlab",
    },
    openGraph: {
      title: "Why Choose Us - RosterLab",
      description: metaDescription,
      type: "website",
      url: "https://rosterlab.com/why-rosterlab",
      images: [
        {
          url: "/images/og-images/why-choose-us.png",
          width: 1200,
          height: 630,
          alt: "Why Choose Us - RosterLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Why Choose Us - RosterLab",
      description: metaDescription,
      images: ["/images/og-images/why-choose-us.png"],
    },
  },
  "/why-rosterlab",
);

const sectionHeadingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight md:text-[2.75rem]";
const cardHeadingClass =
  "text-2xl font-medium leading-tight tracking-tight text-[#1F2A5C] lg:text-[26px]";
const primaryDemoButtonClass =
  "whitespace-nowrap rounded-full bg-[#3779DD] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2A3F8F] focus:ring-[#3779DD] sm:px-8 sm:py-3.5 sm:text-base";
const blueInlineCtaClass =
  "text-[#2B68C4] hover:text-[#1F2A5C] focus-visible:text-[#1F2A5C]";

const rosteringChallenges = [
  {
    title: "Managers are buried",
    titleContinuation: "in roster admin",
    description:
      "Managers spend hours juggling spreadsheets, fixing schedules and chasing updates instead of leading their teams.",
  },
  {
    title: "Staff are stretched",
    titleContinuation: "too thin",
    description:
      "Uneven workloads, back-to-back shifts and overlooked fatigue push skilled staff to their limits.",
  },
  {
    title: "Coverage is",
    titleContinuation: "never guaranteed",
    description:
      "Last-minute absences and critical skills gaps impact productivity and disrupt service delivery.",
  },
];

const healthcareRosteringBenefits = [
  {
    title: "Days back for the work that matters",
    description:
      "Cut days of roster admin down to minutes, freeing managers and clinical leaders to focus on their teams and patients.",
  },
  {
    title: "Teams feel valued and supported",
    description:
      "Fairer shifts, flexible schedules, and time to recover help your people feel heard, valued and supported. RosterLab makes that possible.",
  },
  {
    title: "The right skills and coverage met",
    description:
      "Match staffing and skills to service needs, reduce avoidable gaps and put available capacity where it makes the biggest difference.",
  },
  {
    title: "Fewer staffing gaps. Stronger coverage.",
    description:
      "Know where teams are stretched, where skills are short, and where extra support is needed, so you can act before service delivery is hit.",
  },
];

const featurePlaceholderClass =
  "aspect-video w-full rounded-3xl bg-[#F4F6FB] lg:aspect-[3/2]";

export default function WhyRosterLabPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-white pt-12 sm:pt-16 lg:pt-24">
        <Container className="max-w-7xl">
          <div className="grid items-center gap-8 border-b border-slate-200 pb-6 md:pb-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div>
              <h1 className="max-w-[20ch] text-balance text-[clamp(2.25rem,4.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.024em] text-[#1F2A5C]">
                The proven AI rostering platform for healthcare
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                RosterLab combines advanced AI with real-world healthcare
                expertise to make rostering faster, fairer, and effortless. So
                your clinical workforce can work at its best.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/book-a-demo" className={primaryDemoButtonClass}>
                  Book a demo
                </Button>
                <Button
                  href="/us/solutions/ai-staff-schedule-maker"
                  variant="outline"
                  className="whitespace-nowrap rounded-full border border-[#3779DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB] focus:ring-[#3779DD] sm:px-8 sm:py-3.5 sm:text-base"
                >
                  Explore AI rostering
                </Button>
              </div>
            </div>

            {/* Space reserved for the hero image. */}
            <div
              aria-hidden="true"
              className="aspect-video w-full rounded-3xl bg-[#F4F6FB] lg:aspect-[5/4]"
            />
          </div>
        </Container>
      </section>

      <TrustedByDualRow
        singleRow
        heading="Trusted by leading hospitals and health systems"
        headingClassName="text-center text-xl text-[#1F2A5C] md:text-2xl lg:text-left"
        headingContainerClassName="max-w-none lg:max-w-md"
        sectionClassName="pt-4 md:pt-8"
        logoColor="#1F2A5C"
        containerClassName="max-w-7xl"
      />

      <section
        aria-labelledby="rostering-challenges-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-7xl text-center">
          <h2
            id="rostering-challenges-heading"
            className={`mx-auto max-w-4xl text-[#1F2A5C] ${sectionHeadingClass}`}
          >
            The real cost of poor rostering
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            When rosters fall apart, the consequences are immediate – and felt
            most personally by your people on the front line.
          </p>

          <div className="mx-auto mt-10 grid max-w-xl divide-y divide-dashed divide-slate-300 md:max-w-none md:grid-cols-3 md:divide-x md:divide-y-0">
            {rosteringChallenges.map(
              ({ title, titleContinuation, description }) => (
                <div
                  key={title}
                  className="py-7 sm:px-4 sm:py-8 md:row-span-3 md:grid md:grid-rows-subgrid md:px-3 md:py-0 xl:px-6"
                >
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-4 size-14 rounded-full border border-[#D8E1F0] bg-[#EAF1FF] sm:mb-5 sm:size-24 min-[1100px]:size-36"
                  />
                  <h3 className={`text-balance md:min-h-[2lh] ${cardHeadingClass}`}>
                    {title} <br className="hidden min-[1100px]:block" />
                    {titleContinuation}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-pretty text-base leading-relaxed text-gray-600 md:text-[15px] min-[1100px]:tracking-tight xl:text-base xl:tracking-normal">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="rosterlab-difference-heading"
        className="bg-[#141B3F] py-16 text-center text-white md:py-24"
      >
        <Container>
          <h2
            id="rosterlab-difference-heading"
            className={`mx-auto max-w-3xl ${sectionHeadingClass}`}
          >
            Your rostering tools can’t keep up.{" "}
            <span className="text-[#03FABF] lg:block">RosterLab can.</span>
          </h2>
          <div className="mx-auto mt-6 max-w-5xl space-y-6 text-pretty text-lg leading-relaxed text-white/90 lg:max-w-[52rem] lg:space-y-4 lg:text-balance">
            <p>
              Spreadsheets and legacy rostering systems can only take you so
              far when you're managing complex staffing needs, changing
              demands and the expectations of your team.
            </p>
            <p>
              That's where RosterLab makes the difference. Roster with
              confidence, knowing your coverage is met, people are supported,
              and labour costs are kept in check.
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="rostering-roi-heading"
        className="bg-[#F4F6FB] py-12 text-[#1F2A5C] md:py-16"
      >
        <Container className="max-w-7xl">
          <div className="grid gap-8 text-left lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-10 lg:gap-y-3 xl:gap-x-14">
            <div className="min-w-0 text-center lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:text-left">
              <h2
                id="rostering-roi-heading"
                className={`scroll-mt-24 ${sectionHeadingClass}`}
              >
                Real impact. Backed by results.
              </h2>
              <div>
                <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-gray-600 md:text-lg lg:mx-0 lg:mt-0">
                  The proof is in the results. Here's what organisations have
                  achieved with RosterLab
                </p>

                <ul className="mt-6 grid divide-y divide-[#D8E1F0] sm:grid-cols-3 sm:divide-y-0 md:mt-8">
                  {[
                    { value: "~90%", label: "less time spent on rostering" },
                    { value: "~5%", label: "improvement in staffing efficiency" },
                    { value: "~10%", label: "increase in employee satisfaction" },
                  ].map(({ value, label }) => (
                    <li
                      key={label}
                      className="py-7 sm:px-3 sm:py-5 md:py-6 lg:first:pl-0 lg:last:pr-0"
                    >
                      <span className="block text-[2.5rem] font-medium leading-none tracking-tight text-[#3779DD] md:text-5xl lg:text-[2.5rem] xl:text-5xl">
                        {value}
                      </span>
                      <span className="mx-auto mt-3 block text-pretty text-base leading-relaxed text-gray-600 sm:mt-2 sm:max-w-[11rem] sm:text-balance sm:leading-normal lg:mx-0 lg:text-sm">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 md:mt-6">
                  <InlineCtaLink
                    href="/tools/roi-calculator"
                    label="Calculate your ROI"
                    className={blueInlineCtaClass}
                    analyticsLocation="Why RosterLab"
                    analyticsProperties={{
                      cta_type: "roi_calculator",
                      page_name: "Why RosterLab",
                      section: "roi",
                    }}
                  />
                </div>
              </div>
            </div>
            <RoiTestimonials />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="healthcare-rostering-benefits-heading"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
              What Sets RosterLab Apart
            </p>
            <h2
              id="healthcare-rostering-benefits-heading"
              className={`text-[#1F2A5C] ${sectionHeadingClass}`}
            >
              Better rostering changes everything
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-[70rem] grid-cols-1 gap-y-9 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-7 md:before:col-span-2 md:before:row-start-2 md:before:border-t md:before:border-[#1F2A5C]/10">
            {healthcareRosteringBenefits.map(({ title, description }) => (
              <div key={title} className="text-center md:text-left">
                <h3
                  className={`text-balance md:max-lg:min-h-[2lh] ${cardHeadingClass}`}
                >
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-pretty text-base leading-relaxed text-gray-600 md:mx-0">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:mt-16">
            <Button
              href="/book-a-demo"
              className={primaryDemoButtonClass}
              analyticsLabel="Book a Demo"
              analyticsLocation="Why RosterLab"
              analyticsProperties={{
                cta_type: "demo",
                page_name: "Why RosterLab",
                section: "healthcare_rostering_benefits",
              }}
            >
              Book a Demo
            </Button>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ai-optimisation-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
                Purpose-Built AI Optimisation
              </p>
              <h3
                id="ai-optimisation-heading"
                className={`text-[#1F2A5C] ${sectionHeadingClass}`}
              >
                AI rostering that goes beyond simple automation
              </h3>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  Every roster generated in RosterLab is powered by the
                  industry’s most advanced AI roster optimisation engine.
                </p>
                <p>
                  Where traditional rostering software fills shifts and checks
                  rules, RosterLab goes much further – evaluating
                  thousands of possible staffing combinations to find the best
                  fit, not just one that works.
                </p>
                <ul role="list" className="space-y-2">
                  {[
                    "Reliable clinical staffing coverage",
                    "More balanced workloads across teams",
                    "Better utilisation of staff and skills",
                  ].map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5">
                      <HiCheck
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-blue-700"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <InlineCtaLink
                href="/solutions/ai-roster-generator"
                label="Explore AI rostering"
                className={`mt-6 ${blueInlineCtaClass}`}
                analyticsLocation="Why RosterLab"
                analyticsProperties={{
                  cta_type: "learn_more",
                  page_name: "Why RosterLab",
                  section: "ai_optimisation",
                }}
              />
            </div>
            <div
              aria-hidden="true"
              className={`${featurePlaceholderClass} border border-slate-200`}
            />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="otto-heading"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="lg:col-start-2 lg:row-start-1">
              <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
                Otto - AI Rostering Assistant
              </p>
              <h3
                id="otto-heading"
                className={`text-[#1F2A5C] ${sectionHeadingClass}`}
              >
                The future of rostering is almost here
              </h3>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  Imagine an AI assistant that doesn't just understand your
                  roster, but can act on it – building schedules, managing shift
                  changes and optimising rostering decisions through simple
                  conversation.
                </p>
                <p>
                  That's the future we're building with Otto. RosterLab's AI
                  rostering assistant is evolving to take on increasingly
                  complex scheduling tasks on your behalf, always with your
                  approval and oversight.
                </p>
              </div>
              <InlineCtaLink
                href="/feature/ai-staff-rostering-assistant"
                label="Explore Otto"
                className={`mt-6 ${blueInlineCtaClass}`}
                analyticsLocation="Why RosterLab"
                analyticsProperties={{
                  cta_type: "learn_more",
                  page_name: "Why RosterLab",
                  section: "otto",
                }}
              />
            </div>
            <div
              aria-hidden="true"
              className={`${featurePlaceholderClass} lg:col-start-1 lg:row-start-1`}
            />
          </div>
        </Container>
      </section>

      <ImplementationBenefits
        heading={
          <>
            Making the move easier, <br />
            right from the start.
          </>
        }
        headingId="implementation-benefits-heading"
        containerClassName="max-w-7xl"
        cardHeadingAs="h4"
        cardDescriptionClassName="text-blue-50"
        tone="blue"
        cards={[
          {
            icon: PiLightning,
            title: "Results from day one",
            description:
              "From building your first roster with RosterLab, you'll experience time saved and fewer errors from day one.",
          },
          {
            icon: PiCheckCircle,
            title: "Easy transition",
            description:
              "Maintain your rostering approach while reducing admin for an easy, seamless transition.",
          },
          {
            icon: PiChartLineUp,
            title: "Grows as you scale",
            description: (
              <>
                Personalised rules for roles and skills make RosterLab easy to
                scale across your organisation and workforce groups.
                <InlineCtaLink
                  href="/enterprise"
                  label="See RosterLab for Enterprise"
                  className="mt-3 flex w-fit"
                  onDark
                  analyticsLocation="Why RosterLab"
                  analyticsProperties={{
                    cta_type: "learn_more",
                    page_name: "Why RosterLab",
                    section: "implementation_benefits",
                  }}
                />
              </>
            ),
          },
        ]}
      />

      <section
        aria-label="Customer case studies"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-7xl">
          <EnterpriseCaseStudies stories={enterpriseStories} />
        </Container>
      </section>

      {/* FAQ Section */}
      <section
        aria-labelledby="why-rosterlab-faq-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2
                id="why-rosterlab-faq-heading"
                className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight"
              >
                Frequently asked questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                Common questions about our AI-powered rostering with RosterLab
              </p>
            </div>
            <EnterpriseFAQ
              items={[
                {
                  question:
                    "How is RosterLab different from an ordinary rostering tool or spreadsheet?",
                  answer: `<p>Spreadsheets and traditional rostering tools help you organise shifts and check for conflicts, but much of the harder decisions like meeting cover, fairness, compliance, and staff preferences still falls on you.</p>
                    <p class="mt-4">Rather than simply digitising the rostering process, RosterLab takes on the complex work itself. Our AI works through your intricate constraints, rules, and preferences together to generate complete, optimised rosters in minutes.</p>`,
                },
                {
                  question: "What kind of AI is RosterLab?",
                  answer:
                    "RosterLab uses mathematical optimisation (operations research) to build and solve rosters. The AI applies mathematical, statistical, and computational methods to help make smarter rostering decisions, especially for complex ones involving limited resources, risks, and trade-offs.",
                },
                {
                  question:
                    "How quickly can we start seeing results with RosterLab?",
                  answer: `You don't need to overhaul your rostering process to start seeing results. RosterLab works with your existing shift patterns, staffing rules and requirements, helping teams see measurable improvements in their first rostering cycle - one Sydney hospital emergency department cut roster admin time from <a class="font-medium text-blue-700 underline underline-offset-4" href="/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering">120 hours to 40 hours</a> on their very first roster built with RosterLab.`,
                },
                {
                  question:
                    "Can RosterLab work with our existing workforce management (WFM) system?",
                  answer:
                    "Yes. RosterLab can work alongside your existing workforce management system, adding advanced AI rostering capabilities without requiring you to replace the tools you already use. This means you can keep your current WFM system while using RosterLab to manage more complex clinical rostering requirements, from skill mix and staffing coverage to fairness and compliance.",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <ClosingCta
        heading="Your next roster could be a whole lot easier"
        headingId="why-rosterlab-cta-heading"
        description="Bring us your toughest rostering challenges, and we'll show you how RosterLab can help."
      >
        <Button
          href="/book-a-demo"
          className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB]"
        >
          Book a demo
        </Button>
      </ClosingCta>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Why Choose Us" }]}
      />
    </SiteLayout>
  );
}
