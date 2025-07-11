'use client'

import { useState, useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'
import Image from 'next/image'

export default function StaffRetentionModule() {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Chart dimensions
  const width = 400
  const height = 200
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Data points for the three metrics
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  
  // Starting values (high) and ending values (low) for animation
  const preferencesData = months.map((_, i) => ({
    month: i,
    startValue: 95 - (i * 2),
    endValue: 65 - (i * 5)
  }))

  const engagementData = months.map((_, i) => ({
    month: i,
    startValue: 92 - (i * 1.5),
    endValue: 60 - (i * 4)
  }))

  const absencesData = months.map((_, i) => ({
    month: i,
    startValue: 88 - (i * 2.5),
    endValue: 55 - (i * 6)
  }))

  // Scale functions
  const xScale = (index: number) => (index / (months.length - 1)) * chartWidth
  const yScale = (value: number) => chartHeight - ((value - 30) / 70) * chartHeight

  // Create path for lines
  const createPath = (data: any[], useEndValue: boolean) => {
    return data
      .map((point, index) => {
        const x = xScale(index)
        const y = yScale(useEndValue ? point.endValue : point.startValue)
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
      })
      .join(' ')
  }

  const benefits = [
    {
      text: "High percentage of preferences met",
      color: "text-blue-600"
    },
    {
      text: "Improved staff engagement and satisfaction",
      color: "text-green-600"
    },
    {
      text: "Less shift swaps and unnecessary absences",
      color: "text-purple-600"
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Image */}
      <div className="mb-6 flex justify-center">
        <Image
          src="/images/illustration/reduce_turnover.svg"
          alt="Improve staff retention"
          width={400}
          height={320}
          className="w-full h-auto max-w-md"
        />
      </div>

      {/* Line Chart */}
      <div className="mb-8">
        <svg width={width} height={height} className="w-full h-auto" viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid lines */}
            {[40, 50, 60, 70, 80, 90].map((value) => (
              <line
                key={value}
                x1={0}
                y1={yScale(value)}
                x2={chartWidth}
                y2={yScale(value)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {[40, 60, 80].map((value) => (
              <text
                key={value}
                x={-10}
                y={yScale(value) + 4}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {value}%
              </text>
            ))}

            {/* X-axis labels */}
            {months.map((month, index) => (
              <text
                key={month}
                x={xScale(index)}
                y={chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {month}
              </text>
            ))}

            {/* Animated lines */}
            {/* Preferences line - Blue */}
            <path
              d={createPath(preferencesData, isAnimated)}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              className="transition-all duration-2000 ease-out"
            />

            {/* Engagement line - Green */}
            <path
              d={createPath(engagementData, isAnimated)}
              fill="none"
              stroke="#16a34a"
              strokeWidth="3"
              className="transition-all duration-2000 ease-out"
            />

            {/* Absences line - Purple */}
            <path
              d={createPath(absencesData, isAnimated)}
              fill="none"
              stroke="#9333ea"
              strokeWidth="3"
              className="transition-all duration-2000 ease-out"
            />

            {/* Data points */}
            {months.map((_, index) => (
              <g key={index}>
                {/* Preferences points */}
                <circle
                  cx={xScale(index)}
                  cy={yScale(isAnimated ? preferencesData[index].endValue : preferencesData[index].startValue)}
                  r="4"
                  fill="#2563eb"
                  className="transition-all duration-2000 ease-out"
                />
                {/* Engagement points */}
                <circle
                  cx={xScale(index)}
                  cy={yScale(isAnimated ? engagementData[index].endValue : engagementData[index].startValue)}
                  r="4"
                  fill="#16a34a"
                  className="transition-all duration-2000 ease-out"
                />
                {/* Absences points */}
                <circle
                  cx={xScale(index)}
                  cy={yScale(isAnimated ? absencesData[index].endValue : absencesData[index].startValue)}
                  r="4"
                  fill="#9333ea"
                  className="transition-all duration-2000 ease-out"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Benefits List */}
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${
              index === 0 ? 'bg-blue-100' : 
              index === 1 ? 'bg-green-100' : 
              'bg-purple-100'
            } flex items-center justify-center flex-shrink-0`}>
              <HiCheck className={`w-5 h-5 ${benefit.color}`} />
            </div>
            <span className="text-gray-700 font-medium">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}