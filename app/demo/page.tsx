import Container from '@/components/ui/Container'
import HubSpotForm from '@/components/forms/HubSpotForm'
import Button from '@/components/ui/Button'
import { HiPlay, HiClock, HiShieldCheck, HiTrendingUp, HiUsers } from 'react-icons/hi'

export const metadata = {
  title: 'Request a Demo - RosterLab',
  description: 'See RosterLab in action. Book a personalized demo and discover how AI-powered rostering can transform your healthcare scheduling.',
}

export default function DemoPage() {
  return (
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
          
          {/* Demo Video Placeholder */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative bg-neutral-900 rounded-lg overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiPlay className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-white text-lg">Watch Demo Video</p>
                  <p className="text-neutral-300 text-sm">See how RosterLab works in 3 minutes</p>
                </div>
              </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Demo Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Book Your Personalized Demo
            </h2>
            <p className="text-neutral-600 mb-6">
              Our team will show you exactly how RosterLab can solve your specific rostering challenges. 
              The demo takes about 30 minutes and includes:
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-neutral-700">Live demonstration of the AI rostering engine</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-neutral-700">Discussion of your specific scheduling challenges</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-neutral-700">Custom implementation timeline and pricing</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-neutral-700">Q&A with our rostering experts</span>
              </li>
            </ul>

            {/* HubSpot Form */}
            <HubSpotForm 
              formId="77e5a8c4-4303-4681-8c92-afa7b070380c"
              className="hubspot-form"
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
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

            {/* Testimonial */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={`star-${i}`} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-neutral-700 mb-4">
                &ldquo;RosterLab has revolutionized our scheduling process. What used to take our managers 
                8 hours now takes 30 minutes, and our staff love the fairer shift distribution.&rdquo;
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-neutral-900">Sarah Chen</p>
                  <p className="text-sm text-neutral-600">Nursing Manager, Auckland Hospital</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-neutral-50 rounded-lg p-6">
              <h3 className="font-semibold text-neutral-900 mb-3">Questions before the demo?</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Our team is available to answer any questions about RosterLab&apos;s capabilities.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-neutral-700">
                  <strong>Email:</strong> hello@rosterlab.com
                </p>
                <p className="text-neutral-700">
                  <strong>Phone:</strong> +64 9 307 4778
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}