// The pure text transformer: the spelling/terminology dictionary and the
// replacement engine that respects quotations, URLs, code spans and
// editor-protected phrases. Deliberately dependency-free so it can be imported
// anywhere, including the Sanity Studio bundle, without pulling in the routing
// and link-rewriting layer.

// Deliberately exclude contextual terms such as leave, employee, aged care,
// holidays and professional titles. Editors can adapt these in US overrides.
const dictionary: Record<string, string> = {
  rostering: "scheduling",
  rostered: "scheduled",
  rosterer: "scheduler",
  rosterers: "schedulers",
  rosters: "schedules",
  roster: "schedule",
  "re-rostering": "rescheduling",
  "re-roster": "reschedule",
  optimise: "optimize",
  optimises: "optimizes",
  optimised: "optimized",
  optimising: "optimizing",
  optimiser: "optimizer",
  optimisation: "optimization",
  optimisations: "optimizations",
  organise: "organize",
  organises: "organizes",
  organised: "organized",
  organising: "organizing",
  organisation: "organization",
  organisations: "organizations",
  organisational: "organizational",
  colour: "color",
  colours: "colors",
  coloured: "colored",
  colouring: "coloring",
  favour: "favor",
  favours: "favors",
  favourite: "favorite",
  favourites: "favorites",
  favouritism: "favoritism",
  centre: "center",
  centres: "centers",
  labour: "labor",
  behaviour: "behavior",
  behaviours: "behaviors",
  analyse: "analyze",
  analyses: "analyses",
  analysed: "analyzed",
  analysing: "analyzing",
  customise: "customize",
  customised: "customized",
  customisable: "customizable",
  customising: "customizing",
  customisation: "customization",
  standardise: "standardize",
  standardised: "standardized",
  standardisation: "standardization",
  digitise: "digitize",
  digitised: "digitized",
  digitising: "digitizing",
  minimise: "minimize",
  minimises: "minimizes",
  minimised: "minimized",
  minimising: "minimizing",
  maximise: "maximize",
  maximises: "maximizes",
  maximised: "maximized",
  maximising: "maximizing",
  recognise: "recognize",
  recognised: "recognized",
  recognising: "recognizing",
  prioritise: "prioritize",
  prioritises: "prioritizes",
  prioritised: "prioritized",
  prioritising: "prioritizing",
  specialise: "specialize",
  specialises: "specializes",
  specialised: "specialized",
  specialising: "specializing",
  specialisation: "specialization",
  specialisations: "specializations",
  realise: "realize",
  realises: "realizes",
  realised: "realized",
  realising: "realizing",
  utilise: "utilize",
  utilises: "utilizes",
  utilised: "utilized",
  utilising: "utilizing",
  utilisation: "utilization",
  summarise: "summarize",
  summarises: "summarizes",
  summarised: "summarized",
  summarising: "summarizing",
  programme: "program",
  programmes: "programs",
  personalise: "personalize",
  personalises: "personalizes",
  personalised: "personalized",
  personalising: "personalizing",
  personalisation: "personalization",
  paediatric: "pediatric",
  paediatrics: "pediatrics",
  anaesthesia: "anesthesia",
  anaesthetic: "anesthetic",
  anaesthetics: "anesthetics",
  "operating theatre": "operating room",
  "operating theatres": "operating rooms",
  "hours per fortnight": "hours over two weeks",
  wellbeing: "well-being",
  practising: "practicing",
  practise: "practice",
  practised: "practiced",
  speciality: "specialty",
  specialities: "specialties",
  centralising: "centralizing",
  licence: "license",
  licences: "licenses",
  licencing: "licensing",
  amongst: "among",
  labelled: "labeled",
  labelling: "labeling",
  fulfil: "fulfill",
  fulfilled: "fulfilled",
  fulfilment: "fulfillment",
  modelling: "modeling",
  modelled: "modeled",
  behavioural: "behavioral",
  behaviourally: "behaviorally",
  whilst: "while",
};
export const escapeForRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const terms = new RegExp(
  `\\b(?:${Object.keys(dictionary)
    .sort((a, b) => b.length - a.length)
    .map(escapeForRegExp)
    .join("|")})\\b`,
  "gi",
);
export type TextRange = [number, number];

function protectedRanges(text: string, protectedTerms: string[]): TextRange[] {
  const ranges: TextRange[] = [];
  // Preserve quotations, URLs and email addresses verbatim, including across spans.
  const patterns = [
    /“[^”]*”|"[^"]*"|‘[^\n]*?’(?!\w)|(?<!\w)'[^\n]+?'(?!\w)/g,
    /https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]+/gi,
  ];
  for (const pattern of patterns)
    for (const match of text.matchAll(pattern))
      ranges.push([match.index!, match.index! + match[0].length]);
  for (const term of protectedTerms.filter(Boolean)) {
    for (const match of text.matchAll(new RegExp(escapeForRegExp(term), "gi")))
      ranges.push([match.index!, match.index! + match[0].length]);
  }
  return ranges;
}
export function replacements(
  text: string,
  protectedTerms: string[],
  extra: TextRange[] = [],
  terminology: Record<string, string> = {},
) {
  const ranges = [...protectedRanges(text, protectedTerms), ...extra];
  const words = { ...dictionary, ...terminology };
  const matcher = Object.keys(terminology).length
    ? new RegExp(
        `(?<!\\w)(?:${Object.keys(words)
          .sort((a, b) => b.length - a.length)
          .map(escapeForRegExp)
          .join("|")})(?!\\w)`,
        "gi",
      )
    : terms;
  return Array.from(text.matchAll(matcher))
    .filter(
      (m) =>
        !ranges.some(([a, b]) => m.index! < b && m.index! + m[0].length > a),
    )
    .map((m) => {
      const original = m[0];
      let value = words[original.toLowerCase()];
      if (
        original === original.toUpperCase() &&
        !terminology[original.toLowerCase()]
      )
        value = value.toUpperCase();
      else if (
        original[0] === original[0].toUpperCase() &&
        !/^[A-Z]{2,}s?\b/.test(original)
      )
        value = value[0].toUpperCase() + value.slice(1);
      return { start: m.index!, end: m.index! + original.length, value };
    });
}
export function localizeUSText(
  text: string,
  protectedTerms: string[] = [],
  terminology: Record<string, string> = {},
): string {
  let result = text;
  for (const change of replacements(
    text,
    protectedTerms,
    [],
    terminology,
  ).reverse())
    result =
      result.slice(0, change.start) + change.value + result.slice(change.end);
  return result;
}
