import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import StaffingEnvelopeChartSmall from "@/components/ui/StaffingEnvelopeChartSmall";

export const metadata = withHreflang(
  {
    title: "Call Centre Rostering Software - RosterLab",
    description:
      "Build your call centre roster with RosterLab. Automatically generate fair, compliant and flexible call centre rosters that save time and money.",
    openGraph: {
      title: "Call Centre Rostering Software - RosterLab",
      description:
        "Build your call centre roster with RosterLab. Automatically generate fair, compliant and flexible call centre rosters that save time and money.",
      type: "website",
      url: "https://rosterlab.com/industries/call-centre-rostering",
      images: [
        {
          url: "/images/call-centre-rostering.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Call Centre Rostering Software - RosterLab",
      description:
        "Build your call centre roster with RosterLab. Automatically generate fair, compliant and flexible call centre rosters that save time and money.",
      images: ["/images/call-centre-rostering.jpg"],
    },
  },
  "/industries/call-centre-rostering",
);

const faqItems = [
  {
    question: "What is a call centre roster?",
    answer:
      "Call centre rosters are specialised schedules designed for customer service operations where staffing must adapt to call volume patterns, service level agreements, and 24/7 operational demands. They're used for managing shift workers across inbound support, outbound sales, technical support, and customer service teams. These rosters must balance service level targets with worker wellbeing, compliance requirements, and fair distribution of premium shifts.",
  },
  {
    question: "How does AI make call centre rostering more effective?",
    answer:
      "AI automates the complex task of balancing fairness over extended periods with operational flexibility. In call centre operations where fairness in distributing premium shifts, night work, and weekend duties is critical, AI ensures equitable distribution while accommodating last minute changes.",
  },
];

export default function CallCentresPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Efficient, Compliant
                </span>{" "}
                Call Centre Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Optimise call centre operations with smarter workforce
                scheduling for 24/7 customer service operations.
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
                  Meet service level agreements with optimised staffing levels
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
                  Fair distribution of night shifts to reduce agent burnout
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
                  Quickly adapt rosters to changing call volume demands
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
                  Ensure skilled agents are on the right shifts
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                >
                  View pricing
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/call-centre-rostering.svg"
                alt="Call centre roster scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Better Call Centre Operations Start with Smart Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build optimised and fair call centre rosters in minutes, not days.
              Discover how:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pain Point 1: Automatic Roster Generation */}
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
                Automatic roster generation
              </h3>
              <p className="text-gray-600">
                Eliminate the need for manual rostering with our AI roster
                generation giving you time back to focus on customer service.
              </p>
            </div>

            {/* Pain Point 2: Meet Service Levels */}
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Meet service level targets
              </h3>
              <p className="text-gray-600">
                Ensure adequate staffing during peak hours to maintain response
                times and customer satisfaction.
              </p>
            </div>

            {/* Pain Point 3: Match Skills to Queues */}
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
                Skills-based staff rostering
              </h3>
              <p className="text-gray-600">
                Match call-centre agents with specialised skills to the right
                shifts for optimal customer service.
              </p>
            </div>

            {/* Pain Point 4: Reduce Agent Burnout */}
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Manage staff fatigue for 24/7 operations
              </h3>
              <p className="text-gray-600">
                Distribute night shifts fairly and enforce rest periods to
                prevent agent burnout in 24/7 operations.
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
              <StaffingEnvelopeChartSmall />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Call centre roster planning made simple
              </h2>
              <div className="space-y-6">
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
                      Optimised Coverage for Peak Hours
                    </h3>
                    <p className="text-gray-600">
                      Ensure the right number of agents with the right skills
                      during peak call times. Balance experience and skilled
                      agents for efficient operations.
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
                      Fair Shift Distribution
                    </h3>
                    <p className="text-gray-600">
                      Track and distribute night shifts, weekend work, and
                      premium duties fairly across agents. Make fairness
                      transparent, measurable, and automated.
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
                      Adapt To Call Volume Changes
                    </h3>
                    <p className="text-gray-600">
                      Re-roster when call patterns change without starting over.
                      Quickly adapt to demand fluctuations while maintaining
                      compliance and coverage requirements.
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
                      Improve Agent Satisfaction
                    </h3>
                    <p className="text-gray-600">
                      Help agents achieve better work-life balance by
                      considering a high percentage of preferences whilst
                      ensuring service level targets are met.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  href="/solutions/ai-roster-generator"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Learn about AI Rostering
                </Button>
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
              Your Call Centre Roster Planning Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From planning to execution, manage shift allocations for your call
              centre operations team.
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
                      Define Coverage Requirements
                    </h3>
                    <p className="text-gray-600">
                      Set shift patterns, team sizes, and skill requirements for
                      different service queues and time zones.
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
                      Input Agent Details
                    </h3>
                    <p className="text-gray-600">
                      Add agent skills, certifications, language capabilities,
                      and availability preferences.
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
                      Set Fairness Rules
                    </h3>
                    <p className="text-gray-600">
                      Define equitable distribution rules for night shifts,
                      weekend work, and premium duties across the planning
                      cycle.
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
                      Generate Call Centre Roster
                    </h3>
                    <p className="text-gray-600">
                      AI creates fair shift allocations balancing service level
                      targets, agent skills, and fairness goals.
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
                      Adapt to Demand Changes
                    </h3>
                    <p className="text-gray-600">
                      When call volumes shift, re-roster affected periods while
                      maintaining overall fairness. Respond to demand changes
                      quickly.
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
                      Publish roster to mobile
                    </h3>
                    <p className="text-gray-600">
                      Distribute rosters digitally to agents. They see their
                      shifts, can request swaps, and get real-time updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to streamline your call centre rostering?
              </p>
              <Button
                href="/book-a-demo"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Call Centre Rostering Software for Customer Service Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for call centre operations where service levels,
              fairness, and agent satisfaction matter most.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Automatically Generate
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Generate call centre rosters in minutes instead of days. Save
                  hours of manual planning while ensuring equitable
                  distribution.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/feature/rules-engine" className="block">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Compliant with regulations
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Ensure all schedules meet rest period requirements and labour
                  regulations automatically.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/solutions/ai-roster-generator" className="block">
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
                  Distribute shifts and workload equitably across your team with
                  transparent tracking.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <Link href="/feature/leave-requests" className="block">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Streamline agent requests
                </h3>
                <p className="text-base text-gray-600 mb-3 flex-grow">
                  Manage availability, swaps, and preferences efficiently in one
                  integrated system.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Common questions about call centre rostering
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Call Centre Rostering
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join call centres managing schedules fairly and efficiently around
              the clock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/staff-rostering-interactive-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                See It In Action
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
          { name: "Industries", url: "/industries" },
          {
            name: "Call Centre Rostering",
            url: "/industries/call-centre-rostering",
          },
        ]}
      />
    </SiteLayout>
  );
}
