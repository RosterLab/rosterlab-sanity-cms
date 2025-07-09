import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import AnimatedSpeechBubbles from '@/components/ui/AnimatedSpeechBubbles'
import Link from 'next/link'
import { HiCalendar, HiBell, HiUserGroup, HiClock, HiCheckCircle, HiCheck, HiUsers, HiTrendingUp, HiShieldCheck, HiCog, HiAcademicCap } from 'react-icons/hi'

export const metadata = {
  title: 'Employee Mobile App - RosterLab',
  description: 'Empower your staff with mobile roster access. View schedules, request time off, swap shifts, and stay connected on the go.',
  openGraph: {
    title: 'Employee Mobile App - RosterLab',
    description: 'Empower your staff with mobile roster access. View schedules, request time off, swap shifts, and stay connected on the go.',
    images: [
      {
        url: '/images/og images/Solution - Mobile App.png',
        width: 1200,
        height: 630,
        alt: 'Employee Mobile App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employee Mobile App - RosterLab',
    description: 'Empower your staff with mobile roster access. View schedules, request time off, swap shifts, and stay connected on the go.',
    images: ['/images/og images/Solution - Mobile App.png'],
  },
}


const appFeatures = [
  {
    title: 'Personal Schedule View',
    description: 'See your upcoming shifts, breaks, and days off in an easy-to-read calendar format',
    icon: HiCalendar,
    href: '/feature/self-scheduling'
  },
  {
    title: 'Open Shifts',
    description: 'Browse and claim available shifts that match your skills and availability',
    icon: HiBell,
    href: '/feature/open-shifts'
  },
  {
    title: 'Leave Management',
    description: 'Submit leave requests and track approval status directly from your phone',
    icon: HiCheckCircle,
    href: '/feature/leave-requests'
  },
  {
    title: 'Shift Trading',
    description: 'Find colleagues to swap shifts with, subject to manager approval',
    icon: HiUserGroup,
    href: '/feature/shift-swaps'
  }
]

const faqItems = [
  {
    question: "How do staff members download and access the mobile app?",
    answer: "Staff members can download the RosterLab mobile app from the <a href='https://apps.apple.com/nz/app/rosterlab/id6448819917' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline'>Apple App Store</a> or <a href='https://play.google.com/store/apps/details?id=com.rosterlab.app' target='_blank' rel='noopener noreferrer' class='text-blue-600 hover:underline'>Google Play Store</a>. Once downloaded, they'll receive login credentials from their administrator to access their personal roster and scheduling features."
  },
  {
    question: "Can staff request time off directly through the app?",
    answer: "Absolutely! The mobile app includes a comprehensive leave request system. Staff can submit time-off requests, specify the dates and reason, and track the approval status in real-time. Managers receive instant notifications of new requests."
  },
  {
    question: "How does the shift swapping feature work?",
    answer: "The <a href='/feature/shift-swaps' class='text-blue-600 hover:underline'>shift swap feature</a> allows staff to post shifts they need covered and browse available shifts from colleagues. All swaps require manager approval to ensure proper coverage and compliance with scheduling rules."
  },
  {
    question: "What devices are supported by the mobile app?",
    answer: "The RosterLab mobile app is compatible with iOS devices (iPhone and iPad) running iOS 12 or later, and Android devices running Android 7.0 or later. We regularly update the app to support the latest operating systems."
  }
]

export default function EmployeeMobileAppPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-white pt-16 pb-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pb-8 lg:pb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your roster in your pocket
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Give your staff instant access to their schedules, enable easy shift management, 
                and improve communication with our intuitive mobile app.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Streamline communication</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Increase staff engagement</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Works on all devices</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Available free on iOS and Android</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/book-a-demo" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                  Book a Demo
                </Button>
                <Button href="/contact" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center items-end">
              <div className="w-full max-w-lg">
                <Image
                  src="/images/illustration/test5.svg"
                  alt="RosterLab Mobile App Interface"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Key Features Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything your staff needs, anywhere they are
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empower your team with instant access to schedules, easy shift management, and seamless communication through our mobile app.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appFeatures.map((feature, index) => (
              <Link key={index} href={feature.href} className="block">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {feature.description}
                      </p>
                      <span className="text-blue-600 font-medium inline-flex items-center group">
                        Read more 
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>


      {/* Intelligent Scheduling Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Publish your roster to your employee mobile app
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Team members can see their published rosters on the RosterLab app, allowing them to stay updated with their work schedules. They are also able to communicate their preferred shift patterns.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">90% Time Reduction</h3>
                    <p className="text-gray-600">Generate complex rosters in minutes instead of days with our advanced AI algorithms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimised Staffing Coverage</h3>
                    <p className="text-gray-600">Mathematical optimisation ensures the most efficient staff allocation and resource utilisation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Staff Satisfaction</h3>
                    <p className="text-gray-600">Fair and balanced schedules improve work-life balance and increase staff retention</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[600px]">
              <Image
                src="/images/illustration/Push notifications-pana-2 copy.svg"
                alt="Publish roster to mobile app"
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Advanced AI Capabilities Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="w-full" style={{ height: '500px' }}>
              <AnimatedSpeechBubbles />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Increased Staff Satisfaction
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Empower your team to communicate their availability and preferences directly through the app, making roster planning more collaborative and efficient.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Send shift swap requests</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Syncs to your personal calendar</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Share your preferences and leave request</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Compliance Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Seamless communication and notifications
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Push notifications keep employees updated in real-time as schedules are published, shifts become available and leave requests are approved.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No more back and forth communication</h3>
                    <p className="text-gray-600">All shift requests and responses handled seamlessly in one place</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No more email spam</h3>
                    <p className="text-gray-600">Clean, organised notifications only for what matters to each team member</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiCog className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Streamline communication</h3>
                    <p className="text-gray-600">Instant updates and centralized messaging for the entire team</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Communication Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Push notifications</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Shift swap requests</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Team announcements</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700">Calendar integration</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Everything you need to know about the RosterLab mobile app
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        <Container>
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to empower your workforce?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Give your staff the tools they need to manage their schedules effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/book-a-demo" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Book a Demo
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </>
    </SiteLayout>
  )
}