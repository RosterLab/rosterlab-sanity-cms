import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function USFinalCTA() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
      }}
    >
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Having a headache making schedules for shift workers?
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                href="/us/book-a-demo"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-all"
              >
                Schedule a Demo
              </Button>
              <Button
                href="/us/contact"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-all"
              >
                Contact Us
              </Button>
            </div>

            {/* Feature Points */}
            <div className="flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-2 lg:whitespace-nowrap justify-center">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-white/90">
                  Award-Winning AI algorithm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-white/90">
                  Handles complexities
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-white/90">
                  User-friendly & simple to use
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
