"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

// Analytics `location` for every click originating in this section.
const LOCATION = "Landing Otto";

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
  // A full-bleed clip is the whole panel: its field, bubbles and motion are
  // composed edge to edge in the square, so nothing is painted around it.
  if (feature.layout === "full") {
    return (
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl ${className}`}
        style={{ backgroundColor: feature.color }}
      >
        {children}
      </div>
    );
  }
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

/** How a feature's clip sits in its panel: zoomed so only the chat window
    shows (the default), or filling the square as composed. */
function clipClass(feature: OttoFeature) {
  return feature.layout === "full"
    ? "absolute inset-0 h-full w-full object-cover"
    : "absolute max-w-none";
}
function clipStyle(feature: OttoFeature): CSSProperties | undefined {
  return feature.layout === "full" ? undefined : CLIP_STYLE;
}

interface OttoFeature {
  /** Heading for the list item on the right. */
  title: string;
  description: string;
  /** Clip shown in the media panel while this item is active. */
  video: string;
  /**
   * "window" (default): the clip is a 1608×1608 frame with the white Otto
   * window at CARD, and the panel zooms in so only the window shows.
   * "full": the clip is composed edge to edge in the square — its own field,
   * no window — and fills the panel as is.
   */
  layout?: "window" | "full";
  /** Backdrop field colour behind the chat window, and the same value at zero
      alpha for the dot-grid falloff. Doubles as the progress-bar colour, so
      each step's timer is keyed to the panel it belongs to. */
  color: string;
  colorClear: string;
  /** Dot-grid ink for this field — see `backdrop`. */
  dot: string;
}

/** The section's words and link — everything a locale changes. */
export interface OttoCopy {
  heading: string;
  description: string;
  cta: { label: string; href: string };
  /** One per clip, in clip order. */
  features: { title: string; description: string }[];
}

export const OTTO_COPY_AU: OttoCopy = {
  heading:
    "Make smarter roster decisions with Otto, your AI rostering assistant",
  description:
    "Otto understands your roster and the context behind it. Get answers, test changes, and build reports in seconds, all through conversation.",
  cta: {
    label: "See Otto in Action",
    href: "/feature/ai-staff-rostering-assistant",
  },
  features: [
    {
      title: "Answer roster questions instantly",
      description:
        "Check staffing coverage, skill mix, leave, fairness and more. Otto searches your live roster and audit trail to give you contextual answers, including who worked when and what's changed.",
    },
    {
      title: "Get recommendations for better roster decisions",
      description:
        "Filling a gap, assessing a swap or reworking a roster? Otto weighs availability, skills, workload, rest requirements and roster rules to recommend the best way forward.",
    },
    {
      title: "Analyse your roster from every angle",
      description:
        "Turn your roster data into insights you can act on. Otto breaks down any part of your roster to create charts, summaries and reports that back confident workforce decisions.",
    },
  ],
};

/** Each clip's look. The words come from `OttoCopy.features`, by index. */
const CLIPS: Omit<OttoFeature, "title" | "description">[] = [
  {
    video: "/landing/otto/chat-v3.mp4",
    layout: "full",
    // The clip's own field, so the panel and the frame are one colour while
    // the clip loads and at its rounded corners.
    color: "#2E6BD6",
    colorClear: "rgba(46,107,214,0)",
    dot: "rgba(255,255,255,0.45)",
  },
  {
    video: "/landing/otto/cover-v3.mp4",
    layout: "full",
    // The clip's own field, as the first panel.
    color: "#0B8666",
    colorClear: "rgba(11,134,102,0)",
    dot: "rgba(255,255,255,0.45)",
  },
  {
    video: "/landing/otto/fairness-v3.mp4",
    layout: "full",
    // The clip's own field, as the first panel.
    color: "#2E6BD6",
    colorClear: "rgba(46,107,214,0)",
    dot: "rgba(255,255,255,0.45)",
  },
];

export default function OttoSection({
  copy = OTTO_COPY_AU,
}: {
  copy?: OttoCopy;
} = {}) {
  const features: OttoFeature[] = CLIPS.map((clip, i) => ({
    ...clip,
    ...copy.features[i],
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  // The timer only runs while the list is on screen and nobody is reading it.
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  // Clips are only fetched once the section is close to the viewport, so
  // they never compete with the hero for bandwidth on the first load.
  const [isNear, setIsNear] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // The mobile accordion can be shut entirely; the desktop column always has a
  // panel on show, so this only gates the small-screen layout.
  const [mobileCollapsed, setMobileCollapsed] = useState(false);
  // Each step lasts exactly as long as its clip, so a panel is never cut off
  // mid-answer. Real lengths arrive with the video metadata.
  const [durations, setDurations] = useState<number[]>(() =>
    features.map(() => FALLBACK_DURATION_MS),
  );
  const sectionRef = useRef<HTMLElement>(null);
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

  // Latches on: once the clips have started loading there is no reason to drop
  // them again.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNear(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
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
  }, [isNear]);

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
  }, [activeIndex, mobileCollapsed, isNear]);

  const isPaused = isHovered || !isInView;
  const showTimer = !prefersReducedMotion;

  const advance = () =>
    setActiveIndex((current) => (current + 1) % features.length);

  const active = features[activeIndex];

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <Container className="lg:px-12 xl:px-20">
        {/* ---- Intro ---- */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {copy.heading}
          </h2>

          <p className="mt-5 text-base md:text-lg text-gray-600 leading-relaxed">
            {copy.description}
          </p>

          <div className="mt-8">
            <Button
              href={copy.cta.href}
              analyticsLabel={copy.cta.label}
              analyticsLocation={LOCATION}
              className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
            >
              {copy.cta.label}
            </Button>
          </div>
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
              {features.map((feature, index) => (
                <video
                  // Each clip keeps its own element so switching back to one
                  // does not restart the download, only the playhead.
                  key={feature.video}
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  // No source until the section is near; the effect above
                  // starts the active clip once it has one.
                  src={isNear ? feature.video : undefined}
                  loop
                  muted
                  playsInline
                  // Metadata only for the others: the step timing is read
                  // from `duration`, so it has to be known before the panel
                  // is reached, but the frames themselves can wait.
                  preload={index === 0 ? "auto" : "metadata"}
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`${clipClass(feature)} ${
                    index === activeIndex ? "block" : "hidden"
                  }`}
                  style={clipStyle(feature)}
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
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={feature.title} className="group relative">
                  {/* Highlight panel: a wash of the step's panel colour with a
                      solid bar down its left edge, so the open step reads at a
                      glance and is tied to the clip beside it. */}
                  {isActive ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${feature.color} 7%, white)`,
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-1"
                        style={{ backgroundColor: feature.color }}
                      />
                    </>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gray-50 opacity-0 transition-opacity group-hover:opacity-100"
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
                    <h3
                      className={`text-base md:text-lg font-semibold transition-colors ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-400 group-hover:text-gray-700"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed transition-colors ${
                        isActive ? "text-gray-700" : "text-gray-400"
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
          {features.map((feature, index) => {
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
                      {isNear && (
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
                          className={clipClass(feature)}
                          style={clipStyle(feature)}
                        />
                      )}
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
