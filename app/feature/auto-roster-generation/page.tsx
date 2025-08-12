import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AIOptimizationModule from '@/components/feature/AIOptimizationModule'

export const metadata = {
  title: 'Automatic Roster Generation - RosterLab',
  description: 'Generate fully optimised rosters in minutes with automatic rostering that balances staffing levels, skills, preferences, and compliance effortlessly.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'AI Auto Roster Generation - RosterLab',
    description: 'Generate fully optimised rosters in minutes with AI that balances staffing levels, skills, preferences, and compliance effortlessly.',
    images: [
      {
        url: '/images/og images/AutoRosterGeneration.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Auto Roster Generation - RosterLab',
    description: 'Generate fully optimised rosters in minutes with AI that balances staffing levels, skills, preferences, and compliance effortlessly.',
    images: ['/images/og images/AutoRosterGeneration.png'],
  },
}

const faqItems = [
  {
    question: "What factors does the AI consider when generating rosters?",
    answer: "The AI considers: staffing requirements by shift and location, employee skills and qualifications, staff preferences and availability, fairness, labour laws and compliance rules. It balances all these factors simultaneously to create optimal schedules."
  },
  {
    question: "Can I modify the auto-generated roster?",
    answer: "Absolutely! The auto-generated roster is a starting point that you can refine. You can make manual adjustments, and the system will highlight any rule violations your changes might cause."
  },
  {
    question: "What happens if no perfect solution exists?",
    answer: "When constraints conflict (e.g., everyone wants the same day off), the AI finds the best possible compromise. It shows you exactly which constraints couldn't be fully satisfied and why, suggests alternative solutions. You always see the <a href='https://rosterlab.com/blog/how-to-navigate-staff-scheduling-trade-offs' class='text-blue-600 hover:text-blue-700 underline'>trade-offs</a> clearly."
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
                  Generate Rosters <br className="hidden md:block" />Automatically
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
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Optimise staffing coverage */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Optimise Staffing Coverage
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Automatically create rosters that balances safe staffing levels, staff wellbeing, compliance with union agreements, and operational efficiency - all in minutes, not days.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Flexible optimisation settings</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Customisable rules and constraints</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Scenario planning tools</span>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-lg p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Roster Inputs</h3>
                    <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#4a9288] cursor-pointer group">
                        <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">📋</div>
                        <div className="text-xs font-medium text-gray-700 group-hover:text-[#4a9288]">Rules</div>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#4a9288] cursor-pointer group">
                        <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">❤️</div>
                        <div className="text-xs font-medium text-gray-700 group-hover:text-[#4a9288]">Preferences</div>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#4a9288] cursor-pointer group">
                        <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">📅</div>
                        <div className="text-xs font-medium text-gray-700 group-hover:text-[#4a9288]">Availability</div>
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#4a9288] cursor-pointer group">
                        <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">⚖️</div>
                        <div className="text-xs font-medium text-gray-700 group-hover:text-[#4a9288]">Compliance</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <svg className="w-8 h-8 text-[#4a9288]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Roster Output</h3>
                    <div className="border-2 border-[#4a9288] rounded-lg p-4 text-center max-w-xs mx-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-[#3a7268] cursor-pointer group">
                      <div className="text-2xl mb-1 transition-transform duration-300 group-hover:scale-110">📊</div>
                      <div className="text-base font-bold text-gray-900 group-hover:text-[#4a9288] transition-colors duration-300">Your Automatic Roster Build</div>
                      <div className="text-xs mt-1 text-gray-600 group-hover:text-[#3a7268] transition-colors duration-300">Optimised & compliant in minutes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Reduce scheduling from days to minutes */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/generating.webp"
                  alt="Reduce scheduling from days to minutes"
                  width={550}
                  height={450}
                  className="rounded-lg shadow-lg w-full h-auto max-w-[550px] mx-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Reduce Scheduling From Days To Minutes
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Transform your scheduling process with AI that generates complete rosters in minutes instead of days. Reduce manual scheduling challenges and free up your team to focus on what's important.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Generate optimal rosters based on your rules and preferences</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant re-optimisation when changes occur</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Save 30+ hours per roster period (depending on your roster type)</span>
                  </li>
                </ul>
                <div className="mt-8 text-center">
                  <Button 
                    href="/solutions/ai-staff-scheduling" 
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 font-semibold"
                  >
                    Learn more about AI scheduling
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: What If Scenarios */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Simulate Different "What If" Scenarios
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Test roster changes before committing. See how staff rules, absences and requests impact your schedules. Make informed decisions and avoid being over or understaffed.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Preview impact of last-minute sick leave or absences</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Test new shift patterns or staffing models risk-free</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Avoid being over or understaffed</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/scenario.svg"
                  alt="What If Scenario Planning"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Compliance & Fairness */}
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
                Transform hours of manual scheduling into minutes of automated optimisation with AI-powered roster generation.
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