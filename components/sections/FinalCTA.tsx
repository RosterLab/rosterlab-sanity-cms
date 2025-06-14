import ContactForm from '@/components/forms/HubSpotForm'
import Container from '@/components/ui/Container'
import { HiClock, HiTrendingUp, HiUsers } from 'react-icons/hi'

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-lg opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-green-400 rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-12 h-32 bg-purple-400 rounded-lg opacity-20"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-6 bg-yellow-400 rounded-full opacity-20"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Having a headache making rosters for shift workers?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Enter your details below to find out more about how RosterLab can transform your scheduling process.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiClock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">90%</div>
                <div className="text-sm text-blue-100">time saving</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">10%</div>
                <div className="text-sm text-blue-100">improve on efficiency</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiUsers className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg font-bold">Better</div>
                <div className="text-sm text-blue-100">staff satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Get Started Today
            </h3>
            <ContactForm className="final-cta-form" />
          </div>
        </div>
      </Container>
    </section>
  )
}