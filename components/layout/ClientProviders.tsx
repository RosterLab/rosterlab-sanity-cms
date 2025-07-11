'use client'

import { LiveChatLoaderProvider } from 'react-live-chat-loader'
import IntercomLazy from '@/components/analytics/IntercomLazy'

interface ClientProvidersProps {
  children: React.ReactNode
  intercomAppId: string
}

export default function ClientProviders({ children, intercomAppId }: ClientProvidersProps) {
  return (
    <LiveChatLoaderProvider 
      providerKey={intercomAppId} 
      provider="intercom"
    >
      {children}
      <IntercomLazy appId={intercomAppId} />
    </LiveChatLoaderProvider>
  )
}