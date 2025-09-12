import Container from "@/components/ui/Container";

const onboardingSteps = [
  {
    number: "1",
    title: "1. Set rules & demands",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    description:
      "Set precise rules based on contract obligations, compliance, skill mix, tasks and staffing coverage to ensure complete schedule compliance.",
    link: "/us/solutions/ai-staff-schedule-maker",
  },
  {
    number: "2",
    title: "2. Collect requests & preferences",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    description:
      "Using the mobile app, staff can submit leave requests and preferences, ready for you to review and incorporate into the schedule planning.",
    link: "/us/feature/self-scheduling",
  },
  {
    number: "3",
    title: "3. Auto generate a schedule",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    description:
      "Our algorithm creates the most optimal, safe, fair, and flexible schedule - balancing skill mix, compliance and staff preferences automatically.",
    link: "/us/feature/auto-scheduling",
  },
  {
    number: "4",
    title: "4. Share your schedule",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
    description:
      "Publish schedules to staff via mobile app with calendar sync. Share live schedules with other departments like payroll for seamless integration.",
    link: "/us/solutions/staff-scheduling-mobile-app",
  },
  {
    number: "5",
    title: "5. Manage shift trades & open shifts",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    ),
    description:
      "Automatically approve routine trades while flagging critical changes. Open shifts to your staff to fill gaps.",
    link: "/us/feature/shift-swaps-and-trades",
  },
  {
    number: "6",
    title: "6. Simulate different scenarios",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    description:
      "Run hypothetical schedule scenarios to assess feasibility of changes without impacting your live schedule - perfect for planning and optimisation.",
    link: "/us/feature/staff-rescheduling",
  },
  {
    number: "7",
    title: "Integrates with your payroll systems",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    description:
      "We currently integrate with Trendcare. Others upon request, depending on your business.",
    link: "/us/feature/payroll-integration",
    fullWidth: true,
  },
];

export default function USOnboarding() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Six Steps to Building Perfect Schedules
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our streamlined platform takes you from complex scheduling challenges
            to optimised schedules in just six simple steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onboardingSteps.slice(0, 6).map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all text-center hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600">{step.description}</p>
                {step.link && step.link !== "#" && (
                  <a
                    href={step.link}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Full-width 7th box */}
          {onboardingSteps[6] && (
            <div className="mt-8">
              <div className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all text-center hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {onboardingSteps[6].icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {onboardingSteps[6].title}
                </h3>
                <p className="text-neutral-600 max-w-4xl mx-auto">
                  {onboardingSteps[6].description}
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}