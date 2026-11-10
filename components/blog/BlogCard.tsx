"use client";

import { effectiveUSSlug } from "@/lib/localization/us-slug";
import Link from "next/link";
import { authorByline, postAuthors, type PostAuthor } from "@/lib/posts/authors";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import { formatDate } from "@/lib/utils";

// These artwork variants include safe margins for the standard card crop.
const guidePreviewImages: Record<string, string> = {
  'image-e8ca32296098d6261ac59b6e3b92a867e0a70343-1670x941-png':
    '/images/blog/healthcare-rostering-buyers-guide-preview-v2.webp',
  'image-8afed9a82fe7f23bf16aa1dec74ce9f6c096b8fb-1671x941-png':
    '/images/blog/healthcare-scheduling-buyers-guide-preview-v2.webp',
};

interface BlogCardProps {
  basePath?: string;
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    usSlug?: { current: string };
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
    publishedAt: string;
    author?: PostAuthor | null;
    authors?: PostAuthor[] | null;
    categories?: Array<{
      title: string;
      slug: { current: string };
    }>;
  };
}

export default function BlogCard({ post, basePath = "/blog" }: BlogCardProps) {
  const authors = postAuthors(post);
  const primaryAuthor = authors[0];
  const byline = authorByline(authors) || "Unknown Author";
  const authorImage = primaryAuthor?.image as { asset?: { _ref?: string } } | undefined;
  const authorImageSrc = authorImage
    ? authorImage.asset?._ref === 'image-9af26c62683d190949edc8918237304656b86269-1667x2500-jpg'
      // Include headroom and shoulders from the original portrait, then fit
      // that wider view into the avatar without stretching or editing the face.
      ? urlFor(authorImage).rect(0, 0, 1667, 2000).width(48).height(48).fit('fill').bg('f4f6fb').url()
      : urlFor(authorImage).width(48).height(48).url()
    : undefined;
  // Determine the correct URL path based on categories
  const getPostUrl = () => {
    if (post.categories?.some((cat) => cat.slug.current === "case-studies")) {
      return `${basePath.startsWith("/us/") ? "/us" : ""}/case-studies/${post.slug.current}`;
    } else if (
      post.categories?.some((cat) => cat.slug.current === "newsroom")
    ) {
      return `${basePath.startsWith("/us/") ? "/us" : ""}/newsroom/${post.slug.current}`;
    }
    return `${basePath}/${basePath === "/us/blog" ? effectiveUSSlug(post) : post.slug.current}`;
  };

  const postUrl = getPostUrl();
  const showPopularTag =
    post.slug.current ===
    "how-plastics-department-used-roster-simulation-to-cut-in-costs";

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.mainImage && (
        <Link href={postUrl}>
          <div className="relative h-48 w-full">
            <Image
              src={guidePreviewImages[post.mainImage.asset._ref] || urlFor(post.mainImage).width(400).height(200).url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(min-width: 1400px) 424px, (min-width: 1280px) 384px, (min-width: 1024px) 299px, (min-width: 768px) 344px, (min-width: 640px) 592px, calc(100vw - 32px)"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Popular Tag */}
          {showPopularTag && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Popular
            </span>
          )}
          {/* Category Tags */}
          {post.categories && post.categories.length > 0 && (
            <>
              {post.categories.map((category) => (
                <span
                  key={category.slug.current}
                  className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </>
          )}
        </div>

        <h2 className="text-xl font-bold mb-3 line-clamp-2">
          <Link
            href={postUrl}
            className="hover:text-primary-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}

        <div className="flex items-center justify-between text-sm text-neutral-500">
          {primaryAuthor?.slug?.current ? (
            <Link
              href={`/authors/${primaryAuthor.slug.current}`}
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {authorImageSrc ? (
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src={authorImageSrc}
                    alt={primaryAuthor.name || "Author"}
                    fill
                    sizes="24px"
                    className="rounded-full object-cover"
                  />
                </div>
              ) : null}
              <span>{byline}</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              {authorImageSrc ? (
                <div className="relative w-6 h-6 shrink-0">
                  <Image
                    src={authorImageSrc}
                    alt={primaryAuthor?.name || "Author"}
                    fill
                    sizes="24px"
                    className="rounded-full object-cover"
                  />
                </div>
              ) : null}
              <span>{byline}</span>
            </div>
          )}
          <time>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
