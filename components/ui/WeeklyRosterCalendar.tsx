'use client'

import { useState } from 'react'

type ShiftType = 'Morning' | 'Evening' | 'Off'
type DayType = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

export default function WeeklyRosterCalendar() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showShifts, setShowShifts] = useState(false)

  const days: DayType[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const staff = ['Sarah M.', 'James L.', 'Emma W.', 'Michael R.', 'Lisa K.'] as const
  
  const shifts: Record<typeof staff[number], Record<DayType, ShiftType>> = {
    'Sarah M.': { Mon: 'Morning', Tue: 'Morning', Wed: 'Off', Thu: 'Evening', Fri: 'Morning', Sat: 'Off', Sun: 'Off' },
    'James L.': { Mon: 'Evening', Tue: 'Off', Wed: 'Morning', Thu: 'Morning', Fri: 'Evening', Sat: 'Morning', Sun: 'Off' },
    'Emma W.': { Mon: 'Off', Tue: 'Evening', Wed: 'Evening', Thu: 'Off', Fri: 'Morning', Sat: 'Evening', Sun: 'Morning' },
    'Michael R.': { Mon: 'Morning', Tue: 'Morning', Wed: 'Morning', Thu: 'Off', Fri: 'Off', Sat: 'Morning', Sun: 'Evening' },
    'Lisa K.': { Mon: 'Off', Tue: 'Evening', Wed: 'Off', Thu: 'Evening', Fri: 'Evening', Sat: 'Off', Sun: 'Morning' }
  }

  const shiftColors: Record<ShiftType, string> = {
    'Morning': 'bg-blue-100 text-blue-700',
    'Evening': 'bg-purple-100 text-purple-700',
    'Off': 'bg-gray-50 text-gray-400'
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setShowShifts(true)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Weekly Roster</h3>
        <p className="text-sm text-blue-100 mt-1">Oct 14 - Oct 20, 2024</p>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Staff</th>
                {days.map(day => (
                  <th key={day} className="text-center py-3 px-2 font-medium text-gray-700 min-w-[80px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((person, idx) => (
                <tr key={person} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 font-medium text-gray-900">{person}</td>
                  {days.map(day => (
                    <td key={day} className="text-center py-3 px-2">
                      {showShifts ? (
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${shiftColors[shifts[person][day]]}`}>
                          {shifts[person][day]}
                        </span>
                      ) : (
                        <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-center">
          {!showShifts ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Roster
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-medium mb-2 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Roster Generated!
              </p>
              <button
                onClick={() => setShowShifts(false)}
                className="text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Generate Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}