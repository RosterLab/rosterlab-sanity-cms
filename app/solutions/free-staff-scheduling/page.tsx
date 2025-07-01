import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import RosterLoadingBar from '@/components/ui/RosterLoadingBar'
import { HiCheck, HiClock, HiTrendingUp, HiUsers, HiShieldCheck, HiCog, HiAcademicCap } from 'react-icons/hi'

export const metadata = {
  title: 'Free Staff Scheduling Platform - No More Spreadsheets!',
  description: 'Free staff-scheduling tool that automates rosters, slashes admin time, and keeps shifts compliant—plan smarter, faster, no credit card required.',
}


const faqItems = [
  {
    question: "Is the AI generator included in the free product?",
    answer: "The AI generator is only available for the paid version of the platform, however if you're looking for a free digital scheduling solution we still offer great features that are better than using manual spreadsheets."
  },
  {
    question: "How much time and cost savings can we expect?",
    answer: "Most organizations see 70-90% reduction in time spent on scheduling, along with 15-30% reduction in overtime costs through better optimization. <a href='/roi-calculator' style='color: #2563eb; text-decoration: underline;'>Actual savings</a> depend on your current processes and organization size."
  }
]

const painPoints = [
  {
    title: 'No More Spreadsheet Chaos',
    description: 'Multiple versions, lost updates, and formula errors making scheduling a nightmare. Try digital scheduling - it\'s free forever.'
  },
  {
    title: '100% Compliant',
    description: 'Ensure all schedules meet regulatory requirements and overtime rules with automatic compliance checking'
  },
  {
    title: 'Seamless Communication',
    description: 'Keep your team informed with real-time updates and easy shift swapping through our mobile app'
  },
  {
    title: 'Reduce admin by 95%',
    description: 'Transform hours of manual scheduling into minutes with our intelligent digital platform'
  }
]

export default function ManualSchedulingPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-white pt-16 pb-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pb-8 lg:pb-12">
              <div className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                SMART DIGITAL SCHEDULING
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your free digital scheduling tool
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our free scheduling platform helps you manage shifts, track compliance, and keep your team happy.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Skill and seniority rostering</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Seamlessly integrate your long and short term rosters</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Fair workload balancing from the get go</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Move away from spreadsheets and into the cloud</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="https://app.rosterlab.com" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                  Start for Free
                </Button>
                <Button href="/solutions/ai-schedules" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Discover AI Rosters
                </Button>
              </div>
              
              {/* Free forever notice */}
              <div className="mt-6">
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-600">
                  <span className="font-medium">✓ Free forever</span>
                  <span className="font-medium">✓ No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="w-full max-w-lg">
                <Image
                  src="/images/illustration/test5 copy.svg"
                  alt="Free Staff Scheduling Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Pain Points Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Having a headache making rosters for shift workers?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              You&apos;re not alone. Teams waste hours each week struggling with outdated scheduling methods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Intelligent Scheduling Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Intelligent Scheduling
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI algorithms analyze thousands of variables to create optimal schedules that balance staff preferences, operational requirements, and compliance needs. Experience the future of workforce management.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">90% Time Reduction</h3>
                    <p className="text-gray-600">Generate complex rosters in minutes instead of days with our advanced AI algorithms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimised Staffing Coverage</h3>
                    <p className="text-gray-600">Mathematical optimization ensures the most efficient staff allocation and resource utilization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Staff Satisfaction</h3>
                    <p className="text-gray-600">Fair and balanced schedules improve work-life balance and increase staff retention</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[600px]">
              <RosterLoadingBar />
            </div>
          </div>
        </Container>
      </div>

      {/* Advanced AI Capabilities Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-1 lg:order-1">
              <Image
                src="/images/generating.webp"
                alt="Advanced AI features in action"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-2 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Advanced AI Capabilities
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our award-winning algorithms handle the most complex scheduling challenges with ease, ensuring compliance and optimization across all scenarios.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">24/7 Automatic roster generation</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Complex constraint handling</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time optimization and adjustments</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Multiple shift patterns and rotations</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Legal compliance checking</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Scenario simulation and planning</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Compliance Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built-in Compliance
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stay compliant with complex healthcare regulations and union agreements automatically. Our AI understands and enforces all relevant rules and constraints.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
                    <p className="text-gray-600">Automatic adherence to healthcare regulations and industry standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Skills Matching</h3>
                    <p className="text-gray-600">Ensures qualified staff are scheduled for appropriate roles and responsibilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiCog className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Rules Engine</h3>
                    <p className="text-gray-600">Configure organization-specific rules and policies for perfect compliance</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Fatigue Management</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Union Agreement Rules</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Minimum Rest Periods</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Maximum Work Hours</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700">Skills & Certifications</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Everything you need to know about our free digital scheduling tool
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </div>
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Simplify Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with our free digital scheduling tool and transform your workforce management today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="https://app.rosterlab.com" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start for Free
              </Button>
              <Button 
                href="/book-a-demo" 
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white hover:bg-white/30 px-8 py-4 text-lg font-semibold"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </>
    </SiteLayout>
  )
}