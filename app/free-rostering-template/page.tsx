import Container from '@/components/ui/Container'
import SiteLayout from '@/components/layout/SiteLayout'
import { HiDownload, HiClock, HiTemplate, HiUserGroup, HiCheckCircle, HiArrowRight } from 'react-icons/hi'

export const metadata = {
  title: 'Free Excel Rostering Template - RosterLab',
  description: 'Download our free Excel rostering spreadsheet template. Perfect for small healthcare teams looking to improve their scheduling process.',
}

export default function FreeRosteringTemplatePage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <HiTemplate className="w-4 h-4 mr-2" />
                FREE RESOURCE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Free Excel Rostering Template for Healthcare Teams
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your manual scheduling process with our professionally designed Excel template. Built specifically for healthcare teams managing complex shift patterns.
              </p>
              
              {/* Benefits List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <HiCheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pre-built formulas for automatic shift calculations</span>
                </li>
                <li className="flex items-start">
                  <HiCheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Staff availability and preference tracking</span>
                </li>
                <li className="flex items-start">
                  <HiCheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Compliance monitoring for work hours and breaks</span>
                </li>
                <li className="flex items-start">
                  <HiCheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Visual roster overview with color coding</span>
                </li>
              </ul>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiDownload className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your Free Template
                </h2>
                <p className="text-gray-600">
                  Fill out the form below to download instantly
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size *
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 staff</option>
                    <option value="11-25">11-25 staff</option>
                    <option value="26-50">26-50 staff</option>
                    <option value="51-100">51-100 staff</option>
                    <option value="100+">100+ staff</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="currentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Scheduling Method
                  </label>
                  <select
                    id="currentMethod"
                    name="currentMethod"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select current method</option>
                    <option value="paper">Paper-based</option>
                    <option value="excel">Excel/Spreadsheets</option>
                    <option value="software">Other software</option>
                    <option value="none">No formal system</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium flex items-center justify-center"
                >
                  <HiDownload className="w-5 h-5 mr-2" />
                  Download Free Template
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By downloading, you agree to receive helpful rostering tips and updates from RosterLab. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What's Included in the Template
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create fair, compliant rosters for your healthcare team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiClock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Shift Pattern Templates</h3>
              <p className="text-gray-600">
                Pre-configured shift patterns for AM, PM, and night shifts with automatic hour calculations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiUserGroup className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Staff Management</h3>
              <p className="text-gray-600">
                Track staff availability, qualifications, and preferences in one organized spreadsheet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiTemplate className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance Tracking</h3>
              <p className="text-gray-600">
                Built-in formulas to monitor maximum hours, required breaks, and consecutive shifts
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Ready to Go Digital Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-500">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Go Digital?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              While our Excel template is a great start, imagine creating perfect rosters in minutes, not hours. 
              RosterLab's AI-powered platform takes the complexity out of healthcare scheduling.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">90%</div>
                <p className="text-sm">Time saved on scheduling</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="text-sm">Compliance guaranteed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <p className="text-sm">Staff can access rosters</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book-a-demo"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                See RosterLab in Action
                <HiArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is the template really free?
                </h3>
                <p className="text-gray-600">
                  Yes! The Excel rostering template is completely free. We believe every healthcare team should have access to basic scheduling tools.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What version of Excel do I need?
                </h3>
                <p className="text-gray-600">
                  The template works with Excel 2016 or later, including Excel for Mac and Excel Online. Some features may have limited functionality in older versions.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I customize the template for my team?
                </h3>
                <p className="text-gray-600">
                  Absolutely! The template is fully customizable. You can add staff members, modify shift patterns, and adjust formulas to match your specific requirements.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How is RosterLab different from the Excel template?
                </h3>
                <p className="text-gray-600">
                  While the Excel template helps with basic scheduling, RosterLab uses AI to automatically generate optimal rosters, ensures 100% compliance, provides mobile access for staff, and saves 90% of scheduling time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}