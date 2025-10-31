import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TrustedBy from "@/components/sections/TrustedBy";
import { withHreflang } from "@/components/seo/HreflangTags";
import {
  HiCheck,
  HiClock,
  HiTrendingUp,
  HiUsers,
  HiShieldCheck,
  HiCog,
  HiAcademicCap,
} from "react-icons/hi";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Free Staff Rostering Software - RosterLab",
    description:
      "Free staff rostering software for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff roster for free, no credit card required.",
    alternates: {
      canonical:
        "https://rosterlab.com/solutions/free-staff-rostering-software",
    },
    openGraph: {
      title: "Free Staff Rostering Software - RosterLab",
      description:
        "Free staff rostering software for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff roster for free, no credit card required.",
      type: "website",
      url: "https://rosterlab.com/solutions/free-staff-rostering-software",
      images: [
        {
          url: "/images/og-images/SolutionFree.png",
          width: 1200,
          height: 630,
          alt: "Free Digital Rostering Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Staff Rostering Software - RosterLab",
      description:
        "Free staff rostering software for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff roster for free, no credit card required.",
      images: ["/images/og-images/SolutionFree.png"],
    },
  },
  "/solutions/free-staff-rostering-software",
);

const faqItems = [
  {
    question: "Is the AI generator included in the free product?",
    answer:
      "The <a href='/solutions/ai-roster-generator' style='color: #2563eb; text-decoration: underline;'>AI generator</a> is only available for the paid version of the platform. The free version provides a manual scheduling platform with simple rule checking, dynamic statistics, and mobile app access - everything you need to move from spreadsheets to digital rostering.",
  },
  {
    question: "Should I upgrade to AI rostering?",
    answer:
      "Yes, absolutely! While our free product provides a convenient platform to manage your rosters digitally, if you have complex rostering needs, <a href='/feature/automated-rostering' style='color: #2563eb; text-decoration: underline;'>automatic rostering</a> can eliminate unnecessary admin, ensure compliance with all rules, and let you focus on what truly matters.",
  },
  {
    question: "How do I install the employee mobile app?",
    answer:
      "The RosterLab employee mobile app is available for free on both iOS and Android devices. Invite your staff to the roster and then they can download it directly from the <a href='https://apps.apple.com/nz/app/rosterlab/id6448819917' target='_blank' rel='noopener noreferrer' style='color: #2563eb; text-decoration: underline;'>App Store</a> for iPhone/iPad or from the <a href='https://play.google.com/store/apps/details?id=com.rosterlab.app' target='_blank' rel='noopener noreferrer' style='color: #2563eb; text-decoration: underline;'>Google Play Store</a> for Android devices. Once installed, staff can log in with their credentials to access schedules, submit preferences, and receive notifications.",
  },
  {
    question: "How do I keep my teams notified and engaged?",
    answer:
      "Team members can view their published rosters on the RosterLab mobile app, receiving instant notifications when schedules change. Staff can submit their shift preferences directly through the app, which appear in your rostering view. No more searching through emails or handwritten notes - all preferences are collected digitally in one place.",
  },
  {
    question: "What roster statistics can I view?",
    answer:
      "View dynamic counts including hours worked, weekends worked, requests met, and skill mix on each shift. Set acceptable staffing ranges and the platform will highlight when you have too few or too many people assigned. All statistics update in real-time as you build your roster.",
  },
  {
    question: "How does RosterLab help reduce scheduling mistakes?",
    answer:
      "The free platform checks for simple rule violations as you build your roster manually. Get visual warnings when you assign too many consecutive shifts or violate basic rest requirements. Staff preferences collected through the mobile app are displayed alongside the roster, helping you make informed decisions.",
  },
];

