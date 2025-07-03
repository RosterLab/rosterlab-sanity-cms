import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import SiteLayout from '@/components/layout/SiteLayout'
import TrustedBy from '@/components/sections/TrustedBy'

export const metadata = {
  title: 'Aged Care Staff Scheduling Software - RosterLab',
  description: 'Learn how our rostering software improves shift scheduling in Aged Care. Create better rosters that boost team wellbeing, ensure compliance & saves time.',
}

export default function AgedCarePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Optimise your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  Staff Scheduling
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deliver better care with smart rostering. Achieve 5% efficiency gains while eliminating scheduling errors and ensuring full compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/book-a-demo" className="bg-teal-600 text-white hover:bg-teal-700">
                  Book a Demo
                </Button>
                <Button href="https://app.rosterlab.com/l" className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50">
                  Get Started
                </Button>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free digital scheduling forever
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No credit card required
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/aged-care.svg"
                alt="Aged care rostering dashboard"
                width={600}
                height={400}
                className="block w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compassionate Care Starts with Smart Scheduling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Balance resident needs, staff wellbeing, and regulatory requirements with intelligent rostering designed specifically for aged care facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5% Efficiency Gains</h3>
              <p className="text-gray-600">
                Optimize staff utilization and reduce costs while maintaining high-quality care standards.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Errors</h3>
              <p className="text-gray-600">
                Eliminate double-bookings, understaffing, and compliance breaches with automated validation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Open Shift Management</h3>
              <p className="text-gray-600">
                Fill gaps quickly with smart notifications and preference-based shift allocation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Proven Results</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-teal-600">100%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Compliant</h4>
                      <p className="text-sm text-gray-600">Meet all regulatory requirements automatically</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-cyan-600">95%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Time Saved</h4>
                      <p className="text-sm text-gray-600">On roster creation and management</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-blue-600">100%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fairer Schedules</h4>
                      <p className="text-sm text-gray-600">Equitable distribution of shifts and workload</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Designed for Aged Care Excellence
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Care Level Matching</h3>
                    <p className="text-gray-600">
                      Automatically match staff qualifications to resident care levels - from low care to dementia-specific and palliative care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Assurance</h3>
                    <p className="text-gray-600">
                      Meet ACFI requirements, maintain proper RN coverage, and ensure all regulatory staffing standards are exceeded.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuity of Care</h3>
                    <p className="text-gray-600">
                      Maintain consistent care teams for residents while balancing staff workload and preventing burnout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Complete Aged Care Rostering Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From planning to payroll, manage every aspect of your aged care facility staffing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link href="/feature/preferences-rules" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">01</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Care Requirements</h3>
                <p className="text-gray-600 mb-3">
                  Define staffing ratios, skill requirements, and care levels for each unit or wing.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>

            <Link href="/feature/self-scheduling" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">02</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Collect Preferences</h3>
                <p className="text-gray-600 mb-3">
                  Staff submit availability and shift preferences through the mobile app.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>

            <Link href="/feature/auto-roster-generation" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">03</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Optimal Roster</h3>
                <p className="text-gray-600 mb-3">
                  AI creates compliant schedules balancing all requirements in minutes.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>

            <Link href="/solutions/staff-roster-mobile-app" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">04</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Publish & Notify</h3>
                <p className="text-gray-600 mb-3">
                  Share rosters instantly with automatic notifications and calendar sync.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>

            <Link href="/feature/shift-swaps" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">05</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Changes</h3>
                <p className="text-gray-600 mb-3">
                  Handle sick leave, swaps, and emergencies while maintaining compliance.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>

            <Link href="/feature/payroll-integration" className="relative group">
              <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="text-3xl font-bold text-gray-400 mb-3">06</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Export to Payroll</h3>
                <p className="text-gray-600 mb-3">
                  Seamlessly integrate with payroll systems for accurate, timely processing.
                </p>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">Read more →</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Cloud Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern Cloud Platform for Modern Aged Care
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, accessible, and integrated with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/feature/shift-swaps" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Shift Swaps</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enable staff to easily swap shifts with automated approval workflows.
                </p>
                <span className="text-teal-600 text-sm font-medium hover:text-teal-700">Learn more →</span>
              </div>
            </Link>

            <Link href="/feature/auto-roster-generation" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Automate Rostering</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Create compliant schedules in minutes with AI-powered optimisation.
                </p>
                <span className="text-cyan-600 text-sm font-medium hover:text-cyan-700">Learn more →</span>
              </div>
            </Link>

            <Link href="/solutions/staff-roster-mobile-app" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Available on Mobile</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Access rosters, swap shifts, and manage schedules from any device.
                </p>
                <span className="text-blue-600 text-sm font-medium hover:text-blue-700">Learn more →</span>
              </div>
            </Link>

            <Link href="/feature/re-rostering" className="block">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Re-roster Changes</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Handle unexpected changes with intelligent re-rostering algorithms.
                </p>
                <span className="text-indigo-600 text-sm font-medium hover:text-indigo-700">Learn more →</span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="py-20 bg-white">
        <TrustedBy />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Aged Care Facility Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join aged care providers achieving better outcomes with smarter scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/book-a-demo" 
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button 
                href="/roi-calculator" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}