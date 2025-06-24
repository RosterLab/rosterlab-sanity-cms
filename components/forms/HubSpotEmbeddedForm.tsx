'use client'

import Script from 'next/script'

interface HubSpotEmbeddedFormProps {
  formId: string
  region: string
  portalId: string
  className?: string
}

export default function HubSpotEmbeddedForm({
  formId,
  region,
  portalId,
  className = ''
}: HubSpotEmbeddedFormProps) {
  return (
    <>
      <Script 
        src="https://js.hsforms.net/forms/embed/20646833.js" 
        defer
        strategy="afterInteractive"
      />
      <div 
        className={`hs-form-frame ${className}`}
        data-region={region}
        data-form-id={formId}
        data-portal-id={portalId}
      />
    </>
  )
}