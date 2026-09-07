import policyJson from "./data/policy-current.json";
import type { MarketAccessDecision, MarketAccessPolicyData } from "./types";

export const marketAccessPolicy = policyJson as MarketAccessPolicyData;

export function normalizeCountryCode(
  countryCode: string | null | undefined,
): string | null {
  const normalized = countryCode?.trim().toUpperCase() || "";
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

export function evaluateMarketAccess(
  suppliedCountryCode: string | null | undefined,
  options: { disabled?: boolean } = {},
): MarketAccessDecision {
  const countryCode = normalizeCountryCode(suppliedCountryCode);

  if (options.disabled) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode,
      freeSignup: "show",
      demo: countryCode === "US" ? "us_24_7" : "nzt_business_hours",
      reasonCode: "gating_disabled",
    };
  }

  if (!countryCode) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode: null,
      freeSignup: "hide",
      demo: "request_review",
      reasonCode: "unknown_country",
    };
  }

  const country = marketAccessPolicy.countries[countryCode];
  if (!country) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode,
      freeSignup: "hide",
      demo: "request_review",
      reasonCode: "unknown_country",
    };
  }

  const freeSignup = country.incomeLevel === "HIC" ? "show" : "hide";
  const demo =
    country.gniPerCapitaUsd !== null &&
    country.gniPerCapitaUsd >= marketAccessPolicy.demoGniThresholdUsd
      ? countryCode === "US"
        ? "us_24_7"
        : "nzt_business_hours"
      : "request_review";

  const override = marketAccessPolicy.overrides[countryCode];
  if (override) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode,
      freeSignup: override.freeSignup ?? freeSignup,
      demo: override.demo ?? demo,
      reasonCode: "manual_override",
    };
  }

  return {
    policyVersion: marketAccessPolicy.policyVersion,
    countryCode,
    freeSignup,
    demo,
    reasonCode:
      demo === "us_24_7"
        ? "us"
        : demo === "nzt_business_hours"
          ? "gni_30k"
          : freeSignup === "show"
            ? "high_income_only"
            : "below_high_income",
  };
}
