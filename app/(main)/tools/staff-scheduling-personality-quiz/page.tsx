import { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: "What's your rostering personality?",
  description: 'Take our fun personality quiz to discover your rostering style. Are you a Spreadsheet Sorcerer who loves formulas, a Rules Robot obsessed with compliance, or a Last-Minute Magician who thrives under pressure?',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "What's your rostering personality?",
    description: 'Take our fun personality quiz to discover your rostering style. Are you a Spreadsheet Sorcerer who loves formulas, a Rules Robot obsessed with compliance, or a Last-Minute Magician who thrives under pressure?',
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
    title: "What's your rostering personality?",
    description: 'Take our fun personality quiz to discover your rostering style.',
    images: ['/images/quiz/og/og.png']
  }
}

export default function StaffSchedulingPersonalityQuizPage() {
  return <QuizClient />
}