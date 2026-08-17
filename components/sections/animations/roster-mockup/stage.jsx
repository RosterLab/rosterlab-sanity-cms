"use client";

/**
 * Timeline runtime for the landing-page product mockups.
 *
 * Ported from the standalone `public/landing/*.html` bundles, which shipped
 * React + ReactDOM + @babel/standalone to the browser and transpiled the JSX
 * at runtime. This is the same timeline, minus the transpiler: it renders in
 * the app bundle like any other component.
 *
 * Differences from the original runtime, all deliberate:
 *   - No PlaybackBar / keyboard scrubbing. The mockups are decorative; the
 *     old bundles rendered the bar and the host page hid it again with
 *     injected CSS, which is what caused the visible flash on load.
 *   - No localStorage playhead persistence.
 *   - Playback pauses while off screen and honours prefers-reduced-motion,
 *     so an idle tab isn't re-rendering a large tree at 60fps.
 */

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// The scale measurement has to land before the browser paints, or the canvas
// flashes at its unscaled size. On the server there is nothing to measure.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Easings take t ∈ [0,1] and return eased t (may overshoot for back/elastic).
export const Easing = {
  linear: (t) => t,

  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => --t * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - --t * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),

  easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },

  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  easeOutBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
};

/**
 * interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
 * Maps t across the input keyframes to the output values, with optional
 * easing per segment (a single fn, or one fn per segment).
 */
export function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        return output[i] + (output[i + 1] - output[i]) * easeFn(local);
      }
    }
    return output[output.length - 1];
  };
}

const TimelineContext = createContext({
  time: 0,
  duration: 10,
  playing: false,
});

export const useTime = () => useContext(TimelineContext).time;
const useTimeline = () => useContext(TimelineContext);

const SpriteContext = createContext({ localTime: 0, progress: 0, duration: 0 });

/**
 * Renders children only while the playhead sits inside [start, end], and
 * exposes `localTime` / `progress` to them.
 */
export function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false,
}) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress =
    duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;

  const value = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </SpriteContext.Provider>
  );
}

/**
 * Fixed-size canvas that scales to fit its container and drives the playhead.
 *
 * `staticTime` renders a single frame without starting the loop — used for
 * prefers-reduced-motion and for the server render, so the first paint is the
 * real artwork rather than an empty box.
 */
export function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = "transparent",
  loop = true,
  posterTime = 0,
  children,
}) {
  const hostRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  const [time, setTime] = useState(posterTime);
  const [scale, setScale] = useState(null);
  const [active, setActive] = useState(false);

  // Scale the fixed-size canvas to fit the host box.
  useIsomorphicLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      if (!el.clientWidth || !el.clientHeight) return;
      setScale(Math.max(0.05, Math.min(el.clientWidth / width, el.clientHeight / height)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  // Only animate while visible, and never under prefers-reduced-motion.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "128px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        const next = t + dt;
        if (next < duration) return next;
        return loop ? next % duration : duration;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [active, duration, loop]);

  const ctxValue = useMemo(
    () => ({ time, duration, playing: active }),
    [time, duration, active],
  );

  return (
    <div
      ref={hostRef}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width,
          height,
          background,
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
          // Until the host box is measured, scale from the declared size so
          // the server render and first client frame agree.
          transform: `scale(${scale ?? 1})`,
          transformOrigin: "center",
          visibility: scale == null ? "hidden" : "visible",
        }}
      >
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>
      </div>
    </div>
  );
}
