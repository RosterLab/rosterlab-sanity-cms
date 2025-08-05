'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Star component for background animation
function Star({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
      style={style}
    />
  )
}

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: "How do you feel about rostering?",
    answers: [
      { id: 'a', text: "Love it! Give me Excel and a coffee, and I'm happy.", personality: 'spreadsheet' },
      { id: 'b', text: "I enjoy making people smile with a good shift.", personality: 'social' },
      { id: 'c', text: "Oh, I forgot—was it due today?", personality: 'lastminute' },
      { id: 'd', text: "It's a serious responsibility. There are rules!", personality: 'rules' },
      { id: 'e', text: "As long as nobody is upset, I'm good.", personality: 'peacekeeper' },
      { id: 'f', text: "HELP ME", personality: 'nohope' }
    ]
  },
  {
    id: 2,
    question: "Your roster is due tomorrow. What are you doing now?",
    answers: [
      { id: 'a', text: "Reviewing my macros one last time.", personality: 'spreadsheet' },
      { id: 'b', text: "DM'ing everyone for their preferences.", personality: 'social' },
      { id: 'c', text: "Just starting... I work best under pressure.", personality: 'lastminute' },
      { id: 'd', text: "Checking all award interpretations—again.", personality: 'rules' },
      { id: 'e', text: "Making sure that Sarah and Ben aren't rostered together... again.", personality: 'peacekeeper' },
      { id: 'f', text: "AHHHHGH!", personality: 'nohope' }
    ]
  },
  {
    id: 3,
    question: "You notice a shift overlaps break compliance rules. What's your reaction?",
    answers: [
      { id: 'a', text: "I already built formulas to catch that.", personality: 'spreadsheet' },
      { id: 'b', text: "Oh no—will that upset anyone?", personality: 'social' },
      { id: 'c', text: "Didn't see that. We'll survive.", personality: 'lastminute' },
      { id: 'd', text: "NOT ON MY WATCH. Must fix immediately.", personality: 'rules' },
      { id: 'e', text: "Let me see who's affected and talk to them.", personality: 'peacekeeper' },
      { id: 'f', text: "Looks the other way, clicks share", personality: 'nohope' }
    ]
  },
  {
    id: 4,
    question: "Someone messages at 9pm asking for a change. What do you do?",
    answers: [
      { id: 'a', text: "Check if my formulas can handle the swap automatically.", personality: 'spreadsheet' },
      { id: 'b', text: "Say yes and move things around.", personality: 'social' },
      { id: 'c', text: "Sigh and do it in the morning.", personality: 'lastminute' },
      { id: 'd', text: "Ask them to submit it formally in writing.", personality: 'rules' },
      { id: 'e', text: "Try to find a compromise that works for everyone.", personality: 'peacekeeper' },
      { id: 'f', text: "Pretend I didn't see the message.", personality: 'nohope' }
    ]
  },
  {
    id: 5,
    question: "What do you care about most in a roster?",
    answers: [
      { id: 'a', text: "Efficiency and optimization.", personality: 'spreadsheet' },
      { id: 'b', text: "Making everyone feel considered.", personality: 'social' },
      { id: 'c', text: "Getting it done without losing my mind.", personality: 'lastminute' },
      { id: 'd', text: "Legal compliance and structure.", personality: 'rules' },
      { id: 'e', text: "Team harmony and morale.", personality: 'peacekeeper' },
      { id: 'f', text: "Just surviving without too many complaints", personality: 'nohope' }
    ]
  },
  {
    id: 6,
    question: "Your ideal team roster looks like...",
    answers: [
      { id: 'a', text: "A perfect balance of shifts, breaks, and responsibilities.", personality: 'spreadsheet' },
      { id: 'b', text: "Everyone has the shifts they wanted.", personality: 'social' },
      { id: 'c', text: "Something I whipped up in an hour that somehow works.", personality: 'lastminute' },
      { id: 'd', text: "A roster that would pass any audit with flying colors.", personality: 'rules' },
      { id: 'e', text: "No one's crying and the group chat is chill.", personality: 'peacekeeper' },
      { id: 'f', text: "Someone else doing the rostering instead of me", personality: 'nohope' }
    ]
  },
  {
    id: 7,
    question: "When things go wrong, your first move is to...",
    answers: [
      { id: 'a', text: "Diagnose the spreadsheet.", personality: 'spreadsheet' },
      { id: 'b', text: "Ask the team how they're feeling.", personality: 'social' },
      { id: 'c', text: "Try to patch it on the fly.", personality: 'lastminute' },
      { id: 'd', text: "Escalate to management with records.", personality: 'rules' },
      { id: 'e', text: "Calm the waters and realign the team.", personality: 'peacekeeper' },
      { id: 'f', text: "Cry in a quiet corner for a while", personality: 'nohope' }
    ]
  },
  {
    id: 8,
    question: "What tool do you prefer to use for rostering?",
    answers: [
      { id: 'a', text: "Excel or Google Sheets with conditional formatting.", personality: 'spreadsheet' },
      { id: 'b', text: "A group chat, calendar, and lots of emojis.", personality: 'social' },
      { id: 'c', text: "Whatever's quickest right now.", personality: 'lastminute' },
      { id: 'd', text: "Award-compliant rostering software.", personality: 'rules' },
      { id: 'e', text: "Anything that lets me see everyone's preferences.", personality: 'peacekeeper' },
      { id: 'f', text: "A good old fashion pen and paper", personality: 'nohope' }
    ]
  }
]

