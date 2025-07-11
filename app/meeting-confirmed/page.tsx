import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Meeting Confirmed - RosterLab',
  description: 'Your demo meeting with RosterLab has been confirmed. Check your inbox for the calendar invite.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Meeting Confirmed - RosterLab',
    description: 'Your demo meeting with RosterLab has been confirmed. Check your inbox for the calendar invite.',
    images: [
      {
        url: '/images/og images/InteractiveDemo.png',
        width: 1200,
        height: 630,
        alt: 'Meeting Confirmed - RosterLab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meeting Confirmed - RosterLab',
    description: 'Your demo meeting with RosterLab has been confirmed. Check your inbox for the calendar invite.',
    images: ['/images/og images/InteractiveDemo.png'],
  },
}

export default function MeetingConfirmedPage() {
  return (
    <SiteLayout>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              You're all booked in! 🎉
            </h1>
            
            {/* Copy */}
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              There should be a calendar invite waiting in your inbox with your requested date and time. We can't wait to speak with you and learn more about your staff scheduling challenges.
            </p>
            
            {/* Placeholder Image */}
            <div className="relative w-full h-64 md:h-96 mb-12 bg-gray-100 rounded-2xl overflow-hidden">
              <Image
                src="/images/illustration/Team-pana.svg"
                alt="Meeting confirmed illustration"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
              >
                Back to RosterLab.com
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-md font-medium transition-colors"
              >
                Learn more about us
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}