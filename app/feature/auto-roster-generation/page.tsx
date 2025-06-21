import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiCog, HiLightningBolt, HiShieldCheck, HiUsers, HiCalendar } from 'react-icons/hi'

export const metadata = {
  title: 'Auto Roster Generation - RosterLab',
  description: 'Generate perfect rosters automatically with AI-powered optimization. Save hours of manual work while ensuring fairness and compliance.',
}

export default function AutoRosterGenerationPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Generate perfect rosters automatically
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Let AI create optimal schedules in minutes while ensuring fairness, compliance, and staff satisfaction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Auto-Generated Roster</span>
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">✓ Optimized</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">October 2024 Schedule</p>
                            <p className="text-sm text-gray-500">45 staff • 672 shifts • 100% coverage</p>
                          </div>
                          <div className="text-right">
                            <HiLightningBolt className="w-5 h-5 text-purple-500 mb-1" />
                            <p className="text-xs text-purple-600">Generated in 2 minutes</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-green-100 text-green-700 p-2 rounded">
                            <p className="font-medium">Fairness Score</p>
                            <p className="text-lg font-bold">98%</p>
                          </div>
                          <div className="bg-blue-100 text-blue-700 p-2 rounded">
                            <p className="font-medium">Compliance</p>
                            <p className="text-lg font-bold">100%</p>
                          </div>
                          <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
                            <p className="font-medium">Satisfaction</p>
                            <p className="text-lg font-bold">94%</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-purple-600 text-white rounded-lg py-3 font-semibold hover:bg-purple-700 transition-colors">
                        Generate New Roster
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiCog className="w-5 h-5 inline mr-1 text-purple-500" />
                      AI-powered optimization engine
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: AI-Powered Optimization */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  AI-Powered Optimization Engine
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our advanced algorithms consider thousands of variables including staff preferences, skills, availability, compliance rules, and fairness metrics to create optimal schedules automatically.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Considers 50+ variables simultaneously</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Balances preferences with operational needs</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Learns from historical patterns and feedback</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">AI Optimization Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Compliance & Fairness */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Compliance Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Built-in Compliance & Fairness
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Automatically enforce all regulatory requirements, union agreements, and internal policies while ensuring fair distribution of shifts, overtime, and weekend work across your team.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic compliance with all regulations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fair distribution of desirable and undesirable shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Respects minimum rest periods and maximum hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Customizable Parameters */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Customizable Generation Parameters
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Fine-tune the generation process to match your organization's priorities. Adjust the balance between cost optimization, staff satisfaction, coverage requirements, and other key metrics.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Adjustable optimization weights and priorities</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom rules and constraints configuration</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple generation scenarios for comparison</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Parameter Configuration</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Quality Metrics & Analytics */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Quality Analytics Dashboard</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Quality Metrics & Analytics
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Get detailed insights into roster quality with comprehensive metrics on fairness, efficiency, compliance, and staff satisfaction. Track improvements over time and identify optimization opportunities.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Comprehensive quality scoring and metrics</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Historical trend analysis and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Predictive analytics for future optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Automated Roster Generation Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">95%</p>
                  <p className="text-xl opacity-90">Time savings vs manual scheduling</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">98%</p>
                  <p className="text-xl opacity-90">Average fairness score</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">2 min</p>
                  <p className="text-xl opacity-90">Average generation time</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Automate Your Roster Generation?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Transform hours of manual scheduling into minutes of automated optimization with AI-powered roster generation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}