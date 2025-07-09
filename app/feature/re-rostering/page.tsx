import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata = {
  title: 'Fast Re-Rostering & Scenario Planning - RosterLab',
  description: 'Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds to keep coverage and cost on track.',
  openGraph: {
    title: 'Fast Re-Rostering & Scenario Planning - RosterLab',
    description: 'Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds to keep coverage and cost on track.',
    images: [
      {
        url: '/images/og%20images/Feature%20-%20%20Re%20Rostering.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Re-Rostering & Scenario Planning - RosterLab',
    description: 'Adjust rosters on the go when staff call in sick or require changes. AI re-optimises shifts in seconds to keep coverage and cost on track.',
    images: ['/images/og%20images/Feature%20-%20%20Re%20Rostering.png'],
  },
}

export default function ReRosteringPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Handle unexpected changes with re-rostering
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automatically adjust schedules when staff call in sick or situations change, maintaining coverage and compliance.
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
                  src="/images/illustration/Events-pana.svg"
                  alt="Re-rostering events management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Intelligent Impact Analysis */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Intelligent Impact Analysis
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When changes occur, our system immediately analyzes the impact on coverage, compliance, and staff. Get multiple solution options ranked by effectiveness and minimal disruption to existing schedules.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time impact assessment across all departments</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple solution options ranked by effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Minimal disruption analysis for existing schedules</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Programmer-pana-2.svg"
                  alt="Intelligent Impact Analysis illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Automated Solution Generation */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Customer relationship management-pana.svg"
                  alt="Automated Solution Generation illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automated Solution Generation
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AI automatically generates multiple re-rostering solutions considering staff availability, skills, preferences, and compliance requirements. Choose the best option or let the system auto-apply the optimal solution.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple solution scenarios generated instantly</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills and availability matching for replacements</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Auto-apply mode for critical situations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Compliance Preservation */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Compliance Preservation
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  All re-rostering solutions maintain full compliance with regulations, union agreements, and workplace policies. The system ensures minimum rest periods, maximum hours, and skill requirements are never violated.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic compliance validation for all solutions</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Rest period and maximum hours enforcement</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skill and certification requirement matching</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Computer troubleshooting-pana-2.svg"
                  alt="Compliance Preservation illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Real-Time Notifications */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Push notifications-pana-2 copy.svg"
                  alt="Real-Time Notifications & Updates illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Real-Time Notifications & Updates
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Instantly notify affected staff of schedule changes with detailed information about their new assignments. Automated communication ensures everyone stays informed and prepared.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant notifications to all affected staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Detailed change information and reasoning</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Acknowledgment tracking and confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Re-Rostering Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">30 sec</p>
                  <p className="text-xl opacity-90">Average solution generation time</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance maintained</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Reduction in manual re-scheduling</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Learn more about how re-rostering and scenario planning work
                </p>
              </div>
              <FAQAccordion items={[
                {
                  question: "How quickly can RosterLab generate re-rostering solutions?",
                  answer: "RosterLab's AI can generate multiple re-rostering solutions in under 30 seconds. The system analyses all available staff, their skills, availability, and compliance requirements to provide you with ranked options that minimise disruption while maintaining full coverage."
                },
                {
                  question: "Can I test different scenarios before implementing changes?",
                  answer: "Yes! Our scenario planning feature allows you to test 'what-if' situations without affecting the live roster. You can run hypothetical roster scenarios to assess the feasibility of the changes you and your team need to make without impacting your live roster. Compare costs and coverage impacts, and save multiple scenarios for future reference. This helps with contingency planning and budget forecasting."
                },
                {
                  question: "Will staff be automatically notified of roster changes?",
                  answer: "Yes, once you approve a re-rostering solution, all affected staff receive instant notifications via the app."
                }
              ]} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready for Intelligent Re-Rostering?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Handle unexpected changes seamlessly with AI-powered re-rostering that maintains coverage and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
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