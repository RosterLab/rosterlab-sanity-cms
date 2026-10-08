"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Container from "@/components/ui/Container";
import { trackSmartButtonClick } from "@/components/analytics/tracking";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Capabilities";

export interface Capability {
  /** Short uppercase tag above the title: BUILD, ADAPT, ENGAGE. */
  tag: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  /** Product illustration shown in the card's top panel. */
  image: { src: string; alt: string };
}

export const CAPABILITIES_AU: Capability[] = [
  {
    tag: "Build",
    title: "Build the rosters spreadsheets can't",
    description:
      "RosterLab generates fully optimised rosters using an automated rules-based engine to balance staffing demand, skill mix, fatigue limits, union agreements, and other constraints.",
    cta: {
      label: "Explore automated rostering",
      href: "/feature/automated-rostering",
    },
    image: {
      src: "/landing/capabilities/build.webp",
      alt: "A laptop showing RosterLab generating a roster solution",
    },
  },
  {
    tag: "Adapt",
    title: "Adapt the roster as plans change",
    description:
      "Handle absences and last-minute changes without rebuilding the roster from scratch. Automate shift swaps and fill gaps instantly while keeping coverage and compliance intact.",
    cta: { label: "Explore re-rostering", href: "/feature/re-rostering" },
    image: {
      src: "/landing/capabilities/adapt.webp",
      alt: "Laptops, tablets and phones all showing the same live roster and Otto assistant",
    },
  },
  {
    tag: "Engage",
    title: "Let staff shape their rosters",
    description:
      "Give staff greater flexibility around when they work with self-service tools to submit preferences, request leave, and see their latest shifts in one app.",
    cta: { label: "Explore self-scheduling", href: "/feature/self-scheduling" },
    image: {
      src: "/landing/capabilities/engage-phones.webp",
      alt: "Four phones showing the RosterLab staff app: schedule, requests, shift swap and preferences",
    },
  },
];

/**
 * Three product capabilities as a row of cards: an illustration panel on top,
 * copy beneath, one link each. Sits directly under the benefits tabs, which
 * sell outcomes; this is where the product itself first appears on the page.
 *
 * Each card opens with a device photo of the product, cropped to 3:2 at
 * export so the three panels match without any fitting in CSS.
 */
function CapabilityCard({ capability }: { capability: Capability }) {
  const { tag, title, description, cta, image } = capability;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Full-bleed device photo on a fixed 3:2 panel. The exports are
          cropped to this shape already, so `cover` only trims rounding. */}
      <div className="relative aspect-[3/2] w-full border-b border-gray-200 bg-slate-100">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {tag}
        </p>
        <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
        <Link
          href={cta.href}
          onClick={() => trackSmartButtonClick(cta.label, cta.href, LOCATION)}
          className="group mt-5 inline-flex items-center gap-2 self-start text-sm md:text-base font-semibold text-blue-600 hover:text-blue-700"
        >
          {cta.label}
          <LuArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

export default function CapabilitiesSection({
  capabilities = CAPABILITIES_AU,
  heading = "Keep rosters running smoothly with RosterLab",
}: {
  capabilities?: Capability[];
  heading?: string;
} = {}) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <h2 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          {heading}
        </h2>
        <div className="mt-10 md:mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.tag} capability={capability} />
          ))}
        </div>
      </Container>
    </section>
  );
}
