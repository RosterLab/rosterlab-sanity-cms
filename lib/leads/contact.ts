export const CONTACT_DECISION_ROLES_GLOBAL = [
  "I manage or create the roster",
  "I influence the decision",
  "I make the decision",
] as const;

export const CONTACT_DECISION_ROLES_US = [
  "I manage or create the schedule",
  "I influence the decision",
  "I make the decision",
] as const;

export const CONTACT_DECISION_ROLES = [
  ...CONTACT_DECISION_ROLES_GLOBAL,
  ...CONTACT_DECISION_ROLES_US,
] as const;

export type ContactDecisionRole = (typeof CONTACT_DECISION_ROLES)[number];
