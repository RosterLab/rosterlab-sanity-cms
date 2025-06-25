import ROICalculatorClient from './client'
import SiteLayout from '@/components/layout/SiteLayout'

export const metadata = {
  title: 'ROI Calculator - Optimise your time and money with RosterLab',
  description: 'Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
}

export default function ROICalculatorPage() {
  return (
    <SiteLayout>
      <ROICalculatorClient />
    </SiteLayout>
  )
}