import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const pathname = "/feature/ai-roster-assistant";

export const metadata = withHreflang(
  {
    title: "AI Chat Assistant for Rostering - RosterLab",
    description:
      "Get instant rostering help with AI-powered chat assistant. Answer questions, get recommendations, and solve scheduling conflicts in real-time.",
    openGraph: {
      title: "AI Chat Assistant for Rostering - RosterLab",
      description:
        "Get instant rostering help with AI-powered chat assistant. Answer questions, get recommendations, and solve scheduling conflicts in real-time.",
      images: [
        {
          url: "/images/og-images/AutoRosterGeneration.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Chat Assistant for Rostering - RosterLab",
      description:
        "Get instant rostering help with AI-powered chat assistant. Answer questions, get recommendations, and solve scheduling conflicts in real-time.",
      images: ["/images/og-images/AutoRosterGeneration.png"],
    },
  },
  pathname,
);

const faqItems = [
  {
    question: "What can the AI Chat Assistant help me with?",
    answer:
      "The AI Chat Assistant can help you understand roster conflicts, get suggestions for shift coverage, answer questions about compliance rules, recommend optimal staffing patterns, and provide instant guidance on complex rostering scenarios.",
  },
  {
    question: "Does the AI Chat Assistant have access to my roster data?",
    answer:
      "Yes, the AI Assistant can access your roster context to provide relevant, personalized recommendations. It understands your team's skills, availability, and scheduling constraints to give you accurate guidance.",
  },
  {
    question: "Can the AI Chat Assistant make changes to my roster?",
    answer:
      "The AI Assistant provides recommendations and guidance, but you maintain full control. It will suggest changes and explain the reasoning, but you always approve any modifications to your schedule.",
  },
];

export default function AIRosterAssistantPage() {
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
                    AI Chat Assistant
                  </span>{" "}
                  <br className="hidden md:block" />
                  for Rostering
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get instant answers and intelligent recommendations for your
                  rostering challenges. Ask questions in plain English and
                  receive contextual guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Book A Demo"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "AI Chat Assistant",
                      section: "hero",
                    }}
                  >
                    Book A Demo
                  </Button>
                  <Button
                    href="/pricing"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="View Pricing"
                    analyticsLocation="Feature Page AI Chat Assistant"
                    analyticsProperties={{
                      cta_type: "pricing",
                      page_name: "AI Chat Assistant",
                      section: "hero",
                    }}
                  >
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/test5.svg"
                  alt="AI chat assistant illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Instant Rostering Guidance */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Instant Rostering Guidance
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ask questions in plain English and get immediate answers about
                  your roster. The AI understands your team's context,
                  constraints, and preferences to provide relevant guidance.
                  <br />
                  <br />
                  No need to dig through documentation or remember complex
                  rules—just ask and get instant help.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Get answers to rostering questions in seconds
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Understand why conflicts occur and how to resolve them
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Learn best practices for complex scheduling scenarios
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <Image
                  src="/images/illustration/Push notifications-pana-2 copy.svg"
                  alt="Instant rostering guidance"
                  width={550}
                  height={450}
                  className="rounded-lg w-full h-auto max-w-[550px] mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Smart Recommendations */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/generating.webp"
                  alt="Smart recommendations"
                  width={550}
                  height={450}
                  className="rounded-lg shadow-lg w-full h-auto max-w-[550px] mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Smart Recommendations
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Receive intelligent suggestions for shift coverage, staff
                  assignments, and schedule optimization based on your team's
                  unique needs.
                  <br />
                  <br />
                  The AI analyzes your roster patterns, compliance requirements,
                  and staff preferences to suggest the best solutions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Get suggestions for optimal shift assignments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Identify coverage gaps before they become problems
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Discover opportunities to improve roster efficiency
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Compliance & Rule Explanations */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Compliance & Rule Explanations
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Understand complex compliance requirements and organizational
                  rules without reading lengthy documentation. The AI explains
                  why certain rules exist and how they impact your schedule.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Get clear explanations of compliance violations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Learn how to maintain compliance while meeting operational
                      needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Understand union agreements and labor law requirements
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button
                    href="/feature/rules-engine"
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 font-semibold"
                  >
                    Learn about the Rules Engine
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="/images/illustration/auto-roster.svg"
                  alt="Compliance explanations"
                  width={550}
                  height={450}
                  className="w-full h-auto max-w-[550px] mx-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Common questions about the AI Chat Assistant
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-teal-600 to-cyan-500">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">
                Ready to experience smarter rostering?
              </h2>
              <p className="text-xl mb-12 opacity-90">
                See how AI-powered assistance can transform your scheduling
                workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Book a Demo"
                  analyticsLocation="Feature Page AI Chat Assistant"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "AI Chat Assistant",
                    section: "final_cta",
                  }}
                >
                  Book a Demo
                </Button>
                <Button
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Contact Sales"
                  analyticsLocation="Feature Page AI Chat Assistant"
                  analyticsProperties={{
                    cta_type: "contact",
                    page_name: "AI Chat Assistant",
                    section: "final_cta",
                  }}
                >
                  Contact Sales
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
          { name: "AI Chat Assistant" },
        ]}
      />
    </SiteLayout>
  );
}
