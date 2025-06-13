'use client'

import { useEffect, useRef } from 'react'

interface HubSpotFormProps {
  formId: string
  region?: string
  portalId?: string
  className?: string
  onSubmit?: () => void
  onReady?: () => void
}

declare global {
  interface Window {
    hbspt: any
  }
}

export default function HubSpotForm({
  formId,
  region = 'na1',
  portalId = '20646833', // RosterLab's HubSpot portal ID
  className = '',
  onSubmit,
  onReady,
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load HubSpot script if not already loaded
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.defer = true
    
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: formRef.current,
          onFormReady: () => {
            if (onReady) onReady()
          },
          onFormSubmit: () => {
            if (onSubmit) onSubmit()
          },
        })
      }
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src="//js.hsforms.net/forms/embed/v2.js"]')
    if (!existingScript) {
      document.head.appendChild(script)
    } else {
      // Script already loaded, create form immediately
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: formRef.current,
          onFormReady: () => {
            if (onReady) onReady()
          },
          onFormSubmit: () => {
            if (onSubmit) onSubmit()
          },
        })
      }
    }

    return () => {
      // Cleanup if needed
      if (formRef.current) {
        formRef.current.innerHTML = ''
      }
    }
  }, [formId, region, portalId, onSubmit, onReady])

  return <div ref={formRef} className={className} />
}