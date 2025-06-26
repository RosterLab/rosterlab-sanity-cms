import ContactFormWrapper from '@/components/forms/ContactFormWrapper'
import Container from '@/components/ui/Container'
import { HiClock, HiTrendingUp, HiUsers } from 'react-icons/hi'

export default function FinalCTA() {
  return (
    <section className="py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
    }}>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Having a headache making rosters for shift workers?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Enter your details below to find out more about how RosterLab can transform your scheduling process.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiClock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">90%</div>
                <div className="text-sm text-white/80">time saving</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">10%</div>
                <div className="text-sm text-white/80">improve on efficiency</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <HiUsers className="w-6 h-6 text-white" />
                </div>
                <div className="text-lg font-bold">Better</div>
                <div className="text-sm text-white/80">staff satisfaction</div>
              </div>
            </div>

            {/* Google Reviews */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-8 max-w-sm border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white/90 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-semibold text-white">Google Reviews</span>
                </div>
              </div>
              <div className="flex items-center justify-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-bold text-white">5.0</span>
              </div>
              <p className="text-center text-white/80 text-xs">
                Based on 24 reviews
              </p>
              <div className="mt-3 text-center">
                <button className="text-white/90 hover:text-white text-xs font-medium underline">
                  Read our reviews →
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Get Started Today
            </h3>
            <ContactFormWrapper />
          </div>
        </div>
      </Container>
    </section>
  )
}