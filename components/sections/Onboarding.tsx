import Container from '@/components/ui/Container'
import Link from 'next/link'

const onboardingSteps = [
  {
    number: '1',
    title: '1) Set rules & demands',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Set precise rules based on contract obligations, EBA union compliance, skill mix, tasks and staffing coverage to ensure complete roster compliance.',
    link: '/feature/preferences-rules'
  },
  {
    number: '2', 
    title: '2) Collect requests & preferences',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description: 'Using the mobile app, staff can submit leave requests and preferences, ready for you to review and incorporate into the roster planning.',
    link: '/feature/leave-requests'
  },
  {
    number: '3',
    title: '3) Auto generate a roster',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Our algorithm creates the most optimal, safe, fair, and flexible schedule - balancing skill mix, compliance and staff preferences automatically.',
    link: '/feature/auto-roster-generation'
  },
  {
    number: '4',
    title: '4) Share your schedule',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    description: 'Publish rosters to staff via mobile app with calendar sync. Share live rosters with other departments like payroll for seamless integration.',
    link: '/solutions/staff-roster-mobile-app'
  },
  {
    number: '5',
    title: '5) Manage shift swaps & requests',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
    description: 'Automatically approve routine swaps while flagging critical changes. Stay in control of shifts that impact coverage, skills, or compliance.',
    link: '/feature/shift-swaps'
  },
  {
    number: '6',
    title: '6) Simulate different scenarios',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: 'Run hypothetical roster scenarios to assess feasibility of changes without impacting your live roster - perfect for planning and optimization.',
    link: '/feature/re-rostering'
  }
]

export default function Onboarding() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Six Steps to Building Perfect Rosters
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our streamlined process takes you from complex scheduling challenges to optimized rosters in just six simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {onboardingSteps.map((step, index) => (
            <Link 
              key={index} 
              href={step.link}
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-neutral-600 mb-4">
                {step.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                Learn more
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}