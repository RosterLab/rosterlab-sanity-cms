'use client'

import React from 'react'
import { HiCog, HiCheck, HiCalendar, HiUsers, HiLightningBolt, HiClipboardCheck } from 'react-icons/hi'

export default function AIOptimizationModule() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-col items-center justify-center">
        {/* Input: Roster Requirements */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 w-full max-w-xs mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <HiCalendar className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Roster Requirements</span>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-1">
            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
              <span className="font-medium">Period:</span> Next 4 weeks
            </div>
            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
              <span className="font-medium">Staff:</span> 45 employees
            </div>
            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
              <span className="font-medium">Shifts:</span> 24/7 coverage
            </div>
            <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
              <span className="font-medium">Rules:</span> 15 compliance constraints
            </div>
          </div>
        </div>
        
        {/* AI Processing Engine */}
        <div className="relative w-full max-w-xs h-40 mb-6">
          {/* Central AI Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200 z-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center animate-spin">
                <HiCog className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">AI Optimization</span>
            </div>
          </div>
          
          {/* Processing Steps - Animated */}
          <div className="absolute top-0 left-0 w-full">
            <div className="flex justify-between px-2">
              <div className="bg-purple-100 rounded-lg px-2 py-1 text-xs text-purple-700 animate-[fade-in_0.5s_ease-in-out_0.5s_both]">
                <HiUsers className="inline w-3 h-3 mr-1" />
                Analyzing staff
              </div>
              <div className="bg-purple-100 rounded-lg px-2 py-1 text-xs text-purple-700 animate-[fade-in_0.5s_ease-in-out_0.7s_both]">
                <HiClipboardCheck className="inline w-3 h-3 mr-1" />
                Checking rules
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex justify-between px-2">
              <div className="bg-purple-100 rounded-lg px-2 py-1 text-xs text-purple-700 animate-[fade-in_0.5s_ease-in-out_0.9s_both]">
                <HiLightningBolt className="inline w-3 h-3 mr-1" />
                Optimizing
              </div>
              <div className="bg-purple-100 rounded-lg px-2 py-1 text-xs text-purple-700 animate-[fade-in_0.5s_ease-in-out_1.1s_both]">
                <HiCheck className="inline w-3 h-3 mr-1" />
                Validating
              </div>
            </div>
          </div>
          
          {/* Progress indicator lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-4 left-1/2 w-px h-12 bg-gradient-to-b from-purple-300 to-transparent animate-[fade-in_1s_ease-in-out_0.5s_both]"></div>
            <div className="absolute bottom-4 left-1/2 w-px h-12 bg-gradient-to-t from-green-300 to-transparent animate-[fade-in_1s_ease-in-out_1.5s_both]"></div>
          </div>
        </div>
        
        {/* Output: Optimized Roster */}
        <div className="bg-green-50 rounded-lg p-3 border border-green-200 w-full max-w-xs animate-[fade-in_0.5s_ease-in-out_2s_both]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <HiCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Optimized Roster</span>
            </div>
            <span className="text-xs text-green-700 font-medium">98% Score</span>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-gray-600">
              <span className="text-[#4a9288]">✓</span> All shifts covered optimally
            </div>
            <div className="text-xs text-gray-600">
              <span className="text-[#4a9288]">✓</span> 100% compliance achieved
            </div>
            <div className="text-xs text-gray-600">
              <span className="text-[#4a9288]">✓</span> Fair distribution: 96% balance
            </div>
            <div className="text-xs text-gray-600">
              <span className="text-[#4a9288]">✓</span> Cost optimized: -12% overtime
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-4 w-full max-w-xs">
          <div className="text-center">
            <p className="text-xs text-gray-500">AI processes millions of combinations to find the optimal solution</p>
          </div>
        </div>
      </div>
    </div>
  )
}