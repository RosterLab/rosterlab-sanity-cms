// Per-slug US editorial data for CMS-backed articles, all of it applied by
// localizeUSPost: narrative adaptations (profiles) and US SERP titles
// (usMetaTitles). Keyed by the published global slug, and always overridable
// from the usLocalization fields in Sanity, so an editor never has to wait on
// a deploy.
//
// US bodies localize their scheduling terminology in full - there is no
// per-article carve-out. An article that needs different wording gets a
// reviewed phrase mapping in `profiles`, or a US body written in Sanity.
//
// Route metadata for authored and generated pages lives elsewhere, in
// US_METADATA_OVERRIDES in ./us-resources.ts, keyed by US path. Rule of thumb:
// if the copy comes from Sanity it belongs here, if it comes from a page file
// it belongs there.
//
// Reviewed narrative adaptations, scoped to resources whose context is known.
// Never globally equate consultants, registrars, fellows or employment classes.
// us-blog applies these through the same quote/annotation protections as spelling.
const clinicalTraining = {
  "junior doctor department": "department of physicians in training",
  "junior doctor team": "team of physicians in training",
  "junior doctor": "physician-in-training",
  "junior doctors": "physicians in training",
};
const profiles: Record<string, Record<string, string>> = {
  "excel-series": {
    "leave (AL)": "vacation (shown as AL, for annual leave, in the example)",
  },
  "fixing-unsafe-staffing-with-scheduling-optimisation": { wards: "units" },
  "comprehensive-guide-shift-swaps": {
    "public holiday": "holiday",
    "night duty allowances or penal rates":
      "night-shift differentials or other premium pay",
  },
  "split-shifts-work-pattern": {
    "contractual/award/collective agreement requirements":
      "employment contract and collective bargaining agreement requirements",
    "employment agreements, awards, or laws":
      "employment agreements or applicable laws",
    "awards or collective agreements":
      "employment contracts or collective bargaining agreements",
    "contracts, awards, or collective agreements":
      "employment contracts or collective bargaining agreements",
  },
  "manage-night-shift-planning-wellbeing-effectively": {
    "penal rates": "premium pay rates",
    "relevant MECA clauses": "applicable employment-agreement provisions",
  },
  "how-to-optimise-shifts-during-a-hiring-freeze": {
    aotearoa: "Aotearoa (New Zealand)",
    locums: "temporary clinicians",
  },
  "fairer-scheduling-at-work-reducing-shift-bias": {
    "public holidays": "holidays",
  },
  "2-2-3-panama-shift-scheduling": {
    "casual or relief staff": "temporary or relief staff",
    "casual staff": "temporary staff",
  },
  "skeleton-staffing-guide-lean-operations-management": {
    "public holidays": "holidays",
    "public holiday": "holiday",
    wards: "units",
  },
  "rostering-basics": {
    "a rota, staff schedule or personnel planner depending on where you are from":
      "a shift schedule or personnel planner",
  },
  "how-to-reduce-absenteeism-for-shift-workers": {
    "CIPD (2023)":
      "the Chartered Institute of Personnel and Development (CIPD, 2023)",
    "buying hours and casual staff": "paying for additional staffing coverage",
    "casual or agency staff": "temporary or agency staff",
  },
  "4-on-4-off-rotating-shift-pattern": { "public holiday": "holiday" },
  "benefits-of-flexible-staff-scheduling": {
    "casual roles": "roles with variable hours",
  },
  "westernaustralia-oldest-tertiary-hospital-expands-partnership-with-rosterlab":
    clinicalTraining,
  "radiology-department-auckland": { theatre: "operating room" },
  rosterball: {
    "penalty rate": "pay premium",
    "that penalty": "that premium",
    "penalty shifts": "premium-pay shifts",
  },
  "sydney-tertiary-hospital-saves-300-hours-with-ai-rostering": {
    "senior medical officers (smos)":
      "senior medical officers (comparable to US attending physicians)",
    "smo rostering software": "physician scheduling software",
    "smo rosters": "attending physician schedules",
    "smo rostering": "attending physician scheduling",
    smos: "attending physicians",
  },
  "ukg-healthcare-rostering-software": {
    ...clinicalTraining,
    "Enterprise Bargaining Agreement rules (EBA or MECA or any form of union rules)":
      "Collective bargaining agreement or union contract requirements",
  },
  "how-plastics-department-used-roster-simulation-to-cut-in-costs":
    clinicalTraining,
  "auckland-tertiary-hospital-improves-fairness-for-on-call-roster": {
    "10 consultants":
      "10 consultant physicians (comparable to US attending physicians)",
    "junior consultant": "early-career consultant physician",
    consultants: "attending physicians",
  },
  "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters": {
    "AMU registrar":
      "acute medical unit registrar (physician in specialty training)",
  },
  "holiday-staff-scheduling-fairness": { "annual leave": "vacation" },
  "improving-cost-efficiency-staff-rostering": {
    "annual leave": "vacation",
    "contractual, union regulations, and awards":
      "employment contracts and collective bargaining agreements",
  },
  "how-to-navigate-staff-scheduling-trade-offs": {
    "penalty rates": "additional pay",
  },
  "improving-continuity-of-care-in-healthcare": {
    "aged care": "senior care",
    gp: "primary care physician",
    gps: "primary care physicians",
    ward: "unit",
    wards: "units",
  },
  "rotating-rosters": { "aged care": "senior care" },
  "shift-bidding-guide-how-to-implement": {
    speciality: "specialty",
    specialities: "specialties",
    "locum physicians": "locum tenens physicians",
    "locum coverage": "locum tenens coverage",
  },
  "real-cost-of-nurse-turnover-nurse-retention-strategy-through-scheduling-rostering":
    {
      "agency or locum staff": "agency or temporary nursing staff",
    },
  "guide-to-rostering": { ward: "unit", wards: "units" },
  "prevent-quiet-quitting-healthcare": { ward: "unit", wards: "units" },
  "future-of-workforce-scheduling": {
    "eba rules": "applicable employment-agreement rules",
  },
  "fixed-shifts-work-pattern": {
    "contracts, awards, or agreements": "employment contracts or agreements",
    "rest breaks, and penalties": "rest breaks, and premium pay",
    "Meal breaks: after a specified number of hours (often 4‑6), employees must be given a longer break (30‑60 minutes; paid or unpaid depending on law, award, agreement)":
      "Meal breaks: schedule meal periods according to applicable state and local requirements, employment agreements, and employer policies. Requirements and paid status vary",
    "casual workers": "workers with variable hours",
    "Part-time or casual fixed shift - same fixed hours but less than full-time; casual roles often involve fewer entitlements":
      "Part-time fixed shift - consistent scheduled hours below a full-time workload; benefits depend on eligibility and employer policies",
    "In many jurisdictions, fixed shifts at unsociable hours require penalty rates, overtime, and additional compensation":
      "Fixed shifts outside standard business hours may include shift premiums under employer policies or employment agreements. Overtime requirements depend on applicable law and employee classification",
  },
  "open-shifts-understanding-the-basics": {
    "Casual staff members work irregular hours without guaranteed shifts. If you schedule them regularly like permanent employees, they may legally qualify for part-time status and additional benefits like annual leave and sick pay":
      "Employees with variable hours may pick up available shifts. Benefit eligibility depends on applicable law, hours worked, and employer policies; using open shifts does not determine an employee’s legal status",
    "Since casuals typically receive fewer benefits, using open shifts helps maintain their casual employment status while giving them flexible work opportunities. This protects both the business from potential legal challenges and preserves the intended casual employment relationship":
      "Open shifts offer flexibility, but employers still need to track hours, apply benefit eligibility rules, and meet their obligations to employees",
    "casual staff": "staff with variable hours",
    "casual employees": "employees with variable hours",
  },
};

