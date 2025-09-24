import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import MobileAppPreferencesModuleStatic from "@/components/sections/animations/MobileAppPreferencesModuleStatic";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Flexible Self-Scheduling - RosterLab",
    description:
      "Flexible self-scheduling allows staff to request their preferred shifts, tasks & days off. Our AI schedule builder balances preferences with full coverage.",
    alternates: {
      canonical: "https://rosterlab.com/us/feature/self-scheduling",
    },
    openGraph: {
      title: "Flexible Self-Scheduling - RosterLab",
      description:
        "Flexible self-scheduling allows staff to request their preferred shifts, tasks & days off. Our AI schedule builder balances preferences with full coverage.",
      type: "website",
      url: "https://rosterlab.com/us/feature/self-scheduling",
      images: [
        {
          url: "/images/og images/SelfScheduling.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flexible Self-Scheduling - RosterLab",
      description:
        "Flexible self-scheduling allows staff to request their preferred shifts, tasks & days off. Our AI schedule builder balances preferences with full coverage.",
      images: ["/images/og images/SelfScheduling.png"],
    },
  },
  "/us/feature/self-scheduling",
);

const faqItems = [
  {
    question: "What is self scheduling?",
    answer:
      "Self scheduling is a system where staff members can indicate their preferred work shifts, days off, and task assignments in advance. Instead of managers creating schedules unilaterally, employees submit their availability and preferences through a digital platform. RosterLab's AI then optimizes these preferences to create schedules that meet both staff wishes and organizational needs, typically satisfying over 90% of preferences while ensuring proper coverage.",
  },
  {
    question: "What are the benefits of self scheduling?",
    answer:
      "Self scheduling offers numerous benefits for both organizations and staff. Organizations see reduced administrative time (up to 90% reduction), improved staff satisfaction and retention, better shift coverage, and enhanced work-life balance for employees. Staff members gain more control over their schedules, experience greater job satisfaction, have better ability to plan personal commitments, and feel more valued when their preferences are considered. The system also ensures fairness and transparency in shift distribution while maintaining compliance with labor laws and organizational policies.",
  },
  {
    question: "What type of preferences can staff enter?",
    answer:
      "Staff can enter a wide variety of preferences through RosterLab's self-scheduling system. These include: preferred shifts (morning, afternoon, night), specific days they want to work or have off, desired number of hours per week, preference for consecutive days or specific patterns, location preferences for multi-site organizations, task or role preferences, partner preferences (working with specific colleagues), and weekend availability. Staff can also set priority levels for different preferences, helping the AI understand which requests are most important to them.",
  },
];

export default function SelfSchedulingPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-[#4a9288] to-[#5aa399] bg-clip-text text-transparent">
                    Self-Scheduling
                  </span>{" "}
                  Powered By You
                </h1>

                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/iStock-1457092492.jpg"
                    alt="Self-scheduling illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>

                <p className="text-xl text-gray-600 mb-8">
                  Let staff request their preferred shifts, tasks and days off -
                  our AI optimises to meet 90%+ of preferences while ensuring
                  coverage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/us/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Book A Demo"
                    analyticsLocation="Feature Page Self Scheduling"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "Self Scheduling",
                      section: "hero",
                    }}
                  >
                    Book A Demo
                  </Button>
                  <Button
                    href="/us/product-tour"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="View Product Tour"
                    analyticsLocation="Feature Page Self Scheduling"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "Self Scheduling",
                      section: "hero",
                    }}
                  >
                    View Product Tour
                  </Button>
                </div>
              </div>
              {/* Desktop only: Image in right column */}
              <div className="hidden lg:block w-full relative">
                <Image
                  src="/images/us-images/iStock-1457092492.jpg"
                  alt="Self-scheduling illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Staff Preference Collection */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Easily Meet Your Staffing Needs
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Let your team indicate their shift preferences weeks in
                  advance. Our intuitive interface makes it easy for staff to
                  select preferred days, times, and locations while viewing
                  their existing commitments.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Visual calendar interface for easy selection
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Mobile-friendly for on-the-go submissions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Request specific shifts, groups of shifts, days off, or
                      tasks with priority weighting
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/1-meet-staffing-needs.png"
                  alt="Easily meet your staffing needs"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: AI-Optimised Compliant Schedules */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/2-compliance.png"
                  alt="AI-Optimised Compliant Schedules illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ensure High-Quality and Compliant Schedules
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  RosterLab AI handles complex constraints including contractual
                  hours, union agreements, and staff availability. Create
                  parameterised rules for each person to ensure fair shift
                  assignments and never worry about compliance again.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Enforces contractual hours and union agreements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Customisable rules for individual staff members
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Adapts to evolving compliance requirements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Self-Schedule The Way You Want To */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Simplify The Collection of Everyone's Preferred Schedule
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Every staff member can enter their preferred schedule through
                  web, iOS, or Android. The intuitive interface makes it fast to
                  submit preferences and set priorities. All submissions are
                  stored in the cloud and automatically synced with RosterLab AI
                  for schedule creation.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Access via web browser, iOS, or Android app
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Set priority levels for different preferences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Cloud storage with automatic AI synchronisation
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/3-preference-collection.png"
                  alt="Preference collection illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Manager Override Controls */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/4-self-schedule.png"
                  alt="Self-Schedule The Way You Want To illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Self-Schedule The Way You Want To
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Plan your ideal schedule by specifying preferred shifts, days
                  off, and weekend availability. Whether you want full control
                  or just the essentials, RosterLab AI creates fair, equitable
                  schedules that maximise everyone's preferences.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Choose your preferred shifts and days off
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Indicate weekend availability preferences
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      AI ensures fair and equitable distribution
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                The Results Speak for Themselves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">90%</p>
                  <p className="text-xl opacity-90">Reduction in admin time</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Empowered staff</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance</p>
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
                Ready to Empower Your Team?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Give your staff the flexibility they want while maintaining the
                coverage you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/us/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Book Your Demo"
                  analyticsLocation="Feature Page Self Scheduling"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Self Scheduling",
                    section: "final_cta",
                  }}
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/us/pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="View Pricing"
                  analyticsLocation="Feature Page Self Scheduling"
                  analyticsProperties={{
                    cta_type: "pricing",
                    page_name: "Self Scheduling",
                    section: "final_cta",
                  }}
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
          { name: "Self Scheduling" },
        ]}
      />
    </SiteLayout>
  );
}
