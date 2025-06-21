'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiCheck } from 'react-icons/hi'

export default function GenerateRosterButton() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (isComplete) {
      router.push('/demo')
      return
    }

    setIsGenerating(true)
    
    // Simulate AI generation process
    setTimeout(() => {
      setIsGenerating(false)
      setIsComplete(true)
    }, 3000)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        relative px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-500 transform
        ${isGenerating 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105 animate-pulse' 
          : isComplete 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
        ${!isGenerating && !isComplete ? 'hover:scale-105' : ''}
        shadow-xl hover:shadow-2xl
      `}
      disabled={isGenerating}
    >
      <span className={`flex items-center justify-center gap-3 ${isGenerating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {isComplete ? (
          <>
            <HiCheck className="w-6 h-6" />
            Roster ready to view
          </>
        ) : (
          'Generate my roster'
        )}
      </span>
      
      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </button>
  )
}