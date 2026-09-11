# US resources

US case studies, newsroom, webinars, whitepapers, templates, tools and games are
available locally beneath `/us`, alongside the existing US blogs and savings
calculator. Nothing in this change publishes the site or writes CMS documents.

## Source and maintenance

The global resource files are the source of truth for layouts, static content,
forms and tool logic. `npm run localize:resources` regenerates the checked-in US
variants; do not edit files with the generated banner directly. Run
`npm run localize:resources:check` to detect stale output after editing a source.
The generator records each source path and uses the TypeScript syntax tree to
localize visible copy and known page destinations, preserving APIs, storage
keys, assets and identifiers. The resource regression tests independently
compare calculator numbers and form/storage/CSV call arguments with the sources.

The personality quiz uses shared client components with an `isUS` prop for copy
and destinations, including downloadable reports. Its global and US route files
retain their own metadata and recommended-post queries. Quiz files are maintained
directly and are excluded from resource generation.

CMS articles still use the same Sanity documents. Case studies and newsroom
support the same `US resource localization` overrides, protected terms and
`usPreserve` annotations as blogs. Official customer names, locations, dates,
statistics and quoted testimony remain grounded in the original story. The
published case-study/newsroom audit identified Dargaville Medical Centre and
Melbourne Convention & Exhibition Centre as names requiring default protection.
Editors should add new names to protected terms when publishing future content.

American terminology is applied to the website copy. The existing whitepaper
PDF, Excel/document templates, recorded webinar audio/video and text embedded in
images remain the original assets. These files are not represented as newly
written US research or US customer results. The FTE calculator's generated
reports use US date formatting; its inputs and calculations are unchanged.

## Routes and SEO

`lib/localization/resource-routes.ts` is the public route registry. Static pages
retain the source slug beneath `/us`; CMS case studies and newsroom use dynamic
slug pairs. Resource menus, footer links, related articles and tool navigation
keep readers in the US section. US/global pages have their own canonical URLs
and reciprocal `en-US`, `en-AU`, `en-NZ`, generic `en`, and `x-default` links.

The sitemap includes public US resource routes and published case-study/newsroom
articles. Private survey/admin URLs, unlocked whitepaper pages and pagination
are excluded; private pages remain noindex. Survey IDs, authorization tokens,
request origin, user-entered content, form endpoints and gate storage keys are
preserved. Preview/testing must not submit real leads or send survey messages.

## Verification

Shared template forms use `lib/localization/us-hubspot-form.ts` only on US
pages. It localizes the Excel download button, industry label and three industry
option labels through the legacy embed configuration and ready callback. Option
values, selection, required markers, consent copy and success handlers remain
unchanged. Browser QA verified all four forms and a US/global comparison without
submitting leads. Their publicly loaded inline confirmations use neutral wording;
externally configured follow-up emails have not been inspected.

The form integration follows [HubSpot's legacy embed documentation](https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms).

Run `npx jest lib/localization/__tests__ --runInBand`, the regeneration check,
and `npm run build`. Browser QA should cover the resource menu, content indexes
and details, desktop/mobile layouts, gate cancellation and prior-unlock paths,
template links, FTE calculations, quiz transitions/results and survey controls.
Use mocked API responses for submission success checks to avoid real leads.
