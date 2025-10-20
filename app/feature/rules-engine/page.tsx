import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import RuleBuilder from "@/components/ui/RuleBuilder";

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
      "Rostering rules are constraints and requirements that shape how your roster is constructed. They include hard rules (must be followed) and soft rules (preferred but flexible), covering everything from union requirements and staffing levels to fairness distribution and regular work patterns.",
  },
  {
    question: "How do rules help form your staff roster?",
    answer:
      "Rules guide the AI roster generator to create compliant, fair, and efficient schedules. Hard rules eliminate roster solutions that violate essential requirements, while soft rules help the system identify and prioritise the best possible roster options among all valid solutions.",
  },
  {
    question: "How does the AI and rules work together?",
    answer:
      "The roster generator evaluates every possible roster solution. Hard rules immediately eliminate non-compliant options, while soft rules are weighted by points to help the system determine which valid solutions are better than others. The AI considers all options and selects the optimal roster that satisfies hard rules while maximizing soft rule preferences.",
  },
  {
    question: "What union requirements do the rules support?",
    answer:
      "RosterLab supports a comprehensive range of union requirements including minimum hours between shifts (e.g., 8-hour breaks for nurses), maximum consecutive shifts, mandatory rest periods after night shifts, guaranteed minimum hours per roster period, and specific shift pattern requirements defined in collective agreements.",
  },
  {
    question: "What type of rules can I create?",
    answer:
      "You can create rules for hours worked (per week or roster period), days on/off, specific shift types (night, call, etc.), time between shifts, maximum shifts in a row, fairness distribution (weekends, night shifts), individual employee constraints, and staffing level requirements. Rules can apply organisation-wide or to specific individuals.",
  },
  {
    question: "How are different rules weighted?",
    answer:
      "Rules are categorized as hard (must be satisfied) or soft (preferred). Soft rules are weighted by points - the higher the points, the more important the rule. For staffing demands, you can set priority levels (normal, high, critical). For preferences, you can set weights (normal, high, critical) to indicate how strongly the rule should influence the final roster.",
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
                  Compliant Driven{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Rostering Rules
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Define how rosters should be constructed with guaranteed and
                  flexible rules that meet union and contractual requirements.
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
                  src="/images/illustration/rules-compliance.svg"
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
                  Create unbreakable rules that meet union and contract
                  requirements
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Set guaranteed "must have" rules that ensure every roster is
                  compliant with union agreements and labour laws. These hard
                  rules are never broken, protecting your organisation from
                  compliance violations and fines.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Minimum hours between shifts (e.g., 8 hours for nurses)
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
                      Guaranteed minimum hours per roster period
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

        {/* Soft Rules Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/new-product-images/ png/auto-scheduling/2-built-in-compliance.png"
                  alt="Flexible preferences"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Add flexible rules based on priorities
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create soft rules that express "nice to have" rules rather
                  than absolute requirements. The AI will prioritise these soft
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
            </div>
          </Container>
        </div>

        {/* Fairness Rules Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Ensure fairness through automated distribution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create fairness rules that automatically distribute
                  undesirable shifts equitably across your team. Reduce
                  conflicts and improve morale by ensuring transparent, balanced
                  scheduling.
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
                      Equitable public holiday coverage
                    </span>
                  </li>
                </ul>
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
                  accommodating unique circumstances, part-time arrangements,
                  training requirements, or special accommodations.
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
                    <span className="text-gray-700">FTE limitations</span>
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
                Build Better Rosters with Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance guaranteed</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Fairer rosters</p>
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
