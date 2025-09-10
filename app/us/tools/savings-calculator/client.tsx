'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function SavingsCalculatorClient() {
  // Input states
  const [industry, setIndustry] = useState('nursing')
  const [staff, setStaff] = useState(50)
  const [avgHourlyWage, setAvgHourlyWage] = useState(35)
  const [hoursPerWeek, setHoursPerWeek] = useState(38)
  const [schedulingHours, setSchedulingHours] = useState(10)
  const [overtimePercentage, setOvertimePercentage] = useState(5)
  const [turnoverRate, setTurnoverRate] = useState(15)
  
  // Form states
  const [showReportForm, setShowReportForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  
  // Industry configurations
  const industryConfigs = {
    nursing: {
      name: 'Nursing',
      implementationDays: 3,
      schedulingComplexity: 1.2,
    },
    'acute-specialties': {
      name: 'Acute',
      implementationDays: 4,
      schedulingComplexity: 1.35,
    },
    'medicine-specialties': {
      name: 'Medicine',
      implementationDays: 3,
      schedulingComplexity: 1.25,
    },
    'allied-health': {
      name: 'Allied Health',
      implementationDays: 2,
      schedulingComplexity: 1.1,
    },
    'senior-care': {
      name: 'Senior Care',
      implementationDays: 2,
      schedulingComplexity: 1.15,
    },
    midwives: {
      name: 'Midwives',
      implementationDays: 3,
      schedulingComplexity: 1.2,
    },
    veterinary: {
      name: 'Veterinary',
      implementationDays: 3,
      schedulingComplexity: 1.2,
    },
    surgical: {
      name: 'Surgical',
      implementationDays: 4,
      schedulingComplexity: 1.3,
    },
  }
  
  // Get current industry configuration
  const currentIndustry = industryConfigs[industry as keyof typeof industryConfigs] || industryConfigs.nursing
  
  // Calculations
  const weeklyPayroll = staff * avgHourlyWage * hoursPerWeek
  const annualPayroll = weeklyPayroll * 52
  
  // Time savings (80% reduction in scheduling time)
  const schedulingSavingsHours = schedulingHours * 0.8 * 52
  const schedulingSavingsCost = schedulingSavingsHours * avgHourlyWage * 1.5 // Manager rate
  
  // Overtime reduction (typically 2-3% reduction)
  const currentOvertimeCost = annualPayroll * (overtimePercentage / 100) * 0.5 // 1.5x rate
  const overtimeSavings = currentOvertimeCost * 0.4 // 40% reduction
  
  // Turnover reduction (typically 20% reduction in turnover)
  const turnoverCost = staff * (turnoverRate / 100) * avgHourlyWage * 500 // Replacement cost
  const turnoverSavings = turnoverCost * 0.2
  
  // RosterLab costs
  const annualSubscriptionCost = staff * 20 * 12 // $20 per staff per month
  const oneOffImplementationCost = currentIndustry.implementationDays * 1500 // $1,500 per day
  const firstYearTotalCost = annualSubscriptionCost + oneOffImplementationCost
  
  // Total savings
  const totalAnnualSavings = schedulingSavingsCost + overtimeSavings + turnoverSavings
  const roi = ((totalAnnualSavings / firstYearTotalCost) * 100).toFixed(0)
  const paybackMonths = (firstYearTotalCost / (totalAnnualSavings / 12)).toFixed(1)

  const generatePDF = useCallback(async (companyName: string = '') => {
    try {
      // Dynamically import jsPDF to avoid SSR issues
      const { default: jsPDF } = await import('jspdf')
      
      const doc = new jsPDF()
      
      // Set font sizes and colors
      const primaryColor: [number, number, number] = [41, 98, 255] // RosterLab blue
      const textColor: [number, number, number] = [51, 51, 51]
      const lightGray: [number, number, number] = [128, 128, 128]
      
      // Add RosterLab logo
      try {
        // Convert logo to base64
        const logoUrl = '/images/rosterlab-logo.png'
        const logoResponse = await fetch(logoUrl)
        const logoBlob = await logoResponse.blob()
        const logoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(logoBlob)
        })
        
        // Add logo with better aspect ratio (adjust width to maintain proportions)
        doc.addImage(logoBase64, 'PNG', 20, 10, 45, 12)
      } catch {
        // Fallback if logo fails to load
        doc.setFontSize(24)
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
        doc.text('RosterLab Savings Report', 20, 25)
      }
      
      // Date only
      doc.setFontSize(11)
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35)
      
      // Draw a line
      doc.setLineWidth(0.5)
      doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
      doc.line(20, 40, 190, 40)
      
      // ROI Report Title
      doc.setFontSize(20)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Savings Report', 20, 52)
      
      // Executive Summary
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Executive Summary', 20, 65)
      
      doc.setFontSize(14)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text(`Total Annual Savings: $${totalAnnualSavings.toLocaleString()}`, 20, 75)
      doc.text(`ROI in Year 1: ${roi}%`, 20, 83)
      doc.text(`Payback Period: ${paybackMonths} months`, 20, 91)
      
      // Your Organisation Details
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Your Organisation', 20, 105)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text(`Number of Staff: ${staff}`, 20, 115)
      doc.text(`Average Hourly Wage: $${avgHourlyWage}`, 20, 122)
      doc.text(`Average Hours per Week: ${hoursPerWeek}`, 20, 129)
      doc.text(`Current Time Spent Scheduling: ${schedulingHours} hours/week`, 20, 136)
      doc.text(`Current Overtime Rate: ${overtimePercentage}%`, 20, 143)
      doc.text(`Current Turnover Rate: ${turnoverRate}%`, 20, 150)
      
      // Savings Breakdown
      doc.setFontSize(16)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Detailed Savings Breakdown', 20, 165)
      
      // Time Savings
      doc.setFontSize(12)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.setFont('helvetica', 'bold')
      doc.text('1. Administrative Time Savings', 20, 175)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.text(`Hours saved annually: ${schedulingSavingsHours.toFixed(0)} hours`, 25, 182)
      doc.text(`Cost savings: $${schedulingSavingsCost.toLocaleString()}`, 25, 189)
      
      // Overtime Reduction
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('2. Overtime Reduction', 20, 200)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.text(`Current overtime cost: $${currentOvertimeCost.toLocaleString()}`, 25, 207)
      doc.text(`Projected savings (40% reduction): $${overtimeSavings.toLocaleString()}`, 25, 214)
      
      // Turnover Reduction
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('3. Turnover Cost Reduction', 20, 225)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)
      doc.text(`Current turnover cost: $${turnoverCost.toLocaleString()}`, 25, 232)
      doc.text(`Projected savings (20% reduction): $${turnoverSavings.toLocaleString()}`, 25, 239)
      
      // Next Steps section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Next Steps', 20, 255)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      
      // First step with link - all in one line
      const step1Start = '1. Schedule a '
      const step1End = ' with our team'
      doc.text(step1Start, 20, 265)
      const step1Width = doc.getTextWidth(step1Start)
      
      // Add clickable link for "personalised demo"
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.textWithLink('personalised demo', 20 + step1Width, 265, { url: 'https://www.rosterlab.com/book-a-demo' })
      const linkWidth = doc.getTextWidth('personalised demo')
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text(step1End, 20 + step1Width + linkWidth, 265)
      
      doc.text('2. Get a custom implementation plan for your organisation', 20, 272)
      doc.text('3. Start your free trial and see immediate results', 20, 279)
      
      // Contact Information
      doc.setFontSize(11)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Contact Us:', 20, 289)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Email: hello@rosterlab.com  |  Website: www.rosterlab.com', 60, 289)
      
      // Footer
      doc.setFontSize(8)
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
      doc.text('This ROI calculation is based on industry averages and your provided inputs. Actual results may vary.', 20, 297)
      
      // Save the PDF
      doc.save(`RosterLab-ROI-Report-${companyName.replace(/[^a-z0-9]/gi, '_')}.pdf`)
      
      return true
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback to text download if PDF generation fails
      const report = `
RosterLab Savings Report
Generated for: ${companyName}

Your Inputs:
- Staff: ${staff}
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
      
      const blob = new Blob([report], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'rosterlab-roi-report.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      return false
    }
  }, [totalAnnualSavings, roi, paybackMonths, staff, avgHourlyWage, hoursPerWeek, schedulingHours, overtimePercentage, turnoverRate, schedulingSavingsHours, schedulingSavingsCost, currentOvertimeCost, overtimeSavings, turnoverCost, turnoverSavings])

  // Load HubSpot form when modal opens
  useEffect(() => {
    if (showReportForm) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Check if HubSpot is already loaded
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: "20646833",
            formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
            region: "na1",
            target: '#hubspot-form-container',
            onFormSubmitted: async (formData: any) => {
              // Hide the form immediately after submission
              const formContainer = document.getElementById('hubspot-form-container')
              if (formContainer) {
                formContainer.style.display = 'none'
              }
              
              // Get the company name from the form submission
              const companyField = formData.submissionValues?.company || ''
              
              // Generate and download the PDF
              setIsSubmitting(true)
              const success = await generatePDF(companyField)
              setIsSubmitting(false)
              
              if (success) {
                // Close the modal after a short delay
                setTimeout(() => {
                  setShowReportForm(false)
                  alert('Your personalised ROI report has been downloaded!')
                }, 1000)
              }
            }
          })
          return
        }
        
        // Load HubSpot forms script
        const script = document.createElement('script')
        script.src = 'https://js.hsforms.net/forms/embed/v2.js'
        script.charset = 'utf-8'
        script.type = 'text/javascript'
        
        script.onload = () => {
          if (window.hbspt && window.hbspt.forms) {
            window.hbspt.forms.create({
              portalId: "20646833",
              formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
              region: "na1",
              target: '#hubspot-form-container',
              onFormSubmitted: async (formData: any) => {
                // Hide the form immediately after submission
                const formContainer = document.getElementById('hubspot-form-container')
                if (formContainer) {
                  formContainer.style.display = 'none'
                }
                
                // Get the company name from the form submission
                const companyField = formData.submissionValues?.company || 'Your Company'
                
                // Generate and download the PDF
                setIsSubmitting(true)
                const success = await generatePDF(companyField)
                setIsSubmitting(false)
                
                if (success) {
                  // Close the modal after a short delay
                  setTimeout(() => {
                    setShowReportForm(false)
                    alert('Your personalised ROI report has been downloaded!')
                  }, 1000)
                }
              }
            })
          }
        }
        
        document.body.appendChild(script)
      }, 100) // 100ms delay to ensure DOM is ready
      
      // Cleanup function
      return () => {
        // Clear the timer
        clearTimeout(timer)
        
        // Remove the form container's content when unmounting
        const formContainer = document.getElementById('hubspot-form-container')
        if (formContainer) {
          formContainer.innerHTML = ''
          formContainer.style.display = 'block' // Reset display property
        }
      }
    }
  }, [showReportForm, generatePDF])


  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex items-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20"
        style={{
          minHeight: "70vh",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text and CTAs */}
            <div className="text-left">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Savings Calculator
                <br />
                <span>for </span>
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Healthcare Teams
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover how much time and money RosterLab can save your organization with intelligent scheduling automation.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  href="/us/pricing"
                  className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  View Pricing
                </Button>

                <Button
                  href="/us/book-a-demo"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Book a Demo
                </Button>
              </div>

              {/* Feature ticks */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">90% reduction in scheduling time</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">Instant ROI calculations for your team size</span>
                </div>
              </div>
            </div>

            {/* Right side - Radiography Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[600px]">
                <Image
                  src="/images/us-images/radiography.jpg"
                  alt="Healthcare radiography scheduling"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-3 lg:h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,40 Q360,25 720,40 T1440,40 L1440,80 L0,80 Z"
              opacity="0.5"
            />
            <path
              fill="#ffffff"
              d="M0,50 Q360,35 720,50 T1440,50 L1440,80 L0,80 Z"
            />
          </svg>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="bg-white py-16">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Calculator Inputs */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">See how RosterLab can save</h2>
                <p className="text-base text-gray-600 mb-6">
                  We estimated your savings based on our experience with different specialties in healthcare and research on industry standards.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What types of healthcare specialties are you scheduling for?
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}
                    >
                      <option value="nursing">Nursing</option>
                      <option value="acute-specialties">Acute Care</option>
                      <option value="medicine-specialties">Primary Care / Family Medicine</option>
                      <option value="allied-health">Therapists & Technicians</option>
                      <option value="senior-care">Senior Care</option>
                      <option value="midwives">Labor & Delivery</option>
                      <option value="veterinary">Veterinary Practices & Animal Hospitals</option>
                      <option value="surgical">Surgical Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of staff
                    </label>
                    <input
                      type="number"
                      value={staff}
                      onChange={(e) => setStaff(Number(e.target.value))}
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

              {/* HubSpot Form Listener */}
              
              {/* Results */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Your Potential Annual Savings</h2>
                
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
                      <p className="text-sm text-blue-100">Return in Year 1</p>
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

                  <div className="mt-6 p-4 bg-white/10 rounded-lg">
                    <h4 className="font-semibold mb-2">RosterLab Investment</h4>
                    <div className="space-y-1 text-sm">
                      <p>Annual Subscription: ${annualSubscriptionCost.toLocaleString()}</p>
                      <p className="text-blue-100 text-xs">($20 per staff per month)</p>
                      <p>Implementation: ${oneOffImplementationCost.toLocaleString()}</p>
                      <p className="text-blue-100 text-xs">({currentIndustry.implementationDays} days × $1,500/day)</p>
                      <p className="font-semibold pt-2 border-t border-white/20">First Year Total: ${firstYearTotalCost.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => setShowReportForm(true)}
                      className="w-full bg-green-500 text-white hover:bg-green-600 py-3 px-4 rounded-md font-medium transition-colors"
                    >
                      Download Your Savings Report
                    </button>
                    <Button 
                      href="/us/product-tour" 
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
                    Automatic enforcement of labour laws, union agreements, and internal policies
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
            
            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 text-center">
                * Savings are estimates based on typical results. Actual savings may vary. Final implementation cost will be confirmed after demo and scoping session.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Full Width CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-16 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of organisations already optimising their scheduling with RosterLab
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/us/contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Contact Us
              </Button>
              <Button 
                href="/us/solutions/ai-staff-schedule-maker" 
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
              Download Your Savings Report
            </h3>
            <p className="text-gray-600 mb-6">
              Get a personalised ROI report showing your potential savings with RosterLab.
            </p>

            {/* HubSpot Form Container */}
            <div id="hubspot-form-container" ref={formContainerRef} style={{ minHeight: '100px' }}>
              <p className="text-sm text-gray-500 text-center">Loading form...</p>
            </div>

            {isSubmitting && (
              <div className="text-center py-4">
                <p className="text-gray-600">Generating your report...</p>
              </div>
            )}

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowReportForm(false)}
                className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}