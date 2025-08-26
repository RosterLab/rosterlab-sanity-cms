'use client'

import { useState, useEffect, useCallback } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import Link from 'next/link'
import { HiCheck, HiDownload, HiTable, HiClipboardList, HiCalendar, HiUserGroup } from 'react-icons/hi'
import { trackButtonClick } from '@/components/analytics/Amplitude'
import { urlFor } from '@/sanity/lib/client'
import FAQAccordion from '@/components/ui/FAQAccordion'
import HubSpotFormListener from '@/components/analytics/HubSpotFormListener'

// Add HubSpot type declaration
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string
          portalId: string
          formId: string
          target: string
          onFormSubmitted?: (formData: any) => void
        }) => void
      }
    }
  }
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  publishedAt: string
  author?: {
    name: string
    image?: { asset: { _ref: string }; alt?: string }
  }
}

interface ExcelTemplateClientProps {
  recommendedPosts: BlogPost[]
}

export default function ExcelTemplateClient({ recommendedPosts }: ExcelTemplateClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingForm, setIsLoadingForm] = useState(true)

  const downloadExcelFile = useCallback(() => {
    // Track download
    trackButtonClick('Download Excel Template', 'Excel Template Page', {
      form_type: 'excel_download',
      download_type: 'automatic'
    })
    
    // Create a temporary link to download the file
    const link = document.createElement('a')
    link.href = '/images/excel/RosterLab-Free-Excel-Template.xlsx'
    link.download = 'RosterLab-Free-Excel-Template.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  // Load HubSpot form on component mount
  useEffect(() => {
    // Check if HubSpot is already loaded
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "20646833",
        formId: "8b313479-637e-4725-8b9e-3fe8cdae6077",
        region: "na1",
        target: "#hubspot-form-container",
        onFormSubmitted: () => {
          // Download the Excel file
          downloadExcelFile()
          
          // Update UI to show success
          setIsSubmitted(true)
        }
      })
      setIsLoadingForm(false)
      return
    }
    
    // Create script element
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    
    // When script loads, create the form
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "8b313479-637e-4725-8b9e-3fe8cdae6077",
          region: "na1",
          target: "#hubspot-form-container",
          onFormSubmitted: () => {
            // Download the Excel file
            downloadExcelFile()
            
            // Update UI to show success
            setIsSubmitted(true)
          }
        })
        setIsLoadingForm(false)
      }
    }
    
    // Append script to body
    document.body.appendChild(script)
    
    // Cleanup
    return () => {
      // Remove script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [downloadExcelFile])

  const features = [
    {
      icon: HiTable,
      title: 'Pre-formatted 6-week roster',
      description: 'The dates and days of the week are already laid out for 6 weeks, ready for assigning shifts.'
    },
    {
      icon: HiUserGroup,
      title: 'Staff information section',
      description: 'Space to record each employee\'s name, initials, skill level, and FTE (contracted hours).'
    },
    {
      icon: HiClipboardList,
      title: 'Shift allocation and totals',
      description: 'Cells to assign different shifts, with automatic totals at the end for tracking workload.'
    }
  ]

  const benefits = [
    'Distribute shifts across staff',
    'Easily review the staff balance on each day',
    'Track FTE against contract hours',
    'Edit and personalise to meet your requirements',
    'Printer friendly and easy to use'
  ]

  const faqItems = [
    {
      question: "Who is this staff scheduling template for?",
      answer: "This free Excel staff roster template is designed for managers, staff schedulers and team leaders who need a simple way to organise staff shifts. It's best suited for workplaces that want a straightforward, no-cost solution without needing to adopt new software."
    },
    {
      question: "Should I use an Excel spreadsheet to roster my staff?",
      answer: "Excel can be a quick and familiar tool for scheduling if you have a small team and relatively simple shift patterns. However, it can become time-consuming and error-prone as your workforce grows, especially when handling last-minute changes, compliance requirements, or multiple locations."
    },
    {
      question: "What's the difference between your Excel spreadsheet and free digital scheduling?",
      answer: "The Excel template is static - you download it and update manually. Our <a href='/solutions/free-staff-scheduling' class='text-blue-600 hover:text-blue-700 underline'>free digital scheduling tool</a>, on the other hand, allows you to build and share rosters online, make real-time updates, and automatically notify staff of changes. Digital scheduling reduces admin time, helps prevent double-ups, and ensures your team always has the latest version."
    }
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
                  Free Staff Roster Template (Excel)
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  Stop struggling with roster creation. Download our professionally designed 
                  Excel template specifically built for shift work scheduling.
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

                    {/* HubSpot Form Container */}
                    <div 
                      id="hubspot-form-container"
                      className="mb-4"
                    >
                      {isLoadingForm && (
                        <div className="text-center py-8">
                          <p className="text-gray-600">Loading form...</p>
                        </div>
                      )}
                    </div>
                    <HubSpotFormListener />
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
                    <button
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      onClick={() => {
                        downloadExcelFile()
                        trackButtonClick('Manual Download', 'Excel Template Page', {
                          download_type: 'manual'
                        })
                      }}
                    >
                      <HiDownload className="w-5 h-5 mr-2" />
                      Download Template
                    </button>

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
                Everything you need to create professional staff rosters in Excel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
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
              <div className="bg-white rounded-lg shadow-lg p-8 overflow-hidden">
                <div className="relative overflow-hidden rounded">
                  <Image
                    src="/images/excel/excel-preview-new-1.png"
                    alt="Excel roster template preview"
                    width={1200}
                    height={600}
                    className="w-full h-auto transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>

          </Container>
        </div>

        {/* Recommended Reading Section */}
        <section className="bg-gray-50 py-20">
          <Container>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Recommended reading for Excel Rosterers
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {recommendedPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <Link href={`/blog/${post.slug.current}`} className="block">
                    <div className="relative h-48 overflow-hidden group">
                      {post.mainImage ? (
                        <Image
                          src={urlFor(post.mainImage).width(400).height(200).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                          <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                        Read more 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            
            {/* View all blogs CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              >
                View all blogs
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Everything you need to know about our Excel roster template
              </p>
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-white">
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