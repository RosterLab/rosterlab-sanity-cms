import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiCheck, HiClock, HiShieldCheck, HiUserGroup } from 'react-icons/hi'

export const metadata = {
  title: 'Open Shifts Management & Smart Matching - RosterLab',
  description: 'Publish open shifts instantly; AI matches qualified staff, automates offers, and fills gaps fast while controlling overtime and fatigue.',
  openGraph: {
    title: 'Open Shifts Management & Smart Matching - RosterLab',
    description: 'Publish open shifts instantly; AI matches qualified staff, automates offers, and fills gaps fast while controlling overtime and fatigue.',
    images: [
      {
        url: '/images/og%20images/Feature%20-%20%20Open%20Shifts.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Shifts Management & Smart Matching - RosterLab',
    description: 'Publish open shifts instantly; AI matches qualified staff, automates offers, and fills gaps fast while controlling overtime and fatigue.',
    images: ['/images/og%20images/Feature%20-%20%20Open%20Shifts.png'],
  },
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
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
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-col items-center justify-center">
                    {/* Open Shift Input */}
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-200 w-full max-w-xs mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center">
                            <HiClock className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">Open Shift</span>
                        </div>
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                          <span className="font-medium">Department:</span> Emergency
                        </div>
                        <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                          <span className="font-medium">Shift:</span> Night (8 hrs)
                        </div>
                        <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                          <span className="font-medium">Skills Required:</span> ACLS, Trauma
                        </div>
                      </div>
                    </div>
                    
                    {/* Smart Matching Engine */}
                    <div className="relative w-full max-w-xs h-32 mb-6">
                      {/* Central Processing Hub */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 z-20">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center animate-spin">
                            <HiUserGroup className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">Smart Matching Engine</span>
                        </div>
                      </div>
                      
                      {/* Checking Rules - Animated */}
                      <div className="absolute top-0 left-0 w-full">
                        <div className="flex justify-between px-2">
                          <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-[#4a9288] animate-pulse">
                            ✓ Skills Match
                          </div>
                          <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-green-700 animate-pulse" style={{animationDelay: '0.5s'}}>
                            ✓ Available
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="flex justify-between px-2">
                          <div className="bg-yellow-100 rounded-lg px-2 py-1 text-xs text-yellow-700 animate-pulse" style={{animationDelay: '1s'}}>
                            ⚠ Overtime Check
                          </div>
                          <div className="bg-green-100 rounded-lg px-2 py-1 text-xs text-green-700 animate-pulse" style={{animationDelay: '1.5s'}}>
                            ✓ Rest Period OK
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Matching Results */}
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 w-full max-w-xs animate-[fade-in_0.5s_ease-in-out_2s_both]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <HiShieldCheck className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">12 Staff Matched</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between bg-white rounded px-2 py-1">
                          <span className="text-gray-600">Eligible & Available:</span>
                          <span className="font-medium text-[#4a9288]">8</span>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded px-2 py-1">
                          <span className="text-gray-600">Blocked (Overtime):</span>
                          <span className="font-medium text-yellow-600">3</span>
                        </div>
                        <div className="flex items-center justify-between bg-white rounded px-2 py-1">
                          <span className="text-gray-600">Missing Skills:</span>
                          <span className="font-medium text-gray-500">1</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Bar */}
                    <div className="mt-4 w-full max-w-xs">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Notifications sent to 8 eligible staff</p>
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
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-col items-center justify-center">
                    {/* Header */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Roster History</h3>
                    
                    {/* Timeline Events */}
                    <div className="relative w-full max-w-md">
                      {/* Timeline Line - Positioned to the left of center */}
                      <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                      
                      {/* Timeline Items */}
                      <div className="space-y-6">
                        {/* Event 1 */}
                        <div className="relative group">
                          <div className="flex items-center">
                            {/* Time on left */}
                            <div className="w-16 text-right">
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">2:47 PM</span>
                            </div>
                            {/* Circle - positioned on the timeline */}
                            <div className="relative mx-4">
                              <div className="w-6 h-6 bg-blue-400 rounded-full border-4 border-white shadow-sm group-hover:scale-110 group-hover:bg-blue-500 transition-all z-10"></div>
                            </div>
                            {/* Content on right */}
                            <div className="flex-1 bg-gray-50 group-hover:bg-blue-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">Shift Published</p>
                              <p className="text-xs text-gray-600 mt-1">ICU Night Shift - 8 hrs</p>
                              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">By: Manager Sarah</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event 2 */}
                        <div className="relative group">
                          <div className="flex items-center">
                            {/* Time on left */}
                            <div className="w-16 text-right">
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">2:47 PM</span>
                            </div>
                            {/* Circle - positioned on the timeline */}
                            <div className="relative mx-4">
                              <div className="w-6 h-6 bg-slate-400 rounded-full border-4 border-white shadow-sm group-hover:scale-110 group-hover:bg-slate-500 transition-all z-10"></div>
                            </div>
                            {/* Content on right */}
                            <div className="flex-1 bg-gray-50 group-hover:bg-slate-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">12 Staff Notified</p>
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
                        </div>
                        
                        {/* Event 3 */}
                        <div className="relative group">
                          <div className="flex items-center">
                            {/* Time on left */}
                            <div className="w-16 text-right">
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">2:52 PM</span>
                            </div>
                            {/* Circle - positioned on the timeline */}
                            <div className="relative mx-4">
                              <div className="w-6 h-6 bg-blue-300 rounded-full border-4 border-white shadow-sm group-hover:scale-110 group-hover:bg-blue-400 transition-all z-10"></div>
                            </div>
                            {/* Content on right */}
                            <div className="flex-1 bg-gray-50 group-hover:bg-blue-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">3 Viewed</p>
                              <p className="text-xs text-gray-600 mt-1">Emma, John, Mike</p>
                              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Response pending</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Event 4 */}
                        <div className="relative group">
                          <div className="flex items-center">
                            {/* Time on left */}
                            <div className="w-16 text-right">
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">2:58 PM</span>
                            </div>
                            {/* Circle - positioned on the timeline */}
                            <div className="relative mx-4">
                              <div className="w-6 h-6 bg-indigo-400 rounded-full border-4 border-white shadow-sm group-hover:scale-110 group-hover:bg-indigo-500 transition-all animate-pulse z-10"></div>
                            </div>
                            {/* Content on right */}
                            <div className="flex-1 bg-gray-50 group-hover:bg-indigo-50 p-3 rounded-lg transition-all duration-200 cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">Shift Accepted</p>
                              <p className="text-xs text-gray-600 mt-1">Emma Wilson accepted</p>
                              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Compliance verified</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* View Full History - Centered */}
                    <div className="mt-8">
                      <button className="text-sm text-[#4a9288] hover:text-[#3a7268] font-medium transition-colors hover:underline">
                        View Full History →
                      </button>
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
                  question: "Can staff set preferences?",
                  answer: "Absolutely. Staff can set their notification preferences including preferred departments, shift times, locations, and even minimum notice periods. This reduces notification fatigue and ensures staff only receive relevant opportunities they're likely to accept."
                },
                {
                  question: "How quickly do staff receive open shift notifications?",
                  answer: "Notifications are sent instantly through push notifications to mobile devices. Staff typically receive alerts within seconds of a shift being published."
                },
                {
                  question: "Why are open shifts important?",
                  answer: "Open shifts are crucial for maintaining adequate staffing levels and operational efficiency. They enable organizations to quickly fill unexpected gaps due to absences, handle surge demand, and provide flexible work opportunities for staff. By efficiently managing open shifts, businesses can reduce overtime costs, improve staff satisfaction, and ensure consistent service delivery."
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