import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedByDualRow from "@/components/sections/TrustedByDualRow";
import EnterpriseFAQ from "@/app/enterprise/EnterpriseFAQ";
import { getUSPath } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import RoleTabsModule from "./RoleTabsModule";
import OttoAnswerDemo from "./OttoAnswerDemo";
import OttoEvaluateDemo from "./OttoEvaluateDemo";
import OttoAnalyseDemo from "./OttoAnalyseDemo";
import OttoActDemo from "./OttoActDemo";
import backgrounds from "./backgrounds.module.css";
import { ottoText } from "./otto-copy";

const signupUrl = "https://app.rosterlab.com/signup";
const globalDemoPath = "/book-a-demo";
const globalFreePath = "/solutions/free-staff-rostering-software";

const capabilities = [
  {
    label: "Answer",
    title: "Find answers",
    titleSecondLine: "without the digging",
    titleBreakClassName: "hidden xl:block",
    description:
      "Ask Otto about any aspect of your roster and get instant, contextual answers drawn from your live data and audit history.",
  },
  {
    label: "Evaluate",
    title: "Know your options.",
    titleSecondLine: "Test different scenarios.",
    description:
      "Find the best way to fill a gap or rework an existing roster. Otto weighs up availability, skills and roster rules to recommend solutions that work for your team.",
  },
  {
    label: "Analyse",
    title: "Turn roster data into meaningful insights",
    description:
      "Uncover staffing trends, investigate workload imbalances and generate tailored charts and reports to inform workforce decisions.",
  },
  {
    label: "Act",
    badge: "Agentic Rostering",
    title: "Create and update rosters",
    titleSecondLine: "just by asking",
    titleBreakClassName: "hidden xl:block",
    description:
      "From creating allocations to updating staff records, Otto can carry out rostering tasks directly in RosterLab under your direction.",
  },
];

const faqItems = (freePath: string) => [
  {
    question: "What is Otto?",
    answer:
      "Otto is RosterLab’s built-in AI rostering assistant. It combines conversational and agentic AI with knowledge of your rostering setup and staff information. You can ask questions, analyse roster data and work through complex scheduling scenarios in chat. With your approval, Otto can also carry out rostering tasks directly in RosterLab.",
  },
  {
    question: "How is Otto different from other AI assistants?",
    answer:
      "Unlike general-purpose AI assistants, Otto has access to both your live roster data and RosterLab’s built-in rostering logic. It evaluates staffing options against your actual rules and requirements, so you can get recommendations relevant to your team and put them into action directly in RosterLab, without exporting data, explaining your rules or making the changes manually.",
  },
  {
    question: "What can Otto help me with?",
    answer:
      '<p>Otto can help with much of the work that goes into rostering, from planning a new roster to adapting it as needs change. It can guide you through complex staffing decisions, help you identify where your rosters could be improved and take care of time-consuming scheduling tasks.</p><p class="mt-4">Whether you’re an experienced roster writer or taking on the responsibility for the first time, you can get expert rostering guidance whenever you need it.</p>',
  },
  {
    question: "How does Otto protect sensitive staff information?",
    answer:
      "Otto follows RosterLab’s existing user permissions, so each person can access only the information they’re authorised to view. RosterLab hosts its data on AWS, encrypts it at rest and in transit, and continuously monitors its systems to protect sensitive workforce information.",
  },
  {
    question: "Is Otto free to use in RosterLab?",
    answer:
      `Otto is available to both free and paid RosterLab users. You can try Otto using RosterLab’s <a class="font-medium text-blue-700 underline underline-offset-2" href="${freePath}">free digital rostering tool</a>.`,
  },
];

