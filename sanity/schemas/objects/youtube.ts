import { defineType } from 'sanity'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      validation: (Rule) =>
        Rule.required().custom((url) => {
          const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
          return pattern.test(url as string) || 'Must be a valid YouTube URL'
        }),
    },
  ],
})