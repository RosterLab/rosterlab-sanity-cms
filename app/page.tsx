import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Benefits from '@/components/sections/Benefits'
import Onboarding from '@/components/sections/Onboarding'
import IndustrySolutions from '@/components/sections/IndustrySolutions'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata = {
  title: 'RosterLab - AI Staff Scheduling Software for Complex Teams',
  description: 'Automate complex staff rosters in minutes with RosterLab\'s AI scheduling software. Boost fairness, cut admin time, and keep teams fully staffed.',
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
