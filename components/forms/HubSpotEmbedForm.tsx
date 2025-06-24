'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    hbspt: any
  }
}

let isScriptLoaded = false
let isScriptLoading = false
const callbacks: (() => void)[] = []

function loadHubSpotScript(callback: () => void) {
  // If script is already loaded, call callback immediately
  if (isScriptLoaded && window.hbspt) {
    callback()
    return
  }

  // Add callback to queue
  callbacks.push(callback)

  // If script is already loading, just wait
  if (isScriptLoading) {
    return
  }

  // Start loading the script
  isScriptLoading = true

  // Check if script already exists in DOM
  const existingScript = document.querySelector('script[src*="hsforms.net/forms/embed/v2.js"]')
  if (existingScript) {
    // Script tag exists, check if HubSpot object is available
    if (window.hbspt) {
      isScriptLoaded = true
      isScriptLoading = false
      callbacks.forEach(cb => cb())
      callbacks.length = 0
    }
    return
  }

  // Create and load the script
  const script = document.createElement('script')
  script.src = 'https://js.hsforms.net/forms/embed/v2.js'
  script.charset = 'utf-8'
  script.type = 'text/javascript'
  script.async = true

  script.onload = () => {
    isScriptLoaded = true
    isScriptLoading = false
    // Execute all queued callbacks
    callbacks.forEach(cb => cb())
    callbacks.length = 0
  }

  script.onerror = () => {
    isScriptLoading = false
    console.error('Failed to load HubSpot forms script')
  }

  document.head.appendChild(script)
}

export default function HubSpotEmbedForm() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formCreated = useRef(false)

  useEffect(() => {
    loadHubSpotScript(() => {
      if (window.hbspt && containerRef.current && !formCreated.current) {
        formCreated.current = true
        window.hbspt.forms.create({
          portalId: "20646833",
          formId: "7a140682-3e29-470f-a3b0-10c8d97beb02",
          region: "na1",
          target: containerRef.current
        })
      }
    })

    return () => {
      // Clear the form container on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      formCreated.current = false
    }
  }, [])

  return <div ref={containerRef} className="hubspot-form-wrapper" />
}