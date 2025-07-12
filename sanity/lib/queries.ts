import { groq } from 'next-sanity'

// Blog queries
export const postsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) {
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
`

// Blog posts only (excluding case studies and newsroom)
export const blogPostsOnlyQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && (!defined(categories) || (count(categories) == 0) || (!("case-studies" in categories[]->slug.current) && !("newsroom" in categories[]->slug.current)))] | order(publishedAt desc) {
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
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
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
`

export const postPathsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Page queries
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageBuilder,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`

export const pagePathsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

// Site settings
export const settingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    mainNav,
    footer,
    socialLinks
  }
`

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

// Related posts query
export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $currentId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author->{
      name
    }
  }
`