import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiDeviceMobile, HiCalendar, HiBell, HiUserGroup, HiClock, HiCheckCircle, HiCheck } from 'react-icons/hi'

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

export default function EmployeeMobileAppPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 py-20 relative overflow-hidden">
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
                  <span className="text-gray-700 font-medium">Offline mode available</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/demo" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-full font-semibold">
                  Book a Demo
                </Button>
                <Button href="/contact" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold">
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
      <Container>
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything your staff needs, anywhere they are
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Benefits for your organization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-purple-600" />
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
      <Container>
        <div className="py-20">
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
        </div>
      </Container>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to empower your workforce?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Give your staff the tools they need to manage their schedules effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/demo" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
              >
                Book a Demo
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
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