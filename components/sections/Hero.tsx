import Button from "@/components/ui/Button";
import RosterGenerator from "@/components/ui/RosterGenerator";

export default function Hero() {
  return (
    <section
      className="relative flex items-center py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50"
      style={{
        minHeight: "90vh",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text and CTAs */}
          <div className="text-left">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
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
            <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          {/* Right side - Roster Generation Module */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[600px]">
              <RosterGenerator />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements - Commented out for future use */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-30"
          style={{ 
            background: "linear-gradient(135deg, rgba(45, 59, 234, 0.6) 0%, rgba(3, 213, 171, 0.6) 100%)",
            animation: "float-slow 6s ease-in-out infinite",
            animationDelay: "2s"
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-20"
          style={{ 
            background: "linear-gradient(45deg, #03D5AB, #2D3BEA)",
            animation: "float-medium 5s ease-in-out infinite",
            animationDelay: "2.5s"
          }}
        />
      </div> */}
    </section>
  );
}
