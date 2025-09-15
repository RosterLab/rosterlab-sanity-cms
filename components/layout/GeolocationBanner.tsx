'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HiX } from 'react-icons/hi'

export default function GeolocationBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const pathname = usePathname()
  
  const isUSPath = pathname.startsWith('/us/')
  const isUSUser = detectedCountry === 'US'
  
  useEffect(() => {
    // Check if user already made a choice
    const userChoice = localStorage.getItem('country-preference')
    if (userChoice) {
      return
    }

    // Fetch detected country from API endpoint
    fetch('/api/geo')
      .then(res => res.json())
      .then(data => {
        if (data.country) {
          setDetectedCountry(data.country)
          
          // Show banner if there's a mismatch
          if ((data.country === 'US' && !isUSPath) || (data.country !== 'US' && isUSPath)) {
            setShowBanner(true)
          }
        }
      })
      .catch(() => {
        // Silently fail if geo detection is not available
      })
  }, [isUSPath])

  const handleChoice = (stayOnCurrent: boolean) => {
    // Save user preference
    localStorage.setItem('country-preference', stayOnCurrent ? 'current' : 'suggested')
    setShowBanner(false)
  }

  const getSuggestedPath = () => {
    if (isUSUser && !isUSPath) {
      // Suggest US version
      return '/us' + pathname
    } else if (!isUSUser && isUSPath) {
      // Suggest AU/NZ version
      return pathname.replace('/us', '')
    }
    return pathname
  }

  const getSuggestedVersion = () => {
    if (isUSUser && !isUSPath) {
      return 'United States'
    } else if (!isUSUser && isUSPath) {
      return 'Australia/New Zealand'
    }
    return ''
  }

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary-900 text-white py-3 px-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        <div className="flex-1 text-sm md:text-base">
          <p>
            It looks like you're visiting from <strong>{isUSUser ? 'the United States' : 'outside the US'}</strong>.
            Would you like to view our <strong>{getSuggestedVersion()}</strong> website?
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <Link
            href={getSuggestedPath()}
            onClick={() => handleChoice(false)}
            className="bg-white text-primary-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            Yes, take me there
          </Link>
          <button
            onClick={() => handleChoice(true)}
            className="text-white hover:text-gray-300 transition-colors text-sm whitespace-nowrap"
          >
            No, stay here
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white hover:text-gray-300 transition-colors ml-2"
            aria-label="Close banner"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}