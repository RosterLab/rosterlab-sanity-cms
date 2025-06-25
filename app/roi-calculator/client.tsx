'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function ROICalculatorClient() {
  // Input states
  const [employees, setEmployees] = useState(50)
  const [avgHourlyWage, setAvgHourlyWage] = useState(35)
  const [hoursPerWeek, setHoursPerWeek] = useState(38)
  const [schedulingHours, setSchedulingHours] = useState(10)
  const [overtimePercentage, setOvertimePercentage] = useState(5)
  const [turnoverRate, setTurnoverRate] = useState(15)
  
  // Form states
  const [showReportForm, setShowReportForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    marketingConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Calculations
  const weeklyPayroll = employees * avgHourlyWage * hoursPerWeek
  const annualPayroll = weeklyPayroll * 52
  
  // Time savings (80% reduction in scheduling time)
  const schedulingSavingsHours = schedulingHours * 0.8 * 52
  const schedulingSavingsCost = schedulingSavingsHours * avgHourlyWage * 1.5 // Manager rate
  
  // Overtime reduction (typically 2-3% reduction)
  const currentOvertimeCost = annualPayroll * (overtimePercentage / 100) * 0.5 // 1.5x rate
  const overtimeSavings = currentOvertimeCost * 0.4 // 40% reduction
  
  // Turnover reduction (typically 20% reduction in turnover)
  const turnoverCost = employees * (turnoverRate / 100) * avgHourlyWage * 500 // Replacement cost
  const turnoverSavings = turnoverCost * 0.2
  
  // Total savings
  const totalAnnualSavings = schedulingSavingsCost + overtimeSavings + turnoverSavings
  const roi = ((totalAnnualSavings / 30000) * 100).toFixed(0) // Assuming $30k annual cost
  const paybackMonths = (30000 / (totalAnnualSavings / 12)).toFixed(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Here you would normally send the data to your backend
    // For now, we'll just simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate and download report
    const reportData = {
      employees,
      avgHourlyWage,
      hoursPerWeek,
      schedulingHours,
      overtimePercentage,
      turnoverRate,
      totalAnnualSavings,
      roi,
      paybackMonths,
      schedulingSavingsCost,
      overtimeSavings,
      turnoverSavings
    }
    
    // Create a simple text report (in production, you'd generate a PDF)
    const report = `
RosterLab ROI Report
Generated for: ${formData.company}

Your Inputs:
- Employees: ${employees}
- Average Hourly Wage: $${avgHourlyWage}
- Hours per Week: ${hoursPerWeek}
- Scheduling Hours: ${schedulingHours}
- Overtime: ${overtimePercentage}%
- Turnover: ${turnoverRate}%

Your Potential Savings:
- Total Annual Savings: $${totalAnnualSavings.toLocaleString()}
- ROI in Year 1: ${roi}%
- Payback Period: ${paybackMonths} months

Savings Breakdown:
- Time Savings: $${schedulingSavingsCost.toLocaleString()}
- Overtime Reduction: $${overtimeSavings.toLocaleString()}
- Turnover Reduction: $${turnoverSavings.toLocaleString()}
    `
    
    // Download the report
    const blob = new Blob([report], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rosterlab-roi-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    setIsSubmitting(false)
    setShowReportForm(false)
    alert('Your ROI report has been downloaded!')
  }

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ROI Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how much time and money RosterLab can save your organization with intelligent scheduling automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button href="/pricing" className="bg-blue-600 text-white hover:bg-blue-700">
                View Pricing
              </Button>
              <Button href="/demo" className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50">
                Book a Demo
              </Button>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/illustration/Coins-rafiki.svg"
                alt="ROI Calculator illustration"
                width={400}
                height={300}
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Organization</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of employees
                    </label>
                    <input
                      type="number"
                      value={employees}
                      onChange={(e) => setEmployees(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average hourly wage ($)
                    </label>
                    <input
                      type="number"
                      value={avgHourlyWage}
                      onChange={(e) => setAvgHourlyWage(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average hours per employee per week
                    </label>
                    <input
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hours spent on scheduling per week
                    </label>
                    <input
                      type="number"
                      value={schedulingHours}
                      onChange={(e) => setSchedulingHours(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current overtime percentage (%)
                    </label>
                    <input
                      type="number"
                      value={overtimePercentage}
                      onChange={(e) => setOvertimePercentage(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual staff turnover rate (%)
                    </label>
                    <input
                      type="number"
                      value={turnoverRate}
                      onChange={(e) => setTurnoverRate(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Your Potential Savings</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-lg p-6">
                    <h3 className="text-3xl font-bold mb-2">
                      ${totalAnnualSavings.toLocaleString()}
                    </h3>
                    <p className="text-blue-100">Total Annual Savings</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-2xl font-bold mb-1">{roi}%</h4>
                      <p className="text-sm text-blue-100">ROI in Year 1</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-2xl font-bold mb-1">{paybackMonths}</h4>
                      <p className="text-sm text-blue-100">Months to Payback</p>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6 space-y-4">
                    <h3 className="font-semibold text-lg mb-3">Savings Breakdown</h3>
                    
                    <div className="flex justify-between">
                      <span>Time saved on scheduling</span>
                      <span className="font-semibold">${schedulingSavingsCost.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Overtime reduction</span>
                      <span className="font-semibold">${overtimeSavings.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Reduced turnover costs</span>
                      <span className="font-semibold">${turnoverSavings.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => setShowReportForm(true)}
                      className="w-full bg-green-500 text-white hover:bg-green-600 py-3 px-4 rounded-md font-medium transition-colors"
                    >
                      Download Your ROI Report
                    </button>
                    <Button 
                      href="/staff-rostering-interactive-demo" 
                      className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3"
                    >
                      See How It Works
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Improved Compliance</h3>
                  <p className="text-gray-600 text-sm">
                    Automatic enforcement of labor laws, union agreements, and internal policies
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Higher Staff Satisfaction</h3>
                  <p className="text-gray-600 text-sm">
                    Fair scheduling and better work-life balance leads to happier teams
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Faster Decision Making</h3>
                  <p className="text-gray-600 text-sm">
                    Real-time insights and scenario planning for better workforce management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Full Width CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of organizations already optimizing their scheduling with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Contact Us
              </Button>
              <Button 
                href="/solutions/ai-schedules" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Report Download Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Download Your ROI Report
            </h3>
            <p className="text-gray-600 mb-6">
              Get a personalized ROI report showing your potential savings with RosterLab.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="marketingConsent" className="ml-2 text-sm text-gray-600">
                  I'd like to receive occasional updates about RosterLab products and services
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Generating...' : 'Download Report'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}