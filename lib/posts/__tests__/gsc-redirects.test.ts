/** @jest-environment node */
import nextConfig from "@/next.config";
import { existsSync } from "node:fs";
import { join } from "node:path";

const { match } = require("next/dist/compiled/path-to-regexp");

test("numbered logo URLs only redirect to existing SVG assets", async () => {
  const redirects = await nextConfig.redirects!();
  const redirect = redirects.find((rule) => rule.source.includes(":logo("))!;
  const matches = match(redirect.source);
  for (const [logo, suffix] of [
    ["central_island", "27"],
    ["central_island", "13"],
    ["ver_services_hawkes_bay", "10"],
    ["peticare", "19"],
    ["hospice_west_auckland", "8"],
    ["legalaid", "16"],
    ["singhealth", "7"],
    ["st_george", "8"],
  ]) {
    const result = matches(`/images/logos/new-logos/${logo}.svg-${suffix}`);
    expect(result.params).toEqual({ logo, suffix });
    const destination = redirect.destination.replace(
      ":logo",
      result.params.logo,
    );
    expect(existsSync(join(process.cwd(), "public", destination))).toBe(true);
  }
  expect(matches("/images/logos/new-logos/unknown.svg-27")).toBe(false);
  expect(matches("/images/logos/new-logos/singhealth.svg-invalid")).toBe(false);
  expect(matches("/images/logos/new-logos/singhealth.svg")).toBe(false);
});
