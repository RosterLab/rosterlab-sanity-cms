import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Image from "next/image";
import { HiCheck, HiCalendar, HiClock } from "react-icons/hi";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Employee Time-Off Requests - RosterLab",
    description:
      "Give staff an easy and streamline way to submit time-off requests. Staff can submit different types of time-off requests via the staff mobile app.",
    alternates: {
      canonical: "https://rosterlab.com/us/feature/time-off-requests",
    },
    openGraph: {
      title: "Employee Time-Off Requests - RosterLab",
      description:
        "Give staff an easy and streamline way to submit time-off requests. Staff can submit different types of time-off requests via the staff mobile app.",
      images: [
        {
          url: "/images/og images/FeatureLeaveRequest.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Employee Time-Off Requests - RosterLab",
      description:
        "Give staff an easy and streamline way to submit time-off requests. Staff can submit different types of time-off requests via the staff mobile app.",
      images: ["/images/og images/FeatureLeaveRequest.png"],
    },
  },
  "/us/feature/time-off-requests",
);

export default function LeaveRequestsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Streamline Staff{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Time-Off
                  </span>{" "}
                  Requests
                </h1>

                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/iStock-2223989723.jpg"
                    alt="Time-off request management illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>

                <p className="text-xl text-gray-600 mb-8">
                  Staff can submit a range of time-off request types via the
                  staff mobile app to help streamline management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/us/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button
                    href="/us/product-tour"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    View Product Tour
                  </Button>
                </div>
              </div>
              {/* Desktop only: Image in right column */}
              <div className="hidden lg:block w-full relative">
                <Image
                  src="/images/us-images/iStock-2223989723.jpg"
                  alt="Time-off request management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Automatic Coverage Analysis */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Submit Time-Off Requests via the Staff Mobile App
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff can easily submit time-off requests directly from their
                  mobile, anytime and anywhere. They can also see colleagues'
                  time-off schedules, helping them plan around popular periods
                  and improve chances of time-off approval. This reduces
                  frustration from rejected requests and simplifies
                  administration.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Submit time-off requests on mobile with real-time
                      notifications and updates.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      See team time-off schedules to plan and improve approval
                      chances.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Receive manager approval or rejection with full context
                    </span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    href="/us/solutions/staff-scheduling-mobile-app"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 font-semibold"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/svg/time-off/submit-leave-requests.svg"
                  alt="Submit time-off requests via mobile app"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Intelligent Approval Workflows */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/svg/time-off/sync-changes.svg"
                  alt="Automatically sync changes to schedule"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatically Sync Changes to your Schedule
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Time-off requests seamlessly integrate with your schedule.
                  Managers can see the impact on staffing levels and make
                  informed approval decisions with all the context they need.
                  All information syncs back to the schedule and is considered
                  during the AI generation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Dedicated interface for administrators to review and
                      manage time-off requests
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Real-time coverage impact assessment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Automatic identification of replacement staff
                    </span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    href="/us/solutions/ai-staff-schedule-maker"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 font-semibold"
                  >
                    Learn About AI Scheduling
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Mobile-First Experience */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Decide How Different Types of Time-Off Requests are Handled
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Admin users have full control over how different types of
                  time-off requests are handled in your schedule. You can set
                  whether each time-off request type counts toward contractual
                  working hours or is excluded, and define exactly how many
                  hours should be counted within a schedule period. This
                  flexibility ensures schedules reflect your rules accurately
                  while keeping staffing plans clear and compliant.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Support for all types of time-off requests including
                      annual, sick, parental and custom categories
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Full control of how different time-off requests are
                      handled
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Automatically maintain compliance regardless of changes
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <Image
                  src="/images/new-product-images/svg/time-off/leave-requests.svg"
                  alt="Decide how different types of time-off are handled"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <FAQAccordion
                items={[
                  {
                    question: "What is a time off request?",
                    answer:
                      "A time off request is a formal application from an employee asking for approved absence from work. This can include vacation days, sick leave, personal time, parental leave, or other types of authorized absences. With RosterLab, staff submit these requests digitally through the mobile app, where they're automatically integrated into the scheduling system for seamless management and approval.",
                  },
                  {
                    question:
                      "Can staff check their time-off balances on mobile?",
                    answer:
                      "Yes! Staff can access their time-off balances, submit requests, and track approval status from any device. The mobile-optimized interface makes it easy to request time-off on-the-go, while managers can review and approve requests with full coverage context from their phones.",
                  },
                  {
                    question:
                      "What types of time-off requests can the system handle?",
                    answer:
                      "RosterLab supports all time-off request types including annual time-off, sick time-off, personal time-off, parental time-off, long service time-off, and custom time-off categories. Each type can have its own accrual rules, carry-over policies, and approval workflows configured to match your organization's policies.",
                  },
                ]}
              />
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Time-Off Request Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Happier Teams</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">
                    Streamlined time-off requests
                  </p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">24/7</p>
                  <p className="text-xl opacity-90">
                    Self-service availability
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Streamline Time-Off Requests?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform time-off requests from administrative burden to
                seamless self-service with intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/us/book-a-demo"
                  className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/us/pricing"
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/us" },
          { name: "Features", url: "/us/feature" },
          { name: "Time Off Requests" },
        ]}
      />
    </SiteLayout>
  );
}
