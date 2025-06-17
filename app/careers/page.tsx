import Container from '@/components/ui/Container'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiExternalLink, HiMail, HiLocationMarker, HiLightningBolt, HiUserGroup, HiGlobeAlt } from 'react-icons/hi'

export const metadata = {
  title: 'Careers - Join Our Team | RosterLab',
  description: 'Join RosterLab and help revolutionize workforce scheduling with AI. View our open positions and learn about our culture.',
}

const openPositions = [
  {
    title: 'Software Engineer - React/Node',
    location: 'Auckland, New Zealand (Hybrid)',
    type: 'Full-time',
    department: 'Engineering',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/4250149920',
    description: 'Build and maintain our full-stack web application using React, Node.js, and modern web technologies.'
  },
  {
    title: 'Sales Account Executive',
    location: 'Auckland, New Zealand (Hybrid)',
    type: 'Full-time',
    department: 'Sales',
    linkedinUrl: 'https://www.linkedin.com/jobs/view/4250122963',
    description: 'Drive revenue growth by identifying and closing new business opportunities in the healthcare sector.'
  }
]

export default function CareersPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Us in Revolutionizing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                Workforce Scheduling
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of a team that's making a real difference in healthcare by solving one of the industry's most complex challenges.
            </p>
          </div>
        </Container>
      </section>

      {/* Why RosterLab */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join RosterLab?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just building software - we're transforming how healthcare organizations manage their most valuable asset: their people.
            </p>
          </div>

          {/* Mini photo collage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/collage bank/Collage 2.jpg" 
                alt="Team culture" 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/collage bank/collage 3.jpg" 
                alt="Team activities" 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/collage bank/collage 5.jpg" 
                alt="Team collaboration" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLightningBolt className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">
                Your work directly helps healthcare workers spend more time caring for patients and less time on scheduling.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiUserGroup className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Team Culture</h3>
              <p className="text-gray-600">
                Join a diverse, passionate team that values collaboration, innovation, and work-life balance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiGlobeAlt className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">People First</h3>
              <p className="text-gray-600">
                We prioritize our team's wellbeing with flexible work arrangements and a culture that values work-life balance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Ready to make a difference? Check out our current openings.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apply
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {openPositions.map((position, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {position.title}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {position.department} • {position.location}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {position.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                        {position.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                        {position.location}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <a
                          href={position.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-900"
                        >
                          View on LinkedIn
                          <HiExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* General Application */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for talented people who share our mission. If you're passionate about improving healthcare through technology, we'd love to hear from you.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Send Us Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Even if we're not actively hiring for your role, we keep all resumes on file and reach out when opportunities arise that match your skills and interests.
              </p>
              <a
                href="mailto:careers@rosterlab.com"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                <HiMail className="mr-2 h-5 w-5" />
                Send Resume to careers@rosterlab.com
              </a>
            </div>

            <div className="text-left bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">We're particularly interested in:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Software engineers with experience in React/Node
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Product marketeers who understand enterprise SaaS and B2B
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Customer success professionals with healthcare industry experience
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Sales professionals passionate about solving real problems in healthcare
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Office Location */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Office
                </h2>
                <p className="text-gray-600 mb-6">
                  Our headquarters is located in beautiful Auckland, New Zealand. Team members are welcome to work hybrid with a mix of in-person team days & off-site.
                </p>
                <div className="flex items-start">
                  <HiLocationMarker className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">RosterLab Headquarters</p>
                    <p className="text-gray-600">
                      314/380 Khyber Pass Road<br />
                      Newmarket, Auckland 1023<br />
                      New Zealand
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Benefits & Perks
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitive salary and equity
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Flexible working arrangements
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional development
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Health and wellness focus
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Regular team events and offsites
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us in our mission to give healthcare workers more time to focus on what matters most - patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.linkedin.com/company/rosterlab/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Follow us on LinkedIn
              </a>
              <a
                href="mailto:careers@rosterlab.com"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}