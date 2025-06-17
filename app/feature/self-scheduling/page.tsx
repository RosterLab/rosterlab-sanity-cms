import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiUserGroup, HiCalendar } from 'react-icons/hi'

export const metadata = {
  title: 'Self-Scheduling - RosterLab',
  description: 'Empower your staff with flexible self-scheduling. Let employees choose shifts that work for them while maintaining operational requirements.',
}

export default function SelfSchedulingPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Self-Scheduling That
                  <span className="text-blue-600"> Works for Everyone</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Give your team the flexibility they crave while ensuring all shifts are covered. Our intelligent self-scheduling system balances employee preferences with operational needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book a Demo
                  </Button>
                  <Button 
                    href="https://app.rosterlab.com" 
                    className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Available Shifts</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 flex justify-between items-center">
                          <span className="font-medium">Morning Shift</span>
                          <span className="text-blue-600">6:00 AM - 2:00 PM</span>
                        </div>
                        <div className="bg-white rounded p-3 flex justify-between items-center">
                          <span className="font-medium">Afternoon Shift</span>
                          <span className="text-blue-600">2:00 PM - 10:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700">
                      Select Preferred Shifts
                    </button>
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
                Why Teams Love Self-Scheduling
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create a better work-life balance while maintaining operational excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiUserGroup className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Employee Satisfaction</h3>
                <p className="text-gray-600">
                  Staff choose shifts that fit their life, leading to 85% higher satisfaction rates
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiClock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Time Savings</h3>
                <p className="text-gray-600">
                  Reduce scheduling time by 75% with automated preference matching
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiCalendar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Better Coverage</h3>
                <p className="text-gray-600">
                  AI ensures all shifts are covered while honoring preferences
                </p>
              </div>
            </div>
          </Container>
        </div>

        {/* How It Works Section */}
        <div className="py-20">
          <Container>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              How Self-Scheduling Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Set Parameters</h3>
                  <p className="text-gray-600">
                    Define shift requirements, minimum staffing levels, and skill needs
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Staff Select Shifts</h3>
                  <p className="text-gray-600">
                    Employees choose preferred shifts through mobile or web app
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">AI Optimization</h3>
                  <p className="text-gray-600">
                    Our system optimally assigns shifts based on preferences and requirements
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Final Schedule</h3>
                  <p className="text-gray-600">
                    Review and publish the optimized schedule to all staff
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Powerful Features for Flexible Scheduling
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Preference-based shift allocation",
                "Mobile app for easy shift selection",
                "Fair distribution algorithms",
                "Seniority and skill-based priority",
                "Real-time availability updates",
                "Automatic conflict resolution",
                "Compliance with labor laws",
                "Integration with payroll systems"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <HiCheck className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <p className="text-lg text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Empower Your Team?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of organizations using self-scheduling to improve staff satisfaction and operational efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Schedule a Demo
                </Button>
                <Button 
                  href="https://app.rosterlab.com" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  Try It Free
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}