import { Metadata } from 'next'
import StaffRosteringInteractiveDemoClient from './client'

export const metadata: Metadata = {
  title: 'Staff Rostering Interactive Demo - RosterLab',
  description: 'Try RosterLab\'s interactive rostering demo to watch AI build fair, compliant schedules for complex teams in real time - test your own scenarios instantly.',
}

export default function StaffRosteringInteractiveDemo() {
  return <StaffRosteringInteractiveDemoClient />
}