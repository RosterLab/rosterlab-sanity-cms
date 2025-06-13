import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center text-center py-20 px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(45, 59, 234, 0.1) 0%, rgba(3, 213, 171, 0.1) 100%)",
        minHeight: "80vh",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Complex rostering solutions made{" "}
          <span
            style={{
              background: "linear-gradient(to right, #2D3BEA, #03D5AB)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            easy
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          We help teams with complex scheduling needs generate and optimise
          staff rosters within minutes, not days.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            href="/demo"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book a Demo
          </Button>

          <Button
            href="/example"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            See An Example
          </Button>
        </div>

        {/* Hero Image/Illustration */}
        <div className="relative">
          <Image
            src="/images/illustration/smaller-team.webp"
            alt="RosterLab complex rostering solutions"
            width={800}
            height={500}
            className="mx-auto"
            priority
          />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: "linear-gradient(45deg, #2D3BEA, #03D5AB)" }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-20"
          style={{ background: "linear-gradient(45deg, #03D5AB, #2D3BEA)" }}
        />
      </div>
    </section>
  );
}
