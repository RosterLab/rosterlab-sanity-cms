import { getUSPath } from "@/components/seo/HreflangTags";

/** Localize authored copy only; keep customer quotations and asset URLs intact. */
export function alliedHealthCopy(text: string, isUS: boolean): string {
  if (!isUS) return text;
  const terms: [RegExp, string][] = [
    [/\bre-rostering\b/gi, "rescheduling"],
    [/\bRostering\b/g, "Scheduling"],
    [/\brostering\b/g, "scheduling"],
    [/\bRosters\b/g, "Schedules"],
    [/\brosters\b/g, "schedules"],
    [/\bRoster\b/g, "Schedule"],
    [/\broster\b/g, "schedule"],
    [/\bPhysiotherapy\b/g, "Physical therapy"],
    [/\bphysiotherapy\b/g, "physical therapy"],
    [/\bphysiotherapists\b/g, "physical therapists"],
    [/\bphysiotherapist\b/g, "physical therapist"],
    [/\bradiographers\b/g, "radiologic technologists"],
    [/\bradiographer\b/g, "radiologic technologist"],
    [/\bAnaesthetic technology\b/g, "Anesthesia technology"],
    [/\banaesthetic technicians\b/g, "anesthesia technicians"],
    [/\bplanned theatre lists\b/g, "planned operating room schedules"],
    [/\bTheatre list allocations\b/g, "Operating room assignments"],
    [/\bEmergency theatre cover\b/g, "Emergency operating room coverage"],
    [/\bemergency work\b/g, "emergency procedures"],
    [/\btheatre\b/g, "operating room"],
    [/\bhaematology\b/g, "hematology"],
    [/\bpaediatric\b/g, "pediatric"],
    [/\bPaediatric\b/g, "Pediatric"],
    [/\boptimisation\b/g, "optimization"],
    [/\bfavouritism\b/g, "favoritism"],
    [/\bwards\b/g, "units"],
    [/\bward\b/g, "unit"],
    [/\bWard\b/g, "Unit"],
    [/\bAcute ward cover\b/g, "Acute unit coverage"],
    [/\bleave requests\b/g, "time-off requests"],
    [/\brequest leave\b/g, "request time off"],
  ];
  return terms.reduce(
    (copy, [pattern, replacement]) => copy.replace(pattern, replacement),
    text,
  );
}

export function alliedHealthHref(path: string, isUS: boolean): string {
  return isUS ? (getUSPath(path) ?? path) : path;
}

/** FAQ answers contain authored links; localize text without rewriting URL slugs. */
export function alliedHealthAnswer(answer: string, isUS: boolean): string {
  if (!isUS) return answer;
  return answer
    .split(/(<[^>]+>)/g)
    .map((part) =>
      part.startsWith("<")
        ? part.replace(
            /href='([^']+)'/g,
            (_, path: string) => `href='${alliedHealthHref(path, true)}'`,
          )
        : alliedHealthCopy(part, true),
    )
    .join("");
}
