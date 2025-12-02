import { PortableTextBlock } from "@portabletext/types";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// SEO interface
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImageObject;
  noIndex?: boolean;
}

// Image with alt text interface
export interface ImageWithAlt {
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Slug interface
export interface Slug {
  current: string;
  _type: "slug";
}

// Social Links interface
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

// Author interface
export interface Author extends SanityDocument {
  _type: "author";
  name: string;
  slug: Slug;
  image?: ImageWithAlt;
  title?: string;
  bio?: PortableTextBlock[];
  email?: string;
  socialLinks?: SocialLinks;
}

// Category interface
export interface Category extends SanityDocument {
  _type: "category";
  title: string;
  slug: Slug;
  description?: string;
}

// Hero section interface
export interface Hero {
  _type: "hero";
  heading: string;
  subheading?: string;
  description?: string;
  image?: ImageWithAlt;
  ctaText?: string;
  ctaLink?: string;
}

// Pricing section interface
export interface Pricing {
  _type: "pricing";
  title: string;
  plans: {
    name: string;
    price: string;
    features: string[];
    highlighted?: boolean;
  }[];
}

// Testimonial interface
export interface Testimonial {
  _type: "testimonial";
  quote: string;
  author: string;
  company?: string;
  image?: ImageWithAlt;
}

// YouTube embed interface
export interface YouTube {
  _type: "youtube";
  url: string;
  title?: string;
}

// Text section interface
export interface TextSection {
  _type: "textSection";
  heading?: string;
  content?: PortableTextBlock[];
}

// CTA section interface
export interface CTASection {
  _type: "ctaSection";
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Page builder section union type
export type PageBuilderSection =
  | Hero
  | Pricing
  | Testimonial
  | TextSection
  | CTASection;

// Post interface
export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  slug: Slug;
  author: Author;
  mainImage?: ImageWithAlt;
  categories?: Category[];
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  seo?: SEO;
}

// Page interface
export interface Page extends SanityDocument {
  _type: "page";
  title: string;
  slug: Slug;
  pageBuilder?: PageBuilderSection[];
  seo?: SEO;
}

// Site settings interface
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";
  title: string;
  description?: string;
  logo?: ImageWithAlt;
  mainNav?: {
    title: string;
    href: string;
  }[];
  footer?: {
    columns: {
      title: string;
      links: {
        title: string;
        href: string;
      }[];
    }[];
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

// Query result types
export interface PostsQueryResult {
  posts: Pick<
    Post,
    "_id" | "title" | "slug" | "excerpt" | "mainImage" | "publishedAt"
  > &
    {
      author: Pick<Author, "name" | "slug" | "image">;
      categories: Pick<Category, "title" | "slug">[];
    }[];
}

export interface PostQueryResult extends Post {
  author: Author;
  categories: Category[];
}

export type PageQueryResult = Page;

export interface CategoriesQueryResult {
  categories: Category[];
}

export type SettingsQueryResult = SiteSettings;
