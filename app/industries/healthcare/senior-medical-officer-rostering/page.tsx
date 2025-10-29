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
    title: "Senior Medical Officer Rostering Software - RosterLab",
    description:
      "End unsafe rosters and overwork. Build fair, compliant SMO rosters that maintain safe staffing ratios and respect union rules.",
    alternates: {
      canonical:
        "https://rosterlab.com/industries/healthcare/senior-medical-officer-rostering",
    },
    openGraph: {
      title: "Senior Medical Officer Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant SMO rosters that maintain safe staffing ratios and respect union rules.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare/senior-medical-officer-rostering",
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
      title: "Senior Medical Officer Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant SMO rosters that maintain safe staffing ratios and respect union rules.",
      images: ["/images/us-images/iStock-2232242180.jpg"],
    },
  },
  "/industries/healthcare/senior-medical-officer-rostering",
);

const faqItems = [
  {
    question:
      "How does RosterLab handle SMOs working across public and private sectors?",
    answer:
      "RosterLab allows SMOs to inform their availability across both sectors. The system tracks unavailability patterns and preferred working days, accommodating complex schedules where doctors split time between public hospital work and private practice. This flexibility ensures rosters adapt to SMOs' commitments rather than dictating them.",
  },
  {
    question: "Can SMOs still maintain autonomy over their rosters?",
    answer:
      "Absolutely. RosterLab supports consensus-driven rostering where SMOs can review and adjust the roster. You maintain the level of autonomy you're accustomed to while benefiting from automated scheduling that handles the time-consuming administrative work. Changes can be made whenever needed while the system ensures fairness and coverage.",
  },
  {
    question:
      "How does RosterLab handle individual SMO preferences and constraints?",
    answer:
      "The system is built for high personalisation and flexibility. SMOs can input their preferences, leave requests, and unavailability. Each SMO's requests are honoured while maintaining departmental coverage and fairness.",
  },
  {
    question:
      "Is RosterLab easy to transition to for SMOs who value stability?",
    answer:
      "Yes. RosterLab is designed as an intuitive upgrade rather than a complete change. The interface is straightforward for doctors who may be worried about using new software. It preserves your existing rostering culture and established practices while eliminating manual administrative burden. Many departments find the transition smooth when framed as maintaining autonomy with better tools.",
  },
];

export default function SeniorMedicalOfficerRosteringPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Flexible, Personalised
                </span>{" "}
                SMO Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Balance public/private commitments, personal preferences, and
                department coverage with ease.
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
                  Manage complex availability across multiple sites & employers
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
                  Retain full control by reviewing, adjusting, & approving
                  rosters before sharing
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
                  Reduce admin while ensuring fairness and predictability
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
                  Schedule time for teaching, supervision, and professional
                  development
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
                  href="/case-studies"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50"
                >
                  Read Case Studies
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/smo.svg"
                alt="SMO rostering software interface"
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
              SMO Rostering That Respects Your Time
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for senior medical officers who value autonomy, flexibility,
              and work-life balance across multiple commitments.
            </p>
          </div>

          {/* AI Rostering Image */}
          <div className="mb-16 max-w-4xl mx-auto">
            <Image
              src="/images/generating.webp"
              alt="AI-generated roster interface"
              width={600}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1: Happier Senior Doctors */}
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
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Happier Senior Doctors
              </h3>
              <p className="text-gray-600">
                Reduce scheduling stress and administrative burden. Spend more
                time on patient care and less time managing complex rosters.
              </p>
            </div>

            {/* Benefit 2: Maintain Autonomy */}
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
                Maintain Autonomy and Freedom
              </h3>
              <p className="text-gray-600">
                Keep the final say over your roster. Set your availability on
                your terms while ensuring fair coverage across the department.
              </p>
            </div>

            {/* Benefit 3: Reduce Conflicts */}
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
                Reduce Scheduling Conflicts
              </h3>
              <p className="text-gray-600">
                Avoid double-bookings and last-minute changes. Transparent
                scheduling reduces tension and keeps senior staff satisfied.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <MobileAppPreferencesModule />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-16">
                Built for Senior Medical Officer Needs
              </h3>
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Personalised SMO Rosters
                    </h4>
                    <p className="text-gray-600">
                      SMOs can adjust and manage their individual schedules as
                      required. The system understands and optimises for
                      availability rather than dictating the roster.
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Availability & Preference Management
                    </h4>
                    <p className="text-gray-600">
                      Set availability across hospital sessions, private
                      clinics, and academic commitments. Manage preferences
                      directly from mobile.
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Compliance & Fatigue Safeguards
                    </h4>
                    <p className="text-gray-600">
                      Automatic checks for rest periods, maximum hours, and
                      recovery time between commitments - ensuring safety and
                      contract compliance.
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Leave Management
                    </h4>
                    <p className="text-gray-600">
                      Submit and track leave requests easily - maximise approved
                      leave while keeping it fair and fully covered.
                    </p>
                  </div>
                </div>
              </div>
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

      {/* Case Study & Image Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study - Left */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-8">
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                CASE STUDY
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-4">
                Sydney Tertiary Hospital Saves 300 Hours with AI SMO Rostering
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-700">
                    <strong>300+ hours saved</strong> annually in rostering
                    administration
                  </p>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-700">
                    <strong>Transparent fairness</strong> across 45+ emergency
                    consultants
                  </p>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-gray-700">
                    <strong>Complex preferences managed</strong> across hospital
                    sites and private practice
                  </p>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  href="/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering"
                  className="bg-teal-600 text-white hover:bg-teal-700"
                >
                  Read Full Case Study
                </Button>
              </div>
            </div>

            {/* Image - Right */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/us-images/radiology-roster.jpg"
                alt="Radiology scheduling dashboard"
                width={600}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Essential Features for SMO Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built tools that address the unique complexity of SMO term
              rosters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
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
                Automatic Roster Generation
              </h3>
              <p className="text-gray-600 mb-3">
                Automatically generate compliant rosters that enforce union
                rules and requirements. Reduce roster admin by 90%.
              </p>
              <a
                href="/solutions/ai-roster-generator"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Learn more →
              </a>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
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
                Self Scheduling
              </h3>
              <p className="text-gray-600 mb-3">
                SMOs submit preferences and personal requests directly from
                their phones using the staff mobile app. <br />
                &nbsp;
              </p>
              <a
                href="https://rosterlab.com/feature/self-scheduling"
                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                Learn more →
              </a>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
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
                Instant Shift Swaps
              </h3>
              <p className="text-gray-600 mb-3">
                Enable SMOs to swap shifts instantly while maintaining
                compliance and ensuring all swaps are approved and logged
                automatically.
              </p>
              <a
                href="/feature/shift-swaps"
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
              >
                Learn more →
              </a>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
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
                Submit Leave Requests
              </h3>
              <p className="text-gray-600 mb-3">
                SMOs can easily submit and track leave requests. Ensure all
                leave is honoured while maintaining department coverage and
                fairness.
              </p>
              <a
                href="/solutions/staff-roster-mobile-app"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Learn more →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="py-10 bg-white">
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
              Questions we hear from SMOs
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
              Build Compliant, Fairer SMO Rosters
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join departments that have improved SMO retention, reduced
              burnout, and built positive reputations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/tools/roi-calculator"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                See ROI Calculator
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
          { name: "Senior Medical Officer Rostering" },
        ]}
      />
    </SiteLayout>
  );
}
