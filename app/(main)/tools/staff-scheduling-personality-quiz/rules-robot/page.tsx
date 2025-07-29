'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function RulesRobotPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Sticky Card Animation */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                It sounds like you best fit:<br />
                <span className="text-primary-600">The Rules Robot</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You're the guardian of compliance, the protector of protocols. Your roster isn't just a schedule—it's a legally sound document that could withstand any audit.
              </p>
              <Link
                href="/tools/staff-scheduling-personality-quiz"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Share the quiz
              </Link>
            </div>
            
            {/* Sticky Card Container */}
            <div className="relative lg:h-[600px]">
              {/* Main Card - Sticky */}
              <div className="sticky top-24 z-20">
                <div className="relative w-80 h-96 mx-auto transform rotate-3 transition-transform duration-300 hover:rotate-0">
                  <Image
                    src="/images/quiz/rulebot.png"
                    alt="The Rules Robot"
                    fill
                    className="object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Background Cards for Stack Effect */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-80 h-96 bg-gray-200 rounded-2xl shadow-lg transform rotate-2 z-10"></div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-80 h-96 bg-gray-300 rounded-2xl shadow-md transform -rotate-1 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Content Area */}
      <div className="relative z-30 bg-white">
        {/* Tools Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Tools a Rules Robot needs to grow!
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-transform duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-gray-400">Tool Placeholder 1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance Checker</h3>
                <p className="text-gray-600">
                  Automated validation of all roster entries against current labor laws and regulations.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-transform duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-gray-400">Tool Placeholder 2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Audit Trail Generator</h3>
                <p className="text-gray-600">
                  Complete documentation of every roster change with timestamps and approvals.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-transform duration-300 hover:-translate-y-1">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-gray-400">Tool Placeholder 3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Policy Template Library</h3>
                <p className="text-gray-600">
                  Pre-built roster templates that comply with industry-specific regulations.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Try RosterLab for free
              </Link>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our recommendations for Rules Robots
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Blog Post 1 */}
              <article className="group cursor-pointer">
                <Link href="/blog">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Blog Image Placeholder</span>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    Understanding Labor Law Updates for 2024
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stay ahead of compliance requirements with our comprehensive guide to the latest labor law changes.
                  </p>
                  <span className="text-primary-600 font-medium group-hover:underline">
                    Read more →
                  </span>
                </Link>
              </article>
              
              {/* Blog Post 2 */}
              <article className="group cursor-pointer">
                <Link href="/blog">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Blog Image Placeholder</span>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    Building Bulletproof Rosters: A Compliance Guide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to create rosters that satisfy both operational needs and regulatory requirements.
                  </p>
                  <span className="text-primary-600 font-medium group-hover:underline">
                    Read more →
                  </span>
                </Link>
              </article>
              
              {/* Blog Post 3 */}
              <article className="group cursor-pointer">
                <Link href="/blog">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">Blog Image Placeholder</span>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    Automating Compliance Checks in Your Roster System
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover how technology can help you maintain compliance without the manual overhead.
                  </p>
                  <span className="text-primary-600 font-medium group-hover:underline">
                    Read more →
                  </span>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}