// Add reviewed context beside international terminology, including terminology
// inside protected quotations. Original blocks, marks and quote text stay intact.
const definitions = {
  ccdm: {
    pattern: /\bCCDM\b/,
    text: "CCDM means Care Capacity Demand Management, a New Zealand approach to matching staffing capacity with patient-care demand.",
  },
  nhppd: {
    pattern: /\bNHPPD\b/i,
    text: "NHPPD means Nursing Hours per Patient Day, a staffing measure used in the Australian example. These regional approaches are distinct from the US standards discussed below.",
  },
  nzimrt: {
    pattern: /\bNZIMRT\b/,
    text: "NZIMRT refers here to the New Zealand Institute of Medical Radiation Technology, the professional organization named in this historical conference account.",
  },
  wa: {
    pattern: /\bWA\b/,
    text: "WA here means Western Australia.",
  },
  meca: {
    pattern: /\bMECAs?\b/i,
    text: "In New Zealand, MECA means multi-employer collective agreement: a negotiated employment agreement covering multiple employers. The MECA references here concern New Zealand union contract requirements.",
  },
  eba: {
    pattern: /\bEBA\b/i,
    text: "EBA refers to an Australian enterprise bargaining agreement, which sets employment terms for the covered employees. In US workforce discussions, the related term is a collective bargaining agreement or union contract; the legal frameworks differ.",
  },
  nzno: {
    pattern: /\bNZNO\b/,
    text: "NZNO is the New Zealand Nurses Organisation, a nursing union and professional organization in New Zealand.",
  },
  meras: {
    pattern: /\bMERAS\b/,
    text: "MERAS is the Midwifery Employee Representation & Advisory Service, a New Zealand midwives’ union.",
  },
  ama: {
    pattern: /\bAMA\b/,
    text: "AMA here means the Australian Medical Association. The agreement references concern Australian doctors’ employment arrangements, not the American Medical Association or US employment law.",
  },
  mrt: {
    pattern: /\bMRT\b/,
    text: "MRT means medical radiation technologist in New Zealand. In this imaging context, US readers will recognize related roles such as radiologic and MRI technologists; the exact role depends on the imaging modality.",
  },
  radiographer: {
    pattern: /\bradiographers?\b/i,
    text: "This New Zealand account uses “radiographer” for an imaging professional. US terminology includes radiologic technologist for X-ray and CT work, and MRI technologist for MRI work.",
  },
  nhs: {
    pattern: /\bNHS\b/,
    text: "NHS means National Health Service. The research cited here comes from the UK’s publicly funded health services.",
  },
  dhb: {
    pattern: /\bDistrict Health Boards?|DHBs?\b/i,
    text: "District Health Boards (DHBs) were New Zealand’s regional public healthcare organizations. They were replaced in 2022, so references to DHBs describe the former system.",
  },
  cornerstone: {
    pattern: /\bCornerstone\b/i,
    text: "Cornerstone is a New Zealand general-practice accreditation program run by the Royal New Zealand College of General Practitioners. It is not a US accreditation.",
  },
};
type Term = keyof typeof definitions;
const resourceTerms: Record<string, Term[]> = {
  "fixing-unsafe-staffing-with-scheduling-optimisation": ["ccdm", "nhppd"],
  "manage-night-shift-planning-wellbeing-effectively": [
    "meca",
    "nzno",
    "meras",
    "ama",
  ],
  "how-to-optimise-shifts-during-a-hiring-freeze": ["nzno", "dhb"],
  "sydney-tertiary-hospital-saves-300-hours-with-ai-rostering": ["eba"],
  "radiology-department-auckland": ["meca", "mrt", "nzimrt"],
  "hospital-in-perth-partners-with-rosterlab-for-smarter-rosters": [
    "wa",
    "ama",
  ],
  "self-scheduling-study": ["radiographer"],
  "ai-rostering-in-healthcare-trust-fairness": ["radiographer"],
  "ai-self-rostering-study-benefits": ["radiographer"],
  "whanganui-radiography-department-embraces-ai-rostering": ["radiographer"],
  "whanganui-radiography-redirects-179-hours-of-admin-back-to-clinical-work-through-rosterlab":
    ["radiographer"],
  "healthnz-and-rosterlab-partner-on-initial-rollout-of-ai-powered-healthcare-rostering-across-nz":
    ["mrt"],
  "real-cost-of-nurse-turnover-nurse-retention-strategy-through-scheduling-rostering":
    ["nhs"],
  "increase-staff-engagement-for-shift-workers": ["nhs"],
  "dargaville-medical-centre-new-zealand": ["cornerstone"],
};

export function explainUSRegionalTerms(
  body: any[] | undefined,
  slug: unknown,
): any[] | undefined {
  if (!body || typeof slug !== "string" || !resourceTerms[slug]) return body;
  const seen = new Set<Term>();
  // Reapplying localization must not add duplicate explanations.
  for (const term of resourceTerms[slug]) {
    if (
      body.some(
        (block) =>
          block._key?.startsWith("us-context-") &&
          block._key.slice(11).split("-").includes(term),
      )
    )
      seen.add(term);
  }
  const insertions = new Map<number, Term[]>();
  body.forEach((block, index) => {
    if (block._type !== "block" || block._key?.startsWith("us-context-"))
      return;
    const text = (block.children || [])
      .map((span: any) => span.text || "")
      .join("");
    const notes = resourceTerms[slug].filter(
      (term) => !seen.has(term) && definitions[term].pattern.test(text),
    );
    if (!notes.length) return;
    for (const term of notes) seen.add(term);
    // Keep continuous Portable Text lists together, including numbered lists.
    while (index > 0 && body[index].listItem && body[index - 1].listItem)
      index--;
    insertions.set(index, [...(insertions.get(index) || []), ...notes]);
  });
  return body.flatMap((block, index) => {
    const notes = insertions.get(index);
    if (!notes) return [block];
    const key = `us-context-${notes.join("-")}`;
    return [
      {
        _type: "block",
        _key: key,
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: `${key}-text`,
            marks: [],
            text: notes.map((term) => definitions[term].text).join(" "),
          },
        ],
      },
      block,
    ];
  });
}
