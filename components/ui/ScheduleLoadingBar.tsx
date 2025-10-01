"use client";

import { useEffect, useState } from "react";
import { HiCheckCircle, HiRefresh } from "react-icons/hi";

export default function ScheduleLoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [key, setKey] = useState(0); // Key to force re-render

  const startAnimation = () => {
    setProgress(0);
    setIsComplete(false);
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        // Slow down as it approaches 100%
        const increment = prev < 50 ? 3 : prev < 80 ? 2 : prev < 95 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [key]);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-[500px]">
      {/* Browser-like header */}
      <div className="bg-gray-200 px-4 py-3 flex items-center space-x-2 border-b border-gray-300">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        </div>
        <div className="flex-1 px-4">
          <div className="bg-gray-50 rounded px-3 py-1 text-sm text-gray-500">
            app.rosterlab.com/schedule-generator
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-8 flex flex-col items-center justify-center h-[calc(100%-56px)]">
        <div className="w-full max-w-md space-y-6">
          {!isComplete ? (
            <>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Auto-Generating Optimal Schedule
                </h3>
                <p className="text-gray-600 text-sm">
                  AI analyzing thousands of variables...
                </p>
              </div>

              <div className="relative">
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span>Processing staff preferences and compliance rules</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="mb-6">
                <HiCheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce-once" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Schedule Generated!
              </h3>
              <p className="text-gray-600 mb-6">
                Your optimized schedule is ready with 100% compliance
              </p>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <HiCheckCircle className="w-4 h-4 text-green-500" />
                  <span>All shifts covered optimally</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <HiCheckCircle className="w-4 h-4 text-green-500" />
                  <span>Staff preferences respected</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <HiCheckCircle className="w-4 h-4 text-green-500" />
                  <span>Compliance rules enforced</span>
                </div>
              </div>

              <button
                onClick={startAnimation}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <HiRefresh className="w-5 h-5" />
                Generate Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
