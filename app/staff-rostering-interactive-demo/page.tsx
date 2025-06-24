'use client'

import Container from '@/components/ui/Container'
import ContactForm from '@/components/forms/HubSpotForm'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiPlay, HiClock, HiShieldCheck, HiTrendingUp, HiUsers } from 'react-icons/hi'
import { useEffect } from 'react'

export default function DemoPage() {
  useEffect(() => {
    // Load HubSpot meetings embed script
    const script = document.createElement('script')
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <SiteLayout>
      <div className="py-16 bg-gradient-to-br from-blue-50 to-primary-50 min-h-screen">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            See RosterLab in Action
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Discover how our AI-powered rostering platform can save your healthcare team 90% of scheduling time 
            while improving staff satisfaction and operational efficiency.
          </p>
          
          {/* Interactive Demo */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative rounded-lg overflow-hidden aspect-video shadow-2xl">
              <iframe 
                title="Rosterlab interactive media" 
                loading="lazy" 
                className="w-full h-full"
                webkitallowfullscreen="true" 
                mozallowfullscreen="true" 
                allowFullScreen
                src="https://demo.arcade.software/qKV5GmMinypq2yXM19Xi?embed"
              />
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HiClock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">90% Time Saving</h3>
            <p className="text-neutral-600 text-sm">Generate complex rosters in minutes, not hours</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">10% Better Efficiency</h3>
            <p className="text-neutral-600 text-sm">Optimize staff allocation automatically</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Better Staff Satisfaction</h3>
            <p className="text-neutral-600 text-sm">Fairer, safer rosters for your team</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HiShieldCheck className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Compliance Ready</h3>
            <p className="text-neutral-600 text-sm">Built for healthcare regulations</p>
          </div>
        </div>

        {/* HubSpot Meeting Scheduler */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Speak to a rostering expert
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Choose a time that works best for you. Our product experts will show you how RosterLab can solve your specific scheduling challenges.
          </p>
          
          {/* HubSpot Meeting Scheduler Embed */}
          <div className="meetings-iframe-container" data-src="https://meetings.rosterlab.com/meetings/daniel-ge/meeting?embed=true"></div>
        </div>

        {/* Additional Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Quick Start Option */}
            <div className="bg-primary-600 rounded-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to Start Now?</h3>
              <p className="mb-6 text-primary-100">
                Skip the demo and jump straight into our free trial. 
                Set up your first roster in minutes with our guided onboarding.
              </p>
              <Button 
                href="https://app.rosterlab.com"
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                Start Free Trial
              </Button>
            </div>

            {/* Contact Info */}
            <div className="bg-neutral-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Questions before the demo?</h3>
              <p className="text-neutral-600 mb-6">
                Our team is available to answer any questions about RosterLab&apos;s capabilities.
              </p>
              <div className="space-y-2">
                <p className="text-neutral-700">
                  <strong>Email:</strong> hello@rosterlab.com
                </p>
                <p className="text-neutral-700">
                  <strong>Phone:</strong> +64 9 307 4778
                </p>
              </div>
            </div>
        </div>

        {/* Testimonial - Full Width */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200 shadow-lg text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={`star-${i}`} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
            <blockquote className="text-gray-700 italic text-lg mb-4">
              "RosterLab has revolutionized our scheduling process. What used to take our managers 8 hours now takes 30 minutes, and our staff love the fairer shift distribution."
            </blockquote>
            <cite className="text-gray-600 font-medium">
              - Sarah Chen, Nursing Manager, Auckland Hospital
            </cite>
          </div>
        </div>
      </Container>
      </div>
    </SiteLayout>
  )
}