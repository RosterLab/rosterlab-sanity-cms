import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function IndustrySolutions() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Tailored Solutions for Your Industry
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            RosterLab adapts to your specific industry requirements with specialized features and configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Healthcare Organizations */}
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                Healthcare Organizations
              </h3>
              <p className="text-blue-700 mb-6">
                Specialized solutions for complex medical scheduling with compliance built-in
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-1">ICU/ED</h4>
                <p className="text-sm text-blue-700">Critical care scheduling with skill-based matching</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-1">Aged Care</h4>
                <p className="text-sm text-blue-700">Long-term care rostering with continuity focus</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-1">Radiology</h4>
                <p className="text-sm text-blue-700">Specialized imaging department scheduling</p>
              </div>
            </div>
            
            <Button href="/healthcare" className="w-full bg-blue-600 hover:bg-blue-700">
              Learn About Healthcare Solutions
            </Button>
          </div>

          {/* Other Industries */}
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Other Industries
              </h3>
              <p className="text-green-700 mb-6">
                Flexible solutions that adapt to any industry with complex scheduling needs
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-1">Hospitality</h4>
                <p className="text-sm text-green-700">Restaurant and hotel staff scheduling</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-1">24/7 Support Teams</h4>
                <p className="text-sm text-green-700">Round-the-clock customer service rostering</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-1">Manufacturing</h4>
                <p className="text-sm text-green-700">Shift work optimization for production lines</p>
              </div>
            </div>
            
            <Button href="/industries" className="w-full bg-green-600 hover:bg-green-700">
              Explore All Industries
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}