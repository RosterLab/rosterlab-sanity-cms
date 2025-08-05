import { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: "What's Your Rostering Personality? - RosterLab",
  description: 'Discover your staff scheduling personality type. Are you a Spreadsheet Sorcerer, Rules Robot, or Last-Minute Magician? Take our fun 2-minute quiz!',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "What's Your Rostering Personality? - RosterLab",
    description: 'Discover your staff scheduling personality type. Are you a Spreadsheet Sorcerer, Rules Robot, or Last-Minute Magician? Take our fun 2-minute quiz!',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz'
      }
    ],
    type: 'website',
    url: 'https://rosterlab.com/tools/staff-scheduling-personality-quiz'
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Your Rostering Personality? - RosterLab",
    description: 'Discover your staff scheduling personality type. Take our fun 2-minute quiz!',
    images: ['/images/quiz/og/og.png']
  }
}

export default function StaffSchedulingPersonalityQuizPage() {
  return <QuizClient />
}