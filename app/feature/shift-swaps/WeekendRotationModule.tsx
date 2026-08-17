'use client'

import { useEffect, useState } from 'react'
import { HiArrowUp, HiArrowDown } from 'react-icons/hi'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface WeekendRotationModuleProps {
  autoplay?: boolean
  /** How long "before" is held before flipping to "after". */
  autoplayIntervalMs?: number
  /** Cycle back to "before" and replay instead of stopping after one pass. */
  loop?: boolean
  /** How long "after" is held before looping back. Ignored unless `loop`. */
  loopHoldMs?: number
}

export default function WeekendRotationModule({
  autoplay = false,
  autoplayIntervalMs = 3000,
  loop = false,
  loopHoldMs = 3000,
}: WeekendRotationModuleProps = {}) {
  const [isOptimized, setIsOptimized] = useState(false)
  const [playToken, setPlayToken] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!autoplay) return
    setIsOptimized(false)
    setFinished(false)
    const timers: number[] = []
    timers.push(
      window.setTimeout(() => {
        setIsOptimized(true)
        if (loop) {
          // Bumping playToken re-runs this effect, which resets to "before".
          timers.push(
            window.setTimeout(() => setPlayToken((n) => n + 1), loopHoldMs),
          )
        } else {
          setFinished(true)
        }
      }, autoplayIntervalMs),
    )
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [autoplay, autoplayIntervalMs, loop, loopHoldMs, playToken])

  const replay = () => setPlayToken((n) => n + 1)

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
    { label: 'Fatigue', direction: 'down', icon: HiArrowDown, color: 'text-purple-600', oppositeIcon: HiArrowUp },
    { label: 'Staff Engagement', direction: 'up', icon: HiArrowUp, color: 'text-green-600', oppositeIcon: HiArrowDown },
    { label: 'Clinical Safety', direction: 'up', icon: HiArrowUp, color: 'text-green-600', oppositeIcon: HiArrowDown },
    { label: 'Patient Outcomes', direction: 'up', icon: HiArrowUp, color: 'text-green-600', oppositeIcon: HiArrowDown },
  ]

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
        {autoplay && (
          <div className="flex justify-center items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                isOptimized
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isOptimized ? 'After RosterLab' : 'Before RosterLab'}
            </span>
            {finished && (
              <button
                type="button"
                onClick={replay}
                aria-label="Replay animation"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
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
                    {[1, 2, 3].map((week) => {
                      const isOff = profile.weekendsOff.includes(week)
                      const targetBg = isOff
                        ? isOptimized
                          ? '#80e7d0'
                          : '#FCA5A5'
                        : '#D1D5DB' /* gray-300 */
                      // Stagger each row a beat later so the change reads as
                      // sequential rather than a single hard swap.
                      const rowDelay = index * 0.12
                      return (
                        <motion.div
                          key={week}
                          className="flex-1 flex items-center justify-center font-medium text-xs sm:text-sm text-gray-700 overflow-hidden"
                          animate={{ backgroundColor: targetBg }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                            delay: rowDelay,
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {isOff && (
                              <motion.span
                                key={`w${week}-${isOptimized ? 'a' : 'b'}`}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{
                                  duration: 0.35,
                                  ease: 'easeOut',
                                  delay: rowDelay + 0.2,
                                }}
                                className="text-center"
                              >
                                Week {week}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend - desktop only */}
          <div className="hidden lg:flex gap-6 mt-6 text-sm justify-center">
            <div className="flex items-center gap-2">
              <motion.div
            className="w-4 h-4 rounded"
            animate={{ backgroundColor: isOptimized ? '#80e7d0' : '#FCA5A5' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
              <span className="text-gray-700">Weekend Off</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded" />
              <span className="text-gray-700">Weekend On</span>
            </div>
          </div>
        </div>

        {/* Benefits - positioned below on mobile */}
        <div className={`rounded-lg p-3 sm:p-4 md:p-5 flex-1 lg:flex-[1.2] w-full lg:w-auto transition-all duration-500 ${
          isOptimized ? 'bg-gray-50' : 'bg-gray-100'
        }`}>
          <div className="space-y-2 sm:space-y-3">
            {benefits.map((benefit, index) => {
              const Icon = isOptimized ? benefit.icon : benefit.oppositeIcon
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-700">
                    {benefit.label}
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isOptimized ? `${index}-up` : `${index}-down`}
                      initial={{ opacity: 0, y: isOptimized ? 6 : -6, rotate: -20 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      exit={{ opacity: 0, y: isOptimized ? -6 : 6, rotate: 20 }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                        delay: index * 0.07,
                      }}
                      className={`inline-flex ${
                        isOptimized ? benefit.color : 'text-red-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.span>
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
        </div>
      
        {/* Legend - mobile only, positioned after benefits */}
      <div className="flex lg:hidden gap-4 sm:gap-6 mt-6 text-xs sm:text-sm justify-center">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-4 h-4 rounded"
            animate={{ backgroundColor: isOptimized ? '#80e7d0' : '#FCA5A5' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-gray-700">Weekend Off</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <span className="text-gray-700">Weekend On</span>
        </div>
        </div>
      
        {/* Optimisation Button - only shown when not autoplaying */}
        {!autoplay && (
          <div className="flex justify-center mt-4 sm:mt-6">
            <motion.button
              onClick={() => setIsOptimized(!isOptimized)}
              className="px-4 py-3 sm:px-6 sm:py-2.5 text-xs sm:text-sm rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg shadow-md min-h-[44px] sm:min-h-0"
              style={{
                backgroundColor: '#24D9DC',
                color: '#323232'
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, -5, 5, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 3.2,
                ease: "easeInOut"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5AE4E7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#24D9DC';
              }}
            >
              {isOptimized ? '← Before RosterLab' : 'After RosterLab →'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}