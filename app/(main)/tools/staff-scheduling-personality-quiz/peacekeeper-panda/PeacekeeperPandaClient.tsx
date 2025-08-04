'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { urlFor } from '@/sanity/lib/client'

// Star component for background animation
function Star({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
      style={style}
    />
  )
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

interface PeacekeeperPandaClientProps {
  recommendedPosts: BlogPost[]
}

export default function PeacekeeperPandaClient({ recommendedPosts }: PeacekeeperPandaClientProps) {
  const [copied, setCopied] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }))

  const handleCopyLink = () => {
    const quizUrl = `${window.location.origin}/tools/staff-scheduling-personality-quiz`
    navigator.clipboard.writeText(quizUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show celebration when the "As the Peacekeeper Panda" section is fully visible
      // This happens when we've scrolled past one full viewport height
      if (scrollPosition > windowHeight && scrollPosition < windowHeight * 2 && !showCelebration) {
        setShowCelebration(true)
        // Hide celebration after 3 seconds
        setTimeout(() => setShowCelebration(false), 3000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showCelebration])

  // Handle back button navigation to ensure users return to quiz start page
  useEffect(() => {
    const handlePopstate = (event: PopStateEvent) => {
      // If user navigates back, redirect to the quiz start page
      window.location.href = '/tools/staff-scheduling-personality-quiz'
    }

    // Push a new state when the component mounts
    window.history.pushState({ from: 'peacekeeper-panda' }, '', window.location.href)
    
    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsGeneratingPDF(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string || ''

    // Generate PDF
    await generatePDF(name, email, company)
    
    setIsGeneratingPDF(false)
    setShowDownloadForm(false)
  }

  const generatePDF = useCallback(async (name: string, email: string, company: string) => {
    try {
      // Dynamically import jsPDF to avoid SSR issues
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()
      
      // Colors
      const primaryColor = [14, 165, 233] // primary-500
      const textColor = [31, 41, 55] // gray-800
      const lightGray = [156, 163, 175] // gray-400
      const rosterLabBlue = [3, 105, 161] // #0369A1
      const linkBlue = [0, 102, 204] // #0066CC for hyperlinks

      // Extract first name
      const firstName = name.split(' ')[0]
      
      // Page 1
      // Header with RosterLab blue
      doc.setFillColor(...rosterLabBlue as [number, number, number])
      doc.rect(0, 0, 210, 40, 'F')
      
      // Add RosterLab text instead of logo to avoid image loading issues
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('ROSTERLAB', 20, 15)
      
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(20)
      doc.text(`${firstName}'s Rostering Personality`, 20, 28)
      doc.setFontSize(16)
      doc.text('The Peacekeeper Panda', 20, 36)
      
      // Start content directly after header
      let currentY = 50
      
      // Main content
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('It sounds like you best fit: The Peacekeeper Panda', 20, currentY)
      
      currentY += 10
      doc.setFontSize(11)
      doc.setTextColor(...textColor as [number, number, number])
      const description = "Mediator type who balances personalities and conflicts with zen-like calm. Your peaceful approach creates harmony in even the most chaotic scheduling situations."
      const lines = doc.splitTextToSize(description, 110)
      doc.text(lines, 20, currentY)
      currentY += lines.length * 5 + 8
      
      // Celebrity matches section
      currentY += 8
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text("If your rostering style was a celebrity you'd be...", 20, currentY)
      
      currentY += 10
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...textColor as [number, number, number])
      
      // Celebrity 1
      doc.text('• Dalai Shiftma', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Finding inner peace in rosters', 25, currentY + 5)
      currentY += 12
      
      // Celebrity 2
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('• Sir Roster Attenborough', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Narrating workplace harmony', 25, currentY + 5)
      currentY += 12
      
      // Celebrity 3
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('• Zendaya Zen-roster', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Balancing with grace', 25, currentY + 5)
      currentY += 15
      
      // As the Peacekeeper Panda section
      currentY += 5
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('As the Peacekeeper Panda...', 20, currentY)
      
      currentY += 10
      doc.setFontSize(10)
      doc.setTextColor(...textColor as [number, number, number])
      const pandaDesc = 'You bring calm to chaos, resolving conflicts with wisdom and creating schedules that maintain workplace harmony and balance.'
      const pandaLines = doc.splitTextToSize(pandaDesc, 170)
      doc.text(pandaLines, 20, currentY)
      currentY += pandaLines.length * 4 + 5
      
      // Key characteristics
      const characteristics = [
        '• Conflict Resolver: Mediates disputes with diplomatic finesse',
        '• Empathy Expert: Understands every team member\'s needs',
        '• Balance Keeper: Maintains equilibrium in all situations',
        '• Harmony Creator: Builds peaceful workplace environments',
        '• Diplomatic Negotiator: Finds win-win solutions for everyone'
      ]
      
      doc.setFontSize(10)
      characteristics.forEach(char => {
        if (currentY > 270) {
          doc.addPage()
          currentY = 20
        }
        doc.text(char, 25, currentY)
        currentY += 7
      })
      
      // Check if we need page 2
      if (currentY > 180) {
        doc.addPage()
        currentY = 20
      }
      
      // Pie Chart Section
      currentY += 10
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Your Peacekeeper Panda DNA', 105, currentY, { align: 'center' })
      
      // Draw simple representation of pie chart using stacked bars
      const chartY = currentY + 10
      
      // Helper function to draw a pie chart segment
      const drawPieSegment = (
        centerX: number, 
        centerY: number, 
        radius: number, 
        startAngle: number, 
        endAngle: number, 
        color: [number, number, number]
      ) => {
        doc.setFillColor(...color)
        
        // Convert angles to radians
        const startRad = (startAngle - 90) * Math.PI / 180
        const endRad = (endAngle - 90) * Math.PI / 180
        
        // Draw the segment using lines
        const steps = Math.ceil(Math.abs(endAngle - startAngle) / 5)
        const angleStep = (endRad - startRad) / steps
        
        // Start from center
        const points: Array<[number, number]> = [[centerX, centerY]]
        
        // Add arc points
        for (let i = 0; i <= steps; i++) {
          const angle = startRad + (i * angleStep)
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          points.push([x, y])
        }
        
        // Close the path back to center
        points.push([centerX, centerY])
        
        // Draw the filled polygon
        doc.setFillColor(...color)
        const lines = points.map((point, index) => {
          if (index === 0) return null
          return [points[index - 1], point] as [[number, number], [number, number]]
        }).filter(Boolean) as Array<[[number, number], [number, number]]>
        
        lines.forEach(line => {
          doc.line(line[0][0], line[0][1], line[1][0], line[1][1])
        })
        
        // Fill the segment using triangles from center
        for (let i = 1; i < points.length - 1; i++) {
          doc.triangle(
            centerX, centerY,
            points[i][0], points[i][1],
            points[i + 1][0], points[i + 1][1],
            'F'
          )
        }
      }
      
      // Draw circular pie chart
      const pieX = 105 // Center X
      const pieY = chartY + 25 // Center Y
      const pieRadius = 25 // Radius in mm
      
      // Define segments with percentages and colors (green theme)
      const segments = [
        { percent: 30, color: [16, 185, 129] as [number, number, number], label: 'Conflict Resolver' },
        { percent: 25, color: [5, 150, 105] as [number, number, number], label: 'Empathy Expert' },
        { percent: 20, color: [4, 120, 87] as [number, number, number], label: 'Balance Keeper' },
        { percent: 15, color: [6, 95, 70] as [number, number, number], label: 'Harmony Creator' },
        { percent: 10, color: [6, 78, 59] as [number, number, number], label: 'Diplomatic Negotiator' }
      ]
      
      // Draw the pie chart
      let currentAngle = 0
      segments.forEach(segment => {
        const sweepAngle = (segment.percent / 100) * 360
        drawPieSegment(pieX, pieY, pieRadius, currentAngle, currentAngle + sweepAngle, segment.color)
        currentAngle += sweepAngle
      })
      
      // Legend with adjusted position
      const legendY = chartY + 50
      doc.setFontSize(8)
      
      // Conflict Resolver
      doc.setFillColor(16, 185, 129)
      doc.rect(50, legendY, 4, 4, 'F')
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('Conflict Resolver (30%)', 56, legendY + 3)
      
      // Empathy Expert
      doc.setFillColor(5, 150, 105)
      doc.rect(50, legendY + 7, 4, 4, 'F')
      doc.text('Empathy Expert (25%)', 56, legendY + 10)
      
      // Balance Keeper
      doc.setFillColor(4, 120, 87)
      doc.rect(50, legendY + 14, 4, 4, 'F')
      doc.text('Balance Keeper (20%)', 56, legendY + 17)
      
      // Harmony Creator
      doc.setFillColor(6, 95, 70)
      doc.rect(50, legendY + 21, 4, 4, 'F')
      doc.text('Harmony Creator (15%)', 56, legendY + 24)
      
      // Diplomatic Negotiator
      doc.setFillColor(6, 78, 59)
      doc.rect(50, legendY + 28, 4, 4, 'F')
      doc.text('Diplomatic Negotiator (10%)', 56, legendY + 31)
      
      // Tools section
      currentY = legendY + 40
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Tools a Peacekeeper Panda needs to grow!', 20, currentY)
      
      currentY += 10
      doc.setFontSize(9)
      
      // Tool 1: Employee Mobile App
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const tool1Text = 'Employee Mobile App'
      const tool1Width = doc.getTextWidth(tool1Text)
      doc.text(tool1Text, 28, currentY)
      doc.link(28, currentY - 3, tool1Width, 4, {url: 'https://rosterlab.com/solutions/staff-roster-mobile-app'})
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(': Foster communication and team connection', 28 + tool1Width, currentY)
      currentY += 8
      
      // Tool 2: Self scheduling
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const tool2Text = 'Self scheduling'
      const tool2Width = doc.getTextWidth(tool2Text)
      doc.text(tool2Text, 28, currentY)
      doc.link(28, currentY - 3, tool2Width, 4, {url: 'https://rosterlab.com/feature/self-scheduling'})
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(': Let teams collaborate on their ideal schedules', 28 + tool2Width, currentY)
      currentY += 8
      
      // Tool 3: Automation roster generation
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const tool3Text = 'Automation roster generation'
      const tool3Width = doc.getTextWidth(tool3Text)
      doc.text(tool3Text, 28, currentY)
      doc.link(28, currentY - 3, tool3Width, 4, {url: 'https://rosterlab.com/solutions/ai-staff-scheduling'})
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(': Create balanced rosters automatically', 28 + tool3Width, currentY)
      currentY += 8
      
      // Check if we need page 2 for remaining content
      if (currentY > 200) {
        doc.addPage()
        currentY = 20
      }
      
      // Recommended reading
      currentY += 10
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Recommended reading for Peacekeeper Pandas', 20, currentY)
      
      currentY += 10
      doc.setFontSize(9)
      
      // Blog 1
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const blog1Text = 'Increase Staff Engagement for Shift Workers'
      const blog1Width = doc.getTextWidth(blog1Text)
      doc.text(blog1Text, 28, currentY)
      doc.link(28, currentY - 3, blog1Width, 4, {url: 'https://rosterlab.com/blog/increase-staff-engagement-for-shift-workers'})
      currentY += 8
      
      // Blog 2
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const blog2Text = 'Skeleton Staffing Guide: Lean Operations Management'
      const blog2Width = doc.getTextWidth(blog2Text)
      doc.text(blog2Text, 28, currentY)
      doc.link(28, currentY - 3, blog2Width, 4, {url: 'https://rosterlab.com/blog/skeleton-staffing-guide-lean-operations-management'})
      currentY += 8
      
      // Blog 3
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const blog3Text = 'Fairer Scheduling at Work: Reducing Shift Bias'
      const blog3Width = doc.getTextWidth(blog3Text)
      doc.text(blog3Text, 28, currentY)
      doc.link(28, currentY - 3, blog3Width, 4, {url: 'https://rosterlab.com/blog/fairer-scheduling-at-work-reducing-shift-bias'})
      currentY += 17
      
      // Need help section
      currentY += 10
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Need help with your roster?', 20, currentY)
      
      currentY += 10
      doc.setFontSize(10)
      doc.setTextColor(...textColor as [number, number, number])
      const helpText = 'Let RosterLab help you maintain workplace harmony with intelligent scheduling that balances everyone\'s needs.'
      const helpLines = doc.splitTextToSize(helpText, 170)
      doc.text(helpLines, 20, currentY)
      currentY += helpLines.length * 5
      
      // Footer at bottom of current page
      const pageHeight = 297 // A4 height in mm
      doc.setFontSize(9)
      doc.setTextColor(...lightGray as [number, number, number])
      doc.text('Generated by RosterLab - AI-Powered Staff Scheduling', 105, pageHeight - 15, { align: 'center' })
      doc.setTextColor(...linkBlue as [number, number, number])
      const footerText = 'Visit rosterlab.com to learn more'
      const footerWidth = doc.getTextWidth(footerText)
      const footerX = 105 - (footerWidth / 2)
      doc.text(footerText, 105, pageHeight - 10, { align: 'center' })
      doc.link(footerX, pageHeight - 13, footerWidth, 4, {url: 'https://rosterlab.com'})
      
      // Save the PDF
      doc.save(`RosterLab-Peacekeeper-Panda-${name.replace(/\s+/g, '-')}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      }
      alert('There was an error generating your PDF. Please check the console for details.')
    }
  }, [])

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <section className="relative z-30 py-8 md:py-10 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                It sounds like you best fit:<br />
                <span className="text-primary-600">The Peacekeeper Panda</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Mediator type who balances personalities and conflicts with zen-like calm. Your peaceful approach creates harmony in even the most chaotic scheduling situations.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                    />
                  </svg>
                  {copied ? 'Copied to clipboard!' : 'Share your results'}
                </button>
                <Link
                  href="/tools/staff-scheduling-personality-quiz"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-primary-600 border border-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Take the Quiz
                </Link>
              </div>
            </div>
            
            {/* Right Column - Tarot Card */}
            <div className="order-first lg:order-last">
              <div className="relative w-full max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                <div className="relative w-full h-[22rem] transform rotate-3 transition-transform duration-300 hover:rotate-0">
                  <Image
                    src="/images/quiz/panda/peacekeeper.png"
                    alt="The Peacekeeper Panda"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Style Section */}
      <section id="celebrity-section" className="bg-gray-50 py-8 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            If your rostering style was a celebrity you'd be…
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mt-16">
            {/* Dalai Shiftma */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/panda/dalai.png"
                  alt="Dalai Shiftma"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dalai Shiftma</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Finding inner peace in roster management, one shift at a time.
              </p>
            </div>
            
            {/* Sir Roster Attenborough */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/panda/david.png"
                  alt="Sir Roster Attenborough"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sir Roster Attenborough</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Narrating the beautiful harmony of workplace ecosystems.
              </p>
            </div>
            
            {/* Zendaya Zen-roster */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/panda/zendaya.png"
                  alt="Zendaya Zen-roster"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zendaya Zen-roster</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Balancing schedules with effortless grace and poise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* As the Peacekeeper Panda Section */}
      <section id="as-peacekeeper-panda-section" className="relative z-30 py-8 md:py-10 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            As the Peacekeeper Panda…
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-4xl mx-auto">
            You bring calm to chaos, resolving conflicts with wisdom and creating schedules that maintain workplace harmony and balance. Your diplomatic approach makes you the workplace zen master.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Content (full width on mobile) */}
            <div>
              {/* Key Characteristics */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Conflict Resolver:</span> Mediates disputes with diplomatic finesse and wisdom
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Empathy Expert:</span> Deeply understands every team member's unique needs
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Balance Keeper:</span> Maintains equilibrium in all scheduling situations
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Harmony Creator:</span> Builds peaceful and productive workplace environments
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Diplomatic Negotiator:</span> Finds win-win solutions for everyone involved
                  </p>
                </div>
              </div>
              
              {/* Download Results CTA */}
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setShowDownloadForm(true)}
                  className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Download my results
                </button>
              </div>
            </div>
            
            {/* Right Column - Pie Chart (shows below on mobile) */}
            <div className="relative mt-12 lg:mt-0">
              <div className="relative w-full flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Peacekeeper Panda DNA</h3>
                
                {/* Pie Chart */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Conflict Resolver - 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth={hoveredSection === 'conflict' ? '24' : '20'}
                      strokeDasharray="75.36 251.2"
                      strokeDashoffset="0"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'conflict' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('conflict')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Empathy Expert - 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth={hoveredSection === 'empathy' ? '24' : '20'}
                      strokeDasharray="62.8 251.2"
                      strokeDashoffset="-75.36"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'empathy' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('empathy')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Balance Keeper - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0369a1"
                      strokeWidth={hoveredSection === 'balance' ? '24' : '20'}
                      strokeDasharray="50.24 251.2"
                      strokeDashoffset="-138.16"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'balance' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('balance')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Harmony Creator - 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#075985"
                      strokeWidth={hoveredSection === 'harmony' ? '24' : '20'}
                      strokeDasharray="37.68 251.2"
                      strokeDashoffset="-188.4"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'harmony' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('harmony')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Diplomatic Negotiator - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#164e63"
                      strokeWidth={hoveredSection === 'diplomatic' ? '24' : '20'}
                      strokeDasharray="25.12 251.2"
                      strokeDashoffset="-226.08"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'diplomatic' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('diplomatic')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                  </svg>
                  
                  {/* Center circle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center">
                      {hoveredSection && (
                        <div className="text-center animate-fade-in p-2">
                          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {hoveredSection === 'conflict' && '30%'}
                            {hoveredSection === 'empathy' && '25%'}
                            {hoveredSection === 'balance' && '20%'}
                            {hoveredSection === 'harmony' && '15%'}
                            {hoveredSection === 'diplomatic' && '10%'}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                            {hoveredSection === 'conflict' && 'Conflict\nResolver'}
                            {hoveredSection === 'empathy' && 'Empathy\nExpert'}
                            {hoveredSection === 'balance' && 'Balance\nKeeper'}
                            {hoveredSection === 'harmony' && 'Harmony\nCreator'}
                            {hoveredSection === 'diplomatic' && 'Diplomatic\nNegotiator'}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="mt-8 space-y-2">
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'conflict' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'conflict' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('conflict')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0ea5e9] rounded-sm"></div>
                    <span className="text-gray-700">Conflict Resolver (30%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'empathy' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'empathy' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('empathy')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0284c7] rounded-sm"></div>
                    <span className="text-gray-700">Empathy Expert (25%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'balance' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'balance' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('balance')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0369a1] rounded-sm"></div>
                    <span className="text-gray-700">Balance Keeper (20%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'harmony' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'harmony' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('harmony')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#075985] rounded-sm"></div>
                    <span className="text-gray-700">Harmony Creator (15%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'diplomatic' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'diplomatic' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('diplomatic')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#164e63] rounded-sm"></div>
                    <span className="text-gray-700">Diplomatic Negotiator (10%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Confetti Celebration */}
          {showCelebration && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(30)].map((_, i) => {
                      const colors = ['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#075985', '#0369a1']
                      const randomColor = colors[Math.floor(Math.random() * colors.length)]
                      const randomLeft = Math.random() * 100
                      const randomDelay = Math.random() * 0.5
                      const randomDuration = 2 + Math.random() * 1
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-3 h-3"
                          style={{
                            left: `${randomLeft}%`,
                            top: '-20px',
                            backgroundColor: randomColor,
                            animation: `confettiFall ${randomDuration}s ease-out ${randomDelay}s forwards`,
                            transform: `rotate(${Math.random() * 360}deg)`
                          }}
                        />
                      )
                    })}
                    <style jsx>{`
                      @keyframes confettiFall {
                        0% {
                          transform: translateY(0) rotate(0deg);
                          opacity: 1;
                        }
                        100% {
                          transform: translateY(100vh) rotate(720deg);
                          opacity: 0;
                        }
                      }
                    `}</style>
                  </div>
          )}
        </div>
      </section>


      {/* Tools Section */}
      <section className="bg-gray-50 py-8 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tools a Peacekeeper Panda needs to grow!
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Link href="/solutions/staff-roster-mobile-app" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Employee Mobile App</h3>
                <p className="text-gray-600 mb-4">
                  Foster communication and team connection with transparent scheduling and easy collaboration.
                </p>
                <span className="text-primary-600 font-medium inline-flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/feature/self-scheduling" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Self Scheduling</h3>
                <p className="text-gray-600 mb-4">
                  Let teams collaborate on their ideal schedules while maintaining balance and fairness.
                </p>
                <span className="text-primary-600 font-medium inline-flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/solutions/ai-staff-scheduling" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automation Roster Generation</h3>
                <p className="text-gray-600 mb-4">
                  Create balanced rosters automatically that consider everyone's needs and preferences.
                </p>
                <span className="text-primary-600 font-medium inline-flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
          
          <div className="text-center">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Try RosterLab for free
            </Link>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white py-8 md:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recommended reading for Peacekeeper Pandas
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
        </div>
      </section>

      {/* Need help with your roster? Section */}
      <section className="bg-gradient-to-b from-[#0a1929] to-[#1e3a5f] relative overflow-hidden py-8 md:py-10 lg:py-12">
        {/* Animated stars background */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <Star
              key={star.id}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration,
              }}
            />
          ))}
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need help with your roster?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            As a Peacekeeper Panda, you value harmony and balance above all. Let RosterLab help you maintain workplace harmony with intelligent scheduling that balances everyone's needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-[#0a1929] shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e3a5f] transition-colors duration-200"
            >
              See RosterLab in action
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur-sm px-8 py-3 text-base font-medium text-white border border-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Download Form Modal */}
      {showDownloadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Download Your Peacekeeper Panda Results
            </h3>
            <p className="text-gray-600 mb-6">
              Get your personalized rostering personality report as a PDF.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {isGeneratingPDF && (
                <div className="text-center py-4">
                  <p className="text-gray-600">Generating your personality report...</p>
                </div>
              )}

              <div className="pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isGeneratingPDF}
                  className="w-full bg-primary-600 text-white hover:bg-primary-700 py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download PDF Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowDownloadForm(false)}
                  className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 px-4 rounded-md font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}