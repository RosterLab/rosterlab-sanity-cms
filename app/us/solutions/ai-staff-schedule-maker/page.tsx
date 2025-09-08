import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import RosterLoadingBar from "@/components/ui/RosterLoadingBar";
import {
  HiCheck,
  HiClock,
  HiTrendingUp,
  HiUsers,
  HiCog,
  HiAcademicCap,
  HiShieldCheck,
  HiSwitchHorizontal,
} from "react-icons/hi";

export const metadata = {
  title: "AI Staff Schedule Generator for Scheduling Complex Shifts",
  description:
    "Generate fair, optimised shift schedules with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
  alternates: {
    canonical: 'https://rosterlab.com/us/solutions/ai-staff-schedule-maker',
  },
  openGraph: {
    title: "AI Staff Schedule Generator for Scheduling Complex Shifts",
    description:
      "Generate fair, optimised shift schedules with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
    type: "website",
    url: 'https://rosterlab.com/us/solutions/ai-staff-schedule-maker',
    images: [
      {
        url: "/images/og images/SolutionAIGen.png",
        width: 1200,
        height: 630,
        alt: "AI Staff Schedule Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Staff Schedule Generator for Scheduling Complex Shifts",
    description:
      "Generate fair, optimised shift schedules with AI. RosterLab schedules complex patterns, balances workloads, and reduces admin by 95%.",
    images: ["/images/og images/SolutionAIGen.png"],
  },
};

const faqItems = [
  {
    question: "How does AI-powered scheduling actually work?",
    answer:
      "Our AI algorithms take union rules, staff preferences, skill requirements, and compliance rules into account to generate optimal schedules. <a href=\"https://rosterlab.com/blog/should-your-next-staff-schedule-be-built-with-ai\" className=\"text-blue-600 hover:text-blue-700 underline\">Read more about how AI works</a>.",
  },
  {
    question: "How long does it take to implement RosterLab's AI scheduling?",
    answer:
      "Implementation typically takes 2-4 weeks depending on your organisation's size and complexity. This includes data migration, system configuration, app handover and training, and initial AI model calibration to achieve your specific requirements.",
  },
  {
    question: "Can the AI handle complex compliance and union rules?",
    answer:
      "Yes, our AI is designed to understand and enforce complex regulatory requirements, union agreements, and organisational policies. You can configure custom rules in-app and the system will ensure all generated schedules are fully compliant.",
  },
  {
    question:
      "What happens if we need to make manual adjustments to AI-generated schedules?",
    answer:
      "You maintain full control over the scheduling process. Managers can easily review and modify AI-generated schedules before publishing.",
  },
  {
    question: "How much time and cost savings can we expect?",
    answer:
      "Most organisations see a 70–90% reduction in time spent on scheduling, along with up to a 10% improvement in scheduling efficiency, such as reduced overtime costs and improved staff retention through better optimisation. Actual savings depend on your current processes and organisation size.",
  },
  {
    question:
      "Why is it important to keep all your data and knowledge digitally?",
    answer:
      "One of the most valuable assets within a team is the knowledge housed within each individual's mind. Rather than dedicating extensive time to training, handovers, and the extraction of information from people's minds, consider structuring all your scheduling rules and staffing requirements digitally. This approach not only minimises human error but also saves time spent recalling minor details and enhances the efficiency of communications.",
  },
];

export default function AISchedulesPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="bg-white pt-16 pb-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pb-8 lg:pb-12">
              <h1 className="text-[40px] sm:text-5xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Make Scheduling Faster Than Ever Before
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Unlock the full power of AI schedule creation to save time and
                optimise staff allocation
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Reduce scheduling from days to minutes
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Comply with union rules and requirements
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Easily identify your staffing needs for each day
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Keep all your scheduling data and knowledge in one place
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  href="/us/book-a-demo"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Solution Page AI Staff Scheduling"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "AI Staff Scheduling",
                    section: "hero"
                  }}
                >
                  Book a Demo
                </Button>
                <Button
                  href="/us/staff-scheduling-interactive-demo"
                  className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                  analyticsLabel="See an Example"
                  analyticsLocation="Solution Page AI Staff Scheduling"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "AI Staff Scheduling",
                    section: "hero"
                  }}
                >
                  See an Example
                </Button>
              </div>

              {/* Feature ticks below CTA */}
              <div className="mt-6">
                <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-6 text-sm text-gray-600">
                  <span className="font-medium flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Automatic schedule generation
                  </span>
                  <span className="font-medium flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Staff mobile app
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/illustration/Version control-pana.svg"
                alt="AI Scheduling Illustration"
                width={600}
                height={400}
                className="w-full max-w-[600px] h-auto"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* AI Benefits Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Intelligent Scheduling
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI algorithms analyse thousands of variables to create
                optimal schedules that balance staff preferences, operational
                requirements, and compliance needs. Experience the future of
                workforce management.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      90% Admin Time Reduction
                    </h3>
                    <p className="text-gray-600">
                      Generate complex schedules in minutes instead of days with
                      our advanced AI algorithms
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Optimised Staffing Coverage
                    </h3>
                    <p className="text-gray-600">
                      Mathematical optimisation ensures the most efficient staff
                      allocation and resource utilisation
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Increased Staff Satisfaction
                    </h3>
                    <p className="text-gray-600">
                      Fair and balanced schedules improve work-life balance and
                      increase staff retention
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[600px] mx-auto order-2 lg:order-2">
              <RosterLoadingBar />
            </div>
          </div>
        </Container>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything Your Team Needs, Powered by AI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empower your staff with AI-generated schedules that are accessible
              anywhere, enable smart shift management, and seamlessly integrate
              with your mobile app.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      AI-Optimised Schedules
                    </h3>
                    <p className="text-gray-600">
                      Assigns the right staff with the right skills to each
                      shift, balancing preferences, availability, and compliance
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/us/feature/shift-swaps-and-trades" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiSwitchHorizontal className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Smart Shift Swaps
                    </h3>
                    <p className="text-gray-600">
                      Enable staff to easily swap shifts with AI ensuring
                      coverage and compliance requirements are maintained
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Automated Compliance
                    </h3>
                    <p className="text-gray-600">
                      AI ensures every schedule meets regulatory requirements
                      and union rules without manual checking
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Dynamic Re-Schedule
                    </h3>
                    <p className="text-gray-600">
                      Adapt to changes with ease, ensuring your department
                      remains fully operational and responsive to any unexpected
                      shifts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Advanced Features Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/generating.webp"
                alt="Advanced AI features in action"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Advanced AI Capabilities
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our award-winning algorithms handle the most complex scheduling
                challenges with ease, ensuring compliance and optimisation
                across all scenarios.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    24/7 Automatic schedule generation
                  </span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Complex constraint handling
                  </span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Real-time optimisation and adjustments
                  </span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Legal compliance checking
                  </span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Scenario simulation and planning
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
                Built-In Compliance
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stay compliant with complex healthcare regulations and union
                agreements automatically. Our AI understands and enforces all
                relevant rules and constraints.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Regulatory Compliance
                    </h3>
                    <p className="text-gray-600">
                      Automatic adherence to healthcare regulations and industry
                      standards
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Handles Skills Mix
                    </h3>
                    <p className="text-gray-600">
                      Ensures qualified staff are schedules for appropriate roles
                      and responsibilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiCog className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Custom Rules Engine
                    </h3>
                    <p className="text-gray-600">
                      Our natural language engine helps you convert
                      organisation-specific rules and policies into app
                      functionality to ensure perfect compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Compliance Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Fatigue Management</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Union Agreement Rules</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Minimum Rest Periods</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Maximum Work Hours</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700">Fair Distributions</span>
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
              Everything you need to know about AI-powered scheduling
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
              Ready to Unlock the Power of AI?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join hundreds of healthcare organisations already using AI to
              transform their workforce management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/us/book-a-demo"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                analyticsLabel="Book a Demo"
                analyticsLocation="Solution Page AI Staff Scheduling"
                analyticsProperties={{
                  cta_type: "demo",
                  page_name: "AI Staff Scheduling",
                  section: "final_cta"
                }}
              >
                Book a Demo
              </Button>
              <Button
                href="/us/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
                analyticsLabel="Contact Us"
                analyticsLocation="Solution Page AI Staff Scheduling"
                analyticsProperties={{
                  cta_type: "contact",
                  page_name: "AI Staff Scheduling",
                  section: "final_cta"
                }}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
