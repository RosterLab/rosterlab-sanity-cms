import { evaluateMarketAccess, marketAccessPolicy } from "./policy";

describe("market access policy", () => {
  test.each([
    ["US", "show", "us_24_7"],
    ["NZ", "show", "nzt_business_hours"],
    ["AE", "show", "nzt_business_hours"],
    ["PT", "show", "request_review"],
    ["IN", "hide", "request_review"],
    // Overridden markets: free signup opens, demo stays a request form.
    ["CN", "show", "request_review"],
    ["TH", "show", "request_review"],
    ["VN", "show", "request_review"],
    ["ZA", "show", "request_review"],
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

  test("overrides open free signup without granting a live demo", () => {
    for (const countryCode of ["CN", "TH", "VN", "ZA"]) {
      expect(evaluateMarketAccess(countryCode)).toMatchObject({
        countryCode,
        freeSignup: "show",
        demo: "request_review",
        reasonCode: "manual_override",
      });
    }
  });

  test("only the four overridden markets are added", () => {
    const added = Object.values(
      marketAccessPolicy.countries as Record<string, { iso2: string }>,
    ).filter(
      (country) =>
        evaluateMarketAccess(country.iso2).freeSignup === "show" &&
        marketAccessPolicy.countries[country.iso2].incomeLevel !== "HIC",
    );
    expect(added.map((country) => country.iso2).sort()).toEqual([
      "CN",
      "TH",
      "VN",
      "ZA",
    ]);
  });

  test("the emergency switch restores signup and calendar visibility", () => {
    expect(evaluateMarketAccess(null, { disabled: true })).toMatchObject({
      freeSignup: "show",
      demo: "nzt_business_hours",
      reasonCode: "gating_disabled",
    });
  });
});
