'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HiMenu, HiX, HiChevronDown, HiUser } from 'react-icons/hi'

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
}

export default function Header({ navItems = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const defaultNavItems: NavItem[] = [
    {
      title: 'Solutions',
      subItems: [
        { title: 'AI-generated optimised schedules', link: '/solutions/ai-schedules' },
        { title: 'Free For Manual Digital Scheduling', link: '/solutions/free-staff-scheduling' },
        { title: 'Employee Mobile App', link: '/solutions/staff-roster-mobile-app' },
        { title: 'Preferences & Rules', link: '/feature/preferences-rules' },
        { title: 'Auto Roster Generation', link: '/feature/auto-roster-generation' },
        { title: 'Self-Scheduling', link: '/feature/self-scheduling' },
        { title: 'Leave Requests', link: '/feature/leave-requests' },
        { title: 'Shift Swaps', link: '/feature/shift-swaps' },
        { title: 'Open Shifts', link: '/feature/open-shifts' },
        { title: 'Re-Rostering', link: '/feature/re-rostering' },
        { title: 'Payroll Integration', link: '/feature/payroll-integration' },
      ]
    },
    {
      title: 'Industries',
      subItems: [
        { title: 'Healthcare', link: '/industries/healthcare' },
        { title: 'ICU/ED', link: '/industries/healthcare/edicu' },
        { title: 'Aged Care', link: '/industries/healthcare/agedcare' },
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
        { title: 'Testimonials', link: '/resources/testimonials' },
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
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/rosterlab-logo.png"
                alt="RosterLab"
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
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
                  
                  {/* Invisible bridge to maintain hover */}
                  {item.subItems && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 right-0 h-4" />
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.title && (
                    <div className={cn(
                      "absolute top-full mt-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50",
                      item.title === 'Solutions' || item.title === 'Industries' ? 'left-0 w-[600px]' : 'left-0 w-64'
                    )}>
                      {item.title === 'Solutions' ? (
                        // Enhanced Solutions Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Core Solutions Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Core Solutions
                              </h3>
                              <div className="space-y-1">
                                <Link
                                  href="/solutions/ai-schedules"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    AI-Powered Scheduling
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Automated schedules optimized for your team
                                  </div>
                                </Link>
                                <Link
                                  href="/solutions/free-staff-scheduling"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Manual Digital Scheduling
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Free digital scheduling tool
                                  </div>
                                </Link>
                                <Link
                                  href="/solutions/staff-roster-mobile-app"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Employee Mobile App
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Mobile roster access for staff
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Features Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Features
                              </h3>
                              <div className="space-y-1 max-h-80 overflow-y-auto">
                                <Link
                                  href="/feature/preferences-rules"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Preferences & Rules
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/auto-roster-generation"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Auto Roster Generation
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/self-scheduling"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Self-Scheduling
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/leave-requests"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Leave Requests
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/shift-swaps"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Shift Swaps
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/open-shifts"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Open Shifts
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/re-rostering"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Re-Rostering
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/payroll-integration"
                                  className="group block p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-pink-600 text-sm">
                                    Payroll Integration
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href="/contact"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                Speak to our team
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                              <Link
                                href="/book-a-demo"
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Get a demo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : item.title === 'Industries' ? (
                        // Enhanced Industries Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Healthcare Solutions Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Healthcare Sectors
                              </h3>
                              <div className="space-y-1">
                                <Link
                                  href="/industries/healthcare"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Healthcare
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    General healthcare scheduling solutions
                                  </div>
                                </Link>
                                <Link
                                  href="/industries/healthcare/edicu"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    ICU/ED
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Critical care and emergency departments
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Specialized Care Column */}
                            <div>
                              <div className="space-y-1 mt-8">
                                <Link
                                  href="/industries/healthcare/agedcare"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Aged Care
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Residential and home care facilities
                                  </div>
                                </Link>
                                <Link
                                  href="/industries/healthcare/radiology"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Radiology
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Medical imaging departments
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href="/industries"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                View all industries
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                              <Link
                                href="/book-a-demo"
                                className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Get a demo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Standard dropdown for other menu items
                        <div className="py-2">
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
            <div className="w-px h-6 bg-gray-300 mx-2" />
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              target="_blank"
            >
              <HiUser className="w-4 h-4 mr-1" />
              Login
            </Link>
            <Link
              href="/book-a-demo"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com"
              className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              target="_blank"
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
              href="/book-a-demo"
              className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com"
              className="bg-green-500 text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
              target="_blank"
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}