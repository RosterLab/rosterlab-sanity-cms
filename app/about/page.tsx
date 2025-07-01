import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiMail, HiLightBulb, HiScale, HiTrendingUp } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'

export const metadata = {
  title: 'About Us - Meet the Team Behind RosterLab',
  description: 'Learn about us and the people behind RosterLab. Our team is dedicated to building smarter, fairer scheduling solutions that put people first.',
  other: {
    'link': '<link rel="preload" href="/images/illustration/Timeline-pana.svg" as="image" type="image/svg+xml" fetchpriority="high" />'
  }
}

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="py-16">
        <Container>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
            }}>
              RosterLab
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re revolutionizing workforce management with AI-powered scheduling solutions that save time, reduce costs, and improve staff satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/careers" className="bg-blue-600 text-white hover:bg-blue-700">
              View Open Positions
            </Button>
            <Button href="/contact" className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Timeline Illustration */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-2xl relative" style={{ aspectRatio: '600/400' }}>
            <Image
              src="/images/illustration/Timeline-pana.svg"
              alt="Timeline illustration"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
              fetchPriority="high"
              placeholder="empty"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
          </div>
        </div>
        </Container>
      </div>

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
              <Button href="/book-a-demo" className="bg-blue-600 text-white hover:bg-blue-700">
                See How We Do It
              </Button>
            </div>
            <div>
              <Image
                src="/images/team/rosterlab team photo.webp"
                alt="RosterLab team"
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
                <HiLightBulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We push the boundaries of what&apos;s possible with cutting-edge AI and optimization algorithms.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiScale className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fairness</h3>
              <p className="text-gray-600">
                Every solution we build prioritizes equitable treatment and work-life balance for all staff.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiTrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impact</h3>
              <p className="text-gray-600">
                We measure success by time saved, stress reduced & lives improved through better scheduling.
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
                    src="/images/team/Headshot isaac.webp"
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
                    src="/images/team/Sunny Headshot.webp"
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
                    src="/images/team/Headshot daniel.webp"
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
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-800">JK</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Jason Ko</h4>
                <p className="text-sm text-blue-600 mb-2">Full Stack Software Developer</p>
                <p className="text-xs text-gray-600">Building robust features across our entire tech stack to support smarter rostering.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">RG</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Ryan Green</h4>
                <p className="text-sm text-blue-600 mb-2">Marketing Manager</p>
                <p className="text-xs text-gray-600">Leading growth strategies and driving awareness of our staff scheduling tool.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-sky-800">CS</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Clemen Sun</h4>
                <p className="text-sm text-blue-600 mb-2">Software Engineer</p>
                <p className="text-xs text-gray-600">Focusing on backend systems that power our AI-driven scheduling engine.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-800">GK</span>
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
      <div className="hidden md:block py-20 bg-white">
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

              {/* Milestone 1 - PhD Research */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">The Idea Began</h3>
                  <p className="text-gray-600 mt-2">The idea began with Isaac's PhD research in roster optimisation at the University of Auckland, where he explored how algorithms could dramatically improve workforce scheduling.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">University Research</p>
                </div>
              </div>

              {/* Milestone 2 - Company Founded */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">Company Founded</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">RosterLab Founded</h3>
                  <p className="text-gray-600 mt-2">RosterLab was founded by Daniel, Sunny, and Isaac - a team united by a shared mission to fix broken rostering systems in complex industries like healthcare.</p>
                </div>
              </div>

              {/* Milestone 3 - Velocity Competition */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">Velocity Innovation Competition Winners</h3>
                  <p className="text-gray-600 mt-2">We won first place in the Velocity Innovation competition hosted by the University Of Auckland in 2020.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">2020</p>
                </div>
              </div>

              {/* Milestone 4 - World Champions */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">International Recognition</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">World Champions In Automatic Rostering</h3>
                  <p className="text-gray-600 mt-2">Our technology won first place at the International Nurse Rostering Competition by providing the best solution.</p>
                </div>
              </div>

              {/* Milestone 5 - Shared Mission */}
              <div className="relative flex items-center justify-between mb-16">
                <div className="w-5/12 text-right pr-8">
                  <h3 className="text-xl font-bold text-gray-900">Our Mission Crystallized</h3>
                  <p className="text-gray-600 mt-2">What started as an academic project quickly turned into a shared mission: to take the pain out of scheduling and give time back to frontline staff.</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <p className="text-lg font-semibold text-gray-700">2024</p>
                </div>
              </div>

              {/* Milestone 6 - Real-World Impact */}
              <div className="relative flex items-center justify-between">
                <div className="w-5/12 text-right pr-8">
                  <p className="text-lg font-semibold text-gray-700">Today</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-bold text-gray-900">Real-World Impact</h3>
                  <p className="text-gray-600 mt-2">Today, our staff scheduling software is used by hundreds of clients in healthcare and other industries, helping solve some of the most complex rostering problems.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-20" style={{
        background: 'linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)'
      }}>
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
                href="/book-a-demo" 
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

    </SiteLayout>
  )
}