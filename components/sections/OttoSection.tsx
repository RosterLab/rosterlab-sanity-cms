"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Otto";

/** Section accent: the brand blue the heroes use, and the first panel's field. */
const ACCENT = "#3779DD";

/** Fallback hold, used only until a clip reports its real length. */
const FALLBACK_DURATION_MS = 12000;

/*
  The source clips are 1608x1608 with the chat window sitting on a flat colour
  field. We only want the window, so the crop below is applied in CSS rather
  than re-encoding: the video is blown up inside a clipped box and shifted so
  the card lands flush against it. All three clips share the same geometry.
*/
const VIDEO_SIZE = 1608;
const CARD = { x: 328, y: 118, width: 954, height: 1374 };

/** Card-box dimensions as percentages of the cropped frame. */
const CROP = {
  scale: (VIDEO_SIZE / CARD.width) * 100,
  left: (-CARD.x / CARD.width) * 100,
  top: (-CARD.y / CARD.height) * 100,
  aspect: `${CARD.width} / ${CARD.height}`,
};

/** Dot-grid-on-colour backdrop, matching the hero's texture treatment.

    The fields are the brand accents desaturated and brought to a mid tone. At
    full strength they fill a large panel with neon and are tiring to sit in
    front of; muted, they still read as blue/cyan/teal and are restful enough
    to hold a chat window for half a minute. Landing on mid tones also means
    white dots read on all three, rather than the bright fields needing a dark
    grid of their own. */
function backdrop(feature: OttoFeature): CSSProperties {
  const { color, colorClear: clear, dot } = feature;
  return {
    backgroundColor: color,
    backgroundImage: [
      // Field colour painted back over the dots, clear at the focal point and
      // opaque by the edges, so the grid dissolves rather than stopping dead.
      `radial-gradient(ellipse 62% 58% at 50% 42%, ${clear} 0%, ${clear} 22%, ${color} 92%)`,
      `radial-gradient(circle, ${dot} 1.5px, transparent 1.5px)`,
    ].join(", "),
    backgroundSize: "100% 100%, 22px 22px",
  };
}

/** Placement of the oversized clip inside its clipped card. */
const CLIP_STYLE: CSSProperties = {
  width: `${CROP.scale}%`,
  left: `${CROP.left}%`,
  top: `${CROP.top}%`,
};

/** The coloured, dot-textured panel with the white chat window on it. Shared
    by the pinned desktop column and the mobile accordion so the two can never
    drift apart. */
