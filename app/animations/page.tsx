import Container from '@/components/ui/Container'
import SiteLayout from '@/components/layout/SiteLayout'
import SchedulingModule from '@/components/ui/SchedulingModule'
import Image from 'next/image'

export const metadata = {
  title: 'Interactive Animations - RosterLab',
  description: 'Experience RosterLab\'s interactive scheduling animations and see how our AI-powered optimization works in real-time.',
}

export default function AnimationsPage() {
  return (
    <SiteLayout>
      <div className="bg-gray-50 min-h-screen py-16">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Scheduling Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience how RosterLab transforms complex emergency department scheduling with our AI-powered optimization engine
            </p>
          </div>

          {/* Interactive Module Section */}
          <div className="mb-16">
            <SchedulingModule />
          </div>


          {/* Feature Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Optimization</h3>
              <p className="text-gray-600">Watch as our AI instantly optimizes schedules for better coverage and fairness</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Compliance</h3>
              <p className="text-gray-600">Automatically ensures all shifts meet regulatory requirements and staff preferences</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staff Satisfaction</h3>
              <p className="text-gray-600">Fair distribution of shifts leads to happier teams and better retention</p>
            </div>
          </div>

          {/* Digital Scheduling Image Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Digital Staff Scheduling Software
            </h2>
            <div className="relative w-full max-w-4xl mx-auto">
              <Image
                src="/images/free product/Group 6526.webp"
                alt="Digital Staff Scheduling Software Interface"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-md"
                priority
              />
            </div>
            <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto">
              Our intuitive interface makes it easy to create, manage, and optimize staff schedules across multiple departments and locations.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Scheduling?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              See how RosterLab can optimize your workforce management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-a-demo"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Demo
              </a>
              <a
                href="/solutions/ai-schedules"
                className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  )
}