// Posts carry either the newer `authors` array or the original single
// `author`. Everything that renders a byline reads through here so the two
// shapes never have to be handled at the call site, and so an unmigrated post
// keeps its byline.

export type PostAuthor = {
  name?: string;
  slug?: { current?: string } | null;
  image?: unknown;
  bio?: unknown;
};

type AuthoredPost = {
  authors?: PostAuthor[] | null;
  author?: PostAuthor | null;
};

export function postAuthors(
  post: AuthoredPost | null | undefined,
): PostAuthor[] {
  const many = (post?.authors || []).filter((author): author is PostAuthor =>
    Boolean(author?.name),
  );
  if (many.length) return many;
  return post?.author?.name ? [post.author] : [];
}

// "Ana Silva", "Ana Silva and Bo Chen", "Ana Silva, Bo Chen and Dev Patel".
export function authorByline(authors: PostAuthor[]): string {
  const names = authors
    .map((author) => author.name)
    .filter(Boolean) as string[];
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

// The name a page falls back to when a post has no author at all.
export const FALLBACK_AUTHOR = "RosterLab";
