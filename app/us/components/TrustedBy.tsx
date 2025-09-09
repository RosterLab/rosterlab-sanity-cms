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
  { src: '/images/logos/rpa.png', alt: 'RPA', width: 160, height: 80 },
  { src: '/images/logos/hawkesbay.png', alt: 'Hawkes Bay', width: 160, height: 50 },
  { src: '/images/logos/nsw-south-eastern.png', alt: 'NSW South Eastern', width: 152, height: 40 },
]

export default function USTrustedBy() {
  return (
    <section className="pt-1.5 lg:pt-8 pb-12 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-semibold text-neutral-700 mb-8" style={{ fontSize: '23px' }}>
            Trusted by leading healthcare providers
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
                  className="w-auto h-auto max-w-full opacity-60 hover:opacity-100 transition-opacity"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}