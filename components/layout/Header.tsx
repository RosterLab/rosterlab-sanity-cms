"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HiMenu,
  HiX,
  HiChevronDown,
  HiChevronRight,
  HiUser,
} from "react-icons/hi";
import { trackButtonClick } from "@/components/analytics/Amplitude";

interface SubMenuItem {
  title: string;
  link: string;
}

interface NavItem {
  title: string;
  link?: string;
  subItems?: SubMenuItem[];
}

interface HeaderProps {
  navItems?: NavItem[];
}

export default function Header({ navItems = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const defaultNavItems: NavItem[] = [
    {
      title: "Solutions",
      subItems: [
        {
          title: "AI-generated optimised schedules",
          link: "/solutions/ai-staff-scheduling",
        },
        {
          title: "Free For Manual Digital Scheduling",
          link: "/solutions/free-staff-scheduling",
        },
        {
          title: "Employee Mobile App",
          link: "/solutions/staff-roster-mobile-app",
        },
        { title: "Auto Roster Generation", link: "/feature/auto-roster-generation" },
        { title: "Open Shifts", link: "/feature/open-shifts" },
        { title: "Shift Swaps", link: "/feature/shift-swaps" },
        { title: "Leave Requests", link: "/feature/leave-requests" },
        { title: "Staff Preferences", link: "/feature/self-scheduling" },
        { title: "Re-Rostering", link: "/feature/re-rostering" },
      ],
    },
    {
      title: "Industries",
      subItems: [
        { title: "Healthcare", link: "/industries/healthcare" },
        { title: "ICU/ED", link: "/industries/healthcare/ed-icu" },
        { title: "Aged Care", link: "/industries/healthcare/aged-care" },
        { title: "Radiology", link: "/industries/healthcare/radiology" },
        { title: "See All Industries", link: "/industries" },
      ],
    },
    { title: "Pricing", link: "/pricing" },
    {
      title: "Resources",
      subItems: [
        { title: "Blog", link: "/blog" },
        { title: "Case Studies", link: "/case-studies" },
        { title: "Newsroom", link: "/newsroom" },
        { title: "Schedge", link: "/schedge" },
        { title: "ROI Calculator", link: "/tools/roi-calculator" },
        { title: "Personality Test", link: "/tools/staff-scheduling-personality-quiz" },
        { title: "Free Excel Template", link: "/templates/free-staff-roster-template-excel" },
      ]
    },
    { title: "About Us", link: "/about" },
  ];

  const navigation = navItems.length > 0 ? navItems : defaultNavItems;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
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
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() =>
                    item.subItems && setActiveDropdown(item.title)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() =>
                    item.subItems &&
                    setActiveDropdown(
                      activeDropdown === item.title ? null : item.title
                    )
                  }
                >
                  {item.link ? (
                    <Link
                      href={item.link}
                      className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      className="text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === item.title ? null : item.title
                        );
                      }}
                    >
                      {item.title}
                      {item.subItems && (
                        <HiChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </button>
                  )}

                  {/* Invisible bridge to maintain hover */}
                  {item.subItems && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 right-0 h-4" />
                  )}

                  {/* Dropdown Menu */}
                  {item.subItems && activeDropdown === item.title && (
                    <div
                      className={cn(
                        "absolute top-full mt-0 bg-white rounded-lg shadow-xl border border-gray-200 z-[100] pointer-events-auto",
                        item.title === "Solutions" ||
                          item.title === "Industries" ||
                          item.title === "Resources"
                          ? "left-0 w-[600px]"
                          : "left-0 w-64"
                      )}
                      onMouseEnter={() => setActiveDropdown(item.title)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.title === "Solutions" ? (
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
                                  href="/solutions/ai-staff-scheduling"
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
                                  href="/feature/auto-roster-generation"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Auto Roster Generation
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/open-shifts"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Open Shifts
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/shift-swaps"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Shift Swaps
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/leave-requests"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Leave Requests
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/self-scheduling"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Staff Preferences
                                  </div>
                                </Link>
                                <Link
                                  href="/feature/re-rostering"
                                  className="group block p-2 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] text-sm">
                                    Re-Rostering
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
                                <svg
                                  className="ml-1 h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
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
                      ) : item.title === "Industries" ? (
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
                                    General healthcare solutions that handle
                                    complex workforces and frontline workers
                                  </div>
                                </Link>
                                <Link
                                  href="/industries/healthcare/ed-icu"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    ICU/ED
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Build ICU/ED rosters that support better
                                    continuity of care for patients
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Specialized Care Column */}
                            <div>
                              <div className="space-y-1 mt-8">
                                <Link
                                  href="/industries/healthcare/aged-care"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Aged Care
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Make better use of staffing hours with
                                    rosters for aged care facilities
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
                                    Balance your teams with the right skill mix
                                    with compliant radiology rosters
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
                                <svg
                                  className="ml-1 h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
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
                      ) : item.title === "Resources" ? (
                        // Enhanced Resources Dropdown Layout
                        <div className="p-6">
                          <div className="grid grid-cols-2 gap-6">
                            {/* Content & Learning Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Content & Learning
                              </h3>
                              <div className="space-y-1">
                                <Link
                                  href="/blog"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Blog
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Insights and best practices
                                  </div>
                                </Link>
                                <Link
                                  href="/case-studies"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Case Studies
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Success stories from our customers
                                  </div>
                                </Link>
                                <Link
                                  href="/newsroom"
                                  className="group block p-3 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                    Newsroom
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Latest updates and announcements
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Tools Column */}
                            <div>
                              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Tools
                              </h3>
                              <div className="space-y-1">
                                <Link
                                  href="/tools/roi-calculator"
                                  className="group block p-3 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] mb-1">
                                    ROI Calculator
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Calculate your savings
                                  </div>
                                </Link>
                                <Link
                                  href="/schedge"
                                  className="group block p-3 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] mb-1">
                                    Schedge
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    We love rostering so much that we made a
                                    mini game - Try it out!
                                  </div>
                                </Link>
                                <Link
                                  href="/tools/staff-scheduling-personality-quiz"
                                  className="group block p-3 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] mb-1">
                                    Personality Test
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Discover your scheduling style
                                  </div>
                                </Link>
                                <Link
                                  href="/templates/free-staff-roster-template-excel"
                                  className="group block p-3 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                  <div className="font-medium text-[#4a9288] group-hover:text-[#3a7268] mb-1">
                                    Free Excel Template
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Download our roster template
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <Link
                                href="/blog"
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                Explore all resources
                                <svg
                                  className="ml-1 h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
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
          <div className="hidden xl:flex items-center space-x-4">
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
              onClick={() => trackButtonClick('Book a Demo', 'Header Desktop', { cta_type: 'primary' })}
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com/signup"
              className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              target="_blank"
              onClick={() => trackButtonClick('Start for free', 'Header Desktop', { cta_type: 'signup', external: true })}
            >
              Start for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
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

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-20"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "xl:hidden transition-all duration-300 ease-in-out fixed inset-x-0 top-20 bottom-0 bg-white z-40",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg h-full overflow-y-auto">
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
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === item.title ? null : item.title
                      )
                    }
                    className="w-full text-left text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                  >
                    {item.title}
                    <HiChevronDown
                      className={cn(
                        "h-4 w-4 ml-1 transition-transform duration-200",
                        mobileDropdown === item.title ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {item.subItems && mobileDropdown === item.title && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.title === "Solutions" ? (
                        <>
                          {/* Core Solutions */}
                          <div className="mb-4">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1 mb-1">
                              Core Solutions
                            </div>
                            <div className="space-y-1">
                              {item.subItems.slice(0, 3).map((subItem) => (
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
                          </div>
                          {/* Features */}
                          <div className="border-t border-gray-200 pt-3">
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1 mb-1">
                              Features
                            </div>
                            <div className="space-y-1">
                              {item.subItems.slice(3).map((subItem) => (
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
                          </div>
                        </>
                      ) : (
                        item.subItems.map((subItem) => (
                          <Link
                            key={subItem.link}
                            href={subItem.link}
                            className="text-neutral-600 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))
                      )}
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
              onClick={() => {
                trackButtonClick('Contact Us', 'Header Mobile', { cta_type: 'contact' })
                setIsMenuOpen(false)
              }}
            >
              Contact Us
            </Link>
            <Link
              href="https://app.rosterlab.com"
              className="text-neutral-700 hover:text-blue-600 hover:bg-neutral-50 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                trackButtonClick('Login', 'Header Mobile', { cta_type: 'login', external: true })
                setIsMenuOpen(false)
              }}
              target="_blank"
            >
              Login
            </Link>
            <Link
              href="/book-a-demo"
              className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                trackButtonClick('Book a Demo', 'Header Mobile', { cta_type: 'primary' })
                setIsMenuOpen(false)
              }}
            >
              Book a Demo
            </Link>
            <Link
              href="https://app.rosterlab.com/signup"
              className="bg-green-500 text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                trackButtonClick('Start for free', 'Header Mobile', { cta_type: 'signup', external: true })
                setIsMenuOpen(false)
              }}
              target="_blank"
            >
              Start for free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}