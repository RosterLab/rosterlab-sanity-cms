'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiDownload, HiTable, HiClipboardList, HiCalendar } from 'react-icons/hi'
import { trackButtonClick } from '@/components/analytics/Amplitude'

export default function FreeExcelNurseRosterTemplatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      hospitalName: formData.get('hospitalName') as string,
      role: formData.get('role') as string,
      departmentSize: formData.get('departmentSize') as string,
    }

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.firstName) newErrors.firstName = 'First name is required'
    if (!data.lastName) newErrors.lastName = 'Last name is required'
    if (!data.email) newErrors.email = 'Email is required'
    if (!data.hospitalName) newErrors.hospitalName = 'Hospital/Organisation name is required'
    if (!data.role) newErrors.role = 'Role is required'
    if (!data.departmentSize) newErrors.departmentSize = 'Department size is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Track form submission
      trackButtonClick('Download Excel Template', 'Excel Template Page', {
        form_type: 'excel_download',
        department_size: data.departmentSize,
        role: data.role
      })

      // TODO: Send to your backend/CRM
      // const response = await fetch('/api/excel-template-download', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      
      // TODO: Trigger actual download
      // window.location.href = '/downloads/nurse-roster-template.xlsx'
      
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: HiCalendar,
      title: 'Monthly & Weekly Views',
      description: 'Pre-formatted templates for both monthly and weekly roster planning'
    },
    {
      icon: HiTable,
      title: 'Shift Pattern Templates',
      description: 'Common nursing shift patterns including AM, PM, Night, and custom shifts'
    },
    {
      icon: HiClipboardList,
      title: 'Staff Tracking',
      description: 'Track hours, overtime, leave balances, and skill mix requirements'
    }
  ]

  const benefits = [
    'Reduce roster creation time by 50%',
    'Ensure fair shift distribution',
    'Track compliance with staffing ratios',
    'Monitor overtime and costs',
    'Plan leave coverage effectively',
    'Print-ready formatting'
  ]

  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <HiDownload className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-green-600 font-semibold">FREE DOWNLOAD</span>
                </div>
                
                <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Free Excel Nurse Roster Template
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Stop struggling with roster creation. Download our professionally designed 
                  Excel template specifically built for nursing departments and healthcare teams.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <HiCheck className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>100% Free</strong> - No credit card required. Just fill out the form and download instantly.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Get Your Free Template
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Fill out the form below to download your Excel roster template
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={isSubmitting}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            disabled={isSubmitting}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                          )}
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
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                          Hospital/Organisation Name *
                        </label>
                        <input
                          type="text"
                          id="hospitalName"
                          name="hospitalName"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.hospitalName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          disabled={isSubmitting}
                        />
                        {errors.hospitalName && (
                          <p className="mt-1 text-sm text-red-600">{errors.hospitalName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Role *
                        </label>
                        <select
                          id="role"
                          name="role"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.role ? 'border-red-500' : 'border-gray-300'
                          }`}
                          disabled={isSubmitting}
                        >
                          <option value="">Select your role</option>
                          <option value="Nurse Unit Manager">Nurse Unit Manager</option>
                          <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                          <option value="Roster Coordinator">Roster Coordinator</option>
                          <option value="Department Manager">Department Manager</option>
                          <option value="HR Manager">HR Manager</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="departmentSize" className="block text-sm font-medium text-gray-700 mb-1">
                          Department Size *
                        </label>
                        <select
                          id="departmentSize"
                          name="departmentSize"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.departmentSize ? 'border-red-500' : 'border-gray-300'
                          }`}
                          disabled={isSubmitting}
                        >
                          <option value="">Select department size</option>
                          <option value="1-10">1-10 staff</option>
                          <option value="11-25">11-25 staff</option>
                          <option value="26-50">26-50 staff</option>
                          <option value="51-100">51-100 staff</option>
                          <option value="100+">100+ staff</option>
                        </select>
                        {errors.departmentSize && (
                          <p className="mt-1 text-sm text-red-600">{errors.departmentSize}</p>
                        )}
                      </div>

                      {errors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-800">{errors.submit}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          'Processing...'
                        ) : (
                          <>
                            <HiDownload className="w-5 h-5 mr-2" />
                            Download Free Template
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        By downloading, you agree to receive occasional emails about rostering best practices. 
                        You can unsubscribe at any time.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your download should start automatically. If not, click the button below.
                    </p>
                    <Button
                      href="#"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => {
                        // TODO: Trigger download
                        trackButtonClick('Manual Download', 'Excel Template Page', {
                          download_type: 'manual'
                        })
                      }}
                    >
                      <HiDownload className="w-5 h-5 mr-2" />
                      Download Template
                    </Button>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-gray-600 mb-4">
                        Ready to automate your rostering completely?
                      </p>
                      <Button
                        href="/book-a-demo"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        See RosterLab in Action
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's Included in the Template
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create professional nurse rosters in Excel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Template Preview
              </h3>
              <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
                <Image
                  src="/images/excel/preview-excel.png"
                  alt="Excel nurse roster template preview"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Still Creating Rosters Manually?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                While our Excel template saves time, RosterLab's AI can create optimized rosters 
                in minutes, not hours. See how much time you could save.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/book-a-demo"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Book a Demo
                </Button>
                <Button
                  href="/solutions/ai-staff-scheduling"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn About AI Rostering
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}