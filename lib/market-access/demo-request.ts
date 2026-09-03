/**
 * Answer sets for the demo request form shown to countries without live demo
 * coverage.
 *
 * Every value is the exact option title of the matching Attio People attribute
 * (see `ATTIO_SETUP.md`), so the workflow can write the answer straight onto
 * the record without a lookup table. Reordering is fine; renaming is not —
 * an unrecognised title is dropped by Attio.
 */

/**
 * Attio People → `industry_multi_select` ("Industry"), split into the two
 * groups the dropdown shows as headers. Most of the list is clinical, so
 * sending healthcare visitors to their own block saves them reading past the
 * rest.
 */
const HEALTHCARE_INDUSTRIES = [
  "Critical Care & Emergency",
  "Medicine",
  "Surgical",
  "Women & Children Health",
  "Nursing & Midwifery",
  "Primary Care & Urgent Care",
  "Junior Doctors",
  "Aged Care",
  "Veterinary",
  "Other Healthcare",
] as const;

const OTHER_INDUSTRIES = [
  "Retail",
  "Call Centres",
  "Education",
  "Government",
  "Hospitality",
  "Logistics",
  "Manufacturing",
  "Transportation Crews",
  "Legal Teams",
  "Other",
] as const;

export const DEMO_REQUEST_INDUSTRY_GROUPS = [
  { label: "Healthcare", options: HEALTHCARE_INDUSTRIES },
  { label: "Non-healthcare", options: OTHER_INDUSTRIES },
] as const;

/** The same options as one list, for validating a submission. */
export const DEMO_REQUEST_INDUSTRIES = [
  ...HEALTHCARE_INDUSTRIES,
  ...OTHER_INDUSTRIES,
] as const;

/** Attio People → `how_did_you_hear_about_us_3` ("How did you hear about us?"). */
export const DEMO_REQUEST_REFERRAL_SOURCES = [
  "Search (Google/Bing etc)",
  "Referral from Colleague / Friend",
  "Gen AI (ChatGPT/Claude/Perplexity etc)",
  "Webinars",
  "Conference/Event",
  "Online Article / Blog",
  "Social media",
  "Ads",
  "Mini Tools",
  "Outbound Campaigns",
  "Health X",
  "News / Press",
  "Other",
] as const;

/** Attio People → `num_of_rostered_staff` ("Num of rostered staff"), a text field. */
export const DEMO_REQUEST_ROSTER_SIZES = [
  "1 - 15 staff",
  "16 - 50 staff",
  "51 - 100 staff",
  "100+ staff",
] as const;

export type DemoRequestIndustry = (typeof DEMO_REQUEST_INDUSTRIES)[number];
export type DemoRequestReferralSource =
  (typeof DEMO_REQUEST_REFERRAL_SOURCES)[number];
export type DemoRequestRosterSize = (typeof DEMO_REQUEST_ROSTER_SIZES)[number];
