#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const COUNTRY_URL =
  "https://api.worldbank.org/v2/country?format=json&per_page=400";
const RUN_DATE = new Date();
const FISCAL_YEAR =
  RUN_DATE.getUTCFullYear() + (RUN_DATE.getUTCMonth() >= 6 ? 1 : 0);
const GNI_YEAR = RUN_DATE.getUTCFullYear() - 1;
const EARLIEST_GNI_YEAR = GNI_YEAR - 2;
const GNI_URL =
  `https://api.worldbank.org/v2/country/all/indicator/NY.GNP.PCAP.CD` +
  `?date=${EARLIEST_GNI_YEAR}:${GNI_YEAR}&format=json&per_page=1000`;
const POLICY_VERSION = `wb-fy${FISCAL_YEAR}-gni-${GNI_YEAR}`;
const ROOT = resolve(import.meta.dirname, "..");
const POLICY_PATH = resolve(ROOT, "lib/market-access/data/policy-current.json");

async function fetchWorldBank(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "RosterLab market-access policy generator" },
  });
  if (!response.ok) {
    throw new Error(`World Bank request failed (${response.status}): ${url}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload) || !Array.isArray(payload[1])) {
    throw new Error(`Unexpected World Bank response: ${url}`);
  }
  return payload[1];
}

async function readExistingOverrides() {
  try {
    const currentPolicy = JSON.parse(await readFile(POLICY_PATH, "utf8"));
    return currentPolicy.overrides ?? {};
  } catch {
    return {};
  }
}

const [countryRows, gniRows, existingOverrides] = await Promise.all([
  fetchWorldBank(COUNTRY_URL),
  fetchWorldBank(GNI_URL),
  readExistingOverrides(),
]);

const gniByIso3 = new Map();
for (const row of gniRows) {
  if (!row?.countryiso3code || typeof row.value !== "number") continue;
  const year = Number(row.date);
  const current = gniByIso3.get(row.countryiso3code);
  if (!current || year > current.year) {
    gniByIso3.set(row.countryiso3code, { value: row.value, year });
  }
}

const countries = countryRows
  .filter(
    (country) =>
      country?.region?.value !== "Aggregates" &&
      /^[A-Z]{2}$/.test(country?.iso2Code || "") &&
      /^[A-Z]{3}$/.test(country?.id || ""),
  )
  .map((country) => ({
    iso2: country.iso2Code,
    iso3: country.id,
    name: country.name,
    incomeLevel: country.incomeLevel?.id || "NA",
    gniPerCapitaUsd: gniByIso3.get(country.id)?.value ?? null,
    gniDataYear: gniByIso3.get(country.id)?.year ?? null,
  }))
  .sort((left, right) => left.iso2.localeCompare(right.iso2));

const policy = {
  policyVersion: POLICY_VERSION,
  generatedAt: RUN_DATE.toISOString(),
  fiscalYear: FISCAL_YEAR,
  gniDataYear: GNI_YEAR,
  demoGniThresholdUsd: 30000,
  sources: {
    incomeGroups: COUNTRY_URL,
    gniPerCapita: "https://data.worldbank.org/indicator/NY.GNP.PCAP.CD",
  },
  overrides: existingOverrides,
  countries: Object.fromEntries(
    countries.map((country) => [country.iso2, country]),
  ),
};

await mkdir(dirname(POLICY_PATH), { recursive: true });
await writeFile(POLICY_PATH, `${JSON.stringify(policy, null, 2)}\n`);

const freeCount = countries.filter(
  (country) => country.incomeLevel === "HIC",
).length;
const demoCount = countries.filter(
  (country) =>
    country.gniPerCapitaUsd !== null && country.gniPerCapitaUsd >= 30000,
).length;
console.log(
  `Wrote ${countries.length} economies: ${freeCount} free-signup markets, ${demoCount} live-demo markets.`,
);
