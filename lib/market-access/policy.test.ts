import { evaluateMarketAccess } from "./policy";

describe("market access policy", () => {
  test.each([
    ["US", "show", "us_24_7"],
    ["NZ", "show", "nzt_business_hours"],
    ["AE", "show", "nzt_business_hours"],
    ["PT", "show", "request_review"],
    ["IN", "hide", "request_review"],
  ])("%s returns free=%s and demo=%s", (countryCode, freeSignup, demo) => {
    expect(evaluateMarketAccess(countryCode)).toMatchObject({
      countryCode,
      freeSignup,
      demo,
    });
  });

  test("fails closed when the country is missing or unknown", () => {
    expect(evaluateMarketAccess(null)).toMatchObject({
      countryCode: null,
      freeSignup: "hide",
      demo: "request_review",
      reasonCode: "unknown_country",
    });
    expect(evaluateMarketAccess("ZZ")).toMatchObject({
      countryCode: "ZZ",
      freeSignup: "hide",
      demo: "request_review",
    });
  });

  test("the emergency switch restores signup and calendar visibility", () => {
    expect(evaluateMarketAccess(null, { disabled: true })).toMatchObject({
      freeSignup: "show",
      demo: "nzt_business_hours",
      reasonCode: "gating_disabled",
    });
  });
});
