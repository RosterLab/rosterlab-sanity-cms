// Which sites an article publishes to. The field is absent on every article
// written before the switch existed, so "unset" must mean All sites - the
// filters below are written so a missing value always passes.
export const SITE_ALL = "all";
export const SITE_GLOBAL_ONLY = "global";
export const SITE_US_ONLY = "us";

// Drop into a GROQ filter alongside the other predicates.
export const GLOBAL_SITE_FILTER = '(!defined(sites) || sites != "us")';
export const US_SITE_FILTER = '(!defined(sites) || sites != "global")';

export function publishesToUS(post: { sites?: string | null } | null): boolean {
  return post?.sites !== SITE_GLOBAL_ONLY;
}

export function publishesToGlobal(
  post: { sites?: string | null } | null,
): boolean {
  return post?.sites !== SITE_US_ONLY;
}
