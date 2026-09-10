import { localizeUSPost } from "@/lib/localization/us-blog";
const PROJECT = "el2jjtjd";
const slugs = [
  "how-plastics-department-used-roster-simulation-to-cut-in-costs",
  "fairer-scheduling-at-work-reducing-shift-bias",
  "how-to-reduce-absenteeism-for-shift-workers",
  "future-of-workforce-scheduling",
  "auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
  "how-to-optimise-shifts-during-a-hiring-freeze",
];
const q = `*[_type=="post" && slug.current in ${JSON.stringify(slugs)}]{title,excerpt,"slug":slug.current,body,seo,usLocalization,author->{name},categories[]->{title,slug}}`;
const text = (body: any[] | undefined) =>
  (body || []).filter((b) => b._type === "block").map((b, i) => `[${i}:${b._key}] ` + (b.children || []).map((c: any) => c.text || "").join("")).join("\n");
async function main() {
  const res = await fetch(`https://${PROJECT}.api.sanity.io/v2023-05-03/data/query/production?query=${encodeURIComponent(q)}`);
  const { result } = await res.json();
  for (const post of result) {
    const out = localizeUSPost(post);
    const src = text(post.body).split("\n");
    const after = text(out.body).split("\n");
    console.log("\n########", post.slug, "cats:", (post.categories||[]).map((c:any)=>c?.slug?.current).join(","));
    for (const line of after) {
      const m = /[a-z]schedul|schedule[a-z]{3,}|\b(\w+) \(\1\)/.exec(line);
      if (m) console.log("  AFTER:", line.slice(Math.max(0, m.index - 90), m.index + 110));
    }
    if (post.slug === "how-to-optimise-shifts-during-a-hiring-freeze") {
      const twice = text(localizeUSPost({ ...post, body: out.body }).body).split("\n");
      for (let i = 0; i < Math.max(after.length, twice.length); i++)
        if (after[i] !== twice[i]) console.log("  DIFF@", i, "\n   1:", (after[i]||"").slice(0,180), "\n   2:", (twice[i]||"").slice(0,180));
    }
    for (const line of src) if (/\(Scheduling\)|\(scheduling\)/.test(line)) console.log("  SRC-HAS-PARENS:", line.slice(0,200));
  }
}
main();
