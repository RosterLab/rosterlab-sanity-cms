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

/** Exact Attio `hs_buying_role` option titles for each website answer. */
export const CONTACT_DECISION_ROLE_ATTIO_VALUES = {
  "I manage or create the roster": "END_USER",
  "I manage or create the schedule": "END_USER",
  "I influence the decision": "I INFLUENCE THE DECISION",
  "I make the decision": "DECISION_MAKER",
} as const satisfies Record<ContactDecisionRole, string>;
