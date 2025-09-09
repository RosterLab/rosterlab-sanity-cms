import USHero from './components/Hero'
import USTrustedBy from './components/TrustedBy'
import USBenefits from './components/Benefits'
import USOnboarding from './components/Onboarding'
import USIndustrySolutions from './components/IndustrySolutions'
import USTestimonials from './components/Testimonials'
import USFinalCTA from './components/FinalCTA'

export const metadata = {
  title: 'RosterLab - AI Staff Scheduling Software for Complex Teams', 
  description: 'AI staff scheduling software that automatically builds fair, compliant schedules for healthcare and other complex teams - cut admin by 90% and boost coverage.',
  alternates: {
    canonical: 'https://rosterlab.com/us/',
  },
  openGraph: {
    title: 'RosterLab - AI Staff Scheduling Software for Complex Teams',
    description: 'AI staff scheduling software that automatically builds fair, compliant schedules for healthcare and other complex teams - cut admin by 90% and boost coverage.',
    type: 'website',
    url: 'https://rosterlab.com',
    images: [
      {
        url: '/images/og images/Home.png',
        width: 1200,
        height: 630,
        alt: 'RosterLab - AI Staff Scheduling Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RosterLab - AI Staff Scheduling Software for Complex Teams',
    description: 'AI staff scheduling software that automatically builds fair, compliant schedules for healthcare and other complex teams - cut admin by 90% and boost coverage.',
    images: ['/images/og images/Home.png'],
  },
}

export default function Home() {
  return (
    <>
      <USHero />
      
      <USTrustedBy />
      <USBenefits />
      <USOnboarding />
      <USIndustrySolutions />
      <USTestimonials />
      <USFinalCTA />
    </>
  )
}
