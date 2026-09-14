import {
  defineField,
  defineType,
  type ConditionalPropertyCallbackContext,
} from "sanity";

// A global-only article never renders a US page, so its US fields are noise.
// Left visible for "All sites" and "US site only".
const hiddenOnGlobalOnly = ({ document }: ConditionalPropertyCallbackContext) =>
  document?.sites === "global";
import {
  UsExcerptInput,
  UsMetaDescriptionInput,
  UsMetaTitleInput,
  UsSlugInput,
  UsTitleInput,
} from "../../components/UsDerivedInput";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "sites",
      title: "Publish to",
      type: "string",
      description:
        "Which sites this article appears on. Posts left unset are treated as All sites, so existing articles are unaffected.",
      initialValue: "all",
      options: {
        layout: "radio",
        list: [
          { title: "All sites", value: "all" },
          { title: "Global site only", value: "global" },
          { title: "US site only", value: "us" },
        ],
      },
      // Not required: initialValue only applies to new documents, so marking
      // it required flags every article written before the field existed.
      // Unset already behaves as All sites everywhere in the code.
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "usTitle",
      hidden: hiddenOnGlobalOnly,
      title: "US title",
      type: "string",
      components: { input: UsTitleInput },
      description:
        "Leave blank to follow the global copy - the grey text shows exactly what the US page will render. Type here only to override it.",
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
      name: "usSlug",
      title: "US slug",
      type: "slug",
      hidden: hiddenOnGlobalOnly,
      description:
        "Leave blank to derive it from the global slug - the grey text shows what it will be. Set one only to target a different US keyword; the old URL keeps redirecting.",
      components: { input: UsSlugInput as never },
      validation: (Rule) =>
        Rule.custom((value?: { current?: string }) =>
          !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
            ? true
            : "Use lowercase words separated by single hyphens",
        ),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
      description:
        "One or more authors. Several are shown as co-authors in the byline, in this order.",
      validation: (Rule) =>
        Rule.unique().custom((authors, context) => {
          // Every existing post still carries the single `author` field, so
          // either one satisfies the requirement until the data is migrated.
          const legacy = (context.document as { author?: unknown } | undefined)
            ?.author;
          return authors?.length || legacy ? true : "Add at least one author";
        }),
    }),
    // Superseded by `authors` above. Read as a fallback so posts keep their
    // byline without being migrated; safe to delete once the data has moved.
    defineField({
      name: "author",
      title: "Author (legacy)",
      type: "reference",
      to: { type: "author" },
      description: "Older single-author field. Use Authors above instead.",
      hidden: ({ document }) =>
        Boolean(
          (document as { authors?: unknown[] } | undefined)?.authors?.length,
        ),
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
      name: "usMainImage",
      hidden: hiddenOnGlobalOnly,
      title: "US main image",
      type: "image",
      description:
        "Leave empty to reuse the global image with US alt text. Set one when the artwork itself shows roster wording or a non-US setting.",
      options: { hotspot: true },
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
      name: "usExcerpt",
      hidden: hiddenOnGlobalOnly,
      title: "US summary",
      type: "text",
      rows: 3,
      components: { input: UsExcerptInput },
      description:
        "Leave blank to follow the global copy - the grey text shows exactly what the US page will render. Type here only to override it.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "usBody",
      hidden: hiddenOnGlobalOnly,
      title: "US article body",
      type: "blockContent",
      description:
        "Leave empty to automatically adapt the global body. An override replaces the entire US body.",
    }),
    defineField({
      name: "usProtectedTerms",
      hidden: hiddenOnGlobalOnly,
      title: "Keep these phrases unchanged (US)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Organization names, legislation titles, product names and other phrases that must stay verbatim on the US page.",
    }),
    // Superseded by the usTitle / usExcerpt / usBody / usSeo fields above, which
    // sit beside their global counterparts. Kept so the values already entered
    // here keep rendering: localizeUSPost reads the fields above first and falls
    // back to this object, so nothing has to be migrated to stay live. Safe to
    // delete once the data has been moved.
    defineField({
      name: "usLocalization",
      hidden: hiddenOnGlobalOnly,
      title: "US resource localization (legacy)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      description:
        "Older location for the US overrides. Use the US fields beside each global field instead.",
      fields: [
        defineField({
          name: "protectedTerms",
          title: "Keep these phrases unchanged",
          type: "array",
          of: [{ type: "string" }],
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
        defineField({
          name: "mainImage",
          title: "US main image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternative text" }],
        }),
        defineField({
          name: "ogImage",
          title: "US Open Graph image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "usSeo",
      hidden: hiddenOnGlobalOnly,
      title: "US SEO",
      type: "object",
      description:
        "US search and social values. Leave a field empty to localize the global one automatically.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "metaTitle",
          title: "US meta title",
          type: "string",
          components: { input: UsMetaTitleInput },
        }),
        defineField({
          name: "metaDescription",
          title: "US meta description",
          type: "text",
          rows: 3,
          components: { input: UsMetaDescriptionInput },
        }),
        defineField({
          name: "ogImage",
          title: "US Open Graph image",
          type: "image",
          description: "Leave empty to reuse the global sharing image.",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      firstAuthor: "authors.0.name",
      secondAuthor: "authors.1.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author, firstAuthor, secondAuthor } = selection;
      // Co-authored posts list the first name and a count, so the document
      // list stays readable.
      const byline = firstAuthor
        ? secondAuthor
          ? `${firstAuthor} and others`
          : firstAuthor
        : author;
      return { ...selection, subtitle: byline && `by ${byline}` };
    },
  },
});
