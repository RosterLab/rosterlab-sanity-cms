import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import TrustedBy from '@/components/sections/TrustedBy'
import Link from 'next/link'

export const metadata = {
  title: 'Rostering Software for Healthcare - RosterLab',
  description: 'Learn how our rostering software simplifies staff scheduling in healthcare. Create fair, efficient rosters that improve patient care, compliance & saves time.',
}

export default function HealthcarePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                <Button href="/book-a-demo" className="bg-blue-600 text-white hover:bg-blue-700">
                  Book a Demo
                </Button>
                <Button href="/contact" className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/doctors.svg"
                alt="Healthcare workforce scheduling dashboard"
                width={600}
                height={400}
                className="block w-full h-auto"
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
              <div className="text-5xl font-bold text-blue-500 mb-2">90%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Less Admin Time</h3>
              <p className="text-gray-600">
                Reduce scheduling from days to minutes with AI automation
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance</h3>
              <p className="text-gray-600">
                Meet all regulatory requirements and union agreements automatically
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-sky-500 mb-2">85%</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Satisfaction</h3>
              <p className="text-gray-600">
                Improve work-life balance with fair, preference-based scheduling
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">30%</div>
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
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/icu/pexels-shvetsa-4483340.jpg"
                    alt="ICU and Emergency Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/aged care/pexels-matthiaszomer-339620.jpg"
                    alt="Aged Care Facilities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="/images/radiology/accuray-5VkNa1LrS8A-unsplash.jpg"
                    alt="Radiology Department"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Operating Theatres</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pharmacy</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Pathology</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Allied Health</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Medical Clinics</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Dental Chains</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Veterinary Clinics</h4>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Mental Health Services</h4>
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
            <Link href="/feature/auto-roster-generation" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatically Generate a Roster</h3>
              <p className="text-gray-600 mb-3">
                Create optimal schedules in minutes using AI that balances all requirements.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/feature/preferences-rules" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-sky-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Automation</h3>
              <p className="text-gray-600 mb-3">
                Automatically enforce union rules, staffing ratios, and regulatory requirements.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/solutions/staff-roster-mobile-app" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Access & Notifications</h3>
              <p className="text-gray-600 mb-3">
                Staff can view schedules, request shifts, and manage swaps from any device.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/feature/shift-swaps" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shift Swaps</h3>
              <p className="text-gray-600 mb-3">
                Enable safe staff-initiated shift swaps with automated approval workflows.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/feature/re-rostering" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Re-rostering</h3>
              <p className="text-gray-600 mb-3">
                Instantly update rosters when staff call in sick or emergencies arise.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/feature/payroll-integration" className="block bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Integration</h3>
              <p className="text-gray-600 mb-3">
                Connect with HR, payroll, and clinical systems for seamless operations.
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
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
                  <div className="text-4xl font-bold text-blue-500 mb-2">120 → 40 hrs</div>
                  <p className="text-gray-600">Monthly roster creation time</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$40,000 saved</div>
                  <p className="text-gray-600">Annually</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-sky-500 mb-2">300+ Hours</div>
                  <p className="text-gray-600">Saved per year</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">Zero violations</div>
                  <p className="text-gray-600">Compliance breaches eliminated</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-green-600 mb-2">Better patient care, happier staff.</div>
              </div>

              <blockquote className="text-lg text-gray-700 italic text-center">
                "It's not just about saving hours. It's about confidence in the roster, about fairness, and about giving senior clinicians time back for patient care - not spreadsheets."
              </blockquote>
              <p className="text-center mt-4 text-gray-600">
                - Emergency Physician
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* CTA Section */}
      <section className="py-20" style={{
        background: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
      }}>
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
                href="/book-a-demo" 
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