// Personality URLs mapping
const personalityUrls: Record<string, string> = {
  'spreadsheet': '/tools/staff-scheduling-personality-quiz/spreadsheet-sorcerer',
  'peacekeeper': '/tools/staff-scheduling-personality-quiz/peacekeeper-panda',
  'social': '/tools/staff-scheduling-personality-quiz/social-butterfly',
  'rules': '/tools/staff-scheduling-personality-quiz/rules-robot',
  'lastminute': '/tools/staff-scheduling-personality-quiz/last-minute-magician',
  'nohope': '/tools/staff-scheduling-personality-quiz/chaos-nancy'
}

export default function QuizClient() {
  const router = useRouter()
  const [isQuizActive, setIsQuizActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [linkCopied, setLinkCopied] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzeText, setAnalyzeText] = useState('Analyzing your traits...')
  const [personalityScores, setPersonalityScores] = useState<Record<string, number>>({
    spreadsheet: 0,
    social: 0,
    lastminute: 0,
    rules: 0,
    peacekeeper: 0,
    nohope: 0
  })

  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }))

  // Reset quiz state when component mounts (e.g., when returning via back button)
  useEffect(() => {
    setIsQuizActive(false)
    setCurrentQuestion(0)
    setAnswers({})
    setIsAnalyzing(false)
    setPersonalityScores({
      spreadsheet: 0,
      social: 0,
      lastminute: 0,
      rules: 0,
      peacekeeper: 0,
      nohope: 0
    })
  }, [])

  const handleStartQuiz = () => {
    setIsQuizActive(true)
    setCurrentQuestion(0)
    setAnswers({})
    setPersonalityScores({
      spreadsheet: 0,
      social: 0,
      lastminute: 0,
      rules: 0,
      peacekeeper: 0,
      nohope: 0
    })
  }

  const handleCloseQuiz = () => {
    setIsQuizActive(false)
    setCurrentQuestion(0)
    setAnswers({})
    setPersonalityScores({
      spreadsheet: 0,
      social: 0,
      lastminute: 0,
      rules: 0,
      peacekeeper: 0,
      nohope: 0
    })
  }

  const calculateResult = () => {
    // Find the personality with the highest score
    let maxScore = 0
    let topPersonalities: string[] = []
    
    for (const [personality, score] of Object.entries(personalityScores)) {
      if (score > maxScore) {
        maxScore = score
        topPersonalities = [personality]
      } else if (score === maxScore) {
        topPersonalities.push(personality)
      }
    }
    
    // If there's a tie, pick randomly
    const winner = topPersonalities[Math.floor(Math.random() * topPersonalities.length)]
    return personalityUrls[winner]
  }

  const handleAnswer = (answerId: string) => {
    // Find the selected answer and its personality
    const selectedAnswer = quizQuestions[currentQuestion].answers.find(a => a.id === answerId)
    if (selectedAnswer) {
      // Update scores
      const newScores = { ...personalityScores }
      newScores[selectedAnswer.personality] += 1
      setPersonalityScores(newScores)
      
      // Record answer
      setAnswers({ ...answers, [currentQuestion]: answerId })
      
      // Move to next question or calculate result
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Quiz complete - show analyzing screen
        setIsAnalyzing(true)
        
        // All possible messages
        const allMessages = [
          'Analyzing your traits...',
          'Rostering your personality...',
          'Quizzing your shift management...',
          'Calculating compliance levels...',
          'Measuring your scheduling style...',
          'Evaluating your roster approach...',
          'Processing your answers...',
          'Decoding your management DNA...'
        ]
        
        // Randomly select 3 messages
        const shuffled = [...allMessages].sort(() => Math.random() - 0.5)
        const selectedMessages = shuffled.slice(0, 3)
        
        let messageIndex = 0
        setAnalyzeText(selectedMessages[0])
        
        const messageInterval = setInterval(() => {
          messageIndex++
          if (messageIndex < selectedMessages.length) {
            setAnalyzeText(selectedMessages[messageIndex])
          }
        }, 1500) // 1.5 seconds per message
        
        // After 4.5 seconds (3 messages x 1.5s), redirect to result
        setTimeout(() => {
          clearInterval(messageInterval)
          const resultUrl = calculateResult()
          // Use router.push and replace current history entry to fix back button behavior
          router.replace(resultUrl)
        }, 4500)
      }
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/tools/staff-scheduling-personality-quiz')
      .then(() => {
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
      })
      .catch(err => console.error('Failed to copy:', err))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1929] to-[#1e3a5f] py-16 md:py-24">
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
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                Everyone has a<br />
                rostering personality.<br />
                What's yours?
              </h1>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <button
                  onClick={handleStartQuiz}
                  className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-[#0a1929] shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e3a5f] transition-colors duration-200"
                >
                  Start the quiz
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
                >
                  <span>{linkCopied ? 'Link copied to clipboard' : 'Share this link'}</span>
                  {linkCopied ? (
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="relative h-64 lg:h-96">
              <Image
                src="/images/quiz/cards.png"
                alt="Personality quiz cards"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the rostering quiz Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                About the rostering quiz
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Based on research and testing, our personality quiz aims to open up new perspectives for you – about yourself, your roster, and your redeeming hero-like qualities to get that roster done.
              </p>
              <div className="space-y-4 text-gray-600">
                <p>
                  Have you ever noticed how teams have such different approaches to staff rostering? Our relationship with rostering isn't just about getting a good quality roster to the finishing line, it's about the problem-solving we do and the people we help too. If you're curious about yourself and the way you approach staff scheduling, this will be time well spent.
                </p>
                <p>
                  Developed in conjunction with roster creators, this rostering tool is based on extensive research and insights into team dynamics. As more and more people take the quiz, we'll continue to refine it to bring you ever more insight into our work scheduling styles.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/quiz/test4.png"
                alt="Rostering quiz characters"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The six rostering personalities Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
            Discover your rostering personality type
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* First row - 3 boxes */}
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Spreadsheet Sorcerer</h3>
              <p className="text-gray-600">
                Detail-oriented, loves formulas, color codes everything.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Social Butterfly</h3>
              <p className="text-gray-600">
                Focuses on fairness, vibes, and keeping everyone happy (even if the maths suffers).
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Last-Minute Magician</h3>
              <p className="text-gray-600">
                Thrives under pressure, makes the schedule the night before - and somehow it works.
              </p>
            </div>

            {/* Second row - 3 boxes */}
            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Rules Robot</h3>
              <p className="text-gray-600">
                Obsessed with compliance, laws, break times, and documentation. Follows compliance like it's scripture.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Peacekeeper Panda</h3>
              <p className="text-gray-600">
                Mediator type. Tries to balance personalities, time-off requests, and drama with a zen-like calm.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">The Chaos Nancy</h3>
              <p className="text-gray-600">
                Pessimistic planner who expects the worst. Creates backup rosters for the backup rosters.
              </p>
            </div>
          </div>
          
          {/* CTA below personality cards */}
          <div className="mt-12 text-center">
            <button
              onClick={handleStartQuiz}
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Take the quiz
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Rostering still a headache for you? Let's chat Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a1929] to-[#1e3a5f]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Rostering still a headache for you? Let's chat
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a Spreadsheet Sorcerer or a Last-Minute Magician, RosterLab can help streamline your scheduling process and give you back your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-a-demo"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-primary-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-colors duration-200"
            >
              Book a demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur-sm px-8 py-3 text-base font-medium text-white border border-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz Overlay */}
      {isQuizActive && (
        <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain">
          {/* Logo in top left corner of the screen */}
          <div className="absolute top-4 left-4 md:fixed md:top-8 md:left-12 z-50">
            <Image
              src="/images/rosterlab-logo.png"
              alt="RosterLab"
              width={120}
              height={30}
              className="brightness-0 invert md:w-[160px] md:h-[40px]"
            />
          </div>

          {/* Back to quiz link in top right corner - hidden on mobile */}
          <div className="hidden md:block fixed top-8 right-12 z-50">
            <button
              onClick={handleCloseQuiz}
              className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
            >
              Back to quiz page
            </button>
          </div>

          <div className="min-h-screen flex items-center justify-center p-4 py-20 md:py-4">
            {/* Background with stars */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#0a1929] to-[#1e3a5f]">
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

            {/* Quiz Content */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 pt-16 md:p-8 max-w-2xl w-full shadow-2xl">

              {/* Close button */}
              <button
                onClick={handleCloseQuiz}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors"
                aria-label="Close quiz"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {isAnalyzing ? (
                /* Analyzing Screen */
                <div className="text-center py-16">
                  <div className="mb-8">
                    <div className="relative inline-flex">
                      <div className="w-24 h-24 rounded-full border-4 border-white/20"></div>
                      <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {analyzeText}
                  </h2>
                  <p className="text-white/70">
                    Discovering your rostering personality...
                  </p>
                </div>
              ) : (
                <>
                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-4 md:mb-6 mt-2 md:mt-6">
                    What's your rostering personality type?
                  </h2>

                  {/* Question */}
                  <div className="mb-4 md:mb-8">
                    <h3 className="text-sm md:text-lg font-semibold text-white/80 mb-2">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </h3>
                    <p className="text-base md:text-xl text-white/90">
                      {quizQuestions[currentQuestion].question}
                    </p>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-2 md:space-y-3">
                    {quizQuestions[currentQuestion].answers.map((answer, index) => (
                      <button
                        key={answer.id}
                        onClick={() => handleAnswer(answer.id)}
                        className="w-full text-left p-3 md:p-4 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200 border border-white/10 hover:border-white/20"
                      >
                        <span className="text-sm md:text-base text-white/90">
                          <span className="font-semibold">{String.fromCharCode(65 + index)})</span> {answer.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-6 md:mt-8 flex justify-center space-x-2">
                    {quizQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index <= currentQuestion ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}