'use client'

import { useEffect, useState } from 'react'

export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setIsPreview(document.cookie.includes('sanity-preview=true'))
  }, [])

  if (!isPreview) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 text-black text-center py-2 px-4">
      <p className="text-sm font-medium">
        Preview Mode Active
        <a
          href="/api/preview/exit"
          className="ml-4 underline hover:no-underline"
        >
          Exit Preview
        </a>
      </p>
    </div>
  )
}