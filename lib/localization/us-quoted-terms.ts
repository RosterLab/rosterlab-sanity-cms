// Quotations are protected from the localizer everywhere, so roster
// terminology inside a quote survives by default. For US case studies we
// convert it instead: a US reader sees "schedule", not "roster (schedule)".
// The earlier inline gloss read badly once a quote used the word more than
// once - "switch roster (schedule) views by employee" - so the term is
// replaced outright.
//
// Only case studies are converted. Quotes in blog and newsroom articles keep
// their published wording.

const TERMS: Record<string, string> = {
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

export function localizeUSQuotedTerms(
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

    const changes: { start: number; end: number; value: string }[] = [];
    for (const match of text.matchAll(TERM)) {
      const replacement = TERMS[match[0].toLowerCase()];
      if (!replacement) continue;
      const start = match.index!;
      const end = start + match[0].length;
      if (skip.some(([a, b]) => start < b && end > a)) continue;
      changes.push({
        start,
        end,
        value:
          match[0][0] === match[0][0].toUpperCase()
            ? replacement[0].toUpperCase() + replacement.slice(1)
            : replacement,
      });
    }
    if (!changes.length) return block;

    let offset = 0;
    return {
      ...block,
      children: children.map((child: any) => {
        const start = offset;
        const end = start + (child.text || "").length;
        offset = end;
        if (child._type !== "span") return child;
        let value = child.text || "";
        // Insert the replacement at its first span and drop the remaining
        // original characters from later spans, so a term split across spans
        // converts once. Applied right to left to keep offsets valid.
        for (const change of changes
          .filter((c) => c.start < end && c.end > start)
          .reverse()) {
          value =
            value.slice(0, Math.max(0, change.start - start)) +
            (change.start >= start ? change.value : "") +
            value.slice(Math.min(value.length, change.end - start));
        }
        return { ...child, text: value };
      }),
    };
  });
}
