import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQAccordion from "@/components/ui/FAQAccordion";
import StaffingEnvelopeChart from "@/components/ui/StaffingEnvelopeChart";

export const metadata = {
  title: "Aged Care Staff Scheduling Software - RosterLab",
  description:
    "Learn how our rostering software improves shift scheduling in Aged Care. Create better rosters that boost team wellbeing, ensure compliance & saves time.",
  openGraph: {
    title: "Aged Care Staff Scheduling Software - RosterLab",
    description:
      "Learn how our rostering software improves shift scheduling in Aged Care. Create better rosters that boost team wellbeing, ensure compliance & saves time.",
    type: "website",
    url: "https://rosterlab.com/industries/healthcare/aged-care",
    images: [
      {
        url: "/images/og-images/IndustryAgedCare.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aged Care Staff Scheduling Software - RosterLab",
    description:
      "Learn how our rostering software improves shift scheduling in Aged Care. Create better rosters that boost team wellbeing, ensure compliance & saves time.",
    images: ["/images/og-images/IndustryAgedCare.png"],
  },
};

const faqItems = [
  {
    question: "What is an aged care roster?",
    answer:
      "An aged care roster is a staff schedule specifically designed for nursing homes, residential care facilities, and assisted living centers. It organizes care workers, registered nurses, enrolled nurses, and support staff across different shifts to ensure 24/7 resident care. Unlike standard healthcare rosters, aged care rosters must balance resident-to-staff ratios, accommodate varying care needs across different units (dementia, palliative, high care), and comply with aged care quality standards while managing a mix of permanent, casual, and agency staff.",
  },
  {
    question: "What devices can the platform be used on?",
    answer:
      "Your schedules are stored safely in the cloud which means you and your teams can access your rosters from anywhere in the world and distribute the published rosters digitally on <a href='/solutions/staff-roster-mobile-app' class='text-blue-600 hover:underline'>any device</a>.",
  },
  {
    question: "How does the platform help reduce scheduling mistakes?",
    answer:
      "With the highly flexible RosterLab Rules Engine, you can create the constraints for your specific schedule and feel safe knowing that <a href='/solutions/ai-staff-rostering' class='text-blue-600 hover:underline'>the A.I.</a> will never break any hard rules you set. The A.I. will always consider every staff member's skillset and availability, so you won't schedule someone onto a shift they can't work.",
  },
];

export default function AgedCarePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Optimise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Aged Care
                </span>{" "}
                Staff Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deliver better care with smart rostering. Achieve 5% efficiency
                gains while reducing scheduling errors and ensuring full
                compliance.
              </p>
              <div className="mb-8 space-y-2">
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  More efficiently allocate staffing hours
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Eliminate costly scheduling errors
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Digitise your rostering practices
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Easily fill open shifts
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/contact"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/aged-care.svg"
                alt="Aged care rostering dashboard"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compassionate Care Starts with Smart Scheduling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Balance resident needs, staff wellbeing, and regulatory
              requirements with intelligent rostering designed specifically for
              aged care facilities.
            </p>
          </div>

          {/* Staffing Envelope Chart */}
          <div className="mb-16 max-w-3xl mx-auto">
            <StaffingEnvelopeChart />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Higher Staff Retention
              </h3>
              <p className="text-gray-600">
                Let staff have their preferences when all rules and staffing
                requirements are met. Improve staff satisfaction with
                better-quality roster.
              </p>
            </div>

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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reduce Scheduling Costs
              </h3>
              <p className="text-gray-600">
                Improve roster planning efficiency by reducing locum use,
                overtime costs, and sick calls through fully optimised staff
                coverage.
              </p>
            </div>

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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Easily Fill Open Shifts
              </h3>
              <p className="text-gray-600">
                Fill gaps quickly with smart in-app notifications, offer shifts
                to the right person with the right skills.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/illustration/aged_care_excellence.png"
                alt="Aged care scheduling illustration"
                width={600}
                height={400}
                className="block w-full h-auto rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-16">
                Designed for Aged Care Excellence
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Ensure the right skill-mix
                    </h3>
                    <p className="text-gray-600">
                      Always make sure the right skill mix is available to
                      provide the right care for residents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Compliance Assurance
                    </h3>
                    <p className="text-gray-600">
                      Meet all union and contractual rules, while maintain
                      proper staff-to-resident ratios.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Continuity of Care
                    </h3>
                    <p className="text-gray-600">
                      Incorporate rules into rosters to ensure{" "}
                      <Link
                        href="https://rosterlab.com/blog/improving-continuity-of-care-in-healthcare"
                        className="text-teal-600 hover:text-teal-700 underline"
                      >
                        continuity of care
                      </Link>
                      . Distribute shifts fairly and safely based on skill sets
                      to maximise staff engagement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Reduce Rostering Mistakes
                    </h3>
                    <p className="text-gray-600">
                      Eliminate human errors by digitising and standardising the
                      rostering process. All requirements are automatically
                      handled by AI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Cloud-enabled that's always accessible
                    </h3>
                    <p className="text-gray-600">
                      Access and share rosters from anywhere, with your
                      rostering know-how stored digitally. Standardise rules and
                      processes to build resilient, high-quality rosters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              COMPLETE WORKFLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Your Complete Aged Care Rostering Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-5xl mx-auto">
              From planning to payroll, manage every aspect of your aged care
              facility staffing.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Set Care Requirements
                    </h3>
                    <p className="text-gray-600">
                      Define staffing ratios, skill requirements, and care
                      levels for each unit or wing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Collect Preferences
                    </h3>
                    <p className="text-gray-600">
                      Staff submit availability and shift preferences through
                      the mobile app.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Generate Optimal Roster
                    </h3>
                    <p className="text-gray-600">
                      AI creates compliant schedules balancing all requirements
                      in minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Publish & Notify
                    </h3>
                    <p className="text-gray-600">
                      Share rosters instantly with automatic notifications and
                      calendar sync.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Manage Changes
                    </h3>
                    <p className="text-gray-600">
                      Handle sick leave, swaps, and emergencies while
                      maintaining compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Export to Payroll
                    </h3>
                    <p className="text-gray-600">
                      Export roster data into payroll systems for accurate and
                      timely processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to streamline your aged care rostering?
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

      {/* Cloud Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern Aged Care Rosters for Healthcare Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, accessible, and integrated with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/feature/self-scheduling" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Preferences & Rules
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Configure staff preferences and organisational rules for
                  optimal scheduling.
                </p>
                <p className="text-teal-600 font-medium text-sm">
                  Learn More →
                </p>
              </div>
            </Link>

            <Link href="/feature/shift-swaps" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
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
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Shift Swaps
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Enable staff to easily swap shifts with automated approval
                  workflows.
                </p>
                <p className="text-cyan-600 font-medium text-sm">
                  Learn More →
                </p>
              </div>
            </Link>

            <Link href="/feature/auto-roster-generation" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Automate Rostering
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Create compliant schedules in minutes with AI-powered
                  optimisation.
                </p>
                <p className="text-blue-600 font-medium text-sm">
                  Learn More →
                </p>
              </div>
            </Link>

            <Link href="/feature/re-rostering" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Re-roster Changes
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Handle unexpected changes with intelligent re-rostering
                  algorithms.
                </p>
                <p className="text-indigo-600 font-medium text-sm">
                  Learn More →
                </p>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="bg-white pb-20">
        <TrustedBy />
        <Container>
          <div className="text-center mt-0">
            <Button
              href="/case-studies"
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              View Case Studies
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
              Common questions about aged care scheduling
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Aged Care Facility Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join aged care providers achieving better outcomes with smarter
              scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/pricing"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
