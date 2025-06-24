import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiCheck, HiClock, HiBell, HiShieldCheck, HiEye, HiUserGroup } from 'react-icons/hi'

export const metadata = {
  title: 'Open Shifts Management & Smart Matching - RosterLab',
  description: 'Publish open shifts instantly; AI matches qualified staff, automates offers, and fills gaps fast while controlling overtime and fatigue.',
}

export default function OpenShiftsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Manage open shifts with less effort
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Instantly alert staff when new shifts become available with smart matching and automated compliance checks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/schedule calendar-pana.svg"
                  alt="Open shifts calendar management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Real-Time Notifications */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Real-Time Notifications & Smart Matching
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Instantly alert staff when new shifts become available. Our system automatically matches shifts based on skills, availability, and compliance requirements to notify only eligible staff members.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to mobile devices and email alerts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Skills-based matching ensures qualified staff are notified</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Availability filters prevent unnecessary notifications</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Real-Time Notification Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Eligibility Rules & Compliance */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Compliance Checking Visualization</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Eligibility Rules & Smart Matching
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Built-in compliance alerts and violation prevention ensure shifts stay fair and safe. The system automatically checks for conflicts, overtime limits, and rest period requirements.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic overtime and fatigue management checks</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance alerts for union rules and regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fair distribution algorithms prevent favoritism</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Automatic Conflict Checking */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Conflict Checking
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced automation prevents scheduling conflicts before they happen. The system validates every shift assignment against existing schedules, availability patterns, and workplace policies.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time validation against existing schedules</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic detection of double-bookings</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Minimum rest period enforcement</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Conflict Detection Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Audit Trail & Visibility */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Audit Trail Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Audit Trail & Visibility
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Complete transparency with detailed audit trails for all open shift activities. Track who was notified, when they responded, and why assignments were made.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete history of all shift activities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Detailed notification and response tracking</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance reporting and documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Streamlined Open Shift Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">75%</p>
                  <p className="text-xl opacity-90">Faster shift coverage</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Staff notification accuracy</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance checking</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={[
                {
                  question: "How does the smart matching system determine which staff to notify?",
                  answer: "Our AI-powered system analyzes multiple factors including staff qualifications, certifications, availability patterns, recent work hours, and compliance requirements. It automatically matches open shifts with the most suitable staff members, ensuring only qualified and available personnel receive notifications."
                },
                {
                  question: "Can managers control who gets notified about specific open shifts?",
                  answer: "Yes, managers have full control over notification rules. You can set preferences for specific shifts, create priority lists, exclude certain staff members, or even manually select who should be notified. The system provides both automated smart matching and manual override options."
                },
                {
                  question: "How quickly do staff receive open shift notifications?",
                  answer: "Notifications are sent instantly through multiple channels including push notifications to mobile devices, SMS, and email. Staff typically receive alerts within seconds of a shift being published. The system also tracks delivery and read receipts to ensure notifications are received."
                },
                {
                  question: "What happens if no one accepts an open shift?",
                  answer: "The system includes escalation protocols that you can customize. If initial notifications don't result in coverage, it can automatically expand the notification pool, alert managers, or trigger backup staffing procedures. You'll always have visibility into the status and can intervene manually at any time."
                },
                {
                  question: "How does the system prevent overtime and fatigue violations?",
                  answer: "Before notifying any staff member, the system automatically checks their current schedule against your overtime rules, maximum hour limits, and minimum rest period requirements. Staff who would violate these rules by accepting the shift are automatically excluded from notifications, ensuring 100% compliance."
                },
                {
                  question: "Can staff set preferences for which types of shifts they want to be notified about?",
                  answer: "Absolutely. Staff can set their notification preferences including preferred departments, shift times, locations, and even minimum notice periods. This reduces notification fatigue and ensures staff only receive relevant opportunities they're likely to accept."
                }
              ]} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Streamline Your Open Shifts?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Eliminate manual coordination and ensure fair, compliant shift coverage with intelligent automation.
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