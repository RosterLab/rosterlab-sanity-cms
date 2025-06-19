'use client'

import { useEffect, useState } from 'react'
import { HiCheckCircle, HiRefresh, HiBell, HiDeviceMobile } from 'react-icons/hi'

export default function RosterPublishingMobile() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [key, setKey] = useState(0) // Key to force re-render
  
  const startAnimation = () => {
    setProgress(0)
    setIsComplete(false)
    setKey(prev => prev + 1)
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          clearInterval(interval)
          return 100
        }
        // Slow down as it approaches 100%
        const increment = prev < 50 ? 3 : prev < 80 ? 2 : prev < 95 ? 1 : 0.5
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [key])

  return (
    <div className="flex justify-center items-center">
      {/* Mobile phone frame */}
      <div className="relative mx-auto">
        <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] shadow-2xl p-2">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl"></div>
          
          {/* Phone screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Status bar */}
            <div className="bg-gray-100 px-6 py-2 flex items-center justify-between text-xs">
              <span className="font-medium">9:41 AM</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
              </div>
            </div>
            
            {/* App header */}
            <div className="bg-blue-600 px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">RosterLab</h3>
              <p className="text-sm opacity-90">Your Work Schedule</p>
            </div>
            
            {/* Content area */}
            <div className="p-6 h-[calc(100%-120px)] flex flex-col items-center justify-center">
              {!isComplete ? (
                <>
                  <div className="text-center mb-6">
                    <HiDeviceMobile className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Publishing Roster
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sending to all team members...
                    </p>
                  </div>
                  
                  <div className="w-full max-w-xs">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      >
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-xl font-bold text-blue-600">{Math.floor(progress)}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center text-xs text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span>Notifying staff members</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="mb-4">
                    <div className="relative">
                      <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <HiBell className="w-6 h-6 text-blue-600 absolute -top-1 -right-1 animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Roster Published!
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    All team members have been notified
                  </p>
                  
                  {/* Notification preview */}
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">RL</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">New Roster Available</p>
                        <p className="text-xs text-gray-600">Your schedule for next week is ready</p>
                        <p className="text-xs text-gray-500 mt-1">Just now</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <HiCheckCircle className="w-4 h-4 text-green-500" />
                      <span>28 staff members notified</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <HiCheckCircle className="w-4 h-4 text-green-500" />
                      <span>Push notifications sent</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={startAnimation}
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <HiRefresh className="w-4 h-4" />
                    Publish Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}