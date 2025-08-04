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

interface SocialButterflyClientProps {
  recommendedPosts: BlogPost[]
}

export default function SocialButterflyClient({ recommendedPosts }: SocialButterflyClientProps) {
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
      
      // Show celebration when the "As the Social Butterfly" section is fully visible
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
    window.history.pushState({ from: 'social-butterfly' }, '', window.location.href)
    
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
      
      // Helper function to load images as base64
      const loadImage = async (url: string): Promise<string> => {
        try {
          const response = await fetch(url)
          const blob = await response.blob()
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
        } catch (error) {
          console.error('Error loading image:', url, error)
          return ''
        }
      }
      
      // Load images
      const [logoImage, tarotImage, drewImage, taylorImage, brunoImage, toolsIllustration] = await Promise.all([
        loadImage('/images/rosterlab-logo.png'),
        loadImage('/images/quiz/butterfly/butterfly.png'),
        loadImage('/images/quiz/butterfly/drew.png'),
        loadImage('/images/quiz/butterfly/tay.png'),
        loadImage('/images/quiz/butterfly/bruno.png'),
        loadImage('/images/illustration/pdfimage.png')
      ])
      
      // Colors
      const primaryColor = [14, 165, 233] // primary-500
      const textColor = [31, 41, 55] // gray-800
      const lightGray = [156, 163, 175] // gray-400
      const rosterLabBlue = [3, 105, 161] // #0369A1
      const linkBlue = [0, 102, 204] // #0066CC for hyperlinks

      // Extract first name
      const firstName = name.split(' ')[0]
      
      // Page 1
      // Header without background color
      // Add RosterLab logo
      if (logoImage) {
        try {
          doc.addImage(logoImage, 'PNG', 20, 10, 45, 12)
        } catch (error) {
          console.error('Error adding logo:', error)
          // Fallback to text if image fails
          doc.setTextColor(...textColor as [number, number, number])
          doc.setFontSize(14)
          doc.setFont('helvetica', 'bold')
          doc.text('ROSTERLAB', 20, 15)
        }
      } else {
        // Fallback to text if image not loaded
        doc.setTextColor(...textColor as [number, number, number])
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('ROSTERLAB', 20, 15)
      }
      
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(20)
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(`${firstName}'s Rostering Personality`, 20, 32)
      doc.setFontSize(16)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('The Social Butterfly', 20, 42)
      
      // Start content with more spacing
      let currentY = 58
      
      // Main content with tarot card image
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('It sounds like you best fit: The Social Butterfly', 20, currentY)
      
      // Add tarot card image on the right
      if (tarotImage) {
        try {
          doc.addImage(tarotImage, 'PNG', 140, currentY - 5, 50, 70)
        } catch (error) {
          console.error('Error adding tarot image:', error)
        }
      }
      
      currentY += 10
      doc.setFontSize(11)
      doc.setTextColor(...textColor as [number, number, number])
      const description = "Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics."
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
      
      // Celebrity 1 text
      doc.text('• Drew Fairymore', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Everyone gets a fair shift', 25, currentY + 5)
      currentY += 12
      
      // Celebrity 2 text
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('• Taylor Shift', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Creates perfect team harmony', 25, currentY + 5)
      currentY += 12
      
      // Celebrity 3 text
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('• Bruno Time-Off Mars', 25, currentY)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text('  Makes scheduling fun', 25, currentY + 5)
      currentY += 15
      
      // Celebrity images in a row below the text
      if (drewImage || taylorImage || brunoImage) {
        const imageY = currentY
        const imageSize = 25
        const imageSpacing = 30
        
        if (drewImage) {
          try {
            doc.addImage(drewImage, 'PNG', 25, imageY, imageSize, imageSize)
          } catch (error) {
            console.error('Error adding Drew image:', error)
          }
        }
        
        if (taylorImage) {
          try {
            doc.addImage(taylorImage, 'PNG', 25 + imageSpacing, imageY, imageSize, imageSize)
          } catch (error) {
            console.error('Error adding Taylor image:', error)
          }
        }
        
        if (brunoImage) {
          try {
            doc.addImage(brunoImage, 'PNG', 25 + (imageSpacing * 2), imageY, imageSize, imageSize)
          } catch (error) {
            console.error('Error adding Bruno image:', error)
          }
        }
        
        currentY += imageSize + 10
      }
      
      // As the Social Butterfly section
      currentY += 5
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('As the Social Butterfly...', 20, currentY)
      
      currentY += 10
      doc.setFontSize(10)
      doc.setTextColor(...textColor as [number, number, number])
      const butterflyDesc = 'You create rosters that keep everyone happy, ensuring fairness while maintaining team morale and positive workplace vibes.'
      const butterflyLines = doc.splitTextToSize(butterflyDesc, 170)
      doc.text(butterflyLines, 20, currentY)
      currentY += butterflyLines.length * 4 + 5
      
      // Key characteristics
      const characteristics = [
        '• Relationship Builder: Masters the art of team dynamics',
        '• Fairness Advocate: Ensures everyone gets equal opportunities',
        '• Communication Champion: Keeps everyone informed and engaged',
        '• Team Harmonizer: Balances individual needs with team goals',
        '• Morale Booster: Creates schedules that keep spirits high'
      ]
      
      doc.setFontSize(10)
      characteristics.forEach(char => {
        if (currentY > 270) {
          doc.addPage()
          // Add logo to new page
          if (logoImage) {
            try {
              doc.addImage(logoImage, 'PNG', 20, 10, 45, 12)
            } catch (error) {
              console.error('Error adding logo to page 2:', error)
            }
          }
          currentY = 30
        }
        doc.text(char, 25, currentY)
        currentY += 7
      })
      
      // Check if we need page 2
      if (currentY > 180) {
        doc.addPage()
        // Add logo to page 2
        if (logoImage) {
          try {
            doc.addImage(logoImage, 'PNG', 20, 10, 45, 12)
          } catch (error) {
            console.error('Error adding logo to page 2:', error)
          }
        }
        currentY = 30
      }
      
      // Pie Chart Section
      currentY += 10
      doc.setFontSize(14)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Your Social Butterfly DNA', 105, currentY, { align: 'center' })
      
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
      
      // Define segments with percentages and colors (pink theme)
      const segments = [
        { percent: 30, color: [236, 72, 153] as [number, number, number], label: 'Relationship Builder' },
        { percent: 25, color: [219, 39, 119] as [number, number, number], label: 'Fairness Advocate' },
        { percent: 20, color: [190, 24, 93] as [number, number, number], label: 'Communication Champion' },
        { percent: 15, color: [159, 18, 57] as [number, number, number], label: 'Team Harmonizer' },
        { percent: 10, color: [136, 19, 55] as [number, number, number], label: 'Morale Booster' }
      ]
      
      // Draw the pie chart
      let currentAngle = 0
      segments.forEach(segment => {
        const sweepAngle = (segment.percent / 100) * 360
        drawPieSegment(pieX, pieY, pieRadius, currentAngle, currentAngle + sweepAngle, segment.color)
        currentAngle += sweepAngle
      })
      
      // Legend centered below pie chart
      const legendY = pieY + pieRadius + 10
      doc.setFontSize(8)
      doc.setTextColor(...textColor as [number, number, number])
      
      // Calculate legend items positioning for centering
      const legendItems = [
        { color: [236, 72, 153], text: 'Relationship Builder (30%)' },
        { color: [219, 39, 119], text: 'Fairness Advocate (25%)' },
        { color: [190, 24, 93], text: 'Communication Champion (20%)' },
        { color: [159, 18, 57], text: 'Team Harmonizer (15%)' },
        { color: [136, 19, 55], text: 'Morale Booster (10%)' }
      ]
      
      // Draw legend items centered
      legendItems.forEach((item, index) => {
        const boxX = pieX - 40 // Center the legend items under the pie
        const itemY = legendY + (index * 7)
        
        // Draw colored box
        doc.setFillColor(...item.color as [number, number, number])
        doc.rect(boxX, itemY - 3, 4, 4, 'F')
        
        // Draw text
        doc.setTextColor(...textColor as [number, number, number])
        doc.text(item.text, boxX + 6, itemY)
      })
      
      // Tools section
      currentY = legendY + 40
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Tools a Social Butterfly needs to grow!', 20, currentY)
      
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
      doc.text(': Keep everyone connected and engaged on the go', 28 + tool1Width, currentY)
      currentY += 8
      
      // Tool 2: Shift Swaps
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const tool2Text = 'Shift Swaps'
      const tool2Width = doc.getTextWidth(tool2Text)
      doc.text(tool2Text, 28, currentY)
      doc.link(28, currentY - 3, tool2Width, 4, {url: 'https://rosterlab.com/feature/shift-swaps'})
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(': Let your team trade shifts easily while maintaining fairness', 28 + tool2Width, currentY)
      currentY += 8
      
      // Tool 3: AI Roster Generator
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const tool3Text = 'AI Roster Generator'
      const tool3Width = doc.getTextWidth(tool3Text)
      doc.text(tool3Text, 28, currentY)
      doc.link(28, currentY - 3, tool3Width, 4, {url: 'https://rosterlab.com/solutions/ai-staff-scheduling'})
      doc.setTextColor(...textColor as [number, number, number])
      doc.text(': Create fair rosters that consider team preferences', 28 + tool3Width, currentY)
      currentY += 8
      
      // Check if we need page 2 for remaining content
      if (currentY > 200) {
        doc.addPage()
        // Add logo to new page
        if (logoImage) {
          try {
            doc.addImage(logoImage, 'PNG', 20, 10, 45, 12)
          } catch (error) {
            console.error('Error adding logo to new page:', error)
          }
        }
        currentY = 30
      }
      
      // Recommended reading with illustration
      currentY += 10
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Recommended reading for Social Butterflies', 20, currentY)
      
      // Add illustration on the right
      if (toolsIllustration) {
        try {
          // Use wider aspect ratio to prevent squishing
          doc.addImage(toolsIllustration, 'PNG', 130, currentY - 10, 65, 40)
        } catch (error) {
          console.error('Error adding reading illustration:', error)
        }
      }
      
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
      const blog2Text = 'Comprehensive Guide to Shift Swaps'
      const blog2Width = doc.getTextWidth(blog2Text)
      doc.text(blog2Text, 28, currentY)
      doc.link(28, currentY - 3, blog2Width, 4, {url: 'https://rosterlab.com/blog/comprehensive-guide-shift-swaps'})
      currentY += 8
      
      // Blog 3
      doc.setTextColor(...textColor as [number, number, number])
      doc.text('• ', 25, currentY)
      doc.setTextColor(...linkBlue as [number, number, number])
      const blog3Text = 'Rotating Rosters: Best Practices'
      const blog3Width = doc.getTextWidth(blog3Text)
      doc.text(blog3Text, 28, currentY)
      doc.link(28, currentY - 3, blog3Width, 4, {url: 'https://rosterlab.com/blog/rotating-rosters'})
      currentY += 17
      
      // Need help section
      currentY += 10
      doc.setFontSize(13)
      doc.setTextColor(...primaryColor as [number, number, number])
      doc.text('Need help with your roster?', 20, currentY)
      
      currentY += 10
      doc.setFontSize(10)
      doc.setTextColor(...textColor as [number, number, number])
      const helpText = 'Let RosterLab help you create schedules that keep your team happy and engaged while maintaining operational efficiency.'
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
      doc.save(`RosterLab-Social-Butterfly-${name.replace(/\s+/g, '-')}.pdf`)
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
                <span className="text-primary-600">The Social Butterfly</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Focuses on fairness, vibes, and keeping everyone happy. Your scheduling approach prioritizes team morale and interpersonal dynamics.
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
                    src="/images/quiz/butterfly/butterfly.png"
                    alt="The Social Butterfly"
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
            {/* Drew Fairymore */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/butterfly/drew.png"
                  alt="Drew Fairymore"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Drew Fairymore</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Everyone gets a fair shift and leaves work with a smile.
              </p>
            </div>
            
            {/* Taylor Shift */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/butterfly/tay.png"
                  alt="Taylor Shift"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Taylor Shift</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Creates perfect team harmony with every roster she writes.
              </p>
            </div>
            
            {/* Bruno Time-Off Mars */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/butterfly/bruno.png"
                  alt="Bruno Time-Off Mars"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bruno Time-Off Mars</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Makes scheduling fun and keeps everyone dancing through their shifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* As the Social Butterfly Section */}
      <section id="as-social-butterfly-section" className="relative z-30 py-8 md:py-10 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            As the Social Butterfly…
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-4xl mx-auto">
            You create rosters that keep everyone happy, ensuring fairness while maintaining team morale and positive workplace vibes. Your empathetic approach makes you the heart of your scheduling team.
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
                    <span className="font-semibold">Relationship Builder:</span> Masters the art of team dynamics and interpersonal connections
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Fairness Advocate:</span> Ensures everyone gets equal opportunities and balanced workloads
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Communication Champion:</span> Keeps everyone informed, engaged, and feeling heard
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Team Harmonizer:</span> Balances individual needs with team goals seamlessly
                  </p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">
                    <span className="font-semibold">Morale Booster:</span> Creates schedules that keep spirits high and teams motivated
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
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Social Butterfly DNA</h3>
                
                {/* Pie Chart */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Relationship Builder - 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0ea5e9"
                      strokeWidth={hoveredSection === 'relationship' ? '24' : '20'}
                      strokeDasharray="75.36 251.2"
                      strokeDashoffset="0"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'relationship' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('relationship')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Fairness Advocate - 25% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth={hoveredSection === 'fairness' ? '24' : '20'}
                      strokeDasharray="62.8 251.2"
                      strokeDashoffset="-75.36"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'fairness' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('fairness')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Communication Champion - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#0369a1"
                      strokeWidth={hoveredSection === 'communication' ? '24' : '20'}
                      strokeDasharray="50.24 251.2"
                      strokeDashoffset="-138.16"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'communication' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('communication')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Team Harmonizer - 15% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#075985"
                      strokeWidth={hoveredSection === 'harmonizer' ? '24' : '20'}
                      strokeDasharray="37.68 251.2"
                      strokeDashoffset="-188.4"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'harmonizer' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('harmonizer')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                    
                    {/* Morale Booster - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#164e63"
                      strokeWidth={hoveredSection === 'morale' ? '24' : '20'}
                      strokeDasharray="25.12 251.2"
                      strokeDashoffset="-226.08"
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: hoveredSection && hoveredSection !== 'morale' ? 0.5 : 1 }}
                      onMouseEnter={() => setHoveredSection('morale')}
                      onMouseLeave={() => setHoveredSection(null)}
                    />
                  </svg>
                  
                  {/* Center circle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full flex items-center justify-center">
                      {hoveredSection && (
                        <div className="text-center animate-fade-in p-2">
                          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {hoveredSection === 'relationship' && '30%'}
                            {hoveredSection === 'fairness' && '25%'}
                            {hoveredSection === 'communication' && '20%'}
                            {hoveredSection === 'harmonizer' && '15%'}
                            {hoveredSection === 'morale' && '10%'}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                            {hoveredSection === 'relationship' && 'Relationship\nBuilder'}
                            {hoveredSection === 'fairness' && 'Fairness\nAdvocate'}
                            {hoveredSection === 'communication' && 'Communication\nChampion'}
                            {hoveredSection === 'harmonizer' && 'Team\nHarmonizer'}
                            {hoveredSection === 'morale' && 'Morale\nBooster'}
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
                      hoveredSection === 'relationship' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'relationship' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('relationship')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0ea5e9] rounded-sm"></div>
                    <span className="text-gray-700">Relationship Builder (30%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'fairness' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'fairness' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('fairness')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0284c7] rounded-sm"></div>
                    <span className="text-gray-700">Fairness Advocate (25%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'communication' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'communication' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('communication')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#0369a1] rounded-sm"></div>
                    <span className="text-gray-700">Communication Champion (20%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'harmonizer' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'harmonizer' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('harmonizer')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#075985] rounded-sm"></div>
                    <span className="text-gray-700">Team Harmonizer (15%)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                      hoveredSection === 'morale' ? 'scale-105 font-semibold' : ''
                    } ${hoveredSection && hoveredSection !== 'morale' ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHoveredSection('morale')}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className="w-4 h-4 bg-[#164e63] rounded-sm"></div>
                    <span className="text-gray-700">Morale Booster (10%)</span>
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
            Tools a Social Butterfly needs to grow!
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Link href="/feature/shift-swaps" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Shift Swaps</h3>
                <p className="text-gray-600 mb-4">
                  Let your team trade shifts easily while maintaining fairness and keeping everyone happy.
                </p>
                <span className="text-primary-600 font-medium inline-flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/solutions/staff-roster-mobile-app" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Employee Mobile App</h3>
                <p className="text-gray-600 mb-4">
                  Keep everyone connected and engaged on the go with real-time roster updates and team communication.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Powered Scheduling</h3>
                <p className="text-gray-600 mb-4">
                  Create fair rosters that consider team preferences and maintain harmony automatically.
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
            Recommended reading for Social Butterflies
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
            As a Social Butterfly, you understand the importance of team happiness and fairness. Let RosterLab help you create schedules that keep your team engaged while maintaining operational efficiency.
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
              Download Your Social Butterfly Results
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