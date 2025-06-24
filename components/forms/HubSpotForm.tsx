'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    hbspt: any
  }
}

export default function HubSpotForm() {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    document.body.appendChild(script)

    // Create form after script loads
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "7a140682-3e29-470f-a3b0-10c8d97beb02",
          region: "na1",
          target: "#hs-form-container"
        })
      }
    }

    // Cleanup
    return () => {
      const form = document.getElementById('hs-form-container')
      if (form) {
        form.innerHTML = ''
      }
    }
  }, [])

  return <div id="hs-form-container" />
}