import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import Container from "@/components/ui/Container";

interface Feature {
  title: string;
  description: string;
  href: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "Automated Rostering",
    description:
      "Generate a full roster in minutes from your rules, staff, and demands.",
    href: "/feature/automated-rostering",
    image: "01-automated-rostering.svg",
  },
  {
    title: "AI Rostering Assistant",
    description:
      "Chat with an AI to build, adjust, and troubleshoot your roster.",
    href: "/feature/ai-staff-rostering-assistant",
    image: "02-ai-rostering-assistant.svg",
  },
  {
    title: "Open Shifts",
    description:
      "Publish unfilled shifts so staff can claim them on their phone.",
    href: "/feature/open-shifts",
    image: "03-open-shifts.svg",
  },
  {
    title: "Shift Swaps",
    description:
      "Peer-to-peer swaps with rules enforced. No manager back-and-forth.",
    href: "/feature/shift-swaps",
    image: "04-shift-swaps.svg",
  },
  {
    title: "Leave Requests",
    description:
      "Approve, decline, and factor leave into upcoming rosters in one flow.",
    href: "/feature/leave-requests",
    image: "05-leave-requests.svg",
  },
  {
    title: "Staff Preferences",
    description:
      "Let staff submit availability and shift preferences the AI honors.",
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
      "EBAs, awards, fatigue laws, skill mix. Configured once, enforced always.",
    href: "/feature/rules-engine",
    image: "08-rules-engine.svg",
  },
];

// Read each SVG at build/server time and inline the markup. Inlining lets the
// parent card's `:hover` state flip a CSS variable inside the SVG, which
// controls the animation-play-state of every animated element.
const svgMarkup = Object.fromEntries(
  features.map((f) => [
    f.image,
    readFileSync(
      join(process.cwd(), "public", "landing", f.image),
      "utf8",
    ),
  ]),
);

export default function FeaturesGrid() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Everything you need to run a roster.
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            A connected toolkit for planning, publishing, and adjusting your
            rosters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {features.map(({ title, description, href, image }) => (
            <Link
              key={title}
              href={href}
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
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
