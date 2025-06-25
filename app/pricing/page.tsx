import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiCheck, HiMinus } from 'react-icons/hi'

export const metadata = {
  title: 'Pricing - Affordable AI Staff Scheduling Software',
  description: 'Explore RosterLab\'s flexible pricing for AI-powered staff rostering. Save time, ensure compliance, and build fairer schedules effortlessly.',
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

const faqItems = [
  {
    question: "Is there a minimum number of users?",
    answer: "No minimum for the free Digital Rostering plan. For AI Optimised, we recommend at least 10 users to get the full benefit of the optimization algorithms, but there's no enforced minimum. Enterprise solutions are typically for organizations with 100+ employees."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes! You can upgrade from the free Digital Rostering plan to AI Optimised at any time. When you upgrade, you'll immediately get access to all AI features. You can also downgrade if needed, though you'll lose access to the AI optimization features."
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include email support and access to our knowledge base. AI Optimised customers get priority email support with faster response times. Enterprise customers receive dedicated support including phone support and a assigned customer success manager."
  },
  {
    question: "Can I try the AI features before committing?",
    answer: "Absolutely! We offer a 30-day free trial of the AI Optimised plan with no credit card required. You can also book a demo to see the features in action before starting your trial."
  }
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
                    : plan.name === 'Digital Rostering' 
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-500 text-white hover:bg-gray-600'
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
                  <th className="text-left py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                    Features
                  </th>
                  <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                    Digital<br />
                    <span className="text-xs font-normal text-gray-600">Free</span>
                  </th>
                  <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                    AI<br />
                    <span className="text-xs font-normal text-gray-600">$20/user</span>
                  </th>
                  <th className="text-center py-4 px-2 sm:py-6 sm:px-6 font-bold text-gray-900 text-xs sm:text-base">
                    Enterprise<br />
                    <span className="text-xs font-normal text-gray-600">Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 sm:py-4 sm:px-6 text-gray-700 font-medium text-xs sm:text-base">
                      {feature.name}
                    </td>
                    <td className="py-3 px-2 sm:py-4 sm:px-6 text-center">
                      {feature.digital ? (
                        <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.ai ? (
                        <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {feature.enterprise ? (
                        <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" />
                      ) : (
                        <HiMinus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 pt-20">
        <div className="text-center p-12 text-white">
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
              href="/staff-rostering-interactive-demo" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
      </div>
    </SiteLayout>
  )
}