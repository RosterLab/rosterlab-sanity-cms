import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Staff Rescheduling - RosterLab",
    description:
      "Automatically re-schedule last-minute shift changes easily. See the impact on coverage, compliance, and staff so you can respond with confidence.",
    alternates: {
      canonical: "https://rosterlab.com/us/feature/staff-rescheduling",
    },
    openGraph: {
      title: "Fast Rescheduling & Scenario Planning - RosterLab",
      description:
        "Automatically re-schedule last-minute shift changes easily. See the impact on coverage, compliance, and staff so you can respond with confidence.",
      images: [
        {
          url: "/images/og images/FeatureReRostering.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fast Rescheduling & Scenario Planning - RosterLab",
      description:
        "Automatically re-schedule last-minute shift changes easily. See the impact on coverage, compliance, and staff so you can respond with confidence.",
      images: ["/images/og images/FeatureReRostering.png"],
    },
  },
  "/us/feature/staff-rescheduling",
);

export default function ReRosteringPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Reschedule
                  </span>{" "}
                  New Changes Easily
                </h1>

                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/stock/istockphoto-2157499482-2048x2048.jpg"
                    alt="Rescheduling events management illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>

                <p className="text-xl text-gray-600 mb-8">
                  Automatically adjust schedules when staff call in sick or
                  situations change, maintaining coverage and compliance.
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
                  src="/images/us-images/stock/istockphoto-2157499482-2048x2048.jpg"
                  alt="Rescheduling events management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Intelligent Impact Analysis */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Easily Adapt to Schedule Changes
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When new changes need to happen, RosterLab shows you the
                  impact on coverage, compliance, and staff so you can respond
                  with confidence.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Minimise disruption to keep shifts safe, fair, and
                      optimally staffed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      New schedules are generated quickly, ready to share
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Reschedule tasks only, or entire allocations, as needed
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/roster-changes.png"
                  alt="Intelligent Impact Analysis illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Automated Solution Generation */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/us-images/stock/istockphoto-2104287465-2048x2048.jpg"
                  alt="Automated Solution Generation illustration"
                  width={550}
                  height={450}
                  className="rounded-lg shadow-lg w-full h-auto max-w-[550px] mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automated Solution Generation
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Automatically generate the most optimal rescheduling solution
                  based on your new changes whilst still considering staff
                  availability, skills, preferences, and compliance
                  requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Optimal solution generated instantly
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Skills and availability matching for replacements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Isolate only the specific part of the schedule that's
                      impacted
                    </span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    href="/us/feature/auto-scheduling"
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 rounded-lg font-semibold inline-flex items-center"
                  >
                    Learn about Auto Scheduling
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Compliance Preservation */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Compliance Preservation
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  All rescheduling solutions maintain full compliance with
                  regulations, union agreements, and rules. The platform can
                  help ensure minimum rest periods, maximum hours, and skill
                  requirements are never violated.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Stay compliant with all union requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Fairness and clinical safety are never compromised
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Eliminate the risk of contractual breaches
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/compliance-preservation-rescheduling.png"
                  alt="Compliance Preservation illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Real-Time Notifications */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/notifications-rerostering-rescheduling.png"
                  alt="Real-Time Notifications & Updates illustration"
                  width={300}
                  height={300}
                  className="w-full h-auto max-w-xs mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Real-Time Notifications & Updates
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Instantly notify affected staff of schedule changes with
                  detailed information about their new assignments. Automated
                  communication ensures everyone stays informed and prepared.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Instant notifications to all affected staff
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Detailed change information and reasoning
                    </span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button
                    href="/us/solutions/staff-scheduling-mobile-app"
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 rounded-lg font-semibold inline-flex items-center"
                  >
                    Learn About Staff Scheduling Mobile App
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Learn more about how rescheduling and scenario planning work
                </p>
              </div>
              <FAQAccordion
                items={[
                  {
                    question: "What is staff rescheduling?",
                    answer:
                      "Staff rescheduling is the process of adjusting employee schedules after they've been published to accommodate unexpected changes like sick calls, emergencies, or changing business needs. It involves finding suitable replacements while maintaining proper coverage, compliance with labor laws, and fairness to all staff members. RosterLab automates this complex process, instantly generating optimal solutions that consider all constraints and requirements.",
                  },
                  {
                    question: "How is rescheduling better with AI?",
                    answer:
                      "AI transforms rescheduling from hours of manual work into minutes of automated optimization. Instead of manually checking each staff member's availability, skills, and compliance status, AI instantly analyzes all possibilities and generates the best solutions. It ensures fair distribution of changes, maintains compliance with all rules, and minimizes disruption to both staff and operations.",
                  },
                  {
                    question:
                      "How quickly can RosterLab generate rescheduling solutions?",
                    answer:
                      "RosterLab's AI can generate multiple rescheduling solutions quickly. The system analyzes all available staff, their skills, availability, and compliance requirements to provide you with ranked options that minimize disruption while maintaining full coverage.",
                  },
                  {
                    question:
                      "Can I test different scenarios before implementing changes?",
                    answer:
                      "Yes! Our scenario planning feature allows you to test 'what-if' situations without affecting the live schedule. You can run hypothetical schedule scenarios to assess the feasibility of the changes you and your team need to make without impacting your live schedule.",
                  },
                  {
                    question:
                      "Will staff be automatically notified of schedule changes?",
                    answer:
                      "Yes, once you approve a rescheduling solution, all affected staff receive instant notifications via the app.",
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
                Rescheduling Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance maintained</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Less Headaches</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">
                    Reduction in manual rescheduling
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
                Ready for Intelligent Rescheduling?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Handle unexpected changes seamlessly with AI-powered
                rescheduling that maintains coverage and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/us/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/us/pricing"
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
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
          { name: "Staff Rescheduling" },
        ]}
      />
    </SiteLayout>
  );
}
