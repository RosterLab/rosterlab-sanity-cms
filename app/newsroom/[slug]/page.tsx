import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getClient, client, urlFor } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { validatedToken } from "@/sanity/lib/token";
import { formatDate } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PortableText from "@/components/blog/PortableText";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import NewsletterFormWrapper from "@/components/forms/NewsletterFormWrapper";
import RelatedPosts from "@/components/blog/RelatedPosts";
import HubSpotFormListener from "@/components/analytics/HubSpotFormListener";
import BlogPostTracker from "@/components/analytics/BlogPostTracker";
import ArticleSchema from "@/components/seo/ArticleSchema";
import { draftMode } from "next/headers";

interface NewsroomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Query for a single newsroom post
const newsroomPostQuery = groq`
  *[_type == "post" && slug.current == $slug && "newsroom" in categories[]->slug.current][0] {
    _id,
    _updatedAt,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    },
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`;

// Query for newsroom slugs
const newsroomPathsQuery = groq`
  *[_type == "post" && "newsroom" in categories[]->slug.current][].slug.current
`;

// Query for all newsroom posts (for related posts)
const allNewsroomQuery = groq`
  *[_type == "post" && "newsroom" in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    categories[]->{
      title,
      slug
    }
  }
`;

export async function generateStaticParams() {
  const slugs = await client.fetch(newsroomPathsQuery);
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: NewsroomPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const post = await clientToUse.fetch(newsroomPostQuery, { slug });

  if (!post) {
    return {
      title: "Newsroom Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rosterlab.com";

  // Ensure meta description is between 120-155 characters
  let metaDescription = post.seo?.metaDescription || post.excerpt || "";

  // Special handling for Whanganui post
  if (slug === "whanganui-radiography-department-embraces-ai-rostering") {
    metaDescription =
      "Whanganui DHB radiography department successfully implements AI-powered rostering, improving staff satisfaction and work-life balance.";
  } else if (metaDescription.length < 120) {
    // If description is too short, enhance it
    metaDescription =
      `${metaDescription} Read the full story on RosterLab's newsroom for healthcare workforce management insights.`.slice(
        0,
        155,
      );
  } else if (metaDescription.length > 155) {
    // If description is too long, truncate it properly
    metaDescription = metaDescription.slice(0, 152) + "...";
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: metaDescription,
    alternates: {
      canonical: `${baseUrl}/newsroom/${slug}`,
    },
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: metaDescription,
      type: "article",
      url: `https://rosterlab.com/newsroom/${slug}`,
      images: post.seo?.ogImage
        ? [urlFor(post.seo.ogImage).url()]
        : post.mainImage
          ? [urlFor(post.mainImage).url()]
          : undefined,
    },
  };
}

export default async function NewsroomPostPage({ params }: NewsroomPageProps) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const clientToUse = getClient(
    isEnabled && validatedToken ? { token: validatedToken } : undefined,
  );
  const post = await clientToUse.fetch(newsroomPostQuery, { slug });

  if (!post) {
    notFound();
  }

  // Fetch all newsroom posts for the related posts section
  const allNewsroom = await clientToUse.fetch(allNewsroomQuery);

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rosterlab.com";
  const articleUrl = `${baseUrl}/newsroom/${slug}`;
  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : undefined;

  return (
    <article>
      <HubSpotFormListener />
      <BlogPostTracker
        title={post.title}
        slug={post.slug?.current || slug}
        author={post.author?.name}
        category="Newsroom"
        publishedAt={post.publishedAt}
      />
      <ArticleSchema
        title={post.title}
        description={post.excerpt || ""}
        author={{ name: post.author?.name || "RosterLab" }}
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
              <div className="lg:col-span-7">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
                  {post.title}
                </h1>

                {/* Author and Meta */}
                <div className="flex items-center gap-2 sm:gap-6 text-sm sm:text-base">
                  <span className="font-medium">RosterLab</span>
                  <span className="text-purple-200">•</span>
                  <time className="text-purple-200">
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="text-purple-200">•</span>
                  <span className="text-purple-200">{readingTime}</span>
                </div>
              </div>

              {/* Right side - Hero Image */}
              {post.mainImage && (
                <div className="lg:col-span-5 relative hidden lg:block">
                  <div className="relative rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={urlFor(post.mainImage).width(500).height(350).url()}
                      alt={post.title}
                      width={500}
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
                { label: "Home", href: "/" },
                { label: "Newsroom", href: "/newsroom" },
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
            <main className="lg:col-span-6">
              {/* Article Body */}
              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-24">
                <PortableText value={post.body} />
              </div>

              {/* Related Posts */}
              {allNewsroom.length > 0 && (
                <RelatedPosts
                  posts={allNewsroom}
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
                  Join thousands using RosterLab to streamline rostering.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/book-a-demo"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    Book a Demo
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600/20 text-white font-semibold rounded-lg hover:bg-blue-600/30 transition-all border border-white/20"
                  >
                    Start Free Trial
                  </Link>
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
                  <HubSpotFormListener />
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
