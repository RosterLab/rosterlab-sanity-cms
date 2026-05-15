'use client'

import { useEffect, useRef, useState } from 'react'
import { trackFormSubmission } from '@/lib/analytics/events/conversion-events'
import { analytics } from '@/components/analytics/tracking'

function extractFormValues($form: HTMLFormElement): Record<string, string> {
  const values: Record<string, string> = {}
  const inputs = $form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    'input, textarea, select'
  )
  inputs.forEach((input) => {
    if (input.name && input.value) {
      values[input.name] = input.value
    }
  })
  return values
}

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

    const formConfig = {
      portalId: "20646833",
      formId: "77e5a8c4-4303-4681-8c92-afa7b070380c",
      region: "na1",
      target: "#contact-form-container",
      onFormSubmit: ($form: HTMLFormElement) => {
        const values = extractFormValues($form)
        const email = values.email
        if (email) {
          const userProps: Record<string, string> = { email }
          if (values.firstname) userProps.first_name = values.firstname
          if (values.lastname) userProps.last_name = values.lastname
          if (values.company) userProps.company = values.company
          if (values.phone || values.mobilephone) {
            userProps.phone = values.phone || values.mobilephone
          }
          analytics.identify(email, userProps)
        }
        trackFormSubmission({
          form_guid: "77e5a8c4-4303-4681-8c92-afa7b070380c",
          form_name: "Contact Form",
          page_url: window.location.href,
          page_name: document.title,
          page_location: window.location.pathname,
          user_email: email,
          user_name: [values.firstname, values.lastname].filter(Boolean).join(' ') || undefined,
          company_name: values.company,
          phone_number: values.phone || values.mobilephone,
          submission_data: values,
        })
      },
    }

    if (window.hbspt) {
      window.hbspt.forms.create(formConfig)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/embed/v2.js'
    script.charset = 'utf-8'
    script.type = 'text/javascript'

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create(formConfig)
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