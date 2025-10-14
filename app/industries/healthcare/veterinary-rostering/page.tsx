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
    title: "Veterinary Rostering Software - RosterLab",
    description:
      "End chaotic vet rosters and overwork. Build fair, efficient rosters that maintain proper staffing coverage and respect work-life balance.",
    alternates: {
      canonical:
        "https://rosterlab.com/industries/healthcare/veterinary-rostering",
    },
    openGraph: {
      title: "Veterinary Rostering Software - RosterLab",
      description:
        "End chaotic vet rosters and overwork. Build fair, efficient rosters that maintain proper staffing coverage and respect work-life balance.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare/veterinary-rostering",
      images: [
        {
          url: "/images/updated-hero/vet.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Veterinary Rostering Software - RosterLab",
      description:
        "End chaotic vet rosters and overwork. Build fair, efficient rosters that maintain proper staffing coverage and respect work-life balance.",
      images: ["/images/updated-hero/vet.jpg"],
    },
  },
  "/industries/healthcare/veterinary-rostering",
);

const faqItems = [
  {
    question:
      "How does RosterLab handle emergency coverage for veterinary clinics?",
    answer:
      "RosterLab helps you enforce minimum staffing requirements and skill mix rules for every shift, including emergency coverage. The AI will flag rosters that don't have proper veterinarian coverage, ensuring animal care is never compromised. You can set different requirements by clinic type and shift.",
  },
  {
    question: "Can veterinary staff submit their own preferences?",
    answer:
      "Yes. Vets, technicians and assistants can submit shift preferences, time-off requests, and availability through our mobile app. RosterLab's <a href='https://rosterlab.com/feature/self-scheduling' class='text-green-600 hover:text-green-700 underline'>self-rostering feature</a> lets staff bid for available shifts while the system maintains coverage requirements and fatigue management rules.",
  },
  {
    question: "What happens when a vet calls in sick at the last minute?",
    answer:
      "RosterLab identifies replacement vets who meet the skill requirements and are available. You can see who's qualified, check their recent hours to avoid fatigue, and fill the gap quickly. The system prevents unsafe coverage by alerting you if a shift can't be properly staffed.",
  },
  {
    question: "How does RosterLab prevent roster-based favouritism?",
    answer:
      "RosterLab uses algorithm-based shift allocation that eliminates subjective bias. Every shift assignment is based on objective criteria: skills, availability, workload balance, and compliance rules.",
  },
  {
    question: "Can RosterLab help identify skill gaps in our veterinary team?",
    answer:
      "Yes. RosterLab gives you complete visibility of all competencies across your veterinary staff. You can instantly see which critical skills are held by only one or two people, identify risks, and plan accordingly. The system alerts you when key skills are missing from a shift.",
  },
  {
    question: "How does RosterLab save veterinary hospitals money?",
    answer:
      "RosterLab reduces costs through less locum usage and more effective staffing. By optimising your existing staff schedules and ensuring proper skill mix coverage, you can minimise expensive agency staff and overtime costs. Our AI-powered rostering helps you identify the right staffing levels, reducing both overstaffing and understaffing. <a href='https://rosterlab.com/tools/roi-calculator' class='text-green-600 hover:text-green-700 underline'>Use our ROI calculator</a> to see your potential savings.",
  },
];

