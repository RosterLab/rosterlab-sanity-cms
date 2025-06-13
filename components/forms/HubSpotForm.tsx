'use client'

import { useEffect, useRef, useCallback } from 'react'

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
    hbspt: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string | HTMLElement;
          onFormReady?: () => void;
          onFormSubmit?: () => void;
        }) => void;
      };
    }
  }
}

let scriptLoaded = false
let scriptLoading = false

export default function HubSpotForm({
  formId,
  region = 'na1',
  portalId = '20646833',
  className = '',
  onSubmit,
  onReady,
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null)
  const formCreatedRef = useRef(false)

  const createForm = useCallback(() => {
    if (window.hbspt && formRef.current && !formCreatedRef.current) {
      formCreatedRef.current = true
      
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: formRef.current,
        onFormReady: onReady,
        onFormSubmit: onSubmit,
      })
    }
  }, [formId, region, portalId, onReady, onSubmit])

  useEffect(() => {
    const currentFormRef = formRef.current
    
    const loadScript = () => {
      if (scriptLoading || scriptLoaded) return

      scriptLoading = true
      const script = document.createElement('script')
      script.src = '//js.hsforms.net/forms/embed/v2.js'
      script.async = true
      script.onload = () => {
        scriptLoaded = true
        scriptLoading = false
        createForm()
      }
      script.onerror = () => {
        scriptLoading = false
      }
      document.head.appendChild(script)
    }

    if (window.hbspt) {
      createForm()
    } else if (scriptLoaded) {
      createForm()
    } else {
      loadScript()
    }

    return () => {
      if (currentFormRef) {
        currentFormRef.innerHTML = ''
      }
      formCreatedRef.current = false
    }
  }, [createForm])

  return <div ref={formRef} className={className} />
}