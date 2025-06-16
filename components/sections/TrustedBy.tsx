import Image from 'next/image'
import Container from '@/components/ui/Container'

const trustedLogos = [
  { src: '/images/logos/whanganui.png', alt: 'Whanganui', width: 120, height: 60 },
  { src: '/images/logos/western.png', alt: 'Western Health', width: 140, height: 60 },
  { src: '/images/logos/dargaville.png', alt: 'Dargaville', width: 100, height: 60 },
  { src: 'https://rosterlab.com/hs-fs/hubfs/logos/Clients%20Logo/RPA.png?width=320&height=84&name=RPA.png', alt: 'RPA', width: 120, height: 60 },
  { src: '/images/logos/peticare.png', alt: 'Peticare', width: 140, height: 60 },
]

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-neutral-700 mb-8">
            Trusted by leading healthcare organizations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustedLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}