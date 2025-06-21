import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiBell, HiShieldCheck, HiEye, HiUserGroup } from 'react-icons/hi'

export const metadata = {
  title: 'Open Shifts Management - RosterLab',
  description: 'Manage open shifts with less effort. Instantly alert staff when new shifts become available with smart matching and compliance checks.',
}

export default function OpenShiftsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Available Open Shifts</span>
                        <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Urgent</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 border-l-4 border-blue-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">ICU - Night Shift</p>
                              <p className="text-sm text-gray-500">Tonight, 11:00 PM - 7:00 AM</p>
                            </div>
                            <div className="text-right">
                              <HiBell className="w-5 h-5 text-blue-500 mb-1" />
                              <p className="text-xs text-blue-600">Auto-notified 12 eligible staff</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✓ Skills Match</span>
                            <span className="text-xs text-gray-500">2 responses so far</span>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 border-l-4 border-orange-500">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">Ward 3B - Day Shift</p>
                              <p className="text-sm text-gray-500">Tomorrow, 7:00 AM - 3:00 PM</p>
                            </div>
                            <div className="text-right">
                              <HiShieldCheck className="w-5 h-5 text-green-500 mb-1" />
                              <p className="text-xs text-green-600">Compliance checked</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Available for all</span>
                            <span className="text-xs text-gray-500">8 eligible staff</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-colors">
                        Manage All Open Shifts
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiEye className="w-5 h-5 inline mr-1 text-blue-500" />
                      Full audit trail and visibility for all shifts
                    </div>
                  </div>
                </div>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to mobile devices and email alerts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills-based matching ensures qualified staff are notified</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Availability filters prevent unnecessary notifications</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Real-Time Notification Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Eligibility Rules & Compliance */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Compliance Checking Visualization</span>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic overtime and fatigue management checks</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance alerts for union rules and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time validation against existing schedules</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic detection of double-bookings</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Minimum rest period enforcement</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Conflict Detection Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Audit Trail & Visibility */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Audit Trail Dashboard</span>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete history of all shift activities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Detailed notification and response tracking</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance reporting and documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
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