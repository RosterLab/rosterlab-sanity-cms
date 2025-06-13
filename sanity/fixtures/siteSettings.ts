import { SiteSettings } from '../types'

export const siteSettingsFixture: Omit<SiteSettings, '_id' | '_createdAt' | '_updatedAt' | '_rev'> = {
  _type: 'siteSettings',
  title: 'RosterLab - AI-Powered Workforce Management',
  description: 'Transform your workforce management with AI-powered scheduling that saves time, reduces costs, and improves employee satisfaction.',
  mainNav: [
    {
      title: 'Solutions',
      href: '/solutions',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Contact',
      href: '/contact',
    },
  ],
  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          {
            title: 'Features',
            href: '/features',
          },
          {
            title: 'Pricing',
            href: '/pricing',
          },
          {
            title: 'Demo',
            href: '/demo',
          },
        ],
      },
      {
        title: 'Solutions',
        links: [
          {
            title: 'Healthcare',
            href: '/solutions/healthcare',
          },
          {
            title: 'Hospitality',
            href: '/solutions/hospitality',
          },
          {
            title: 'Retail',
            href: '/solutions/retail',
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            title: 'About',
            href: '/about',
          },
          {
            title: 'Blog',
            href: '/blog',
          },
          {
            title: 'Contact',
            href: '/contact',
          },
        ],
      },
      {
        title: 'Support',
        links: [
          {
            title: 'Help Center',
            href: '/help',
          },
          {
            title: 'Documentation',
            href: '/docs',
          },
          {
            title: 'API',
            href: '/api-docs',
          },
        ],
      },
    ],
  },
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/rosterlab',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/rosterlab',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@rosterlab',
    },
  ],
}