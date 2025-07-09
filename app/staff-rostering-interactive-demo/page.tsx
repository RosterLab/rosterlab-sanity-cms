import { Metadata } from 'next'
import StaffRosteringInteractiveDemoClient from './client'

export const metadata: Metadata = {
  title: 'Staff Rostering Interactive Demo - RosterLab',
  description: 'Try RosterLab\'s interactive rostering demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.',
  openGraph: {
    title: 'Staff Rostering Interactive Demo - RosterLab',
    description: 'Try RosterLab\'s interactive rostering demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.',
    images: [
      {
        url: '/images/og images/Interactive Demo.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Rostering Interactive Demo - RosterLab',
    description: 'Try RosterLab\'s interactive rostering demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.',
    images: ['/images/og images/Interactive Demo.png'],
  },
}

export default function StaffRosteringInteractiveDemo() {
  return <StaffRosteringInteractiveDemoClient />
}