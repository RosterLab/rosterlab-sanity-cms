'use client'

import { useEffect } from 'react'

export default function NewsletterFormWrapper() {
  useEffect(() => {
    // Check if HubSpot is already loaded
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: "20646833",
        formId: "dc7c7138-f03a-40b1-bc97-335fc28ddcd6",
        region: "na1",
        target: "#newsletter-form-container"
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
          formId: "dc7c7138-f03a-40b1-bc97-335fc28ddcd6",
          region: "na1",
          target: "#newsletter-form-container"
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

  return <div id="newsletter-form-container" style={{ minHeight: '100px' }}>
    <p className="text-sm text-gray-500">Loading form...</p>
  </div>
}