'use client'

import { useState, useEffect } from 'react'
import { HiUser, HiSwitchHorizontal } from 'react-icons/hi'

export default function ShiftSwapModule() {
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapComplete, setSwapComplete] = useState(false)

  const handleSwap = () => {
    setIsSwapping(true)
    setSwapComplete(false)
    
    setTimeout(() => {
      setIsSwapping(false)
      setSwapComplete(true)
      
      setTimeout(() => {
        setSwapComplete(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Seamless Shift Swapping</h3>
        <p className="text-gray-600">Watch how easily staff can swap shifts with automatic approval</p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Doctor 1 */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-1000"
          style={{
            transform: `translateY(-50%) translateX(${isSwapping ? '400px' : '0'})`,
            willChange: isSwapping ? 'transform' : 'auto'
          }}
        >
          <div className="bg-blue-100 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiUser className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Dr. Smith</p>
            <p className="text-sm text-gray-600 mt-1">Morning Shift</p>
            <p className="text-xs text-gray-500 mt-1">7:00 AM - 3:00 PM</p>
          </div>
        </div>

        {/* Doctor 2 */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-1000"
          style={{
            transform: `translateY(-50%) translateX(${isSwapping ? '-400px' : '0'})`,
            willChange: isSwapping ? 'transform' : 'auto'
          }}
        >
          <div className="bg-teal-100 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <HiUser className="w-10 h-10 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Dr. Johnson</p>
            <p className="text-sm text-gray-600 mt-1">Evening Shift</p>
            <p className="text-xs text-gray-500 mt-1">3:00 PM - 11:00 PM</p>
          </div>
        </div>

        {/* Center Swap Icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className="transition-transform duration-500"
            style={{
              transform: isSwapping ? 'scale(1.5) rotate(180deg)' : 'scale(1) rotate(0deg)',
              willChange: isSwapping ? 'transform' : 'auto'
            }}
          >
            <HiSwitchHorizontal className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        {/* Arrows */}
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 ${isSwapping ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Arrow (left to right) */}
          <div className="absolute -top-12 left-0 w-full">
            <svg className="w-full h-12" viewBox="0 0 400 50">
              <path
                d="M 50 25 Q 200 -20 350 25"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="animate-dash"
              />
              <polygon
                points="345,20 355,25 345,30"
                fill="#3B82F6"
                className="animate-arrow-move"
              />
            </svg>
          </div>
          
          {/* Bottom Arrow (right to left) */}
          <div className="absolute -bottom-12 left-0 w-full">
            <svg className="w-full h-12" viewBox="0 0 400 50">
              <path
                d="M 350 25 Q 200 70 50 25"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="animate-dash"
              />
              <polygon
                points="55,20 45,25 55,30"
                fill="#14B8A6"
                className="animate-arrow-move-reverse"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        {swapComplete && (
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 animate-fade-in">
            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium">
              ✓ Shift swap approved and confirmed!
            </div>
          </div>
        )}

        {/* Spacer for layout */}
        <div className="h-48"></div>
      </div>

      <div className="text-center mt-16">
        <button
          onClick={handleSwap}
          disabled={isSwapping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSwapping ? 'Swapping...' : 'Initiate Shift Swap'}
        </button>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -10;
          }
        }
        
        @keyframes arrow-move {
          from {
            transform: translateX(-300px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes arrow-move-reverse {
          from {
            transform: translateX(300px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-dash {
          animation: dash 1.5s linear infinite;
        }
        
        .animate-arrow-move {
          animation: arrow-move 1.5s ease-out;
        }
        
        .animate-arrow-move-reverse {
          animation: arrow-move-reverse 1.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  )
}