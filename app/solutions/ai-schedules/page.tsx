import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import RosterLoadingBar from '@/components/ui/RosterLoadingBar'
import { HiCheck, HiClock, HiTrendingUp, HiUsers, HiCog, HiAcademicCap, HiShieldCheck } from 'react-icons/hi'

export const metadata = {
  title: 'AI Staff Scheduling Solution - 90% Time Reduction',
  description: 'Reduce staff scheduling admin by up to 90% with our AI-powered solution. Automate rosters, boost coverage accuracy, & free managers to focus on what matters.',
}

const faqItems = [
  {
    question: "How does AI-powered scheduling actually work?",
    answer: "Our AI algorithms analyze historical data, staff preferences, skill requirements, and compliance rules to generate optimal schedules. The system learns from patterns and continuously improves its recommendations based on feedback and outcomes."
  },
  {
    question: "How long does it take to implement RosterLab's AI scheduling?",
    answer: "Implementation typically takes 2-4 weeks depending on your organization's size and complexity. This includes data migration, system configuration, staff training, and initial AI model calibration to match your specific requirements."
  },
  {
    question: "Can the AI handle complex compliance and union rules?",
    answer: "Yes, our AI is designed to understand and enforce complex regulatory requirements, union agreements, and organizational policies. You can configure custom rules and the system will ensure all generated schedules are fully compliant."
  },
  {
    question: "What happens if we need to make manual adjustments to AI-generated schedules?",
    answer: "You maintain full control over the scheduling process. Managers can easily review and modify AI-generated schedules before publishing. The AI learns from these adjustments to improve future recommendations."
  },
  {
    question: "How much time and cost savings can we expect?",
    answer: "Most organizations see 70-90% reduction in time spent on scheduling, along with 15-30% reduction in overtime costs through better optimization. Actual savings depend on your current processes and organization size."
  }
]

export default function AISchedulesPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Make rostering faster than ever before
            </h1>
            <p className="text-2xl text-gray-600 mb-12">
              Unlock the full power of AI roster creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                href="/demo" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
              >
                Book a Demo
              </Button>
              <Button 
                href="/example" 
                className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                See an Example
              </Button>
            </div>
            <div className="flex justify-center mb-16">
              <Image
                src="/images/illustration/test3.svg"
                alt="AI Scheduling Illustration"
                width={600}
                height={400}
                className=""
              />
            </div>
          </div>
        </Container>
      </div>

      {/* AI Benefits Section */}
      <div className="bg-gray-50 py-20">
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

      {/* Advanced Features Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Image
                src="/images/generating.webp"
                alt="Advanced AI features in action"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
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
      <div className="bg-gray-50 py-20">
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
      <div className="bg-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Everything you need to know about AI-powered scheduling
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-20">
        <Container>
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to unlock the power of AI?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join hundreds of healthcare organizations already using AI to transform their workforce management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/demo" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              >
                Book a Demo
              </Button>
              <Button 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
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