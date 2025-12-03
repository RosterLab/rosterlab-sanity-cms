import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: "e.g., CEO & Founder, Content Marketing Manager",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
      description: "Rich text bio with formatting support",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Optional contact email",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          description: "Full LinkedIn profile URL",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
          description: "Full Twitter profile URL",
        }),
        defineField({
          name: "github",
          title: "GitHub",
          type: "url",
          description: "Full GitHub profile URL",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "url",
          description: "Personal website or portfolio URL",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
