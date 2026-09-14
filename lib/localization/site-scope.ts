// Which sites an article publishes to. The field is absent on every article
// written before the switch existed, so "unset" must mean All sites - the
// helpers below allow a missing value.
export const SITE_GLOBAL_ONLY = "global";
export const SITE_US_ONLY = "us";

export function publishesToUS(post: { sites?: string | null } | null): boolean {
  return post?.sites !== SITE_GLOBAL_ONLY;
}

export function publishesToGlobal(
  post: { sites?: string | null } | null,
): boolean {
  return post?.sites !== SITE_US_ONLY;
}
