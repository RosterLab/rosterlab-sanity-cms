import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { HiCheck, HiClock, HiUsers, HiCalendar, HiLightningBolt, HiShieldCheck, HiChartBar } from 'react-icons/hi'

export const metadata = {
  title: 'Open Shifts - Fill Shifts Instantly | RosterLab',
  description: 'Eliminate understaffing with RosterLab\'s Open Shifts feature. Let employees pick up available shifts instantly while maintaining fair distribution and compliance.',
}

const benefits = [
  {
    icon: HiLightningBolt,
    title: 'Instant Coverage',
    description: 'Fill open shifts in minutes, not hours. Employees get real-time notifications and can claim shifts with one tap.',
  },
  {
    icon: HiUsers,
    title: 'Fair Distribution',
    description: 'Ensure equitable shift opportunities with smart algorithms that track distribution and prevent favoritism.',
  },
  {
    icon: HiShieldCheck,
    title: 'Compliance Built-In',
    description: 'Automatically enforce overtime rules, rest requirements, and qualification checks before shifts are offered.',
  },
]

const howItWorks = [
  {
    step: '1',
    title: 'Post Open Shift',
    description: 'Manager creates an open shift with requirements, pay rate, and any special notes.',
  },
  {
    step: '2',
    title: 'Smart Notifications',
    description: 'Qualified, available employees receive instant notifications based on preferences and compliance rules.',
  },
  {
    step: '3',
    title: 'One-Click Claim',
    description: 'Employees view shift details and claim with a single tap. First qualified person gets the shift.',
  },
  {
    step: '4',
    title: 'Automatic Updates',
    description: 'Schedule updates instantly, all parties are notified, and compliance is maintained.',
  },
]

const features = [
  'Real-time push notifications to qualified staff',
  'Automatic overtime and compliance checking',
  'Priority offering based on seniority or performance',
  'Shift incentives and bonus pay options',
  'Mobile-first design for on-the-go access',
  'Integration with existing payroll systems',
  'Detailed analytics on fill rates and response times',
  'Customizable approval workflows',
]

export default function OpenShiftsPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fill Open Shifts in Minutes, Not Hours
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Stop scrambling for coverage. RosterLab's Open Shifts feature connects available staff with 
                unfilled shifts instantly, while maintaining fairness and compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/demo">See It In Action</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <HiCalendar className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Open Shifts Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Benefits Section */}
      <Container>
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Teams Love Open Shifts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform last-minute scheduling chaos into smooth, efficient operations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Open Shifts Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From posting to filling, every step is designed for speed and simplicity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container>
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Powerful Features for Modern Workforce Management
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Everything you need to manage open shifts efficiently while keeping employees happy and compliant.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-lg p-6 mb-4 shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Open Shift Alert</h4>
                    <HiClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Tomorrow, 2:00 PM - 10:00 PM</p>
                  <p className="text-sm text-gray-500 mb-4">Front Desk • $25/hour + $50 bonus</p>
                  <Button size="sm" className="w-full">Claim Shift</Button>
                </div>
                <div className="bg-white rounded-lg p-6 shadow opacity-75">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Weekend Coverage Needed</h4>
                    <HiChartBar className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">3 shifts available this weekend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Eliminate Scheduling Gaps?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who fill shifts faster and keep employees happier with RosterLab.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo">Book a Demo</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}