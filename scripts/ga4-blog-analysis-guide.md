# GA4 Blog Performance Analysis Guide

This guide will help you identify low-performing blog posts that should be considered for deletion or improvement.

## Step 1: Export Blog Post Traffic from GA4

### Option A: Using GA4 Interface (Recommended)

1. **Go to GA4 → Reports → Engagement → Pages and screens**

2. **Set the date range to last 6 months** (Nov 28, 2025 - May 28, 2026)

3. **Add a filter:**
   - Click "+ Add filter"
   - Select "Page path and screen class"
   - Choose "contains"
   - Enter: `/blog/`

4. **Customize the report:**
   - Click the pencil icon (Customize report)
   - Add these metrics:
     - Views
     - Users
     - Average engagement time
     - Bounce rate (if available)

5. **Add date comparison:**
   - Click "Compare" at the top
   - Add comparison for "Previous period" to see trends

6. **Export the data:**
   - Click the download icon (top right)
   - Choose "Google Sheets" or "CSV"

### Option B: Using GA4 Explorations (More Detailed)

1. **Go to GA4 → Explore → Create new exploration**

2. **Setup:**
   - Date range: Last 6 months
   - Dimensions:
     - Page path
     - Month (or Date)
   - Metrics:
     - Views
     - Users
     - Sessions
     - Average engagement time per session
   - Segment filters: Page path contains `/blog/`

3. **Create a table:**
   - Rows: Page path, Month
   - Values: Views, Users, Sessions
   - This will show monthly breakdown

4. **Export to Google Sheets**

## Step 2: Analyze Low Performers

### Criteria for Low-Performing Posts:

1. **Traffic Volume:**
   - Less than 50 views per month on average
   - Declining trend over 6 months

2. **User Engagement:**
   - Average engagement time < 30 seconds
   - High bounce rate (>80%)

3. **Strategic Fit:**
   - Outdated content (old dates, obsolete info)
   - Off-brand topics
   - Duplicate/overlapping topics with better-performing posts

4. **SEO Considerations:**
   - Posts with zero or very few backlinks
   - Not ranking for any target keywords
   - Thin content (< 500 words)

### Formula for "Delete Score":
```
Delete Score = (
  (Low Traffic: 0-50 views/month = 3 points, 51-100 = 2 points, 101-200 = 1 point) +
  (Declining Trend: -50% = 3 points, -25% = 2 points) +
  (Low Engagement: <30s = 2 points, 30-60s = 1 point) +
  (Age: >2 years old = 1 point) +
  (No updates since publish = 1 point)
)

Score 7+: Strong candidate for deletion
Score 4-6: Consider consolidating with better posts
Score 1-3: Keep but may need updating
```

## Step 3: Create Monthly Breakdown

Once you have the GA4 data, create a spreadsheet with:

| Blog Post Title | URL | Dec 2025 | Jan 2026 | Feb 2026 | Mar 2026 | Apr 2026 | May 2026 | Avg/Month | Trend | Delete Score |
|-----------------|-----|----------|----------|----------|----------|----------|----------|-----------|-------|--------------|

## Alternative: Use GA4 API

If you want to automate this, I can create a script using the GA4 Data API. You'll need:
1. GA4 Property ID
2. Google Cloud Project with Analytics Data API enabled
3. Service account credentials JSON file

Let me know if you want me to create that script!

## Quick GA4 Query Example

You can also use the GA4 Query Explorer:
https://ga-dev-tools.google/ga4/query-explorer/

**Configuration:**
- Property: Select your GA4 property
- Date Range: 2025-11-28 to 2026-05-28
- Dimensions: `pagePath`
- Metrics: `screenPageViews`, `activeUsers`, `averageSessionDuration`
- Dimension Filter: `pagePath CONTAINS /blog/`
- Order by: `screenPageViews DESC`
