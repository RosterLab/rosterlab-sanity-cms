import { getUSPath } from "@/components/seo/HreflangTags";

/** Localize authored copy only; keep customer quotations and asset URLs intact. */
export function alliedHealthCopy(text: string, isUS: boolean): string {
  if (!isUS) return text;
  const terms: [RegExp, string][] = [
    [/\bre-rostering\b/gi, "rescheduling"],
    [/\bre-rostered\b/g, "rescheduled"],
    [/\bre-roster\b/g, "reschedule"],
    [/\broster writers\b/g, "schedulers"],
    [/\broster writer\b/g, "scheduler"],
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
    [/\bPhysiotherapist\b/g, "Physical therapist"],
    [/\bRadiographers\b/g, "Radiologic technologists"],
    [/\bRadiographer\b/g, "Radiologic technologist"],
    [/\bradiographers\b/g, "radiologic technologists"],
    [/\bradiographer\b/g, "radiologic technologist"],
    [/\bAnaesthetic technology\b/g, "Anesthesia technology"],
    [/\bAnaesthetic tech\b/g, "Anesthesia tech"],
    [/\banaesthetic technicians\b/g, "anesthesia technicians"],
    [/\bAnaesthetic technician\b/g, "Anesthesia technician"],
    [/\bsurgical lists\b/g, "operating room schedules"],
    [/\bplanned theatre lists\b/g, "planned operating room schedules"],
    [/\bTheatre & list allocations\b/g, "Operating room assignments"],
    [/\bTheatre list allocations\b/g, "Operating room assignments"],
    [/\bEmergency theatre cover\b/g, "Emergency operating room coverage"],
    [/\bemergency work\b/g, "emergency procedures"],
    [/\btheatre\b/g, "operating room"],
    [/\btheatres\b/g, "operating rooms"],
    [/\bhaematology\b/g, "hematology"],
    [/\bpaediatric\b/g, "pediatric"],
    [/\bPaediatric\b/g, "Pediatric"],
    [/\boptimisation\b/g, "optimization"],
    [/\borganisations\b/g, "organizations"],
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

const US_IMAGES: Record<string, string> = {
  "/images/industries/allied-health/discipline-pathology-v12.webp":
    "/images/industries/allied-health/us-discipline-pathology-v1.webp",
  "/images/industries/allied-health/discipline-anaesthetic-technology-v14.webp":
    "/images/industries/allied-health/us-discipline-anesthesia-technology-v1.webp",
  "/images/industries/allied-health/discipline-other-services-v14.webp":
    "/images/industries/allied-health/us-discipline-other-services-v2.webp",
  "/images/industries/allied-health/specialist-cover.webp":
    "/images/industries/allied-health/us-specialist-cover-v1.webp",
  "/images/industries/nursing/staff-preferences-v2.webp":
    "/images/industries/allied-health/us-staff-preferences-v1.webp",
};

export function alliedHealthImage(src: string, isUS: boolean): string {
  return isUS ? (US_IMAGES[src] ?? src) : src;
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
