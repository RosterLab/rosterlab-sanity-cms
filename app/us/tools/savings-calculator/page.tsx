import ROICalculatorClient from './client'
import SiteLayout from '@/components/layout/SiteLayout'

export const metadata = {
  title: 'Savings Calculator - Optimize your time and money with RosterLab',
  description: 'Calculate your savings with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Savings Calculator - Optimize your time and money with RosterLab',
    description: 'Calculate your savings with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
    type: 'website',
    url: 'https://rosterlab.com/us/tools/savings-calculator',
    images: [
      {
        url: '/images/og images/ROICalc.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator - Optimize your time and money with RosterLab',
    description: 'Calculate your savings with RosterLab. See how much time and money you can save with AI-powered staff scheduling.',
    images: ['/images/og images/ROICalc.png'],
  },
}

export default function ROICalculatorPage() {
  return (
    <SiteLayout>
      <ROICalculatorClient />
    </SiteLayout>
  )
}