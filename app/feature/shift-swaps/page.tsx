import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiRefresh, HiShieldCheck, HiBell } from 'react-icons/hi'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ShiftSwapsContent from './ShiftSwapsContent'

export const metadata = {
  title: 'Intelligent Shift Swaps - RosterLab',
  description: 'Automate shift swaps with RosterLab AI, ensuring optimal staffing and compliance while saving time and reducing administration. Oversight where it matters.',
}

const faqItems = [
  {
    question: "How does automated shift swap approval work?",
    answer: "RosterLab's AI analyzes each swap request against your organization's rules, compliance requirements, and staffing needs. If the swap maintains proper coverage, doesn't violate any rules, and both employees are qualified for the shifts, it's automatically approved. Complex swaps that might impact critical coverage or compliance are flagged for manager review."
  },
  {
    question: "What rules can I set for automatic approvals?",
    answer: "You can configure rules based on: minimum staffing levels, skill requirements, maximum hours per week/month, minimum rest periods between shifts, seniority considerations, department-specific requirements, and custom business rules. The system learns from your approval patterns to become more intelligent over time."
  },
  {
    question: "How do employees request shift swaps?",
    answer: "Employees can request swaps through our mobile app or web portal. They simply select the shift they want to swap, and the system shows available options with qualified colleagues. They can send swap requests directly, which are then processed according to your automation rules. Employees receive instant notifications about approvals or rejections."
  },
  {
    question: "What happens when a swap needs manager approval?",
    answer: "When the AI detects a swap that requires review (e.g., affects critical coverage or approaches overtime limits), managers receive an alert with all relevant context. They can see exactly why the swap was flagged, review the impact on coverage and costs, and approve or reject with one click. The whole process typically takes less than 30 seconds."
  },
  {
    question: "Can I track and audit all shift swaps?",
    answer: "Yes! Every swap request, approval, and rejection is logged with complete details including who requested it, when it was processed, who approved it (system or manager), and any compliance notes. This audit trail is essential for labor compliance, dispute resolution, and identifying patterns to improve your policies."
  }
]

