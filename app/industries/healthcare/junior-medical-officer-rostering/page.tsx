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
    title: "Junior Medical Officer Rostering Software - RosterLab",
    description:
      "End unsafe rosters and overwork. Build fair, compliant JMO rosters that maintain safe staffing ratios and respect union rules.",
    alternates: {
      canonical:
        "https://rosterlab.com/industries/healthcare/junior-medical-officer-rostering",
    },
    openGraph: {
      title: "Junior Medical Officer Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant JMO rosters that maintain safe staffing ratios and respect union rules.",
      type: "website",
      url: "https://rosterlab.com/industries/healthcare/junior-medical-officer-rostering",
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
      title: "Junior Medical Officer Rostering Software - RosterLab",
      description:
        "End unsafe rosters and overwork. Build fair, compliant JMO rosters that maintain safe staffing ratios and respect union rules.",
      images: ["/images/us-images/iStock-2232242180.jpg"],
    },
  },
  "/industries/healthcare/junior-medical-officer-rostering",
);

const faqItems = [
  {
    question: "How does RosterLab ensure AMA/EBA compliance for JMO rosters?",
    answer:
      "RosterLab enforces AMA and EBA rules automatically, including maximum consecutive shifts, minimum rest periods, and fatigue management requirements. The AI will flag rosters that violate compliance rules, ensuring JMOs actually work the rosters rather than calling in sick or not showing up due to unsafe conditions.",
  },
  {
    question: "How does RosterLab handle training and exam periods for JMOs?",
    answer:
      "JMOs can request protected time for training sessions and exams through the mobile app. RosterLab schedules longer days off around exam dates and balances the rest of the roster to ensure educational requirements are met while maintaining department coverage. Training requirements can override standard preferences to ensure complete training programs.",
  },
  {
    question: "How does RosterLab ensure fair night shift distribution?",
    answer:
      "RosterLab automatically distributes night shifts equitably across all JMOs, preventing burnout and ensuring fairness. The system pairs junior doctors with senior registrars for night coverage and manages appropriate transitions between night and day shifts to reduce sick leave and fatigue.",
  },
  {
    question: "Can RosterLab help improve JMO retention?",
    answer:
      "Yes. By creating fair, compliant rosters that respect work-life balance and training needs, RosterLab helps departments build a positive reputation that attracts and retains JMOs. The system balances preferences with staffing requirements, making it easier for working parents and those with other commitments to stay in the workforce.",
  },
  {
    question: "How does RosterLab manage skill mix for night shifts?",
    answer:
      "RosterLab ensures proper supervision by pairing junior medical officers with senior registrars for night coverage. The system enforces skill mix requirements to maintain safe staffing levels and provides visibility of competencies across your medical team.",
  },
];

export default function JuniorMedicalOfficerRosteringPage() {
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
                  AMA/EBA Compliant
                </span>{" "}
                JMO Rosters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create compliant AI rosters that balance training requirements,
                fair night shift distribution, and JMO wellbeing.
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
                  AMA/EBA compliant rosters
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
                  Protected training and exam periods
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
                  Fair night shift distribution
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
                  Improved JMO retention and wellbeing
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
                src="/images/illustration/nursing.svg"
                alt="JMO rostering software interface"
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
              Better JMO Rostering Starts with Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build AMA/EBA compliant JMO rosters in minutes, not days. Discover
              how:
            </p>
          </div>

          {/* Interactive Demo Widget */}
          <div className="mb-16 max-w-4xl mx-auto">
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
                generation giving you time back to focus on what's important.
              </p>
            </div>

            {/* Pain Point 2: Stay compliant with rules */}
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
                AMA/EBA compliance guaranteed
              </h3>
              <p className="text-gray-600">
                Rosters that JMOs actually work instead of calling in sick.
                Build department reputation and reduce compliance risks.
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
                Protected training and exam time
              </h3>
              <p className="text-gray-600">
                Schedule longer days off around exams and ensure complete
                training programs while maintaining coverage.
              </p>
            </div>

            {/* Pain Point 4: Ensure safe staffing levels */}
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
                Fair night shift distribution
              </h3>
              <p className="text-gray-600">
                Equitable night allocation paired with senior registrars. Proper
                transitions reduce burnout and sick leave.
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
                Perfect For Nurse Roster Challenges
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
                      Eliminate Favouritism
                    </h4>
                    <p className="text-gray-600">
                      Ensure fairness, reduce the perception of favouritism, and
                      create a more inclusive work environment for nurses.
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Ensure Clinical Safety
                    </h4>
                    <p className="text-gray-600">
                      Ensure nurses are working safely, enhancing overall
                      patient outcomes and trust in patient care.
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
                      Reduce Nurse Fatigue
                    </h4>
                    <p className="text-gray-600">
                      Enhance overall work-life balance and minimise fatigue for
                      your staff.
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
                      Improve Staffing Level Accuracy
                    </h4>
                    <p className="text-gray-600">
                      Understand your staffing levels better and how many people
                      are required for each role.
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
                      Meet More Staff Preferences
                    </h4>
                    <p className="text-gray-600">
                      Help nurses achieve better work-life balance by
                      considering a high percentage of staff preferences whilst
                      ensuring critical business needs are met.
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Nurse Rostering Software for Teams
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
          { name: "Nurse Rostering V2" },
        ]}
      />
    </SiteLayout>
  );
}