export default function VeterinaryRosteringPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-teal-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                  Optimised, Flexible
                </span>{" "}
                Veterinary Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create efficient AI rosters that respect your vet preferences,
                maintain the right skill mix, and ensure work-life balance.
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
                  Optimise staff skill mix for every shift
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
                  Reduce your time rostering with automatic roster generation
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
                  24/7 emergency coverage management
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
                  Flexible preference based self-rostering
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/case-studies"
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
                >
                  Read Case Studies
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/vets.svg"
                alt="Veterinary rostering software interface"
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
              Better Veterinary Staffing Starts with Smart Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build efficient and fair veterinary rosters in minutes, not days.
              Discover how:
            </p>
          </div>

          {/* Interactive Demo Widget */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-50 to-teal-50 p-4">
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
            {/* Pain Point 1: Automatic Roster Generation */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
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
                generation giving you time back to focus on animal care.
              </p>
            </div>

            {/* Pain Point 2: Coverage Requirements */}
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
                Less fatigue through safer rosters
              </h3>
              <p className="text-gray-600">
                Prevent burnout with intelligent workload distribution and
                automated rest period enforcement across your team.
              </p>
            </div>

            {/* Pain Point 3: Improve flexibility through self-rostering */}
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
                Improve flexibility through self-rostering
              </h3>
              <p className="text-gray-600">
                Empower veterinary staff with flexibility while maintaining
                fairness and proper coverage requirements.
              </p>
            </div>

            {/* Pain Point 4: Emergency Coverage */}
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
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
                24/7 emergency coverage
              </h3>
              <p className="text-gray-600">
                Manage after-hours and emergency on-call rotations while
                ensuring fair distribution across your team.
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
                Perfect For Veterinary Hospitals
              </h3>
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Optimise Shifts for Skill Mix
                    </h4>
                    <p className="text-gray-600">
                      Ensure veterinary staff are working safely, enhancing
                      overall animal care outcomes and client trust.
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
                      Reduce Fatigue & Burnout
                    </h4>
                    <p className="text-gray-600">
                      Fairly distribute night shifts and enhance overall
                      work-life balance to minimise burnout for your veterinary
                      team.
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
                      Improve Cost Efficiency
                    </h4>
                    <p className="text-gray-600">
                      Less locums, more effective staffing. Better utilise staff
                      hours to reduce overtime and ensure proper skill coverage
                      across all procedures and appointments.
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
                      Meet More Staff Preferences
                    </h4>
                    <p className="text-gray-600">
                      Help veterinary staff achieve better work-life balance by
                      considering a high percentage of staff preferences whilst
                      ensuring critical business needs are met.
                    </p>
                  </div>
                </div>

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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Improve Staffing Level Accuracy
                    </h4>
                    <p className="text-gray-600">
                      Understand your staffing levels better and how many people
                      are required for each role.
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
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
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
              Paw-sitive Veterinary Rostering Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real outcomes that improve veterinary staff wellbeing and animal
              care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-xl p-8 border border-green-100">
              <div className="text-4xl font-bold text-green-600 mb-2">90%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reduction in Rostering Time
              </h3>
              <p className="text-gray-600">
                Clinic managers spend days less per month on rostering,
                redirecting time to animal care and team support.
              </p>
            </div>

            <div className="bg-teal-50 rounded-xl p-8 border border-teal-100">
              <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Stable Staffing
              </h3>
              <p className="text-gray-600">
                Proper vet coverage maintained across every shift, with instant
                alerts and compliant replacement suggestions when changes occur.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Transparent Roster Assignment
              </h3>
              <p className="text-gray-600">
                Fair, automated rostering eliminates favoritism through
                transparent, bias-free shift allocation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Self-Rostering Workflow Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              VET-FIRST WORKFLOW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              How Veterinary Staff Engage with Their Rosters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built around self-rostering and staff autonomy, not just top-down
              rostering
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Set Staffing Requirements
                    </h3>
                    <p className="text-gray-600">
                      Define minimum staffing ratios, skill mix needs
                      (emergency-trained, surgical, etc.), and clinic coverage
                      requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Staff Submit Preferences
                    </h3>
                    <p className="text-gray-600">
                      Via mobile app, veterinary staff indicate shift
                      preferences, time off requests, and availability. No
                      emails or paper forms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI Generates Balanced Roster
                    </h3>
                    <p className="text-gray-600">
                      RosterLab balances preferences, skills, and coverage rules
                      to create fair rosters with proper staffing levels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Publish to Mobile
                    </h3>
                    <p className="text-gray-600">
                      Rosters sync instantly to staff phones. They see their
                      shifts, can request swaps, and get real-time updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Staff Self-Roster Open Shifts
                    </h3>
                    <p className="text-gray-600">
                      Unfilled shifts are posted as "open shifts" - staff can
                      pick them up directly if qualified and within hour limits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Handle Last-Minute Changes
                    </h3>
                    <p className="text-gray-600">
                      If someone calls in sick, RosterLab shows who can safely
                      fill the gap without breaking coverage or fatigue rules.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to streamline your veterinary rostering?
              </p>
              <Button
                href="/book-a-demo"
                className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
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
              Essential Features for Veterinary Hospitals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built tools that address the unique complexity of
              veterinary hospital rosters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Coverage Enforcement
              </h3>
              <p className="text-gray-600">
                Configurable vet-to-support staff ratios by clinic type and
                shift. The system will flag understaffed rosters.
              </p>
            </div>

            {/* Feature 2 */}
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
                Fair Workload Distribution
              </h3>
              <p className="text-gray-600">
                Enforce fair distribution of shifts, night shifts, weekend work,
                and on-call duties across your veterinary team.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Self-Rostering
              </h3>
              <p className="text-gray-600">
                Veterinary staff submit preferences, apply for open shifts, and
                manage time-off requests directly from their phones.
              </p>
            </div>

            {/* Feature 5 */}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Roster Changes
              </h3>
              <p className="text-gray-600">
                When staff call in sick, see who's qualified and available to
                fill the gap without breaking coverage rules.
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
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
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
              Fur-quently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Questions we hear from veterinary clinic managers
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Smarter, Fairer Veterinary Rosters
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join veterinary clinics that have eliminated chaotic rosters and
              reduced staff burnout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-a-demo"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button
                href="/tools/roi-calculator"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600"
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
          { name: "Veterinary Rostering" },
        ]}
      />
    </SiteLayout>
  );
}
