import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import TrustedBy from '@/components/sections/TrustedBy'

export const metadata = {
  title: 'Radiology Staff Scheduling Software - RosterLab',
  description: 'Learn how our rostering software simplifies complex staff scheduling in Radiology. Build fair, compliant rosters that are flexible & helps save time.',
}

export default function RadiologyPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Scheduling your shifts just got a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                  whole lot easier
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Reduce rostering time by 92%. Optimize radiologist coverage, equipment utilization, and patient throughput with intelligent scheduling.
              </p>
              <div className="mb-8 space-y-2">
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Skill and seniority rostering
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Seamlessly integrate your long and short term rosters
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Fair workload balancing from the get go
                </p>
                <p className="text-gray-600 flex items-center justify-start">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Move away from spreadsheets and into the cloud
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/book-a-demo" className="bg-teal-600 text-white hover:bg-teal-700">
                  Book a Demo
                </Button>
                <Button href="https://app.rosterlab.com/l" className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50">
                  Get Started
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/illustration/radiology.svg"
                alt="Radiology scheduling dashboard"
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
              Built for specific radiology rostering challenges.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Balance subspecialty coverage, equipment allocation, and reading room assignments while maintaining optimal patient flow and report turnaround times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">95% Time Reduction</h3>
              <p className="text-gray-600">
                Create monthly schedules in hours, not days. Automate complex subspecialty and equipment matching.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skill-Based Matching</h3>
              <p className="text-gray-600">
                Automatically match radiologists to modalities, subspecialties, and procedural requirements.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Optimized Throughput</h3>
              <p className="text-gray-600">
                Balance workload across teams while maximising scanner utilisation and minimising patient wait times.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Specific Features */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Built for Modern Radiology Departments
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Site Coordination</h3>
                    <p className="text-gray-600">
                      Manage radiologists across multiple locations, reading rooms, and remote work arrangements seamlessly.
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Subspecialty Coverage</h3>
                    <p className="text-gray-600">
                      Ensure neuroradiology, MSK, pediatric, and interventional expertise is available when needed.
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">On-Call Optimization</h3>
                    <p className="text-gray-600">
                      Fairly distribute emergency coverage while respecting preferences and maintaining work-life balance.
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Equipment Scheduling</h3>
                    <p className="text-gray-600">
                      Coordinate staff schedules with MRI, CT, PET, and intervention suite availability for maximum efficiency.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button href="/blog/whanganui-radiography-department-embraces-ai-rostering" className="bg-teal-600 text-white hover:bg-teal-700">
                  Read case study
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Department Impact</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-3xl font-bold text-teal-600">7-8 days → 2-3 hours</div>
                  <div className="text-gray-600">Schedule creation time</div>
                </div>
                <div className="border-b pb-4">
                  <div className="text-3xl font-bold text-cyan-600">30%</div>
                  <div className="text-gray-600">Increase in scanner utilization</div>
                </div>
                <div className="border-b pb-4">
                  <div className="text-3xl font-bold text-blue-600">90%</div>
                  <div className="text-gray-600">Reduction in scheduling conflicts</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">25%</div>
                  <div className="text-gray-600">Faster report turnaround</div>
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
              Streamlined Radiology Scheduling Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From long-term planning to daily adjustments, manage every aspect of your imaging department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a href="/feature/preferences-rules" className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-teal-600 mb-3">01</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Define Coverage Needs</h3>
              <p className="text-gray-600 mb-3">
                Set modality requirements, reading room assignments, and subspecialty coverage targets.
              </p>
              <span className="text-teal-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/feature/preferences-rules" className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-cyan-600 mb-3">02</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Input Constraints</h3>
              <p className="text-gray-600 mb-3">
                Add radiologist certifications, preferences, CME schedules, and equipment availability.
              </p>
              <span className="text-cyan-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/feature/auto-roster-generation" className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-blue-600 mb-3">03</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Schedule</h3>
              <p className="text-gray-600 mb-3">
                AI creates optimal monthly schedules balancing all requirements in minutes.
              </p>
              <span className="text-blue-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/feature/re-rostering" className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-indigo-600 mb-3">04</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review & Adjust</h3>
              <p className="text-gray-600 mb-3">
                Fine-tune assignments, preview impact of changes, and approve final schedules.
              </p>
              <span className="text-indigo-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/feature/payroll-integration" className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-purple-600 mb-3">05</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Publish & Sync</h3>
              <p className="text-gray-600 mb-3">
                Share schedules with PACS, RIS, and calendar systems automatically.
              </p>
              <span className="text-purple-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a href="/solutions/ai-schedules" className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group block">
              <div className="text-3xl font-bold text-pink-600 mb-3">06</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor & Optimize</h3>
              <p className="text-gray-600 mb-3">
                Track workload distribution, turnaround times, and continuously improve.
              </p>
              <span className="text-pink-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform">
                Read more 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </Container>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Modern Cloud Platform for Radiology Rostering
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure, accessible, and integrated with your existing systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Optimise for skill mix</h3>
              <p className="text-sm text-gray-600">
                Automatically match radiologists to modalities and subspecialties for optimal coverage.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compliant with unions</h3>
              <p className="text-sm text-gray-600">
                Ensure all schedules meet union agreements and regulatory requirements automatically.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fairer shift allocation</h3>
              <p className="text-sm text-gray-600">
                Distribute shifts, on-call duties, and workload equitably across your team.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Streamline staff requests</h3>
              <p className="text-sm text-gray-600">
                Manage leave requests, shift swaps, and preferences efficiently in one system.
              </p>
            </div>
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
              Transform Your Radiology Department Scheduling
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading imaging centres saving days of scheduling time every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/book-a-demo" 
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                See It In Action
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600"
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}