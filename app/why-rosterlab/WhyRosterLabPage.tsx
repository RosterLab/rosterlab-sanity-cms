import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import InlineCtaLink from "@/components/ui/InlineCtaLink";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import {
  PiChartLineUp,
  PiHandshake,
  PiPlugsConnected,
  PiSlidersHorizontal,
} from "react-icons/pi";
import { getUSPath } from "@/components/seo/HreflangTags";
import { localizeUSText } from "@/lib/localization/us-text";
import { enterpriseText } from "@/app/enterprise/enterprise-copy";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import ClosingCta from "@/components/sections/ClosingCta";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import EnterpriseCaseStudies from "@/app/enterprise/EnterpriseCaseStudies";
import { enterpriseStories } from "@/app/enterprise/enterprise-stories";
import RoiTestimonials from "./RoiTestimonials";

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
    title: "Clinical leads carry",
    titleContinuation: "the admin burden",
    description:
      "Hours are lost to manual planning, resolving conflicts and constant roster adjustments.",
  },
  {
    title: "Staff are stretched",
    titleContinuation: "too thin",
    description:
      "Uneven workloads, back-to-back shifts and insufficient recovery time push clinicians to their limits.",
  },
  {
    title: "Patients face",
    titleContinuation: "delays in care",
    description:
      "Unexpected absences and gaps in clinical cover can delay patient treatment and disrupt planned care.",
  },
];

const healthcareRosteringBenefits = [
  {
    title: "Days back for the work that matters",
    description:
      "Turn days of manual planning into minutes with AI that works through the complexities of rostering for you.",
  },
  {
    title: "Clinicians feel valued and supported",
    description:
      "Give clinicians a fairer share of shifts, time to recover and schedules that accommodate their individual working arrangements.",
  },
  {
    title: "Fewer gaps in clinical cover",
    description:
      "Align staffing levels and clinical skill mix across shifts, maintaining the coverage needed to deliver care with fewer disruptions.",
  },
  {
    title: "More from your existing workforce",
    description:
      "Make better use of contracted hours and available staff, reducing avoidable overtime and reliance on costly temporary staffing.",
  },
];

const implementationBenefits = [
  {
    icon: PiSlidersHorizontal,
    title: "Smarter rostering, your way",
    description:
      "Configure shift patterns, clinical requirements and working arrangements around how your team actually operates.",
  },
  {
    icon: PiHandshake,
    title: "Easy transition with expert support",
    description:
      "Work with a team that understands healthcare rostering inside out, guiding you from initial setup to your first optimised roster.",
  },
  {
    icon: PiPlugsConnected,
    title: "Works alongside your existing systems",
    description:
      "Add AI rostering capabilities without having to replace the workforce systems you already have in place.",
  },
  {
    icon: PiChartLineUp,
    title: "One platform, every department",
    description:
      "Scale across workforce groups, departments and locations while accommodating the distinct needs of each team.",
    href: "/enterprise",
    linkLabel: "Explore RosterLab for Enterprise",
  },
];

const featurePlaceholderClass =
  "aspect-video w-full rounded-3xl bg-[#F4F6FB] lg:aspect-[3/2]";

const usTerminology = {
  "roster admin": "scheduling admin",
  "clinical cover": "clinical coverage",
};

