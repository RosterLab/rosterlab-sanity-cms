import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AIOptimizationModule from '@/components/feature/AIOptimizationModule'

export const metadata = {
  title: 'AI Auto Roster Generation - RosterLab',
  description: 'Generate fully optimized rosters in minutes with AI that balances staffing levels, skills, preferences, and compliance effortlessly.',
}

const faqItems = [
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
    answer: "The AI tracks fairness metrics like weekend distribution, night shift allocation, and preference satisfaction across all staff. It uses advanced algorithms to ensure equitable distribution over time, not just within a single roster period."
  },
  {
    question: "What happens if no perfect solution exists?",
    answer: "When constraints conflict (e.g., everyone wants the same day off), the AI finds the best possible compromise. It shows you exactly which constraints couldn't be fully satisfied and why, suggests alternative solutions. You always see the trade-offs clearly."
  }
]

export default function AutoRosterGenerationPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Generate perfect rosters <br className="hidden md:block" />automatically
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Let AI create optimal schedules in minutes while ensuring fairness, compliance, and staff satisfaction.
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
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Considers 50+ variables simultaneously</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Balances preferences with operational needs</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Learns from historical patterns and feedback</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <AIOptimizationModule />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Compliance & Fairness */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Computer troubleshooting-pana-2.svg"
                  alt="Built-in Compliance & Fairness"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
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
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic compliance with all regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fair distribution of desirable and undesirable shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
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
                  Optimise staffing coverage
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Fine-tune the generation process to match your organization's priorities. Adjust the balance between cost optimization, staff satisfaction, coverage requirements, and other key metrics.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Adjustable optimization weights and priorities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom rules and constraints configuration</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple generation scenarios for comparison</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/team checklist-pana.svg"
                  alt="Optimise staffing coverage"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Reduce scheduling from days to minutes */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/time flies-pana.svg"
                  alt="Reduce scheduling from days to minutes"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Reduce scheduling from days to minutes
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Transform your scheduling process with AI that generates complete rosters in minutes instead of days. Eliminate manual scheduling bottlenecks and free up your team to focus on strategic workforce management.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Generate complete rosters in under 5 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant re-optimization when changes occur</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Save 20+ hours per roster period</span>
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
                Automated Roster Generation Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Time savings vs manual scheduling</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">0</p>
                  <p className="text-xl opacity-90">Human errors</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliant</p>
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
                Ready to Automate Your Roster Generation?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform hours of manual scheduling into minutes of automated optimization with AI-powered roster generation.
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
    </SiteLayout>
  )
}