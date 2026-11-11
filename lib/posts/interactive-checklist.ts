export interface ChecklistGroup {
  id: string;
  title: string;
  items: { id: string; text: string }[];
}

interface ArticleBlock {
  _key: string;
  _type: string;
  style?: string;
  asset?: { _ref?: string };
  children?: { text?: string; marks?: string[] }[];
}

const checklistImages = new Set([
  'image-978dc1942445bc8a384a789b3b9beb533f37643a-1920x819-png',
  'image-49f184834e81131e22c653ea1024b54b9db0a0d4-1920x819-png',
]);

// Read the checklist from the CMS body, including any US-localized copy.
// Keep the introductory artwork and replace the static checklist with tickable rows.
export function withInteractiveChecklist<T extends ArticleBlock>(body: T[]) {
  if (!Array.isArray(body)) return body;
  const start = body.findIndex((block) => block._type === 'image' && checklistImages.has(block.asset?._ref || ''));
  if (start < 0) return body;
  const nextHeading = body.findIndex((block, index) => index > start && block.style === 'h2');
  const end = nextHeading < 0 ? body.length : nextHeading;
  const intro: string[] = [];
  const groups: ChecklistGroup[] = [];

  for (const block of body.slice(start + 1, end)) {
    // Leave unfamiliar content untouched rather than dropping editorial additions.
    if (block._type !== 'block') return body;
    const text = block.children?.map((span) => span.text || '').join('').trim() || '';
    if (!text) continue;
    if (text.startsWith('☐')) {
      const group = groups[groups.length - 1];
      if (!group) return body;
      group.items.push({ id: block._key, text: text.replace(/^☐\s*/, '').replace(/\s+,/g, ',') });
    } else if (block.style === 'h3' || block.children?.some((span) => span.marks?.includes('strong'))) {
      groups.push({ id: block._key, title: text, items: [] });
    } else if (!groups.length) {
      intro.push(text);
    } else {
      return body;
    }
  }

  if (!groups.length || groups.some((group) => !group.items.length)) return body;
  return [
    ...body.slice(0, start + 1),
    { _key: `${body[start]._key}-interactive`, _type: 'buyersChecklist', intro, groups },
    ...body.slice(end),
  ];
}
