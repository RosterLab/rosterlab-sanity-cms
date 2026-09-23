import type { SanityClient } from "next-sanity";
import { localizeUSSlug } from "@/lib/localization/us-slug";
import {
  blogPostQuery,
  blogPostByIdQuery,
  usBlogSlugIndexQuery,
} from "@/sanity/lib/queries";

type BlogSlug = {
  _id: string;
  slug: { current: string };
  usSlug?: { current?: string } | null;
};

export async function fetchBlogPost(
  client: SanityClient,
  requested: string,
  isUS: boolean,
) {
  if (!isUS) {
    return client.fetch(blogPostQuery, {
      slug: requested,
      usSlug: requested,
      excludedSite: "us",
    });
  }

  // Resolve against current CMS records, including articles published after
  // the last deployment. Explicit US URLs win over global aliases.
  const posts = await client.fetch<BlogSlug[]>(usBlogSlugIndexQuery);
  const match =
    posts.find((post) => post.usSlug?.current === requested) ??
    posts.find((post) => post.slug.current === requested) ??
    posts.find((post) => localizeUSSlug(post.slug.current) === requested);

  return match ? client.fetch(blogPostByIdQuery, { id: match._id }) : null;
}
