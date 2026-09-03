"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RosterGenerationModuleProps {
  autoplay?: boolean;
}

export default function RosterGenerationModule({
  autoplay = false,
}: RosterGenerationModuleProps = {}) {
  // In autoplay mode: start with an empty roster, hold briefly, then flip
  // to the solved state. Any user with `autoplay` off keeps the manual
  // "Before RosterLab" starting state.
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [violationCells, setViolationCells] = useState<string[]>([]);
  const initialRoster = {
    "0-0": "AM",
    "0-4": "AM", // Sarah already has AM on Friday
    "1-1": "PM", // James has PM on Tuesday
    "2-0": "Night",
    "3-3": "Off",
    "4-2": "AM",
  };
  // Autoplay shows a fully blank roster before flipping to solved — clearer
  // "before/after" contrast than the partially-filled manual state.
  const [manualRosterState, setManualRosterState] = useState<{
    [key: string]: string;
  }>(autoplay ? {} : initialRoster);

  const [playToken, setPlayToken] = useState(0);
  const [finished, setFinished] = useState(false);
  // Autoplay phases:
  //   idle    → empty roster shown, cursor drifting toward the Generate button
  //   clicked → cursor has just landed on the button; button visibly held down
  //             but label + icon haven't changed yet (feels like a real click).
  //   loading → spinner + "Generating…" label — the actual "thinking" beat.
  //   done    → roster fills in, overlay fades.
  const [autoplayPhase, setAutoplayPhase] = useState<
    "idle" | "clicked" | "loading" | "done"
  >("idle");

  useEffect(() => {
    if (!autoplay) return;
    // Reset state and run the sequence.
    //  0    → 1400ms: idle     (cursor drifts toward the button)
    //  1400 → 1600ms: clicked  (cursor lands; button held; label unchanged)
    //  1600 → 3200ms: loading  (label swaps to Generating…, spinner)
    //  3200ms       : done     (overlay fades, roster fills)
    setIsGenerated(false);
    setFinished(false);
    setAutoplayPhase("idle");
    setManualRosterState({});
    setShowDropdown(false);
    setSelectedCell(null);
    setViolationCells([]);

    const t1 = window.setTimeout(() => setAutoplayPhase("clicked"), 1400);
    const t2 = window.setTimeout(() => setAutoplayPhase("loading"), 1600);
    const t3 = window.setTimeout(() => {
      setAutoplayPhase("done");
      setIsGenerated(true);
    }, 3200);
    // Wait for the cell wave to finish before showing the replay button.
    // Last cell delay = (4+4) * 140ms = 1120ms, plus 750ms of animation.
    const t4 = window.setTimeout(() => setFinished(true), 3200 + 1120 + 750);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [autoplay, playToken]);

  const replay = () => setPlayToken((n) => n + 1);

  const staff = ["Sarah", "James", "Maria", "David", "Emma"];
  const dates = ["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"];
  const shifts = ["AM", "PM", "Night", "Off"];

  // Generated state - all cells filled with a balanced roster
  const generatedRoster: { [key: string]: string } = {
    "0-0": "AM",
    "0-1": "AM",
    "0-2": "PM",
    "0-3": "PM",
    "0-4": "Off",
    "1-0": "PM",
    "1-1": "PM",
    "1-2": "Off",
    "1-3": "Off",
    "1-4": "Night", // James: PM, PM, Off, Off, Night
    "2-0": "Night",
    "2-1": "Off",
    "2-2": "AM",
    "2-3": "AM",
    "2-4": "PM",
    "3-0": "Off",
    "3-1": "Night",
    "3-2": "Night",
    "3-3": "Off",
    "3-4": "Off", // David: Off on Thu & Fri
    "4-0": "AM",
    "4-1": "AM",
    "4-2": "Off",
    "4-3": "Night",
    "4-4": "Night",
  };

  const currentRoster = isGenerated ? generatedRoster : manualRosterState;

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "AM":
        return "bg-amber-50 text-amber-700";
      case "PM":
        return "bg-sky-50 text-sky-700";
      case "Night":
        return "bg-indigo-50 text-indigo-700";
      case "Off":
        return "bg-slate-100 text-slate-500";
      default:
        return "bg-white";
    }
  };

  // Predefined cells to animate in sequence
  const animationSequence = [
    { key: "2-1", shift: "Night" }, // Maria, Tue, Night
    { key: "1-2", shift: "AM" }, // James, Wed, AM
  ];

  // Animate cell selection — skipped entirely in autoplay mode so the
  // empty roster stays truly empty for the hold beat.
  useEffect(() => {
    if (autoplay) return;
    if (!isGenerated && !isAnimating) {
      const timer = setTimeout(() => {
        if (animationCount < animationSequence.length) {
          setIsAnimating(true);
          const currentAnimation = animationSequence[animationCount];

          // Highlight the cell
          setSelectedCell(currentAnimation.key);

          // Show dropdown after a pause
          setTimeout(() => {
            setShowDropdown(true);

            // Select the predetermined shift after dropdown appears
            setTimeout(() => {
              setManualRosterState((prev) => ({
                ...prev,
                [currentAnimation.key]: currentAnimation.shift,
              }));
              setShowDropdown(false);
              setSelectedCell(null);
              setIsAnimating(false);
              setAnimationCount((prev) => prev + 1);
            }, 1200); // Slower selection timing
          }, 700); // Slower dropdown appearance
        } else {
          // Show violations after completing all 2 allocations
          setTimeout(() => {
            // Highlight violations - James has PM on Tuesday followed by AM on Wednesday
            setViolationCells(["1-1", "1-2"]); // James' PM->AM violation only

            // Wait to show violations then reset
            setTimeout(() => {
              // Trigger button animation
              setButtonAnimation(true);
              setTimeout(() => setButtonAnimation(false), 1000);

              // Reset roster and clear violations
              setTimeout(() => {
                setManualRosterState(initialRoster);
                setAnimationCount(0);
                setViolationCells([]);
              }, 1500); // Extra pause after button shake
            }, 2500); // Show violations for 2.5 seconds
          }, 400); // Pause before highlighting
        }
      }, 1300); // Delay between animations

      return () => clearTimeout(timer);
    }
  }, [autoplay, isGenerated, isAnimating, animationCount]);

  return (
    <div className="relative w-full px-4 sm:px-0">
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
        {autoplay && (
          <div className="flex justify-center items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isGenerated
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {isGenerated ? "After RosterLab" : "Before RosterLab"}
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
        <div className="relative min-h-[240px] h-[240px] sm:h-[270px] md:h-[320px] lg:h-[340px] flex flex-col">
          {/* Roster Interface */}
          <div className="bg-white rounded-xl shadow-lg h-full flex flex-col relative overflow-hidden">
            {/* Autoplay overlay: Generate button that appears to be pressed */}
            {autoplay && autoplayPhase !== "done" && (
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
                <motion.button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative inline-flex items-center gap-2 bg-blue-600 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg"
                  animate={
                    autoplayPhase === "clicked" || autoplayPhase === "loading"
                      ? { scale: 0.94, y: 1 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {autoplayPhase === "loading" ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      >
                        <path d="M21 12a9 9 0 1 1-6.2-8.55" />
                      </svg>
                      Generating…
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2 9 9l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1z" />
                      </svg>
                      Generate roster
                    </>
                  )}
                  {/* Simulated cursor arrow — glides toward the button during
                      `idle`, snaps into the pressed position on `clicked`,
                      then stays there through `loading`. */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 pointer-events-none"
                    initial={{ opacity: 0, x: 40, y: 40 }}
                    animate={{
                      opacity: 1,
                      x: autoplayPhase === "idle" ? 8 : -4,
                      y: autoplayPhase === "idle" ? 8 : -4,
                    }}
                    transition={{
                      duration: autoplayPhase === "idle" ? 1.1 : 0.15,
                      ease: autoplayPhase === "idle" ? "easeOut" : "easeIn",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" className="drop-shadow">
                      <path d="M3 3l7 18 2-8 8-2z" fill="#111827" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
            {/* Header */}
            <div
              className="px-2 sm:px-4 md:px-5 py-1 sm:py-2 md:py-2.5 border-b flex items-center"
              style={{ backgroundColor: "#2563EB" }}
            >
              <div className="w-16 sm:w-24 flex items-center justify-start pl-1 sm:pl-2">
                <div className="w-4 h-4 sm:w-6 sm:h-6 relative">
                  <Image
                    src="/images/icon/RosterLab_Icon_White.svg"
                    alt="RosterLab"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3
                className="flex-1 text-center text-xs sm:text-base md:text-lg font-semibold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Hospital Team Schedule
              </h3>
              <div className="w-16 sm:w-24 flex items-center justify-end pr-1 sm:pr-2">
                {isGenerated ? (
                  <span className="text-[9px] sm:text-xs text-green-100 font-medium whitespace-nowrap">
                    ✓ Generated
                  </span>
                ) : (
                  <span className="text-[9px] sm:text-xs text-yellow-200 font-medium whitespace-nowrap">
                    <span className="sm:hidden">Manual</span>
                    <span className="hidden sm:inline">Manual Allocate</span>
                  </span>
                )}
              </div>
            </div>

            {/* Roster Grid */}
            <div className="flex-1 p-1.5 sm:p-2.5 md:p-3.5">
              <div className="w-full h-full">
                <table className="w-full table-fixed text-[10px] sm:text-xs">
                  <thead>
                    <tr>
                      <th
                        className="text-left text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 pb-2 sm:pb-3 px-1 sm:px-2"
                        style={{ width: "20%" }}
                      >
                        Staff
                      </th>
                      {dates.map((date) => (
                        <th
                          key={date}
                          className="text-center text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-600 pb-2 sm:pb-3"
                          style={{ width: "16%" }}
                        >
                          {date}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((name, staffIndex) => (
                      <tr key={staffIndex}>
                        <td className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 px-1 sm:px-2 py-0 sm:py-1 truncate">
                          {name}
                        </td>
                        {dates.map((_, dateIndex) => {
                          const key = `${staffIndex}-${dateIndex}`;
                          const shift = currentRoster[key];

                          return (
                            <td key={dateIndex} className="p-0.5">
                              <div className="relative">
                                <motion.div
                                  id={`cell-${key}`}
                                  key={`${key}-${isGenerated ? "gen" : "man"}`}
                                  className={`
                              rounded text-center flex items-center justify-center
                              text-[9px] sm:text-[10px] md:text-xs font-medium
                              min-h-[28px] h-7 sm:h-8 md:h-9 w-full mx-auto
                              ${shift ? getShiftColor(shift) : "bg-gray-50"}
                              ${!isGenerated && !shift ? "border-2 border-dashed border-gray-300" : ""}
                              ${selectedCell === key ? "ring-2 ring-[#24D9DC] ring-offset-2" : ""}
                              ${violationCells.includes(key) ? "ring-2 ring-red-500 ring-offset-2 animate-pulse" : ""}
                            `}
                                  // Cells populate in a diagonal wave. Each
                                  // cell fades + gently scales in with a
                                  // stagger tied to its row + column index.
                                  // Longer duration + softer easing so the
                                  // wave reads as calm rather than snappy.
                                  initial={
                                    shift && isGenerated
                                      ? { scale: 0.82, opacity: 0, y: 4 }
                                      : false
                                  }
                                  animate={{ scale: 1, opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.75,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay:
                                      shift && isGenerated
                                        ? (staffIndex + dateIndex) * 0.14
                                        : 0,
                                  }}
                                >
                                  {shift || (
                                    <span className="text-gray-400">
                                      {!isGenerated ? (
                                        <span className="text-base">+</span>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  )}
                                </motion.div>

                                {/* Dropdown menu for shift selection */}
                                {showDropdown && selectedCell === key && (
                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      scale: 0.8,
                                      y: -10,
                                    }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute z-50 bg-white rounded-md sm:rounded-lg shadow-xl border sm:border-2 border-gray-200 p-1 sm:p-2"
                                    style={{
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      top: "100%",
                                      marginTop: "2px",
                                      minWidth: "80px",
                                    }}
                                  >
                                    {shifts.map((s, idx) => {
                                      const isSelected =
                                        animationSequence[animationCount]
                                          ?.shift === s;
                                      return (
                                        <motion.div
                                          key={s}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{
                                            opacity: 1,
                                            x: 0,
                                            backgroundColor: isSelected
                                              ? getShiftColor(s).split(" ")[0]
                                              : undefined,
                                          }}
                                          transition={{ delay: idx * 0.15 }}
                                          className={`px-2 sm:px-3 py-1 sm:py-2 mb-0.5 sm:mb-1 text-[9px] sm:text-xs rounded cursor-pointer ${getShiftColor(s)} ${
                                            isSelected
                                              ? "ring-1 sm:ring-2 ring-[#24D9DC]"
                                              : ""
                                          } transition-all duration-300`}
                                        >
                                          {s}
                                        </motion.div>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-gray-100 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-[9px] sm:text-[10px] md:text-xs font-medium">
                <span className="text-gray-600">48 Staff</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">8 Skills</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">4 Shifts</span>
                <span className="text-gray-400">•</span>
                <span
                  className={isGenerated ? "text-green-600" : "text-red-600"}
                >
                  Staffing Coverage
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className={isGenerated ? "text-green-600" : "text-red-600"}
                >
                  37 Rules
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Button - only shown when not autoplaying */}
        {!autoplay && (
          <div className="flex justify-center mt-12 sm:mt-10 md:mt-12">
            <motion.button
              onClick={() => {
                setIsGenerated(!isGenerated);
                if (isGenerated) {
                  // Reset to initial state when going back to manual
                  setManualRosterState(initialRoster);
                  setIsAnimating(false);
                  setAnimationCount(0);
                  setViolationCells([]);
                  setShowDropdown(false);
                  setSelectedCell(null);
                } else {
                  // Clear any active states when switching to generated
                  setShowDropdown(false);
                  setSelectedCell(null);
                  setViolationCells([]);
                }
              }}
              className="px-4 py-3 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-sm rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg shadow-md min-h-[44px] sm:min-h-0"
              style={{
                backgroundColor: "#24D9DC",
                color: "#323232",
              }}
              animate={
                buttonAnimation
                  ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, -5, 5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5AE4E7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#24D9DC";
              }}
            >
              {isGenerated ? "← Before RosterLab" : "After RosterLab →"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
