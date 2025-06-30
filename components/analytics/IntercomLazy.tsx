'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

interface IntercomLazyProps {
  appId: string
}

export default function IntercomLazy({ appId }: IntercomLazyProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load Intercom after a delay or on user interaction
    const loadOnInteraction = () => {
      setShouldLoad(true)
      // Remove listeners after first interaction
      window.removeEventListener('scroll', loadOnInteraction)
      window.removeEventListener('mousemove', loadOnInteraction)
      window.removeEventListener('touchstart', loadOnInteraction)
      window.removeEventListener('click', loadOnInteraction)
    }

    // Load on user interaction
    window.addEventListener('scroll', loadOnInteraction, { once: true })
    window.addEventListener('mousemove', loadOnInteraction, { once: true })
    window.addEventListener('touchstart', loadOnInteraction, { once: true })
    window.addEventListener('click', loadOnInteraction, { once: true })

    // Also load after 5 seconds if no interaction
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', loadOnInteraction)
      window.removeEventListener('mousemove', loadOnInteraction)
      window.removeEventListener('touchstart', loadOnInteraction)
      window.removeEventListener('click', loadOnInteraction)
    }
  }, [])

  const handleFacadeClick = () => {
    setShouldLoad(true)
    setIsVisible(false)
    // Open Intercom when it loads
    setTimeout(() => {
      if (window.Intercom) {
        window.Intercom('show')
      }
    }, 1000)
  }

  // Show facade after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!shouldLoad) {
        setIsVisible(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <>
        {/* Intercom Facade */}
        {isVisible && (
          <div
            className="intercom-facade"
            onClick={handleFacadeClick}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#1890ff',
              cursor: 'pointer',
              boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2147483000,
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0C6.268 0 0 6.268 0 14v10c0 4.418 3.582 8 8 8h12c2.21 0 4-1.79 4-4v-14C24 6.268 17.732 0 10 0h4zm2 20h-4c-1.105 0-2-.895-2-2s.895-2 2-2h4c1.105 0 2 .895 2 2s-.895 2-2 2zm0-8h-4c-1.105 0-2-.895-2-2s.895-2 2-2h4c1.105 0 2 .895 2 2s-.895 2-2 2z"
                fill="white"
              />
            </svg>
          </div>
        )}
        <style jsx>{`
          @keyframes intercom-fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .intercom-facade {
            animation: intercom-fade-in 0.3s ease-out;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <Script
        id="intercom-settings"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "${appId}",
            };
          `,
        }}
      />
      <Script
        id="intercom-widget"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `,
        }}
      />
    </>
  )
}

// Type declaration for Window with Intercom
declare global {
  interface Window {
    Intercom: any
    intercomSettings: any
  }
}