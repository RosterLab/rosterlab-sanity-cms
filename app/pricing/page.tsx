import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiCheck, HiMinus } from 'react-icons/hi'

export const metadata = {
  title: 'Pricing - RosterLab',
  description: 'OPTIMISE YOUR STAFFING FROM TODAY. Choose from Digital Rostering (Free), AI Optimised Rostering ($20/month), or Enterprise Solution.',
}

const pricingPlans = [
  {
    name: 'Digital Rostering',
    price: 'FREE FOREVER',
    description: 'Manual scheduling platform for small teams',
    features: [
      'Manual scheduling platform',
      'Simple rule violations check', 
      'Dynamic statistics counts',
      'Color coding by shifts',
      'Employee mobile app'
    ],
    cta: 'SIGN UP FOR FREE',
    ctaLink: 'https://app.rosterlab.com',
    highlighted: false
  },
  {
    name: 'AI Optimised Rostering',
    price: '$20',
    period: 'per person per month',
    description: '24/7 Automatic AI-powered scheduling',
    features: [
      '24/7 Automatic scheduling',
      'Multiple sessions per shift',
      'Dynamic re-rostering',
      'Legal and contractual compliance',
      'Optimized staffing resources',
      'Scenario simulation'
    ],
    cta: 'BOOK A DEMO',
    ctaLink: '/demo',
    highlighted: true
  },
  {
    name: 'Enterprise Solution',
    price: 'CONTACT US',
    description: 'Custom solutions for large organizations',
    features: [
      'API access',
      'Workforce scheduling consulting',
      'Integrations',
      'Customized rules',
      'Priority support',
      'On-premise deployment'
    ],
    cta: 'CONTACT US',
    ctaLink: '/contact',
    highlighted: false
  }
]

const features = [
  {
    name: "Manual scheduling platform",
    digital: true,
    ai: true,
    enterprise: true,
  },
  {
    name: "Simple rule violations check",
    digital: true,
    ai: true,
    enterprise: true,
  },
  {
    name: "Dynamic statistics counts",
    digital: true,
    ai: true,
    enterprise: true,
  },
  {
    name: "Color coding by shifts",
    digital: true,
    ai: true,
    enterprise: true,
  },
  {
    name: "Employee mobile app",
    digital: true,
    ai: true,
    enterprise: true,
  },
  {
    name: "24/7 Automatic scheduling",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "Multiple sessions per shift",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "Dynamic re-rostering",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "Legal and contractual compliance",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "Optimized staffing resources",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "Scenario simulation",
    digital: false,
    ai: true,
    enterprise: true,
  },
  {
    name: "API access",
    digital: false,
    ai: false,
    enterprise: true,
  },
  {
    name: "Workforce scheduling consulting",
    digital: false,
    ai: false,
    enterprise: true,
  },
  {
    name: "Integrations",
    digital: false,
    ai: false,
    enterprise: true,
  },
  {
    name: "Customized rules",
    digital: false,
    ai: false,
    enterprise: true,
  },
]

export default function PricingPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimise your staffing
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
              from today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your organization. Start with our free digital rostering platform or unlock the power of AI optimization.
            </p>
          </div>
        </Container>
      </div>

      {/* Pricing Cards */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.highlighted ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-gray-600">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={plan.ctaLink}
                className={`w-full py-4 text-lg font-semibold ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>

      {/* Feature Comparison */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Complete Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-6 px-6 font-bold text-gray-900">
                    Features
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-gray-900">
                    Digital Rostering<br />
                    <span className="text-sm font-normal text-gray-600">Free Forever</span>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-gray-900">
                    AI Optimised<br />
                    <span className="text-sm font-normal text-gray-600">$20 per person</span>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-gray-900">
                    Enterprise<br />
                    <span className="text-sm font-normal text-gray-600">Contact Us</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {feature.name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.digital ? (
                        <HiCheck className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.ai ? (
                        <HiCheck className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.enterprise ? (
                        <HiCheck className="w-6 h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-6 h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <Container>
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join healthcare organizations already optimizing their workforce with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="https://app.rosterlab.com" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start Free Forever Plan
              </Button>
              <Button 
                href="/demo" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </div>
    </SiteLayout>
  )
}