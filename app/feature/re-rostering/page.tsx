import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiBell, HiShieldCheck, HiEye, HiUserGroup } from 'react-icons/hi'

export const metadata = {
  title: 'Re-Rostering - RosterLab',
  description: 'Dynamic re-rostering for unexpected changes. Automatically adjust schedules when staff call in sick or situations change, maintaining coverage and compliance.',
}

export default function ReRosteringPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Dynamic re-rostering for unexpected changes
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automatically adjust schedules when staff call in sick or situations change, maintaining coverage and compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Re-Rostering Alert</span>
                        <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Action Needed</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 border-l-4 border-red-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">Sarah called in sick</p>
                              <p className="text-sm text-gray-500">ICU Night Shift - Tonight 11PM-7AM</p>
                            </div>
                            <div className="text-right">
                              <HiClock className="w-5 h-5 text-red-500 mb-1" />
                              <p className="text-xs text-red-600">Coverage needed</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Critical coverage</span>
                            <span className="text-xs text-gray-500">5 solutions found</span>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 border-l-4 border-green-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">Auto-suggested solution</p>
                              <p className="text-sm text-gray-500">Move John from Ward 3B + overtime for Lisa</p>
                            </div>
                            <div className="text-right">
                              <HiBell className="w-5 h-5 text-green-500 mb-1" />
                              <p className="text-xs text-green-600">AI recommended</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✓ Compliant</span>
                            <span className="text-xs text-gray-500">Impact: minimal</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-orange-600 text-white rounded-lg py-3 font-semibold hover:bg-orange-700 transition-colors">
                        Apply Re-Rostering Solution
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiEye className="w-5 h-5 inline mr-1 text-orange-500" />
                      Intelligent re-rostering in real-time
                    </div>
                  </div>
                </div>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time impact assessment across all departments</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple solution options ranked by effectiveness</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Minimal disruption analysis for existing schedules</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Impact Analysis Dashboard</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Automated Solution Generation */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Solution Generation Engine</span>
                </div>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple solution scenarios generated instantly</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills and availability matching for replacements</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic compliance validation for all solutions</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Rest period and maximum hours enforcement</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skill and certification requirement matching</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Compliance Validation</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Real-Time Notifications */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Notification System</span>
                </div>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant notifications to all affected staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Detailed change information and reasoning</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Acknowledgment tracking and confirmation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
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
                  <p className="text-5xl font-bold mb-2">85%</p>
                  <p className="text-xl opacity-90">Reduction in manual re-scheduling</p>
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
                Ready for Intelligent Re-Rostering?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Handle unexpected changes seamlessly with AI-powered re-rostering that maintains coverage and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold"
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