export default function ShiftSwapsPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Intelligent Shift Swaps
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automate routine swaps, review when it matters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Chatting-pana.svg"
                  alt="Shift swaps communication illustration"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Automatic Routine Swap Approval Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Routine Swap Approval
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AI automatically approves standard shift swaps between qualified staff members. Only swaps that impact critical coverage, skills mix, or compliance require manager review.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant approval for routine swaps</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Smart detection of critical shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce management workload by 92%</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Customer relationship management-pana.svg"
                  alt="Automatic Routine Swap Approval"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Rule-Based Swap Review Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ShiftSwapsContent />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Rule-Based Swap Review
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When a swap might break staffing rules or affect critical coverage, managers get a clear, one-click review process with explanations of potential conflicts.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Highlights potential rule violations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-click approval or rejection</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Clear explanations of conflicts</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Automated Notifications Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automated Notifications
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff can request swaps anytime via mobile app. Relevant team members get instant notifications, and approved swaps update across all systems in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mobile app swap requests</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to relevant staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time roster updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center">
                  {/* iPhone Mockup */}
                  <div className="relative mx-auto">
                    <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl" style={{ width: '320px' }}>
                      {/* Phone Screen */}
                      <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ height: '640px' }}>
                        {/* Status Bar */}
                        <div className="bg-white px-6 py-2 flex items-center justify-between text-xs">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.48L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.48H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75l1.48.85 1.48-.85-.85-1.48H14v-1.5h-2.05l.85-1.48-1.48-.85L10 8.47 8.68 7l-1.48.85.85 1.48H6v1.5h2.05l-.85 1.48zm8 0l1.48.85 1.48-.85-.85-1.48H22v-1.5h-2.05l.85-1.48-1.48-.85L18 8.47 16.68 7l-1.48.85.85 1.48H14v1.5h2.05l-.85 1.48z"/>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M1 9l2-2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7l2 2V2h-4v2.586l-3.414-3.414a1 1 0 0 0-1.414 0L11 4.414 7.828 1.172a1 1 0 0 0-1.414 0L3 4.586V2H1v7z"/>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2 17h20v2H2zm0-5h20v2H2zm0-5h20v2H2z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* App Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                          <h4 className="text-white font-semibold text-lg">RosterLab</h4>
                          <p className="text-blue-100 text-sm">Your shifts, simplified</p>
                        </div>
                        
                        {/* Notifications */}
                        <div className="px-4 py-3 space-y-3 bg-gray-50">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2">Recent Notifications</p>
                          
                          {/* Notification 1 - New Request */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-slideDown">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiBell className="w-5 h-5 text-amber-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Shift Swap Request</p>
                                <p className="text-xs text-gray-600 mt-0.5">Anna Chen wants to swap shifts with you</p>
                                <p className="text-xs text-gray-500 mt-1">Mon Oct 14, 7AM-3PM → Tue Oct 15, 7AM-3PM</p>
                                <div className="flex gap-2 mt-3">
                                  <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium">
                                    Review
                                  </button>
                                  <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                                    Quick Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">2 minutes ago</p>
                          </div>
                          
                          {/* Notification 2 - Approved */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiCheck className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Shift Swap Approved</p>
                                <p className="text-xs text-gray-600 mt-0.5">Your swap request has been approved</p>
                                <p className="text-xs text-gray-500 mt-1">You're now scheduled for Wed Oct 16, 3PM-11PM</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">1 hour ago</p>
                          </div>
                          
                          {/* Notification 3 - Auto-approved */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiShieldCheck className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Auto-Approved Swap</p>
                                <p className="text-xs text-gray-600 mt-0.5">System approved your swap with James</p>
                                <p className="text-xs text-gray-500 mt-1">All compliance checks passed automatically</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">3 hours ago</p>
                          </div>
                        </div>
                        
                        {/* Bottom Tab Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                          <div className="flex items-center justify-around py-2">
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <button className="p-2 text-blue-600">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </button>
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Phone Notch */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 h-6 w-40 rounded-full"></div>
                    </div>
                    
                    {/* Floating notification badge */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg animate-bounce">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Comprehensive Audit Trail Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Shift Swap Audit Log</h3>
                        <p className="text-sm text-blue-100 mt-1">Complete history and compliance tracking</p>
                      </div>
                      <button className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                        Export Report
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 border-b border-gray-200">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                        All Activity
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Approved
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Rejected
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Compliance Flags
                      </button>
                    </div>
                    
                    {/* Audit Trail Entries */}
                    <div className="space-y-3">
                      {/* Entry 1 - Recent Approval */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <HiCheck className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Swap Approved (Manager Override)</p>
                              <p className="text-xs text-gray-600 mt-1">Michael Roberts ↔ Emma Wilson</p>
                              <p className="text-xs text-gray-500">Wed 16 Oct (15:00-23:00) → Thu 17 Oct (23:00-07:00)</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">2 mins ago</span>
                        </div>
                        <div className="ml-13 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-gray-700">Approved by:</span>
                            <span className="text-gray-600">Sarah Chen (Nurse Manager)</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            <span className="font-medium text-gray-700">Reason:</span>
                            <span className="text-gray-600">Weekly hours limit override granted for critical ICU coverage</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1 text-amber-600">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              Compliance Note: 48hr week exceeded
                            </span>
                            <span className="text-gray-500">IP: 192.168.1.42</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Entry 2 - Auto-approved */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <HiShieldCheck className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Swap Auto-Approved</p>
                              <p className="text-xs text-gray-600 mt-1">Sarah Johnson ↔ David Lee</p>
                              <p className="text-xs text-gray-500">Mon 14 Oct (07:00-15:00) → Tue 15 Oct (07:00-15:00)</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">1 hour ago</span>
                        </div>
                        <div className="ml-13 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-gray-700">System:</span>
                            <span className="text-gray-600">Automated approval - all compliance checks passed</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-green-600">✓ Skills match</span>
                            <span className="text-green-600">✓ Hours compliant</span>
                            <span className="text-green-600">✓ Rest periods met</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Entry 3 - Rejected */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Swap Request Rejected</p>
                              <p className="text-xs text-gray-600 mt-1">Lisa Thompson ↔ Mark Davis</p>
                              <p className="text-xs text-gray-500">Fri 18 Oct (23:00-07:00) → Sat 19 Oct (23:00-07:00)</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">3 hours ago</span>
                        </div>
                        <div className="ml-13 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-gray-700">Rejected by:</span>
                            <span className="text-gray-600">System (Auto-rejection)</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            <span className="font-medium text-gray-700">Reason:</span>
                            <span className="text-gray-600">Insufficient rest period between shifts (6 hours, minimum 8 required)</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-red-600">✗ Labor law violation</span>
                            <span className="text-gray-500">Ref: LAB-2024-1847</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Entry 4 - Modification */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <HiRefresh className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">Swap Modified & Approved</p>
                              <p className="text-xs text-gray-600 mt-1">James Wilson ↔ Anna Chen</p>
                              <p className="text-xs text-gray-500">Original: Full shift swap → Modified: Partial shift (4 hours)</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">Yesterday</span>
                        </div>
                        <div className="ml-13 space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-gray-700">Modified by:</span>
                            <span className="text-gray-600">John Smith (Department Head)</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            <span className="font-medium text-gray-700">Note:</span>
                            <span className="text-gray-600">Partial swap approved to maintain minimum staffing levels</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Summary Stats */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">247</p>
                          <p className="text-xs text-gray-600">Total Swaps</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-600">89%</p>
                          <p className="text-xs text-gray-600">Approved</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-blue-600">73%</p>
                          <p className="text-xs text-gray-600">Auto-approved</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-amber-600">100%</p>
                          <p className="text-xs text-gray-600">Compliant</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comprehensive Audit Trail
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Track who swapped, when, and why. Complete documentation helps resolve disputes and demonstrate compliance with labor regulations.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete swap history</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Approval timestamps and reasons</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-[#4a9288] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance documentation</span>
                  </li>
                </ul>
                <div className="relative">
                  <Image
                    src="/images/illustration/Transfer files-pana.svg"
                    alt="Comprehensive audit trail and documentation"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
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
        <div className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                No more rostering headaches!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">92%</p>
                  <p className="text-xl opacity-90">Reduction in manager time spent on shift changes</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">3.5x</p>
                  <p className="text-xl opacity-90">Increase in successful shift coverage</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance with labor regulations</p>
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
                Ready to Modernize Your Shift Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join leading organizations who've transformed their workforce flexibility with intelligent shift swapping.
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