"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
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
 * Feature list on the left, the open feature's image on the right.
 *
 * The open item advances on its own: a bar fills along its top rule and, when
 * the bar's animation ends, the next item opens — so the timer and what the
 * reader sees can never drift apart. Hovering the list pauses the bar, and a
 * click opens that item and restarts it. Under reduced motion the bar does not
 * animate, so nothing advances on its own.
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
    heading: string;
    label: string;
    href: string;
    analyticsLocation: string;
    analyticsProperties?: Record<string, unknown>;
  };
}) {
  const id = useId();
  const [open, setOpen] = useState(0);
  const [paused, setPaused] = useState(false);

  const frame = (f: Feature, className?: string) => (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-t-[2rem] rounded-b-2xl bg-blue-50",
        !f.image.fill && "p-6 md:p-10",
        className,
      )}
    >
      <Image
        src={f.image.src}
        alt={f.image.alt}
        width={f.image.width}
        height={f.image.height}
        sizes="(min-width: 1024px) 700px, 100vw"
        className={
          f.image.fill
            ? "h-full w-full object-cover"
            : `h-auto max-h-full w-auto rounded-lg ${f.image.className ?? "shadow-lg"}`
        }
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
      {/* The list, with the call to action under it. */}
      <div className="self-start">
        <ul
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {features.map((f, i) => {
            const isOpen = i === open;
            const panelId = `${id}-panel-${i}`;
            return (
              <li key={f.title}>
                {/* The rule, with the progress bar laid along it. */}
                <div className="relative h-px bg-gray-200">
                  {isOpen && (
                    <div
                      key={open}
                      aria-hidden="true"
                      className="absolute left-0 -top-px h-0.5 w-full origin-left bg-gray-900 motion-safe:animate-[ent-feature-progress_linear_forwards] motion-reduce:hidden"
                      style={{
                        animationDuration: `${DWELL_SECONDS}s`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      onAnimationEnd={() =>
                        setOpen((current) => (current + 1) % features.length)
                      }
                    />
                  )}
                </div>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(i)}
                  className="w-full py-5 text-left"
                >
                  <h3
                    className={cn(
                      "text-lg md:text-xl font-semibold leading-snug transition-colors",
                      isOpen
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600",
                    )}
                  >
                    {isOpen ? (
                      <>
                        <span className="text-blue-600">{f.highlight}</span>
                        {f.title.slice(f.highlight.length)}
                      </>
                    ) : (
                      f.title
                    )}
                  </h3>
                </button>
                <div id={panelId} role="region" hidden={!isOpen}>
                  <p className="-mt-1 pb-6 max-w-lg text-base text-gray-600 leading-relaxed">
                    {f.description}
                  </p>
                  {frame(f, "mb-8 lg:hidden")}
                </div>
              </li>
            );
          })}
        </ul>
        {cta && (
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-900">{cta.heading}</p>
            <Button
              href={cta.href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700"
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

      {/* Every image stays mounted and cross-fades, so switching never waits
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
            {frame(f)}
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
