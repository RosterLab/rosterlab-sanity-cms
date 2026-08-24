import { readFileSync } from "node:fs";
import { join } from "node:path";
import Container from "@/components/ui/Container";
import TrackedLink from "@/components/ui/TrackedLink";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Features";

export interface Feature {
  title: string;
  description: string;
  href: string;
  image: string;
}

export const FEATURES_AU: Feature[] = [
  {
    title: "Automated Rostering",
    description:
      "Generate optimal, safe, fair, and flexible complex rosters at the click of a button.",
    href: "/feature/automated-rostering",
    image: "01-automated-rostering.svg",
  },
  {
    title: "AI Rostering Assistant",
    description:
      "Ask AI to build or update rosters, investigate issues, and run the reports you need.",
    href: "/feature/ai-staff-rostering-assistant",
    image: "02-ai-rostering-assistant.svg",
  },
  {
    title: "Open Shifts",
    description:
      "Fill unfulfilled shifts instantly with the right people and the right skills.",
    href: "/feature/open-shifts",
    image: "03-open-shifts.svg",
  },
  {
    title: "Shift Swaps",
    description:
      "Automatically approve routine swaps while flagging critical changes.",
    href: "/feature/shift-swaps",
    image: "04-shift-swaps.svg",
  },
  {
    title: "Leave Requests",
    description:
      "Approve leave with confidence by seeing how every request affects shift coverage.",
    href: "/feature/leave-requests",
    image: "05-leave-requests.svg",
  },
  {
    title: "Staff Preferences",
    description:
      "AI self-rostering for better work-life balance, without compromising coverage or rules.",
    href: "/feature/self-scheduling",
    image: "06-staff-preferences.svg",
  },
  {
    title: "Re-Rostering",
    description:
      "Handle last-minute changes without rebuilding the roster from scratch.",
    href: "/feature/re-rostering",
    image: "07-re-rostering.svg",
  },
  {
    title: "Rules Engine",
    description:
      "Union requirements, clinical safety, fatigue laws, skill mix. Configured once, enforced always.",
    href: "/feature/rules-engine",
    image: "08-rules-engine.svg",
  },
];

// Read each SVG at build/server time and inline the markup. Inlining lets the
// parent card's `:hover` state flip a CSS variable inside the SVG, which
// controls the animation-play-state of every animated element.
// Keyed by filename, so any locale's feature list can reuse the same icons —
// only the copy varies between AU and US, never the artwork.
const svgMarkup = Object.fromEntries(
  FEATURES_AU.map((f) => [
    f.image,
    readFileSync(join(process.cwd(), "public", "landing", f.image), "utf8"),
  ]),
);

export const FEATURES_HEADING_AU = {
  title: "Everything you need to run a perfect roster.",
  subtitle:
    "A connected toolkit for planning, publishing, and adjusting your rosters.",
};

export default function FeaturesGrid({
  features = FEATURES_AU,
  heading = FEATURES_HEADING_AU,
}: {
  features?: Feature[];
  heading?: { title: string; subtitle: string };
} = {}) {
  return (
    <section className="py-20 md:py-24">
      <Container className="lg:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {heading.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            {heading.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map(({ title, description, href, image }) => (
            <TrackedLink
              key={title}
              href={href}
              label={title}
              location={LOCATION}
              className="group bg-gray-50 rounded-2xl p-6 md:p-7 flex flex-col border border-gray-100 hover:border-blue-300 hover:bg-white hover:shadow-md transition [--rl-play:paused] hover:[--rl-play:running] focus-visible:[--rl-play:running]"
            >
              <div
                className="mb-5 h-28 md:h-32 flex items-center justify-center [&_svg]:w-auto [&_svg]:max-h-full"
                dangerouslySetInnerHTML={{ __html: svgMarkup[image] }}
              />
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </TrackedLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
