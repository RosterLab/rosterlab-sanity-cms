'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'
import USFooter from './USFooter'

export default function ClientFooter() {
  const pathname = usePathname()
  const isUSVersion = pathname === '/us' || pathname.startsWith('/us/')
  
  // Use US footer for US pages, original footer for everything else
  return isUSVersion ? <USFooter /> : <Footer />
}