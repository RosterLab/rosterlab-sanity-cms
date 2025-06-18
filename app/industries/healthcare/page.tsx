import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import TrustedBy from '@/components/sections/TrustedBy'
import Link from 'next/link'

export const metadata = {
  title: 'Healthcare Scheduling Solutions - RosterLab',
  description: 'Transform healthcare workforce management with AI-powered scheduling. Reduce admin time by 90%, ensure compliance, and improve staff satisfaction across all departments.',
}

export default function HealthcarePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Solutions for{" "}
                <span className="text-transparent bg-clip-text" style={{
                  backgroundImage: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
                }}>
                  Healthcare
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From ICU to aged care, radiology to emergency departments - optimize staffing across your entire healthcare organization with one intelligent platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/demo" className="bg-blue-600 text-white hover:bg-blue-700">
                  Book a Demo
                </Button>
                <Button href="/contact" className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://rosterlab.com/hubfs/healthcare-hero.png"
                alt="Healthcare workforce scheduling dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transforming Healthcare Workforce Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of healthcare professionals saving time and improving care quality with intelligent scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">90%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Less Admin Time</h3>
              <p className="text-gray-600">
                Reduce scheduling from days to minutes with AI automation
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">100%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
              <p className="text-gray-600">
                Meet all regulatory requirements and union agreements automatically
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">85%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Satisfaction</h3>
              <p className="text-gray-600">
                Improve work-life balance with fair, preference-based scheduling
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">30%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Reduction</h3>
              <p className="text-gray-600">
                Optimize staffing levels and reduce overtime expenses
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Healthcare Verticals */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Department
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built scheduling for the unique needs of each healthcare specialty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ICU/ED Card */}
            <Link href="/industries/healthcare/edicu" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ICU & Emergency Departments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    24/7 critical care coverage with skill mix optimization and surge capacity planning.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Aged Care Card */}
            <Link href="/industries/healthcare/agedcare" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    Aged Care Facilities
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Resident-focused scheduling with care level matching and compliance assurance.
                  </p>
                  <div className="flex items-center text-purple-600 font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Radiology Card */}
            <Link href="/industries/healthcare/radiology" className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Radiology Departments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Subspecialty coverage with equipment coordination and reading room optimization.
                  </p>
                  <div className="flex items-center text-teal-600 font-medium">
                    Learn more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Departments */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Also Supporting These Departments
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Operating Theatres</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pharmacy</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pathology</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Allied Health</h4>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Healthcare Scheduling
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed specifically for healthcare workforce management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Automation</h3>
              <p className="text-gray-600">
                Automatically enforce union rules, staffing ratios, and regulatory requirements.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">
                Instant notifications for shift changes, swaps, and emergency coverage needs.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Access</h3>
              <p className="text-gray-600">
                Staff can view schedules, request shifts, and manage swaps from any device.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Track overtime, costs, satisfaction, and identify optimization opportunities.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fair Distribution</h3>
              <p className="text-gray-600">
                Equitably allocate shifts, overtime, and on-call duties across your team.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Integration</h3>
              <p className="text-gray-600">
                Connect with HR, payroll, and clinical systems for seamless operations.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Success Story */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Real Results from Real Healthcare Organizations
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">7 days → 2 hours</div>
                  <p className="text-gray-600">Monthly roster creation time</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">$2.4M saved</div>
                  <p className="text-gray-600">Annual overtime reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">92% satisfaction</div>
                  <p className="text-gray-600">Staff schedule approval rating</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">Zero violations</div>
                  <p className="text-gray-600">Compliance breaches eliminated</p>
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 italic text-center">
                "RosterLab transformed our scheduling from a weekly nightmare to a streamlined process. Our nurses love the fairness and flexibility, and we've eliminated compliance issues entirely."
              </blockquote>
              <p className="text-center mt-4 text-gray-600">
                - Director of Nursing, 500-bed Hospital Network
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Healthcare Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading healthcare organizations optimizing their workforce with RosterLab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/demo" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}