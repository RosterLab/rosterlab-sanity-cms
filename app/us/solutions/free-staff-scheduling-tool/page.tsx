import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import USTrustedBy from "@/app/us/components/TrustedBy";
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

export const metadata = withHreflang(
  {
    title: "Free Staff Scheduling Tool - RosterLab",
    description:
      "Free staff scheduling tool for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff schedule for free, no credit card required.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/solutions/free-staff-scheduling-tool",
    },
    openGraph: {
      title: "Free Staff Scheduling Tool - RosterLab",
      description:
        "Free staff scheduling tool for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff schedule for free, no credit card required.",
      type: "website",
      url: "https://rosterlab.com/us/solutions/free-staff-scheduling-tool",
      images: [
        {
          url: "/images/og images/SolutionFree.png",
          width: 1200,
          height: 630,
          alt: "Free Digital Scheduling Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Staff Scheduling Tool - RosterLab",
      description:
        "Free staff scheduling tool for teams. Simple rule checking, dynamic stats, and free mobile app. Build your staff schedule for free, no credit card required.",
      images: ["/images/og images/SolutionFree.png"],
    },
  },
  "/us/solutions/free-staff-scheduling-tool",
);

const faqItems = [
  {
    question: "What is a free staff scheduling tool?",
    answer:
      "A free staff scheduling tool is a cloud-based platform that helps managers create and manage employee work schedules without cost. RosterLab's free tool includes features like digital schedule building, basic rule checking to prevent errors, real-time statistics tracking, and a free mobile app for staff. It's designed to help teams transition from spreadsheets to professional digital scheduling while maintaining simplicity and ease of use.",
  },
  {
    question: "Is the AI generator included in the free product?",
    answer:
      "The <a href='/us/solutions/ai-staff-schedule-maker' style='color: #2563eb; text-decoration: underline;'>AI generator</a> is only available for the paid version of the platform. The free version provides a manual scheduling platform with simple rule checking, dynamic statistics, and mobile app access - everything you need to move from spreadsheets to digital scheduling.",
  },
  {
    question: "Should I upgrade to AI scheduling?",
    answer:
      "Yes, absolutely! While our free product provides a convenient platform to manage your schedules digitally, if you have complex scheduling needs, automatic scheduling can eliminate unnecessary admin, ensure compliance with all rules, and let you focus on what truly matters.",
  },
  {
    question: "How do I keep my teams notified and engaged?",
    answer:
      "Team members can view their published schedules on the RosterLab mobile app, receiving instant notifications when schedules change. Staff can submit their shift preferences directly through the app, which appear in your scheduling view. No more searching through emails or handwritten notes - all preferences are collected digitally in one place.",
  },
  {
    question: "What schedule statistics can I view?",
    answer:
      "View dynamic counts including hours worked, weekends worked, requests met, and skill mix on each shift. Set acceptable staffing ranges and the platform will highlight when you have too few or too many people assigned. All statistics update in real-time as you build your schedule.",
  },
  {
    question: "How does RosterLab help reduce scheduling mistakes?",
    answer:
      "The free platform checks for simple rule violations as you build your schedule manually. Get visual warnings when you assign too many consecutive shifts or violate basic rest requirements. Staff preferences collected through the mobile app are displayed alongside the schedule, helping you make informed decisions.",
  },
  {
    question: "Is this the best free staff scheduling app for my business?",
    answer:
      "RosterLab's free scheduling tool is ideal for businesses looking to move from spreadsheets to digital scheduling. It offers essential features like cloud-based schedule creation, simple rule checking, real-time statistics, and free mobile apps for iOS and Android. While it's perfect for basic scheduling needs, businesses with complex requirements may benefit from our AI-powered solution which automatically generates optimized schedules while ensuring complete compliance.",
  },
];

const painPoints = [
  {
    title: "No More Spreadsheet Chaos",
    description:
      "Multiple versions, lost updates, and formula errors making scheduling a nightmare. Move to digital scheduling - it's free forever.",
  },
  {
    title: "Free Forever",
    description:
      "No hidden fees, no credit card required. Get started with digital scheduling at no cost and stay free forever.",
  },
  {
    title: "Real-Time Notifications",
    description:
      "Keep your team informed with instant push notifications when schedules change - no more missed communications.",
  },
  {
    title: "Free Mobile Apps",
    description:
      "Staff can view schedules and submit preferences from anywhere with our free iOS and Android apps.",
  },
];

export default function ManualSchedulingPage() {
  return (
    <SiteLayout>
      <>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start">
              <div className="w-full pb-8 lg:pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Free Staff{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Scheduling Tool
                  </span>{" "}
                  for Teams
                </h1>

                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/free-staff-scheduling.jpg"
                    alt="Free Staff Scheduling Tool"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Build free digital staff schedules in the cloud with simple
                  rule checking, live statistics, and free mobile app for your
                  team.
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
                    href="/us/solutions/ai-staff-schedule-maker"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                    analyticsLabel="Discover AI Schedules"
                    analyticsLocation="Solution Page Free Staff Scheduling"
                    analyticsProperties={{
                      cta_type: "upgrade",
                      page_name: "Free Staff Scheduling",
                      section: "hero",
                    }}
                  >
                    Discover AI Schedules
                  </Button>
                </div>
              </div>
              {/* Desktop only: Image in right column */}
              <div className="hidden lg:block w-full relative">
                <Image
                  src="/images/us-images/free-staff-scheduling.jpg"
                  alt="Free Staff Scheduling Tool"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </Container>

          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
            <svg
              className="relative block w-full h-3 lg:h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
            >
              <path
                fill="#f9fafb"
                d="M0,40 Q360,25 720,40 T1440,40 L1440,80 L0,80 Z"
                opacity="0.5"
              />
              <path
                fill="#f9fafb"
                d="M0,50 C240,35 480,55 720,45 C960,35 1200,55 1440,50 L1440,80 L0,80 Z"
              />
            </svg>
          </div>
        </section>

        {/* Intelligent Scheduling Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Your Free Digital Staff Schedule
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our free digital tool provides a web-based interface for
                  creating and managing schedules. Check for simple rule
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
                        real-time as you build your schedule manually.
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
                        Staff Mobile App
                      </h3>
                      <p className="text-gray-600">
                        Staff can view published schedules and submit
                        preferences through free iOS and Android apps. No more
                        chasing emails or paper forms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[600px]">
                <Image
                  src="/images/illustration/free_platform.png"
                  alt="Your Digital Scheduling Platform"
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
                Six Steps to Build Your Digital Staff Schedule
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get started with digital scheduling in minutes. Our simple
                process helps you transition from spreadsheets to cloud-based
                scheduling.
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
                        Create schedules using our intuitive drag-and-drop
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
                        Monitor your schedule
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
                        schedules are always backed up and accessible when you
                        need them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  Ready to upgrade to AI-powered scheduling?
                </p>
                <Button
                  href="/us/solutions/ai-staff-schedule-maker"
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
                  Move your scheduling to the cloud with our free digital
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
                        reference when building schedules
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
                      <span className="text-gray-700">Staff mobile app</span>
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
                  alt="Free Staff Mobile App"
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Free Staff Mobile App
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
                    href="/us/solutions/staff-scheduling-mobile-app"
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
            <USTrustedBy />
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
                  href="/us/book-a-demo"
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
    </SiteLayout>
  );
}
