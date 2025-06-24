'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    hbspt: any
  }
}

export default function HubSpotFormEmbed() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '20646833',
          formId: '7a140682-3e29-470f-a3b0-10c8d97beb02',
          region: 'na1',
          target: '#hubspot-form'
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return <div id="hubspot-form" />
}