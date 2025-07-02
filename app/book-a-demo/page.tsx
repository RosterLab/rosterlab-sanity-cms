import { Metadata } from 'next'
import BookADemoClient from './client'

export const metadata: Metadata = {
  title: 'Book a Demo - Talk to Us About Your Scheduling Challenges',
  description: 'Book a live demo with RosterLab to see how AI-powered rostering slashes admin time, balances shifts, and fixes your toughest scheduling challenges.',
}

export default function BookADemoPage() {
  return <BookADemoClient />
}