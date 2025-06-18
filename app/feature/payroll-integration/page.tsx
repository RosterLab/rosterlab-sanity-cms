import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiClock, HiDownload, HiRefresh, HiLink, HiDocument } from 'react-icons/hi'

export const metadata = {
  title: 'Payroll Integration - RosterLab',
  description: 'Seamless payroll and timesheet integration. Get your roster and payroll talking to each other with smart timesheets and accurate data sync.',
}

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
                  Get your roster and payroll talking to each other with smart timesheets for more accurate payroll data.
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
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Payroll Export Ready</span>
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">✓ Approved</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">Weekly Timesheet</p>
                            <p className="text-sm text-gray-500">Oct 7-13, 2024 • 156 employees</p>
                          </div>
                          <div className="text-right">
                            <HiDownload className="w-5 h-5 text-green-500 mb-1" />
                            <p className="text-xs text-green-600">Ready for export</p>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">API Sync Status</p>
                            <p className="text-sm text-gray-500">Last sync: 2 minutes ago</p>
                          </div>
                          <div className="text-right">
                            <HiRefresh className="w-5 h-5 text-blue-500 mb-1" />
                            <p className="text-xs text-blue-600">Auto-syncing</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-green-600 text-white rounded-lg py-3 font-semibold hover:bg-green-700 transition-colors">
                        Export to Payroll System
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiLink className="w-5 h-5 inline mr-1 text-green-500" />
                      Connected to your payroll system
                    </div>
                  </div>
                </div>
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
                  Export roster and timesheet data in multiple formats compatible with your payroll system. Upload directly or use automated file transfers to ensure accuracy and save time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multiple export formats (CSV, Excel, XML, JSON)</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automated file transfers via SFTP or API</span>
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
                  Sync with Your Payroll System Using Our API
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
                  Shareable Links to the Live Roster
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
                  Smart Timesheets for More Accurate Payroll Data
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

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Streamlined Payroll Processing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">85%</p>
                  <p className="text-xl opacity-90">Reduction in payroll processing time</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">99.9%</p>
                  <p className="text-xl opacity-90">Data accuracy improvement</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">Real-time</p>
                  <p className="text-xl opacity-90">Sync capabilities</p>
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