"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: { asset: { _ref: string }; alt?: string };
    publishedAt: string;
    author: {
      name: string;
      slug?: { current: string };
      image?: { asset: { _ref: string }; alt?: string };
    };
    categories?: Array<{
      title: string;
      slug: { current: string };
    }>;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Define locked case studies
  const LOCKED_CASE_STUDIES = [
    "how-plastics-department-used-roster-simulation-to-cut-in-costs",
  ];

  // Check if user has unlocked case studies on mount
  useEffect(() => {
    const unlocked = localStorage.getItem("case_study_unlocked") === "true";
    setIsUnlocked(unlocked);
  }, []);

  // Determine the correct URL path based on categories
  const getPostUrl = () => {
    if (post.categories?.some((cat) => cat.slug.current === "case-studies")) {
      return `/case-studies/${post.slug.current}`;
    } else if (
      post.categories?.some((cat) => cat.slug.current === "newsroom")
    ) {
      return `/newsroom/${post.slug.current}`;
    }
    return `/blog/${post.slug.current}`;
  };

  const postUrl = getPostUrl();
  const isLockedCaseStudy = LOCKED_CASE_STUDIES.includes(post.slug.current);
  const isCaseStudy = post.categories?.some((cat) => cat.slug.current === "case-studies");

  const showPopularTag = isLockedCaseStudy; // Show "Popular" tag for locked case studies
  const showLockIcon = isLockedCaseStudy && !isUnlocked;
  const showUnlockedIcon = isLockedCaseStudy && isUnlocked;

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.mainImage && (
        <Link href={postUrl}>
          <div className="relative h-48 w-full">
            <Image
              src={urlFor(post.mainImage).width(400).height(200).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Lock Icon Overlay */}
            {showLockIcon && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            )}
            {/* Unlocked Icon Overlay */}
            {showUnlockedIcon && (
              <div className="absolute top-3 right-3">
                <div className="bg-emerald-500 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            )}
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
          {post.author?.slug ? (
            <Link
              href={`/authors/${post.author.slug.current}`}
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author?.image && (
                <div className="relative w-6 h-6">
                  <Image
                    src={urlFor(post.author.image).width(24).height(24).url()}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <span>{post.author?.name || "Unknown Author"}</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              {post.author?.image && (
                <div className="relative w-6 h-6">
                  <Image
                    src={urlFor(post.author.image).width(24).height(24).url()}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <span>{post.author?.name || "Unknown Author"}</span>
            </div>
          )}
          <time>{formatDate(post.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
}
