'use client'

import { useEffect } from 'react'

export default function ContactFormWrapper() {
  useEffect(() => {
    // Check if HubSpot is already loaded
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "20646833",
        formId: "77e5a8c4-4303-4681-8c92-afa7b070380c",
        region: "na1",
        target: "#contact-form-container"
      })
      return
    }
    
    // Create script element
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    
    // When script loads, create the form
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
    
    // Append script to body
    document.body.appendChild(script)
    
    // Cleanup
    return () => {
      // Remove script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return <div id="contact-form-container" style={{ minHeight: '100px' }}>
    <p className="text-sm text-gray-500">Loading form...</p>
  </div>
}