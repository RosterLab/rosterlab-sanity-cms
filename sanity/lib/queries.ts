import { groq } from 'next-sanity'

// Blog queries
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
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
    seo
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
    seo
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