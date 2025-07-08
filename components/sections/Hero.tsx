import Button from "@/components/ui/Button";
import RosterGenerator from "@/components/ui/RosterGenerator";
import { HiCheck } from 'react-icons/hi';

export default function Hero() {
  return (
    <section
      className="relative flex items-center py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20"
      style={{
        minHeight: "70vh",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and CTAs */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Complex rostering made{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                easy
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We help teams with complex scheduling needs generate and optimise
              staff rosters within minutes, not days.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                href="/book-a-demo"
                className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book a Demo
              </Button>

              <Button
                href="/staff-rostering-interactive-demo"
                className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                See an Example
              </Button>
            </div>

            {/* Feature ticks */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Made for healthcare and complex industries</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Free staff mobile app</span>
              </div>
            </div>
          </div>

          {/* Right side - Roster Generation Module */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[600px]">
              <RosterGenerator />
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="relative block w-full h-3 lg:h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,40 Q360,25 720,40 T1440,40 L1440,80 L0,80 Z"
            opacity="0.5"
          />
          <path
            fill="#ffffff"
            d="M0,50 C240,35 480,55 720,45 C960,35 1200,55 1440,50 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
