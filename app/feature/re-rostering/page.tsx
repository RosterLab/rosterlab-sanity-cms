import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const pathname = "/feature/re-rostering";

export const metadata = withHreflang(
  {
    title: "Re-Rostering - RosterLab",
    description:
      "Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds with minimal disruption to the roster.",
    openGraph: {
      title: "Fast Re-Rostering & Scenario Planning - RosterLab",
      description:
        "Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds to keep coverage and cost on track.",
      images: [
        {
          url: "/images/og-images/FeatureReRostering.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fast Re-Rostering & Scenario Planning - RosterLab",
      description:
        "Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds to keep coverage and cost on track.",
      images: ["/images/og-images/FeatureReRostering.png"],
    },
  },
  pathname,
);

export default function ReRosteringPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Re-Roster
                  </span>{" "}
                  New Changes Easily
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automatically adjust schedules when staff call in sick or
                  situations change, maintaining coverage and compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button
                    href="/pricing"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Events-pana.svg"
                  alt="Re-rostering events management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
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
                  Easily Adapt to Roster Changes
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
                      New rosters are generated quickly, ready to share
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Re-roster tasks only, or entire allocations, as needed
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/svg/reschedule/roster-changes.svg"
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
                  src="/images/generating.webp"
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
                  Automatically generate the most optimal re-rostering solution
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
                      Isolate only the specific part of the roster that's
                      impacted
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button
                    href="/solutions/ai-roster-generator"
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 font-semibold"
                  >
                    Learn about AI Rostering
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
                  All re-rostering solutions maintain full compliance with
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
                  src="/images/new-product-images/svg/reschedule/compliance-reservation.svg"
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
                  src="/images/new-product-images/svg/reschedule/notifications.svg"
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
                <div className="mt-8">
                  <Button
                    href="/solutions/staff-roster-mobile-app"
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 font-semibold"
                  >
                    View Mobile App
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
                  Learn more about how re-rostering and scenario planning work
                </p>
              </div>
              <FAQAccordion
                items={[
                  {
                    question: "What is re-rostering?",
                    answer:
                      "Re-rostering is the process of adjusting existing staff schedules in response to unexpected changes like sick leave, emergencies, or last-minute requests. It involves quickly reorganising shifts to maintain adequate coverage while minimising disruption to staff and ensuring compliance with workplace rules.",
                  },
                  {
                    question:
                      "How quickly can RosterLab generate re-rostering solutions?",
                    answer:
                      "RosterLab's AI can generate multiple re-rostering solutions quickly. The system analyses all available staff, their skills, availability, and compliance requirements to provide you with ranked options that minimise disruption while maintaining full coverage.",
                  },
                  {
                    question:
                      "Can I test different scenarios before implementing changes?",
                    answer:
                      "Yes! Our scenario planning feature allows you to test 'what-if' situations without affecting the live roster. You can run hypothetical roster scenarios to assess the feasibility of the changes you and your team need to make without impacting your live roster.",
                  },
                  {
                    question:
                      "Will staff be automatically notified of roster changes?",
                    answer:
                      "Yes, once you approve a re-rostering solution, all affected staff receive instant notifications via the app.",
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
                Re-Rostering Performance
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
                    Reduction in manual re-scheduling
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
                Ready for Intelligent Re-Rostering?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Handle unexpected changes seamlessly with AI-powered
                re-rostering that maintains coverage and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/pricing"
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
          { name: "Home", url: "/" },
          { name: "Features", url: "/feature" },
          { name: "Re-rostering" },
        ]}
      />
    </SiteLayout>
  );
}