export default function ManualSchedulingPage() {
  return (
    <SiteLayout>
      <>
        {/* Hero Section */}
        <div className="bg-white pt-16 pb-0">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="pb-8 lg:pb-12">
                <h1 className="text-[40px] sm:text-5xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Free{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Staff Rostering
                  </span>{" "}
                  Software
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Build rosters manually in the cloud with simple rule checking,
                  live statistics, and free mobile apps for your team.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      Move away from spreadsheets and into the cloud
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      Manage your preferences without constant emails
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      Notify your staff immediately when shifts change
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      Alert yourself to any mistakes you make
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="https://app.rosterlab.com/signup"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
                    analyticsLabel="Start for Free"
                    analyticsLocation="Solution Page Free Staff Scheduling"
                    analyticsProperties={{
                      cta_type: "signup",
                      page_name: "Free Staff Scheduling",
                      section: "hero",
                    }}
                  >
                    Start for Free
                  </Button>
                  <Button
                    href="/solutions/ai-roster-generator"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                    analyticsLabel="Discover AI Rosters"
                    analyticsLocation="Solution Page Free Staff Scheduling"
                    analyticsProperties={{
                      cta_type: "upgrade",
                      page_name: "Free Staff Scheduling",
                      section: "hero",
                    }}
                  >
                    Discover AI Rosters
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="w-full max-w-lg">
                  <Image
                    src="/images/illustration/test5 copy.svg"
                    alt="Free Staff Scheduling Illustration"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Intelligent Scheduling Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Your Digital Rostering Platform
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our free digital platform provides a web-based interface for
                  creating and managing rosters. Check for simple rule
                  violations, view dynamic statistics, and keep your team
                  connected through our mobile app - all without the spreadsheet
                  hassle.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiClock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Simple Rule Checking
                      </h3>
                      <p className="text-gray-600">
                        Get visual warnings when you violate simple rules like
                        consecutive shifts or minimum hours. See alerts in
                        real-time as you build your roster manually.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiTrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Dynamic Statistics
                      </h3>
                      <p className="text-gray-600">
                        View live counts of hours worked, shift distribution,
                        and staffing levels. Color-code shifts for easy visual
                        management.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiUsers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Employee Mobile App
                      </h3>
                      <p className="text-gray-600">
                        Staff can view published rosters and submit preferences
                        through free iOS and Android apps. No more chasing
                        emails or paper forms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[600px]">
                <Image
                  src="/images/illustration/free_platform.png"
                  alt="Your Digital Rostering Platform"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Six Steps Section */}
        <div className="bg-white py-20">
          <Container>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                GETTING STARTED
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                Six Steps to Build Your Free Staff Roster
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started with digital scheduling in minutes. Our simple
                process helps you transition from spreadsheets to cloud-based
                rostering.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Steps displayed as a vertical timeline on mobile, horizontal cards on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Step 1 */}
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Set up your team
                      </h3>
                      <p className="text-gray-600">
                        Set up your staff list and store roles, skills, and
                        availability information digitally.
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
                        Configure your rules
                      </h3>
                      <p className="text-gray-600">
                        Set minimum staffing levels, maximum hours, and rest
                        requirements to ensure compliance.
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
                        Build your schedule digitally
                      </h3>
                      <p className="text-gray-600">
                        Create rosters using our intuitive drag-and-drop
                        interface. See warnings when rules are violated.
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
                        Publish to your team
                      </h3>
                      <p className="text-gray-600">
                        Share schedules instantly via the mobile app. Staff
                        receive notifications and can sync to their calendars.
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
                        Monitor your roster
                      </h3>
                      <p className="text-gray-600">
                        Track key statistics like hours worked, weekends
                        assigned, and skill mix. See everything at a glance with
                        colour-coded shifts.
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
                        Access anywhere
                      </h3>
                      <p className="text-gray-600">
                        Work from any device with our cloud-based platform. Your
                        rosters are always backed up and accessible when you
                        need them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  Ready to upgrade to AI-powered rostering?
                </p>
                <Button
                  href="/solutions/ai-roster-generator"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3"
                  analyticsLabel="Explore AI Features"
                  analyticsLocation="Solution Page Free Staff Scheduling"
                  analyticsProperties={{
                    cta_type: "upgrade",
                    page_name: "Free Staff Scheduling",
                    section: "steps",
                  }}
                >
                  Explore AI Features
                </Button>
              </div>
            </div>
          </Container>
        </div>

        {/* Compliance Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Say Goodbye to Spreadsheets
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Move your rostering to the cloud with our free digital
                  platform. Track statistics, check basic rules, and keep your
                  team connected through mobile apps.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Simple Rule Violations Check
                      </h3>
                      <p className="text-gray-600">
                        Get warnings for basic violations like too many
                        consecutive shifts or insufficient rest periods
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiAcademicCap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Track Skills and Seniority
                      </h3>
                      <p className="text-gray-600">
                        Record staff qualifications and experience levels for
                        reference when building rosters
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiCog className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Dynamic Statistics
                      </h3>
                      <p className="text-gray-600">
                        Monitor hours worked, requests met, weekends worked, and
                        skill mix in real-time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Core Features
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">
                        Manual scheduling platform
                      </span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">
                        Simple rule violations check
                      </span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">
                        Dynamic statistics counts
                      </span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">
                        Colour coding by shifts
                      </span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-700">Employee mobile app</span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Advanced AI Capabilities Section */}
        <div className="bg-white py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/employee_app.png"
                  alt="Free Employee Mobile App"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Free Employee Mobile App
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Keep your team connected with our free mobile app. Staff can
                  view schedules, share their preferences, and receive important
                  updates anytime, anywhere.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Real-time push notifications
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      View schedules on the go
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Share Staff Preferences
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Available on{" "}
                      <a
                        href="https://apps.apple.com/nz/app/rosterlab/id6448819917"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        iOS
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.rosterlab.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Android
                      </a>
                    </span>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    href="/solutions/staff-roster-mobile-app"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3"
                    analyticsLabel="Learn More About Mobile App"
                    analyticsLocation="Solution Page Free Staff Scheduling"
                    analyticsProperties={{
                      cta_type: "learn_more",
                      page_name: "Free Staff Scheduling",
                      section: "mobile_app",
                    }}
                  >
                    Learn More About Mobile App
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Trusted By Section */}
        <div className="bg-gray-50">
          <div className="[&>section]:bg-gray-50">
            <TrustedBy />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Everything you need to know about our free digital scheduling
                tool
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Simplify Your Scheduling?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our free digital scheduling tool and transform your
                workforce management today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="https://app.rosterlab.com/signup"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Start for Free"
                  analyticsLocation="Solution Page Free Staff Scheduling"
                  analyticsProperties={{
                    cta_type: "signup",
                    page_name: "Free Staff Scheduling",
                    section: "final_cta",
                  }}
                >
                  Start for Free
                </Button>
                <Button
                  href="/book-a-demo"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-colors"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Solution Page Free Staff Scheduling"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Free Staff Scheduling",
                    section: "final_cta",
                  }}
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
          { name: "Free Staff Rostering Software" },
        ]}
      />
    </SiteLayout>
  );
}
