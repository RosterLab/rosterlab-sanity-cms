import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import OttoChatWidget from "@/components/sections/animations/OttoChatWidget";
import OttoStaticChat from "@/components/sections/animations/OttoStaticChat";
import OttoStaticChatFeature1 from "@/components/sections/animations/OttoStaticChatFeature1";

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
      "The AI Chat Assistant can help you understand your roster, answering questions about your roster instantly. The AI understands your team's context, constraints, and preferences to provide relevant information.",
  },
  {
    question: "Does the AI Chat Assistant have access to my roster data?",
    answer:
      "Yes, the AI Assistant can access your roster context to provide relevant, personalised insights. It understands your team's skills, availability, and scheduling constraints to give you accurate information.",
  },
  {
    question: "Can the AI Chat Assistant make changes to my roster?",
    answer:
      "The AI Assistant provides you with instant insights and knowledge, but you maintain full control.",
  },
];

export default function AIRosterAssistantPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    AI Chat Assistant
                  </span>{" "}
                  <br className="hidden md:block" />
                  for Rostering
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Ask Otto for instant roster insights so you can make smarter
                  decisions, faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/book-a-demo"
                    className="bg-[#1c82fd] text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
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
                    className="bg-white text-[#1c82fd] border-2 border-[#1c82fd] hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
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
                {/* Arrow annotation - moved below buttons */}
                <div className="hidden lg:flex mt-8 justify-end">
                  <div className="relative flex items-center gap-3">
                    {/* Text label */}
                    <p className="text-[#1c82fd] font-semibold text-base">
                      Meet Otto! Your AI rostering buddy.
                    </p>
                    {/* Scribble arrow SVG pointing right */}
                    <svg
                      width="80"
                      height="40"
                      viewBox="0 0 80 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0"
                    >
                      <path
                        d="M5 20C15 15 35 10 55 15C65 18 70 20 75 18M75 18L68 14M75 18L70 25"
                        stroke="#1c82fd"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Chat Widget Animation */}
                <OttoChatWidget />
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
                  Ask. Learn. Schedule smarter.
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ask questions in plain English and get immediate answers about
                  your roster. The AI understands your team's context,
                  constraints, and preferences to provide relevant information.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Save time by getting instant answers to your rostering
                      questions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Pull roster insights instantly so you can focus on
                      building the perfect roster
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Make informed decisions to ensure shifts are fair,
                      compliant and safe
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <OttoStaticChatFeature1 />
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
                  src="/images/us-images/iStock-1457092492.jpg"
                  alt="Streamlined roster knowledge management"
                  width={550}
                  height={450}
                  className="w-full max-w-[550px] mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Streamlined Knowledge, No More Guesswork
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Otto is your single source of truth for all roster knowledge.
                  Make roster handovers and transitions easier between
                  administrators. Admins on your team can ask questions to
                  understand the schedule, eliminating confusion.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Streamline your knowledge in the cloud, then easily query
                      it
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Learn your roster without reading lengthy handover notes
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
                  Better Insights, Better Rosters
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get instant insights that help you build fairer, more
                  compliant rosters. Otto analyzes your rostering data and
                  provides the insights you need to improve fairness, ensure
                  compliance, and optimize staff well-being across your team.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Get clear explanations about your roster
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Use insights to improve roster fairness, compliance and
                      wellbeing
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
                <OttoStaticChat />
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
        <div className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
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
                  className="bg-white text-[#1c82fd] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
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
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1c82fd] px-8 py-4 text-lg font-semibold"
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
