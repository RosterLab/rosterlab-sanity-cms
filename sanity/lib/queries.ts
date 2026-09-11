import { groq } from "next-sanity";

// Blog queries
export const postsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "us") && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) {
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
    "authors": authors[]->{
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

// Blog posts only (excluding case studies and newsroom)
export const blogPostsOnlyQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != $excludedSite) && !(_id in path("drafts.**")) && defined(slug.current) && (!defined(categories) || (count(categories) == 0) || (!("case-studies" in categories[]->slug.current) && !("newsroom" in categories[]->slug.current)))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    usLocalization {title, excerpt, protectedTerms, mainImage},
    usTitle,
    usExcerpt,
    usMainImage,
    usProtectedTerms,
    mainImage,
    publishedAt,
    author->{
      name,
      slug,
      image
    },
    "authors": authors[]->{
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

export const postQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "us") && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    author->{
      name,
      slug,
      image,
      bio
    },
    "authors": authors[]->{
      name,
      slug,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Query specifically for blog posts - excludes case studies and newsroom
export const blogPostQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != $excludedSite) && (usSlug.current == $usSlug || slug.current == $slug) && (
    !defined(categories) || 
    count(categories) == 0 || 
    (!("case-studies" in categories[]->slug.current) && !("newsroom" in categories[]->slug.current))
  )][0] {
    _id,
    _updatedAt,
    sites,
    usSlug,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    usLocalization {protectedTerms, title, excerpt, body, metaTitle, metaDescription, mainImage, ogImage},
    usTitle,
    usExcerpt,
    usBody,
    usMainImage,
    usProtectedTerms,
    usSeo {
      metaTitle,
      metaDescription,
      ogImage
    },
    author->{
      name,
      slug,
      image,
      bio
    },
    "authors": authors[]->{
      name,
      slug,
      image,
      bio
    },
    categories[]->{
      title,
      slug
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const postPathsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "us") && defined(slug.current)][].slug.current
`;

// Query for blog post paths only - excludes case studies and newsroom
export const blogPostPathsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != $excludedSite) && defined(slug.current) && (
    !defined(categories) || 
    count(categories) == 0 || 
    (!("case-studies" in categories[]->slug.current) && !("newsroom" in categories[]->slug.current))
  )][].slug.current
`;

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

// Related posts query
export const relatedPostsQuery = groq`
  *[_type == "post" && (!defined(sites) || sites != "us") && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name
    },
    "authors": authors[]->{
      name
    }
  }
`;

// Asset queries
export const assetsQuery = groq`
  *[_type == "asset"] | order(title asc) {
    _id,
    title,
    slug,
    category,
    image,
    description,
    tags
  }
`;

export const assetBySlugQuery = groq`
  *[_type == "asset" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    image,
    description,
    tags
  }
`;

export const assetsByCategoryQuery = groq`
  *[_type == "asset" && category == $category] | order(title asc) {
    _id,
    title,
    slug,
    category,
    image,
    description,
    tags
  }
`;

// Author queries
export const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    image,
    bio,
    email,
    socialLinks
  }
`;

export const authorWithPostsQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    image,
    bio,
    email,
    socialLinks,
    "blogPosts": *[_type == "post" && (!defined(sites) || sites != "us") && references(^._id) && !(_id in path("drafts.**")) && (
      !defined(categories) ||
      count(categories) == 0 ||
      (!("case-studies" in categories[]->slug.current) && !("newsroom" in categories[]->slug.current))
    )] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        slug
      }
    },
    "caseStudies": *[_type == "post" && (!defined(sites) || sites != "us") && references(^._id) && !(_id in path("drafts.**")) && "case-studies" in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        slug
      }
    },
    "newsroom": *[_type == "post" && (!defined(sites) || sites != "us") && references(^._id) && !(_id in path("drafts.**")) && "newsroom" in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        slug
      }
    },
    "webinars": *[_type == "webinar" && references(^._id) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      thumbnail,
      date,
      duration,
      format,
      publishedAt
    }
  }
`;

export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    title,
    image,
    bio
  }
`;

export const authorPathsQuery = groq`
  *[_type == "author" && defined(slug.current)][].slug.current
`;

// Webinar queries
export const webinarsQuery = groq`
  *[_type == "webinar" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    hosts[]->{
      name,
      slug
    },
    date,
    duration,
    category,
    format,
    thumbnail,
    publishedAt
  }
`;

export const webinarQuery = groq`
  *[_type == "webinar" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    hosts[]->{
      name,
      slug,
      image,
      title
    },
    date,
    duration,
    category,
    format,
    thumbnail,
    youtubeUrl,
    publishedAt,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const webinarPathsQuery = groq`
  *[_type == "webinar" && defined(slug.current)][].slug.current
`;
