'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HiGlobeAlt, HiChevronDown } from 'react-icons/hi'
import { US_URL_MAPPINGS, REVERSE_US_MAPPINGS } from '@/components/seo/HreflangTags'
import { cn } from '@/lib/utils'

export default function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  
  // Determine current locale - check both /us and /us/
  const isUSVersion = pathname === '/us' || pathname.startsWith('/us/')
  const currentLocale = isUSVersion ? 'US' : 'AU/NZ'
  
  // Get URLs for both versions
  const getAUNZUrl = () => {
    // If we're on a US page, convert back to AU/NZ
    if (isUSVersion) {
      // First check if we have a specific reverse mapping
      if (REVERSE_US_MAPPINGS[pathname]) {
        return REVERSE_US_MAPPINGS[pathname]
      }
      
      // Handle the /us homepage
      if (pathname === '/us' || pathname === '/us/') {
        return '/'
      }
      
      // Otherwise, remove the /us prefix
      return pathname.replace(/^\/us\/?/, '/')
    }
    
    // Already on AU/NZ version
    return pathname
  }
  
  const getUSUrl = () => {
    // If we're on an AU/NZ page, convert to US
    if (!isUSVersion) {
      // First check if we have a specific mapping
      if (US_URL_MAPPINGS[pathname]) {
        return US_URL_MAPPINGS[pathname]
      }
      
      // Handle the homepage
      if (pathname === '/') {
        return '/us/'
      }
      
      // Otherwise, add the /us prefix
      return `/us${pathname}`
    }
    
    // Already on US version
    return pathname
  }
  
  const auNzUrl = getAUNZUrl()
  const usUrl = getUSUrl()
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
        aria-label="Select country/region"
      >
        <HiGlobeAlt className="w-5 h-5" />
        <span>{currentLocale}</span>
        <HiChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            <Link
              href={auNzUrl}
              className={cn(
                "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                !isUSVersion ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between">
                <span>Australia/NZ</span>
                {!isUSVersion && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </Link>
            <Link
              href={usUrl}
              className={cn(
                "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                isUSVersion ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between">
                <span>United States</span>
                {isUSVersion && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}