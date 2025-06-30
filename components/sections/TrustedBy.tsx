import Image from 'next/image'
import Container from '@/components/ui/Container'

interface TrustedLogo {
  src: string
  alt: string
  width: number
  height: number
  needsBackground?: boolean
}

const trustedLogos: TrustedLogo[] = [
  { src: '/images/logos/whanganui.png', alt: 'Whanganui', width: 120, height: 60 },
  { src: '/images/logos/western.png', alt: 'Western Health', width: 140, height: 60 },
  { src: 'https://rosterlab.com/hs-fs/hubfs/logos/Clients%20Logo/RPA.png?width=320&height=84&name=RPA.png', alt: 'RPA', width: 160, height: 80 },
  { src: 'https://rosterlab.com/hs-fs/hubfs/logos/Clients%20Logo/HawkesBay.png?width=240&height=74&name=HawkesBay.png', alt: 'Hawkes Bay', width: 160, height: 50 },
  { src: 'https://rosterlab.com/hs-fs/hubfs/logos/Clients%20Logo/NSW%20South%20Eastern.png?width=304&height=80&name=NSW%20South%20Eastern.png', alt: 'NSW South Eastern', width: 152, height: 40 },
]

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-8">
            Trusted by leading healthcare organizations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
            {trustedLogos.map((logo, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center ${
                  logo.needsBackground ? 'bg-gray-100 rounded-lg p-4' : ''
                }`}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="max-w-full h-auto grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}