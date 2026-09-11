import { localizeUSPost } from "@/lib/localization/us-blog";
import {
  localizeUSSlug,
  globalizeUSSlug,
  effectiveUSSlug,
} from "@/lib/localization/us-slug";
import { withHreflang } from "@/components/seo/HreflangTags";
import { notFound, permanentRedirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthorLinks from "@/components/blog/AuthorLinks";
import { authorByline, postAuthors } from "@/lib/posts/authors";
import { getClient, client, urlFor } from "@/sanity/lib/client";
import {
  blogPostQuery,
  blogPostPathsQuery,
  blogPostsOnlyQuery,
} from "@/sanity/lib/queries";
import { validatedToken } from "@/sanity/lib/token";
import { formatDateShort } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import PortableText from "@/components/blog/PortableText";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import NewsletterFormWrapper from "@/components/forms/NewsletterFormWrapper";
import RelatedPosts from "@/components/blog/RelatedPosts";
import { draftMode } from "next/headers";
import BlogPostTracker from "@/components/analytics/BlogPostTracker";
import ArticleSchema from "@/components/seo/ArticleSchema";

interface BlogPostPageProps {
  isUS?: boolean;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(blogPostPathsQuery, {
    excludedSite: "us",
  });
  return slugs.map((slug: string) => ({ slug }));
}

// US article URLs carry the localized slug, so the prerendered params differ
// from the global route even though both read the same published document.
export async function generateUSStaticParams() {
  const slugs = await client.fetch(blogPostPathsQuery, {
    excludedSite: "global",
  });
  return slugs.map((slug: string) => ({ slug: localizeUSSlug(slug) }));
}

export async function getBlogPostMetadata({
  params,
  isUS = false,
}: BlogPostPageProps) {
  const { slug } = await params;
  const requested = slug.trim();
  // Under /us the incoming slug is the localized one; the document is stored
  // against the published global slug.
  const sourceSlug = isUS ? globalizeUSSlug(requested) : requested;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const sourcePost = await clientToUse.fetch(blogPostQuery, {
    slug: sourceSlug,
    usSlug: requested,
    // A US route must not serve a global-only article, and the reverse.
    excludedSite: isUS ? "global" : "us",
  });
  const post = sourcePost && (isUS ? localizeUSPost(sourcePost) : sourcePost);
  const blogPath = isUS ? "/us/blog" : "/blog";

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const publishedSlug = post.slug?.current || sourceSlug;
  // The canonical is the URL the article publishes at, override included.
  const canonicalSlug = isUS ? effectiveUSSlug(post) : publishedSlug;
  const baseUrl = "https://rosterlab.com";

  return withHreflang(
    {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      alternates: {
        canonical: `${baseUrl}${blogPath}/${canonicalSlug}`,
      },
      openGraph: {
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        type: "article",
        url: `https://rosterlab.com${blogPath}/${canonicalSlug}`,
        images: post.seo?.ogImage
          ? [urlFor(post.seo.ogImage).url()]
          : post.mainImage
            ? [urlFor(post.mainImage).url()]
            : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo?.metaTitle || post.title,
        description: post.seo?.metaDescription || post.excerpt,
        images: post.seo?.ogImage
          ? [urlFor(post.seo.ogImage).url()]
          : post.mainImage
            ? [urlFor(post.mainImage).url()]
            : [],
      },
    },
    `${blogPath}/${canonicalSlug}`,
    // A one-site article has no twin to advertise.
    { singleMarket: post.sites === "global" || post.sites === "us" },
  );
}

export default async function BlogPostPage({
  params,
  isUS = false,
}: BlogPostPageProps) {
  const { slug } = await params;
  const requested = slug.trim();
  const sourceSlug = isUS ? globalizeUSSlug(requested) : requested;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );

  const sourcePost = await clientToUse.fetch(blogPostQuery, {
    slug: sourceSlug,
    usSlug: requested,
    // A US route must not serve a global-only article, and the reverse.
    excludedSite: isUS ? "global" : "us",
  });
  const post = sourcePost && (isUS ? localizeUSPost(sourcePost) : sourcePost);
  const blogPath = isUS ? "/us/blog" : "/blog";

  if (!post) {
    notFound();
  }

  // The article's canonical US URL can be an editor-chosen slug, which only
  // the fetched document knows. Anything else that resolves to it - including
  // the pre-localization URL - redirects here once.
  if (isUS) {
    const canonicalUSSlug = effectiveUSSlug(sourcePost);
    if (canonicalUSSlug && canonicalUSSlug !== requested)
      permanentRedirect(`/us/blog/${canonicalUSSlug}`);
  }

  // Fetch all blog posts for the related posts section
  const sourcePosts = await clientToUse.fetch(blogPostsOnlyQuery, {
    excludedSite: isUS ? "global" : "us",
  });
  const allPosts = isUS ? sourcePosts.map(localizeUSPost) : sourcePosts;

  // Calculate reading time
  const calculateReadingTime = (text: any[]) => {
    const wordsPerMinute = 200;
    const textContent =
      text
        ?.map((block: any) =>
          block.children?.map((child: any) => child.text).join(" "),
        )
        .join(" ") || "";
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} mins read`;
  };

  const readingTime = calculateReadingTime(post.body);

  const publishedSlug = post.slug?.current || sourceSlug;
  // The canonical is the URL the article publishes at, override included.
  const canonicalSlug = isUS ? effectiveUSSlug(post) : publishedSlug;
  const baseUrl = "https://rosterlab.com";
  const articleUrl = `${baseUrl}${blogPath}/${canonicalSlug}`;
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : undefined;

  return (
    <article>
      <BlogPostTracker
        title={post.title}
        slug={post.slug?.current || sourceSlug}
        author={authorByline(postAuthors(post))}
        category={post.category?.title}
        publishedAt={post.publishedAt}
      />
      <ArticleSchema
        inLanguage={isUS ? "en-US" : "en"}
        title={post.title}
        description={post.excerpt || ""}
        author={postAuthors(post).map((a) => ({ name: a.name || "RosterLab" }))}
        publishedTime={post.publishedAt}
        modifiedTime={post._updatedAt}
        image={imageUrl}
        url={articleUrl}
      />
      {/* Purple Gradient Header */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <Container className="relative">
          <div className="py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left side - Title and Meta */}
              <div className="lg:col-span-6">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                  {post.title}
                </h1>

                {/* Author and Meta */}
                <div className="flex items-center gap-2 sm:gap-6 text-sm sm:text-base">
                  <AuthorLinks post={post} className="font-medium" />
                  <span className="text-purple-200">•</span>
                  <time className="text-purple-200">
                    {formatDateShort(
                      post.publishedAt,
                      isUS ? "en-US" : "en-GB",
                    )}
                  </time>
                  <span className="text-purple-200">•</span>
                  <span className="text-purple-200">{readingTime}</span>
                </div>
              </div>

              {/* Right side - Hero Image */}
              {post.mainImage && (
                <div className="lg:col-span-6 relative hidden lg:block">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={urlFor(post.mainImage).width(700).height(350).url()}
                      alt={post.title}
                      width={700}
                      height={350}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      {/* Breadcrumb below header - Hidden on mobile and tablet */}
      <div className="bg-gray-50 border-b hidden lg:block">
        <Container>
          <div className="py-2">
            <Breadcrumb
              items={[
                { label: "Home", href: isUS ? "/us" : "/" },
                { label: "RosterLab Blog", href: blogPath },
                { label: post.title },
              ]}
            />
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <div className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
            {/* Left Sidebar - Table of Contents */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
                    TABLE OF CONTENTS
                  </h3>
                  <TableOfContents />
                </div>
              </div>
            </aside>

            {/* Main Article Content */}
            <main className="min-w-0 lg:col-span-6">
              {/* Article Body */}
              <div className="prose prose-lg max-w-none [overflow-wrap:anywhere] prose-headings:scroll-mt-24">
                <PortableText value={post.body} />
              </div>

              {/* Related Posts */}
              {allPosts.length > 0 && (
                <RelatedPosts
                  posts={allPosts}
                  basePath={blogPath}
                  currentPostId={post._id}
                  currentPostDate={post.publishedAt}
                />
              )}

              {/* Bottom CTA */}
              <div
                className="mt-16 p-8 text-white rounded-lg text-center"
                style={{
                  background:
                    "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Transform Your Workforce Management?
                </h3>
                <p className="mb-6 text-lg opacity-90">
                  Join thousands using RosterLab to streamline{" "}
                  {isUS ? "scheduling" : "rostering"}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href={isUS ? "/us/book-a-demo" : "/book-a-demo"}
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                    analyticsLabel="Book a Demo"
                    analyticsLocation="Blog Article CTA"
                    analyticsProperties={{
                      cta_type: "demo",
                      article_slug: post.slug?.current || "",
                      article_title: post.title || "",
                    }}
                  >
                    Book a Demo
                  </Button>
                  <Button
                    href={isUS ? "/us/pricing" : "/pricing"}
                    className="px-6 py-3 bg-blue-600/20 text-white font-semibold rounded-lg hover:bg-blue-600/30 transition-all border border-white/20"
                    analyticsLabel="Start Free Trial"
                    analyticsLocation="Blog Article CTA"
                    analyticsProperties={{
                      cta_type: "trial",
                      article_slug: post.slug?.current || "",
                      article_title: post.title || "",
                    }}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </main>

            {/* Right Sidebar - Newsletter */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Newsletter Signup */}
                <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Subscribe for more insights and product updates
                  </h3>
                  <NewsletterFormWrapper />
                </div>

                {/* Share Buttons */}
                <div className="hidden lg:block bg-gray-50 p-6 rounded-lg">
                  <ShareButtons title={post.title} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </article>
  );
}
