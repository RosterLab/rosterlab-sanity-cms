"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fades and lifts its content in the first time it scrolls into view.
 *
 * `delay` staggers siblings, so a section can enter piece by piece. Under
 * reduced motion there is no movement and the content simply fades.
 */
const tags = {
  div: motion.div,
  h2: motion.h2,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
} as const;

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  as?: keyof typeof tags;
  /** Seconds after the section enters the viewport. */
  delay?: number;
  /** Distance travelled upward, in px. */
  y?: number;
  className?: string;
}) {
  const Tag = tags[as];
  const reduce = useReducedMotion();
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
