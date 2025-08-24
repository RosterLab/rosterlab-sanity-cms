'use client'

import Container from '@/components/ui/Container'
import SiteLayout from '@/components/layout/SiteLayout'
import Link from 'next/link'
import { HiClock, HiCheck, HiUserGroup, HiLightningBolt, HiShieldCheck, HiChartBar } from 'react-icons/hi'
import { useEffect, useState, useRef } from 'react'

export default function BookADemoClient() {
  const [shouldLoadHubSpot, setShouldLoadHubSpot] = useState(false)
  const meetingsContainerRef = useRef<HTMLDivElement>(null)
  const [isHubSpotLoaded, setIsHubSpotLoaded] = useState(false)

  useEffect(() => {
    // Load HubSpot fonts CSS immediately
    const hubspotFontsLink = document.createElement('link')
    hubspotFontsLink.rel = 'stylesheet'
    hubspotFontsLink.href = '/styles/hubspot-fonts.css'
    document.head.appendChild(hubspotFontsLink)

    // Only add preconnect hints initially
    const preconnect1 = document.createElement('link')
    preconnect1.rel = 'preconnect'
    preconnect1.href = 'https://static.hsappstatic.net'
    document.head.appendChild(preconnect1)

    const preconnect2 = document.createElement('link')
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://meetings.rosterlab.com'
    document.head.appendChild(preconnect2)

    // Set up Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadHubSpot) {
            setShouldLoadHubSpot(true)
          }
        })
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01
      }
    )

    if (meetingsContainerRef.current) {
      observer.observe(meetingsContainerRef.current)
    }

    return () => {
      observer.disconnect()
      if (document.head.contains(preconnect1)) document.head.removeChild(preconnect1)
      if (document.head.contains(preconnect2)) document.head.removeChild(preconnect2)
      if (document.head.contains(hubspotFontsLink)) document.head.removeChild(hubspotFontsLink)
    }
  }, [shouldLoadHubSpot])

  // Load HubSpot only when needed
  useEffect(() => {
    if (!shouldLoadHubSpot || isHubSpotLoaded) return

    // Add font preload hints
    const fontPreload = document.createElement('link')
    fontPreload.rel = 'preload'
    fontPreload.as = 'font'
    fontPreload.type = 'font/woff2'
    fontPreload.href = 'https://static.hsappstatic.net/fonts/LexendDeca-Light.woff2'
    fontPreload.crossOrigin = 'anonymous'
    document.head.appendChild(fontPreload)

    // Load HubSpot meetings embed script with lower priority
    const script = document.createElement('script')
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    script.async = true
    script.defer = true
    
    // Use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        document.body.appendChild(script)
        setIsHubSpotLoaded(true)
      }, { timeout: 2000 })
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        document.body.appendChild(script)
        setIsHubSpotLoaded(true)
      }, 100)
    }

    // Mark fonts as loaded after a delay
    const timer = setTimeout(() => {
      document.querySelector('.meetings-iframe-container')?.classList.add('fonts-loaded')
    }, 1500)

    return () => {
      clearTimeout(timer)
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(fontPreload)) {
        document.head.removeChild(fontPreload)
      }
    }
  }, [shouldLoadHubSpot, isHubSpotLoaded])

  return (
    <SiteLayout>
      <div className="pt-16 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Book Your Personalised Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how RosterLab's AI-powered scheduling can transform your workforce management in just 30 minutes.
            </p>
          </div>

          {/* HubSpot Meeting Scheduler Embed */}
          {/* Start of Meetings Embed Script */}
          <div 
            ref={meetingsContainerRef}
            className="meetings-iframe-container overflow-x-auto max-w-full min-h-[600px] relative mb-12" 
            data-src="https://meetings.rosterlab.com/meetings/daniel-ge/demo?embed=true"
          >
            {!isHubSpotLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading calendar...</p>
                </div>
              </div>
            )}
          </div>
          {/* End of Meetings Embed Script */}

          {/* Benefits Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiClock className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-1">90% Time Saved</h3>
              <p className="text-blue-700 text-sm">Create schedules in minutes instead of days</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiCheck className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="font-semibold text-green-900 mb-1">100% Compliance</h3>
              <p className="text-green-700 text-sm">Automatically meet all regulatory requirements</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiUserGroup className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-1">Happier Teams</h3>
              <p className="text-purple-700 text-sm">Fair schedules that respect preferences</p>
            </div>
          </div>

          {/* Demo Information Grid - Hidden on mobile/tablet */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* What to Expect */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What to Expect in Your Demo
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Understand Your Challenges</h3>
                      <p className="text-gray-600 text-xs">
                        We'll discuss your current scheduling process and identify pain points
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Live Platform Demonstration</h3>
                      <p className="text-gray-600 text-xs">
                        See RosterLab in action with scenarios relevant to your <Link href="/industries" className="text-blue-600 hover:text-blue-700 underline">industry</Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">ROI Analysis</h3>
                      <p className="text-gray-600 text-xs">
                        Calculate potential time and cost savings for your organisation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Implementation Roadmap</h3>
                      <p className="text-gray-600 text-xs">
                        Clear next steps and timeline to get you up and running
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tailored to your roster type and industry
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <HiLightningBolt className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-gray-700 text-sm">Healthcare shift patterns</span>
                  </div>
                  <div className="flex items-center">
                    <HiShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700 text-sm">24/7 coverage models</span>
                  </div>
                  <div className="flex items-center">
                    <HiUserGroup className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-gray-700 text-sm">Rotating shift schedules</span>
                  </div>
                  <div className="flex items-center">
                    <HiChartBar className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-gray-700 text-sm">Industry compliance rules</span>
                  </div>
                  <div className="flex items-center">
                    <HiLightningBolt className="w-5 h-5 text-orange-500 mr-2" />
                    <span className="text-gray-700 text-sm">Handles complexity</span>
                  </div>
                  <div className="flex items-center">
                    <HiShieldCheck className="w-5 h-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700 text-sm">Fairer shift allocation</span>
                  </div>
                  <div className="flex items-center">
                    <HiUserGroup className="w-5 h-5 text-pink-500 mr-2" />
                    <span className="text-gray-700 text-sm">Meet more staff preferences</span>
                  </div>
                  <div className="flex items-center">
                    <HiShieldCheck className="w-5 h-5 text-teal-500 mr-2" />
                    <span className="text-gray-700 text-sm">Safer & healthier teams</span>
                  </div>
                  <div className="flex items-center">
                    <HiClock className="w-5 h-5 text-red-500 mr-2" />
                    <span className="text-gray-700 text-sm">Manage fatigue</span>
                  </div>
                  <div className="flex items-center">
                    <HiChartBar className="w-5 h-5 text-cyan-500 mr-2" />
                    <span className="text-gray-700 text-sm">Save time and money</span>
                  </div>
                </div>
              </div>

          </div>

          {/* Testimonial - Hidden on mobile/tablet */}
          <div className="hidden lg:block bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500 mb-12 text-center">
            <blockquote className="text-gray-700 italic mb-3">
              "RosterLab has saved me countless hours... I have recommended this service to everyone I know"
            </blockquote>
            <cite className="text-gray-600 text-sm font-medium block">
              Peter<br />
              Senior Registrar ICU, Western Australia
            </cite>
            <Link href="/case-studies" className="inline-block mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium underline">
              Read case study
            </Link>
          </div>

        </Container>

        {/* Bottom CTA - Full Width */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">
                Can't Find a Suitable Time?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Contact us directly and we'll work around your schedule
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@rosterlab.com"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Email Us
                </a>
                <a
                  href="/staff-rostering-interactive-demo"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Explore our interactive demo
                </a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}