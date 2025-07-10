import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Image from 'next/image'
import LeaveRequestDemo from './LeaveRequestDemo'
import { HiCheck, HiCalendar, HiClock } from 'react-icons/hi'

export const metadata = {
  title: 'Employee Leave Request Tracking - RosterLab',
  description: 'Give employees an easy portal to request leave while managers see real-time impacts on coverage, costs, and compliance before approving.',
  openGraph: {
    title: 'Employee Leave Request Tracking - RosterLab',
    description: 'Give employees an easy portal to request leave while managers see real-time impacts on coverage, costs, and compliance before approving.',
    images: [
      {
        url: '/images/og images/FeatureLeaveRequest.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee Leave Request Tracking - RosterLab',
    description: 'Give employees an easy portal to request leave while managers see real-time impacts on coverage, costs, and compliance before approving.',
    images: ['/images/og images/FeatureLeaveRequest.png'],
  },
}

export default function LeaveRequestsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Streamlined leave request management
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automatic coverage analysis and intelligent approval workflows make leave management effortless for staff and managers.
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
                  src="/images/illustration/A day off-pana.svg"
                  alt="Leave request management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Automatic Coverage Analysis */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Coverage Analysis
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When staff request leave, the system automatically analyses impact on coverage, identifies available replacement options, and flags potential issues before they become problems.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time coverage impact assessment</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic identification of replacement staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills and availability matching for coverage</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <LeaveRequestDemo />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Intelligent Approval Workflows */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                      <div className="flex flex-col items-center justify-center">
                        {/* Leave Request Input */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 w-full max-w-xs mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <HiCalendar className="w-4 h-4 text-white" />
                              </div>
                              <span className="font-semibold text-gray-900 text-sm">Leave Request</span>
                            </div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                              <span className="font-medium">Employee:</span> Sarah Johnson
                            </div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                              <span className="font-medium">Type:</span> Annual Leave
                            </div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                              <span className="font-medium">Dates:</span> Jan 15-19, 2025
                            </div>
                          </div>
                        </div>
                        
                        {/* Approval Engine Processing */}
                        <div className="relative w-full max-w-xs h-32 mb-6">
                          {/* Central Processing Hub */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 z-20">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center animate-spin">
                                <HiClock className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs font-semibold text-gray-700">AI Approval Engine</span>
                            </div>
                          </div>
                          
                          {/* Checking Steps - Animated */}
                          <div className="absolute top-0 left-0 w-full">
                            <div className="flex justify-between px-2">
                              <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-[#4a9288] animate-pulse">
                                ✓ Coverage OK
                              </div>
                              <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-green-700 animate-pulse" style={{animationDelay: '0.5s'}}>
                                ✓ Balance OK
                              </div>
                            </div>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 w-full">
                            <div className="flex justify-between px-2">
                              <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-green-700 animate-pulse" style={{animationDelay: '1s'}}>
                                ✓ No Conflicts
                              </div>
                              <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-green-700 animate-pulse" style={{animationDelay: '1.5s'}}>
                                ✓ Policy OK
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Approval Decision */}
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200 w-full max-w-xs animate-[fade-in_0.5s_ease-in-out_2s_both]">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                <HiCheck className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-[#4a9288]">✓ Auto-Approved</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                          </div>
                        </div>
                        
                        {/* Status Bar */}
                        <div className="mt-4 w-full max-w-xs">
                          <div className="text-center">
                            <p className="text-xs text-gray-500"></p>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Intelligent Approval Workflows
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Configurable approval rules automatically process leave requests based on your policies. Auto-approve when coverage is available, or route to managers when review is needed.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Customisable approval rules and criteria</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Auto-approval for low-impact requests</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Escalation paths for complex situations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Leave Balance Management */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Smart Leave Balance Management
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Automatic tracking of leave balances with real-time updates. Support for multiple leave types, accrual rates, and carry-over policies with full visibility for staff and managers.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time balance tracking and updates</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple leave types and accrual policies</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic alerts for low balances or expiring leave</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Business ethics-pana-2.svg"
                  alt="Smart leave balance management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Mobile-First Experience */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Mobile inbox-pana.svg"
                  alt="Mobile leave request app illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Mobile-First Experience
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff can submit leave requests, check balances, and receive updates from anywhere. Managers can review and approve requests on-the-go with full context and coverage information.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Quick leave request submission on mobile</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time notifications and status updates</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Manager approval with full context</span>
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
                Leave Management Efficiency
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Happier Teams</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Requests processed automatically</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">24/7</p>
                  <p className="text-xl opacity-90">Self-service availability</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
                Frequently Asked Questions
              </h2>
              <FAQAccordion
                items={[
                  {
                    question: "Can employees check their leave balances on mobile?",
                    answer: "Yes! Employees can access their leave balances, submit requests, and track approval status from any device. The mobile-optimized interface makes it easy to request leave on-the-go, while managers can review and approve requests with full coverage context from their phones."
                  },
                  {
                    question: "What types of leave can the system handle?",
                    answer: "RosterLab supports all leave types including annual leave, sick leave, personal leave, parental leave, long service leave, and custom leave categories. Each type can have its own accrual rules, carry-over policies, and approval workflows configured to match your organisation's policies."
                  },
                  {
                    question: "Can we set up automatic approval rules?",
                    answer: "Absolutely! You can configure automatic approval rules based on various criteria such as leave type, duration, advance notice, and coverage availability. For example, single-day leave requests with 2+ weeks notice and available coverage can be auto-approved, while longer periods or short-notice requests require manager review."
                  }
                ]}
              />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Streamline Leave Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform leave requests from administrative burden to seamless self-service with intelligent automation.
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