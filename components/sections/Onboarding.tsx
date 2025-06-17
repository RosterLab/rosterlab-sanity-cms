import Container from '@/components/ui/Container'

const onboardingSteps = [
  {
    number: '1',
    title: 'Set rules & demands',
    description: 'Set precise rules based on contract obligations, EBA union compliance, skill mix, tasks and staffing coverage to ensure complete roster compliance.'
  },
  {
    number: '2', 
    title: 'Collect requests & preferences',
    description: 'Using the mobile app, staff can submit leave requests and preferences, ready for you to review and incorporate into the roster planning.'
  },
  {
    number: '3',
    title: 'Automatically generate a roster',
    description: 'Our algorithm creates the most optimal, safe, fair, and flexible schedule - balancing skill mix, compliance and staff preferences automatically.'
  },
  {
    number: '4',
    title: 'Share your schedule',
    description: 'Publish rosters to staff via mobile app with calendar sync. Share live rosters with other departments like payroll for seamless integration.'
  },
  {
    number: '5',
    title: 'Manage shift swaps & requests',
    description: 'Automatically approve routine swaps while flagging critical changes. Stay in control of shifts that impact coverage, skills, or compliance.'
  },
  {
    number: '6',
    title: 'Simulate different scenarios',
    description: 'Run hypothetical roster scenarios to assess feasibility of changes without impacting your live roster - perfect for planning and optimization.'
  }
]

export default function Onboarding() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Six Key Steps to Perfect Rosters
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our streamlined process takes you from complex scheduling challenges to optimized rosters in just six simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {onboardingSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold text-green-600">{step.number}</span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}