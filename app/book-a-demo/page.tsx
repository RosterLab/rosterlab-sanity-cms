import { Metadata } from 'next'
import BookADemoClient from './client'

export const metadata: Metadata = {
  title: 'RosterLab - Book a Demo',
  description: 'Book a live RosterLab demo to see AI rostering cut scheduling time by 90%, boost shift coverage, and keep teams compliant, healthier and happier.',
}

export default function BookADemoPage() {
  return <BookADemoClient />
}