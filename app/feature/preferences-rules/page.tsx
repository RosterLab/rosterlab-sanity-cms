import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SiteLayout from "@/components/layout/SiteLayout";
import Image from "next/image";
import { HiCheck, HiCog } from "react-icons/hi";
import FAQAccordion from "@/components/ui/FAQAccordion";

export const metadata = {
  title: "Shift Preferences & Fairness Rules - RosterLab",
  description:
    "Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Shift Preferences & Fairness Rules - RosterLab",
    description:
      "Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.",
    images: [
      {
        url: "/images/og images/FeaturePreferencesRules.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift Preferences & Fairness Rules - RosterLab",
    description:
      "Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.",
    images: ["/images/og images/FeaturePreferencesRules.png"],
  },
};

const faqItems = [
  {
    question: "How do staff set their shift preferences?",
    answer:
      "Staff can easily manage preferences through our mobile app. They can mark shifts they'd prefer to have off, and their other preference options are tailored to your organisation's setup. Staff can set recurring patterns (like 'no weekends'), add exceptions, and highlight which preferences matter most to them - with admins able to prioritise those preferences if needed.",
  },
  {
    question: "How does the system balance conflicting preferences?",
    answer:
      "Our AI uses multi-objective optimisation to find the best compromise. It considers preference weights, historical allocation, fairness metrics, and operational requirements. When perfect satisfaction isn't possible, it distributes compromises fairly across the team and tracks satisfaction scores to ensure long-term equity.",
  },
  {
    question: "Can I override preferences when necessary?",
    answer:
      "Yes, managers can override preferences for critical operational needs. However, the system tracks all overrides and their reasons, helping you minimise them over time. It also suggests alternatives that might meet operational needs while better respecting preferences, and notifies affected staff with explanations.",
  },
];

export default function PreferencesRulesPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 break-words">
                  Powerful preference collection and rule&nbsp;management
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Balance staff preferences with operational requirements
                  through intelligent constraint handling and flexible rule
                  configuration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/book-a-demo"
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button
                    href="/solutions/free-staff-scheduling"
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    Try it for free
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/team checklist-pana.svg"
                  alt="Team preferences and rules illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Flexible Preference Collection */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Easily Collect Staff Preferences
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Collect staff preferences through the staff mobile app. Then generate your roster with these preferences automatically considered.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      X
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      X
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      X
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/team checklist-pana.svg"
                  alt="Staff preferences collection"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Advanced Rule Engine */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Rocket research-pana.svg"
                  alt="Advanced rule engine illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Retain roster knowledge in the cloud
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Keep expertise accessible even when staff change, and ensure every roster meets compliance, fairness, and operational standards — automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Drop-down menu rule builder for easy configuration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Custom logic to capture organisation-specific needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      AI-powered engine to manage complex scenarios
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Intelligent Balancing */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Set hard rules that cannot be broken
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced algorithms balance individual preferences with team
                  fairness and operational requirements. The system learns from
                  feedback to improve satisfaction over time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Multi-objective optimisation algorithms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Fairness tracking and equitable distribution
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Continuous learning from staff feedback
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Business ethics-pana-2.svg"
                  alt="Intelligent preference balancing illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Rule Conflict Resolution */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Choose-pana.svg"
                  alt="Automatic rule conflict resolution illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Rule Conflict Resolution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When preferences and rules conflict, intelligent resolution
                  mechanisms find the best compromise. Priority systems and
                  escalation paths ensure critical requirements are never
                  violated.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Automatic conflict detection and alerts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Priority-based resolution algorithms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Manager escalation for complex situations
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
                Streamline preference and rules with ease
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">5%</p>
                  <p className="text-xl opacity-90">Efficiency Increase</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Happy staff</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">90%</p>
                  <p className="text-xl opacity-90">Reduction in admin time</p>
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
                Ready to Balance Preferences with Rules?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Create fair, compliant schedules that respect staff preferences
                while meeting all operational requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button
                  href="/pricing"
                  className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  );
}
