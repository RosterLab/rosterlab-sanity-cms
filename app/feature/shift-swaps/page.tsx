import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiRefresh, HiShieldCheck, HiBell } from 'react-icons/hi'

export const metadata = {
  title: 'Shift Swaps - RosterLab',
  description: 'Enable seamless shift swapping between employees while maintaining compliance and coverage requirements. Automated approvals save managers time.',
}

export default function ShiftSwapsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Shift Swaps Made
                  <span className="text-green-600"> Simple & Safe</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Let your team manage their own shift changes while you maintain control. Our intelligent swap system ensures coverage and compliance automatically.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="https://app.rosterlab.com" 
                    className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Swap Request</span>
                        <span className="text-sm text-yellow-600 font-medium">Pending</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Sarah wants to swap her Tuesday shift with yours</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white rounded p-2">
                          <p className="text-gray-500">Your shift</p>
                          <p className="font-medium">Wed 2PM-10PM</p>
                        </div>
                        <div className="bg-white rounded p-2">
                          <p className="text-gray-500">Their shift</p>
                          <p className="font-medium">Tue 6AM-2PM</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-green-600 text-white rounded py-2 text-sm font-medium hover:bg-green-700">
                          Accept
                        </button>
                        <button className="flex-1 bg-gray-200 text-gray-700 rounded py-2 text-sm font-medium hover:bg-gray-300">
                          Decline
                        </button>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiShieldCheck className="w-5 h-5 inline mr-1 text-green-500" />
                      Automatically checked for compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Benefits Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Modern Teams Choose Smart Shift Swapping
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Give your team flexibility while maintaining operational control
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiRefresh className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Employee Flexibility</h3>
                <p className="text-gray-600">
                  Staff can easily swap shifts to accommodate personal needs without manager intervention
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiShieldCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Automatic Compliance</h3>
                <p className="text-gray-600">
                  Every swap is checked against labor laws, skills requirements, and overtime rules
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiBell className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Manager Control</h3>
                <p className="text-gray-600">
                  Set approval rules and get notified only when manual review is needed
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* How It Works Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Shift Swapping in 4 Simple Steps
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Employee Initiates Swap</h3>
                    <p className="text-gray-600">
                      Staff member selects a shift they want to swap and chooses from available options or requests from specific colleagues
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">System Validates Request</h3>
                    <p className="text-gray-600">
                      AI instantly checks skills match, overtime limits, minimum rest periods, and all compliance requirements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Colleague Accepts</h3>
                    <p className="text-gray-600">
                      The other employee receives a notification and can review and accept the swap request through the app
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Automatic Approval</h3>
                    <p className="text-gray-600">
                      If all rules pass, the swap is automatically approved and schedules update instantly. Managers are notified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <Container>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Smart Features That Protect Your Business
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance & Safety</h3>
                <div className="space-y-4">
                  {[
                    "Automatic overtime calculation and limits",
                    "Minimum rest period enforcement",
                    "Skills and certification matching",
                    "Union rule compliance",
                    "Fatigue management controls"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <HiCheck className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Manager Controls</h3>
                <div className="space-y-4">
                  {[
                    "Set auto-approval rules and exceptions",
                    "Blackout dates for critical periods",
                    "Department-specific swap policies",
                    "Real-time notifications and overrides",
                    "Complete audit trail of all swaps"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <HiCheck className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                The Numbers Speak for Themselves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">92%</p>
                  <p className="text-xl opacity-90">Reduction in manager time spent on shift changes</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">3.5x</p>
                  <p className="text-xl opacity-90">Increase in successful shift coverage</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance with labor regulations</p>
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
                Ready to Modernize Your Shift Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join leading organizations who've transformed their workforce flexibility with intelligent shift swapping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
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