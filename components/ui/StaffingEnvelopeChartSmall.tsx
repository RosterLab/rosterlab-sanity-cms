"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StaffingEnvelopeChartSmallProps {
  /**
   * When true, the chart cycles between "before" and "after" automatically.
   * Cycling pauses while the pointer is hovering the chart.
   */
  autoplay?: boolean;
  /** Time in ms each state is held during autoplay (default 3000). */
  autoplayIntervalMs?: number;
}

export default function StaffingEnvelopeChartSmall({
  autoplay = false,
  autoplayIntervalMs = 3000,
}: StaffingEnvelopeChartSmallProps = {}) {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Chart dimensions - responsive for all devices
  const getResponsiveDimensions = () => {
    if (typeof window === "undefined") return { width: 336, height: 252 }; // Default to mobile size for SSR
    const screenWidth = window.innerWidth;

    if (screenWidth < 640) {
      // Mobile
      return { width: Math.min(screenWidth - 48, 336), height: 252 };
    } else if (screenWidth < 768) {
      // Tablet
      return { width: 480, height: 280 };
    } else {
      // Desktop
      return { width: 588, height: 294 };
    }
  };

  const [dimensions, setDimensions] = useState(() => {
    // Start with mobile dimensions for SSR, will update on client
    return { width: 336, height: 252 };
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };
    // Immediately set correct dimensions on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // One-shot autoplay: play Before → After once, then stop and show a
  // replay button. `playToken` bumps to trigger a fresh cycle on replay.
  const [playToken, setPlayToken] = useState(0);
  const [finished, setFinished] = useState(false);
  // Wait until the chart is actually on-screen before running autoplay.
  // Otherwise it fires while the section is still below the fold.
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!autoplay) return;
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Trigger once ~50% of the chart is visible — i.e. it's near the
      // middle of the viewport rather than just poking in.
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplay]);

  useEffect(() => {
    if (!autoplay || !inView) return;
    setIsOptimized(false);
    setFinished(false);
    const id = window.setTimeout(() => {
      setIsOptimized(true);
      setFinished(true);
    }, autoplayIntervalMs);
    return () => window.clearTimeout(id);
  }, [autoplay, autoplayIntervalMs, inView, playToken]);

  const replay = () => setPlayToken((n) => n + 1);

  const width = dimensions.width;
  const height = dimensions.height;
  const padding = {
    // Top padding leaves room for the "Staff" title on mobile (which
    // replaces the rotated y-axis label that clipped).
    top: isMobile ? 40 : 25,
    right: isMobile ? 15 : 25,
    // Bottom padding leaves room for tick labels + the "Days" title.
    bottom: 55,
    // More left padding on mobile so the y-axis tick labels (30, 35, 40)
    // don't sit flush against the SVG's left edge.
    left: isMobile ? 44 : 45,
  };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Days data - fewer on mobile
  const days = isMobile ? [0, 15, 30, 45, 60] : [0, 10, 20, 30, 40, 50, 60];

  // Staffing data
  const baseMinStaff = 25;
  const baseMaxStaff = 30;
  const idealStaff = 27.5;

  // Generate slightly varied min/max lines
  const minStaffData = days.map((day) => ({
    day,
    value: baseMinStaff + Math.sin(day / 20) * 1 + Math.cos(day / 15) * 0.5,
  }));

  const maxStaffData = days.map((day) => ({
    day,
    value: baseMaxStaff + Math.sin(day / 25) * 1 + Math.cos(day / 18) * 0.5,
  }));

  // Generate actual staffing data (before and after optimisation)
  // Using fixed values to avoid hydration mismatches
  const beforeData = days.map((day) => {
    // Use predictable values based on day index to avoid floating point differences
    const variance = [2, -3, 8, -1, 5, -2, 3][days.indexOf(day) % 7];
    return {
      day,
      value: Math.min(40, idealStaff + Math.sin(day / 10) * 12 + variance),
    };
  });

  const afterData = days.map((day) => {
    // Use predictable values based on day index
    const variance = [0.5, -0.3, 0.2, -0.4, 0.3, -0.2, 0.1][
      days.indexOf(day) % 7
    ];
    return {
      day,
      value: idealStaff + Math.sin(day / 30) * 1.5 + variance,
    };
  });

  const currentData = isOptimized ? afterData : beforeData;

  // Scale functions
  const xScale = (day: number) => (day / 60) * chartWidth;
  const yScale = (value: number) =>
    chartHeight - ((value - 10) / 35) * chartHeight;

  // Create path for actual staffing line
  const linePath = currentData
    .map((point, index) => {
      const x = xScale(point.day);
      const y = yScale(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Create paths for min/max lines
  const minLinePath = minStaffData
    .map((point, index) => {
      const x = xScale(point.day);
      const y = yScale(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  const maxLinePath = maxStaffData
    .map((point, index) => {
      const x = xScale(point.day);
      const y = yScale(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col justify-center"
    >
      <div className="flex flex-col items-center w-full">
        {autoplay && (
          <div className="mb-4 flex items-center gap-2">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isOptimized
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isOptimized ? "After RosterLab" : "Before RosterLab"}
            </span>
            {finished && (
              <button
                type="button"
                onClick={replay}
                aria-label="Replay animation"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="w-full max-w-[336px] sm:max-w-[480px] md:max-w-[588px] mx-auto">
          <svg
            width={width}
            height={height}
            className="block w-full h-auto max-w-full"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <style>
              {`
              .animated-line {
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .animated-point {
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}
            </style>
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              {/* Grid lines */}
              {[15, 20, 25, 30, 35, 40].map((value) => (
                <g key={value}>
                  <line
                    x1={0}
                    y1={yScale(value)}
                    x2={chartWidth}
                    y2={yScale(value)}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <text
                    x={-8}
                    y={yScale(value) + 4}
                    textAnchor="end"
                    className={`${isMobile ? "text-[11px]" : "text-xs"} fill-gray-600`}
                  >
                    {value}
                  </text>
                </g>
              ))}

              {/* Envelope areas */}
              {/* Below minimum - light blue */}
              <path
                d={`${minLinePath} L ${xScale(60)} ${yScale(10)} L ${xScale(0)} ${yScale(10)} Z`}
                fill="#DBEAFE"
                opacity="0.5"
              />

              {/* Above maximum - light pink */}
              <path
                d={`${maxLinePath} L ${xScale(60)} ${yScale(40)} L ${xScale(0)} ${yScale(40)} Z`}
                fill="#FCE7F3"
                opacity="0.5"
              />

              {/* Ideal range - white (between min and max) */}
              <path
                d={`${minLinePath} ${maxStaffData
                  .slice()
                  .reverse()
                  .map((point, index) => {
                    const x = xScale(point.day);
                    const y = yScale(point.value);
                    return index === 0 ? `L ${x} ${y}` : `L ${x} ${y}`;
                  })
                  .join(" ")} Z`}
                fill="#FFFFFF"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {/* Min and Max lines */}
              <path
                d={minLinePath}
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
              />
              <path
                d={maxLinePath}
                fill="none"
                stroke="#F9A8D4"
                strokeWidth="2"
              />

              {/* Actual staffing line */}
              <path
                className="animated-line"
                d={linePath}
                fill="none"
                stroke="#000000"
                strokeWidth="2.5"
              />

              {/* Data points */}
              {currentData.map((point) => (
                <circle
                  className="animated-point"
                  key={point.day}
                  cx={xScale(point.day)}
                  cy={yScale(point.value)}
                  r="4"
                  fill="#000000"
                />
              ))}

              {/* Area labels */}
              <text
                x={chartWidth * 0.12}
                y={yScale(38)}
                textAnchor="middle"
                className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium fill-pink-700`}
              >
                OVERSTAFFED
              </text>

              <text
                x={chartWidth * 0.12}
                y={yScale(27.5)}
                textAnchor="middle"
                className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium fill-gray-700`}
              >
                IDEAL RANGE
              </text>

              <text
                x={chartWidth * 0.12}
                y={yScale(18)}
                textAnchor="middle"
                className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium fill-blue-700`}
              >
                UNDERSTAFFED
              </text>

              {/* X-axis tick labels */}
              {days.map((day) => (
                <text
                  key={day}
                  x={xScale(day)}
                  y={chartHeight + 15}
                  textAnchor="middle"
                  className={`${isMobile ? "text-[11px]" : "text-xs"} fill-gray-600`}
                >
                  {day}
                </text>
              ))}

              {/* Axis titles. On mobile the y-axis title sits horizontal
                  above the chart to avoid clipping when rotated. */}
              <text
                x={chartWidth / 2}
                y={chartHeight + (isMobile ? 40 : 40)}
                textAnchor="middle"
                className={`${isMobile ? "text-[11px]" : "text-xs"} font-medium fill-gray-700`}
              >
                Days
              </text>
              {isMobile ? (
                <text
                  x={-8}
                  y={-14}
                  textAnchor="end"
                  className="text-[11px] font-medium fill-gray-700"
                >
                  Staff
                </text>
              ) : (
                <text
                  x={-chartHeight / 2}
                  y={-30}
                  textAnchor="middle"
                  transform="rotate(-90)"
                  className="text-xs font-medium fill-gray-700"
                >
                  Staffing Numbers
                </text>
              )}
            </g>
          </svg>
        </div>

        {/* Manual toggle button — only shown when not in autoplay mode. */}
        {!autoplay && (
          <div className="mt-4 text-center">
            <motion.button
              onClick={() => setIsOptimized(!isOptimized)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg shadow-md"
              style={{
                backgroundColor: "#24D9DC",
                color: "#323232",
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, -5, 5, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: "easeInOut",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5AE4E7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#24D9DC";
              }}
            >
              {isOptimized ? "← Before RosterLab" : "After RosterLab →"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
