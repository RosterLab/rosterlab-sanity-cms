'use client'

import { useState, useEffect } from 'react'
import { HiCheck, HiX } from 'react-icons/hi'
import Image from 'next/image'

export default function AuditTrailModule() {
  const [step, setStep] = useState(0)
  const [isApproved, setIsApproved] = useState(false)

  // Auto-advance to step 1 after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleApprove = () => {
    setIsApproved(true)
    setTimeout(() => {
      setStep(2)
    }, 500)
  }

  const handleReject = () => {
    setIsApproved(false)
    setTimeout(() => {
      setStep(2)
    }, 500)
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative" style={{ minHeight: '500px' }}>
        {/* Top row - Daniel and Sunny */}
        <div className="flex justify-between mb-32">
          {/* Daniel's Box */}
          <div className={`bg-white rounded-xl shadow-lg p-6 w-64 relative z-10 transition-all duration-500 ${
            step === 0 ? 'opacity-0 transform -translate-x-10' : 'opacity-100 transform translate-x-0'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full mr-3 relative overflow-hidden">
                <Image
                  src="/images/staff profile images/PROFILE1.webp"
                  alt="Daniel"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900">Daniel</span>
            </div>
            <div className="border-t pt-3">
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900 mb-1">Current Shift:</div>
                <div>Wed 15 May • 7:00 AM - 3:00 PM</div>
                <div className="mt-2 font-medium text-gray-900">Requesting:</div>
                <div>Thu 16 May • 3:00 PM - 11:00 PM</div>
              </div>
            </div>
          </div>

          {/* Sunny's Box */}
          <div className={`bg-white rounded-xl shadow-lg p-6 w-64 relative z-10 transition-all duration-500 ${
            step === 0 ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'
          }`}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full mr-3 relative overflow-hidden">
                <Image
                  src="/images/staff profile images/Profile2.webp"
                  alt="Sunny"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900">Sunny</span>
            </div>
            <div className="border-t pt-3">
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-900 mb-1">Current Shift:</div>
                <div>Thu 16 May • 3:00 PM - 11:00 PM</div>
                <div className="mt-2 font-medium text-gray-900">Requesting:</div>
                <div>Wed 15 May • 7:00 AM - 3:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Manager's Box - Bottom center */}
        <div className="flex justify-center">
          <div className={`bg-white rounded-xl shadow-lg p-6 w-64 relative z-10 transition-all duration-500 ${
            step === 0 ? 'opacity-0 transform translate-y-10' : 'opacity-100 transform translate-y-0'
          }`}>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full mb-3 relative overflow-hidden">
                <Image
                  src="/images/staff profile images/Profile3.webp"
                  alt="Manager"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-semibold text-gray-900 mb-4">Manager</span>
              {step === 1 && (
                <>
                  <div className="text-sm text-gray-600 mb-3 text-center">
                    Swap request requires approval
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={handleApprove}
                      className="p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors group"
                    >
                      <HiCheck className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                      onClick={handleReject}
                      className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition-colors group"
                    >
                      <HiX className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </>
              )}
              {step === 2 && (
                <div className={`text-sm font-medium ${
                  isApproved ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isApproved ? 'Swap Approved ✓' : 'Swap Rejected ✗'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Arrow from Daniel to Sunny - positioned below the boxes */}
        <div className={`absolute transition-all duration-500 ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        }`} style={{ top: '140px', left: '50%', transform: 'translateX(-50%)', width: '350px' }}>
          <svg width="100%" height="60">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4a9288" />
              </marker>
            </defs>
            <line x1="30" y1="20" x2="320" y2="20" stroke="#4a9288" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
          <p className="text-sm text-gray-600 text-center -mt-1">Swap sent on 10th May</p>
        </div>

        {/* Other text labels */}
        <div className={`absolute right-8 top-1/2 transform -translate-y-1/2 text-center transition-all duration-500 ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        }`} style={{ zIndex: 2 }}>
          <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded whitespace-nowrap">
            Swap accepted,<br />pending for approval
          </p>
        </div>

        <div className={`absolute left-8 top-1/2 transform -translate-y-1/2 text-center transition-all duration-500 ${
          step === 2 ? 'opacity-100' : 'opacity-0'
        }`} style={{ zIndex: 2 }}>
          <p className={`text-sm bg-gray-50 px-3 py-1 rounded ${
            isApproved ? 'text-green-600' : 'text-red-600'
          }`}>
            {isApproved ? (
              <>Swap approved<br />on 11th May</>
            ) : (
              <>Swap rejected<br />on 11th May</>
            )}
          </p>
        </div>

        {/* Audit Trail Log */}
        {step === 2 && (
          <div className={`absolute bottom-0 left-0 right-0 bg-gray-50 rounded-xl p-4 transition-all duration-500 ${
            step === 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <h3 className="font-semibold text-gray-900 mb-2">Audit Trail</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">10 May 2024, 2:30 PM</span>
                <span className="text-gray-800">Daniel requested swap with Sunny</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">10 May 2024, 3:15 PM</span>
                <span className="text-gray-800">Sunny accepted swap request</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">11 May 2024, 9:00 AM</span>
                <span className={isApproved ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  Manager {isApproved ? 'approved' : 'rejected'} swap
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}