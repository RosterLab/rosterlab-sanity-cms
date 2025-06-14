import Container from '@/components/ui/Container'
import ContactForm from '@/components/forms/HubSpotForm'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiCheck } from 'react-icons/hi'

export const metadata = {
  title: 'Contact Us - RosterLab',
  description: 'Get in touch with RosterLab for AI-powered rostering solutions. Book a demo and see how we can help your healthcare team.',
}

export default function ContactPage() {
  return (
    <SiteLayout>
      <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Book a demo with our expert team 📆
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            See how RosterLab&apos;s AI-powered rostering can save your healthcare team 90% of scheduling time and improve staff satisfaction.
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiClock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-800 mb-1">90% Time Saving</h3>
            <p className="text-green-700 text-sm">Generate rosters in minutes, not hours</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-800 mb-1">10% Better Efficiency</h3>
            <p className="text-blue-700 text-sm">Optimize staff allocation automatically</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-1">Better Staff Satisfaction</h3>
            <p className="text-purple-700 text-sm">Fairer, safer rosters for your team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* HubSpot Demo Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Book Your Demo
            </h2>
            <p className="text-neutral-600 mb-6">
              Fill out the form below and our team will reach out to schedule a personalized demo of RosterLab&apos;s AI-powered rostering platform.
            </p>
            <ContactForm className="contact-form" />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Get in touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HiMail className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <p className="text-neutral-600">hello@rosterlab.com</p>
                    <p className="text-sm text-neutral-500">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HiPhone className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                    <p className="text-neutral-600">+64 9 307 4778</p>
                    <p className="text-sm text-neutral-500">Mon-Fri 9am-6pm NZST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <HiLocationMarker className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Headquarters</h3>
                    <p className="text-neutral-600">
                      Level 1, 22 The Strand<br />
                      Parnell, Auckland 1010<br />
                      New Zealand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    How quickly can we get started?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Most implementations can be completed within 1-2 weeks, depending on your specific requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Do you offer training?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Yes! We provide comprehensive training for all users and ongoing support to ensure success.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Can you integrate with our existing systems?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    RosterLab integrates with most HR and payroll systems. We&apos;ll assess your current setup during our consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      </div>
    </SiteLayout>
  )
}