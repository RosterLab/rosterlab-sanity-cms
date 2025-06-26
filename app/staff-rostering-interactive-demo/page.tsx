import { Metadata } from 'next'
import StaffRosteringInteractiveDemoClient from './client'

export const metadata: Metadata = {
  title: 'RosterLab - Staff Rostering Interactive Demo',
  description: 'Try RosterLab\'s interactive demo to see AI-powered staff rostering build fair, compliant schedules in minutes—boost productivity and cut costs.',
}

export default function StaffRosteringInteractiveDemo() {
  return <StaffRosteringInteractiveDemoClient />
}