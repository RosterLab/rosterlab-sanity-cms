import Link from 'next/link'
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

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
  twitter: FaTwitter,
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
    { platform: 'twitter', url: '#' },
    { platform: 'linkedin', url: '#' },
    { platform: 'facebook', url: '#' },
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
            <p className="text-neutral-400 mb-4">
              Simplifying workforce management with intelligent scheduling solutions.
            </p>
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
                <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About Us
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