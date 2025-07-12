"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function MobileAppPreferencesModule() {
  const [showAfter, setShowAfter] = useState(false);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = ["11", "12", "13", "14", "15", "16", "17"];

  // Before state - only 2 preferences met (30%)
  const beforeSchedule = [
    { day: 0, shift: "Night", preferred: false, emoji: "😞" },
    { day: 1, shift: "Night", preferred: true, emoji: "😤" },
    { day: 2, shift: "Off", preferred: false, emoji: "😔" },
    { day: 3, shift: "Off", preferred: false, emoji: "😫" },
    { day: 4, shift: "AM", preferred: false, emoji: "😣" },
    { day: 5, shift: "AM", preferred: false, emoji: "😐" },
    { day: 6, shift: "Off", preferred: true, emoji: "😊" },
  ];

  // After state - 6/7 preferences met (85%)
  const afterSchedule = [
    { day: 0, shift: "Night", preferred: true, emoji: "😊" },
    { day: 1, shift: "Night", preferred: true, emoji: "😃" },
    { day: 2, shift: "Off", preferred: true, emoji: "🎉" },
    { day: 3, shift: "Off", preferred: true, emoji: "😔" },
    { day: 4, shift: "AM", preferred: false, emoji: "😊" },
    { day: 5, shift: "AM", preferred: true, emoji: "😊" },
    { day: 6, shift: "Off", preferred: true, emoji: "😎" },
  ];

  const currentSchedule = showAfter ? afterSchedule : beforeSchedule;

  return (
    <div className="relative w-full px-4 sm:px-0">
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="relative min-h-[260px] h-[260px] sm:h-[290px] md:h-[350px] flex flex-col">
          {/* Mobile App Interface */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
        {/* App Header */}
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
            <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">Staff Preferences</h3>
          </div>
          <div className="w-16 sm:w-20 flex items-center justify-end pr-2">
            <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap">
              {showAfter ? "AI" : "Manual"}
            </span>
          </div>
        </div>

        {/* Calendar View */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 pb-2 sm:pb-2.5 md:pb-3 flex flex-col">
          <div className="flex-1">
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 md:gap-1.5 mb-1.5 sm:mb-2 md:mb-2.5">
              {/* Days of Week Header */}
              {days.map((day) => (
                <div key={day} className="text-center">
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-medium">
                    {day}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
              <AnimatePresence mode="wait">
                {currentSchedule.map((schedule, index) => (
                  <motion.div
                    key={`${showAfter ? "after" : "before"}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="aspect-square"
                  >
                    <div
                      className={`h-full min-h-[32px] rounded-md sm:rounded-md md:rounded-lg p-0.5 sm:p-0.5 md:p-1 pt-1 sm:pt-1.5 md:pt-2 flex flex-col items-center justify-center ${
                        schedule.preferred ? "bg-green-100" : showAfter ? "bg-orange-100" : "bg-red-100"
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                        {dates[index]}
                      </span>
                      <span
                        className={`text-[8px] sm:text-[10px] md:text-xs font-bold mt-0 sm:mt-0.5 ${
                          schedule.shift === "OFF"
                            ? "text-[#219BC6]"
                            : schedule.preferred
                              ? "text-green-700"
                              : showAfter ? "text-orange-700" : "text-red-700"
                        }`}
                      >
                        {schedule.shift}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Preferences Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-1 p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-md sm:rounded-md md:rounded-lg"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700">
                Preferences Met:
              </span>
              <span
                className={`text-[10px] sm:text-xs md:text-sm font-bold ${showAfter ? "text-green-600" : "text-red-600"}`}
              >
                {showAfter ? "85%" : "30%"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 md:h-2 mb-2 sm:mb-2.5 md:mb-3">
              <motion.div
                className={`h-1 sm:h-1.5 md:h-2 rounded-full ${showAfter ? "bg-green-500" : "bg-red-500"}`}
                initial={{ width: "0%" }}
                animate={{ width: showAfter ? "85%" : "30%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>

            {/* Reasoning bullet points */}
            <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1">
              {showAfter ? (
                <>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      All rules are followed
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      AI fulfilling preferences when it can
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Higher staff satisfaction, more flexibility
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Balancing union rules with individual preferences is
                      challenging.
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Schedulers worry about staffing coverage
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-orange-600 mr-1 sm:mr-1.5 md:mr-2 text-[10px] sm:text-[10px] md:text-xs">•</span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                      Limited flexibility
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
            backgroundColor: '#24D9DC',
            color: '#323232'
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -8, 8, -8, 8, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2.2,
            ease: "easeInOut"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5AE4E7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#24D9DC';
          }}
        >
          {showAfter ? "← Manual Roster" : "AI Handles Preferences →"}
        </motion.button>
        </div>
      </div>
    </div>
  );
}
