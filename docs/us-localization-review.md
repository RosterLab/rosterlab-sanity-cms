# US localization review — September 9, 2026

## Scope and conclusion

Independent review covered the migrated resource routes and 59 cached published
Sanity articles (43 blogs and 16 case studies/newsroom articles). Technical
localization is implemented, but language conversion alone does not make every
source article fully adapted for US readers. No content was published or edited
in Sanity during this review.

## Corrections applied

- Survey admin creator-share links now stay on the US route, including local
  preview origins; private IDs and tokens remain unchanged.
- Added missing American spellings: specialize, realize, utilize, summarize,
  program and related forms. Existing quotation/name protections still apply.
- Generic FTE calculator allowances say “vacation” in US copy. Source/global
  copy and customer testimony are unchanged.
- Six existing US industry CTAs now point to US pricing, demo or savings pages
  (airport/transportation, industry index, pathology, telehealth and veterinary).
- Added generic `en` pointing to the global equivalent, alongside the existing
  regional hreflang and `x-default` annotations.

## Editorial work still needed

**Confirm currencies before labeling savings.** Do not convert amounts or infer
currencies from a customer's location. Source text currently does not identify
the currency for these examples:

- US whitepaper landing: `$80K+` and `$800k+` savings claims.
- `radiology-department-auckland`: `$80,000+` annually.
- `sydney-tertiary-hospital-saves-300-hours-with-ai-rostering`: `$40,000` annually.
- `westernaustralia-oldest-tertiary-hospital-expands-partnership-with-rosterlab`:
  approximately `$5,000` weekly.

Once verified against the original customer evidence, use explicit currency
codes in Sanity US overrides and the whitepaper source copy. US readers should
not have to assume these figures are US dollars.

**Adapt regional concepts individually.** Employment terms such as penalty rates,
annual leave, fortnight and aged care need context. Preserve historical customer
facts and quotes; use editorial overrides for general US guidance instead of
blind replacements. AU/NZ legal or contractual guidance needs a separate US
editorial review before being presented as US advice.

**Original assets remain original.** Downloads, image text and recorded webinar
content are shared assets. The US landing pages do not turn them into US-specific
research, recordings or customer stories.

## URL and SEO findings

Article and product links in the 59 audited bodies resolve through the US route
mapping. Remaining global author links have no US counterpart; original download
URLs are intentional. Existing source slugs containing “rostering” are preserved
under `/us`; changing them is not required for valid regional URLs.

Self-canonicals, reciprocal hreflang, public sitemap inclusion and private-page
noindex handling are in place. This helps search engines identify regional
versions; it does not guarantee separate indexing or US traffic growth.

Checked against [Google's localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions)
and [multi-regional site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
Google recommends a generic language catchall when several regions share a
language. HTML hreflang is sufficient; duplicating it in the sitemap is optional.
