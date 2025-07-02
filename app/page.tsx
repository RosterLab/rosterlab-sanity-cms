import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Benefits from '@/components/sections/Benefits'
import Onboarding from '@/components/sections/Onboarding'
import IndustrySolutions from '@/components/sections/IndustrySolutions'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata = {
  title: 'RosterLab - AI Staff Scheduling Software for Complex Teams',
  description: 'AI staff scheduling software that automatically builds fair, compliant rosters for healthcare and other complex teams - cut admin by 90% and boost coverage.',
}

export default function Home() {
  return (
    <>
      <Hero />
      
      <TrustedBy />
      <Benefits />
      <Onboarding />
      <IndustrySolutions />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
