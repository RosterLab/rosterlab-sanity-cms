import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { withHreflang } from '@/components/seo/HreflangTags'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export const metadata = withHreflang({
  title: 'Open Shifts for Staff - RosterLab',
  description: 'Use open shifts to help fill last-minute coverage gaps with the open shifts feature. Share available shifts with qualified staff & get shifts filled in minutes.',
  alternates: {
    canonical: 'https://rosterlab.com/us/feature/open-shifts',
  },
  openGraph: {
    title: 'Open Shifts for Staff - RosterLab',
    description: 'Use open shifts to help fill last-minute coverage gaps with the open shifts feature. Share available shifts with qualified staff & get shifts filled in minutes.',
    type: 'website',
    url: 'https://rosterlab.com/us/feature/open-shifts',
    images: [
      {
        url: '/images/og images/FeatureOpenShifts.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Shifts for Staff - RosterLab',
    description: 'Use open shifts to help fill last-minute coverage gaps with the open shifts feature. Share available shifts with qualified staff & get shifts filled in minutes.',
    images: ['/images/og images/FeatureOpenShifts.png'],
  },
}, '/us/feature/open-shifts')

const faqItems = [
  {
    question: "What is an open shift?",
    answer: "An open shift is an unfilled work slot in your schedule that needs coverage. These can arise from last-minute call-outs, unexpected demand, or gaps in your original schedule. With RosterLab's open shift feature, you can instantly broadcast these available shifts to qualified staff members who can claim them through the mobile app, ensuring quick coverage without the manual phone calls or emails."
  },
  {
    question: "How quickly can open shifts be filled?",
    answer: "With RosterLab's instant notification system, open shifts can be filled within minutes. As soon as you post an open shift, all qualified and available staff receive push notifications. The first suitable staff to accept gets the shift, and the schedule is automatically updated."
  },
  {
    question: "How do staff know about open shifts?",
    answer: "Staff receive instant push notifications on their mobile devices when shifts matching their qualifications become available. They can also check the app proactively to see all open shifts they're eligible for."
  },
  {
    question: "Can I control who sees open shifts?",
    answer: "Yes! You can set precise criteria for each open shift including required qualifications, minimum experience level, specific departments or teams, and availability requirements."
  },
  {
    question: "What happens when multiple people want the same shift?",
    answer: "The system operates on a first-come, first-served basis by default."
  },
  {
    question: "How does open shifts help reduce staffing costs?",
    answer: "Open shifts helps reduce costly agency and overtime usage by quickly filling gaps with your existing staff pool. Instead of calling expensive agency workers or paying overtime rates, you can instantly broadcast shifts to available staff at regular rates. The system also reduces administrative time spent on phone calls and manual coordination, freeing up managers for more valuable tasks."
  },
  {
    question: "What if an staff can't work an accepted open shift?",
    answer: "The shift is reopened and automatically shared with the staff who were originally offered it."
  }
]

export default function OpenShiftsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Fill{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                    Open Shifts
                  </span>{" "}
                  Instantly
                </h1>
                
                {/* Mobile only: Image appears here after H1 */}
                <div className="block lg:hidden w-full relative mb-8">
                  <Image
                    src="/images/us-images/stock/istockphoto-1478505201-1024x1024.jpg"
                    alt="Open shifts notification illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  />
                </div>
                
                <p className="text-xl text-gray-600 mb-8">
                  Share open shifts to qualified staff and fill gaps in minutes, not hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/us/book-a-demo" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button 
                    href="/us/product-tour" 
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    View Product Tour
                  </Button>
                </div>
              </div>
              {/* Desktop only: Image in right column */}
              <div className="hidden lg:block w-full relative">
                <Image
                  src="/images/us-images/stock/istockphoto-1478505201-1024x1024.jpg"
                  alt="Open shifts notification illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
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
                  Post open shifts with one click and instantly notify all qualified, available staff. Staff receive instant notifications on their phones and can accept shifts with one tap. No more unanswered messages.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-click shift posting</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant mobile app notifications to staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Smart filtering by skills and availability</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    href="/us/solutions/staff-scheduling-mobile-app" 
                    className="bg-[#4a9288] text-white hover:bg-[#3a7268] px-6 py-3 font-semibold"
                  >
                    Explore the Staff Mobile App
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/free-staff-mobile.svg"
                  alt="Instant Shift Broadcasting"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Smart Staff Matching Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="/images/us-images/stock/istockphoto-2147591263-1024x1024.jpg"
                  alt="Smart Staff Matching"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Instantly Fill Staffing Gaps Without Worry
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When open shifts are filled, the schedule updates automatically and notifies the admin in real time. This removes the need for manual edits, speeds up the scheduling process, and keeps everyone on the same page, reducing miscommunication and ensuring staffing levels are always accurate.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Quick, automatic updates to shift allocations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Immediate notifications for admins when gaps are filled</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fewer manual adjustments, saving valuable time</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Less back-and-forth between managers and staff</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Prioritise Urgent Shifts Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Prioritise More Urgent Shifts
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Sometimes an open shift is more critical than the one an staff is already scheduled for. Managers can choose to invite staff who already have a shift with the option to replace their existing shift with a higher priority shift.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Ensures that the most important shifts are filled</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Balances staffing during peak hours</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Improves service during busy periods</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Button 
                    href="/us/book-a-demo" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 font-semibold"
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
              <div>
                <Image
                  src="/images/us-images/stock/istockphoto-1295774052-1024x1024.jpg"
                  alt="Prioritise urgent shifts"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
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
                  src="/images/us-images/stock/istockphoto-1903423742-2048x2048.jpg"
                  alt="First-Come First-Served Assignment"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Fair & Transparent Assignment
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff see available shifts in real-time and can claim them instantly on a first-come-first-served basis.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">First-come-first-served basis</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time availability updates</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic scheduling when shifts are filled</span>
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
                Fill Shifts Faster Than Ever With Open Shifts
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
                  href="/us/book-a-demo" 
                  className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/us/pricing" 
                  className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
      

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema 

        items={[
          { name: "Home", url: "/us" },
          { name: "Features", url: "/us/feature" },
          { name: "Open Shifts" }

        ]}

      />

    </SiteLayout>
  )
}