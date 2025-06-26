import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'

export const metadata = {
  title: 'Schedge - Puzzle Scheduling Game to Test your Skills',
  description: 'Play Schedge, the puzzle scheduling game that challenges you to create a 7×6 roster fast. Test your shift planning speed and strategy!',
}

export default function SchedgePage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  The ultimate scheduling puzzle game.
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Test your shift planning speed and strategy to see how fast you can solve a 7×6 roster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/solutions/ai-schedules" 
                    className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 text-lg font-semibold"
                  >
                    Learn about AI scheduling
                  </Button>
                  <Button 
                    href="/book-a-demo" 
                    className="bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 px-8 py-4 text-lg font-semibold"
                  >
                    Book a demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/illustration/Choose-pana.svg"
                  alt="Choose your scheduling solution"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Placeholder Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">
                Can you solve the roster?
              </h2>
              <div className="bg-gray-100 rounded-lg shadow-lg p-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Isaacs Schedge Code Here
                </h3>
                <p className="text-gray-600 text-lg">
                  This section is reserved for Schedge integration.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}