import { Author } from '../types'

export const authorFixtures: Omit<Author, '_id' | '_createdAt' | '_updatedAt' | '_rev'>[] = [
  {
    _type: 'author',
    name: 'John Smith',
    slug: {
      current: 'john-smith',
      _type: 'slug',
    },
    bio: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Senior Product Manager at RosterLab with 5+ years experience in workforce management solutions.',
          },
        ],
      },
    ],
  },
  {
    _type: 'author',
    name: 'Sarah Johnson',
    slug: {
      current: 'sarah-johnson',
      _type: 'slug',
    },
    bio: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Head of Marketing at RosterLab, passionate about helping businesses optimize their workforce.',
          },
        ],
      },
    ],
  },
  {
    _type: 'author',
    name: 'Mike Chen',
    slug: {
      current: 'mike-chen',
      _type: 'slug',
    },
    bio: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Technical Lead specialising in AI-powered scheduling solutions.',
          },
        ],
      },
    ],
  },
]