'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function RulesRobotPage() {
  const [copied, setCopied] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleCopyLink = () => {
    const quizUrl = `${window.location.origin}/tools/staff-scheduling-personality-quiz`
    navigator.clipboard.writeText(quizUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Flip the card when user scrolls past 200px
      if (scrollPosition > 200 && !isFlipped) {
        setIsFlipped(true)
      } else if (scrollPosition <= 200 && isFlipped) {
        setIsFlipped(false)
      }
      
      // Show celebration when reaching the end of "As the Rules Robot" section (approximately 2 viewport heights)
      if (scrollPosition > windowHeight * 1.5 && !showCelebration) {
        setShowCelebration(true)
        // Hide celebration after 3 seconds
        setTimeout(() => setShowCelebration(false), 3000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFlipped, showCelebration])

  return (
    <div className="bg-white">
      {/* Wrapper for Hero and As Rules Robot sections with sticky card */}
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Content for both sections */}
            <div>
              {/* Hero Section - Full Screen */}
              <section className="min-h-screen flex items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                    It sounds like you best fit:<br />
                    <span className="text-primary-600">The Rules Robot</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    You're the guardian of compliance, the protector of protocols. Your roster isn't just a schedule—it's a legally sound document that could withstand any audit.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      <svg 
                        className="h-5 w-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                      </svg>
                      {copied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <Link
                      href="/solutions/ai-staff-scheduling"
                      className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-primary-600 border border-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Learn more about AI Rostering
                    </Link>
                  </div>
                  
                  {/* Scroll Down Arrow */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg 
                      className="w-6 h-6 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                  </div>
                </div>
              </section>

              {/* As the Rules Robot Section - Full Screen */}
              <section className="min-h-screen flex items-center relative">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    As the Rules Robot…
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    You navigate the complex world of staff scheduling with precision and an unwavering commitment to compliance. Your methodical approach ensures every roster is legally sound and audit-ready.
                  </p>
                  
                  {/* Key Characteristics */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Master of Compliance:</span> Encyclopedic knowledge of labor laws, regulations, and company policies
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Documentation Champion:</span> Every decision has a paper trail, creating bulletproof audit records
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Process Perfectionist:</span> Systematic approaches that eliminate guesswork and reduce errors
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Risk Minimizer:</span> Proactively identifies and addresses potential compliance issues before they arise
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Detail-Oriented:</span> Nothing escapes your careful review, from overtime calculations to break requirements
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Starry Celebration */}
                {showCelebration && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      >
                        <svg
                          className="w-6 h-6 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    ))}
                    <style jsx>{`
                      @keyframes twinkle {
                        0%, 100% {
                          opacity: 0;
                          transform: scale(0.5) rotate(0deg);
                        }
                        50% {
                          opacity: 1;
                          transform: scale(1) rotate(180deg);
                        }
                      }
                    `}</style>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column - Sticky Card that spans both sections */}
            <div className="relative hidden lg:block">
              <div className="sticky top-32 min-h-screen flex items-center">
                {/* Card container with 3D flip effect */}
                <div className="relative w-96 h-[28rem] mx-auto" style={{ perspective: '1000px' }}>
                  <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front of card */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative w-full h-full transform rotate-3 transition-transform duration-300 hover:rotate-0">
                        <Image
                          src="/images/quiz/test2.png"
                          alt="The Rules Robot"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="relative w-full h-full transform rotate-3 transition-transform duration-300 hover:rotate-0">
                        <Image
                          src="/images/quiz/test3.png"
                          alt="The Rules Robot - Back"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Tools Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
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

      {/* Recommendations Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our recommendations for Rules Robots
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/manage-night-shift-planning-wellbeing-effectively" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Manage Night Shift Planning & Wellbeing Effectively
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Learn how to create compliant night shift schedules that prioritize employee wellbeing while meeting operational needs.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
            
            {/* Blog Post 2 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/fairer-scheduling-at-work-reducing-shift-bias" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Fairer Scheduling at Work: Reducing Shift Bias
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Discover how to implement fair scheduling practices that eliminate bias and ensure compliance with equality regulations.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
            
            {/* Blog Post 3 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/staff-rostering-to-payroll-the-right-way-to-do-it" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Staff Rostering to Payroll: The Right Way to Do It
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Master the process of converting rosters to payroll accurately while maintaining compliance with wage regulations.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}