import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Link from 'next/link'

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
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
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
              <Link href="/industries/healthcare/edicu" className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group">
                <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">ICU/ED</h4>
                <p className="text-sm text-blue-700">Critical care scheduling with skill-based matching</p>
              </Link>
              <Link href="/industries/healthcare/agedcare" className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group">
                <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">Aged Care</h4>
                <p className="text-sm text-blue-700">Long-term care rostering with continuity focus</p>
              </Link>
              <Link href="/industries/healthcare/radiology" className="block bg-white rounded-lg p-4 hover:bg-blue-100 transition-colors group">
                <h4 className="font-semibold text-blue-900 mb-1 group-hover:text-blue-700">Radiology</h4>
                <p className="text-sm text-blue-700">Specialized imaging department scheduling</p>
              </Link>
            </div>
            
            <Button href="/industries/healthcare" className="w-full bg-blue-600 hover:bg-blue-700">
              Learn About Healthcare Solutions
            </Button>
          </div>

          {/* Other Industries */}
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h2v2H7V5zm6 0h-2v2h2V5zM7 9h2v2H7V9zm6 0h-2v2h2V9zm-6 4h2v2H7v-2zm6 0h-2v2h2v-2z" clipRule="evenodd" />
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