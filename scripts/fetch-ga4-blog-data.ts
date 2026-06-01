/**
 * GA4 Blog Performance Data Fetcher
 *
 * This script fetches blog post performance data from Google Analytics 4.
 *
 * Setup:
 * 1. Install dependencies: pnpm add @google-analytics/data
 * 2. Create a Google Cloud project and enable GA4 Data API
 * 3. Create a service account and download credentials JSON
 * 4. Set environment variable: GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
 * 5. Add GA4_PROPERTY_ID to your .env.local
 * 6. Grant the service account "Viewer" access to your GA4 property
 *
 * Usage:
 * GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json GA4_PROPERTY_ID=123456789 pnpm exec tsx scripts/fetch-ga4-blog-data.ts
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { client } from '../sanity/lib/client';

// GA4 Property ID - get this from GA4 Admin > Property Settings
const propertyId = process.env.GA4_PROPERTY_ID;

if (!propertyId) {
  console.error('Error: GA4_PROPERTY_ID environment variable is required');
  console.error('Get this from GA4: Admin > Property > Property Details > Property ID');
  process.exit(1);
}

const analyticsDataClient = new BetaAnalyticsDataClient();

interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  author?: string;
  categories?: string[];
}

interface BlogPerformance extends BlogPost {
  monthlyViews: { month: string; views: number }[];
  totalViews: number;
  avgViewsPerMonth: number;
  trend: 'increasing' | 'declining' | 'stable';
  trendPercentage: number;
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title
  }`;

  return await client.fetch(query);
}

async function getGA4Data() {
  console.log('Fetching GA4 data for the last 6 months...\n');

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2025-11-28',
        endDate: '2026-05-28',
      },
    ],
    dimensions: [
      { name: 'pagePath' },
      { name: 'month' },
    ],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
      { name: 'averageSessionDuration' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: 'CONTAINS',
          value: '/blog/',
        },
      },
    },
    orderBys: [
      {
        metric: {
          metricName: 'screenPageViews',
        },
        desc: true,
      },
    ],
  });

  // Process GA4 response
  const blogData: Map<string, { months: Map<string, number>; totalViews: number }> = new Map();

  response.rows?.forEach((row) => {
    const pagePath = row.dimensionValues?.[0]?.value || '';
    const month = row.dimensionValues?.[1]?.value || '';
    const views = parseInt(row.metricValues?.[0]?.value || '0');

    if (!blogData.has(pagePath)) {
      blogData.set(pagePath, { months: new Map(), totalViews: 0 });
    }

    const data = blogData.get(pagePath)!;
    data.months.set(month, views);
    data.totalViews += views;
  });

  return blogData;
}

async function analyzeBlogs() {
  try {
    // Get all blog posts from Sanity
    const blogPosts = await getAllBlogPosts();
    console.log(`Found ${blogPosts.length} blog posts in Sanity CMS\n`);

    // Get GA4 data
    const ga4Data = await getGA4Data();

    // Merge Sanity and GA4 data
    const blogPerformance: BlogPerformance[] = blogPosts.map((post) => {
      const pagePath = `/blog/${post.slug}`;
      const analyticsData = ga4Data.get(pagePath);

      const monthlyViews = analyticsData
        ? Array.from(analyticsData.months.entries()).map(([month, views]) => ({
            month,
            views,
          }))
        : [];

      const totalViews = analyticsData?.totalViews || 0;
      const avgViewsPerMonth = monthlyViews.length > 0 ? totalViews / monthlyViews.length : 0;

      // Calculate trend
      let trend: 'increasing' | 'declining' | 'stable' = 'stable';
      let trendPercentage = 0;

      if (monthlyViews.length >= 2) {
        const firstHalf = monthlyViews.slice(0, Math.floor(monthlyViews.length / 2));
        const secondHalf = monthlyViews.slice(Math.floor(monthlyViews.length / 2));

        const avgFirst = firstHalf.reduce((sum, m) => sum + m.views, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((sum, m) => sum + m.views, 0) / secondHalf.length;

        if (avgFirst > 0) {
          trendPercentage = ((avgSecond - avgFirst) / avgFirst) * 100;
          if (trendPercentage > 10) trend = 'increasing';
          else if (trendPercentage < -10) trend = 'declining';
        }
      }

      return {
        ...post,
        monthlyViews,
        totalViews,
        avgViewsPerMonth: Math.round(avgViewsPerMonth),
        trend,
        trendPercentage: Math.round(trendPercentage),
      };
    });

    // Sort by average views (lowest first)
    blogPerformance.sort((a, b) => a.avgViewsPerMonth - b.avgViewsPerMonth);

    // Output results
    console.log('\n' + '='.repeat(100));
    console.log('LOW-PERFORMING BLOG POSTS (Candidates for Deletion or Improvement)');
    console.log('='.repeat(100) + '\n');

    const lowPerformers = blogPerformance.filter((p) => p.avgViewsPerMonth < 50);

    console.log(`Found ${lowPerformers.length} posts with <50 avg views/month:\n`);

    lowPerformers.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   URL: https://www.rosterlab.com/blog/${post.slug}`);
      console.log(`   Published: ${new Date(post.publishedAt).toLocaleDateString()}`);
      console.log(`   Total Views (6 months): ${post.totalViews}`);
      console.log(`   Avg Views/Month: ${post.avgViewsPerMonth}`);
      console.log(`   Trend: ${post.trend} (${post.trendPercentage > 0 ? '+' : ''}${post.trendPercentage}%)`);
      console.log(`   Monthly Breakdown:`);
      post.monthlyViews.forEach((m) => {
        console.log(`      ${m.month}: ${m.views} views`);
      });
      console.log('');
    });

    // Export to CSV
    console.log('\n' + '='.repeat(100));
    console.log('CSV FORMAT');
    console.log('='.repeat(100) + '\n');

    console.log('Title,URL,Published Date,Total Views,Avg Views/Month,Trend,Trend %,Dec 2025,Jan 2026,Feb 2026,Mar 2026,Apr 2026,May 2026');

    blogPerformance.forEach((post) => {
      const monthsMap = new Map(post.monthlyViews.map((m) => [m.month, m.views]));
      const months = ['202511', '202512', '202601', '202602', '202603', '202604', '202605'];
      const monthValues = months.map((m) => monthsMap.get(m) || 0);

      console.log(
        `"${post.title}","/blog/${post.slug}","${new Date(post.publishedAt).toLocaleDateString()}",${post.totalViews},${post.avgViewsPerMonth},${post.trend},${post.trendPercentage},${monthValues.join(',')}`
      );
    });

  } catch (error: any) {
    console.error('Error fetching GA4 data:', error.message);
    console.error('\nMake sure you have:');
    console.error('1. Installed @google-analytics/data: pnpm add @google-analytics/data');
    console.error('2. Set GOOGLE_APPLICATION_CREDENTIALS environment variable');
    console.error('3. Set GA4_PROPERTY_ID environment variable');
    console.error('4. Granted service account "Viewer" access to GA4 property');
  }
}

analyzeBlogs();
