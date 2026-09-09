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

  const country = countryCode
    ? marketAccessPolicy.countries[countryCode]
    : null;

  // The country list mirrors the World Bank feed, which only covers its own
  // members — so an economy can be missing from it without being unknown to us.
  // The base decision fails closed for those, and an override can then speak
  // for the ones we've actually reviewed.
  const { freeSignup, demo } = country
    ? {
        freeSignup: country.incomeLevel === "HIC" ? "show" : "hide",
        demo:
          country.gniPerCapitaUsd !== null &&
          country.gniPerCapitaUsd >= marketAccessPolicy.demoGniThresholdUsd
            ? countryCode === "US"
              ? "us_24_7"
              : "nzt_business_hours"
            : "request_review",
      }
    : { freeSignup: "hide", demo: "request_review" };

  const override = countryCode
    ? marketAccessPolicy.overrides[countryCode]
    : undefined;
  if (override) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode,
      freeSignup: override.freeSignup ?? freeSignup,
      demo: override.demo ?? demo,
      reasonCode: "manual_override",
    };
  }

  if (!country) {
    return {
      policyVersion: marketAccessPolicy.policyVersion,
      countryCode,
      freeSignup: "hide",
      demo: "request_review",
      reasonCode: "unknown_country",
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
