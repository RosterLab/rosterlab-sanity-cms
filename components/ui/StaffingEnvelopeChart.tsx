'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function StaffingEnvelopeChart() {
  const [isOptimized, setIsOptimized] = useState(false)

  // Chart dimensions
  const width = 800
  const height = 400
  const padding = { top: 40, right: 60, bottom: 60, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Days data
  const days = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  
  // Staffing data
  const baseMinStaff = 25
  const baseMaxStaff = 30
  const idealStaff = 27.5

  // Generate slightly varied min/max lines
  const minStaffData = days.map((day) => ({
    day,
    value: baseMinStaff + (Math.sin(day / 20) * 1) + (Math.cos(day / 15) * 0.5)
  }))

  const maxStaffData = days.map((day) => ({
    day,
    value: baseMaxStaff + (Math.sin(day / 25) * 1) + (Math.cos(day / 18) * 0.5)
  }))

  // Generate actual staffing data (before and after optimization)
  const beforeData = days.map((day) => ({
    day,
    value: idealStaff + (Math.sin(day / 10) * 12) + (Math.random() * 8 - 4)
  }))

  const afterData = days.map((day) => ({
    day,
    value: idealStaff + (Math.sin(day / 30) * 1.5) + (Math.random() * 1 - 0.5)
  }))

  const currentData = isOptimized ? afterData : beforeData

  // Scale functions
  const xScale = (day: number) => ((day - 5) / 50) * chartWidth
  const yScale = (value: number) => chartHeight - ((value - 10) / 35) * chartHeight

  // Create path for actual staffing line
  const linePath = currentData
    .map((point, index) => {
      const x = xScale(point.day)
      const y = yScale(point.value)
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  // Create paths for min/max lines
  const minLinePath = minStaffData
    .map((point, index) => {
      const x = xScale(point.day)
      const y = yScale(point.value)
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  const maxLinePath = maxStaffData
    .map((point, index) => {
      const x = xScale(point.day)
      const y = yScale(point.value)
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center">
        <svg width={width} height={height} className="block">
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid lines */}
            {[15, 20, 25, 30, 35, 40].map((value) => (
              <g key={value}>
                <line
                  x1={0}
                  y1={yScale(value)}
                  x2={chartWidth}
                  y2={yScale(value)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x={-10}
                  y={yScale(value) + 5}
                  textAnchor="end"
                  className="text-sm fill-gray-600"
                >
                  {value}
                </text>
              </g>
            ))}

            {/* Envelope areas */}
            {/* Below minimum - light blue */}
            <path
              d={`${minLinePath} L ${xScale(55)} ${yScale(10)} L ${xScale(5)} ${yScale(10)} Z`}
              fill="#DBEAFE"
              opacity="0.5"
            />

            {/* Above maximum - light pink */}
            <path
              d={`${maxLinePath} L ${xScale(55)} ${yScale(40)} L ${xScale(5)} ${yScale(40)} Z`}
              fill="#FCE7F3"
              opacity="0.5"
            />

            {/* Ideal range - white (between min and max) */}
            <path
              d={`${minLinePath} ${maxStaffData.slice().reverse().map((point, index) => {
                const x = xScale(point.day)
                const y = yScale(point.value)
                return index === 0 ? `L ${x} ${y}` : `L ${x} ${y}`
              }).join(' ')} Z`}
              fill="#FFFFFF"
              stroke="#e5e7eb"
              strokeWidth="1"
            />

            {/* Min and Max lines */}
            <path
              d={minLinePath}
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
            />
            <path
              d={maxLinePath}
              fill="none"
              stroke="#F9A8D4"
              strokeWidth="2"
            />

            {/* Actual staffing line */}
            <path
              d={linePath}
              fill="none"
              stroke="#000000"
              strokeWidth="3"
            />

            {/* Data points */}
            {currentData.map((point) => (
              <circle
                key={point.day}
                cx={xScale(point.day)}
                cy={yScale(point.value)}
                r="5"
                fill="#000000"
              />
            ))}

            {/* Area labels */}
            <text
              x={chartWidth * 0.15}
              y={yScale(38)}
              textAnchor="middle"
              className="text-sm font-medium fill-pink-700"
            >
              OVERSTAFFED
            </text>
            
            <text
              x={chartWidth * 0.15}
              y={yScale(27.5)}
              textAnchor="middle"
              className="text-sm font-medium fill-gray-700"
            >
              IDEAL STAFFING RANGE
            </text>
            
            <text
              x={chartWidth * 0.15}
              y={yScale(18)}
              textAnchor="middle"
              className="text-sm font-medium fill-blue-700"
            >
              UNDERSTAFFED
            </text>

            {/* X-axis labels */}
            {days.map((day) => (
              <text
                key={day}
                x={xScale(day)}
                y={chartHeight + 20}
                textAnchor="middle"
                className="text-sm fill-gray-600"
              >
                {day}
              </text>
            ))}

            {/* Axis labels */}
            <text
              x={chartWidth / 2}
              y={chartHeight + 50}
              textAnchor="middle"
              className="text-sm font-medium fill-gray-700"
            >
              Days
            </text>
            <text
              x={-chartHeight / 2}
              y={-40}
              textAnchor="middle"
              transform="rotate(-90)"
              className="text-sm font-medium fill-gray-700"
            >
              Staffing Numbers
            </text>
          </g>

        </svg>

        {/* Optimization Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsOptimized(!isOptimized)}
            className={`${
              isOptimized 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } px-6 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300`}
          >
            {isOptimized ? '← View Before Optimization' : 'View After Optimization →'}
          </button>
        </div>
      </div>
    </div>
  )
}