export type FreeSignupDecision = "show" | "hide";

export type DemoDecision = "us_24_7" | "nzt_business_hours" | "request_review";

export type MarketAccessReason =
  | "us"
  | "gni_30k"
  | "high_income_only"
  | "below_high_income"
  | "unknown_country"
  | "manual_override"
  | "gating_disabled";

export interface MarketAccessDecision {
  policyVersion: string;
  countryCode: string | null;
  freeSignup: FreeSignupDecision;
  demo: DemoDecision;
  reasonCode: MarketAccessReason;
}

export interface MarketAccessCountry {
  iso2: string;
  iso3: string;
  name: string;
  incomeLevel: string;
  gniPerCapitaUsd: number | null;
  gniDataYear: number | null;
}

export interface MarketAccessOverride {
  freeSignup?: FreeSignupDecision;
  demo?: DemoDecision;
  reason: string;
  owner: string;
  reviewDate: string;
}

export interface MarketAccessPolicyData {
  policyVersion: string;
  generatedAt: string;
  fiscalYear: number;
  gniDataYear: number;
  demoGniThresholdUsd: number;
  countries: Record<string, MarketAccessCountry>;
  overrides: Record<string, MarketAccessOverride>;
}
