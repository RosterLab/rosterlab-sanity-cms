import { Post } from '../types'

export const postFixtures: Omit<Post, '_id' | '_createdAt' | '_updatedAt' | '_rev' | 'author' | 'categories'>[] = [
  {
    _type: 'post',
    title: 'Introducing AI-Powered Schedule Optimization',
    slug: {
      current: 'ai-powered-schedule-optimisation',
      _type: 'slug',
    },
    publishedAt: '2024-12-01T10:00:00Z',
    excerpt: 'Discover how our new AI algorithms can reduce scheduling time by 75% while improving fairness and compliance.',
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Future of Workforce Scheduling',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Traditional scheduling methods are time-consuming and often lead to suboptimal results. Our new AI-powered optimisation engine changes that by analysing historical data, employee preferences, and business constraints to create perfect schedules in minutes.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Key Benefits',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• 75% reduction in scheduling time\n• Improved employee satisfaction\n• Better compliance with labour laws\n• Reduced labour costs',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'AI-Powered Schedule Optimisation | RosterLab',
      metaDescription: 'Reduce scheduling time by 75% with our new AI optimisation engine. Improve fairness, compliance, and employee satisfaction.',
      keywords: ['AI scheduling', 'workforce optimization', 'automated scheduling'],
    },
  },
  {
    _type: 'post',
    title: 'Healthcare Scheduling: Ensuring Patient Safety Through Better Rosters',
    slug: {
      current: 'healthcare-scheduling-patient-safety',
      _type: 'slug',
    },
    publishedAt: '2024-11-15T14:30:00Z',
    excerpt: 'Learn how proper scheduling in healthcare settings directly impacts patient outcomes and staff well-being.',
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Critical Role of Scheduling in Healthcare',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In healthcare, scheduling is more than just logistics—it\'s about patient safety. Poor scheduling can lead to staff burnout, increased errors, and compromised patient care.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Healthcare Scheduling for Patient Safety | RosterLab',
      metaDescription: 'Discover how proper healthcare scheduling improves patient outcomes and reduces staff burnout.',
      keywords: ['healthcare scheduling', 'patient safety', 'nurse scheduling'],
    },
  },
  {
    _type: 'post',
    title: 'Customer Spotlight: How Bupa Reduced Scheduling Time by 80%',
    slug: {
      current: 'bupa-case-study-scheduling-efficiency',
      _type: 'slug',
    },
    publishedAt: '2024-10-30T09:00:00Z',
    excerpt: 'See how Bupa transformed their workforce management with RosterLab, achieving significant time savings and improved employee satisfaction.',
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Challenge',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Bupa was spending 40 hours per week manually creating schedules for their 200+ healthcare professionals across multiple locations.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Solution',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'With RosterLab\'s automated scheduling and optimisation features, Bupa now creates optimal schedules in just 8 hours per week.',
          },
        ],
      },
    ],
    seo: {
      metaTitle: 'Bupa Case Study: 80% Scheduling Time Reduction | RosterLab',
      metaDescription: 'Learn how Bupa transformed their scheduling process with RosterLab, saving 32 hours per week.',
      keywords: ['case study', 'Bupa', 'scheduling efficiency', 'healthcare'],
    },
  },
]