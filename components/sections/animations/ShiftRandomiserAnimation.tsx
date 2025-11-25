"use client";

import { useEffect, useState } from "react";

export default function ShiftRandomiserAnimation() {
  const [currentState, setCurrentState] = useState(0);

  const states = [
    "Inputting shifts",
    "Rostering staff",
    "Randomising distribution",
    "Shifts assigned",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % states.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [states.length]);

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center h-full">
      {/* Rolling Dice Animation */}
      <div className="relative mb-6">
        <div className="w-24 h-24 flex items-center justify-center animate-dice-roll">
          <span className="text-7xl">🎲</span>
        </div>
      </div>

      {/* State Label */}
      <div className="relative h-14 flex items-center justify-center w-full mb-6">
        {states.map((state, idx) => (
          <div
            key={idx}
            className={`absolute transition-all duration-500 text-center ${
              currentState === idx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <h3 className="text-lg font-bold text-purple-600">{state}</h3>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mb-3">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-2000 ease-linear"
            style={{ width: `${((currentState + 1) / states.length) * 100}%` }}
          />
        </div>
      </div>

      {/* State Indicators */}
      <div className="flex gap-2">
        {states.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentState
                ? "bg-purple-600 scale-150"
                : idx < currentState
                  ? "bg-purple-400"
                  : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
