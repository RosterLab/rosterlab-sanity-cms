import Script from 'next/script'

interface DatadogProps {
  clientToken: string
  applicationId: string
  service?: string
  env?: string
}

export default function Datadog({ 
  clientToken, 
  applicationId, 
  service = 'rosterlab-nextjs',
  env = 'production'
}: DatadogProps) {
  // Only render if we have the required tokens
  if (!clientToken || !applicationId) {
    return null
  }

  return (
    <Script
      id="datadog-rum"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (!window.DD_RUM) {
            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
              d=o.createElement(u);d.async=1;d.src=n
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
            })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
            
            window.DD_RUM.onReady(function() {
              window.DD_RUM.init({
                clientToken: '${clientToken}',
                applicationId: '${applicationId}',
                site: 'datadoghq.com',
                service: '${service}',
                env: '${env}',
                sessionSampleRate: 100,
                sessionReplaySampleRate: 100,
                defaultPrivacyLevel: 'mask-user-input',
              });
            })
          }
        `,
      }}
    />
  )
}