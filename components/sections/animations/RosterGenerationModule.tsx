"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RosterGenerationModule() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [violationCells, setViolationCells] = useState<string[]>([]);
  const initialRoster = {
    "0-0": "AM",
    "0-4": "AM",      // Sarah already has AM on Friday
    "1-1": "PM",      // James has PM on Tuesday
    "2-0": "Night",
    "3-3": "Off",
    "4-2": "AM",
  };
  const [manualRosterState, setManualRosterState] = useState<{ [key: string]: string }>(initialRoster);

  const staff = ["Sarah", "James", "Maria", "David", "Emma"];
  const dates = ["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19"];
  const shifts = ["AM", "PM", "Night", "Off"];

  // Generated state - all cells filled with a balanced roster
  const generatedRoster: { [key: string]: string } = {
    "0-0": "AM", "0-1": "AM", "0-2": "PM", "0-3": "PM", "0-4": "Off",
    "1-0": "PM", "1-1": "PM", "1-2": "Off", "1-3": "Off", "1-4": "Night",  // James: PM, PM, Off, Off, Night
    "2-0": "Night", "2-1": "Off", "2-2": "AM", "2-3": "AM", "2-4": "PM",
    "3-0": "Off", "3-1": "Night", "3-2": "Night", "3-3": "Off", "3-4": "Off",  // David: Off on Thu & Fri
    "4-0": "AM", "4-1": "AM", "4-2": "Off", "4-3": "Night", "4-4": "Night",
  };

  const currentRoster = isGenerated ? generatedRoster : manualRosterState;

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "AM":
        return "bg-yellow-100 text-yellow-800";
      case "PM":
        return "bg-blue-100 text-blue-800";
      case "Night":
        return "bg-purple-100 text-purple-800";
      case "Off":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-white";
    }
  };

  // Find empty cells for animation
  const getEmptyCells = () => {
    const emptyCells = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const key = `${i}-${j}`;
        if (!manualRosterState[key]) {
          emptyCells.push({ key, row: i, col: j });
        }
      }
    }
    return emptyCells;
  };

  // Predefined cells to animate in sequence
  const animationSequence = [
    { key: "2-1", shift: "Night" },   // Maria, Tue, Night
    { key: "1-2", shift: "AM" },      // James, Wed, AM
  ];

  // Animate cell selection
  useEffect(() => {
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
              setManualRosterState(prev => ({
                ...prev,
                [currentAnimation.key]: currentAnimation.shift
              }));
              setShowDropdown(false);
              setSelectedCell(null);
              setIsAnimating(false);
              setAnimationCount(prev => prev + 1);
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
  }, [isGenerated, isAnimating, animationCount]);

  return (
    <div className="relative w-full px-4 sm:px-0">
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
        <div className="relative min-h-[240px] h-[240px] sm:h-[270px] md:h-[320px] lg:h-[340px] flex flex-col">
          {/* Roster Interface */}
          <div className="bg-white rounded-xl shadow-lg h-full flex flex-col relative">
        {/* Header */}
        <div className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 border-b flex items-center" style={{ backgroundColor: "#219BC6" }}>
          <div className="w-20 sm:w-24 flex items-center justify-start pl-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
              <Image
                src="/images/icon/RosterLab_Icon_White.svg"
                alt="RosterLab"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h3 className="flex-1 text-center text-sm sm:text-base md:text-lg font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Hospital Roster
          </h3>
          <div className="w-20 sm:w-24 flex items-center justify-end pr-2">
            {isGenerated ? (
              <span className="text-[10px] sm:text-xs text-green-100 font-medium whitespace-nowrap">✓ Generated</span>
            ) : (
              <span className="text-[10px] sm:text-xs text-yellow-200 font-medium whitespace-nowrap">Manual Allocate</span>
            )}
          </div>
        </div>

        {/* Roster Grid */}
        <div className="flex-1 p-1.5 sm:p-2.5 md:p-3.5 pb-0">
          <div className="w-full h-full pb-0">
            <table className="w-full table-fixed text-[10px] sm:text-xs">
              <thead>
                <tr>
                  <th className="text-left text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 pb-2 sm:pb-3 px-1 sm:px-2" style={{ width: '20%' }}>
                    Staff
                  </th>
                  {dates.map((date) => (
                    <th
                      key={date}
                      className="text-center text-[9px] sm:text-[10px] md:text-xs font-medium text-gray-600 pb-2 sm:pb-3" style={{ width: '16%' }}
                    >
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((name, staffIndex) => (
                  <tr key={staffIndex}>
                    <td className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 px-1 sm:px-2 py-0.5 sm:py-1 truncate">
                      {name}
                    </td>
                    {dates.map((_, dateIndex) => {
                      const key = `${staffIndex}-${dateIndex}`;
                      const shift = currentRoster[key];
                      const isSelected = selectedCell === key;

                      return (
                        <td key={dateIndex} className="p-0.5 sm:p-1">
                          <div className="relative">
                          <motion.div
                            id={`cell-${key}`}
                            className={`
                              rounded text-center flex items-center justify-center
                              text-[9px] sm:text-[10px] md:text-xs font-medium
                              min-h-[32px] h-8 sm:h-8 md:h-9 w-full mx-auto
                              ${shift ? getShiftColor(shift) : "bg-gray-50"}
                              ${!isGenerated && !shift ? "border-2 border-dashed border-gray-300" : ""}
                              ${selectedCell === key ? "ring-2 ring-[#24D9DC] ring-offset-2" : ""}
                              ${violationCells.includes(key) ? "ring-2 ring-red-500 ring-offset-2 animate-pulse" : ""}
                              transition-all duration-200
                            `}
                            initial={false}
                            animate={{
                              scale: shift && isGenerated ? [0, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: 0.3,
                              delay: isGenerated ? (staffIndex * 5 + dateIndex) * 0.05 : 0,
                            }}
                          >
                            {shift || (
                              <span className="text-gray-400">
                                {!isGenerated ? <span className="text-base">+</span> : ""}
                              </span>
                            )}
                          </motion.div>

                          {/* Dropdown menu for shift selection */}
                          {showDropdown && selectedCell === key && (() => {
                            const cellElement = document.getElementById(`cell-${key}`);
                            return (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                              className="absolute z-50 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-2"
                              style={{
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: '100%',
                                marginTop: '4px',
                                minWidth: '120px'
                              }}
                            >
                              {shifts.map((s, idx) => {
                                const isSelected = animationSequence[animationCount]?.shift === s;
                                return (
                                  <motion.div
                                    key={s}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ 
                                      opacity: 1, 
                                      x: 0,
                                      backgroundColor: isSelected ? getShiftColor(s).split(' ')[0] : undefined
                                    }}
                                    transition={{ delay: idx * 0.15 }}
                                    className={`px-3 py-2 mb-1 text-[10px] sm:text-xs rounded cursor-pointer ${getShiftColor(s)} ${
                                      isSelected ? 'ring-2 ring-[#24D9DC]' : ''
                                    } transition-all duration-300`}
                                  >
                                    {s}
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                            );
                          })()}
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
            <span className={isGenerated ? "text-green-600" : "text-red-600"}>Staffing Coverage</span>
            <span className="text-gray-400">•</span>
            <span className={isGenerated ? "text-green-600" : "text-red-600"}>37 Rules</span>
          </div>
        </div>
          </div>
        </div>

        {/* Toggle Button */}
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
          animate={buttonAnimation ? {
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, -5, 5, 0],
          } : {}}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5AE4E7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#24D9DC";
          }}
        >
          {isGenerated ? "← View Manual Process" : "Generate Roster →"}
        </motion.button>
        </div>
      </div>
    </div>
  );
}