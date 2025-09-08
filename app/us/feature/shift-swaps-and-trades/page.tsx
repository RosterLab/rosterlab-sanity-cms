import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ShiftSwapsContent from './ShiftSwapsContent'
import ShiftSwapModule from '@/components/sections/animations/ShiftSwapModule'
import AuditTrailModule from './AuditTrailModule'
import WeekendRotationModule from './WeekendRotationModule'

export const metadata = {
  title: 'Shift Swaps - RosterLab',
  description: 'Automate shift swaps with RosterLab AI, ensuring optimal staffing and compliance while saving time and reducing administration. Oversight where it matters.',
  alternates: {
    canonical: 'https://rosterlab.com/us/feature/shift-swaps-and-trades',
  },
  openGraph: {
    title: 'Shift Swaps: Automate Routine Shift Swaps, Review What Matters',
    description: 'Automate shift swaps with RosterLab AI, ensuring optimal staffing and compliance while saving time and reducing administration. Oversight where it matters.',
    type: 'website',
    url: 'https://rosterlab.com/us/feature/shift-swaps-and-trades',
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
    title: 'Shift Swaps: Automate Routine Shift Swaps, Review What Matters',
    description: 'Automate shift swaps with RosterLab AI, ensuring optimal staffing and compliance while saving time and reducing administration. Oversight where it matters.',
    images: ['/images/og images/FeatureShiftSwaps.png'],
  },
}

const faqItems = [
  {
    question: "How does automated shift swap approval work?",
    answer: "RosterLab's AI analyses each swap request against your organisation's rules, compliance requirements, and staffing needs. If the swap maintains proper coverage, doesn't violate any rules, and both employees are qualified for the shifts, it's automatically approved. Complex swaps that might impact critical coverage or compliance are flagged for manager review."
  },
  {
    question: "What rules can I set for automatic approvals?",
    answer: "You can configure rules based on: minimum staffing levels, skill requirements, maximum hours per week/month, minimum rest periods between shifts, seniority considerations, department-specific requirements, and custom business rules. The system learns from your approval patterns to become more intelligent over time."
  },
  {
    question: "How do employees request shift swaps?",
    answer: "Employees can request swaps through our mobile app or web portal. They simply select the shift they want to swap, and the system shows available options with qualified colleagues. They can send swap requests directly, which are then processed according to your automation rules. Employees receive instant notifications about approvals or rejections."
  },
  {
    question: "What happens when a swap needs manager approval?",
    answer: "When the AI detects a swap that requires review (e.g., affects critical coverage or approaches overtime limits), managers receive an alert with all relevant context. They can see exactly why the swap was flagged, review the impact on coverage and costs, and approve or reject with one click. The whole process typically takes less than 30 seconds."
  },
  {
    question: "Can I track and quit all shift swaps?",
    answer: "Yes! Every swap request, approval, and rejection is logged with complete details including who requested it, when it was processed, who approved it (system or manager). This audit trail is essential for labour compliance, dispute resolution, and identifying patterns to improve your policies."
  }
]

export default function ShiftSwapsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Intelligent Shift Swaps
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automate routine swaps, review when it matters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/us/book-a-demo" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Book A Demo"
                    analyticsLocation="Feature Page Shift Swaps"
                    analyticsProperties={{
                      cta_type: "demo",
                      page_name: "Shift Swaps",
                      section: "hero"
                    }}
                  >
                    Book A Demo
                  </Button>
                  <Button 
                    href="/us/solutions/free-staff-scheduling-tool" 
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                    analyticsLabel="Try it for free"
                    analyticsLocation="Feature Page Shift Swaps"
                    analyticsProperties={{
                      cta_type: "signup",
                      page_name: "Shift Swaps",
                      section: "hero"
                    }}
                  >
                    Try it for free
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Chatting-pana.svg"
                  alt="Shift swaps communication illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Automatic Routine Approvals Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Routine Approvals
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AI automatically approves standard shift swaps between qualified staff members. Only swaps that impact critical coverage, skills mix, or compliance require manager review.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant approval for routine swaps</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Smart detection of critical shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce administrative workload</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/shift swaps/Test 5 copy.webp"
                  alt="Automatic Routine Approvals"
                  width={600}
                  height={600}
                  className="w-full h-auto scale-90"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Review Swaps that Break the Rules Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/shift swaps/Group 391 copy.webp"
                  alt="Review Swaps that Break the Rules"
                  width={600}
                  height={600}
                  className="w-full h-auto scale-90"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Review Swaps That Break the Rules
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When a swap might break staffing rules or affect critical coverage, managers get a clear, one-click review process with explanations of potential conflicts.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Highlights potential rule violations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-click approval or rejection</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Clear explanations of conflicts</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Automated Notifications Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automated Notifications
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff can request swaps anytime via mobile app. Relevant team members get instant notifications, and approved swaps update across all systems in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mobile app swap requests</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to relevant staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time schedule updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/shift swaps/Shift Swap 3.webp"
                  alt="Automated Notifications"
                  width={500}
                  height={500}
                  className="w-full h-auto scale-90"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Comprehensive Audit Trail Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/shift swaps/Group 390 copy.webp"
                  alt="Comprehensive Audit Trail"
                  width={600}
                  height={600}
                  className="w-full h-auto scale-90"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comprehensive Audit Trail
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Track who swapped, when, and why. Complete documentation helps resolve disputes and demonstrate compliance with labour regulations.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete swap history</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Approval timestamps and reasons</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
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
        <div className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                No More Scheduling Headaches!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">90%</p>
                  <p className="text-xl opacity-90">Reduction in admin</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">5%</p>
                  <p className="text-xl opacity-90">Efficiency Gains</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance with labour regulations</p>
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
                Ready to Modernize Your Shift Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join leading organizations who've transformed their workforce flexibility with intelligent shift swapping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/us/book-a-demo" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="Book Your Demo"
                  analyticsLocation="Feature Page Shift Swaps"
                  analyticsProperties={{
                    cta_type: "demo",
                    page_name: "Shift Swaps",
                    section: "final_cta"
                  }}
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/us/pricing" 
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  analyticsLabel="View Pricing"
                  analyticsLocation="Feature Page Shift Swaps"
                  analyticsProperties={{
                    cta_type: "pricing",
                    page_name: "Shift Swaps",
                    section: "final_cta"
                  }}
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