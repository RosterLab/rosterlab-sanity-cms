'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function StaffingEnvelopeChart() {
  const [isOptimized, setIsOptimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Chart dimensions - responsive
  const width = isMobile ? 350 : 800
  const height = isMobile ? 300 : 400
  const padding = { 
    top: 40, 
    right: isMobile ? 20 : 60, 
    bottom: 60, 
    left: isMobile ? 50 : 60 
  }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Days data - fewer on mobile
  const days = isMobile 
    ? [5, 20, 40, 55]
    : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  
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

  // Generate actual staffing data (before and after optimisation)
  // Using deterministic pseudo-random based on day for consistent server/client rendering
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453
    return x - Math.floor(x)
  }

  const beforeData = days.map((day) => ({
    day,
    value: Math.min(40, idealStaff + (Math.sin(day / 10) * 12) + (pseudoRandom(day) * 8 - 4))
  }))

  const afterData = days.map((day) => ({
    day,
    value: idealStaff + (Math.sin(day / 30) * 1.5) + (pseudoRandom(day + 100) * 1 - 0.5)
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
    <div className="w-full flex justify-center overflow-x-auto">
      <div className="flex flex-col items-center min-w-fit">
        <svg width={width} height={height} className="block max-w-full">
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
              x={chartWidth * (isMobile ? 0.20 : 0.12)}
              y={yScale(38)}
              textAnchor="middle"
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium fill-pink-700`}
            >
              OVERSTAFFED
            </text>
            
            <text
              x={chartWidth * (isMobile ? 0.20 : 0.12)}
              y={yScale(27.5)}
              textAnchor="middle"
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium fill-gray-700`}
            >
              IDEAL RANGE
            </text>
            
            <text
              x={chartWidth * (isMobile ? 0.20 : 0.12)}
              y={yScale(18)}
              textAnchor="middle"
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium fill-blue-700`}
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
              y={isMobile ? -35 : -40}
              textAnchor="middle"
              transform="rotate(-90)"
              className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium fill-gray-700`}
            >
              {isMobile ? 'Staff' : 'Staffing Numbers'}
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
            } ${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-2 text-sm'} rounded-lg font-medium transition-colors border border-gray-300`}
          >
            {isOptimized 
              ? isMobile ? '← Before' : '← View Before Optimization' 
              : isMobile ? 'After →' : 'View After Optimization →'}
          </button>
        </div>
      </div>
    </div>
  )
}