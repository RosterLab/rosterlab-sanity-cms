'use client'

import { HiCheck, HiX } from 'react-icons/hi'

export default function AuditTrailModule() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative" style={{ minHeight: '500px' }}>
        {/* Top row - Daniel and Sunny */}
        <div className="flex justify-between mb-32">
          {/* Daniel's Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3" />
              <span className="font-semibold text-gray-900">Daniel</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Date</span>
                <span className="text-gray-400">|</span>
                <span>Allocations</span>
                <span className="text-gray-400">|</span>
                <span>Time</span>
              </div>
            </div>
          </div>

          {/* Sunny's Box */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3" />
              <span className="font-semibold text-gray-900">Sunny</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Date</span>
                <span className="text-gray-400">|</span>
                <span>Allocations</span>
                <span className="text-gray-400">|</span>
                <span>Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manager's Box - Bottom center */}
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-64 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-3" />
              <span className="font-semibold text-gray-900 mb-4">Manager</span>
              <div className="flex space-x-4">
                <button className="p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                  <HiCheck className="w-6 h-6 text-green-600" />
                </button>
                <button className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                  <HiX className="w-6 h-6 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow from Daniel to Sunny - positioned below the boxes */}
        <div className="absolute" style={{ top: '140px', left: '50%', transform: 'translateX(-50%)', width: '350px' }}>
          <svg width="100%" height="60">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4a9288" />
              </marker>
            </defs>
            <line x1="30" y1="20" x2="320" y2="20" stroke="#4a9288" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
          <p className="text-sm text-gray-600 text-center mt-2">Swap sent on 10th May</p>
        </div>

        {/* Other text labels */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-center" style={{ zIndex: 2 }}>
          <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded whitespace-nowrap">
            Swap accepted,<br />pending for approval
          </p>
        </div>

        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-center" style={{ zIndex: 2 }}>
          <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
            Swap approved<br />on 11th May
          </p>
        </div>
      </div>
    </div>
  )
}