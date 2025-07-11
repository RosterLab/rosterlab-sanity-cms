'use client'

import { useState } from 'react'
import { HiLink, HiCheck, HiClipboard, HiShieldCheck, HiRefresh, HiDocument } from 'react-icons/hi'

export default function ShareRosterModule() {
  const [copied, setCopied] = useState(false)
  const [rosterUrl] = useState('https://app.rosterlab.com/roster/8f3a2b9c-e1d7-4f6a-b5c3-9d8e7a1b2c3d')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(rosterUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      {/* Browser Window Chrome */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Browser Header */}
        <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 ml-4">
            <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
              app.rosterlab.com/share-roster
            </div>
          </div>
        </div>
        
        {/* Browser Content */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiLink className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Share My Roster</h3>
              <p className="text-gray-600">Generate a secure link to share your live roster data</p>
            </div>

            {/* URL Display */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Roster Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={rosterUrl}
                  readOnly
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md font-mono text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {copied ? (
                    <>
                      <HiCheck className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <HiClipboard className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Link Settings */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
              <h4 className="font-medium text-gray-900 mb-3">Link Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Expiration</span>
                  <select className="text-sm border border-gray-300 rounded px-3 py-1">
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Access Level</span>
                  <select className="text-sm border border-gray-300 rounded px-3 py-1">
                    <option>View Only</option>
                    <option>View & Export</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Password Protected</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className={`text-center py-3 px-4 rounded-lg transition-all duration-300 ${
              copied 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-50 text-blue-700'
            }`}>
              <p className="text-sm font-medium">
                {copied 
                  ? '✓ Link copied to clipboard!' 
                  : 'Click the copy button to share your roster'
                }
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <HiShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Secure</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <HiRefresh className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Live Data</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <HiDocument className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-xs font-medium text-gray-700">Exportable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}