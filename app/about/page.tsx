import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export const metadata = {
  title: 'About Us - RosterLab',
  description: 'Learn about RosterLab\'s mission to revolutionize workforce scheduling with AI-powered optimization solutions.',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About RosterLab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing workforce management with AI-powered scheduling solutions that save time, reduce costs, and improve staff satisfaction.
          </p>
        </div>
      </Container>

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To solve one of the most complex organizational challenges - workforce scheduling - through innovative AI and mathematical optimization algorithms.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe that fair, efficient, and optimized rosters are the foundation of happy teams and successful organizations.
              </p>
              <Button href="/demo" className="bg-blue-600 text-white hover:bg-blue-700">
                See How We Do It
              </Button>
            </div>
            <div>
              <Image
                src="/images/founders.webp"
                alt="RosterLab founders"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Values Section */}
      <Container>
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We push the boundaries of what's possible with cutting-edge AI and optimization algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fairness</h3>
              <p className="text-gray-600">
                Every solution we build prioritizes equitable treatment and work-life balance for all staff.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
              <p className="text-gray-600">
                We measure success by the time saved, stress reduced, and lives improved through better scheduling.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Team Section */}
      <div className="bg-white py-20">
        <Container>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/images/foundersSitting.webp"
                alt="Team member"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leadership Team</h3>
              <p className="text-gray-600 mb-4">Co-founders & Operations Research Experts</p>
              <p className="text-sm text-gray-500">
                Award-winning team with deep expertise in mathematical optimization and healthcare operations.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the healthcare organizations already optimizing their workforce with RosterLab.
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
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}