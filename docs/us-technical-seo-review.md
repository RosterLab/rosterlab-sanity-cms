# US technical SEO review

Reviewed September 9, 2026. Changes are local; this is a code and fixture audit, not a crawl of the deployed site or confirmation of Google indexing.

## Scope and result

Reviewed all 67 mapped US route pairs: 61 indexable static routes and six intentionally nonindexed quiz-result routes. Also checked effective titles and descriptions for 59 cached CMS articles (43 blogs and 16 case studies/news articles), plus the shared dynamic article metadata and sitemap implementations. Cached articles are not a fresh production CMS export.

Independent code review approved the final changes. All 53 localization tests pass, all 55 generated resource files are current, and `git diff --check` passes. Repository-wide TypeScript checking still reports existing errors in the roster animation, Sanity tests, and GA4 script; no new SEO errors were identified.

## Verified behavior

| Area | Result |
| --- | --- |
| Canonicals | Mapped US pages use self-referencing production URLs. Global pages retain their global canonicals. Dynamic articles use the returned CMS slug consistently. |
| Hreflang | Indexable route pairs have reciprocal absolute links: `en`, `en-AU`, and `en-NZ` point to global; `en-US` points to US; `x-default` points to global. |
| Titles and descriptions | All mapped routes have populated metadata. All 59 cached articles have effective titles and descriptions, with no duplicate effective titles in that sample. |
| Indexing | Existing noindex policies remain for quiz results, pagination, private survey links, unlocked whitepapers, and confirmation pages. |
| Discovery | Robots permits US pages. Sitemap tests verify indexable US mappings and paired dynamic article URLs, exclusions, and URL uniqueness. |
| Language | US HTML uses `en-US`; US article structured data also declares `en-US`. |

## Issues fixed

1. **Duplicate title branding.** Already-branded titles now use an absolute title so the root `RosterLab` title template does not append the brand again. Unbranded titles still inherit the template.
2. **Noindex hreflang conflicts.** Metadata for nonindexable pages retains its canonical but does not advertise language alternates.
3. **Broken social images.** Corrected image paths on 18 authored US pages and replaced nonexistent timesheet/whitepaper images with existing assets and their actual dimensions. Generated US resources inherit the source corrections. US Open Graph locale is `en_US`.
4. **Preview-origin leakage.** Metadata base and US article URL generation consistently use the production origin so preview environment variables cannot change canonical, social, or structured-data URLs.
5. **Description clipping.** US case studies and newsroom articles now preserve complete editorial descriptions, falling back to the excerpt or a short page-specific description. Removed legacy padding and fixed-length truncation from those generated US pages.
6. **Sitemap dates and exclusions.** Removed request-time timestamps from static URLs. CMS timestamps are emitted only when valid; missing or invalid dates no longer break XML generation. Excluded exact redirect sources and the six noindex US quiz results. The public quiz landing page remains discoverable.

## Guidance applied

- Localized equivalents can be indexed separately using consistent canonical and reciprocal hreflang signals. US pages should not all canonicalize to global pages. See Google's [localized versions guidance](https://developers.google.com/search/docs/specialty/international/localized-versions) and [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Meta descriptions have no fixed character limit; Google truncates snippets as needed and may choose page text instead. Longer descriptions alone are not a technical failure. See [Google's snippet guidance](https://developers.google.com/search/docs/appearance/snippet).
- Sitemap `lastmod` should reflect a significant page update, not the time the sitemap was requested. See [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- Geo meta tags are unnecessary for this setup. Hreflang is already provided in HTML metadata; duplicating it in XML is not required. See [Google's regional site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).

## Deployment checks still required

After deployment, inspect representative US/global blog, case-study, webinar, and landing-page pairs in rendered HTML. Confirm successful HTTP responses, one canonical, reciprocal hreflang, titles/descriptions, robots directives, and publicly accessible social images. Verify legacy and uppercase/plural aliases redirect to the intended URLs while preserving queries.

Fetch the live sitemap and confirm its production CMS entries and exclusions. Use Search Console URL Inspection for representative US pages to check crawlability and Google's selected canonical, then monitor US impressions, indexing, and existing global traffic. Code validation cannot establish these live Google outcomes.

This technical review does not resolve separate editorial questions about currency, quantified marketing claims, compliance claims, or localization of embedded PDFs, images, and videos.
