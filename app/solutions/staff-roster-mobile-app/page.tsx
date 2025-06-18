import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiDeviceMobile, HiCalendar, HiBell, HiUserGroup, HiClock, HiCheckCircle, HiCheck, HiUsers } from 'react-icons/hi'

export const metadata = {
  title: 'Employee Mobile App - RosterLab',
  description: 'Empower your staff with mobile roster access. View schedules, request time off, swap shifts, and stay connected on the go.',
}

const benefits = [
  {
    icon: HiDeviceMobile,
    title: 'Access Anywhere',
    description: 'View rosters, request leave, and manage shifts from any mobile device'
  },
  {
    icon: HiClock,
    title: 'Real-time Updates',
    description: 'Instant notifications for schedule changes and shift reminders'
  },
  {
    icon: HiUserGroup,
    title: 'Better Work-Life Balance',
    description: 'Easy shift swapping and leave requests improve staff satisfaction'
  }
]

const features = [
  'View personal rosters anytime',
  'Request time off with one tap',
  'Swap shifts with colleagues',
  'Push notifications for changes',
  'Calendar sync integration',
  'Team communication tools',
  'Availability preferences',
  'Mobile clock in/out'
]

const appFeatures = [
  {
    title: 'Personal Schedule View',
    description: 'See your upcoming shifts, breaks, and days off in an easy-to-read calendar format',
    icon: HiCalendar
  },
  {
    title: 'Smart Notifications',
    description: 'Get alerts for new rosters, shift changes, and important updates',
    icon: HiBell
  },
  {
    title: 'Leave Management',
    description: 'Submit leave requests and track approval status directly from your phone',
    icon: HiCheckCircle
  },
  {
    title: 'Shift Trading',
    description: 'Find colleagues to swap shifts with, subject to manager approval',
    icon: HiUserGroup
  }
]

const faqItems = [
  {
    question: "How do staff members download and access the mobile app?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Staff members can download the RosterLab mobile app from the Apple App Store or Google Play Store. Once downloaded, they'll receive login credentials from their administrator to access their personal roster and scheduling features."
  },
  {
    question: "Is the mobile app available offline?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Yes, the RosterLab mobile app includes offline functionality. Staff can view their downloaded rosters, check upcoming shifts, and review their schedule even without an internet connection. Any changes made offline will sync automatically when connectivity is restored."
  },
  {
    question: "Can staff request time off directly through the app?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Absolutely! The mobile app includes a comprehensive leave request system. Staff can submit time-off requests, specify the dates and reason, and track the approval status in real-time. Managers receive instant notifications of new requests."
  },
  {
    question: "How does the shift swapping feature work?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The shift swap feature allows staff to post shifts they need covered and browse available shifts from colleagues. All swaps require manager approval to ensure proper coverage and compliance with scheduling rules."
  },
  {
    question: "What devices are supported by the mobile app?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The RosterLab mobile app is compatible with iOS devices (iPhone and iPad) running iOS 12 or later, and Android devices running Android 7.0 or later. We regularly update the app to support the latest operating systems."
  },
  {
    question: "How secure is the mobile app for sensitive employee data?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Security is our top priority. The app uses enterprise-grade encryption, secure authentication, and complies with healthcare data protection standards including HIPAA. All data is encrypted both in transit and at rest."
  }
]

export default function EmployeeMobileAppPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                EMPLOYEE MOBILE APP
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
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
                  <span className="text-gray-700 font-medium">Available on iOS and Android</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Secure and compliant</span>
                </div>
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
                  <span className="text-gray-700 font-medium">Free for staff to download</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/demo" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                  Book a Demo
                </Button>
                <Button href="/contact" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Placeholder for mobile app screenshots */}
              <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                <span className="text-gray-400 text-lg">Mobile App Screenshot</span>
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
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Benefits for your organization
          </h2>
          
          {/* Image Placeholder */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
              <span className="text-gray-400 text-lg">Image Placeholder</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Features List Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Powerful features for every team member
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our mobile app is designed with healthcare workers in mind, providing all the tools 
                they need to manage their work schedule effectively.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Placeholder for feature image */}
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <span className="text-gray-400 text-lg">Feature Showcase Image</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How the Mobile App Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download & Login</h3>
              <p className="text-gray-600">
                Staff download the app from their app store and login with secure credentials
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">View & Manage</h3>
              <p className="text-gray-600">
                Access schedules, request time off, swap shifts, and communicate with team
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Connected</h3>
              <p className="text-gray-600">
                Receive real-time notifications and updates about schedule changes
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Trusted By Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Teams
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Join thousands of healthcare workers using our mobile app every day
            </p>
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiDeviceMobile className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">5000+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiUsers className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">User Satisfaction</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <HiClock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">App Availability</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">App Store Rating</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
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
      <div className="bg-blue-600 py-20">
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
                href="/demo" 
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