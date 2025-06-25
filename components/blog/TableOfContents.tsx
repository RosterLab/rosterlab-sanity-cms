'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Get all headings from the article content
    const article = document.querySelector('article')
    if (!article) return

    const headingElements = article.querySelectorAll('h2')
    const headingData: Heading[] = []

    headingElements.forEach((heading) => {
      const text = heading.textContent?.trim() || ''
      const id = heading.id || text.toLowerCase().replace(/\s+/g, '-') || ''
      
      // Only add non-empty headings
      if (text) {
        heading.id = id
        headingData.push({
          id,
          text
        })
      }
    })

    setHeadings(headingData)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 1.0
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-2">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            'block text-sm transition-colors duration-200 py-1',
            activeId === heading.id
              ? 'text-purple-700 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          )}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}