# US healthcare and workforce terminology review

Reviewed manually authored US healthcare pages, generated resources, and the 59 published CMS resources cached for the migration audit. Changes affect local US rendering; global content and CMS source documents are unchanged.

## Applied wording

| Context | US wording |
| --- | --- |
| Clinical consultants in Auckland case-study narrative | Attending physicians after an initial explanation of the original consultant role |
| Actual early-career Auckland consultant | Early-career consultant physician; not a resident |
| Actual Perth AMU registrar | Acute medical unit registrar (physician in specialty training) |
| Australian junior-doctor cohort | Physicians in training |
| Generic imaging staffing | Imaging technologists; MRI technologist for MRI-specific webinar narrative |
| Hospital wards in generic product copy | Units |
| Operating theatres | Operating rooms |
| Paeds / paediatrics | Pediatrics |
| Generic annual leave requests | Vacation |
| Hours per fortnight | Hours over two weeks |
| Generic aged care | Senior care |
| Generic GP guidance | Primary care physician |
| Physician locum coverage | Locum tenens coverage |
| Temporary nursing coverage | Agency or temporary nursing staff |
| Generic penalty-rate discussion | Additional pay or conditional shift premiums |
| Generic EBA rules | Applicable employment-agreement rules |

Professional titles are not global dictionary substitutions. International registrar grades do not establish US residency level or chief-resident responsibilities. Business consultants, nonclinical registrars, fellows, allied health, named employers, formal testimonial titles, and quoted testimony remain intact. Specific NZ radiography research participants retain their original role descriptions. Editorial CMS US overrides take precedence.

Context-dependent CMS changes are maintained in `lib/localization/us-terminology.ts`, scoped by resource slug and using existing quotation, protected-annotation, and rich-text-span safeguards. Phrase changes should be reviewed again when the underlying CMS wording changes. Generated resource edits belong in `scripts/generate-us-resources.ts`.

The open-shifts and fixed-shifts articles also had Australian employment-status and compensation wording. The US adaptations remove suggestions that open shifts preserve a casual legal classification, replace award terminology, and avoid universal premium-pay or meal-break requirements. This vocabulary review is not a review of every legal or product-compliance claim across the resource library; the separate marketing audit still records those items.

Role references: [ACGME glossary](https://www.acgme.org/globalassets/pdfs/ab_acgmeglossary.pdf), [BLS radiologic and MRI technologists](https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm). Employment references: [DOL vacation leave](https://www.dol.gov/general/topic/workhours/vacation_leave), [DOL shift-differential guidance](https://www.dol.gov/sites/dolgov/files/WHD/legacy/files/2006_05_04_7NA_FLSA.pdf).

Regression checks cover contextual role mappings, source immutability, split formatting, quotations and attributions, editorial overrides, and replacement of employment-status claims. Resource generation remains reproducible.

## Final follow-up sweep

The final sweep also inspected the localized output of all 59 cached CMS resources, manually authored US text/metadata, and shared components used by the US homepage and feature pages. It corrected Sydney SMO narrative, generic casual staffing and public-holiday wording, additional hospital-unit references, handoff wording, US spelling in product/pricing copy, shared AI/fairness demo copy, and the homepage webinar/case-study destinations. Global shared-component defaults remain unchanged.

Intentional remaining regional wording includes original customer quotations and formal titles, the named Australian/NZ/UK research cohorts, regional agreement names (MECA/EBA/NZNO/MERAS), historical source slugs and asset paths, and the quiz character name Dwayne "The Roster" Johnson. The downloaded PDFs and text embedded in existing images/video are not translated by the page text localization layer.

Validation: 39 localization tests pass, including server-rendered shared-component checks that compare US copy with global defaults. Generated resources are checked for reproducibility. Browser screenshot verification remains incomplete because browser execution approval was unavailable in the previous run; automated rendering tests do not substitute for that visual check. This review is a terminology signoff, not an all-clear for the separate currency, legal-claim, or publication-evidence items in the marketing review.

## Regional explanation follow-up

Preserving a regional term alone is insufficient for US readers. `us-regional-context.ts` now adds a short, reviewed explanation before the first relevant passage in each selected resource. Terms first appearing inside customer quotations are explained outside the quotation. Notes are grouped at the same insertion point, do not split lists, and are not duplicated or retranslated on subsequent processing. Editorial US body overrides remain authoritative.

Explanations cover MECA, Australian EBA and AMA, NZNO, MERAS, MRT, NZIMRT, radiographer, NHS, former District Health Boards, Cornerstone accreditation, CCDM/NHPPD, and WA (Western Australia). Generic US guidance uses collective bargaining agreement / union contract wording rather than implying Australian or NZ agreements apply to US employers. CIPD is expanded in its research citation; AL is explained alongside the original Excel screenshot legend. US testimonial cards retain original titles and add descriptions for senior registrar, junior consultant, MIT, and the RPA newborn-care role.

These definitions are supported by:

- [Employment New Zealand: multi-employer bargaining](https://www.employment.govt.nz/fair-work-practices/unions-and-bargaining/collective-bargaining/starting-collective-bargaining), [Fair Work: awards](https://www.fairwork.gov.au/employment-conditions/awards), and [WA Health: Australian Medical Association employment agreement](https://www.wacountry.health.wa.gov.au/Our-workforce/Work-with-us/Medical-workforce/Medical-practitioner-salaries-and-benefits).
- [NZNO’s MECA review](https://nzno.org.nz/about_us/nzno_in_the_news/artmid/8374/articleid/1773/nzno-releases-dhb-meca-independent-review-report), [MERAS](https://meras.midwife.org.nz/), and [New Zealand’s 2022 health reforms](https://www.health.govt.nz/information-releases/proactive-release-of-reforms-related-documents).
- [NZ imaging profession scopes](https://www.mrtboard.org.nz/pre-registration/about-the-professions/about-medical-imaging-and-radiation-therapy-practitioners), [MIT role](https://www.healthnz.govt.nz/careers/roles/clinical/allied-health-science-technical/medical-imaging-technologists), [NZIMRT’s historical conference material](https://my.nzimrt.co.nz/Framework/ResourceManagement/GetResourceObject.aspx?ResourceID=627d94b2-8b34-41d1-b69b-45d6b90683d8), and [Royal Prince Alfred newborn care](https://www.slhd.nsw.gov.au/rpa/neonatal/default.html).
- [Cornerstone](https://www.rnzcgp.org.nz/running-a-practice/cornerstone/), [CCDM](https://www.health.govt.nz/publications/nursing-safe-staffing-review-and-report-on-the-review-of-the-care-capacity-demand-management-ccdm), [NHPPD](https://www.health.wa.gov.au/Articles/N_R/Nurse-Midwife-to-patient-ratios), [CIPD](https://www.cipd.org/en/about/our-history/), and [NHS England](https://www.england.nhs.uk/about/).

The review scanned all uppercase abbreviations in the 59 cached resources as well as regional terms in US source files. Familiar US clinical/workforce abbreviations such as ICU, MRI and FTE do not require a foreign-term gloss. Source-specific names already explained in the article, such as HealthX, are retained. This pass adds textual explanations; it does not alter historic media, claim current legal compliance, or resolve the separately recorded marketing-evidence issues.

Follow-up validation: 46 localization tests pass; all 55 generated resources are current; independent technical review approved the changes. The repository-wide type check reports only the previously recorded duplicate JSX attributes in `scene.jsx`, missing Sanity test/GA4 packages, and the GA4 script's implicit `row` type. No new type errors were reported for this change. Browser visual QA remains incomplete.
