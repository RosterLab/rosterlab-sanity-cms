'use client'

import { useState, useEffect } from 'react'
import { HiRefresh, HiCheck, HiLightningBolt } from 'react-icons/hi'

interface Shift {
  id: string
  type: 'day' | 'evening' | 'night' | 'off'
  label: string
  color: string
  bgColor: string
}

interface StaffMember {
  id: string
  name: string
  role: string
  shifts: { [key: string]: string }
}

const shiftTypes: { [key: string]: Shift } = {
  day: { id: 'day', type: 'day', label: 'Day', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  evening: { id: 'evening', type: 'evening', label: 'Eve', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  night: { id: 'night', type: 'night', label: 'Night', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  off: { id: 'off', type: 'off', label: 'Off', color: 'text-gray-500', bgColor: 'bg-gray-100' }
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const initialStaff: StaffMember[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Chen', 
    role: 'Senior Doctor',
    shifts: { Mon: 'day', Tue: 'day', Wed: 'evening', Thu: 'evening', Fri: 'day', Sat: 'off', Sun: 'off' }
  },
  { 
    id: '2', 
    name: 'Dr. James Wilson', 
    role: 'Senior Doctor',
    shifts: { Mon: 'night', Tue: 'night', Wed: 'off', Thu: 'off', Fri: 'evening', Sat: 'day', Sun: 'day' }
  },
  { 
    id: '3', 
    name: 'RN Alice Johnson', 
    role: 'Charge Nurse',
    shifts: { Mon: 'day', Tue: 'evening', Wed: 'day', Thu: 'night', Fri: 'off', Sat: 'off', Sun: 'day' }
  },
  { 
    id: '4', 
    name: 'RN Michael Brown', 
    role: 'Staff Nurse',
    shifts: { Mon: 'evening', Tue: 'night', Wed: 'night', Thu: 'off', Fri: 'day', Sat: 'day', Sun: 'evening' }
  },
  { 
    id: '5', 
    name: 'Dr. Emma Davis', 
    role: 'Junior Doctor',
    shifts: { Mon: 'off', Tue: 'day', Wed: 'day', Thu: 'evening', Fri: 'night', Sat: 'night', Sun: 'off' }
  },
  { 
    id: '6', 
    name: 'RN David Lee', 
    role: 'Staff Nurse',
    shifts: { Mon: 'day', Tue: 'off', Wed: 'evening', Thu: 'day', Fri: 'day', Sat: 'evening', Sun: 'night' }
  }
]

const optimizedStaff: StaffMember[] = [
  { 
    id: '1', 
    name: 'Dr. Sarah Chen', 
    role: 'Senior Doctor',
    shifts: { Mon: 'day', Tue: 'day', Wed: 'day', Thu: 'off', Fri: 'off', Sat: 'evening', Sun: 'evening' }
  },
  { 
    id: '2', 
    name: 'Dr. James Wilson', 
    role: 'Senior Doctor',
    shifts: { Mon: 'evening', Tue: 'evening', Wed: 'off', Thu: 'day', Fri: 'day', Sat: 'off', Sun: 'night' }
  },
  { 
    id: '3', 
    name: 'RN Alice Johnson', 
    role: 'Charge Nurse',
    shifts: { Mon: 'day', Tue: 'off', Wed: 'evening', Thu: 'day', Fri: 'night', Sat: 'off', Sun: 'day' }
  },
  { 
    id: '4', 
    name: 'RN Michael Brown', 
    role: 'Staff Nurse',
    shifts: { Mon: 'night', Tue: 'day', Wed: 'day', Thu: 'evening', Fri: 'off', Sat: 'day', Sun: 'off' }
  },
  { 
    id: '5', 
    name: 'Dr. Emma Davis', 
    role: 'Junior Doctor',
    shifts: { Mon: 'off', Tue: 'night', Wed: 'night', Thu: 'day', Fri: 'evening', Sat: 'day', Sun: 'off' }
  },
  { 
    id: '6', 
    name: 'RN David Lee', 
    role: 'Staff Nurse',
    shifts: { Mon: 'day', Tue: 'evening', Wed: 'off', Thu: 'night', Fri: 'day', Sat: 'night', Sun: 'day' }
  }
]

export default function SchedulingModule() {
  const [staff, setStaff] = useState(initialStaff)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimized, setIsOptimized] = useState(false)
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set())

  const startOptimization = () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)
    setAnimatingCells(new Set())

    // Simulate optimisation progress
    const progressInterval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    // Animate cells changing
    setTimeout(() => {
      const cellsToAnimate = new Set<string>()
      optimizedStaff.forEach((optimizedMember) => {
        const originalMember = initialStaff.find(m => m.id === optimizedMember.id)
        if (originalMember) {
          daysOfWeek.forEach(day => {
            if (originalMember.shifts[day] !== optimizedMember.shifts[day]) {
              cellsToAnimate.add(`${optimizedMember.id}-${day}`)
            }
          })
        }
      })
      setAnimatingCells(cellsToAnimate)
    }, 1000)

    // Apply optimized schedule
    setTimeout(() => {
      setStaff(optimizedStaff)
      setIsOptimized(true)
      setIsOptimizing(false)
      setAnimatingCells(new Set())
    }, 2500)
  }

  const resetSchedule = () => {
    setStaff(initialStaff)
    setIsOptimized(false)
    setOptimizationProgress(0)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Emergency Department Schedule</h3>
            <p className="text-sm text-blue-100 mt-1">Week of October 14-20, 2024</p>
          </div>
          <div className="flex items-center gap-3">
            {!isOptimizing && !isOptimized && (
              <button
                onClick={startOptimization}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <HiLightningBolt className="w-4 h-4" />
                Optimize Schedule
              </button>
            )}
            {isOptimized && (
              <>
                <span className="text-white text-sm flex items-center gap-2">
                  <HiCheck className="w-5 h-5" />
                  Optimized
                </span>
                <button
                  onClick={resetSchedule}
                  className="bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <HiRefresh className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Optimization Progress */}
      {isOptimizing && (
        <div className="bg-blue-50 px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">Optimizing schedule...</span>
            <span className="text-sm text-blue-600">{optimizationProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${optimizationProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Schedule Grid */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-l-lg">Staff Member</th>
                {daysOfWeek.map(day => (
                  <th key={day} className="text-center py-3 px-2 font-semibold text-gray-700 bg-gray-50 last:rounded-r-lg">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((member, index) => (
                <tr key={member.id} className={index % 2 === 0 ? 'bg-gray-50/50' : ''}>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </td>
                  {daysOfWeek.map(day => {
                    const shift = shiftTypes[member.shifts[day]]
                    const isAnimating = animatingCells.has(`${member.id}-${day}`)
                    return (
                      <td key={day} className="py-2 px-2">
                        <div 
                          className={`
                            ${shift.bgColor} ${shift.color} 
                            text-center py-2 px-3 rounded-lg text-sm font-medium
                            transition-all duration-500
                            ${isAnimating ? 'scale-110 shadow-lg animate-pulse' : ''}
                          `}
                        >
                          {shift.label}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {isOptimized ? '100%' : '78%'}
            </p>
            <p className="text-sm text-gray-600 mt-1">Coverage Score</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {isOptimized ? '0' : '3'}
            </p>
            <p className="text-sm text-gray-600 mt-1">Compliance Issues</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {isOptimized ? '98%' : '72%'}
            </p>
            <p className="text-sm text-gray-600 mt-1">Staff Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  )
}