'use client'

import { useEffect, useRef, useState } from 'react'

export default function ContactFormWrapper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "20646833",
        formId: "77e5a8c4-4303-4681-8c92-afa7b070380c",
        region: "na1",
        target: "#contact-form-container"
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "77e5a8c4-4303-4681-8c92-afa7b070380c",
          region: "na1",
          target: "#contact-form-container"
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [isVisible])

  return <div ref={containerRef} id="contact-form-container" style={{ minHeight: '100px' }}>
    <p className="text-sm text-gray-500">Loading form...</p>
  </div>
}