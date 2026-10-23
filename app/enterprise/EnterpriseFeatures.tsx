"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { PiArrowRightBold, PiCaretDownBold } from "react-icons/pi";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  /** Leading words of the title drawn in brand blue while it is open. */
  highlight: string;
  description: string;
  // Stand-in product images until dedicated enterprise screenshots exist.
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Size override, e.g. for the wide Otto wordmark. */
    className?: string;
    /** A finished 4:3 artwork that fills the frame edge to edge. */
    fill?: boolean;
  };
}

/** How long each feature stays open before the list moves on. */
const DWELL_SECONDS = 7;

/**
 * One card: an accordion of features on the left, the open feature's image on
 * a coloured panel on the right.
 *
 * The open item advances on its own: a bar fills along its bottom rule and,
 * when the bar's animation ends, the next item opens — so the timer and what
 * the reader sees can never drift apart. Hovering the list pauses the bar, and
 * a click opens that item and restarts it. Under reduced motion the bar does
 * not animate, so nothing advances on its own.
 *
 * Below `lg` there is no room beside the list, so the open item carries its
 * own image under its description.
 */
export default function EnterpriseFeatures({
  features,
  cta,
}: {
  features: Feature[];
  /**
   * Call to action under the list, in the left column. Passed as data rather
   * than JSX: elements built in the server page and rendered in here trip
   * React's list-key check in development.
   */
  cta?: {
    label: string;
    href: string;
    analyticsLocation: string;
    analyticsProperties?: Record<string, unknown>;
  };
}) {
  const id = useId();
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  // Screenshots sit inset from the panel's top-left and run off its right
  // edge; finished artwork (`fill`) covers the panel; small marks (those with
  // a size override, like the Otto wordmark) are centred.
  const panel = (f: Feature, className?: string) => (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#9CE4FF]",
        className,
      )}
    >
      {f.image.fill ? (
        <Image
          src={f.image.src}
          alt={f.image.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover"
        />
      ) : f.image.className ? (
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <Image
            src={f.image.src}
            alt={f.image.alt}
            width={f.image.width}
            height={f.image.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={`h-auto w-auto ${f.image.className}`}
          />
        </div>
      ) : (
        <Image
          src={f.image.src}
          alt={f.image.alt}
          width={f.image.width}
          height={f.image.height}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="absolute left-[10%] top-[13%] h-auto w-[90%] rounded-l-xl shadow-xl"
        />
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
      {/* The list, with the call to action under it. */}
      <div>
        {/* A rule over the first item too, so its bar has a line to run
            along. */}
        <ul
          className="border-t border-gray-200"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {features.map((f, i) => {
            const isOpen = i === open;
            const panelId = `${id}-panel-${i}`;
            return (
              <li key={f.title} className="relative border-b border-gray-200">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <h3 className="text-lg md:text-xl font-semibold leading-snug text-[#1F2A5C]">
                    {isOpen ? (
                      <>
                        <span className="text-[#3B7FE8]">{f.highlight}</span>
                        {f.title.slice(f.highlight.length)}
                      </>
                    ) : (
                      f.title
                    )}
                  </h3>
                  <PiCaretDownBold
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0 text-gray-500 transition-transform",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div id={panelId} role="region" hidden={!isOpen}>
                  <p className="-mt-1 pb-6 max-w-lg text-base text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                  {panel(f, "mb-6 lg:hidden")}
                </div>
                {/* The progress bar, laid along the open item's top rule. */}
                {isOpen && (
                  <div
                    key={open}
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-0.5 w-full origin-left bg-[#1F2A5C] motion-safe:animate-[ent-feature-progress_linear_forwards] motion-reduce:hidden"
                    style={{
                      animationDuration: `${DWELL_SECONDS}s`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() =>
                      setOpen((current) => (current + 1) % features.length)
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
        {cta && (
          <div className="mt-8">
            <Button
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F2A5C] px-8 py-3 text-base font-semibold text-white hover:bg-[#2A3F8F]"
              analyticsLabel={cta.label}
              analyticsLocation={cta.analyticsLocation}
              analyticsProperties={cta.analyticsProperties}
            >
              {cta.label}
              <PiArrowRightBold aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Every panel stays mounted and cross-fades, so switching never waits
          on a fetch. */}
      <div className="relative hidden lg:block">
        {features.map((f, i) => (
          <div
            key={f.title}
            aria-hidden={i !== open}
            className={cn(
              "transition-opacity duration-500",
              i === 0 ? "relative" : "absolute inset-0",
              i === open ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {panel(f)}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ent-feature-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
