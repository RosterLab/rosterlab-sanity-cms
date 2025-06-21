import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiUserGroup, HiCalendar, HiShieldCheck, HiBell } from 'react-icons/hi'

export const metadata = {
  title: 'Self-Scheduling - RosterLab',
  description: 'Empower your staff with flexible self-scheduling. Let employees choose shifts that work for them while maintaining operational requirements.',
}

export default function SelfSchedulingPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Empowered staff, optimized schedules
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Give your team shift flexibility while maintaining coverage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Open Shifts This Week</span>
                        <span className="text-sm text-purple-600 font-medium">12 Available</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 flex justify-between items-center hover:shadow-sm transition-shadow cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">ICU - Morning Shift</p>
                            <p className="text-sm text-gray-500">Mon, Oct 14</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-purple-600">7:00 AM - 3:00 PM</p>
                            <p className="text-xs text-gray-500">2 spots left</p>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 flex justify-between items-center hover:shadow-sm transition-shadow cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Ward 3B - Night Shift</p>
                            <p className="text-sm text-gray-500">Tue, Oct 15</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-purple-600">11:00 PM - 7:00 AM</p>
                            <p className="text-xs text-gray-500">1 spot left</p>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 flex justify-between items-center hover:shadow-sm transition-shadow cursor-pointer">
                          <div>
                            <p className="font-medium text-gray-900">Emergency - Afternoon</p>
                            <p className="text-sm text-gray-500">Wed, Oct 16</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-purple-600">3:00 PM - 11:00 PM</p>
                            <p className="text-xs text-gray-500">3 spots left</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-purple-600 text-white rounded-lg py-3 font-semibold hover:bg-purple-700 transition-colors">
                        View All Available Shifts
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiShieldCheck className="w-5 h-5 inline mr-1 text-purple-500" />
                      Smart matching based on your skills & preferences
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Staff Preference Collection */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Staff Preference Collection
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Let your team indicate their shift preferences weeks in advance. Our intuitive interface makes it easy for staff to select preferred days, times, and locations while viewing their existing commitments.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Visual calendar interface for easy selection</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mobile-friendly for on-the-go submissions</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Preference weighting (preferred, available, unavailable)</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Feature Illustration</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: AI-Optimized Matching */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">AI Matching Visualization</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  AI-Optimized Matching
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced algorithm considers staff preferences, skills, seniority, and fairness to create schedules that work for everyone. Get optimal coverage while maximizing staff satisfaction.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Balances preferences with operational needs</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ensures fair distribution of desirable shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Respects skill requirements and certifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Real-Time Shift Marketplace */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Real-Time Shift Marketplace
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Create a dynamic marketplace where staff can pick up extra shifts or offer their assigned shifts to colleagues. Everything happens within your compliance rules and approval workflows.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant notifications for available shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">First-come, first-served or priority-based allocation</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic overtime and compliance checks</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Marketplace Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Manager Override Controls */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Manager Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Manager Override Controls
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Maintain full control when needed. Managers can set blackout dates, lock critical shifts, and make manual adjustments while the system handles the routine scheduling automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Lock specific shifts or staff assignments</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Set minimum experience requirements</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Review and approve before publishing</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                The Results Speak for Themselves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">87%</p>
                  <p className="text-xl opacity-90">Higher staff satisfaction scores</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">65%</p>
                  <p className="text-xl opacity-90">Reduction in scheduling conflicts</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">4.8/5</p>
                  <p className="text-xl opacity-90">Average staff rating</p>
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
                Ready to Empower Your Team?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Give your staff the flexibility they want while maintaining the coverage you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
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