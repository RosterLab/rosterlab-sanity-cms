'use client'

import { useState, useEffect } from 'react'
import { HiCheck, HiRefresh, HiShieldCheck, HiBell } from 'react-icons/hi'

export default function ShiftSwapsContent() {
  const [isApproved, setIsApproved] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  
  useEffect(() => {
    if (isGenerating && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const increment = Math.random() * 15 + 5
          return Math.min(prev + increment, 100)
        })
      }, 300)
      return () => clearTimeout(timer)
    } else if (progress >= 100) {
      setTimeout(() => {
        setIsGenerating(false)
      }, 1000)
    }
  }, [isGenerating, progress])
  
  const startGeneration = () => {
    setIsGenerating(true)
    setProgress(0)
  }

  return (
    <>
      {/* Hero Section Interactive Demo */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">Swap Request</span>
              <span className="text-sm text-yellow-600 font-medium">Pending</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Sarah wants to swap her Tuesday shift with yours</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white rounded p-2">
                <p className="text-gray-500">Your shift</p>
                <p className="font-medium">Wed 2PM-10PM</p>
              </div>
              <div className="bg-white rounded p-2">
                <p className="text-gray-500">Their shift</p>
                <p className="font-medium">Tue 6AM-2PM</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-green-600 text-white rounded py-2 text-sm font-medium hover:bg-green-700">
                Accept
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 rounded py-2 text-sm font-medium hover:bg-gray-300">
                Decline
              </button>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            <HiShieldCheck className="w-5 h-5 inline mr-1 text-[#4a9288]" />
            Automatically checked for compliance
          </div>
        </div>
      </div>

      {/* Rule-Based Swap Review Interactive Demo */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Shift Swap Requests</h3>
              <p className="text-sm text-blue-100 mt-1">Manage and approve shift changes</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-lg">
              {isApproved ? '0' : '1'} Pending Review
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Swap Request Cards */}
          <div className="space-y-3">
            {/* Request - Needs review */}
            <div className={`rounded-lg p-4 border transition-all duration-300 ${
              isApproved 
                ? 'bg-gray-50 border-gray-100' 
                : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-white">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael Roberts</p>
                    <p className="text-sm text-gray-600">Senior Nurse • ICU</p>
                  </div>
                </div>
                <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                  isApproved 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-amber-50 border border-amber-300 text-amber-700'
                }`}>
                  {isApproved ? (
                    <>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Manager Approved
                    </>
                  ) : (
                    <>
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      Review Required
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Current Shift</p>
                    <p className="text-sm font-semibold text-gray-900">Wednesday 16 Oct</p>
                    <p className="text-sm text-gray-600">15:00 - 23:00</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Requested Shift</p>
                    <p className="text-sm font-semibold text-gray-900">Thursday 17 Oct</p>
                    <p className="text-sm text-gray-600">23:00 - 07:00</p>
                  </div>
                </div>
              </div>
              
              {!isApproved ? (
                <>
                  <div className="bg-amber-100 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-800">Manager approval required</p>
                        <p className="text-xs text-amber-700 mt-0.5">This swap would result in 48 hours worked this week, exceeding the 40-hour limit</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                    <button 
                      onClick={() => setIsApproved(true)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Approve Override
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <HiShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Approved with override</p>
                      <p className="text-xs text-green-700 mt-0.5">Weekly hours limit exception granted by manager</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">Requested 15 mins ago</span>
                <span className="text-xs text-gray-500">Swap with: Emma Wilson</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}