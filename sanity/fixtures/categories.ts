import { Category } from '../types'

export const categoryFixtures: Omit<Category, '_id' | '_createdAt' | '_updatedAt' | '_rev'>[] = [
  {
    _type: 'category',
    title: 'Product Updates',
    slug: {
      current: 'product-updates',
      _type: 'slug',
    },
    description: 'Latest features and improvements to RosterLab',
  },
  {
    _type: 'category',
    title: 'Industry Insights',
    slug: {
      current: 'industry-insights',
      _type: 'slug',
    },
    description: 'Trends and insights in workforce management',
  },
  {
    _type: 'category',
    title: 'Best Practices',
    slug: {
      current: 'best-practices',
      _type: 'slug',
    },
    description: 'Tips and strategies for effective scheduling',
  },
  {
    _type: 'category',
    title: 'Customer Stories',
    slug: {
      current: 'customer-stories',
      _type: 'slug',
    },
    description: 'Success stories from our customers',
  },
  {
    _type: 'category',
    title: 'Company News',
    slug: {
      current: 'company-news',
      _type: 'slug',
    },
    description: 'Updates from the RosterLab team',
  },
]