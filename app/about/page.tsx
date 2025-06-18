import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiMail } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'

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
                src="https://rosterlab.com/hubfs/Group%20533.png"
                alt="RosterLab mission"
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
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/Headshot isaac.jpg"
                    alt="Dr Isaac Cleeland"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Dr Isaac Cleeland</h4>
                  <p className="text-blue-600 font-medium mb-3">Creator & Founder</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Visionary leader in workforce optimization and AI-driven scheduling solutions for healthcare organizations.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href="mailto:isaac@rosterlab.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Email Isaac"
                    >
                      <HiMail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/isaac-cleland-01652387/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Isaac's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/Sunny Headshot.jpg"
                    alt="Sunny Feng"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Sunny Feng</h4>
                  <p className="text-blue-600 font-medium mb-3">Co-Founder & Head of Product</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Product visionary with deep expertise in healthcare operations and user-centered design for complex scheduling systems.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href="mailto:sunny@rosterlab.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Email Sunny"
                    >
                      <HiMail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sunny-feng-042085b4/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Sunny's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src="/images/team/Headshot daniel.jpg"
                    alt="Daniel Ge"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Daniel Ge</h4>
                  <p className="text-blue-600 font-medium mb-3">Co-Founder & Rostering Architect</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Expert architect of advanced rostering algorithms and optimization strategies for complex workforce scheduling challenges.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href="mailto:daniel@rosterlab.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Email Daniel"
                    >
                      <HiMail className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/daniel-ge-a177ba158/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Daniel's LinkedIn"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Core Team */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Core Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">JK</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Jason Ko</h4>
                <p className="text-sm text-blue-600 mb-2">Full Stack Software Developer</p>
                <p className="text-xs text-gray-600">Building robust features across our entire tech stack to support smarter rostering.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">RG</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Ryan Green</h4>
                <p className="text-sm text-blue-600 mb-2">Marketing Manager</p>
                <p className="text-xs text-gray-600">Leading growth strategies and driving awareness of our staff scheduling tool.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">CS</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Clemen Sun</h4>
                <p className="text-sm text-blue-600 mb-2">Software Engineer</p>
                <p className="text-xs text-gray-600">Focusing on backend systems that power our AI-driven scheduling engine.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">GK</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Gary Kessel</h4>
                <p className="text-sm text-blue-600 mb-2">Roster Optimisation Specialist</p>
                <p className="text-xs text-gray-600">Working closely with clients to fine-tune rosters and ensure real-world success.</p>
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

      {/* Milestones Timeline Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to revolutionizing healthcare scheduling, here are the key milestones in our story.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

              {/* Milestone 1 */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">Company Founded</h3>
                  <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. The journey begins with a vision to transform healthcare scheduling.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-blue-600">January 2019</p>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-green-600">August 2019</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">First Hospital Partnership</h3>
                  <p className="text-gray-600 mt-2">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Our first major healthcare client validates our approach.</p>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">AI Engine Launch</h3>
                  <p className="text-gray-600 mt-2">Ut enim ad minim veniam, quis nostrud exercitation. Revolutionary AI-powered scheduling algorithm goes live.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-purple-600">March 2020</p>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-orange-600">November 2021</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">International Expansion</h3>
                  <p className="text-gray-600 mt-2">Duis aute irure dolor in reprehenderit. Expanding beyond New Zealand to serve healthcare organizations globally.</p>
                </div>
              </div>

              {/* Milestone 5 */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">Mobile App Release</h3>
                  <p className="text-gray-600 mt-2">Excepteur sint occaecat cupidatat non proident. Launch of iOS and Android apps for staff on-the-go access.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-pink-600">June 2022</p>
                </div>
              </div>

              {/* Milestone 6 */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-indigo-600">December 2023</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">1000+ Healthcare Teams</h3>
                  <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet. Milestone achievement serving over 1000 healthcare teams worldwide.</p>
                </div>
              </div>
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
    </SiteLayout>
  )
}