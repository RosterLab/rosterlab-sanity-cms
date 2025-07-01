import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata = {
  title: 'Integrate Roster & Timesheet Data With Payroll - RosterLab',
  description: 'Connect your staff schedule to payroll with ease. RosterLab supports live feeds, exports, automation, and full API sync - ensuring error free payroll.',
}

const faqItems = [
  {
    question: "Which payroll systems does RosterLab integrate with?",
    answer: "RosterLab can create integrations with most major payroll systems including ADP, Paychex, Workday, SAP, Oracle, and many others. We support multiple integration methods including API sync and file exports (CSV, Excel, XML)."
  },
  {
    question: "Can I review timesheet data before it goes to payroll?",
    answer: "Yes! RosterLab includes a comprehensive approval workflow. Managers can review and approve timesheets before they're sent to payroll."
  },
  {
    question: "What happens if there's a sync error?",
    answer: "Our system includes comprehensive error handling and recovery. If a sync fails, you'll receive a notification. Our <a href='/contact' class='text-green-600 hover:text-green-700 underline'>support team</a> is available 24/7 to help resolve any integration issues quickly."
  }
]

export default function PayrollIntegrationPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Seamless Payroll & Timesheet Integration
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get your roster and payroll talking to each other with our smart integration solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Book A Demo
                  </Button>
                  <Button 
                    href="/solutions/free-staff-scheduling" 
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    Try it for free
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Manage money-pana.svg"
                  alt="Payroll integration illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Export and Upload Data */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Export and Upload to Your Payroll
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Export roster and timesheet data in multiple formats compatible with your payroll system. Upload directly to ensure accuracy and save time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple export formats (CSV, Excel, XML, JSON)</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automated file transfers via our API</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom field mapping for any payroll system</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Folder-pana.svg"
                  alt="Payroll export and folder management illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: API Sync */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-4">
                  {/* Browser Window Chrome */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 ml-4 hidden sm:block">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
                          https://app.rosterlab.com/api/sync
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="p-6 bg-gray-50">
                      <div className="flex flex-col items-center justify-center">
                        {/* RosterLab System */}
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200 w-full max-w-xs mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xs">RL</span>
                              </div>
                              <span className="font-semibold text-gray-900 text-sm">RosterLab</span>
                            </div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">roster_data.json</div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">timesheets.csv</div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">employees.xml</div>
                          </div>
                        </div>
                        
                        {/* Sync Arrows Animation */}
                        <div className="relative w-full max-w-xs h-14 mb-6">
                          {/* Downward arrow */}
                          <div className="absolute left-1/4 top-0 transform -translate-x-1/2">
                            <svg className="w-6 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-14 overflow-hidden">
                              <div className="w-full h-4 bg-gradient-to-b from-green-600 to-transparent animate-[slide-down_3s_ease-in-out_0.5s_both]"></div>
                            </div>
                          </div>
                          
                          {/* Upward arrow */}
                          <div className="absolute right-1/4 top-0 transform translate-x-1/2">
                            <svg className="w-6 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-14 overflow-hidden">
                              <div className="w-full h-4 bg-gradient-to-t from-blue-600 to-transparent animate-[slide-up_3s_ease-in-out_1.5s_both]"></div>
                            </div>
                          </div>
                          
                          {/* RosterLab API Label */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-1 shadow-md border border-gray-200">
                            <span className="text-xs font-semibold text-gray-700">RosterLab API</span>
                          </div>
                        </div>
                        
                        {/* Payroll System */}
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 w-full max-w-xs">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-xs">PR</span>
                              </div>
                              <span className="font-semibold text-gray-900 text-sm">Payroll System</span>
                            </div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">hours_worked.dat</div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">pay_rates.sql</div>
                            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600 font-mono">deductions.txt</div>
                          </div>
                        </div>
                        
                        {/* Status Bar */}
                        <div className="mt-4 w-full max-w-xs">
                          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-green-500 h-full w-full animate-[progress_3s_ease-in-out_both]"></div>
                          </div>
                          <div className="mt-2 text-center">
                            <p className="text-xs text-gray-600 font-mono">Status: Connected</p>
                            <p className="text-xs text-green-600 font-medium mt-1">✓ Last synced: 2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Sync Your Data to Payroll Using Our API
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Real-time data synchronization between RosterLab and your payroll system. Ensure accuracy and stay up-to-date with automatic two-way data flow and conflict resolution.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time bidirectional data synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic conflict detection and resolution</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Secure API connections with authentication</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Shareable Live Roster Links */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Shareable Links to Your Live Roster
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Generate secure, shareable links to live roster data that your payroll team can access directly. Always up-to-date information without manual file transfers or outdated data.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Secure access links</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time roster data always current</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Role-based access controls and permissions</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Share-link-pana.svg"
                  alt="Shareable links to live roster"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Smart Timesheets */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <Image
                    src="/images/illustration/Transfer files-pana.svg"
                    alt="Smart timesheet transfer illustration"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Smart Timesheets for More Accurate Payroll
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Intelligent timesheet generation based on actual roster data. Approve timesheets in bulk, handle exceptions efficiently, then export clean data for payroll processing.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Auto-generated timesheets from roster data</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Bulk approval and exception handling</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Overtime calculations and pay rate handling</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Payroll Integration Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">99.9%</p>
                  <p className="text-xl opacity-90">Payroll accuracy rate</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">8 hrs</p>
                  <p className="text-xl opacity-90">Saved per payroll cycle</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">Zero</p>
                  <p className="text-xl opacity-90">Manual data entry errors</p>
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
                Ready to Connect Your Roster and Payroll?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Eliminate manual data entry and ensure payroll accuracy with seamless integration between your roster and payroll systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
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