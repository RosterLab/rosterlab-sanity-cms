import ROICalculatorClient from './client'
import SiteLayout from '@/components/layout/SiteLayout'

export const metadata = {
  title: 'ROI Calculator - Optimise your time and money with RosterLab',
  description: 'Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
  openGraph: {
    title: 'ROI Calculator - Optimise your time and money with RosterLab',
    description: 'Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
    images: [
      {
        url: '/images/og%20images/ROI%20Calc.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator - Optimise your time and money with RosterLab',
    description: 'Calculate your ROI with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
    images: ['/images/og%20images/ROI%20Calc.png'],
  },
}

export default function ROICalculatorPage() {
  return (
    <SiteLayout>
      <ROICalculatorClient />
    </SiteLayout>
  )
}