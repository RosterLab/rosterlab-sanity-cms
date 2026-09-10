// Customer quotations keep their original wording - we do not put American
// terminology into a named clinician's mouth. For US case studies we instead
// gloss the regional term on the spot: "roster (schedule)". The quote stays
// verbatim and the US reader still gets the word they use.
//
// Only case studies are glossed. Everywhere else the surviving roster terms are
// left exactly as published.

const GLOSSES: Record<string, string> = {
  roster: "schedule",
  rosters: "schedules",
  rostering: "scheduling",
  rostered: "scheduled",
  rosterer: "scheduler",
  rosterers: "schedulers",
};

// A standalone roster word. The trailing boundary keeps "RosterLab" intact,
// because "Lab" would otherwise be treated as the start of a new word.
const TERM = /(?<![A-Za-z])[Rr]oster(?:s|ing|ed|er|ers)?(?![A-Za-z])/g;

export function isCaseStudy(post: {
  categories?: { slug?: { current?: string } }[] | null;
}): boolean {
  return (post.categories || []).some(
    (category) => category?.slug?.current === "case-studies",
  );
}

export function glossUSQuotedTerms(
  body: any[] | undefined,
): any[] | undefined {
  return body?.map((block) => {
    if (block._type !== "block") return block;
    const children = block.children || [];
    const text = children.map((child: any) => child.text || "").join("");

    // Code samples and editor-protected spans are left alone.
    const preserved = new Set(
      (block.markDefs || [])
        .filter((mark: any) => mark._type === "usPreserve")
        .map((mark: any) => mark._key),
    );
    const skip: [number, number][] = [];
    let cursor = 0;
    for (const child of children) {
      const end = cursor + (child.text || "").length;
      if (
        child.marks?.some(
          (mark: string) => mark === "code" || preserved.has(mark),
        )
      )
        skip.push([cursor, end]);
      cursor = end;
    }

    const inserts: { at: number; text: string }[] = [];
    for (const match of text.matchAll(TERM)) {
      const gloss = GLOSSES[match[0].toLowerCase()];
      if (!gloss) continue;
      const start = match.index!;
      const end = start + match[0].length;
      if (skip.some(([a, b]) => start < b && end > a)) continue;
      // Never gloss twice, so re-running the localizer is a no-op.
      if (text.slice(end).startsWith(` (${gloss})`)) continue;
      inserts.push({ at: end, text: ` (${gloss})` });
    }
    if (!inserts.length) return block;

    let offset = 0;
    return {
      ...block,
      children: children.map((child: any) => {
        const start = offset;
        const end = start + (child.text || "").length;
        offset = end;
        if (child._type !== "span") return child;
        let value = child.text || "";
        // Apply right to left so earlier offsets stay valid.
        for (const insert of inserts
          .filter((i) => i.at > start && i.at <= end)
          .reverse()) {
          const at = insert.at - start;
          value = value.slice(0, at) + insert.text + value.slice(at);
        }
        return { ...child, text: value };
      }),
    };
  });
}
