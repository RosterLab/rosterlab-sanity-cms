'use client'

import { useState } from 'react'
import { HiArrowUp, HiArrowDown } from 'react-icons/hi'
import Image from 'next/image'

export default function WeekendRotationModule() {
  const [isOptimized, setIsOptimized] = useState(false)

  // Before optimization: Staff 1 has week 3 off, Staff 3 has weeks 2 & 3 off, Staff 2 has no weekends off
  const profilesBefore = [
    { name: 'Staff 1', weekendsOff: [3], image: '/images/staff profile images/PROFILE1.webp' },
    { name: 'Staff 2', weekendsOff: [], image: '/images/staff profile images/Profile2.webp' },
    { name: 'Staff 3', weekendsOff: [2, 3], image: '/images/staff profile images/Profile3.webp' },
  ]

  // After optimization: Staff 1 gets week 1, Staff 2 gets week 3, Staff 3 keeps week 2
  const profilesAfter = [
    { name: 'Staff 1', weekendsOff: [1], image: '/images/staff profile images/PROFILE1.webp' },
    { name: 'Staff 2', weekendsOff: [3], image: '/images/staff profile images/Profile2.webp' },
    { name: 'Staff 3', weekendsOff: [2], image: '/images/staff profile images/Profile3.webp' },
  ]

  const profiles = isOptimized ? profilesAfter : profilesBefore

  const benefits = [
    { label: 'Fatigue', direction: 'down', icon: HiArrowDown, color: 'text-purple-600' },
    { label: 'Staff Engagement', direction: 'up', icon: HiArrowUp, color: 'text-green-600' },
    { label: 'Clinical Safety', direction: 'up', icon: HiArrowUp, color: 'text-green-600' },
    { label: 'Patient Outcomes', direction: 'up', icon: HiArrowUp, color: 'text-green-600' },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 relative">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left side - Staff profiles and schedules */}
        <div className="flex-[3] w-full">
          <div className="space-y-4 sm:space-y-6">
            {profiles.map((profile, index) => (
              <div key={index} className="flex items-center gap-4">
                {/* Profile */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Schedule Bar */}
                <div className="flex-1">
                  <div className="flex h-12 rounded-lg overflow-hidden shadow-sm">
                    {[1, 2, 3].map((week) => (
                      <div
                        key={week}
                        className={`flex-1 flex items-center justify-center font-medium text-xs sm:text-sm transition-all duration-500 ${
                          profile.weekendsOff.includes(week)
                            ? 'bg-gray-300 text-gray-700'
                            : 'text-gray-700'
                        }`}
                        style={{
                          backgroundColor: profile.weekendsOff.includes(week) ? undefined : '#80e7d0'
                        }}
                      >
                        <span className="text-center">{profile.weekendsOff.includes(week) ? `Week ${week}` : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Optimization Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsOptimized(!isOptimized)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 text-xs rounded-lg font-medium transition-colors border border-gray-300"
            >
              {isOptimized ? '← View Before Optimization' : 'View After Optimization →'}
            </button>
          </div>

          {/* Legend - desktop only */}
          <div className="hidden lg:flex gap-6 mt-6 text-sm justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-gray-700">Weekend Off</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#80e7d0' }} />
              <span className="text-gray-700">Weekend On</span>
            </div>
          </div>
        </div>

        {/* Benefits - positioned below on mobile */}
        <div className={`rounded-lg p-4 sm:p-5 flex-[1.2] w-full lg:w-auto transition-all duration-500 ${
          isOptimized ? 'bg-gray-50' : 'bg-gray-100'
        }`}>
          <h4 className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base transition-colors duration-500 ${
            isOptimized ? 'text-gray-900' : 'text-gray-500'
          }`}>Benefits</h4>
          <div className="space-y-2 sm:space-y-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className={`text-sm sm:text-base transition-colors duration-500 ${
                    isOptimized ? 'text-gray-700' : 'text-gray-400'
                  }`}>{benefit.label}</span>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                    isOptimized ? benefit.color : 'text-gray-400'
                  }`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Legend - mobile only, positioned after benefits */}
      <div className="flex lg:hidden gap-4 sm:gap-6 mt-6 text-xs sm:text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <span className="text-gray-700">Weekend Off</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#80e7d0' }} />
          <span className="text-gray-700">Weekend On</span>
        </div>
      </div>
    </div>
  )
}