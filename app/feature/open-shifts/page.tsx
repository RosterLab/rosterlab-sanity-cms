import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiCheck, HiClock, HiBell, HiShieldCheck, HiEye, HiUserGroup } from 'react-icons/hi'

export const metadata = {
  title: 'Open Shifts Management & Smart Matching - RosterLab',
  description: 'Publish open shifts instantly; AI matches qualified staff, automates offers, and fills gaps fast while controlling overtime and fatigue.',
}

export default function OpenShiftsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Manage open shifts with less effort
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Instantly alert staff when new shifts become available with smart matching and automated compliance checks.
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
                  src="/images/illustration/schedule calendar-pana.svg"
                  alt="Open shifts calendar management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Real-Time Notifications */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Real-Time Notifications & Smart Matching
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Instantly alert staff when new shifts become available. Our system automatically matches shifts based on skills, availability, and compliance requirements to notify only eligible staff members.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to mobile devices and email alerts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills-based matching ensures qualified staff are notified</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Availability filters prevent unnecessary notifications</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Push notifications-pana-2.svg"
                  alt="Real-time push notifications illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Eligibility Rules & Compliance */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  {/* Browser Window Chrome */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
                          https://app.rosterlab.com/compliance-checks
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="p-6 bg-gray-50">
                    
                    {/* Alert Notifications */}
                    <div className="space-y-3">
                      {/* Overtime Alert */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 transform transition-all hover:scale-105 animate-[slide-in_0.5s_ease-out]">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <HiClock className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">Overtime Warning</p>
                            <p className="text-xs text-gray-600 mt-1">John would exceed 40 hrs/week</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Auto-blocked</span>
                              <span className="text-xs text-gray-500">2 min ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rest Period Alert */}
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 transform transition-all hover:scale-105 animate-[slide-in_0.7s_ease-out]">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 animate-[shake_2s_ease-in-out_infinite]">
                            <HiShieldCheck className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">Rest Period Violation</p>
                            <p className="text-xs text-gray-600 mt-1">Less than 8 hrs between shifts</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Prevented</span>
                              <span className="text-xs text-gray-500">5 min ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fair Distribution Alert */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transform transition-all hover:scale-105 animate-[slide-in_0.9s_ease-out]">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <HiUserGroup className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">Fair Distribution Check</p>
                            <p className="text-xs text-gray-600 mt-1">Sarah has fewer weekend shifts</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Priority given</span>
                              <span className="text-xs text-gray-500">Just now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Alert Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Compliance checks today</span>
                        <span className="font-semibold text-[#4a9288]">147 passed</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#4a9288] h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">92% compliance rate</p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Eligibility Rules & Smart Matching
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Built-in compliance alerts and violation prevention ensure shifts stay fair and safe. The system automatically checks for conflicts, overtime limits, and rest period requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic overtime and fatigue management checks</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance alerts for union rules and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fair distribution algorithms prevent favoritism</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Automatic Conflict Checking */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Conflict Checking
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced automation prevents scheduling conflicts before they happen. The system validates every shift assignment against existing schedules, availability patterns, and workplace policies.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time validation against existing schedules</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic detection of double-bookings</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Minimum rest period enforcement</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Computer troubleshooting-pana-2.svg"
                  alt="Automatic conflict checking illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Audit Trail & Visibility */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  {/* Browser Window Chrome */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
                          https://app.rosterlab.com/audit-trail
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="p-6 bg-gray-50">
                      {/* Timeline Events */}
                      <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                      
                      {/* Timeline Items */}
                      <div className="space-y-4">
                        {/* Event 1 */}
                        <div className="relative flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                          <div className="absolute left-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm group-hover:scale-110 transition-transform"></div>
                          <div className="ml-10 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">Shift Published</p>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700">2:47 PM</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">ICU Night Shift - 8 hrs</p>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">By: Manager Sarah</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event 2 */}
                        <div className="relative flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                          <div className="absolute left-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm group-hover:scale-110 transition-transform"></div>
                          <div className="ml-10 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">12 Staff Notified</p>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700">2:47 PM</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Based on skills & availability</p>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex -space-x-2">
                                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                                <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                                <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white"></div>
                                <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">+9</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event 3 */}
                        <div className="relative flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                          <div className="absolute left-2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white shadow-sm group-hover:scale-110 transition-transform"></div>
                          <div className="ml-10 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">3 Viewed</p>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700">2:52 PM</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Emma, John, Mike</p>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Response pending</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event 4 */}
                        <div className="relative flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                          <div className="absolute left-2 w-6 h-6 bg-[#4a9288] rounded-full border-4 border-white shadow-sm group-hover:scale-110 transition-transform animate-pulse"></div>
                          <div className="ml-10 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">Shift Accepted</p>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700">2:58 PM</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Emma Wilson accepted</p>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs bg-[#4a9288] text-white px-2 py-1 rounded">Compliance verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      
                      {/* View Full History */}
                      <div className="mt-6 text-center">
                        <button className="text-sm text-[#4a9288] hover:text-[#3a7268] font-medium transition-colors">
                          View Full History →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Audit Trail & Visibility
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Complete transparency with detailed audit trails for all open shift activities. Track who was notified, when they responded, and why assignments were made.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete history of all shift activities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Detailed notification and response tracking</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance reporting and documentation</span>
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
                Streamlined Open Shift Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">75%</p>
                  <p className="text-xl opacity-90">Faster shift coverage</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Staff notification accuracy</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance checking</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={[
                {
                  question: "How does the system prevent overtime?",
                  answer: "Before notifying any staff member, the system automatically checks their current schedule against your overtime rules, maximum hour limits, and minimum rest period requirements. Staff who would violate these rules by accepting the shift are automatically excluded from notifications, ensuring 100% compliance."
                },
                {
                  question: "Can staff set preferences?",
                  answer: "Absolutely. Staff can set their notification preferences including preferred departments, shift times, locations, and even minimum notice periods. This reduces notification fatigue and ensures staff only receive relevant opportunities they're likely to accept."
                },
                {
                  question: "How quickly do staff receive open shift notifications?",
                  answer: "Notifications are sent instantly through multiple channels including push notifications to mobile devices, SMS, and email. Staff typically receive alerts within seconds of a shift being published. The system also tracks delivery and read receipts to ensure notifications are received."
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
                Ready to Streamline Your Open Shifts?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Eliminate manual coordination and ensure fair, compliant shift coverage with intelligent automation.
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