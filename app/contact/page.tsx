import Container from '@/components/ui/Container'
import ContactForm from '@/components/forms/HubSpotForm'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiCheck } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'

export const metadata = {
  title: 'Contact Us - RosterLab',
  description: 'Contact the team about your staff rostering needs using our contact form or live chat feature. We will aim to get back to you within 24 hours.',
}

const faqItems = [
  {
    question: "How quickly can we get started?",
    answer: "Most implementations can be completed within 1-2 weeks, depending on your specific requirements."
  },
  {
    question: "Do you offer training?",
    answer: "Yes! We provide comprehensive training for all users and ongoing support to ensure success."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "RosterLab integrates with most HR and <a href='/feature/payroll-integration' class='text-blue-600 hover:text-blue-700 underline'>payroll systems</a>. We'll assess your current setup during our consultation."
  }
]

export default function ContactPage() {
  return (
    <SiteLayout>
      <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Speak to a rostering expert
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We&apos;re here to help you solve your complex challenges and requirements.
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
            <h3 className="font-semibold text-blue-800 mb-1">100% Compliant</h3>
            <p className="text-blue-700 text-sm">Guaranteed to meet union and contract obligations</p>
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
                    <p className="text-neutral-600">+64 276366388</p>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-neutral-500">Mon-Fri 9am-6pm NZST</p>
                      <a 
                        href="https://wa.me/64276366388" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </div>
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
                      314/380 Khyber Pass Road<br />
                      Newmarket, Auckland 1023<br />
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
              
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </Container>
      </div>
    </SiteLayout>
  )
}