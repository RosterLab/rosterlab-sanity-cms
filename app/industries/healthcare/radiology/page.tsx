import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata = {
  title: "Radiology Staff Rostering Software - RosterLab",
  description:
    "Build your radiology staff roster with RosterLab. Automatically generate fair, compliant and flexible radiology rosters that save time and money.",
  openGraph: {
    title: "Radiology Staff Rostering Software - RosterLab",
    description:
      "Build your radiology staff roster with RosterLab. Automatically generate fair, compliant and flexible radiology rosters that save time and money.",
    type: "website",
    url: "https://rosterlab.com/industries/healthcare/radiology",
    images: [
      {
        url: "/images/og images/IndustryRadiology.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiology Staff Rostering Software - RosterLab",
    description:
      "Build your radiology staff roster with RosterLab. Automatically generate fair, compliant and flexible radiology rosters that save time and money.",
    images: ["/images/og images/IndustryRadiology.png"],
  },
};

const faqItems = [
  {
    question: "How does long-term roster planning work in radiology?",
    answer:
      "RosterLab's radiology scheduling supports both long-term and short-term roster creation. You can plan quarterly or annual schedules considering subspecialty rotations, vacation blocks, conference attendance, and equipment maintenance windows. The system automatically ensures continuous coverage for all modalities while respecting radiologist preferences and certification requirements. Changes in long-term plans automatically cascade to daily schedules, maintaining consistency across all time horizons.",
  },
];

export default function RadiologyPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Scheduling your sessions just got a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  whole lot easier
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Reduce rostering time by 90%. Optimise radiologist coverage and
                modality planning with intelligent rostering.
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
                  Skill and seniority rostering
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
                  Seamlessly integrate your long and short term rosters
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
                  Fair workload balancing from the get go
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
                  Move away from spreadsheets and into the cloud
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
                  href="https://app.rosterlab.com/signup"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/radiology.svg"
                alt="Radiology scheduling dashboard"
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
              Built for specific radiology rostering challenges.
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Balance subspecialty coverage, equipment allocation, and reading
              room assignments while maintaining optimal patient flow and report
              turnaround times.
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
                Unified Multi-Modality Rostering
              </h3>
              <p className="text-gray-600">
                Break down silos between modality teams. Create department-wide
                rosters that balance staffing across CT, MRI, X-ray, and other
                units.
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
                Consistent Fairness Across Teams
              </h3>
              <p className="text-gray-600">
                Ensure equitable shift distribution across all modalities,
                minimum training rotations, and late or on-call duties.
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
                Handle Complex Skill-Mix
              </h3>
              <p className="text-gray-600">
                Easily set up complex skill requirements for each modality and
                session to improve department planning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Modern Radiology Departments
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
                      Track & Allocate Specialised Skills and Seniority
                    </h3>
                    <p className="text-gray-600">
                      Maintain a digital record of what skills each team member
                      has. Let the AI allocates the right person to the right
                      session.
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
                      Seamless Integrate Long-Term Plans
                    </h3>
                    <p className="text-gray-600">
                      AI optimises weekly rosters around your pre-established
                      commitments. Preload established fixed dates rotations,
                      exam dates, and training schedules to avoid mistakes.
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
                      Personalised Session Requirements
                    </h3>
                    <p className="text-gray-600">
                      Ensure each radiographer gets their required admin hours,
                      MRI sessions, or specialty training. Fairly distribute
                      after-hours and on-call duties.
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
                      Smart Cloud-Based Distribution
                    </h3>
                    <p className="text-gray-600">
                      Publish rosters instantly to all stakeholders. Managers
                      see session views while staff receive personalised
                      calendars on their mobile devices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button
                  href="/blog/whanganui-radiography-department-embraces-ai-rostering"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Read case study
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/radiology_excellence.png"
                alt="Radiology department excellence"
                width={600}
                height={500}
                className="rounded-lg shadow-xl w-full h-auto"
              />
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
              Your Complete Radiology Rostering Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From long-term planning to daily adjustments, manage every aspect
              of your imaging department.
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
                      Define Coverage Needs
                    </h3>
                    <p className="text-gray-600">
                      Set modality requirements, training distributions rules,
                      and subspecialty coverage targets.
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
                      Input Constraints
                    </h3>
                    <p className="text-gray-600">
                      Add radiologist skills, preferences, contractual rules,
                      and staffing coverage by modality.
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
                      Collect staff requests
                    </h3>
                    <p className="text-gray-600">
                      Collect and automatically take staff requests into account
                      while staying compliant.
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
                      Generate Schedule
                    </h3>
                    <p className="text-gray-600">
                      AI creates optimal rosters balancing all requirements in
                      minutes.
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
                      Review & Adjust
                    </h3>
                    <p className="text-gray-600">
                      Fine-tune assignments, add notes, and re-roster a selected
                      subset to accommodate last-minute changes.
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
                      Publish & Sync
                    </h3>
                    <p className="text-gray-600">
                      Distribute your final rosters through streamlined digital
                      solution and share them with different teams as needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to streamline your radiology rostering?
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

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern Cloud Platform for Radiology Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, accessible, and integrated with your existing systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="block">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Optimise for skill mix
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Automatically assign radiologists to modalities and
                  subspecialties for optimal coverage.
                </p>
                <span className="text-teal-600 text-base font-medium hover:text-teal-700">
                  Learn more →
                </span>
              </div>
            </div>

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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Compliant with unions
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Ensure all schedules meet union agreements and regulatory
                  requirements automatically.
                </p>
                <span className="text-cyan-600 text-base font-medium hover:text-cyan-700">
                  Learn more →
                </span>
              </div>
            </Link>

            <div className="block">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fairer shift allocation
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Distribute shifts, on-call duties, and workload equitably
                  across your team.
                </p>
                <span className="text-blue-600 text-base font-medium hover:text-blue-700">
                  Learn more →
                </span>
              </div>
            </div>

            <div className="block">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Streamline staff requests
                </h3>
                <p className="text-base text-gray-600 mb-3">
                  Manage leave requests, shift swaps, and preferences
                  efficiently in one system.
                </p>
                <span className="text-indigo-600 text-base font-medium hover:text-indigo-700">
                  Learn more →
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-white">
        <TrustedBy />
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Common questions about radiology scheduling
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
              Transform Your Radiology Department Scheduling
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading imaging centres saving days of scheduling time every
              month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                See It In Action
              </Button>
              <Button
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