function ChatPanel({
  feature,
  className = "",
  children,
}: {
  feature: OttoFeature;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl p-5 sm:p-6 ${className}`}
      style={backdrop(feature)}
    >
      {/* The chat window: a clipped viewport onto the oversized clip. */}
      <div
        className="relative w-full max-w-[320px] overflow-hidden rounded-xl bg-white shadow-xl shadow-black/10 sm:max-w-[360px] lg:h-full lg:w-auto lg:max-w-none"
        style={{ aspectRatio: CROP.aspect }}
      >
        {children}
      </div>
    </div>
  );
}

interface OttoFeature {
  /** Heading for the list item on the right. */
  title: string;
  description: string;
  /** Clip shown in the media panel while this item is active. */
  video: string;
  /** Backdrop field colour behind the chat window, and the same value at zero
      alpha for the dot-grid falloff. Doubles as the progress-bar colour, so
      each step's timer is keyed to the panel it belongs to. */
  color: string;
  colorClear: string;
  /** Dot-grid ink for this field — see `backdrop`. */
  dot: string;
}

const FEATURES: OttoFeature[] = [
  {
    title: "Answer your roster questions instantly",
    description:
      "Check staffing coverage, skill mix, leave, fairness, and more. Otto searches your live roster and audit trail to give you contextual answers, including who worked when and what's changed.",
    video: "/landing/otto/chat.mp4",
    color: ACCENT,
    colorClear: "rgba(55,121,221,0)",
    dot: "rgba(255,255,255,0.40)",
  },
  {
    title: "Get recommendations for better roster decisions",
    description:
      "Need to fill a gap, assess a shift swap or improve your roster? Otto weighs availability, skills, workload, rest requirements and roster rules to recommend the best way forward.",
    video: "/landing/otto/cover.mp4",
    color: "#4FA8AD",
    colorClear: "rgba(79,168,173,0)",
    dot: "rgba(255,255,255,0.45)",
  },
  {
    title: "Analyse your roster from every angle",
    description:
      "Turn your roster data into insights you can act on. Otto can analyse any part of your roster to create charts, summaries and reports that support confident workforce decisions.",
    video: "/landing/otto/fairness.mp4",
    color: "#3FAE8E",
    colorClear: "rgba(63,174,142,0)",
    dot: "rgba(255,255,255,0.45)",
  },
];

export default function OttoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // The timer only runs while the list is on screen and nobody is reading it.
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // The mobile accordion can be shut entirely; the desktop column always has a
  // panel on show, so this only gates the small-screen layout.
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  // Each step lasts exactly as long as its clip, so a panel is never cut off
  // mid-answer. Real lengths arrive with the video metadata.
  const [durations, setDurations] = useState<number[]>(() =>
    FEATURES.map(() => FALLBACK_DURATION_MS),
  );
  const listRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-advancing is motion the visitor didn't ask for, so honour the setting
  // and fall back to a static bar the visitor steps through themselves.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Don't burn through the steps while the section is scrolled out of view.
  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // `loadedmetadata` can fire before React has attached a prop handler, which
  // leaves the step stuck on the fallback length. Read whatever has already
  // loaded, and listen natively for the rest.
  useEffect(() => {
    const record = (index: number, seconds: number) => {
      if (!Number.isFinite(seconds) || seconds <= 0) return;
      setDurations((current) => {
        if (current[index] === seconds * 1000) return current;
        const next = [...current];
        next[index] = seconds * 1000;
        return next;
      });
    };

    const cleanups = videoRefs.current.map((video, index) => {
      if (!video) return undefined;
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        record(index, video.duration);
        return undefined;
      }
      const onLoaded = () => record(index, video.duration);
      video.addEventListener("loadedmetadata", onLoaded);
      return () => video.removeEventListener("loadedmetadata", onLoaded);
    });

    return () => cleanups.forEach((off) => off?.());
  }, []);

  // A step begins with its clip at frame 0 — otherwise switching back to a
  // panel picks the conversation up halfway through. The others hold still so
  // they are not running down in the background.
  //
  // Both layouts are in the DOM at once and only one is on screen, so every
  // clip is checked against `offsetParent` — null for anything inside the
  // hidden layout. That keeps a clip from running behind the breakpoint it
  // does not belong to, without this component tracking the breakpoint itself.
  // Resizing across lg swaps which layout is visible, so it re-runs then too,
  // rewinding only when the step itself changed.
  useEffect(() => {
    const sync = (rewind: boolean) => {
      const start = (video: HTMLVideoElement) => {
        if (rewind) video.currentTime = 0;
        void video.play().catch(() => {});
      };

      videoRefs.current.forEach((video, index) => {
        if (!video) return;
        if (index === activeIndex && video.offsetParent !== null) start(video);
        else video.pause();
      });

      const mobile = mobileVideoRef.current;
      if (mobile) {
        if (mobile.offsetParent !== null) start(mobile);
        else mobile.pause();
      }
    };

    sync(true);
    const onResize = () => sync(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, mobileCollapsed]);

  const isPaused = isHovered || !isInView;
  const showTimer = !prefersReducedMotion;

  const advance = () =>
    setActiveIndex((current) => (current + 1) % FEATURES.length);

  const active = FEATURES[activeIndex];

  return (
    <section className="py-20 md:py-24">
      <Container className="lg:px-12 xl:px-20">
        {/* ---- Intro: visual on the left, copy on the right ----
            Both blocks stay in reading order in the markup and are placed by
            `order` at lg, so the heading is still the first thing announced. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 items-center">
          <div className="max-w-2xl lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Make smarter roster decisions with Otto, your AI rostering
              assistant
            </h2>

            <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
              Otto understands your roster and the context behind it, so you can
              get answers, test changes and build reports in seconds.
            </p>

            <div className="mt-8">
              <Button
                href="/feature/ai-staff-rostering-assistant"
                analyticsLabel="See Otto in Action"
                analyticsLocation={LOCATION}
                className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
              >
                See Otto in Action
              </Button>
            </div>
          </div>

          {/* Otto beside a live roster solution — sets the scene for the list below. */}
          <Image
            src="/images/otto-mascot-laptop.webp"
            alt="Otto, the RosterLab octopus mascot, beside a laptop generating a nurse roster in RosterLab"
            width={1362}
            height={930}
            // Matches the radius on the media panel below.
            className="lg:order-1 w-full h-auto rounded-2xl"
          />
        </div>

        {/* ---- Desktop: feature list on the left, pinned media panel right ----
            Below lg this whole block is replaced by the accordion underneath,
            which shows each clip inside the item that describes it. */}
        <div className="mt-14 md:mt-20 hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Media panel — sticks while the list scrolls past it. */}
          <div className="lg:order-2 lg:sticky lg:top-24">
            <ChatPanel
              feature={active}
              className="lg:aspect-square lg:px-8 lg:py-10"
            >
              {FEATURES.map((feature, index) => (
                <video
                  // Each clip keeps its own element so switching back to one
                  // does not restart the download, only the playhead.
                  key={feature.video}
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  src={feature.video}
                  autoPlay={index === 0}
                  loop
                  muted
                  playsInline
                  // Metadata only, for every clip: the step timing is read
                  // from `duration`, so it has to be known before the panel
                  // is reached, but the frames themselves can wait.
                  preload={index === 0 ? "auto" : "metadata"}
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`absolute max-w-none ${
                    index === activeIndex ? "block" : "hidden"
                  }`}
                  style={CLIP_STYLE}
                />
              ))}
            </ChatPanel>
          </div>

          {/* Feature list — the active item sits on a panel that bleeds right. */}
          <ul
            ref={listRef}
            className="flex flex-col lg:order-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
          >
            {FEATURES.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={feature.title} className="relative">
                  {/* Highlight panel, extended past the container to the viewport edge. */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gray-50"
                    />
                  )}

                  {/* Progress track: the fill runs to the end, then advances.
                      It lives only in this layout, so the accordion below does
                      not auto-advance and collapse an item mid-read. */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -top-px h-0.5 overflow-hidden bg-gray-200"
                    >
                      <span
                        // Remounting restarts the animation — on each step, and
                        // again if the clip's real length arrives mid-run.
                        key={`${activeIndex}-${durations[index]}`}
                        onAnimationEnd={advance}
                        style={{
                          ["--otto-progress-duration" as string]: `${durations[index]}ms`,
                          backgroundColor: feature.color,
                        }}
                        className={`block h-full w-full origin-left ${
                          showTimer ? "animate-otto-progress" : "scale-x-100"
                        } ${isPaused ? "[animation-play-state:paused]" : ""}`}
                      />
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={isActive}
                    className="relative w-full px-5 py-7 text-left sm:px-6 lg:py-10"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed transition-colors ${
                        isActive ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---- Mobile: an accordion, one clip inside the item it belongs to ----
            A pinned column has nowhere to pin on a phone, and the square panel
            squeezed the chat window down to an unreadable width. Here the
            heading and its description stay readable whether the item is open
            or shut, and opening one drops the clip in beneath its own copy. */}
        <ul className="mt-12 border-t border-gray-200 lg:hidden">
          {FEATURES.map((feature, index) => {
            const isOpen = index === activeIndex && !mobileCollapsed;
            return (
              <li
                key={feature.title}
                className={`border-b border-gray-200 transition-colors ${
                  isOpen ? "bg-gray-50" : ""
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => {
                    if (isOpen) {
                      setMobileCollapsed(true);
                      return;
                    }
                    setActiveIndex(index);
                    setMobileCollapsed(false);
                  }}
                  className="w-full px-5 py-6 text-left"
                >
                  <span className="flex items-start gap-4">
                    <span className="min-w-0 flex-1 text-base font-semibold text-gray-900">
                      {feature.title}
                    </span>
                    {/* Reads as the control's state, and the button already
                        carries that state for anyone not looking at it. */}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-light leading-5 text-gray-400"
                    >
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </span>

                  {/* Description stays put either way — only the clip is
                      behind the toggle. */}
                  <span
                    className={`mt-2 block text-sm leading-relaxed transition-colors ${
                      isOpen ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {feature.description}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6">
                    <ChatPanel feature={feature}>
                      <video
                        // Mounted with the open item, so it always starts at
                        // frame 0 and nothing runs while the item is shut.
                        key={feature.video}
                        ref={mobileVideoRef}
                        src={feature.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        aria-hidden="true"
                        tabIndex={-1}
                        className="absolute max-w-none"
                        style={CLIP_STYLE}
                      />
                    </ChatPanel>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
