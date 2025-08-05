import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import OpenShiftsContent from './OpenShiftsContent'

export const metadata = {
  title: 'Open Shifts: Fill Last-Minute Gaps Instantly',
  description: 'Instantly fill last-minute staffing gaps with RosterLab\'s Open Shifts feature. Broadcast available shifts to qualified staff and get them filled in minutes, not hours.',
  alternates: {
    canonical: 'https://rosterlab.com/feature/open-shifts',
  },
  openGraph: {
    title: 'Open Shifts: Fill Last-Minute Gaps Instantly',
    description: 'Instantly fill last-minute staffing gaps with RosterLab\'s Open Shifts feature. Broadcast available shifts to qualified staff and get them filled in minutes, not hours.',
    type: 'website',
    url: 'https://rosterlab.com/feature/open-shifts',
    images: [
      {
        url: '/images/og images/FeatureShiftSwaps.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Shifts: Fill Last-Minute Gaps Instantly',
    description: 'Instantly fill last-minute staffing gaps with RosterLab\'s Open Shifts feature. Broadcast available shifts to qualified staff and get them filled in minutes, not hours.',
    images: ['/images/og images/FeatureShiftSwaps.png'],
  },
}

const faqItems = [
  {
    question: "How quickly can open shifts be filled?",
    answer: "With RosterLab's instant notification system, open shifts can be filled within minutes. As soon as you post an open shift, all qualified and available staff receive push notifications. The first suitable employee to accept gets the shift, and the roster is automatically updated. Our clients typically see 85% of open shifts filled within 30 minutes."
  },
  {
    question: "How do employees know about open shifts?",
    answer: "Employees receive instant push notifications on their mobile devices when shifts matching their qualifications become available. They can also check the app proactively to see all open shifts they're eligible for. The system shows shift details, pay rates, and any special requirements, allowing staff to make informed decisions quickly."
  },
  {
    question: "Can I control who sees open shifts?",
    answer: "Yes! You can set precise criteria for each open shift including required qualifications, minimum experience level, specific departments or teams, and availability requirements. You can also prioritize certain staff members or exclude others based on overtime limits or other factors. The system only notifies employees who meet all specified criteria."
  },
  {
    question: "What happens when multiple people want the same shift?",
    answer: "The system operates on a first-come, first-served basis by default, but you can customise this. Options include automatic assignment to the first qualified person, review mode where managers can choose from interested staff, or priority-based assignment (e.g., by seniority or hours worked). You can also set a brief collection period to gather responses before assigning."
  },
  {
    question: "How does this help with unexpected absences?",
    answer: "When someone calls in sick or has an emergency, you can post their shift as open with just a few clicks. The system immediately identifies all qualified available staff and sends notifications. You can even set up templates for common scenarios to post open shifts even faster. This turns a potential crisis into a resolved issue within minutes."
  }
]

export default function OpenShiftsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Fill Shifts Instantly
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Broadcast open shifts to qualified staff and fill gaps in minutes, not hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button 
                    href="/solutions/free-staff-scheduling" 
                    className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  >
                    Try it for free
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Push notifications-pana-2.svg"
                  alt="Open shifts broadcasting illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Instant Broadcast Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Instant Shift Broadcasting
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Post open shifts with one click and instantly notify all qualified, available staff. Our smart matching ensures only eligible employees see shifts they can actually work.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-click shift posting</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant push notifications to qualified staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Smart filtering by skills and availability</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Mobile inbox-pana.svg"
                  alt="Instant Shift Broadcasting"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* First-Come First-Served Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Choose-pana.svg"
                  alt="First-Come First-Served Assignment"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Fair & Transparent Assignment
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Employees see available shifts in real-time and can claim them instantly. Choose between first-come-first-served, manager approval, or custom priority rules.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time availability updates</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Configurable assignment rules</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic roster updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Mobile Notifications Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Mobile-First Experience
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff receive instant notifications on their phones and can accept shifts with one tap. No more phone tag or unanswered messages.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications for immediate reach</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-tap shift acceptance</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">In-app shift details and requirements</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Devices-pana.svg"
                  alt="Mobile Notifications"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Analytics & Insights Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/illustration/Timeline-pana.svg"
                  alt="Analytics and Insights"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Track & Optimize Performance
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Gain insights into open shift patterns, response rates, and fill times. Use data to improve scheduling and reduce last-minute gaps.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fill rate analytics</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Response time tracking</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Staff engagement metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Interactive Demo Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                See It In Action
              </h2>
              <OpenShiftsContent />
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Fill Shifts Faster Than Ever
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">85%</p>
                  <p className="text-xl opacity-90">Shifts filled within 30 minutes</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">3x</p>
                  <p className="text-xl opacity-90">Faster than phone calls</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Staff satisfaction rate</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Never Leave a Shift Unfilled Again
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of organizations that fill last-minute gaps instantly with RosterLab's Open Shifts feature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}