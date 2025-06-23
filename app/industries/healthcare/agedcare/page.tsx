import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import TrustedBy from '@/components/sections/TrustedBy'

export const metadata = {
  title: 'Aged Care Rostering Solutions - RosterLab',
  description: 'Optimize aged care facility staffing with AI-powered scheduling. Achieve 5% efficiency gains, ensure compliance, and improve resident care quality.',
}

export default function AgedCarePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Optimise your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  Staff Scheduling
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deliver better care with smart rostering. Achieve 5% efficiency gains while eliminating scheduling errors and ensuring full compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/demo" className="bg-purple-600 text-white hover:bg-purple-700">
                  Book a Demo
                </Button>
                <Button href="/contact" className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50">
                  Get Started
                </Button>
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
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5% Efficiency Gains</h3>
              <p className="text-gray-600">
                Optimize staff utilization and reduce costs while maintaining high-quality care standards.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Errors</h3>
              <p className="text-gray-600">
                Eliminate double-bookings, understaffing, and compliance breaches with automated validation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-purple-600">5%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cost Reduction</h4>
                      <p className="text-sm text-gray-600">Through optimized staff utilization</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-pink-600">80%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Time Saved</h4>
                      <p className="text-sm text-gray-600">On roster creation and management</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-indigo-600">95%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Staff Satisfaction</h4>
                      <p className="text-sm text-gray-600">With fair and flexible scheduling</p>
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
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="relative">
              <div className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-3">01</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Care Requirements</h3>
                <p className="text-gray-600">
                  Define staffing ratios, skill requirements, and care levels for each unit or wing.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-pink-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-pink-600 mb-3">02</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Collect Preferences</h3>
                <p className="text-gray-600">
                  Staff submit availability and shift preferences through the mobile app.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-indigo-600 mb-3">03</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Optimal Roster</h3>
                <p className="text-gray-600">
                  AI creates compliant schedules balancing all requirements in minutes.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-3">04</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Publish & Notify</h3>
                <p className="text-gray-600">
                  Share rosters instantly with automatic notifications and calendar sync.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-3">05</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Changes</h3>
                <p className="text-gray-600">
                  Handle sick leave, swaps, and emergencies while maintaining compliance.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-yellow-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-yellow-600 mb-3">06</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Export to Payroll</h3>
                <p className="text-gray-600">
                  Seamlessly integrate with payroll systems for accurate, timely processing.
                </p>
              </div>
            </div>
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
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-sm text-gray-600">
                Cloud-based system accessible 24/7 from any device, anywhere.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-sm text-gray-600">
                Bank-level encryption and compliance with healthcare data standards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automatic Backups</h3>
              <p className="text-sm text-gray-600">
                Never lose data with continuous backups and disaster recovery.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Updates</h3>
              <p className="text-sm text-gray-600">
                New features and improvements deployed automatically.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500">
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
                href="/demo" 
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button 
                href="/roi-calculator" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600"
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