function RosterLabOutline({
  className,
  viewBox = "0 0 300 420",
}: {
  className: string;
  viewBox?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={`pointer-events-none absolute top-1/2 h-[130%] -translate-y-1/2 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="22"
    >
      <rect x="11" y="11" width="278" height="98" rx="49" />
      <rect x="11" y="161" width="178" height="98" rx="49" />
      <circle cx="60" cy="360" r="49" />
    </svg>
  );
}

export default function OttoPage({ isUS = false }: { isUS?: boolean }) {
  const t = (text: string) => ottoText(text, isUS);
  const demoPath = isUS ? (getUSPath(globalDemoPath) ?? globalDemoPath) : globalDemoPath;
  const freePath = isUS ? (getUSPath(globalFreePath) ?? globalFreePath) : globalFreePath;
  const faqs = faqItems(freePath).map(({ question, answer }) => ({
    question: t(question),
    answer: t(answer),
  }));

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className={backgrounds.hero}>
          <section className="text-center text-[#1F2A5C]">
            <Container className="pb-7 pt-12 sm:pb-9 sm:pt-14 lg:pb-12 lg:pt-16">
              <div>
                <p className="mb-5 text-sm font-semibold text-[#1F2A5C]">
                  {t("Otto AI Rostering Assistant")}
                </p>
                <h1 className="mx-auto max-w-[46rem] text-balance text-[clamp(2.1rem,4.2vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.024em]">
                  {t("AI that knows your")}{" "}
                  <br className="hidden md:block" />
                  {t("roster, and gets it right")}
                </h1>
                <p className="mx-auto mt-6 max-w-[36rem] text-balance text-[15px] leading-[1.55] text-slate-600 md:text-[17px] md:leading-[1.6] sm:mt-7">
                  {t("Meet Otto, your intelligent rostering assistant inside RosterLab. Build and refine rosters, make sense of your workforce data and put decisions into action, simply by asking Otto.")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button
                    href={demoPath}
                    className="whitespace-nowrap rounded-full bg-[#1F2A5C] px-5 py-2.5 text-sm font-semibold sm:px-8 sm:py-3.5 sm:text-base text-white hover:bg-[#162047] focus:ring-sky-400 focus:ring-offset-white"
                    analyticsLabel="Book a demo"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "AI Chat Assistant",
                      section: "hero",
                    }}
                  >
                    Book a demo
                  </Button>
                  <Button
                    href={signupUrl}
                    variant="outline"
                    className="whitespace-nowrap rounded-full border border-[#1F2A5C] px-5 py-2.5 text-sm font-semibold sm:px-8 sm:py-3.5 sm:text-base text-[#1F2A5C] hover:bg-slate-50 focus:ring-sky-400 focus:ring-offset-white"
                    analyticsLabel="Try Otto for free"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "free_signup",
                      page_name: "AI Chat Assistant",
                      section: "hero",
                    }}
                  >
                    Try Otto for free
                  </Button>
                </div>
              </div>
            </Container>
          </section>

          <TrustedByDualRow
            singleRow
            sectionClassName="bg-transparent pb-7 pt-4 md:pb-9 md:pt-5"
            containerClassName=""
            headingClassName="text-xl md:text-2xl text-[#1F2A5C]"
            logoColor="#1F2A5C"
            heading={t("The AI rostering platform trusted by healthcare teams")}
          />
        </div>

        <section aria-labelledby="otto-capabilities-heading" className="bg-white pb-14 pt-12 md:pb-20 md:pt-16 lg:pb-24">
          <Container>
            <h2
              id="otto-capabilities-heading"
              className="mb-10 text-center text-3xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:mb-16 md:text-[2.75rem]"
            >
              A smarter way to work<br className="hidden sm:block" />{" "}
              {t("with your rosters")}
            </h2>
            <div className="space-y-14 md:space-y-24 lg:space-y-32 xl:space-y-36">
              {capabilities.map(({ label, badge, title, titleSecondLine, titleBreakClassName, description }, index) => (
                <div
                  key={label}
                  className={`grid items-center gap-6 md:gap-12 lg:gap-20 xl:gap-24 ${
                    index % 2 === 0
                      ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
                      : "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                  }`}
                >
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-blue-700">{t(label)}</p>
                      {badge && (
                        <span className="rounded-full border border-[#A9C7F6] bg-[#E0ECFF] px-3 py-1 text-sm font-semibold leading-snug text-[#1F2A5C]">
                          {t(badge)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:text-3xl">
                      {t(title)}
                      {titleSecondLine && (
                        <>
                          <br className={titleBreakClassName} />{" "}
                          {t(titleSecondLine)}
                        </>
                      )}
                    </h3>
                    <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-gray-600">
                      {t(description)}
                    </p>
                  </div>
                  {label === "Answer" ? (
                    <OttoAnswerDemo isUS={isUS} />
                  ) : label === "Evaluate" ? (
                    <div className="md:order-first">
                      <OttoEvaluateDemo isUS={isUS} />
                    </div>
                  ) : label === "Analyse" ? (
                    <OttoAnalyseDemo />
                  ) : (
                    <div className="md:order-first">
                      <OttoActDemo isUS={isUS} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section aria-label="Customer testimonial" className="bg-[#101C39] text-white">
          <div className="relative overflow-hidden">
            <RosterLabOutline
              className="left-0 text-[#243B69]"
              viewBox="60 0 240 420"
            />
            <Container className="relative py-14 sm:py-16 lg:py-24">
              <figure className="mx-auto max-w-[52rem] text-center">
                <blockquote className="text-balance text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed">
                  <p>
                    “Otto has completely transformed how we manage staff
                    scheduling. The AI <strong className="text-blue-300">actually understands</strong>{" "}
                    our unique clinic setup, shift patterns, and preferences,
                    making adjustments automatically and intelligently. Otto has
                    become an <strong className="text-blue-300">essential member</strong> of our team.”
                  </p>
                </blockquote>
                <figcaption className="mx-auto mt-7 max-w-lg sm:mt-9">
                  <p className="font-semibold">Vivien Chan</p>
                  <p className="mt-1 text-sm leading-relaxed text-blue-100">
                    Operations &amp; Customer Relations Manager, Peticare Medical
                    Group
                  </p>
                </figcaption>
              </figure>
            </Container>
          </div>
        </section>

        <section
          aria-labelledby="otto-control-heading"
          className="bg-white py-20 md:py-28 lg:py-32"
        >
          <Container>
            <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
              <h2
                id="otto-control-heading"
                className="text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:text-[2.75rem]"
              >
                Let AI do more, without giving up control
              </h2>
              <p className="max-w-[52rem] text-lg leading-relaxed text-gray-600">
                {t("Otto keeps every rostering decision in your hands, explaining the reasoning behind its recommendations and giving you the opportunity to review, refine and approve proposed changes before anything is applied to your roster.")}
              </p>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="otto-roles-heading"
          className={`${backgrounds.role} py-12 sm:py-14 lg:py-[clamp(3rem,6svh,5rem)]`}
        >
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2
                id="otto-roles-heading"
                className="text-balance text-3xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:text-[2.75rem]"
              >
                {t("Better connected to your roster, whatever your role")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                See what Otto can do for you and your team.
              </p>
            </div>
            <RoleTabsModule isUS={isUS} />
          </Container>
        </section>

        <section
          aria-labelledby="otto-faq-heading"
          className="bg-[#F4F6FB] py-16 md:py-24"
        >
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
              <div>
                <h2
                  id="otto-faq-heading"
                  className="text-4xl font-semibold leading-tight tracking-tight text-[#1F2A5C] md:text-5xl"
                >
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 max-w-sm text-lg leading-relaxed text-gray-600">
                  {t("Common questions about RosterLab’s AI rostering assistant.")}
                </p>
              </div>
              <EnterpriseFAQ items={faqs} />
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 md:py-20">
          <Container>
            <div className="relative overflow-hidden rounded-2xl bg-[#3B7FE8] px-6 py-16 text-center text-white sm:px-12 md:py-24">
              <RosterLabOutline className="-left-24 text-[#2A3F8F]/45 md:-left-16" />
              <div className="relative mx-auto max-w-3xl">
                <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
                  {t("Rostering just got a whole lot easier")}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-white/90">
                  {t("Get more from every roster with Otto by your side.")}
                </p>
                <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    href={demoPath}
                    className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-[#1F2A5C] hover:bg-[#F4F6FB]"
                    analyticsLabel="Book a demo"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "AI Chat Assistant",
                      section: "final_cta",
                    }}
                  >
                    Book a demo
                  </Button>
                  <Button
                    href={signupUrl}
                    variant="outline"
                    className="rounded-md border-2 border-white px-7 py-3.5 text-base font-semibold text-white hover:bg-white hover:text-[#1F2A5C]"
                    analyticsLabel="Try Otto for free"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "free_signup",
                      page_name: "AI Chat Assistant",
                      section: "final_cta",
                    }}
                  >
                    Try Otto for free
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: isUS ? "/us" : "/" }, { name: "AI Chat Assistant" }]}
      />
    </SiteLayout>
  );
}
