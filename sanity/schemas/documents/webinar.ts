import { defineField, defineType } from "sanity";

export default defineType({
  name: "webinar",
  title: "Webinar",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short description shown on cards",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hosts",
      title: "Hosts/Speakers",
      type: "array",
      of: [{ type: "reference", to: { type: "author" } }],
      description: "Webinar hosts and speakers",
    }),
    defineField({
      name: "date",
      title: "Webinar Date",
      type: "datetime",
      description: "Date the webinar was held",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., 60 mins, 45 mins",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g., Healthcare, Technology",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Recording", value: "Recording" },
          { title: "Upcoming", value: "Upcoming" },
          { title: "Live", value: "Live" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Thumbnail for webinar cards",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description: "YouTube embed URL for the webinar recording",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "When to show this webinar on the site",
      validation: (Rule) => Rule.required(),
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
      media: "thumbnail",
      date: "date",
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        ...selection,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date",
      };
    },
  },
});
