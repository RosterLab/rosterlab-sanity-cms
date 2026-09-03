import Container from "@/components/ui/Container";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "150+", label: "teams optimising their rosters" },
  { value: "90%", label: "less admin time" },
  { value: "24/7", label: "operations supported" },
];

export default function ImpactStats() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <blockquote className="text-center">
            <p className="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed">
              &ldquo;RosterLab turned a two-day rostering process into a
              two-hour one. The whole team gets a fairer roster, and I get my
              week back.&rdquo;
            </p>
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
