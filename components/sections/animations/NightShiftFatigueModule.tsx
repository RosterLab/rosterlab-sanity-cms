"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function NightShiftFatigueModule() {
  const [showAfter, setShowAfter] = useState(false);

  const weeks = [
    "W1",
    "W2",
    "W3",
    "W4",
    "W5",
    "W6",
    "W7",
    "W8",
    "W9",
    "W10",
    "W11",
    "W12",
  ];

  // Before state - unfair night shift distribution with fatigue issues
  const beforeDistribution = [
    { month: 0, worker1: 8, worker2: 3, worker3: 2 }, // Jan
    { month: 1, worker1: 9, worker2: 2, worker3: 1 }, // Feb
    { month: 2, worker1: 7, worker2: 4, worker3: 2 }, // Mar
    { month: 3, worker1: 10, worker2: 2, worker3: 1 }, // Apr
    { month: 4, worker1: 8, worker2: 3, worker3: 2 }, // May
    { month: 5, worker1: 9, worker2: 3, worker3: 1 }, // Jun
    { month: 6, worker1: 8, worker2: 4, worker3: 1 }, // Jul
    { month: 7, worker1: 10, worker2: 2, worker3: 1 }, // Aug
    { month: 8, worker1: 7, worker2: 4, worker3: 2 }, // Sep
    { month: 9, worker1: 9, worker2: 3, worker3: 1 }, // Oct
    { month: 10, worker1: 8, worker2: 3, worker3: 2 }, // Nov
    { month: 11, worker1: 9, worker2: 3, worker3: 1 }, // Dec
  ];

  // After state - fair night shift distribution with fatigue management
  const afterDistribution = [
    { month: 0, worker1: 5, worker2: 4, worker3: 4 }, // Jan
    { month: 1, worker1: 4, worker2: 5, worker3: 4 }, // Feb
    { month: 2, worker1: 4, worker2: 4, worker3: 5 }, // Mar
    { month: 3, worker1: 5, worker2: 4, worker3: 4 }, // Apr
    { month: 4, worker1: 4, worker2: 5, worker3: 4 }, // May
    { month: 5, worker1: 4, worker2: 4, worker3: 5 }, // Jun
    { month: 6, worker1: 5, worker2: 4, worker3: 4 }, // Jul
    { month: 7, worker1: 4, worker2: 5, worker3: 4 }, // Aug
    { month: 8, worker1: 4, worker2: 4, worker3: 5 }, // Sep
    { month: 9, worker1: 5, worker2: 4, worker3: 4 }, // Oct
    { month: 10, worker1: 4, worker2: 5, worker3: 4 }, // Nov
    { month: 11, worker1: 4, worker2: 4, worker3: 5 }, // Dec
  ];

  const currentDistribution = showAfter
    ? afterDistribution
    : beforeDistribution;

  // Calculate totals
  const totals = currentDistribution.reduce(
    (acc, month) => ({
      worker1: acc.worker1 + month.worker1,
      worker2: acc.worker2 + month.worker2,
      worker3: acc.worker3 + month.worker3,
    }),
    { worker1: 0, worker2: 0, worker3: 0 },
  );

  const getBarColor = (
    value: number,
    staffMember: "worker1" | "worker2" | "worker3",
  ) => {
    if (showAfter) return "bg-green-500";

    // Before: show fatigue risk with different colors
    const total = totals[staffMember];
    if (total >= 90) return "bg-red-500"; // High fatigue risk
    if (total <= 30) return "bg-orange-400"; // Underutilized
    return "bg-yellow-500"; // Moderate
  };

  return (
    <div className="relative w-full px-4 sm:px-0">
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="relative min-h-[400px] h-[400px] sm:h-[420px] md:h-[480px] flex flex-col">
          {/* Widget Interface */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div
              className="px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 flex items-center"
              style={{ backgroundColor: "#219BC6" }}
            >
              <div className="w-16 sm:w-20 flex items-center justify-start pl-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative">
                  <Image
                    src="/images/icon/RosterLab_Icon_White.svg"
                    alt="RosterLab"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                  Night Shift Distribution
                </h3>
              </div>
              <div className="w-16 sm:w-20 flex items-center justify-end pr-2">
                <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap">
                  {showAfter ? "AI" : "Manual"}
                </span>
              </div>
            </div>

            {/* Chart View */}
            <div className="flex-1 p-3 sm:p-4 md:p-6 pb-2 sm:pb-2.5 md:pb-3 flex flex-col">
              <div className="flex-1">
                {/* Monthly Grid */}
                <div className="grid grid-cols-12 gap-0.5 sm:gap-1 md:gap-1.5">
                  <AnimatePresence mode="wait">
                    {currentDistribution.map((month, index) => (
                      <motion.div
                        key={`${showAfter ? "after" : "before"}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 font-medium mb-1 sm:mb-1.5 md:mb-2">
                          {weeks[index]}
                        </span>
                        <div className="w-full space-y-0.5 sm:space-y-1">
                          {/* Worker 1 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.worker1, "worker1")}`}
                              style={{
                                opacity: 0.3 + (month.worker1 / 10) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.worker1}
                            </span>
                          </div>
                          {/* Worker 2 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.worker2, "worker2")}`}
                              style={{
                                opacity: 0.3 + (month.worker2 / 10) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.worker2}
                            </span>
                          </div>
                          {/* Worker 3 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.worker3, "worker3")}`}
                              style={{
                                opacity: 0.3 + (month.worker3 / 10) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.worker3}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Legend */}
                <div className="mt-3 sm:mt-4 md:mt-5 flex justify-center gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "worker1")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Worker A
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "worker2")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Worker B
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "worker3")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Worker C
                    </span>
                  </div>
                </div>
              </div>

              {/* Fairness Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-2 sm:mt-3 md:mt-4 p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-md sm:rounded-md md:rounded-lg"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                    Fatigue Risk Score:
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs md:text-sm font-bold ${showAfter ? "text-green-600" : "text-red-600"}`}
                  >
                    {showAfter ? "Low" : "High"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1.5 sm:mb-2">
                  <span>Night shifts per quarter:</span>
                  <div className="flex gap-1.5 sm:gap-2">
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.worker1 >= 90
                            ? "text-red-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.worker1}
                    </span>
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.worker2 <= 40
                            ? "text-orange-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.worker2}
                    </span>
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.worker3 <= 30
                            ? "text-orange-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.worker3}
                    </span>
                  </div>
                </div>

                {/* Reasoning bullet points */}
                <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
                  {showAfter ? (
                    <>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Balanced night shift distribution
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Enforced rest periods prevent burnout
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Safe 24/7 operations maintained
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start">
                        <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Worker A at high fatigue risk
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Uneven workload creates resentment
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Safety risks from excessive night work
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
          <motion.button
            onClick={() => setShowAfter(!showAfter)}
            className="px-4 py-3 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-sm rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg shadow-md min-h-[44px] sm:min-h-0"
            style={{
              backgroundColor: "#24D9DC",
              color: "#323232",
            }}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, -8, 8, -8, 8, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: "easeInOut",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5AE4E7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#24D9DC";
            }}
          >
            {showAfter ? "← Before RosterLab" : "After RosterLab →"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
