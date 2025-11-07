import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import { HiCheck } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import OttoChatWidget from "@/components/sections/animations/OttoChatWidget";
import OttoStaticChat from "@/components/sections/animations/OttoStaticChat";
import OttoStaticChatFeature1 from "@/components/sections/animations/OttoStaticChatFeature1";
import RoleTabsModule from "./RoleTabsModule";
import WaitlistForm from "./WaitlistForm";
import AgenticAICarousel from "./AgenticAICarousel";
import ShareButton from "./ShareButton";
import Image from "next/image";

const pathname = "/feature/ai-roster-assistant";

export const metadata = withHreflang(
  {
    title: "Personal AI Rostering Assistant - RosterLab",
    description:
      "Get instant rostering help with an AI-powered assistant. Answer questions, get recommendations, and solve scheduling scenarios.",
    openGraph: {
      title: "Personal AI Rostering Assistant - RosterLab",
      description:
        "Get instant rostering help with an AI-powered assistant. Answer questions, get recommendations, and solve scheduling scenarios.",
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
      title: "Personal AI Rostering Assistant - RosterLab",
      description:
        "Get instant rostering help with an AI-powered assistant. Answer questions, get recommendations, and solve scheduling scenarios.",
      images: ["/images/og-images/AutoRosterGeneration.png"],
    },
  },
  pathname,
);

const faqItems = [
  {
    question: "What can the AI Roster Assistant help me with?",
    answer:
      "Our AI Roster Assistant can help you understand your roster, answering questions about your roster instantly. The AI understands your team's context, constraints, and preferences to provide relevant information.",
  },
  {
    question: "Can the AI Roster Assistant make changes to my roster?",
    answer:
      "The AI Roster Assistant provides you with instant insights, tips and knowledge, but you maintain full control.",
  },
  {
    question: "What is Agentic AI for rostering?",
    answer:
      "Agentic AI will revolutionise how we approach workforce scheduling. The ability to have AI autonomously handle complex rostering tasks means more time for strategic planning and less time on administrative work.",
  },
  {
    question:
      "Is it possible to control Otto's access to information by user role?",
    answer:
      "Yes. Otto's access to information is restricted by existing user permissions, ensuring that each individual can only retrieve data they are authorised to view. Sensitive or administrative information remains fully protected and accessible solely to those with the appropriate access. Staff cannot use Otto to query content restricted to administrators.",
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
                    Your Personal AI
                  </span>{" "}
                  <br className="hidden md:block" />
                  Rostering Assistant
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Otto is your virtual rostering assistant here to help make
                  tasks and decisions easier. Ask Otto for insights and support
                  to build better rosters, for you and your team to succeed.
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
                      Meet Otto! Your new AI team member.
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
                  Ask. Learn. Roster Smarter.
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Rostering shouldn't feel like guesswork. Ask Otto anything you
                  need such as "Do I have enough people for next week?" Or
                  "Who's working too many nights?" The AI knows your roster and
                  people giving you personalised tips & insights.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Get instant answers to your rostering questions (no manual
                      searches)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Save time by learning from real roster data, not guesswork
                      or assumptions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Spot risks before they happen like fatigue, skill gaps, or
                      uneven shift loads
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Build safer, fairer, more balanced rosters that work for
                      everyone
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

        {/* Feature 2: Better Insights, Better Rosters */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Better Insights, Safer Teams
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Otto analyses your rostering data and provides the insights you
                need to make the right decisions for the health and well-being
                of your teams.
              </p>
            </div>

            {/* Tabular Module */}
            <div>
              <RoleTabsModule />
            </div>
          </Container>
        </div>

        {/* Feature 3: Streamlined Knowledge */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <svg
                    className="w-10 h-10 text-[#1c82fd] mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-4">
                    "Otto has completely transformed how we manage staff
                    scheduling. The AI{" "}
                    <span className="font-semibold">actually understands</span>{" "}
                    our unique clinic setup, shift patterns, and preferences,
                    making adjustments automatically and intelligently. Otto has
                    become an{" "}
                    <span className="font-semibold">essential member</span> of
                    our team."
                  </blockquote>
                  <div className="mb-4">
                    <p className="font-bold text-gray-900">Vivien Chan</p>
                    <p className="text-gray-600 text-sm">
                      Operations & Customer Relations Manager, Peticare Medical
                      Group
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/images/other logos/peticare.webp"
                      alt="Peticare Medical Group"
                      width={36}
                      height={12}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Streamlined Knowledge, No More Guesswork
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Otto is your single source of truth for all roster knowledge.
                  Make roster handovers and transitions easier between
                  administrators. Understand roster information and changes to
                  eliminate confusion.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Deal with roster changes in one place with AI assistance
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Learn your roster without reading lengthy handover notes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Customised specifically to your roster data
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Coming Soon: Agentic AI Section */}
        <div className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
          <Container>
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                COMING SOON
              </div>
              <h3 className="text-4xl font-bold mb-6 text-gray-900">
                The Future of Rostering is Here
              </h3>
              <p className="text-xl text-gray-600 mb-12">
                Otto will soon be able to take action on your behalf, making
                rostering effortless — always with your approval and oversight.
              </p>

              <AgenticAICarousel />

              <div className="mt-12">
                <p className="text-xl text-gray-600">
                  Powered by{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold">
                    Agentic AI
                  </span>
                </p>
              </div>

              {/* Waitlist Section */}
              <div className="mt-16 max-w-xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Join the Waitlist
                  </h3>
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/images/ottopus.png"
                      alt="Otto"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-600 mb-6">
                    Be among the first to experience the future of rostering
                  </p>
                  <WaitlistForm />

                  {/* Tell a Friend Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <ShareButton />
                  </div>
                </div>
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
                Common questions about the AI Rostering Assistant
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
                Ready to experience the future of rostering?
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
