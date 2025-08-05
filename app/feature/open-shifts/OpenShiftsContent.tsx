'use client'

import { useState, useEffect } from 'react'
import { HiCheck, HiBell, HiClock } from 'react-icons/hi'

export default function OpenShiftsContent() {
  const [isPosted, setIsPosted] = useState(false)
  const [acceptedBy, setAcceptedBy] = useState<string | null>(null)
  const [interestedStaff, setInterestedStaff] = useState<string[]>([])
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (isPosted && !acceptedBy) {
      const timer = setInterval(() => {
        setElapsedTime(prev => prev + 1)
        
        // Simulate staff showing interest
        if (elapsedTime === 2 && !interestedStaff.includes('Sarah')) {
          setInterestedStaff(['Sarah'])
        }
        if (elapsedTime === 4 && !interestedStaff.includes('James')) {
          setInterestedStaff(['Sarah', 'James'])
        }
        if (elapsedTime === 6 && !interestedStaff.includes('Emily')) {
          setInterestedStaff(['Sarah', 'James', 'Emily'])
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isPosted, acceptedBy, elapsedTime, interestedStaff])

  const handlePostShift = () => {
    setIsPosted(true)
    setElapsedTime(0)
    setInterestedStaff([])
    setAcceptedBy(null)
  }

  const handleAcceptShift = (staffName: string) => {
    setAcceptedBy(staffName)
  }

  const handleReset = () => {
    setIsPosted(false)
    setAcceptedBy(null)
    setInterestedStaff([])
    setElapsedTime(0)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Open Shift Manager</h3>
            <p className="text-sm text-blue-100 mt-1">Broadcast and fill shifts instantly</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <HiClock className="w-4 h-4" />
            {isPosted && !acceptedBy ? `${elapsedTime}s elapsed` : 'Ready'}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Shift Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Emergency Coverage Needed</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Department</p>
              <p className="text-sm font-semibold text-gray-900">Emergency Department</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shift Time</p>
              <p className="text-sm font-semibold text-gray-900">Tonight 19:00 - 07:00</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Role Required</p>
              <p className="text-sm font-semibold text-gray-900">Registered Nurse</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Pay Rate</p>
              <p className="text-sm font-semibold text-gray-900">1.5x (Night Rate)</p>
            </div>
          </div>
        </div>

        {/* Action Area */}
        {!isPosted ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Staff member called in sick. Need coverage ASAP.</p>
            <button
              onClick={handlePostShift}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <HiBell className="w-5 h-5" />
              Post Open Shift
            </button>
          </div>
        ) : acceptedBy ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <HiCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900">Shift Filled!</p>
                  <p className="text-sm text-green-700">
                    {acceptedBy} accepted the shift • Filled in {elapsedTime} seconds
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Automated actions completed:</p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <HiCheck className="w-4 h-4 text-green-500" />
                  Roster updated automatically
                </li>
                <li className="flex items-center gap-2">
                  <HiCheck className="w-4 h-4 text-green-500" />
                  Confirmation sent to {acceptedBy}
                </li>
                <li className="flex items-center gap-2">
                  <HiCheck className="w-4 h-4 text-green-500" />
                  Other staff notified shift is filled
                </li>
              </ul>
            </div>
            
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Try Another Scenario
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HiBell className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Notifications Sent!</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Push notifications sent to 12 qualified available nurses
                  </p>
                </div>
              </div>
            </div>

            {/* Staff Responses */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Staff Responses:</p>
              
              {interestedStaff.includes('Sarah') && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">SJ</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Sarah Johnson</p>
                        <p className="text-xs text-gray-500">Senior RN • 2s ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptShift('Sarah Johnson')}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}

              {interestedStaff.includes('James') && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">JM</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">James Miller</p>
                        <p className="text-xs text-gray-500">RN • 4s ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptShift('James Miller')}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}

              {interestedStaff.includes('Emily') && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">EC</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Emily Chen</p>
                        <p className="text-xs text-gray-500">RN • 6s ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAcceptShift('Emily Chen')}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}

              {interestedStaff.length === 0 && (
                <p className="text-sm text-gray-500 italic">Waiting for staff responses...</p>
              )}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel broadcast
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}