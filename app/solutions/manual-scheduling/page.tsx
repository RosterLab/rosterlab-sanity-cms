import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiCheck, HiClock, HiTrendingUp, HiUsers, HiShieldCheck } from 'react-icons/hi'

export const metadata = {
  title: 'Smart Manual Scheduling - RosterLab',
  description: 'Simplify your workforce management with intelligent manual scheduling tools. Move from spreadsheets to smart digital scheduling.',
}

const benefits = [
  {
    icon: HiClock,
    title: '90% Time Saving',
    description: 'Create rosters faster with intelligent setup and visual compliance warnings'
  },
  {
    icon: HiTrendingUp,
    title: 'Improved Efficiency',
    description: 'Smart statistics and workload balancing help optimize staff allocation'
  },
  {
    icon: HiUsers,
    title: 'Better Staff Satisfaction',
    description: 'Fair scheduling and easy shift management improve team morale'
  }
]

const features = [
  'Cloud-based digital scheduling',
  'Skill and seniority-based rostering',
  'Real-time compliance warnings',
  'Staff request tracking',
  'Mobile app access',
  'Fair workload balancing',
  'Long and short-term integration',
  'Visual scheduling interface'
]

const painPoints = [
  {
    title: 'Manual Spreadsheet Chaos',
    description: 'Multiple versions, lost updates, and formula errors making scheduling a nightmare'
  },
  {
    title: 'Compliance Risks',
    description: 'Missing regulatory requirements and overtime rules without proper tracking'
  },
  {
    title: 'Communication Gaps',
    description: 'Staff not aware of schedule changes or unable to request time off easily'
  },
  {
    title: 'Time Consuming',
    description: 'Hours spent each week manually creating and adjusting complex rosters'
  }
]

export default function ManualSchedulingPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                SMART DIGITAL SCHEDULING
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your free digital scheduling tool
              </h1>
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Skill and seniority rostering</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Seamlessly integrate your long and short term rosters</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Fair workload balancing from the get go</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Move away from spreadsheets and into the cloud</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="https://app.rosterlab.com" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-full font-semibold">
                  Start for Free
                </Button>
                <Button href="/book-a-demo" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold">
                  Discover AI Rosters
                </Button>
              </div>
              
              {/* Free forever notice */}
              <div className="mt-6">
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
                  <span className="font-medium">✓ Free forever</span>
                  <span className="font-medium">✓ No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-lg flex items-center justify-center" style={{ width: '600px', height: '400px' }}>
                <span className="text-gray-500 text-xl">Placeholder Image</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pain Points Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Having a headache making rosters for shift workers?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              You&apos;re not alone. Healthcare managers waste hours each week struggling with outdated scheduling methods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Smart Solution
          </h2>
          
          {/* Image Placeholder */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-400 text-lg">Image Placeholder</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Intelligent Manual Control
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Keep full control over your scheduling while getting intelligent assistance and real-time guidance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image
                src="/images/optimise-your-workforce-with-ai.png"
                alt="Smart manual scheduling interface"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How Smart Manual Scheduling Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Setup Your Rules</h3>
              <p className="text-gray-600">
                Define staff skills, seniority levels, and scheduling constraints once
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Create with Guidance</h3>
              <p className="text-gray-600">
                Build rosters manually with real-time warnings and smart suggestions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monitor & Adjust</h3>
              <p className="text-gray-600">
                Track compliance, workload balance, and staff satisfaction in real-time
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Trusted By Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Leaders
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Join Te Whatu Ora, Western Health, Bupa and other leading healthcare organizations
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">Healthcare</div>
                <div className="text-sm text-gray-600">Specialized</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiUsers className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Staff Scheduled</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiClock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-2xl font-bold text-gray-900">5.0</div>
                <div className="text-sm text-gray-600">Google Reviews</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div 
        className="py-20 relative"
        style={{
          background: 'linear-gradient(to right, rgba(0, 69, 189, 0.4) 2%, rgba(2, 158, 191, 0.4) 50%, rgba(4, 246, 192, 0.4) 100%)'
        }}
      >
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Simplify Your Scheduling?
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              Start with our free digital scheduling tool and transform your workforce management today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="https://app.rosterlab.com" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4"
              >
                Start for Free
              </Button>
              <Button 
                href="/demo" 
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </>
    </SiteLayout>
  )
}