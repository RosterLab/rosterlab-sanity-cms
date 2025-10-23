"use client";

import { useState, useEffect, useRef } from "react";

export default function UnbreakableText() {
  const [isShaking, setIsShaking] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start shaking immediately when scrolled into view
            setIsShaking(true);

            // Stop shaking after 2 seconds
            setTimeout(() => {
              setIsShaking(false);
            }, 2000);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <span ref={textRef} className="relative inline-block">
      <span
        className="relative inline-block"
        style={{
          animation: isShaking ? "shake 0.5s ease-in-out infinite" : "none",
        }}
      >
        unbreakable
      </span>
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-2px) rotate(-1deg);
          }
          75% {
            transform: translateX(2px) rotate(1deg);
          }
        }
      `}</style>
    </span>
  );
}
