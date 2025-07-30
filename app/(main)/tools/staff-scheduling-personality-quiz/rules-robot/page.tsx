'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import jsPDF to avoid SSR issues
const jsPDF = dynamic(() => import('jspdf').then(mod => mod.jsPDF), { ssr: false })

// Star component for background animation
function Star({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
      style={style}
    />
  )
}

export default function RulesRobotPage() {
  const [copied, setCopied] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

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
      
      // Flip the card when user scrolls past 200px
      if (scrollPosition > 200 && !isFlipped) {
        setIsFlipped(true)
      } else if (scrollPosition <= 200 && isFlipped) {
        setIsFlipped(false)
      }
      
      // Show celebration when the "As the Rules Robot" section is fully visible
      // This happens when we've scrolled past one full viewport height
      if (scrollPosition > windowHeight && scrollPosition < windowHeight * 2 && !showCelebration) {
        setShowCelebration(true)
        // Hide celebration after 3 seconds
        setTimeout(() => setShowCelebration(false), 3000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFlipped, showCelebration])

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
      // @ts-ignore - jsPDF is dynamically imported
      const PDF = await jsPDF
      if (!PDF) return

      const doc = new PDF()
      
      // Colors
      const primaryColor = [14, 165, 233] // primary-500
      const textColor = [31, 41, 55] // gray-800
      const lightGray = [156, 163, 175] // gray-400

      // Header
      doc.setFillColor(10, 25, 41) // Dark blue background
      doc.rect(0, 0, 210, 40, 'F')
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.text('Your Rostering Personality', 20, 20)
      doc.setFontSize(18)
      doc.text('The Rules Robot', 20, 30)

      // Personal Info
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.setFontSize(10)
      doc.text(`Name: ${name}`, 20, 50)
      doc.text(`Email: ${email}`, 20, 56)
      if (company) doc.text(`Company: ${company}`, 20, 62)

      // Main Description
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('About Your Personality', 20, 80)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      const description = doc.splitTextToSize(
        "You're the guardian of compliance, the protector of protocols. Your roster isn't just a schedule—it's a legally sound document that could withstand any audit. You navigate the complex world of staff scheduling with precision and an unwavering commitment to compliance.",
        170
      )
      doc.text(description, 20, 90)

      // Key Characteristics
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Your Key Characteristics', 20, 120)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      const characteristics = [
        '✓ Master of Compliance: Encyclopedic knowledge of labor laws',
        '✓ Documentation Champion: Every decision has a paper trail',
        '✓ Process Perfectionist: Systematic approaches eliminate guesswork',
        '✓ Risk Minimizer: Proactively addresses compliance issues',
        '✓ Detail-Oriented: Nothing escapes your careful review'
      ]
      
      let yPos = 130
      characteristics.forEach(char => {
        doc.text(char, 20, yPos)
        yPos += 8
      })

      // Celebrity Match
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Your Celebrity Match', 20, 180)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('Dwayne "The Roster" Johnson', 20, 190)
      doc.text('Strong, dependable, and unbreakable when it comes to rules.', 20, 196)

      // Breakfast Style
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Your Breakfast Style', 20, 210)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      const breakfast = doc.splitTextToSize(
        'A carefully portioned eggs Benedict with perfect hollandaise symmetry. Every element precisely measured, timed to perfection, and plated according to the highest standards.',
        170
      )
      doc.text(breakfast, 20, 220)

      // Recommended Tools
      doc.setFontSize(14)
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      doc.text('Tools to Help You Grow', 20, 245)
      
      doc.setFontSize(11)
      doc.setTextColor(textColor[0], textColor[1], textColor[2])
      doc.text('• Employee Mobile App - Compliant mobile access for your team', 20, 255)
      doc.text('• Shift Swaps - Automated compliance checking for all swaps', 20, 262)
      doc.text('• AI Roster Generator - Smart scheduling that follows all rules', 20, 269)

      // Footer
      doc.setFontSize(10)
      doc.setTextColor(lightGray[0], lightGray[1], lightGray[2])
      doc.text('Take the quiz again at rosterlab.com/tools/staff-scheduling-personality-quiz', 105, 285, { align: 'center' })
      
      // Save the PDF
      doc.save(`RosterLab-Rules-Robot-${name.replace(/[^a-z0-9]/gi, '_')}.pdf`)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Sorry, there was an error generating your PDF. Please try again.')
    }
  }, [])

  return (
    <div className="bg-white relative">
      {/* Wrapper for Hero and As Rules Robot sections with sticky card */}
      <div className="relative z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Content for both sections */}
            <div>
              {/* Hero Section - Full Screen */}
              <section className="min-h-screen flex items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                    It sounds like you best fit:<br />
                    <span className="text-primary-600">The Rules Robot</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    You're the guardian of compliance, the protector of protocols. Your roster isn't just a schedule—it's a legally sound document that could withstand any audit.
                  </p>
                  <div className="flex flex-wrap gap-4">
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
                  
                  {/* Scroll Down Arrow */}
                  <div className="mt-12 flex justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center animate-bounce">
                      <svg 
                        className="w-6 h-6 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>

              {/* As the Rules Robot Section - Full Screen */}
              <section className="min-h-screen flex items-center relative">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    As the Rules Robot…
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    You navigate the complex world of staff scheduling with precision and an unwavering commitment to compliance. Your methodical approach ensures every roster is legally sound and audit-ready.
                  </p>
                  
                  {/* Key Characteristics */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Master of Compliance:</span> Encyclopedic knowledge of labor laws, regulations, and company policies
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Documentation Champion:</span> Every decision has a paper trail, creating bulletproof audit records
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Process Perfectionist:</span> Systematic approaches that eliminate guesswork and reduce errors
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Risk Minimizer:</span> Proactively identifies and addresses potential compliance issues before they arise
                      </p>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">
                        <span className="font-semibold">Detail-Oriented:</span> Nothing escapes your careful review, from overtime calculations to break requirements
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
              </section>
            </div>

            {/* Right Column - Sticky Card that spans both sections */}
            <div className="relative hidden lg:block">
              <div className="sticky top-32 min-h-screen flex items-center">
                {/* Card container with 3D flip effect */}
                <div className="relative w-96 h-[28rem] mx-auto" style={{ perspective: '1000px' }}>
                  <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front of card */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative w-full h-full transform rotate-3 transition-transform duration-300 hover:rotate-0">
                        <Image
                          src="/images/quiz/test2.png"
                          alt="The Rules Robot"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="relative w-full h-full transform rotate-3 transition-transform duration-300 hover:rotate-0">
                        <Image
                          src="/images/quiz/test3.png"
                          alt="The Rules Robot - Back"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Celebrity Style Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-white sticky top-0 z-[5] mb-96">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            If your rostering style was a celebrity you'd be…
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mt-16">
            {/* Serena Shift-Williams */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/SERENA.png"
                  alt="Serena Shift-Williams"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Serena Shift-Williams</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Serves up rosters with precision and zero tolerance for rule violations.
              </p>
            </div>
            
            {/* Dwayne "The Roster" Johnson */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/DWAYNE1.png"
                  alt="Dwayne The Roster Johnson"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dwayne "The Roster" Johnson</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                Just like you, strong, dependable, and unbreakable when it comes to rules.
              </p>
            </div>
            
            {/* Robocopliance */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/ROBO.png"
                  alt="Robocopliance"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Robocopliance</h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                A nod to Robocop, but with that sweet, sweet adherence to policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breakfast Style Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-gray-50 sticky top-0 z-[6] mb-96">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            If your rostering style were a breakfast...
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/quiz/eggs2.png"
                  alt="Eggs Benedict - The Rules Robot breakfast"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                A carefully portioned eggs Benedict with perfect hollandaise symmetry.
              </h3>
              <p className="text-lg text-gray-600">
                Every element precisely measured, timed to perfection, and plated according to the highest standards of breakfast protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Song Lyric Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-white sticky top-0 z-[7] mb-96">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            If your weekly staff scheduling style was a song lyric…
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl shadow-lg p-12 border border-gray-200">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Song Image</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Song: "Sound of da Police" by KRS-One
                </h3>
                <p className="text-xl text-gray-700 italic mb-6">
                  [A classic hip-hop track about authority and oversight]
                </p>
                <p className="text-lg text-gray-800 mb-8">
                  📋 You don't just follow rules—you are the rules.
                </p>
              </div>
              <a
                href="https://www.youtube.com/watch?v=8Odt6a_Fzk0&list=RD8Odt6a_Fzk0&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Listen on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-white sticky top-0 z-10 mb-96">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tools a Rules Robot needs to grow!
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <Link href="/solutions/mobile-app" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Employee mobile app</h3>
                <p className="text-gray-600 mb-4">
                  Empower your team with mobile access to rosters, shift swaps, and leave requests - all compliant with your rules.
                </p>
                <span className="text-primary-600 font-medium inline-flex items-center">
                  Learn more 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/features/shift-swapping" className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-24 h-24 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Shift Swaps</h3>
                <p className="text-gray-600 mb-4">
                  Automated shift swapping that maintains compliance - approve only swaps that meet your rules and regulations.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI roster generator</h3>
                <p className="text-gray-600 mb-4">
                  Generate compliant rosters in seconds with AI that understands and enforces all your rules and requirements.
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

      {/* Recommendations Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-gray-50 sticky top-0 z-20 mb-96">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Recommended reading for Rules Robots
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/manage-night-shift-planning-wellbeing-effectively" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Manage Night Shift Planning & Wellbeing Effectively
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Learn how to create compliant night shift schedules that prioritize employee wellbeing while meeting operational needs.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
            
            {/* Blog Post 2 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/fairer-scheduling-at-work-reducing-shift-bias" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Fairer Scheduling at Work: Reducing Shift Bias
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Discover how to implement fair scheduling practices that eliminate bias and ensure compliance with equality regulations.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
            
            {/* Blog Post 3 */}
            <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <Link href="/blog/staff-rostering-to-payroll-the-right-way-to-do-it" className="block">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Blog Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors line-clamp-2">
                    Staff Rostering to Payroll: The Right Way to Do It
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    Master the process of converting rosters to payroll accurately while maintaining compliance with wage regulations.
                  </p>
                  <span className="text-primary-600 font-medium hover:underline inline-flex items-center">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Need help with your roster? Section - Full Screen */}
      <section className="min-h-screen flex items-center bg-gradient-to-b from-[#0a1929] to-[#1e3a5f] relative z-30 overflow-hidden">
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
            As a Rules Robot, you understand the importance of compliance and accuracy. Let RosterLab handle the complex calculations and regulations while you focus on strategic decisions.
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
              Download Your Rules Robot Results
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