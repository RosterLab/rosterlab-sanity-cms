import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "usLocalization",
      title: "US resource localization",
      type: "object",
      description:
        "US blog, case study and newsroom pages use the global article with American spelling and scheduling terminology. Preserve customer names, locations and quotes. Optional overrides below are displayed exactly as written.",
      fields: [
        defineField({
          name: "protectedTerms",
          title: "Keep these phrases unchanged",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Add organization names, legislation titles, product names, and other phrases that must remain verbatim.",
        }),
        defineField({ name: "title", title: "US title", type: "string" }),
        defineField({
          name: "excerpt",
          title: "US summary",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "body",
          title: "US article body",
          type: "blockContent",
          description:
            "Leave empty to automatically adapt the global body. An override replaces the entire US body.",
        }),
        defineField({
          name: "metaTitle",
          title: "US SEO title",
          type: "string",
        }),
        defineField({
          name: "metaDescription",
          title: "US SEO description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
