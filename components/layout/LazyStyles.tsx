'use client'

import { useEffect } from 'react'

export function LazyStyles() {
  useEffect(() => {
    // Lazy load non-critical CSS after page load
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/styles/non-critical.css'
        document.head.appendChild(link)
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '/styles/non-critical.css'
        document.head.appendChild(link)
      }, 1)
    }
  }, [])

  return null
}