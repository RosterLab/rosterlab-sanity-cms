import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Link from "next/link";
import { withHreflang } from '@/components/seo/HreflangTags';
import {
  HiCalendar,
  HiBell,
  HiUserGroup,
  HiClock,
  HiCheckCircle,
  HiCheck,
  HiUsers,
  HiTrendingUp,
  HiShieldCheck,
  HiCog,
  HiAcademicCap,
} from "react-icons/hi";

export const metadata = withHreflang({
  title: "Free Staff Scheduling Mobile App - RosterLab",
  description:
    "Free staff scheduling mobile app. View schedules, request time off, swap shifts, and access your mobile roster on the go. Available free on iOS and Android.",
  alternates: {
    canonical: 'https://rosterlab.com/us/solutions/staff-scheduling-mobile-app',
  },
  openGraph: {
    title: "Free Staff Scheduling Mobile App - RosterLab",
    description:
      "Free staff scheduling mobile app. View schedules, request time off, swap shifts, and access your mobile roster on the go. Available free on iOS and Android.",
    type: 'website',
    url: 'https://rosterlab.com/us/solutions/staff-scheduling-mobile-app',
    images: [
      {
        url: "/images/og images/SolutionMobileApp.png",
        width: 1200,
        height: 630,
        alt: "Staff Mobile App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Staff Scheduling Mobile App - RosterLab",
    description:
      "Free staff scheduling mobile app. View schedules, request time off, swap shifts, and access your mobile roster on the go. Available free on iOS and Android.",
    images: ["/images/og images/SolutionMobileApp.png"],
  },
}, '/us/solutions/staff-scheduling-mobile-app');

const appFeatures = [
  {
    title: "Personal Schedule View",
    description:
      "See your upcoming shifts, tasks, and days off in an easy-to-read calendar format",
    icon: HiCalendar,
    href: "/us/feature/self-scheduling",
  },
  {
    title: "Open Shifts",
    description:
      "Browse and claim available shifts that match your skills and availability",
    icon: HiBell,
    href: "/us/feature/open-shifts",
  },
  {
    title: "Time Off Requests",
    description:
      "Submit requests and track approval status directly from your phone",
    icon: HiCheckCircle,
    href: "/us/feature/time-off-requests",
  },
  {
    title: "Smart Shift Trades",
    description:
      "Rule-based auto-swaps reduce admin effort in the approval process.",
    icon: HiUserGroup,
    href: "/us/feature/shift-swaps-and-trades",
  },
];

const faqItems = [
  {
    question: "What is a staff scheduling mobile app?",
    answer:
      "A staff scheduling mobile app is a smartphone application that allows employees to access their work schedules anytime, anywhere. RosterLab's free mobile app lets staff view their upcoming shifts, submit time-off requests and preferences, receive instant notifications about schedule changes, and sync their work schedule with their personal calendar. It eliminates the need for paper schedules, emails, or phone calls, keeping your entire team connected and informed.",
  },
  {
    question: "How do staff members download and access the mobile app?",
    answer:
      "Staff needs to be invited by admins to the schedule. Once invited, they can then download the RosterLab mobile app from the <a href='https://apps.apple.com/nz/app/rosterlab/id6448819917' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline'>Apple App Store</a> or <a href='https://play.google.com/store/apps/details?id=com.rosterlab.app' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline'>Google Play Store</a>. After receiving an invitation, staff will get login credentials from their administrator to set up their account and access their personal schedule.",
  },
  {
    question: "Can staff request time off directly through the app?",
    answer:
      "Absolutely! The mobile app includes a comprehensive leave request system. Staff can submit time-off requests, specify the dates and reason, and track the approval status in real-time. Managers receive instant notifications of new requests.",
  },
  {
    question: "How does the shift swapping feature work?",
    answer:
      "The <a href='/us/feature/shift-swaps-and-trades' class='text-blue-600 hover:underline'>shift swap feature</a> allows staff to directly send a request to colleagues after communicated with them. Auto-swaps are permitted if the request doesn’t impact operational rules or coverage, with more complex cases triaged to managers for approval.",
  },
  {
    question: "What devices are supported by the mobile app?",
    answer:
      "The RosterLab mobile app is compatible with iOS devices (iPhone and iPad) running iOS 12 or later, and Android devices running Android 7.0 or later. We regularly update the app to support the latest operating systems.",
  },
];

export default function StaffMobileAppPage() {
  return (
    <SiteLayout>
      <>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-start">
              <div className="w-full pb-8 lg:pb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Free Staff Scheduling Mobile App
                </h1>
                
                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/stock/istockphoto-1748387978-2048x2048.jpg"
                    alt="Free Staff Scheduling Mobile App"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Give staff instant access to their schedule with easy shift management and improved communication.
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
                      Streamline communication
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
                      Increase staff engagement
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
                      Works on all devices
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
                      Available free on iOS and Android
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/us/book-a-demo"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
                    analyticsLabel="Book a Demo"
                    analyticsLocation="Solution Page Staff Schedule Mobile App"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "Staff Schedule Mobile App",
                      section: "hero"
                    }}
                  >
                    Book a Demo
                  </Button>
                  <Button
                    href="/us/contact"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                    analyticsLabel="Contact Us"
                    analyticsLocation="Solution Page Staff Schedule Mobile App"
                    analyticsProperties={{
                      cta_type: "contact",
                      page_name: "Staff Schedule Mobile App",
                      section: "hero"
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              {/* Desktop only: Image in right column */}
              <div className="hidden lg:block w-full relative">
                <Image
                  src="/images/us-images/stock/istockphoto-1748387978-2048x2048.jpg"
                  alt="Free Staff Scheduling Mobile App"
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
                  Publish your schedule to your staff mobile app
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Team members can see their published schedules on the RosterLab
                  app, allowing them to stay updated with their work schedules.
                  They are also able to communicate their preferred shift
                  patterns.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiClock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        AI-Powered Preferences
                      </h3>
                      <p className="text-gray-600">
                        Staff preferences and leave requests submitted through
                        the app are automatically considered by our AI when
                        generating optimal schedules
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiTrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Shift Swaps and Open Shifts
                      </h3>
                      <p className="text-gray-600">
                        Handle change requests through the app without
                        back-and-forth communication with managers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiUsers className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Real-Time Updates
                      </h3>
                      <p className="text-gray-600">
                        Instant push notifications for schedule changes,
                        ensuring your team always has the latest schedule
                        information
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[600px]">
                <Image
                  src="/images/illustration/Push notifications-pana-2 copy.svg"
                  alt="Publish schedule to mobile app"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Key Features Section */}
        <div className="bg-white py-20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything your staff needs, anywhere they are
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Empower your team with instant access to schedules, easy shift
                management, and seamless communication through our mobile app.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {appFeatures.map((feature, index) => (
                <Link key={index} href={feature.href} className="block">
                  <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border border-gray-100 hover:border-blue-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <span className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">
                          Learn more
                          <svg
                            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </div>

        {/* Advanced AI Capabilities Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image - order-2 on mobile, order-1 on desktop */}
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/us-images/happy-staff.jpg"
                  alt="Happy Staff"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              {/* Content - order-1 on mobile, order-2 on desktop */}
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Increased Staff Satisfaction
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Empower your team to communicate their availability and
                  preferences directly through the app, making schedule planning
                  more collaborative and efficient.
                  <br></br>
                  <br></br>Easily sync your work schedule with Google Calendar,
                  Outlook, Apple Calendar, and more. Share it with your partner
                  and friends to make planning life events simpler.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Send shift swap requests
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Syncs to your personal calendar
                    </span>
                  </div>
                  <div className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      Submit your preferences and leave request
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Compliance Section */}
        <div className="bg-white py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Seamless communication and notifications
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Push notifications keep staff updated in real-time as
                  schedules are published, shifts become available and leave
                  requests are approved.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No more back and forth communication
                      </h3>
                      <p className="text-gray-600">
                        Gain insights on popular leave days and plan your
                        requests smartly. Handle all shift requests and
                        responses seamlessly in one place
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiAcademicCap className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No more email spam
                      </h3>
                      <p className="text-gray-600">
                        Getting notified only for what matters to each team
                        member
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <HiCog className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Stay connected with life
                      </h3>
                      <p className="text-gray-600">
                        Share your work schedules with family and friends for
                        better work-life balance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Communication Features
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">Push notifications</span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">Shift swap requests</span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">Request management</span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">
                        First in first serve open shifts
                      </span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-700">Calendar Sync</span>
                      <HiCheck className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Everything you need to know about the RosterLab mobile app
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to empower your workforce?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                Give your staff the tools they need to manage their schedules
                effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/us/book-a-demo"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Solution Page Staff Schedule Mobile App"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Staff Schedule Mobile App",
                    section: "final_cta"
                  }}
                >
                  Book a Demo
                </Button>
                <Button
                  href="/us/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                  analyticsLabel="Contact Sales"
                  analyticsLocation="Solution Page Staff Schedule Mobile App"
                  analyticsProperties={{
                    cta_type: "contact",
                    page_name: "Staff Schedule Mobile App",
                    section: "final_cta"
                  }}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </>
    </SiteLayout>
  );
}
