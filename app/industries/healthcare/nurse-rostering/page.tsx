import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import MobileAppPreferencesModule from "@/components/sections/animations/MobileAppPreferencesModule";

export const metadata = withHreflang(
  {
    title: "Nurse Rostering Software - RosterLab",
    description:
      "End unsafe rosters and overwork. Build fair, compliant nurse rosters that maintain safe staffing ratios and respect union rules.",
    alternates: {
      canonical: "https://rosterlab.com/industries/healthcare/nurse-rostering",
    },
    openGraph: {
      title: "Nurse Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant nurse rosters that maintain safe staffing ratios and respect union rules.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare/nurse-rostering",
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
      title: "Nurse Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant nurse rosters that maintain safe staffing ratios and respect union rules.",
      images: ["/images/us-images/iStock-2232242180.jpg"],
    },
  },
  "/industries/healthcare/nurse-rostering-v2",
);

const faqItems = [
  {
    question: "How does RosterLab maintain safe nurse-to-patient ratios?",
    answer:
      "RosterLab enforces minimum staffing requirements and skill mix rules for every shift. The AI will red flag rosters that violate your configured patient-to-nurse ratios, ensuring clinical safety is never compromised. You can set different ratios by ward and shift type.",
  },
  {
    question: "Can nurses submit their own preferences?",
    answer:
      "Yes. Nurses can submit shift preferences, time-off requests, and availability through our mobile app. RosterLab's <a href='https://rosterlab.com/feature/self-scheduling' class='text-teal-600 hover:text-teal-700 underline'>self-rostering feature</a> lets nurses bid for available shifts while the system maintains compliance with union rules, fatigue management, and skill mix requirements.",
  },
  {
    question: "What happens when a nurse calls in sick at the last minute?",
    answer:
      "RosterLab identifies replacement nurses who meet the skill requirements and are available. You can see who's qualified, check their recent hours to avoid fatigue, and fill the gap quickly. The system prevents unsafe ratios by alerting you if a shift can't be safely covered.",
  },
  {
    question: "How does RosterLab prevent roster-based favoritism or bullying?",
    answer:
      "RosterLab uses algorithm-based shift allocation that eliminates subjective bias. Every shift assignment is based on objective criteria: skills, availability, workload balance, and compliance rules. The system creates an audit trail showing exactly why each nurse was assigned to each shift, making favoritism impossible and providing accountability if disputes arise.",
  },
  {
    question: "Can RosterLab help identify knowledge silos and training gaps?",
    answer:
      "Yes. RosterLab's gives you complete visibility of all team competencies across your nursing staff. You can instantly see which critical skills are held by only one or two people, identify risks, and plan accordingly. The system alerts you when key skills are missing from a shift.",
  },
];

