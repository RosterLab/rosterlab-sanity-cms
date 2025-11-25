import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FairnessAcrossYearModule from "@/components/sections/animations/FairnessAcrossYearModule";

export const metadata = withHreflang(
  {
    title: "On-Call Roster Software - RosterLab",
    description:
      "Create fair and predictable on-call rosters. Built for all specialties handling urgent and emergency cases.",
    alternates: {
      canonical: "https://rosterlab.com/type/on-call-roster",
    },
    openGraph: {
      title: "On-Call Roster Software - RosterLab",
      description:
        "Create fair and predictable on-call rosters. Built for all specialties handling urgent and emergency cases.",
      type: "website",
      url: "https://rosterlab.com/type/on-call-roster",
      images: [
        {
          url: "/images/us-images/on-call-scheduling.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "On-Call Roster Software - RosterLab",
      description:
        "Create fair and predictable on-call rosters. Built for all specialties handling urgent and emergency cases.",
      images: ["/images/us-images/on-call-scheduling.jpg"],
    },
  },
  "/type/on-call-roster",
);

const faqItems = [
  {
    question: "What is an on-call roster?",
    answer:
      "An on-call roster schedules team members to handle urgent issues outside regular hours. RosterLab supports flexible cycles (typically 12 weeks) promoting fairness, predictability, and easy re-rostering. Used across all specialties, especially in <a href='/industries/healthcare/ed-icu' class='text-teal-600 hover:text-teal-700 underline'>emergency-focused departments</a>, rosters are tailored to your team size and service needs.",
  },
  {
    question: "Can on-call rosters be customised for different departments?",
    answer:
      "Yes, on-call rostering with RosterLab is highly flexible and recognizes that on-call requirements differ depending on the department and clinical situation. The system scales from small specialist teams to large emergency departments, adapting to your specific service needs, whether you're managing urgent care, emergency response, or specialty on-call coverage.",
  },
];

export default function OnCallRosterPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Manage{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  On-Call Rosters
                </span>{" "}
                Efficiently
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create compliant, fair on-call schedules that balance workload
                and reduce administrative burden.
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
                  Match skills and seniority to coverage needs
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
                  Enforce fatigue rules and rest periods automatically
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
                  Re-roster last-minute changes while preserving fairness
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
                  Track weekend and holiday duty distribution transparently
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
                  href="/tools/roi-calculator"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  ROI Calculator
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/on-call-roster.svg"
                alt="On-call rostering dashboard"
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Flexible On-Call Rostering Across All Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Tailored to your department size and service needs. Whether you're
              managing urgent care, emergency response, or specialty on-call
              coverage.
            </p>
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Safer Staffing with Fewer Gaps
              </h3>
              <p className="text-gray-600">
                Maintain optimal on-call coverage with min and max staffing
                rules that automatically alert you to understaffed shifts.
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fair Distribution Across Team
              </h3>
              <p className="text-gray-600">
                Ensure equitable on-call duty distribution with automatic
                tracking of cumulative hours and weekend coverage.
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Adaptable to Department Size
              </h3>
              <p className="text-gray-600">
                Scales from small specialist teams to large emergency
                departments. Customised to your department's specific service
                needs and clinical situation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <FairnessAcrossYearModule />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Modern On-Call Management
              </h2>
              <div className="space-y-6">
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
                      Fair Distribution Rules
                    </h3>
                    <p className="text-gray-600">
                      Automatically balance weekday, weekend, and holiday
                      on-call duties across your team. Make fairness measurable,
                      transparent, and defensible.
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
                      Fatigue Management & Safe Limits
                    </h3>
                    <p className="text-gray-600">
                      Enforce maximum consecutive shifts, minimum rest periods,
                      and safe working hour limits. Protect your team from
                      burnout and stay compliant with regulations.
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
                      Predictable Roster Planning
                    </h3>
                    <p className="text-gray-600">
                      Plan consistent on-call coverage that your team can rely
                      on - reducing last-minute chaos and supporting better
                      work-life balance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Match Skills to Coverage Needs
                    </h3>
                    <p className="text-gray-600">
                      Track team certifications and specialisations, then assign
                      the right qualified person to each on-call needs
                      automatically - no more manual matching.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  href="/solutions/ai-roster-generator"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Learn about AI Rosters
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern On-Call Rostering Software for Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential features for managing on-call coverage across all
              specialties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/feature/shift-swaps" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Easily Swap Shifts
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Enable staff to request and approve shift swaps seamlessly,
                  maintaining coverage while providing flexibility.
                </p>
                <span className="text-teal-600 text-base font-medium hover:text-teal-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/feature/rules-engine" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rules & Compliance
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Define rostering rules in plain English - let the system
                  automatically enforce fatigue limits, rest periods, and
                  contractual requirements.
                </p>
                <span className="text-cyan-600 text-base font-medium hover:text-cyan-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/feature/automated-rostering" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fairer duty allocation
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Distribute on-call duties and workload equitably across your
                  team with transparent tracking.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/feature/leave-requests" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Streamline Leave Requests
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Manage leave requests and staff availability efficiently in
                  one integrated system.
                </p>
                <span className="text-indigo-600 text-base font-medium hover:text-indigo-700">
                  Learn more →
                </span>
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
              Common questions about on-call rostering
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
              Transform Your On-Call Rostering
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading teams saving days of scheduling time every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/tools/roi-calculator"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                ROI Calculator
              </Button>
              <Button
                href="/book-a-demo"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },

          { name: "On-Call Roster", url: "/type/on-call-roster" },
        ]}
      />
    </SiteLayout>
  );
}
