"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * A stat like "90%" or "320+" that counts up from zero the first time it
 * scrolls into view.
 *
 * The server renders the final value, so crawlers and no-JS readers get the
 * real number; on mount it drops to zero (the stat sits below the fold, so
 * that reset is never seen) and counts up once visible. Under reduced motion
 * it stays on the final value.
 */
export default function CountUp({
  value,
  duration = 1.4,
  delay = 0,
  play,
}: {
  value: string;
  duration?: number;
  /** Seconds after it scrolls into view (or `play` turns on) before counting. */
  delay?: number;
  /**
   * Starts the count when true, for a parent running its own sequence.
   * Left out, the count starts when this number scrolls into view.
   */
  play?: boolean;
}) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const inView = play ?? seen;
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (match && !reduce) setShown(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, on mount
  }, []);

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- target is static
  }, [inView, reduce]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
