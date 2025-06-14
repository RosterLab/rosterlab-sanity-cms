'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'

interface SubMenuItem {
  title: string
  link: string
}

interface NavItem {
  title: string
  link?: string
  subItems?: SubMenuItem[]
}

interface HeaderProps {
  navItems?: NavItem[]
  logo?: {
    src: string
    alt: string
  }
}

export default function Header({ navItems = [], logo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const defaultNavItems: NavItem[] = [
    {
      title: 'Solutions',
      subItems: [
        { title: 'AI-generated optimised schedules', link: '/solutions/ai-schedules' },
        { title: 'Free For Manual Digital Scheduling', link: '/solutions/manual-scheduling' },
        { title: 'Self-Scheduling', link: '/solutions/self-scheduling' },
        { title: 'Shift Swaps', link: '/solutions/shift-swaps' },
      ]
    },
    {
      title: 'Industries',
      subItems: [
        { title: 'Healthcare', link: '/industries/healthcare' },
        { title: 'ICU/ED', link: '/industries/healthcare/icu-ed' },
        { title: 'Aged Care', link: '/industries/healthcare/aged-care' },
        { title: 'Radiology', link: '/industries/healthcare/radiology' },
        { title: 'See All Industries', link: '/industries' },
      ]
    },
    { title: 'Pricing', link: '/pricing' },
    {
      title: 'Resources',
      subItems: [
        { title: 'Blog', link: '/blog' },
        { title: 'Case Studies', link: '/case-studies' },
        { title: 'Newsroom', link: '/newsroom' },
        { title: 'Schedge', link: '/schedge' },
      ]
    },
    { title: 'About Us', link: '/about' },
  ]

  const navigation = navItems.length > 0 ? navItems : defaultNavItems

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {logo ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-xl font-bold text-blue-600">
                  RosterLab
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                      {item.title}
                      {item.subItems && <HiChevronDown className="ml-1 h-4 w-4" />}
                    </button>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.link}
                          href={subItem.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Header Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              target="_blank"
            >
              Login
            </Link>
            <Link
              href="/demo"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Start for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-blue-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        'lg:hidden transition-all duration-300 ease-in-out',
        isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {navigation.map((item) => (
            <div key={item.title}>
              {item.link ? (
                <Link
                  href={item.link}
                  className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <div className="px-3 py-2 text-base font-medium text-neutral-900">
                    {item.title}
                  </div>
                  {item.subItems && (
                    <div className="pl-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.link}
                          href={subItem.link}
                          className="text-neutral-600 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <Link
              href="/contact"
              className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
              target="_blank"
            >
              Login
            </Link>
            <Link
              href="/demo"
              className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Demo
            </Link>
            <Link
              href="/signup"
              className="bg-green-500 text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}