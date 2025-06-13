import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function RosterLabUSP() {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Image
          src="/images/numbers.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <Image
          src="/images/swirl.webp"
          alt=""
          fill
          className="object-contain opacity-30"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl ml-auto text-right">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="block">We Are The </span>
            <span className="text-blue-600">Only Solution</span>
            <span className="block">That Actually </span>
            <span className="text-blue-600">Generates</span>
            <span className="block">You A Complex Roster From Scratch Within Minutes</span>
          </h2>
          
          <div className="text-lg leading-relaxed space-y-4 mb-8">
            <p>
              rostering optimisation has always been a very complex mathematical Optimisation problem to solve.
            </p>
            <p>
              There can be <span className="bg-cyan-300 font-bold">over 10^1000 roster possibilities</span> to a standard flexible rostering problem that <span className="bg-cyan-300 font-bold">scales exponentially</span> based on the number of possible shifts, tasks, days, and employees that must be considered.
            </p>
            <p>
              The RosterLab AI uses <span className="bg-cyan-300 font-bold">award-winning</span> operations research techniques, created a scalable solution that's <span className="bg-cyan-300 font-bold">easy to implement</span> for any complex rosters.
            </p>
            <p>
              <span className="bg-cyan-300 font-bold">We've tackled</span> one of the most complex rostering problem - <span className="bg-cyan-300 font-bold">healthcare</span> 24/7 - the needs to consider different modalities, tasks, skills mix, and more.
            </p>
            <p className="text-blue-600 font-bold">
              Optimise your workforce today with RosterLab!
            </p>
          </div>
          
          <Button
            href="/"
            variant="outline"
            className="bg-white text-blue-600 border-blue-600 rounded-full px-8 py-3 font-medium hover:bg-blue-50"
          >
            Read More About How RosterLab Is Different
          </Button>
        </div>
      </div>
    </section>
  )
}