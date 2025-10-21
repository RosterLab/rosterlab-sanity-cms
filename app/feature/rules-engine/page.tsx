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

const pathname = "/feature/rules-engine";

export const metadata = withHreflang(
  {
    title: "Rules and Compliance - RosterLab",
    description:
      "Ensure roster compliance with automated rules and regulations. Stay compliant with labour laws, union agreements, and company policies with intelligent roster management.",
    alternates: {
      canonical: "https://rosterlab.com/feature/rules-engine",
    },
    openGraph: {
      title: "Rules and Compliance - RosterLab",
      description:
        "Ensure roster compliance with automated rules and regulations. Stay compliant with labour laws, union agreements, and company policies with intelligent roster management.",
      type: "website",
      url: "https://rosterlab.com/feature/rules-engine",
      images: [
        {
          url: "/images/og-images/FeatureRulesCompliance.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rules and Compliance - RosterLab",
      description:
        "Ensure roster compliance with automated rules and regulations. Stay compliant with labour laws, union agreements, and company policies with intelligent roster management.",
      images: ["/images/og-images/FeatureRulesCompliance.png"],
    },
  },
  pathname,
);

const faqItems = [
  {
    question: "What are rostering rules?",
    answer:
      "Rostering rules are a mix of requirements and constraints that shape how your roster is constructed. They include hard rules (must be followed) and soft rules (preferred but flexible), as well as demands and preferences. This covers everything from union requirements and staffing levels to fairness distribution and regular work patterns.",
  },
  {
    question: "How do rules help form your staff roster?",
    answer:
      "Rules guide the AI roster generator to create compliant, fair, and efficient schedules. Hard rules eliminate roster solutions that violate essential requirements, while soft rules help the system identify and prioritise the best possible roster options among all possible solutions. Demands and preferences are considered too.",
  },
  {
    question: "How are different rules weighted?",
    answer:
      "Rules are categorised as hard (must be satisfied) or soft (preferred). For staffing demands, you can set priority levels (low, medium, high, critical). For preferences, you can set weights (normal, high, critical) to indicate how strongly the preference should influence the final roster.",
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
                    Rostering Rules
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Build your roster using a mix of fixed and flexible rules to
                  help manage fatigue, ensure fairness and meet all contractual
                  and union requirements.
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
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Create <UnbreakableText /> rules that guarantee safer rosters
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Set "must have" rules that are never broken, protecting your
                  organisation and your people.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Minimum hours off between shifts (e.g., 8 hours for
                      nurses)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Maximum consecutive shifts allowed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Mandatory days off after night shifts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Guaranteed hours per two weeks
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <RuleBuilder />
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
                  Ensure fairness through automated distribution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create fairness rules that automatically distribute shifts
                  equitably across your team. Reduce conflicts and improve
                  morale by ensuring transparent, balanced rostering.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Fair weekend shift distribution
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Balanced night shift allocation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Equitable on-call shift distribution
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Soft Rules Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Add flexible rules based on priorities
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create soft rules that express "nice to have" rules rather
                  than absolute requirements. The AI will consider these soft
                  rules when building rosters, balancing them against other
                  constraints to find the optimal solution.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Preferred consecutive days on (e.g., 4-5 days for 24/7
                      shift work)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Ideal staffing levels above minimum requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Preferred shift patterns for individual employees
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Weighted priorities to balance competing preferences
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/rules-builder/rules-compliance.webp"
                  alt="Flexible preferences"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Person-Specific Rules Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:col-start-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Apply staff-specific and skill-based rules and constraints
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create rules that apply to specific individuals or groups,
                  accommodating unique circumstances.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Individual availability constraints
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Pro-rated FTE based rules
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Training and development requirements
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Special accommodation needs
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Shift Patterns Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Add forbidden or allowed shift patterns
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
                      Implement fatigue-reducing schedules (e.g., night-shift
                      staff get two days off and then a morning shift)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/new-product-images/ png/self-scheduling/2-compliance.png"
                  alt="Shift patterns and fatigue management"
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
                Build Better Rosters with Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance guaranteed</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Fairest solution</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">Zero</p>
                  <p className="text-xl opacity-90">
                    Fines from rule violations
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
                Stay Compliant, Reduce Fines, Ensure Fairness
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join organisations that have eliminated compliance violations
                and built fairer rosters with RosterLab's intelligent rules
                engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/pricing"
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
          { name: "Home", url: "/" },
          { name: "Features", url: "/feature" },
          { name: "Rules and Compliance" },
        ]}
      />
    </SiteLayout>
  );
}
