import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiArrowRight, HiUser } from 'react-icons/hi'

interface FooterLink {
  title: string
  link: string
}

interface SocialLink {
  platform: string
  url: string
}

interface FooterProps {
  copyright?: string
  links?: FooterLink[]
  socialLinks?: SocialLink[]
}

const socialIcons = {
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
}

export default function Footer({ copyright, links = [], socialLinks = [] }: FooterProps) {
  const defaultLinks: FooterLink[] = [
    { title: 'Privacy Policy', link: '/privacy' },
    { title: 'Terms of Service', link: '/terms' },
    { title: 'Contact', link: '/contact' },
  ]

  const defaultSocialLinks: SocialLink[] = [
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/rosterlab/' },
    { platform: 'facebook', url: 'https://www.facebook.com/p/RosterLab-100084645549356/' },
    { platform: 'instagram', url: 'https://www.instagram.com/RosterLab/' },
    { platform: 'youtube', url: 'https://www.youtube.com/@rosterlab' },
  ]

  const footerLinks = links.length > 0 ? links : defaultLinks
  const footerSocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks
  const copyrightText = copyright || `© ${new Date().getFullYear()} RosterLab. All rights reserved.`

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">RosterLab</h3>
            <p className="text-neutral-400 mb-6">
              Simplifying workforce management with intelligent scheduling solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="https://app.rosterlab.com"
                className="inline-flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
                target="_blank"
              >
                Start for Free
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="https://app.rosterlab.com"
                className="inline-flex items-center justify-center bg-neutral-700 text-white px-4 py-2 rounded-md font-medium hover:bg-neutral-600 transition-colors"
                target="_blank"
              >
                <HiUser className="mr-2 h-4 w-4" />
                Login
              </Link>
            </div>
            
            {/* App Store Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://apps.apple.com/app/rosterlab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={135}
                  height={45}
                  className="h-[45px] w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.rosterlab.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/images/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={155}
                  height={60}
                  className="h-[45px] w-auto"
                />
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {footerSocialLinks.map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons]
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.platform}</span>
                  </a>
                ) : null
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/roi-calculator" className="text-neutral-400 hover:text-white transition-colors">
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.link}>
                  <Link href={link.link} className="text-neutral-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-400 text-sm">{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}