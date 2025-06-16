import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'

export const metadata = {
  title: 'About Us - RosterLab',
  description: 'Learn about RosterLab\'s mission to revolutionize workforce scheduling with AI-powered optimization solutions.',
}

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="py-16">
      {/* Hero Section */}
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About RosterLab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re revolutionizing workforce management with AI-powered scheduling solutions that save time, reduce costs, and improve staff satisfaction.
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
                We push the boundaries of what&apos;s possible with cutting-edge AI and optimization algorithms.
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
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines expertise in AI, healthcare operations, and workforce management to deliver innovative scheduling solutions.
            </p>
          </div>
          
          {/* Leadership Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Leadership</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Dr. Sarah Chen</h4>
                  <p className="text-blue-600 font-medium mb-3">Co-Founder & CEO</p>
                  <p className="text-sm text-gray-600">
                    PhD in Operations Research from MIT. 15+ years experience in healthcare optimization and AI-driven scheduling solutions.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Michael Rodriguez</h4>
                  <p className="text-blue-600 font-medium mb-3">Co-Founder & CTO</p>
                  <p className="text-sm text-gray-600">
                    Former Google engineer with expertise in distributed systems and machine learning. Built scheduling systems for Fortune 500 companies.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Emma Thompson</h4>
                  <p className="text-blue-600 font-medium mb-3">Chief Operating Officer</p>
                  <p className="text-sm text-gray-600">
                    20+ years in healthcare administration. Led workforce transformation initiatives at major hospital networks across Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Core Team */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Core Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-1">James Park</h4>
                <p className="text-sm text-blue-600 mb-2">Head of Engineering</p>
                <p className="text-xs text-gray-600">Full-stack architect with expertise in scalable cloud solutions</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-1">Dr. Lisa Wang</h4>
                <p className="text-sm text-blue-600 mb-2">Head of Data Science</p>
                <p className="text-xs text-gray-600">AI researcher specializing in constraint optimization</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-1">Alex Kumar</h4>
                <p className="text-sm text-blue-600 mb-2">Head of Product</p>
                <p className="text-xs text-gray-600">Product strategist with deep healthcare industry knowledge</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-gray-900 mb-1">Rachel Green</h4>
                <p className="text-sm text-blue-600 mb-2">Head of Customer Success</p>
                <p className="text-xs text-gray-600">Healthcare workforce expert with nursing background</p>
              </div>
            </div>
          </div>
          
          {/* Join Us CTA */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Growing Team</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals passionate about solving complex scheduling challenges and improving healthcare operations.
            </p>
            <Button href="/careers" className="bg-blue-600 text-white hover:bg-blue-700">
              View Open Positions
            </Button>
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
    </SiteLayout>
  )
}