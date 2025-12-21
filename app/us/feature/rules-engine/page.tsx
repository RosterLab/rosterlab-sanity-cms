import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import RuleBuilder from "@/components/ui/RuleBuilder";
import UnbreakableText from "@/components/ui/UnbreakableText";

const pathname = "/us/feature/rules-engine";

export const metadata = withHreflang(
  {
    title: "Scheduling Rules Engine - RosterLab",
    description:
      "Create a mix of fixed and flexible scheduling rules to help manage fatigue, ensure fairness, and meet all contractual and union requirements.",
    alternates: {
      canonical: "https://rosterlab.com/us/feature/rules-engine",
    },
    openGraph: {
      title: "Scheduling Rules Engine - RosterLab",
      description:
        "Create a mix of fixed and flexible scheduling rules to help manage fatigue, ensure fairness, and meet all contractual and union requirements.",
      type: "website",
      url: "https://rosterlab.com/us/feature/rules-engine",
      images: [
        {
          url: "/images/og-images/Feature-Compliance-Rules.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Scheduling Rules Engine - RosterLab",
      description:
        "Create a mix of fixed and flexible scheduling rules to help manage fatigue, ensure fairness, and meet all contractual and union requirements.",
      images: ["/images/og-images/Feature-Compliance-Rules.png"],
    },
  },
  pathname,
);

const faqItems = [
  {
    question: "What are scheduling rules?",
    answer:
      "Scheduling rules are a mix of requirements and constraints that shape how your schedule is constructed. They include hard rules (must be followed) and soft rules (preferred but flexible), as well as staffing demands and preferences. This covers everything from union requirements and staffing levels to fairness distribution and standard work patterns.",
  },
  {
    question: "How do rules help build our staff schedule?",
    answer:
      "Rules guide the AI schedule builder to create compliant, fair, and efficient coverage. Hard rules remove schedule options that violate essential requirements, while soft rules help the system identify and prioritize the best possible options. Demands and preferences are considered too.",
  },
  {
    question: "How are different rules weighted?",
    answer:
      "Rules are categorized as hard (must be satisfied) or soft (preferred). For staffing demands, you can set priority levels (low, medium, high, critical). For preferences, you can set weights (normal, high, critical) to indicate how strongly the preference should influence the final schedule.",
  },
];

export default function RulesAndCompliancePage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Compliant & Fair{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Scheduling Rules
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Create a mix of fixed and flexible rules that set the
                  requirements and constraints for how your schedule is built.
                  This allows you to manage fatigue, ensure fairness, and meet
                  all contractual and union demands.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/us/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book a Demo
                  </Button>
                  <Button
                    href="/us/pricing"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/rules-compliance-roster.svg"
                  alt="Rules and compliance illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Hard Rules Section */}
        <div className="py-20 bg-gray-100">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Create Rules That Protect Your Organization And People
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Define hard rules that must never be broken and soft rules
                  that allow flexibility—together, they protect your teams and
                  help your organization run smoothly.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Ensure union rules and contracts are met
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Protect your staff's health and wellbeing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Increase operational efficiency
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <RuleBuilder allowedRuleTypes={["rules"]} />
              </div>
            </div>
          </Container>
        </div>

        {/* Fairness Rules Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/generating.webp"
                  alt="Automated fairness distribution"
                  width={600}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ensure Fairness Through Automatic Shift Distribution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create fairness rules that provide transparent, unbiased shift
                  allocation including equitable weekends, nights, and on-call
                  shifts.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Reduce conflicts and perceived favoritism
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Increase staff retention and engagement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Improve team satisfaction and reduce schedule disputes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Person-Specific Rules Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Personalize Rules That Scale Easily
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create staff-specific and skill-based rules that apply to
                  specific individuals or groups, accommodating unique
                  requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Respect individual availability constraints
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Ensure teaching, studying and personal development time is
                      respected
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Allow schedules to grow effortlessly with your team
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/skill-based-rules.webp"
                  alt="Staff-specific and skill-based rules"
                  width={600}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Shift Patterns Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/2-compliance.png"
                  alt="Shift patterns and fatigue management"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Manage Fatigue Through Shift Patterns
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Define specific shift sequences that must be avoided or
                  encouraged to maintain work-life balance and comply with
                  requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Build upcycling patterns for morning, evening and night
                      shifts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Improve circadian rhythm for better sleep, mood, and
                      productivity
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Implement fatigue-reducing scheduling rules
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Optimize Staffing Coverage Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Optimize Staffing Coverage
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ensure optimal coverage with rules that guarantee minimum and
                  maximum staff per shift to prevent overstaffing and
                  understaffing.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Prevent unsafe staffing levels for every shift
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Ensure appropriate skill and seniority mix for an optimal
                      workforce
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Automatically balance coverage needs with staff
                      preferences
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <RuleBuilder
                  allowedRuleTypes={["demands"]}
                  defaultRuleType="demands"
                  defaultSelectedRule="optimal_coverage"
                  showRuleTypeSelector={false}
                  showDemandAddButton={false}
                />
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

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Stay Compliant, Reduce Fines, Ensure Fairness
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join organizations that have eliminated compliance violations
                and built fairer schedules with RosterLab's intelligent rules
                engine.
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
        items={[{ name: "Home", url: "/us" }, { name: "Rules Engine" }]}
      />
    </SiteLayout>
  );
}