export default function NurseRosteringV2Page() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Safe, Fair
                </span>{" "}
                Nurse Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                End roster instability and unsafe staffing. Create compliant
                rosters that respect your nurses, maintain safe ratios, and
                honour union agreements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/case-studies"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  Read Case Studies
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/nursing.svg"
                alt="Nurse rostering software interface"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Benefits Section */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="text-gray-600 text-sm">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Ut enim ad minim veniam
                </p>
                <p className="text-gray-600 text-sm">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Duis aute irure dolor
                </p>
                <p className="text-gray-600 text-sm">
                  In reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Excepteur sint occaecat
                </p>
                <p className="text-gray-600 text-sm">
                  Cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Reality of Nurse Rostering Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nursing teams face unique challenges that generic rostering
              software can't solve
            </p>
          </div>

          {/* Interactive Demo Widget */}
          <div className="mb-16">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
              <div
                className="relative w-full"
                style={{ paddingBottom: "calc(56.67989417989418% + 41px)" }}
              >
                <iframe
                  src="https://demo.arcade.software/qKV5GmMinypq2yXM19Xi?embed"
                  title="RosterLab Interactive Demo"
                  frameBorder="0"
                  loading="lazy"
                  allowFullScreen
                  allow="clipboard-write"
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pain Point 1: Overwork */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Chronic Overwork
              </h3>
              <p className="text-gray-600">
                Back-to-back shifts, excessive overtime, and insufficient rest
                periods leading to dangerous fatigue and burnout.
              </p>
            </div>

            {/* Pain Point 2: Unsafe Rosters */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Unsafe Staffing Ratios
              </h3>
              <p className="text-gray-600">
                Roster gaps that breach safe patient-to-nurse ratios, increasing
                clinical risk and adding pressure on nurses.
              </p>
            </div>

            {/* Pain Point 3: Union Rule Violations */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Complex Compliance
              </h3>
              <p className="text-gray-600">
                Navigating union agreements and policy rules while maintaining
                flexibility is near impossible manually.
              </p>
            </div>

            {/* Pain Point 4: Skill Mix Gaps */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Skill Mix Shortfalls
              </h3>
              <p className="text-gray-600">
                Shifts without ICU-trained, paediatric, or specialty nurses,
                create knowledge gaps and safety issues.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How RosterLab Solves This Differently
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike basic rostering tools, RosterLab was built specifically for
              the complex reality of nursing rosters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Perfect for nurse rostering challenges
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        AI-Powered Nurse-First Rostering
                      </p>
                      <p className="text-gray-600 text-sm">
                        Automatically considers nurse preferences, skill levels,
                        and fatigue - not just filling shifts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Built-In Clinical Safety
                      </p>
                      <p className="text-gray-600 text-sm">
                        Enforces safe patient-to-nurse ratios and prevents
                        dangerous understaffing before rosters are published
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Union Rule Compliance Guaranteed
                      </p>
                      <p className="text-gray-600 text-sm">
                        Union rule, contractual agreement, and rest period rule
                        is automatically enforced - no manual checking needed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Real Self-Rostering for Nurses
                      </p>
                      <p className="text-gray-600 text-sm">
                        Nurses can swap shifts, submit preferences, and see
                        their roster on mobile - building autonomy and trust
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        End Roster Instability
                      </p>
                      <p className="text-gray-600 text-sm">
                        When last-minute changes occur, RosterLab instantly
                        identifies compliant replacements that maintain safe
                        nurse-to-patient ratios and prevent dangerous
                        understaffing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <MobileAppPreferencesModule />
            </div>
          </div>

          {/* CTA Button */}
          <div className="max-w-md mx-auto text-center mt-12">
            <Button
              href="/solutions/ai-roster-generator"
              className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3"
            >
              Learn about AI Rostering
            </Button>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Impact on Your Nursing Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real outcomes that improve nurse wellbeing and patient care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-teal-50 rounded-xl p-8 border border-teal-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">90%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reduction in Rostering Time
              </h3>
              <p className="text-gray-600">
                Nurse managers spend days less per month on rostering,
                redirecting time to patient care and team support.
              </p>
            </div>

            <div className="bg-cyan-50 rounded-xl p-8 border border-cyan-100">
              <div className="text-4xl font-bold text-cyan-600 mb-2">100%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stable Staffing
              </h3>
              <p className="text-gray-600">
                Safe nurse-to-patient ratios maintained across every shift, with
                instant alerts and compliant replacement suggestions when
                changes occur.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparent Roster Assignment
              </h3>
              <p className="text-gray-600">
                Fair, automated rostering eliminates favoritism and bullying
                through transparent, bias-free shift allocation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Self-Rostering Workflow Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
              NURSE-FIRST WORKFLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              How Nurses Engage with Their Rosters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built around self-rostering and nurse autonomy, not just top-down
              rostering
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Set Staffing Requirements
                    </h3>
                    <p className="text-gray-600">
                      Define minimum ratios, skill mix needs (ICU-trained,
                      paeds, etc.), and ward coverage requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nurses Submit Preferences
                    </h3>
                    <p className="text-gray-600">
                      Via mobile app, nurses indicate shift preferences, time
                      off requests, and availability. No emails or paper forms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI Generates Safe Roster
                    </h3>
                    <p className="text-gray-600">
                      RosterLab balances preferences, skills, and compliance
                      rules to create fair rosters with safe staffing levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Publish to Mobile
                    </h3>
                    <p className="text-gray-600">
                      Rosters sync instantly to nurses' phones. They see their
                      shifts, can request swaps, and get real-time updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nurses Self-Roster Open Shifts
                    </h3>
                    <p className="text-gray-600">
                      Unfilled shifts are posted as "open shifts" - nurses can
                      pick them up directly if qualified and within hour limits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Handle Last-Minute Changes
                    </h3>
                    <p className="text-gray-600">
                      If someone calls in sick, RosterLab shows who can safely
                      fill the gap without breaking ratios or fatigue rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to streamline your nurse rostering?
              </p>
              <Button
                href="/book-a-demo"
                className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Essential Features for Nurse Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built tools that address the unique complexity of nursing
              rosters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Safe Staffing Enforcement
              </h3>
              <p className="text-gray-600">
                Configurable patient-to-nurse ratios by ward and shift. The
                system will flag unsafe and understaffed rosters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Skill Mix Management
              </h3>
              <p className="text-gray-600">
                Ensure every shift has the right skills present by creating
                rules to ensure a balanced mix of skills is present on your
                roster.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Union Rule Automation
              </h3>
              <p className="text-gray-600">
                Enforce rules, minimum rest periods, maximum consecutive shifts,
                and contractual obligations.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Self-Rostering
              </h3>
              <p className="text-gray-600">
                Nurses submit preferences, apply for open shifts, and manage
                time-off requests directly from their phones.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Roster Changes
              </h3>
              <p className="text-gray-600">
                When nurses call in sick, see who's qualified and available to
                fill the gap without breaking safety rules.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fatigue Prevention
              </h3>
              <p className="text-gray-600">
                Track hours worked, enforce rest periods, and prevent dangerous
                consecutive shift patterns that lead to burnout.
              </p>
            </div>
          </div>

          {/* CTA for Mobile App */}
          <div className="text-center mt-12">
            <Button
              href="/solutions/staff-roster-mobile-app"
              className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-3"
            >
              Learn about mobile app
            </Button>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Questions we hear from nursing managers
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="py-10 bg-white">
        <TrustedBy />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Safer, Fairer Nurse Rosters
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hospitals that have eliminated unsafe rosters and reduced
              nurse burnout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                Talk to a Specialist
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: "Healthcare", url: "/industries/healthcare" },
          { name: "Nurse Rostering V2" },
        ]}
      />
    </SiteLayout>
  );
}
