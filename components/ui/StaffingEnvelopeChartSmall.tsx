"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StaffingEnvelopeChartSmall() {
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

  const width = dimensions.width;
  const height = dimensions.height;
  const padding = {
    top: 25,
    right: isMobile ? 15 : 25,
    bottom: 45,
    left: isMobile ? 30 : 45,
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
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full px-4 sm:px-0">
        <div
          className="w-full max-w-[336px] sm:max-w-[480px] md:max-w-[588px] mx-auto"
          style={{ minHeight: `${height}px` }}
        >
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
                    className="text-xs fill-gray-600"
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

              {/* X-axis labels */}
              {days.map((day) => (
                <text
                  key={day}
                  x={xScale(day)}
                  y={chartHeight + 15}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {day}
                </text>
              ))}

              {/* Axis labels */}
              <text
                x={chartWidth / 2}
                y={chartHeight + 40}
                textAnchor="middle"
                className="text-xs font-medium fill-gray-700"
              >
                Days
              </text>
              <text
                x={-chartHeight / 2}
                y={-30}
                textAnchor="middle"
                transform="rotate(-90)"
                className="text-xs font-medium fill-gray-700"
              >
                Staffing Numbers
              </text>
            </g>
          </svg>
        </div>

        {/* Optimization Button */}
        <div className="mt-0 sm:mt-4 md:mt-6 text-center">
          <motion.button
            onClick={() => setIsOptimized(!isOptimized)}
            className={`${isMobile ? "px-4 py-3 text-xs min-h-[44px]" : "px-6 py-2.5 text-sm"} rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg shadow-md`}
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
      </div>
    </div>
  );
}
