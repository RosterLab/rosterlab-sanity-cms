'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa'
import CountrySelector from './CountrySelector'

export default function USFooter() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content - Changed from 5 columns to 4 columns since no Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Section 1: Logo and Social */}
          <div className="lg:col-span-1 col-span-full lg:col-start-auto">
            <div className="text-center lg:text-left">
              <Link href="/us/" className="inline-block mb-4">
                <Image
                  src="/images/rosterlab-logo.png"
                  alt="RosterLab"
                  width={150}
                  height={40}
                  className="h-10 w-auto mx-auto lg:mx-0"
                />
              </Link>
              <p className="text-sm text-gray-600 mb-6">
                Simplifying workforce management with intelligent scheduling solutions.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 mb-6 justify-center lg:justify-start lg:flex-col">
              <Link
                href="/us/book-a-demo"
                className="flex-1 lg:flex-none inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Book a demo
              </Link>
              <Link
                href="https://app.rosterlab.com"
                className="flex-1 lg:flex-none inline-flex items-center justify-center bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors border border-gray-300 text-sm"
                target="_blank"
              >
                Login
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/company/rosterlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/RosterLab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/p/RosterLab-100084645549356/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@rosterlab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Section 2: Product */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/us/solutions/ai-staff-schedule-maker" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  AI Scheduling
                </Link>
              </li>
              <li>
                <Link href="/us/solutions/free-staff-scheduling-tool" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Free digital scheduling tool
                </Link>
              </li>
              <li>
                <Link href="/us/solutions/staff-schedule-mobile-app" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Staff Mobile App
                </Link>
              </li>
              <li>
                <Link href="/us/staff-scheduling-interactive-demo" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Product Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Company */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/us/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/us/careers" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/us/newsroom" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/us/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Customer Success */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Customer Success</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/us/industries" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/us/pricing" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/us/case-studies" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources section removed for US version */}
        </div>

        {/* App Store Links */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/nz/app/rosterlab/id6448819917"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Image
                src="/images/app-store-badge.svg"
                alt="Download on the App Store"
                width={135}
                height={40}
                className="h-[45px] w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rosterlab.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Image
                src="/images/google-play-badge.png"
                alt="Get it on Google Play"
                width={238}
                height={70}
                className="h-[70px] w-auto"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} All rights reserved to RosterLab
          </p>
          <p className="text-gray-300 text-[10px] mt-1">
            Illustrations by Storyset
          </p>
          <div className="mt-4 flex justify-center">
            <CountrySelector />
          </div>
        </div>
      </div>
    </footer>
  )
}