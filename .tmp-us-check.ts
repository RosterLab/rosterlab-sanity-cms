import { localizeUSPost } from "@/lib/localization/us-blog";

const PROJECT = "el2jjtjd";
const q = `*[_type=="post" && defined(slug.current)]{title,excerpt,"slug":slug.current,body,seo,usLocalization,author->{name},categories[]->{title,slug}}`;

function text(body: any[] | undefined): string {
  return (body || [])
    .filter((b) => b._type === "block")
    .map((b) => (b.children || []).map((c: any) => c.text || "").join(""))
    .join("\n");
}

async function main() {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2023-05-03/data/query/production?query=${encodeURIComponent(q)}`,
  );
  const { result } = await res.json();
  console.log("posts:", result.length);
  let problems = 0;
  for (const post of result) {
    let out: any;
    try {
      out = localizeUSPost(post);
    } catch (error) {
      console.log("THROWS", post.slug, (error as Error).message);
      problems++;
      continue;
    }
    const before = text(post.body);
    const after = text(out.body);
    const flags: string[] = [];
    // double gloss / stutter
    for (const m of after.matchAll(/\b(\w+) \(\1\)/g)) flags.push(`stutter:${m[0]}`);
    for (const m of after.matchAll(/schedul\w* \(schedul\w*\)/g)) flags.push(`gloss-on-localized:${m[0]}`);
    for (const m of after.matchAll(/roster\w* \(schedul\w*\)\w/gi)) flags.push(`gloss-mid-word:${m[0]}`);
    for (const m of after.matchAll(/\(schedule\)'s|\(schedules\)'/gi)) flags.push(`gloss-possessive:${m[0]}`);
    // idempotency
    const twice = text(localizeUSPost({ ...post, body: out.body, title: out.title }).body);
    if (twice !== after) flags.push("NOT-IDEMPOTENT");
    // words mangled: look for suspicious concatenations
    for (const m of after.matchAll(/[a-z]schedul|schedule[a-z]{3,}/g)) flags.push(`mangled:${m[0]}`);
    if (flags.length) {
      problems++;
      console.log("---", post.slug, [...new Set(flags)].slice(0, 6).join(" | "));
    }
    if (before.length && after.length < before.length * 0.9)
      console.log("SHRANK", post.slug, before.length, after.length);
  }
  console.log("problem posts:", problems);
}
main();
