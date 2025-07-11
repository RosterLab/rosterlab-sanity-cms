'use client'

import { useEffect, useState, useMemo } from 'react'

export default function AnimatedSpeechBubbles() {
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([])
  const [key, setKey] = useState(0)

  const messages = useMemo(() => [
    { id: 1, text: "Can you swap shift with me?", position: "left", delay: 0 },
    { id: 2, text: "Sure, what time are you thinking?", position: "right", delay: 1500 },
    { id: 3, text: "Night shift next Thursday.", position: "left", delay: 3000 },
    { id: 4, text: "Perfect, I'll swap with you!", position: "right", delay: 4500 },
    { id: 5, text: "Amazing, thank you!!! I've sent the swap on RosterLab ❤️", position: "left", delay: 6000 }
  ], [])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    messages.forEach((message) => {
      const timer = setTimeout(() => {
        setVisibleBubbles(prev => [...prev, message.id])
      }, message.delay)
      timers.push(timer)
    })

    const resetTimer = setTimeout(() => {
      setVisibleBubbles([])
      setKey(prev => prev + 1)
    }, 8500)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      clearTimeout(resetTimer)
    }
  }, [key, messages])

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
      <div className="w-full max-w-md px-8">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={`${message.id}-${key}`}
              className={`flex ${message.position === 'right' ? 'justify-end' : 'justify-start'} 
                ${visibleBubbles.includes(message.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                transition-all duration-500 ease-out`}
            >
              <div className={`relative max-w-xs px-4 py-3 rounded-2xl shadow-md
                ${message.position === 'right' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800'}`}
              >
                <p className="text-sm font-medium">{message.text}</p>
                
                {/* Speech bubble tail */}
                <div className={`absolute bottom-0 ${message.position === 'right' ? 'right-4' : 'left-4'} 
                  transform translate-y-1/2`}>
                  <div className={`w-0 h-0 border-l-[10px] border-l-transparent 
                    border-r-[10px] border-r-transparent border-t-[10px]
                    ${message.position === 'right' 
                      ? 'border-t-blue-600' 
                      : 'border-t-white'}`} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}