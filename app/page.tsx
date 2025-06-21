import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Benefits from '@/components/sections/Benefits'
import Onboarding from '@/components/sections/Onboarding'
import IndustrySolutions from '@/components/sections/IndustrySolutions'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'

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
