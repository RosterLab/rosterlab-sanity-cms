import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { HiCheck } from 'react-icons/hi'

interface PricingPlan {
  name: string
  price: string
  period?: string
  description?: string
  features: string[]
  highlighted?: boolean
  buttonText?: string
  buttonLink?: string
}

interface PricingProps {
  heading?: string
  description?: string
  plans: PricingPlan[]
}

export default function Pricing({ 
  heading = "Simple, Transparent Pricing",
  description = "Choose the plan that works best for your business. All plans include our core scheduling features.",
  plans = []
}: PricingProps) {
  const defaultPlans: PricingPlan[] = [
    {
      name: "Essential",
      price: "$3",
      period: "per staff member/month",
      description: "Perfect for small healthcare teams getting started with AI rostering.",
      features: [
        "Up to 50 staff members",
        "AI-powered roster generation",
        "Mobile app access",
        "Basic compliance checks",
        "Email support",
        "Shift templates"
      ],
      buttonText: "Start Free Trial",
      buttonLink: "/book-a-demo"
    },
    {
      name: "Professional",
      price: "$5",
      period: "per staff member/month",
      description: "Advanced features for hospitals and clinics with complex rostering needs.",
      features: [
        "Up to 200 staff members",
        "Advanced AI optimisation",
        "Skills-based matching",
        "Leave management",
        "Priority support",
        "Advanced analytics",
        "API access"
      ],
      highlighted: true,
      buttonText: "Start Free Trial",
      buttonLink: "/book-a-demo"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large healthcare networks and organizations.",
      features: [
        "Unlimited staff members",
        "Custom workflow automation",
        "Dedicated account manager",
        "On-premise deployment",
        "Custom integrations",
        "Training & onboarding",
        "99.9% SLA guarantee"
      ],
      buttonText: "Contact Sales",
      buttonLink: "/contact"
    }
  ]

  const pricingPlans = plans.length > 0 ? plans : defaultPlans

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {heading}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.highlighted 
                  ? 'ring-2 ring-primary-500 scale-105' 
                  : 'hover:shadow-xl'
              } transition-all duration-300`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.highlighted ? 'pt-12' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-neutral-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-neutral-500 ml-2">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-neutral-600 text-sm">
                      {plan.description}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <HiCheck className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-neutral-700 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  href={plan.buttonLink || '/book-a-demo'}
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.buttonText || 'Get Started'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-neutral-500">
            Need a custom solution? <a href="/contact" className="text-primary-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </Container>
    </section>
  )
}