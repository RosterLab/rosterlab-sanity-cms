import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiCog, HiLightningBolt, HiShieldCheck, HiUsers, HiCalendar } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata = {
  title: 'AI Auto Roster Generation - RosterLab',
  description: 'Generate fully optimized rosters in minutes with AI that balances staffing levels, skills, preferences, and compliance effortlessly.',
}

const faqItems = [
  {
    question: "How fast is the auto-generation process?",
    answer: "RosterLab can generate a complete month's roster for 100+ staff in under 2 minutes. The speed depends on complexity - simple rosters take seconds, while those with many constraints may take a few minutes. The AI processes millions of possible combinations to find the optimal solution quickly."
  },
  {
    question: "What factors does the AI consider when generating rosters?",
    answer: "The AI considers: staffing requirements by shift and location, employee skills and certifications, staff preferences and availability, fairness metrics (equal distribution of weekends, nights, etc.), labor laws and compliance rules, budget constraints and overtime limits, and historical patterns. It balances all these factors simultaneously to create optimal schedules."
  },
  {
    question: "Can I modify the auto-generated roster?",
    answer: "Absolutely! The auto-generated roster is a starting point that you can refine. You can make manual adjustments, and the system will highlight any rule violations your changes might cause. You can also regenerate specific parts of the roster while keeping other sections locked, giving you full control over the final schedule."
  },
  {
    question: "How does it ensure fairness across the team?",
    answer: "The AI tracks fairness metrics like weekend distribution, night shift allocation, and preference satisfaction across all staff. It uses advanced algorithms to ensure equitable distribution over time, not just within a single roster period. The system also provides transparency reports showing how shifts were distributed and why certain decisions were made."
  },
  {
    question: "What happens if no perfect solution exists?",
    answer: "When constraints conflict (e.g., everyone wants the same day off), the AI finds the best possible compromise. It shows you exactly which constraints couldn't be fully satisfied and why, suggests alternative solutions, and can even recommend policy adjustments that would make scheduling easier in the future. You always see the trade-offs clearly."
  }
]

export default function AutoRosterGenerationPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Generate perfect rosters automatically
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Let AI create optimal schedules in minutes while ensuring fairness, compliance, and staff satisfaction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/auto-roster.svg"
                  alt="Auto roster generation illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: AI-Powered Optimization */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  AI-Powered Optimization Engine
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced algorithms consider thousands of variables including staff preferences, skills, availability, compliance rules, and fairness metrics to create optimal schedules automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Considers 50+ variables simultaneously</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Balances preferences with operational needs</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Learns from historical patterns and feedback</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">AI Optimization Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Compliance & Fairness */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Compliance Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Built-in Compliance & Fairness
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Automatically enforce all regulatory requirements, union agreements, and internal policies while ensuring fair distribution of shifts, overtime, and weekend work across your team.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic compliance with all regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fair distribution of desirable and undesirable shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Respects minimum rest periods and maximum hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Customizable Parameters */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Customizable Generation Parameters
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Fine-tune the generation process to match your organization's priorities. Adjust the balance between cost optimization, staff satisfaction, coverage requirements, and other key metrics.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Adjustable optimization weights and priorities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom rules and constraints configuration</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple generation scenarios for comparison</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Parameter Configuration</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Quality Metrics & Analytics */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Quality Analytics Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Quality Metrics & Analytics
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get detailed insights into roster quality with comprehensive metrics on fairness, efficiency, compliance, and staff satisfaction. Track improvements over time and identify optimization opportunities.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive quality scoring and metrics</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Historical trend analysis and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Predictive analytics for future optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Automated Roster Generation Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Time savings vs manual scheduling</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">98%</p>
                  <p className="text-xl opacity-90">Average fairness score</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">2 min</p>
                  <p className="text-xl opacity-90">Average generation time</p>
                </div>
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
                Ready to Automate Your Roster Generation?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform hours of manual scheduling into minutes of automated optimization with AI-powered roster generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}