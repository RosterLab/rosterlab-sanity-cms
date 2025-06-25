import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Smart AI Rostering Software for All Industries - RosterLab',
  description: 'Simplify staff scheduling with our smart AI rostering software. Save time, boost efficiency & create fair rosters across industries that require rostering.',
}

export default function IndustriesPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Rostering Software for Industries with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Complex Schedules
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're managing nurses, teachers, call center agents, or pilots - RosterLab's intelligent scheduling adapts to your industry's unique requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/demo" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Book a Demo
              </Button>
              <Button href="/roi-calculator" className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50">
                ROI Calculator
              </Button>
            </div>
            
            {/* Manufacturing Process Illustration */}
            <div className="flex justify-center mt-12">
              <Image
                src="/images/illustration/Manufacturing Process-pana.svg"
                alt="Manufacturing process illustration"
                width={600}
                height={400}
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Healthcare Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Healthcare
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Healthcare Workforce Excellence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                From ICU to aged care facilities, optimize staffing while ensuring compliance, skill mix requirements, and staff wellbeing. Our AI understands the complexities of 24/7 healthcare operations.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">90% faster scheduling</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">100% compliance</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Skill mix optimization</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fair shift distribution</span>
                </div>
              </div>
              <Link href="/industries/healthcare">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Explore Healthcare Solutions
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/industries/healthcare/edicu" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-1">ICU & ED</h3>
                    <p className="text-sm text-gray-600">Critical care coverage</p>
                  </Link>
                  <Link href="/industries/healthcare/agedcare" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-1">Aged Care</h3>
                    <p className="text-sm text-gray-600">Resident-focused care</p>
                  </Link>
                  <Link href="/industries/healthcare/radiology" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-1">Radiology</h3>
                    <p className="text-sm text-gray-600">Imaging optimization</p>
                  </Link>
                  <Link href="/industries/healthcare" className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow block">
                    <h3 className="font-semibold text-gray-900 mb-1">More...</h3>
                    <p className="text-sm text-gray-600">All departments</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Industries Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transforming Workforce Management Across Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI adapts to your industry's unique scheduling challenges, compliance requirements, and operational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Education */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_1.webp"
                  alt="Education industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Education</h3>
                <p className="text-gray-600 mb-4">
                  Schedule teachers, support staff, and substitutes while balancing class requirements, specializations, and professional development.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Subject expertise matching
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Substitute management
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Break duty scheduling
                  </li>
                </ul>
              </div>
            </div>

            {/* Call Centers */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_2.webp"
                  alt="Call centers industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Centers</h3>
                <p className="text-gray-600 mb-4">
                  Optimize agent scheduling to meet service levels while managing breaks, training, and multi-skill routing requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Service level optimization
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-channel coverage
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Peak hour management
                  </li>
                </ul>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_3.webp"
                  alt="Transportation industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transportation</h3>
                <p className="text-gray-600 mb-4">
                  Schedule drivers, pilots, and crew while managing hours of service, route qualifications, and regulatory compliance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Hours of service tracking
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Route qualification matching
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Rest period compliance
                  </li>
                </ul>
              </div>
            </div>

            {/* Hospitality */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_4.webp"
                  alt="Hospitality industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hospitality</h3>
                <p className="text-gray-600 mb-4">
                  Balance front desk, housekeeping, kitchen, and service staff across varying occupancy levels and event schedules.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Occupancy-based staffing
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-department coordination
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Event staffing flexibility
                  </li>
                </ul>
              </div>
            </div>

            {/* Manufacturing */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_5.webp"
                  alt="Manufacturing & logistics industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Manufacturing & Logistics</h3>
                <p className="text-gray-600 mb-4">
                  Manage shift patterns, skill requirements, and production line coverage while maintaining safety and efficiency standards.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Production line optimization
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Shift pattern management
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Skill certification tracking
                  </li>
                </ul>
              </div>
            </div>

            {/* Airports */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 relative">
                <Image
                  src="https://rosterlab.com/hubfs/industry_6.webp"
                  alt="Airports industry scheduling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Airports</h3>
                <p className="text-gray-600 mb-4">
                  Coordinate ground crew, security, and support staff across terminals while managing flight schedules and security clearances.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flight schedule synchronization
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Security clearance management
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-terminal coordination
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Benefits */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Universal Benefits, Industry-Specific Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No matter your industry, RosterLab delivers the same core benefits while adapting to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Automatic Scheduling</h3>
              <p className="text-gray-600">
                Create optimal schedules in minutes, not days or weeks
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Compliance</h3>
              <p className="text-gray-600">
                Automatically enforce all rules, regulations, and agreements
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cost Optimization</h3>
              <p className="text-gray-600">
                Reduce overtime, minimize agency costs, optimize coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Happy Teams</h3>
              <p className="text-gray-600">
                Fair schedules that respect preferences and work-life balance
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One Platform, Any Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI adapts to your specific requirements while maintaining a simple, intuitive workflow.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Configure Your Rules</h3>
                  <p className="text-gray-600">
                    Set up your industry-specific requirements, compliance rules, and operational constraints once.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Import Your Data</h3>
                  <p className="text-gray-600">
                    Upload staff details, skills, certifications, and preferences. Integrate with existing systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Optimal Schedules</h3>
                  <p className="text-gray-600">
                    Our AI creates compliant, fair schedules in minutes, considering all your constraints.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Publish & Manage</h3>
                  <p className="text-gray-600">
                    Share schedules instantly, handle changes dynamically, and track everything in real-time.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button href="/demo" className="bg-indigo-600 text-white hover:bg-indigo-700">
                See an Example
              </Button>
            </div>
          </div>
        </Container>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Workforce Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of organizations saving time and money with intelligent scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/demo" 
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Book a Demo
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600"
              >
                Discuss Your Industry
              </Button>
            </div>
          </div>
        </Container>
      </section>

    </SiteLayout>
  )
}