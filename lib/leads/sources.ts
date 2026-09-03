export const LEAD_SOURCES = [
  "contact",
  "newsletter",
  "calculator-roi",
  "calculator-fte",
  "roster-analysis",
  "ai-assistant-waitlist",
  "template-excel",
  "template-timesheet",
  "template-shift-swap",
  "template-employee-of-month",
  "personality-quiz",
  "case-study",
  "demo-video",
  "whitepaper",
  "demo-request",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

const MUST_BE_RECORDED = new Set<LeadSource>([
  "contact",
  "newsletter",
  "ai-assistant-waitlist",
  "demo-request",
]);

export function mustRecordLead(source: LeadSource): boolean {
  return MUST_BE_RECORDED.has(source);
}
