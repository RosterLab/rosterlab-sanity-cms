'use client'

import { HiShieldCheck, HiBell } from 'react-icons/hi'

export default function LeaveRequestDemo() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-col items-center justify-center">
        {/* Header Section */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 w-full max-w-xs mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <HiBell className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-sm">Leave Requests Queue</span>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-end">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">3 Pending</span>
          </div>
        </div>

        {/* Request Items */}
        <div className="space-y-3 w-full max-w-xs mb-6">
          {/* Emma Wilson Request */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <HiShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Emma Wilson</p>
                  <p className="text-xs text-gray-600">Annual Leave</p>
                </div>
              </div>
              <span className="text-xs text-[#4a9288]">✓ Auto-approve eligible</span>
            </div>
            <div className="space-y-1">
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Dates:</span> Dec 15-22, 2024 (5 days)
              </div>
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Status:</span> Coverage available
              </div>
            </div>
          </div>

          {/* Michael Chen Request */}
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-600 rounded flex items-center justify-center">
                  <HiBell className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-xs text-gray-600">Sick Leave</p>
                </div>
              </div>
              <span className="text-xs text-yellow-700">⚠ Manager review</span>
            </div>
            <div className="space-y-1">
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Date:</span> Tomorrow (1 day)
              </div>
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Status:</span> Coverage needed
              </div>
            </div>
          </div>

          {/* Sarah Johnson Request */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-200 animate-[fade-in_0.5s_ease-in-out_0.3s_both]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <HiShieldCheck className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-600">Personal Leave</p>
                </div>
              </div>
              <span className="text-xs text-[#4a9288]">✓ Auto-approve eligible</span>
            </div>
            <div className="space-y-1">
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Date:</span> Jan 8, 2025 (1 day)
              </div>
              <div className="bg-white rounded px-2 py-1 text-xs text-gray-600">
                <span className="font-medium">Status:</span> Coverage available
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className="bg-[#4a9288] text-white rounded-lg px-6 py-2 text-sm font-semibold hover:bg-[#3d7a71] transition-all transform hover:scale-105 shadow-md" 
          onClick={(e) => {
            const button = e.currentTarget;
            button.innerHTML = '<span className="text-white">✓ Staff notified</span>';
            button.classList.add('bg-[#4a9288]', 'hover:bg-[#4a9288]');
            button.classList.remove('hover:bg-[#3d7a71]');
            button.disabled = true;
          }}
        >
          <span>Approve Requests</span>
        </button>
      </div>
    </div>
  )
}