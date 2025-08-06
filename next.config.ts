import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'rosterlab.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days in seconds
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'react-confetti', '@heroicons/react'],
  },
  compiler: {
    // Remove unused JavaScript
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Exclude polyfills for modern browsers
  webpack: (config, { isServer }) => {
    // Skip polyfills for modern JavaScript features
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        'core-js-pure': false,
      };
    }
    return config;
  },
  async headers() {
    return [
      // Blog pages should have shorter cache
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60', // 5 min cache
          },
        ],
      },
      {
        source: '/blog/page/:page',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60', // 5 min cache
          },
        ],
      },
      // Case studies pages should have shorter cache
      {
        source: '/case-studies',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60', // 5 min cache
          },
        ],
      },
      {
        source: '/case-studies/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60', // 5 min cache
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400', // 7 days cache, 1 day stale
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days cache, 1 day stale
          },
        ],
      },
      {
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days
          },
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days
          },
        ],
      },
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400', // 30 days
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Author and test redirects to blog
      {
        source: '/author/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/test/:path*',
        destination: '/blog',
        permanent: true,
      },
      // Product redirects
      {
        source: '/product/rosterlab-ai',
        destination: '/solutions/ai-staff-scheduling',
        permanent: true,
      },
      {
        source: '/solutions/ai-schedules',
        destination: '/solutions/ai-staff-scheduling',
        permanent: true,
      },
      {
        source: '/solution/ai-schedule',
        destination: '/solutions/ai-staff-scheduling',
        permanent: true,
      },
      {
        source: '/product/rosterlab-free',
        destination: '/solutions/free-staff-scheduling',
        permanent: true,
      },
      // Blog redirects
      {
        source: '/blog/wdhbradiographyimplementation',
        destination: '/newsroom/whanganui-radiography-department-embraces-ai-rostering',
        permanent: true,
      },
      {
        source: '/blog/cost-efficiency',
        destination: '/blog/improving-cost-efficiency-staff-rostering',
        permanent: true,
      },
      {
        source: '/blog/staff-scheduling-to-payroll-the-right-way-to-do-it',
        destination: '/blog/staff-rostering-to-payroll-the-right-way-to-do-it',
        permanent: true,
      },
      {
        source: '/blog/night-shifts',
        destination: '/blog/manage-night-shift-planning-wellbeing-effectively',
        permanent: true,
      },
      {
        source: '/blog/self-scheduling',
        destination: '/blog/how-to-implement-self-scheduling',
        permanent: true,
      },
      {
        source: '/blog/open-shifts',
        destination: '/blog/open-shifts-understanding-the-basics',
        permanent: true,
      },
      // Redirect case studies from /blog to /case-studies
      {
        source: '/blog/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering',
        destination: '/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering',
        permanent: true,
      },
      {
        source: '/blog/icu-unit-western-australia',
        destination: '/case-studies/icu-unit-western-australia',
        permanent: true,
      },
      {
        source: '/blog/dargaville-medical-centre-new-zealand',
        destination: '/case-studies/dargaville-medical-centre-new-zealand',
        permanent: true,
      },
      // Redirect newsroom from /blog to /newsroom
      {
        source: '/blog/government-agency-chooses-rosterlab-to-help-streamline-staff-schedules',
        destination: '/newsroom/government-agency-chooses-rosterlab-to-help-streamline-staff-schedules',
        permanent: true,
      },
      {
        source: '/blog/connecting-with-healthcare-leaders-at-digital-health-festival-2025',
        destination: '/newsroom/connecting-with-healthcare-leaders-at-digital-health-festival-2025',
        permanent: true,
      },
      {
        source: '/blog/royal-perth-hospital-partners-with-rosterlab-for-smarter-rosters',
        destination: '/newsroom/royal-perth-hospital-partners-with-rosterlab-for-smarter-rosters',
        permanent: true,
      },
      {
        source: '/blog/whanganui-radiography-department-embraces-ai-rostering',
        destination: '/newsroom/whanganui-radiography-department-embraces-ai-rostering',
        permanent: true,
      },
      // Case studies redirects
      {
        source: '/case-studies/blog/casestudy_dargavillemedicalcentre',
        destination: '/case-studies/dargaville-medical-centre-new-zealand',
        permanent: true,
      },
      {
        source: '/case-studies/blog/case-study-aus-icu-unit',
        destination: '/case-studies/icu-unit-western-australia',
        permanent: true,
      },
      {
        source: '/case-studies/press-news',
        destination: '/newsroom',
        permanent: true,
      },
      {
        source: '/studies',
        destination: '/case-studies',
        permanent: true,
      },
      // Feature redirects
      {
        source: '/product/self-scheduling',
        destination: '/feature/self-scheduling',
        permanent: true,
      },
      {
        source: '/self-scheduling',
        destination: '/product/self-scheduling',
        permanent: true,
      },
      // Other redirects
      {
        source: '/example-media',
        destination: '/staff-rostering-interactive-demo',
        permanent: true,
      },
      {
        source: '/hs-web-interactive-20646833-189912447154',
        destination: '/',
        permanent: true,
      },
      {
        source: '/example-medi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/aa',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test',
        destination: '/',
        permanent: true,
      },
      {
        source: '/-ab-variant-82914e52-ef88-4c6a-94f5-67524e4608db',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/meeting-confirmed-0',
        destination: '/book-a-demo',
        permanent: true,
      },
      {
        source: '/-ab-variant-478b989c-855c-4383-9e60-19529616c556',
        destination: '/',
        permanent: true,
      },
      {
        source: '/newsroom/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering',
        destination: '/case-studies/sydney-tertiary-hospital-saves-300-hours-with-ai-rostering',
        permanent: true,
      },
      {
        source: '/industries/others',
        destination: '/industries',
        permanent: true,
      },
      // Healthcare industry redirects
      {
        source: '/industries/healthcare/edicu',
        destination: '/industries/healthcare/ed-icu',
        permanent: true,
      },
      {
        source: '/industries/healthcare/agedcare',
        destination: '/industries/healthcare/aged-care',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