// US SERP titles for articles whose global headline survives localization
// unchanged, because it contains no roster terminology to swap. The title is
// the line searchers actually read, so on a US result these were reading as the
// AU/NZ page. Each is written to land 50-60 characters once the layout appends
// " | RosterLab", and keeps every fact from the global title.
//
// This is a fallback, not an override: usLocalization.metaTitle (or US title)
// set in Sanity always wins, so an editor can retire any entry here by filling
// the CMS field. Keyed by the published global slug.
export const usMetaTitles: Record<string, { when: string; use: string }> = {
  "4-on-4-off-rotating-shift-pattern": {
    when: "4 On 4 Off Rotating Shifts: Pros and Cons",
    use: "4 On 4 Off: Is This Shift Pattern Worth It?",
  },
  "fairer-scheduling-at-work-reducing-shift-bias": {
    when: "Fairer Scheduling: How to Reduce Shift Bias",
    use: "How to Remove Bias From Shift Schedules",
  },
  "shift-bidding-guide-how-to-implement": {
    when: "The Complete Guide to Shift Bidding",
    use: "Shift Bidding: How to Implement It at Work",
  },
  "skeleton-staffing-guide-lean-operations-management": {
    when: "Skeleton Staffing: Managing Lean Operations",
    use: "Skeleton Crew Staffing: How to Run Lean",
  },
  "auckland-tertiary-hospital-improves-fairness-for-on-call-roster": {
    when: "Auckland Hospital Improves On-Call Fairness",
    use: "Fairer On-Call Scheduling for Physicians",
  },
  "icu-unit-western-australia": {
    when: "Case Study: ICU in Western Australia",
    use: "ICU Case Study: Safer 24/7 Nurse Coverage",
  },
  "radiology-department-auckland": {
    when: "Auckland Radiology Boosts Staff Retention",
    use: "Radiology Case Study: Retaining Techs Longer",
  },
  "sydney-tertiary-hospital-saves-300-hours-with-ai-rostering": {
    when: "Sydney Hospital Saves 300+ Hours With AI",
    use: "AI Saves 300+ Hours on Physician Schedules",
  },
  "whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab":
    {
      when: "Whanganui Radiography Cuts Admin With AI",
      use: "Radiography Team Wins Back 179 Admin Hours",
    },
  "digital-health-week-2025-hinz": {
    when: "RosterLab at Digital Health Week 2025 (Hinz)",
    use: "Inside Digital Health Week 2025 With RosterLab",
  },
  "government-agency-chooses-rosterlab-to-help-streamline-staff-schedules": {
    when: "Government Agency Chooses AI Scheduling",
    use: "Public Sector Agency Adopts AI Scheduling",
  },
  "westernaustralia-oldest-tertiary-hospital-expands-partnership-with-rosterlab":
    {
      when: "AI Scheduling Expands in Western Australia",
      use: "Hospital Expands AI Physician Scheduling",
    },
};

// `when` records the global title each US title was written against. If an
// editor later rewrites the global headline, this override steps aside rather
// than pinning a US title to a version of the article that no longer exists -
// the localizer's own conversion is more current at that point.
export function usMetaTitleForResource(
  slug: unknown,
  globalMetaTitle: string | undefined,
): string | undefined {
  const entry = typeof slug === "string" ? usMetaTitles[slug] : undefined;
  return entry && entry.when === globalMetaTitle?.trim()
    ? entry.use
    : undefined;
}

export function terminologyForResource(slug: unknown): Record<string, string> {
  return Object.fromEntries(
    Object.entries(typeof slug === "string" ? profiles[slug] || {} : {}).map(
      ([phrase, replacement]) => [phrase.toLowerCase(), replacement],
    ),
  );
}
