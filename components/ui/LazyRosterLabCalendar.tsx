'use client'

import dynamic from 'next/dynamic'

const RosterLabCalendar = dynamic(() => import('./RosterLabCalendar'), {
  loading: () => (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full border border-gray-200 animate-pulse">
      <div className="bg-gray-300 h-16"></div>
      <div className="p-6">
        <div className="h-96 bg-gray-100 rounded"></div>
      </div>
    </div>
  ),
  ssr: true // Keep SSR for SEO
})

export default RosterLabCalendar