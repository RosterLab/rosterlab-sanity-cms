import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiCheck, HiClock, HiTrendingUp, HiUsers } from 'react-icons/hi'

export const metadata = {
  title: 'AI-Generated Optimised Schedules - RosterLab',
  description: 'Revolutionize your scheduling with AI-powered optimization that creates perfect rosters in minutes, not days.',
}

const benefits = [
  {
    icon: HiClock,
    title: '90% Time Reduction',
    description: 'Generate complex rosters in minutes instead of days with our AI algorithms'
  },
  {
    icon: HiTrendingUp,
    title: 'Optimized Efficiency',
    description: 'Mathematical optimization ensures the most efficient staff allocation'
  },
  {
    icon: HiUsers,
    title: 'Staff Satisfaction',
    description: 'Fair and balanced schedules improve work-life balance and retention'
  }
]

const features = [
  '24/7 Automatic roster generation',
  'Complex constraint handling',
  'Real-time optimization',
  'Multiple shift patterns',
  'Legal compliance checking',
  'Scenario simulation',
  'Dynamic re-rostering',
  'Staff preference integration'
]

export default function AISchedulesPage() {
  return (
    <SiteLayout>
      <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI-Generated Optimised Schedules
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Harness the power of artificial intelligence and mathematical optimization to create perfect rosters automatically. Say goodbye to manual scheduling headaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/demo" className="bg-blue-600 text-white hover:bg-blue-700">
                  See AI in Action
                </Button>
                <Button href="/contact" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/images/generating.webp"
                alt="AI generating optimized schedules"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Benefits Section */}
      <Container>
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Power of AI Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
        </div>
      </Container>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Advanced AI Features
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our award-winning algorithms handle the most complex scheduling challenges with ease.
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
                alt="AI workforce optimization"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* How It Works Section */}
      <Container>
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How AI Scheduling Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Input Requirements</h3>
              <p className="text-gray-600">
                Define your staffing needs, constraints, and staff preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Processing</h3>
              <p className="text-gray-600">
                Our algorithms analyze millions of possible combinations to find the optimal solution
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect Roster</h3>
              <p className="text-gray-600">
                Receive an optimized roster that satisfies all constraints and maximizes efficiency
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience AI Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              See how our AI can transform your workforce management in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/demo" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
              >
                Book a Demo
              </Button>
              <Button 
                href="/signup" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
              >
                Try Free Now
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </div>
    </SiteLayout>
  )
}