import { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: "What's your rostering personality?",
  description: 'Take our fun personality quiz to discover your rostering style. Are you a Spreadsheet Sorcerer who loves formulas, a Rules Robot obsessed with compliance, or a Last-Minute Magician who thrives under pressure?',
  robots: {
    index: true,
    follow: true
  }
}

export default function StaffSchedulingPersonalityQuizPage() {
  return <QuizClient />
}