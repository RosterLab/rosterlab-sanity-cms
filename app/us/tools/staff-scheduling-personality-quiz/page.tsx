// Generated from app/(main)/tools/staff-scheduling-personality-quiz/page.tsx. Run npm run localize:resources; do not edit directly.

import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from 'next'
import QuizClient from "@/app/us/tools/staff-scheduling-personality-quiz/QuizClient"

export const metadata: Metadata = resourceMetadata({
  title: "What's Your Staff Scheduling Personality Type?",
  description: 'Discover your staff scheduling personality. Are you a Spreadsheet Sorcerer, Rules Robot, or Last-Minute Magician? Take our fun 2-minute quiz!',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "What's Your Staff Scheduling Personality Type? - RosterLab",
    description: 'Discover your staff scheduling personality. Are you a Spreadsheet Sorcerer, Rules Robot, or Last-Minute Magician? Take our fun 2-minute quiz!',
    images: [
      {
        url: '/images/quiz/og/og.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab Personality Quiz'
      }
    ],
    type: 'website',
    url: "https://rosterlab.com/us/tools/staff-scheduling-personality-quiz"
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Your Staff Scheduling Personality Type? - RosterLab",
    description: 'Discover your staff scheduling personality type. Take our fun 2-minute quiz!',
    images: ['/images/quiz/og/og.png']
  }
}, "/us/tools/staff-scheduling-personality-quiz")

export default function StaffSchedulingPersonalityQuizPage() {
  return <QuizClient />
}