import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiCog } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata = {
  title: 'Shift Preferences & Fairness Rules - RosterLab',
  description: 'Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.',
  openGraph: {
    title: 'Shift Preferences & Fairness Rules - RosterLab',
    description: 'Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.',
    images: [
      {
        url: '/images/og images/Feature - Preferences & Rules.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shift Preferences & Fairness Rules - RosterLab',
    description: 'Let staff set shift preferences and apply fairness rules automatically to boost satisfaction, compliance, and retention.',
    images: ['/images/og images/Feature - Preferences & Rules.png'],
  },
}

const faqItems = [
  {
    question: "How do staff set their shift preferences?",
    answer: "Staff can easily set preferences through our mobile app or web portal. They can mark shifts as preferred, available, or unavailable, set recurring patterns (like 'no weekends'), and specify one-off exceptions. The interface is intuitive with visual calendars and simple toggles for different preference types."
  },
  {
    question: "How does the system balance conflicting preferences?",
    answer: "Our AI uses multi-objective optimization to find the best compromise. It considers preference weights, historical allocation, fairness metrics, and operational requirements. When perfect satisfaction isn't possible, it distributes compromises fairly across the team and tracks satisfaction scores to ensure long-term equity."
  },
  {
    question: "Can I override preferences when necessary?",
    answer: "Yes, managers can override preferences for critical operational needs. However, the system tracks all overrides and their reasons, helping you minimise them over time. It also suggests alternatives that might meet operational needs while better respecting preferences, and notifies affected staff with explanations."
  },
]

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
                  Balance staff preferences with operational requirements through intelligent constraint handling and flexible rule configuration.
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
                  Flexible Preference Collection
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Collect detailed staff preferences through intuitive interfaces. Support for shift times, days, locations, and role preferences with weighted importance levels and recurring patterns.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Intuitive preference collection interface</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Weighted preferences (preferred, available, unavailable)</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Recurring patterns and one-off exceptions</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Set Your Preferences</h3>
                    <span className="text-xs bg-[#4a9288] text-white px-3 py-1 rounded-full">AI-Powered</span>
                  </div>
                  
                  {/* Preference Input */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Availability Preferences</span>
                        <HiCog className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-600">Monday - Thursday</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Available</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-[#4a9288] animate-pulse">
                          <span className="text-sm font-medium text-gray-900">Friday Nights</span>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">Can't Work</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <span className="text-sm text-gray-600">Weekends</span>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Flexible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* AI Processing Visualization */}
                  <div className="relative mb-6">
                    <div className="flex items-center justify-center py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#4a9288] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-[#4a9288] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-[#4a9288] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <span className="ml-3 text-xs text-gray-500">AI analyzing preferences...</span>
                    </div>
                  </div>
                  
                  {/* Generated Roster Preview */}
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Your Schedule</span>
                      <HiCheck className="w-4 h-4 text-[#4a9288]" />
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-xs">
                      <div className="text-center">
                        <p className="font-medium text-gray-600 mb-1">Mon</p>
                        <div className="bg-[#4a9288] text-white rounded py-1">Day</div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-600 mb-1">Tue</p>
                        <div className="bg-[#4a9288] text-white rounded py-1">Day</div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-600 mb-1">Wed</p>
                        <div className="bg-[#4a9288] text-white rounded py-1">Eve</div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-600 mb-1">Thu</p>
                        <div className="bg-[#4a9288] text-white rounded py-1">Day</div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-600 mb-1">Fri</p>
                        <div className="bg-gray-300 text-gray-500 rounded py-1">Off</div>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-3 text-center">✓ No Friday night shifts assigned</p>
                  </div>
                </div>
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
                  Advanced Rule Engine
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Configure complex scheduling rules that automatically enforce compliance, fairness, and operational requirements. From simple constraints to sophisticated business logic.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Drop-down menu rule builder interface</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom logic for organization-specific needs</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Powered by AI to handle complexity</span>
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
                  Intelligent Preference Balancing
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced algorithms balance individual preferences with team fairness and operational requirements. The system learns from feedback to improve satisfaction over time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multi-objective optimization algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fairness tracking and equitable distribution</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Continuous learning from staff feedback</span>
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
                  When preferences and rules conflict, intelligent resolution mechanisms find the best compromise. Priority systems and escalation paths ensure critical requirements are never violated.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic conflict detection and alerts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Priority-based resolution algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Manager escalation for complex situations</span>
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
                Create fair, compliant schedules that respect staff preferences while meeting all operational requirements.
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
  )
}