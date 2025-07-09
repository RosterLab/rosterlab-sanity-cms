import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'rosterlab.com'],
    formats: ['image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    // Remove unused JavaScript
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable SWC minifier's legacy browser support
  swcMinify: true,
  async redirects() {
    return [
      // Product redirects
      {
        source: '/product/rosterlab-ai',
        destination: '/solutions/ai-schedules',
        permanent: true,
      },
      {
        source: '/product/rosterlab-free',
        destination: '/solutions/free-staff-scheduling',
        permanent: true,
      },
      // Blog redirects
      {
        source: '/blog/Excel Series',
        destination: '/rosterlab-blog/blog/excel-series',
        permanent: true,
      },
      {
        source: '/blog/Why RosterLab Free',
        destination: '/rosterlab-blog/blog/why-rosterlab-free',
        permanent: true,
      },
      {
        source: '/blog/Roster%20more%20effectively%20with%20Excel%20Ep2%3A%20Sleep%20Days%20after%20Night%20Shifts',
        destination: '/rosterlab-blog/blog/roster-more-effectively-with-excel-ep2-sleep-days-after-night-shifts',
        permanent: true,
      },
      {
        source: '/blog/CaseStudy_DargavilleMedicalCentre',
        destination: '/rosterlab-blog/blog/casestudy_dargavillemedicalcentre',
        permanent: true,
      },
      {
        source: '/blog/four-levels-of-staffing-optimisation',
        destination: '/rosterlab-blog/blog/four-levels-of-staffing-optimisation',
        permanent: true,
      },
      {
        source: '/blog/trade-offs',
        destination: '/rosterlab-blog/blog/trade-offs',
        permanent: true,
      },
      {
        source: '/blog/guide-to-rostering',
        destination: '/rosterlab-blog/blog/guide-to-rostering',
        permanent: true,
      },
      {
        source: '/blog/rosterball',
        destination: '/rosterlab-blog/blog/rosterball',
        permanent: true,
      },
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
