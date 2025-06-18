'use client'

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiRefresh, HiShieldCheck, HiBell } from 'react-icons/hi'
import { useState, useEffect } from 'react'


export default function ShiftSwapsPage() {
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
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Intelligent Shift Swaps
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Automate routine swaps, review when it matters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
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
                      <HiShieldCheck className="w-5 h-5 inline mr-1 text-green-500" />
                      Automatically checked for compliance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Automatic Routine Swap Approval Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Routine Swap Approval
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  AI automatically approves standard shift swaps between qualified staff members. Only swaps that impact critical coverage, skills mix, or compliance require manager review.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Instant approval for routine swaps</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Smart detection of critical shifts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reduce management workload by 92%</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Feature Illustration</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Rule-Based Swap Review Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
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
                      {/* Request 1 - Auto-approved */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-sm font-bold text-white">SJ</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Sarah Johnson</p>
                              <p className="text-sm text-gray-600">Registered Nurse • Ward 3B</p>
                            </div>
                          </div>
                          <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            Auto-Approved
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Current Shift</p>
                              <p className="text-sm font-semibold text-gray-900">Monday 14 Oct</p>
                              <p className="text-sm text-gray-600">07:00 - 15:00</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Requested Shift</p>
                              <p className="text-sm font-semibold text-gray-900">Tuesday 15 Oct</p>
                              <p className="text-sm text-gray-600">07:00 - 15:00</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <HiShieldCheck className="w-4 h-4 text-green-600" />
                            <span className="font-medium">All compliance checks passed</span>
                          </div>
                          <span className="text-xs text-gray-500">2 mins ago</span>
                        </div>
                      </div>

                      {/* Request 2 - Needs review */}
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
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Rule-Based Swap Review
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When a swap might break staffing rules or affect critical coverage, managers get a clear, one-click review process with explanations of potential conflicts.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Highlights potential rule violations</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One-click approval or rejection</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Clear explanations of conflicts</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Automated Notifications Section */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automated Notifications
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Staff can request swaps anytime via mobile app. Relevant team members get instant notifications, and approved swaps update across all systems in real-time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Mobile app swap requests</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Push notifications to relevant staff</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Real-time roster updates</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center">
                  {/* iPhone Mockup */}
                  <div className="relative mx-auto">
                    <div className="bg-gray-900 rounded-[3rem] p-4 shadow-2xl" style={{ width: '320px' }}>
                      {/* Phone Screen */}
                      <div className="bg-white rounded-[2.5rem] overflow-hidden relative" style={{ height: '640px' }}>
                        {/* Status Bar */}
                        <div className="bg-white px-6 py-2 flex items-center justify-between text-xs">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.48L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.48H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75l1.48.85 1.48-.85-.85-1.48H14v-1.5h-2.05l.85-1.48-1.48-.85L10 8.47 8.68 7l-1.48.85.85 1.48H6v1.5h2.05l-.85 1.48zm8 0l1.48.85 1.48-.85-.85-1.48H22v-1.5h-2.05l.85-1.48-1.48-.85L18 8.47 16.68 7l-1.48.85.85 1.48H14v1.5h2.05l-.85 1.48z"/>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M1 9l2-2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7l2 2V2h-4v2.586l-3.414-3.414a1 1 0 0 0-1.414 0L11 4.414 7.828 1.172a1 1 0 0 0-1.414 0L3 4.586V2H1v7z"/>
                            </svg>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M2 17h20v2H2zm0-5h20v2H2zm0-5h20v2H2z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* App Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                          <h4 className="text-white font-semibold text-lg">RosterLab</h4>
                          <p className="text-blue-100 text-sm">Your shifts, simplified</p>
                        </div>
                        
                        {/* Notifications */}
                        <div className="px-4 py-3 space-y-3 bg-gray-50">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2">Recent Notifications</p>
                          
                          {/* Notification 1 - New Request */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-slideDown">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiBell className="w-5 h-5 text-amber-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Shift Swap Request</p>
                                <p className="text-xs text-gray-600 mt-0.5">Anna Chen wants to swap shifts with you</p>
                                <p className="text-xs text-gray-500 mt-1">Mon Oct 14, 7AM-3PM → Tue Oct 15, 7AM-3PM</p>
                                <div className="flex gap-2 mt-3">
                                  <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium">
                                    Review
                                  </button>
                                  <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium">
                                    Quick Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">2 minutes ago</p>
                          </div>
                          
                          {/* Notification 2 - Approved */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiCheck className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Shift Swap Approved</p>
                                <p className="text-xs text-gray-600 mt-0.5">Your swap request has been approved</p>
                                <p className="text-xs text-gray-500 mt-1">You're now scheduled for Wed Oct 16, 3PM-11PM</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">1 hour ago</p>
                          </div>
                          
                          {/* Notification 3 - Auto-approved */}
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <HiShieldCheck className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">Auto-Approved Swap</p>
                                <p className="text-xs text-gray-600 mt-0.5">System approved your swap with James</p>
                                <p className="text-xs text-gray-500 mt-1">All compliance checks passed automatically</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-right">3 hours ago</p>
                          </div>
                        </div>
                        
                        {/* Bottom Tab Bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                          <div className="flex items-center justify-around py-2">
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <button className="p-2 text-blue-600">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                            </button>
                            <button className="p-2 text-gray-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Phone Notch */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 h-6 w-40 rounded-full"></div>
                    </div>
                    
                    {/* Floating notification badge */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg animate-bounce">
                      3
                    </div>
                  </div>
                </div>
                
                {/* Add animation keyframes */}
                <style jsx>{`
                  @keyframes slideDown {
                    from {
                      opacity: 0;
                      transform: translateY(-10px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                  }
                `}</style>
              </div>
            </div>
          </Container>
        </div>

        {/* Comprehensive Audit Trail Section */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Audit Trail Visualization</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Comprehensive Audit Trail
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Track who swapped, when, and why. Complete documentation helps resolve disputes and demonstrate compliance with labor regulations.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Complete swap history</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Approval timestamps and reasons</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Compliance documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                The Numbers Speak for Themselves
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">92%</p>
                  <p className="text-xl opacity-90">Reduction in manager time spent on shift changes</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">3.5x</p>
                  <p className="text-xl opacity-90">Increase in successful shift coverage</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Compliance with labor regulations</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Modernize Your Shift Management?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join leading organizations who've transformed their workforce flexibility with intelligent shift swapping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}