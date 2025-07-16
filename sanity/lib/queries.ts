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
`

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
`

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
`