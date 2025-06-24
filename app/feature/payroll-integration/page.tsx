import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiDownload, HiRefresh, HiLink, HiDocument } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'

export const metadata = {
  title: 'Integrate Roster & Timesheet Data With Payroll - RosterLab',
  description: 'Connect your staff schedule to payroll with ease. RosterLab supports live feeds, exports, automation, and full API sync - ensuring error free payroll.',
}

const faqItems = [
  {
    question: "Which payroll systems does RosterLab integrate with?",
    answer: "RosterLab integrates with most major payroll systems including ADP, Paychex, Workday, SAP, Oracle, and many others. We support multiple integration methods including API sync, file exports (CSV, Excel, XML), and direct database connections. If your payroll system isn't listed, our team can create a custom integration."
  },
  {
    question: "How does the automatic data sync work?",
    answer: "Our API-based sync continuously monitors your roster data for changes and automatically pushes updates to your payroll system. You can configure sync frequency (real-time, hourly, or daily), set up approval workflows, and define which data fields to sync. The system includes conflict detection and resolution to ensure data integrity."
  },
  {
    question: "Can I review timesheet data before it goes to payroll?",
    answer: "Yes! RosterLab includes a comprehensive approval workflow. Managers can review and approve timesheets before they're sent to payroll. You can set up multi-level approvals, bulk approve timesheets, and handle exceptions. The system flags any anomalies like excessive overtime or missing clock-ins for review."
  },
  {
    question: "How secure is the payroll data transfer?",
    answer: "We take security seriously. All data transfers use bank-level encryption (256-bit SSL/TLS). API connections require OAuth 2.0 authentication, and we support IP whitelisting. Our platform is SOC 2 Type II certified and complies with GDPR, HIPAA, and other data protection regulations. All data is encrypted at rest and in transit."
  },
  {
    question: "What happens if there's a sync error?",
    answer: "Our system includes comprehensive error handling and recovery. If a sync fails, you'll receive immediate notifications via email or SMS. The system automatically retries failed syncs and maintains a detailed audit log. Our support team is available 24/7 to help resolve any integration issues quickly."
  }
]

export default function PayrollIntegrationPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Seamless Payroll & Timesheet Integration
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Get your roster and payroll talking to each other with our smart integration solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple export formats (CSV, Excel, XML, JSON)</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automated file transfers via our API</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom field mapping for any payroll system</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Export Feature Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: API Sync */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">API Sync Visualization</span>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time bidirectional data synchronization</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic conflict detection and resolution</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Secure, time-limited access links</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time roster data always current</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Role-based access controls and permissions</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Live Roster Link Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Smart Timesheets */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Smart Timesheet Dashboard</span>
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
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Auto-generated timesheets from roster data</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Bulk approval and exception handling</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
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
                  className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
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