export default function WhyRosterLabPage({ isUS = false }: { isUS?: boolean }) {
  const t = (text: string, usCopy?: string) =>
    isUS ? (usCopy ?? localizeUSText(text, [], usTerminology)) : text;
  const href = (path: string) => (isUS ? (getUSPath(path) ?? path) : path);
  const demoHref = `https://rosterlab.com${href("/book-a-demo")}`;
  const analyticsLocation = isUS ? "US Why RosterLab" : "Why RosterLab";
  const stories = isUS
    ? enterpriseStories.map((story) => ({
        ...story,
        title: t(story.title),
        href: href(story.href),
        attribution: story.attribution
          ? enterpriseText(story.attribution, true)
          : undefined,
        stats: story.stats.map((stat) => ({ ...stat, label: t(stat.label) })),
      }))
    : enterpriseStories;

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="bg-white pt-10 sm:pt-16 lg:pt-24">
        <Container className="max-w-[85rem]">
          <div className="grid items-center gap-8 border-b border-slate-200 pb-6 md:pb-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
            <div>
              <h1 className="max-w-[20ch] text-balance text-[clamp(1.875rem,8vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.024em] text-[#1F2A5C] sm:text-[clamp(2.25rem,4.2vw,3.75rem)] sm:leading-[1.1] lg:max-w-none lg:text-[clamp(2.75rem,4.1vw,3.25rem)]">
                {t("Why choose RosterLab for healthcare rostering?")}
              </h1>
              <p className="mt-4 max-w-[36ch] text-pretty text-base leading-relaxed text-gray-600 sm:mt-5 sm:max-w-xl sm:text-lg">
                {t(
                  "The only rostering platform with advanced AI at the core and deep healthcare expertise behind it.",
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <Button href={demoHref} className={primaryDemoButtonClass}>
                  Book a demo
                </Button>
                <Button
                  href={href("/solutions/ai-roster-generator")}
                  variant="outline"
                  className="whitespace-nowrap rounded-full border border-[#3779DD] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB] focus:ring-[#3779DD] sm:px-8 sm:py-3.5 sm:text-base"
                >
                  {t("Explore AI rostering")}
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
        containerClassName="max-w-[85rem]"
      />

      <section
        aria-labelledby="rostering-challenges-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-[85rem] text-center">
          <h2
            id="rostering-challenges-heading"
            className={`mx-auto max-w-4xl text-[#1F2A5C] ${sectionHeadingClass}`}
          >
            {t("When healthcare rosters fall short, everyone feels it")}
          </h2>

          <div className="mx-auto mt-10 grid max-w-xl divide-y divide-dashed divide-slate-300 md:max-w-none md:grid-cols-3 md:divide-x md:divide-y-0">
            {rosteringChallenges.map(
              ({ title, titleContinuation, description }) => (
                <div
                  key={title}
                  className="py-7 sm:px-4 sm:py-8 md:row-span-3 md:grid md:grid-rows-subgrid md:px-3 md:py-0 xl:px-5"
                >
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-4 size-14 rounded-full border border-[#D8E1F0] bg-[#EAF1FF] sm:mb-5 sm:size-24 min-[1100px]:size-36"
                  />
                  <h3 className={`text-balance md:min-h-[2lh] ${cardHeadingClass}`}>
                    {t(title)} <br className="hidden min-[1100px]:block" />
                    {t(titleContinuation)}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[25rem] text-pretty text-base leading-relaxed text-gray-600 md:text-[15px] min-[1100px]:tracking-tight xl:max-w-[21.5rem] xl:text-balance xl:text-base xl:tracking-normal">
                    {t(description)}
                  </p>
                </div>
              ),
            )}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="healthcare-rostering-benefits-heading"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-[85rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
              Why RosterLab
            </p>
            <h2
              id="healthcare-rostering-benefits-heading"
              className={`text-[#1F2A5C] ${sectionHeadingClass}`}
            >
              {t("A better roster changes the way you run")}
            </h2>
          </div>

          <div className="mx-auto mt-12 grid grid-cols-1 gap-y-9 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-8 md:before:col-span-2 md:before:row-start-2 md:before:border-t md:before:border-[#1F2A5C]/10">
            {healthcareRosteringBenefits.map(({ title, description }) => (
              <div key={title} className="text-center md:text-left">
                <h3
                  className={`text-balance md:max-lg:min-h-[2lh] ${cardHeadingClass}`}
                >
                  {t(title)}
                </h3>
                <p className="mx-auto mt-3 max-w-[34rem] text-pretty text-base leading-relaxed text-gray-600 md:mx-0 md:text-balance">
                  {t(description)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center md:mt-12">
            <Button
              href={demoHref}
              className={primaryDemoButtonClass}
              analyticsLabel="Book a Demo"
              analyticsLocation={analyticsLocation}
              analyticsProperties={{
                cta_type: "demo",
                page_name: analyticsLocation,
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
        <Container className="max-w-[85rem]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
                {t("AI Roster Optimisation")}
              </p>
              <h2
                id="ai-optimisation-heading"
                className={`text-[#1F2A5C] ${sectionHeadingClass}`}
              >
                {t("AI rostering that goes beyond simple automation")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-gray-600">
                {t(
                  "There's a difference between pre-filling individual shifts and solving the roster itself. RosterLab's AI optimisation engine considers the whole roster together, evaluating every possible staffing combination against your rules, preferences and constraints to find the best fit, not just one that works.",
                )}
              </p>
              <InlineCtaLink
                href={href("/solutions/ai-roster-generator")}
                label={t("Explore AI rostering")}
                className={`mt-6 ${blueInlineCtaClass}`}
                analyticsLocation={analyticsLocation}
                analyticsProperties={{
                  cta_type: "learn_more",
                  page_name: analyticsLocation,
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
        aria-labelledby="healthcare-design-heading"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-[85rem]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="lg:col-start-2 lg:row-start-1">
              <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
                Healthcare by Design
              </p>
              <h2
                id="healthcare-design-heading"
                className={`text-[#1F2A5C] ${sectionHeadingClass}`}
              >
                Built around the realities of clinical work
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  {t(
                    "No two clinical teams roster the same way. RosterLab is designed to handle the intricacies of different clinical specialities and workforce groups, accounting for:",
                  )}
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  {[
                    "Clinical skill mix, staffing ratios and supervision",
                    "Employment agreements and fatigue management",
                    "Clinical rotations and protected non-clinical time",
                  ].map((requirement) => (
                    <li key={requirement}>{t(requirement)}</li>
                  ))}
                </ul>
              </div>
              <InlineCtaLink
                href={href("/feature/rules-engine")}
                label="Explore the rules engine"
                className={`mt-6 ${blueInlineCtaClass}`}
                analyticsLocation={analyticsLocation}
                analyticsProperties={{
                  cta_type: "learn_more",
                  page_name: analyticsLocation,
                  section: "healthcare_design",
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

      <section
        aria-labelledby="otto-roster-assistant-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-[85rem]">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#2A3F8F]">
                {t("Otto - AI Rostering Assistant")}
              </p>
              <h2
                id="otto-roster-assistant-heading"
                className={`text-[#1F2A5C] ${sectionHeadingClass}`}
              >
                {t("Rostering intelligence at your fingertips")}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  {t(
                    "Discover the smartest way to manage your rosters with Otto, RosterLab's built-in AI rostering assistant.",
                  )}
                </p>
                <p>Otto helps you to:</p>
                <ul className="list-disc space-y-2 pl-5">
                  {[
                    "Get instant answers about your rosters without digging through data",
                    "Find the best way to fill gaps, assess swaps and adjust shifts",
                    "Make roster changes simply by asking, while staying in control",
                    "Spot workforce trends and uncover opportunities to improve planning",
                  ].map((benefit) => (
                    <li key={benefit}>{t(benefit)}</li>
                  ))}
                </ul>
              </div>
              <InlineCtaLink
                href={href("/feature/ai-staff-rostering-assistant")}
                label="Explore Otto"
                className={`mt-6 ${blueInlineCtaClass}`}
                analyticsLocation={analyticsLocation}
                analyticsProperties={{
                  cta_type: "learn_more",
                  page_name: analyticsLocation,
                  section: "otto_roster_assistant",
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
        aria-labelledby="rostering-roi-heading"
        className="bg-[#141B3F] py-12 text-white md:py-16"
      >
        <Container className="max-w-[85rem]">
          <div className="grid gap-8 text-left lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-10 lg:gap-y-4 xl:gap-x-14">
            <div className="min-w-0 text-center lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:text-left">
              <h2
                id="rostering-roi-heading"
                className={`scroll-mt-24 ${sectionHeadingClass}`}
              >
                Real impact.{" "}<br />
                Backed by results.
              </h2>
              <div>
                <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/90 md:text-lg lg:mx-0 lg:mt-0">
                  {t(
                    "The proof is in the results. Here's what organisations have achieved with RosterLab.",
                  )}
                </p>

                <ul className="mt-6 grid divide-y divide-white/20 sm:grid-cols-3 sm:divide-y-0 md:mt-8">
                  {[
                    { value: "~90%", label: "less time spent on rostering" },
                    { value: "~5%", label: "improvement in staffing efficiency" },
                    { value: "~10%", label: "increase in employee satisfaction" },
                  ].map(({ value, label }) => (
                    <li
                      key={label}
                      className="py-7 sm:px-3 sm:py-5 md:py-6 lg:first:pl-0 lg:last:pr-0"
                    >
                      <span className="block text-[2.5rem] font-medium leading-none tracking-tight text-[#03FABF] md:text-5xl lg:text-[2.5rem] xl:text-5xl">
                        {value}
                      </span>
                      <span className="mx-auto mt-3 block text-pretty text-base leading-relaxed text-white/90 sm:mt-2 sm:max-w-[11rem] sm:text-balance sm:leading-normal lg:mx-0 lg:text-sm">
                        {t(label)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 md:mt-6">
                  <InlineCtaLink
                    href={href("/tools/roi-calculator")}
                    label="Calculate your ROI"
                    onDark
                    className="text-[#03FABF] hover:text-white focus-visible:text-white"
                    analyticsLocation={analyticsLocation}
                    analyticsProperties={{
                      cta_type: "roi_calculator",
                      page_name: analyticsLocation,
                      section: "roi",
                    }}
                  />
                </div>
              </div>
            </div>
            <RoiTestimonials analyticsLocation={`${analyticsLocation} ROI`} />
          </div>
        </Container>
      </section>

      <section
        aria-label="Customer case studies"
        className="bg-white py-16 md:py-24"
      >
        <Container className="max-w-[85rem]">
          <EnterpriseCaseStudies stories={stories} isUS={isUS} />
        </Container>
      </section>

      <section
        aria-labelledby="implementation-benefits-heading"
        className="relative isolate overflow-hidden bg-[#3779DD] bg-[linear-gradient(115deg,#2F68BF_0%,#3779DD_55%,#578BDA_100%)] py-16 text-white md:py-24"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-y-0 right-0 w-2/3 overflow-hidden opacity-25 mix-blend-luminosity [mask-image:radial-gradient(ellipse_95%_80%_at_100%_20%,black_10%,transparent_85%)] md:w-[52%] md:opacity-45">
            <Image
              src="/images/industries/healthcare-hero.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 52vw, 67vw"
              className="origin-[70%_40%] scale-[1.85] object-cover object-[67%_40%]"
            />
          </div>
        </div>
        <Container className="relative max-w-[85rem]">
          <div>
            <h2
              id="implementation-benefits-heading"
              className={`max-w-3xl text-balance ${sectionHeadingClass}`}
            >
              {t("However your team rosters, RosterLab fits in")}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-6 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
              {implementationBenefits.map(({ icon: Icon, title, description, href: path, linkLabel }) => (
                <div
                  key={title}
                  className="row-span-3 grid min-w-0 grid-rows-subgrid rounded-2xl border border-white/25 bg-white/[0.07] p-6 backdrop-blur-md"
                >
                  <span className="flex size-12 items-center justify-center rounded-lg border border-white/25 bg-white/10">
                    <Icon aria-hidden="true" className="size-7 text-white" />
                  </span>
                  <h3 className="text-pretty text-2xl font-medium leading-tight tracking-tight">
                    {t(title)}
                  </h3>
                  <div className="min-w-0">
                    <p className="text-pretty text-base leading-relaxed text-blue-50">
                      {t(description)}
                    </p>
                    {path && linkLabel && (
                      <InlineCtaLink
                        href={href(path)}
                        label={linkLabel}
                        className="mt-4"
                        onDark
                        analyticsLocation={analyticsLocation}
                        analyticsProperties={{
                          cta_type: "learn_more",
                          page_name: analyticsLocation,
                          section: "implementation_benefits",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section
        aria-labelledby="why-rosterlab-faq-heading"
        className="bg-[#F4F6FB] py-16 md:py-24"
      >
        <Container className="max-w-[85rem]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
            <div>
              <h2
                id="why-rosterlab-faq-heading"
                className="text-4xl md:text-5xl font-semibold text-[#1F2A5C] leading-tight tracking-tight"
              >
                Frequently asked questions
              </h2>
              <p className="mt-4 max-w-sm text-lg text-gray-600 leading-relaxed">
                {t("Common questions about AI-powered rostering with RosterLab")}
              </p>
            </div>
            <EnterpriseFAQ
              items={[
                {
                  question:
                    "How is RosterLab different from other rostering software?",
                  answer:
                    "The biggest difference is how much of the rostering process RosterLab can take on. While many platforms offer digital roster building, templates and automated rule checks, RosterLab can generate entire rosters around complex and often competing workforce requirements. Our specialisation in healthcare also means we're equipped to solve clinical rostering challenges that standard scheduling tools simply weren't designed for.",
                },
                {
                  question: "Why is RosterLab particularly suited to healthcare?",
                  answer:
                    "Healthcare rostering is where our technology began. Years of working alongside clinical teams have shaped both the sophistication of our technology and our understanding of what makes a good clinical roster. It's this combination of technical and healthcare expertise that underpins RosterLab today.",
                },
                {
                  question:
                    "Can RosterLab accommodate our existing rostering rules?",
                  answer:
                    "Absolutely. One of RosterLab's strengths is the depth of its configurable rules engine. Rules can be set at the team, skill or individual staff level, with different priorities assigned to each requirement. Your team can determine what's non-negotiable and where there's flexibility to accommodate preferences.",
                },
                {
                  question:
                    "Can RosterLab support multiple departments across a hospital?",
                  answer: `Yes, and those departments don't need to roster in the same way. A nursing ward, an emergency department and a radiology service can each have their own staffing models, rules and rostering workflows within RosterLab. <a class="font-medium text-blue-700 underline underline-offset-4" href="${href("/industries/healthcare")}">See all the healthcare specialities we support</a>.`,
                },
                {
                  question: "Can I review and adjust AI-generated rosters?",
                  answer:
                    "Absolutely. You can review and adjust every AI-generated roster in RosterLab before it's published. The AI does the heavy lifting, while your team stays in control of the final roster.",
                },
                {
                  question: "How quickly can we see results with RosterLab?",
                  answer: `<p>Teams can expect to see measurable results from their very first roster. At one tertiary hospital emergency department in Sydney, RosterLab <a class="font-medium text-blue-700 underline underline-offset-4" href="${href("/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering")}">reduced the time spent rostering by 70%</a> on the first roster alone.</p>
                    <p class="mt-4">The extent of the savings will depend on the complexity of your rosters and how much manual work goes into creating and maintaining them today.</p>`,
                },
                {
                  question:
                    "Can RosterLab work with our existing payroll and workforce systems?",
                  answer: `RosterLab offers enterprise integrations and API access. We review your payroll, HR and reporting workflows with you to confirm the supported connections, export options and setup your team needs. <a class="font-medium text-blue-700 underline underline-offset-4" href="${href("/book-a-demo")}">Discuss your systems with our team</a>.`,
                },
                {
                  question: "What does getting started with RosterLab involve?",
                  answer: `<p>We start by understanding how your team currently rosters, including the rules, working arrangements and unwritten considerations that experienced roster managers account for.</p>
                    <p class="mt-4">Our implementation specialists work with you to translate these into RosterLab, test the generated rosters and refine the setup until it reflects the needs of your team.</p>`,
                },
              ].map(({ question, answer }) => ({
                question: t(question),
                answer: t(answer),
              }))}
            />
          </div>
        </Container>
      </section>

      <ClosingCta
        containerClassName="max-w-[85rem]"
        heading={t("Your next roster could be a whole lot easier")}
        headingId="why-rosterlab-cta-heading"
        description={t(
          "Bring us your toughest rostering challenges, and we'll show you how RosterLab can help.",
        )}
      >
        <Button
          href={demoHref}
          className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB]"
        >
          Book a demo
        </Button>
      </ClosingCta>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[{ name: "Home", url: href("/") }, { name: "Why Choose Us" }]}
      />
    </SiteLayout>
  );
}
