import { localizeUSText } from "@/lib/localization/us-text";

// Scoped to enterprise marketing copy: regional staffing terms here do not
// change the original articles or terminology elsewhere on the site.
const TERMINOLOGY = {
  "junior doctors": "physicians in training",
  doctors: "physicians",
  doctor: "physician",
  "locum and agency cover": "locum tenens and agency staffing",
  "agency and locum cover": "agency and locum tenens staffing",
  "penalty costs": "premium pay",
  resourcing: "staffing",
  authorised: "authorized",
  "mrt team leader": "Radiologic Technologist Team Leader",
};

export function enterpriseText(text: string, isUS = false): string {
  if (!isUS) return text;
  // These short case-study excerpts also use scheduling terminology on the
  // US site. Keep proper names, geography, figures and other claims intact.
  const terms = text
    .replace(
      /junior doctors' wellbeing/g,
      "the well-being of physicians in training",
    )
    .replace(/\brostering\b/gi, (word) =>
      word === "Rostering" ? "Scheduling" : "scheduling",
    )
    .replace(/\brosters\b/gi, (word) =>
      word === "Rosters" ? "Schedules" : "schedules",
    )
    .replace(/\broster\b/gi, (word) =>
      word === "Roster" ? "Schedule" : "schedule",
    )
    .replace(/junior doctors/g, "physicians in training");
  return localizeUSText(terms, [], TERMINOLOGY);
}

// These are illustrative US workforce labels, rather than translations of a
// particular hospital's employment classifications.
export const US_ENTERPRISE_TEAMS: Record<string, string> = {
  "Senior medical": "Physicians",
  "Junior medical": "Residents",
  Consultants: "Attendings",
  Registrars: "Specialists",
  "House officers": "Interns",
  RMOs: "Residents",
  "Resus RNs": "ED RNs",
  "Enrolled nurses": "LPNs",
  Physiotherapy: "Physical therapy",
  "Ward clerks": "Unit clerks",
  HCAs: "Nursing assistants",
};
