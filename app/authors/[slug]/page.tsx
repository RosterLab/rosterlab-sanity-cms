import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getClient, client, urlFor } from "@/sanity/lib/client";
import { authorWithPostsQuery, authorPathsQuery } from "@/sanity/lib/queries";
import { validatedToken } from "@/sanity/lib/token";
import { formatDate } from "@/lib/utils";
import Container from "@/components/ui/Container";
import PortableText from "@/components/blog/PortableText";
import { draftMode } from "next/headers";
import { FaLinkedin, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(authorPathsQuery);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const author = await clientToUse.fetch(authorWithPostsQuery, {
    slug: slug.trim(),
  });

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rosterlab.com";

  // Get first paragraph of bio for description
  const bioText =
    author.bio?.[0]?.children
      ?.map((child: any) => child.text)
      .join(" ")
      .slice(0, 160) || `Articles by ${author.name}`;

  return {
    title: `${author.name}${author.title ? ` - ${author.title}` : ""} | RosterLab`,
    description: bioText,
    alternates: {
      canonical: `${baseUrl}/authors/${slug}`,
    },
    openGraph: {
      title: `${author.name}${author.title ? ` - ${author.title}` : ""}`,
      description: bioText,
      type: "profile",
      url: `https://rosterlab.com/authors/${slug}`,
      images: author.image ? [urlFor(author.image).url()] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );

  const author = await clientToUse.fetch(authorWithPostsQuery, {
    slug: slug.trim(),
  });

  if (!author) {
    notFound();
  }

  const allPosts = [
    ...(author.blogPosts || []),
    ...(author.caseStudies || []),
    ...(author.newsroom || []),
  ];

  const totalPosts = allPosts.length;

  return (
    <>
      <article className="py-12 bg-white">
        <Container>
          {/* Author Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
              {/* Profile Photo */}
              {author.image && (
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-100">
                    <Image
                      src={urlFor(author.image).width(400).height(400).url()}
                      alt={author.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {author.name}
                </h1>
                {author.title && (
                  <p className="text-xl text-blue-600 font-medium mb-4">
                    {author.title}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-gray-900">
                      {totalPosts}
                    </span>{" "}
                    {totalPosts === 1 ? "Article" : "Articles"}
                  </div>
                  {author.blogPosts && author.blogPosts.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        {author.blogPosts.length}
                      </span>{" "}
                      Blog {author.blogPosts.length === 1 ? "Post" : "Posts"}
                    </div>
                  )}
                  {author.caseStudies && author.caseStudies.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        {author.caseStudies.length}
                      </span>{" "}
                      Case{" "}
                      {author.caseStudies.length === 1 ? "Study" : "Studies"}
                    </div>
                  )}
                  {author.newsroom && author.newsroom.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        {author.newsroom.length}
                      </span>{" "}
                      News{" "}
                      {author.newsroom.length === 1 ? "Article" : "Articles"}
                    </div>
                  )}
                </div>

                {/* Social Links */}
                {author.socialLinks && (
                  <div className="flex gap-4">
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <FaLinkedin className="w-5 h-5" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    )}
                    {author.socialLinks.twitter && (
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Twitter Profile"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </a>
                    )}
                    {author.socialLinks.github && (
                      <a
                        href={author.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="GitHub Profile"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    )}
                    {author.socialLinks.website && (
                      <a
                        href={author.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        aria-label="Website"
                      >
                        <FaGlobe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Author Bio */}
            {author.bio && (
              <div className="prose prose-lg max-w-none mb-12">
                <PortableText value={author.bio} />
              </div>
            )}
          </div>

          {/* Articles Section */}
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Articles by {author.name}
            </h2>

            {/* Blog Posts */}
            {author.blogPosts && author.blogPosts.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-blue-600 rounded"></span>
                  Blog Posts
                </h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {author.blogPosts.map((post: any) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug.current}`}
                      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      {post.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={urlFor(post.mainImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <time className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Case Studies */}
            {author.caseStudies && author.caseStudies.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-green-600 rounded"></span>
                  Case Studies
                </h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {author.caseStudies.map((post: any) => (
                    <Link
                      key={post._id}
                      href={`/case-studies/${post.slug.current}`}
                      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      {post.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={urlFor(post.mainImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <time className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Newsroom */}
            {author.newsroom && author.newsroom.length > 0 && (
              <section className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-purple-600 rounded"></span>
                  Newsroom
                </h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {author.newsroom.map((post: any) => (
                    <Link
                      key={post._id}
                      href={`/newsroom/${post.slug.current}`}
                      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      {post.mainImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={urlFor(post.mainImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h4>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <time className="text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* No posts message */}
            {totalPosts === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No articles published yet.
                </p>
              </div>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}
