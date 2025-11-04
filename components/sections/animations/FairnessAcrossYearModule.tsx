"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FairnessAcrossYearModule() {
  const [showAfter, setShowAfter] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Before state - unfair distribution (3 staff members with unequal weekend on-calls)
  const beforeDistribution = [
    { month: 0, staff1: 2, staff2: 1, staff3: 0 }, // Jan
    { month: 1, staff1: 2, staff2: 1, staff3: 0 }, // Feb
    { month: 2, staff1: 2, staff2: 1, staff3: 0 }, // Mar
    { month: 3, staff1: 3, staff2: 0, staff3: 1 }, // Apr
    { month: 4, staff1: 2, staff2: 1, staff3: 1 }, // May
    { month: 5, staff1: 3, staff2: 1, staff3: 0 }, // Jun
    { month: 6, staff1: 2, staff2: 2, staff3: 0 }, // Jul
    { month: 7, staff1: 3, staff2: 0, staff3: 1 }, // Aug
    { month: 8, staff1: 2, staff2: 1, staff3: 1 }, // Sep
    { month: 9, staff1: 3, staff2: 1, staff3: 0 }, // Oct
    { month: 10, staff1: 2, staff2: 1, staff3: 1 }, // Nov
    { month: 11, staff1: 2, staff2: 2, staff3: 0 }, // Dec
  ];

  // After state - fair distribution (evenly distributed across staff)
  const afterDistribution = [
    { month: 0, staff1: 2, staff2: 1, staff3: 1 }, // Jan
    { month: 1, staff1: 1, staff2: 2, staff3: 1 }, // Feb
    { month: 2, staff1: 1, staff2: 1, staff3: 2 }, // Mar
    { month: 3, staff1: 2, staff2: 1, staff3: 1 }, // Apr
    { month: 4, staff1: 1, staff2: 2, staff3: 1 }, // May
    { month: 5, staff1: 1, staff2: 1, staff3: 2 }, // Jun
    { month: 6, staff1: 2, staff2: 1, staff3: 1 }, // Jul
    { month: 7, staff1: 1, staff2: 2, staff3: 1 }, // Aug
    { month: 8, staff1: 1, staff2: 1, staff3: 2 }, // Sep
    { month: 9, staff1: 2, staff2: 1, staff3: 1 }, // Oct
    { month: 10, staff1: 1, staff2: 2, staff3: 1 }, // Nov
    { month: 11, staff1: 1, staff2: 1, staff3: 2 }, // Dec
  ];

  const currentDistribution = showAfter
    ? afterDistribution
    : beforeDistribution;

  // Calculate totals
  const totals = currentDistribution.reduce(
    (acc, month) => ({
      staff1: acc.staff1 + month.staff1,
      staff2: acc.staff2 + month.staff2,
      staff3: acc.staff3 + month.staff3,
    }),
    { staff1: 0, staff2: 0, staff3: 0 },
  );

  const getBarColor = (
    value: number,
    staffMember: "staff1" | "staff2" | "staff3",
  ) => {
    if (showAfter) return "bg-green-500";

    // Before: show unfairness with different colors
    const total = totals[staffMember];
    if (total >= 28) return "bg-red-500"; // Overworked
    if (total <= 12) return "bg-orange-400"; // Underworked
    return "bg-yellow-500"; // Average
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
                  Weekend On-Call Distribution
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
                          {months[index]}
                        </span>
                        <div className="w-full space-y-0.5 sm:space-y-1">
                          {/* Staff 1 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.staff1, "staff1")}`}
                              style={{
                                opacity: 0.3 + (month.staff1 / 3) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.staff1}
                            </span>
                          </div>
                          {/* Staff 2 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.staff2, "staff2")}`}
                              style={{
                                opacity: 0.3 + (month.staff2 / 3) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.staff2}
                            </span>
                          </div>
                          {/* Staff 3 */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-full h-3 sm:h-4 md:h-5 rounded-sm ${getBarColor(month.staff3, "staff3")}`}
                              style={{
                                opacity: 0.3 + (month.staff3 / 3) * 0.7,
                              }}
                            />
                            <span className="text-[7px] sm:text-[8px] md:text-[9px] text-gray-700 font-medium mt-0.5">
                              {month.staff3}
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
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "staff1")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Dr. Smith
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "staff2")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Dr. Jones
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-sm ${getBarColor(0, "staff3")}`}
                    />
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Dr. Lee
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
                    Fairness Score:
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs md:text-sm font-bold ${showAfter ? "text-green-600" : "text-red-600"}`}
                  >
                    {showAfter ? "98%" : "42%"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] md:text-xs text-gray-600 mb-1.5 sm:mb-2">
                  <span>Total per staff:</span>
                  <div className="flex gap-1.5 sm:gap-2">
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.staff1 >= 28
                            ? "text-red-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.staff1}
                    </span>
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.staff2 <= 15
                            ? "text-orange-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.staff2}
                    </span>
                    <span
                      className={
                        showAfter
                          ? "text-green-600 font-semibold"
                          : totals.staff3 <= 12
                            ? "text-orange-600 font-semibold"
                            : "text-gray-700"
                      }
                    >
                      {totals.staff3}
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
                          Equal distribution across full year
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          AI maintains fairness during re-rostering
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Transparent tracking builds team trust
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
                          Unequal burden creates team tension
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Hard to track fairness manually
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">
                          •
                        </span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                          Re-rostering breaks yearly balance
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
