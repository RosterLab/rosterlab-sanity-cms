import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiLightBulb, HiUserGroup, HiShieldCheck, HiClock, HiChartBar, HiSupport } from 'react-icons/hi'

export const metadata = {
  title: 'Why Choose Us - RosterLab',
  description: 'Why do clients choose RosterLab as their staff scheduling solution? Our unique AI scheduling generator solves even the most complex staff schedules. Learn more.',
  openGraph: {
    title: 'Why Choose Us - RosterLab',
    description: 'Why do clients choose RosterLab as their staff scheduling solution? Our unique AI scheduling generator solves even the most complex staff schedules. Learn more.',
    images: [
      {
        url: '/images/og images/WhyChooseUs.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Us - RosterLab',
    description: 'Why do clients choose RosterLab as their staff scheduling solution? Our unique AI scheduling generator solves even the most complex staff schedules. Learn more.',
    images: ['/images/og images/WhyChooseUs.png'],
  },
}

const reasons = [
  {
    icon: HiLightBulb,
    title: 'Industry-Leading AI Technology',
    description: 'Our award-winning optimisation algorithms create schedules 90% faster while ensuring fairness and compliance.'
  },
  {
    icon: HiUserGroup,
    title: 'Industry Expertise',
    description: 'Proven across healthcare, manufacturing, retail, and service industries with deep understanding of sector-specific scheduling challenges.'
  },
  {
    icon: HiShieldCheck,
    title: 'Proven Track Record',
    description: 'Trusted by leading organisations across Australia and New Zealand with exceptional customer satisfaction.'
  },
  {
    icon: HiClock,
    title: 'Rapid Implementation',
    description: 'Get up and running in weeks, not months, with our streamlined onboarding and dedicated support team.'
  },
  {
    icon: HiChartBar,
    title: 'Measurable ROI',
    description: 'Significant reduction in scheduling time and substantial decrease in overtime costs within the first year.'
  },
  {
    icon: HiSupport,
    title: '24/7 Support',
    description: 'Round-the-clock support from scheduling experts who understand your challenges and goals.'
  }
]

const differentiators = [
  {
    title: 'World-Class Technology',
    points: [
      'International Nurse Rostering Competition winners',
      'PhD-level research in optimisation algorithms',
      'Continuous AI improvements and updates'
    ]
  },
  {
    title: 'Handles Complexity',
    points: [
      'Purpose-built for complex scheduling',
      'Understands complex compliance requirements',
      'Handles multiple departments and skill sets',
      'Integrates with existing systems'
    ]
  },
  {
    title: 'Customer Success',
    points: [
      'Dedicated onboarding specialists',
      'Ongoing optimisation consultancy',
      'Regular training and best practices',
      'Active user community and resources'
    ]
  }
]

export default function WhyChooseUsPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Teams Choose{" "}
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
              }}>
                RosterLab
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of teams that have transformed their workforce management with our proven scheduling solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/staff-rostering-interactive-demo" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                See RosterLab in Action
              </Button>
              <Button href="/contact" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                Talk to Our Team
              </Button>
            </div>
            <div className="mt-12">
              <Image
                src="/images/illustration/Light bulb-pana.svg"
                alt="Innovation and Ideas"
                width={400}
                height={300}
                className="mx-auto max-w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Key Reasons Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Six Reasons to Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with deep industry expertise to deliver unmatched value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* What Sets Us Apart Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Sets RosterLab Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another scheduling software – we're your partner in workforce optimisation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {item.title}
                </h3>
                <ul className="space-y-3">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Success Metrics Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Results That Speak for Themselves
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our customers consistently achieve measurable improvements in efficiency and satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">90%</div>
              <div className="text-gray-600">Time Saved on Scheduling</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
              <div className="text-gray-600">Compliant with Rules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">4.9/5</div>
              <div className="text-gray-600">Average User Rating</div>
            </div>
          </div>
        </Container>
      </div>

      {/* Customer Quote Section */}
      <div className="py-20" style={{
        backgroundImage: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
      }}>
        <Container>
          <div className="text-center text-white max-w-4xl mx-auto">
            <svg className="w-12 h-12 mx-auto mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl font-medium mb-6">
              "If Rosterlab can help with our complicated rostering needs, we are confident it will work for anyone."
            </blockquote>
            <cite className="text-lg opacity-90">
              — Judy Harris, Practice Manager, Dargaville Hospital
            </cite>
          </div>
        </Container>
      </div>

      {/* Partnership Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A True Partnership Approach
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                When you choose RosterLab, you're not just getting software – you're gaining a dedicated partner committed to your success.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Dedicated Success Manager</h3>
                    <p className="text-sm text-gray-600">Your personal guide through implementation and beyond</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Ongoing Optimization</h3>
                    <p className="text-sm text-gray-600">Regular reviews to ensure you're getting maximum value</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Continuous Innovation</h3>
                    <p className="text-sm text-gray-600">Regular updates and new features based on customer feedback</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/images/why choose us/partnership.webp"
                alt="RosterLab Partnership Approach"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <Container>
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join RosterLab?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              See why organisations trust RosterLab to transform their workforce management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/book-a-demo" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Book a Demo
              </Button>
              <Button 
                href="/roi-calculator" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                Calculate Your ROI
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  )
}