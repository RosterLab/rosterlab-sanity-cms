"use client";

import { useState, useEffect } from "react";
import { HiCheck, HiRefresh, HiPlus } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

export default function RosterGenerator() {
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isGenerating && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          const increment = Math.random() * 15 + 5;
          return Math.min(prev + increment, 100);
        });
      }, 540);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setTimeout(() => {
        setIsGenerating(false);
      }, 1000);
    }
  }, [isGenerating, progress]);

  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl mx-auto"
      style={{ contain: "layout" }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="bg-white/20 rounded-lg p-2">
            <Image
              src="/images/icon/RosterLab_Icon_White.svg"
              alt="RosterLab"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <HiPlus className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-lg font-semibold text-white">
          AI Roster Generator
        </p>
        <p className="text-sm text-blue-100 mt-1 mb-0 sm:mb-0 pb-6 sm:pb-0">
          Automated rostering with all requirements optimised
        </p>
      </div>

      <div className="p-6">
        {/* Generation Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Generation Status
            </span>
            <span className="text-sm text-gray-500">
              {isGenerating
                ? `${Math.round(progress)}%`
                : progress === 100
                  ? "Complete"
                  : "Ready"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{
                width: `${progress}%`,
                transform: "translateZ(0)", // Force GPU acceleration
                willChange: "width", // Hint browser about what will change
              }}
            >
              {isGenerating && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Roster Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  Mar 10 - Apr 06, 2025
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  Emergency Ward
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">62</p>
              <p className="text-xs text-gray-600 mt-1">Staff Members</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">40</p>
              <p className="text-xs text-gray-600 mt-1">Rules & Requirements</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-purple-600">582</p>
              <p className="text-xs text-gray-600 mt-1">Preferences Met</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!isGenerating && progress !== 100 ? (
            <button
              onClick={startGeneration}
              className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:animate-none cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate Healthcare Roster
            </button>
          ) : isGenerating ? (
            <button
              disabled
              className="flex-1 bg-gray-100 text-gray-500 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Generating...
            </button>
          ) : (
            <>
              <Link href="/book-a-demo" className="flex-1">
                <button className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <HiCheck className="w-4 h-4" />
                  View Roster
                </button>
              </Link>
              <button
                onClick={() => setProgress(0)}
                className="group px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 hover:text-gray-900 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer border border-gray-300 hover:border-gray-400"
                title="Generate again"
              >
                <HiRefresh className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </>
          )}
        </div>

        {/* Processing Steps */}
        {isGenerating && (
          <div className="mt-4 space-y-2">
            <div
              className={`flex items-center gap-2 text-xs ${progress > 0 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${progress > 0 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span>Analysing staff availability</span>
            </div>
            <div
              className={`flex items-center gap-2 text-xs ${progress > 30 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${progress > 30 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span>Factoring in all hard & soft rules</span>
            </div>
            <div
              className={`flex items-center gap-2 text-xs ${progress > 60 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${progress > 60 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span>Optimising staffing coverage</span>
            </div>
            <div
              className={`flex items-center gap-2 text-xs ${progress > 90 ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${progress > 90 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
              <span>Finalising roster</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
