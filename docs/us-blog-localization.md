# US blog localization

The global article in Sanity remains the source of truth. `/us/blog`, pagination,
and `/us/blog/[slug]` render that same content through `lib/localization/us-blog.ts`.
Slugs, IDs, author identities, category labels, and assets are preserved. Global
pages keep their original text. Both regions use the same page components.

## Automatic changes

The dictionary converts whole words with matching capitalization: roster/rosters/
rostering, re-rostering, and common US spelling such as optimize, organization,
color, labor, and center. It adapts titles, summaries, body text, image alt text,
and SEO titles/descriptions. Quotes (including quotes split across rich-text
spans), blockquotes, code, literal URLs, and email addresses remain verbatim.

Contextual terms such as employee, leave, aged care, professional titles, and
holiday names are intentionally excluded. The dictionary does not reinterpret
regional laws or replace references to AU/NZ institutions with US equivalents.

## Editorial controls in Sanity

Open the existing post's **US resource localization** field:

- **Keep these phrases unchanged:** protect exact organization names, legislation
  titles, brands, and other phrases containing dictionary words. This works
  across rich-text formatting boundaries. The dictionary cannot reliably identify
  arbitrary proper names; review affected names before publishing new content.
- **US title / US summary / US SEO title / US SEO description:** optional exact
  overrides. Otherwise the global values are adapted automatically. A US title
  or summary is also the SEO fallback unless a US SEO override is supplied.
- **US article body:** optional complete editorial version, displayed without
  dictionary conversion. Leave empty to adapt the global body automatically.
- In rich text, apply **Keep original wording in US version** to selected wording
  that needs to remain verbatim. This annotation has no visible styling.

Overrides require normal Sanity publishing. No migration or duplicate articles
are needed. Existing source documents are not changed by this feature.

Internal blog and mapped product links route to US equivalents, retaining query
strings and heading anchors. This also applies to editorial body overrides.
Resources without US routes and external/author links retain their destinations.
Case studies, newsroom and the remaining resource routes are covered in
[US resource localization](./us-resource-localization.md).
Text embedded inside images, PDFs, and videos is not translated.

Both regional versions have self-canonical URLs and reciprocal hreflang tags;
US blog articles are included in the sitemap. Pagination remains noindex.

Validation: `npx jest lib/localization/__tests__/us-blog.test.ts --runInBand`.
