import { render, screen } from '@testing-library/react'
import BlogCard from './BlogCard'

jest.mock('@/sanity/lib/client', () => ({
  urlFor: (image: { asset: { _ref: string } }) => ({
    width() { return this },
    height() { return this },
    url: () => `https://cdn.sanity.io/images/test/${image.asset._ref}.jpg`,
  }),
}))

const post = {
  _id: 'buyers-guide',
  title: 'Healthcare scheduling guide',
  slug: { current: 'healthcare-rostering-software-buyers-guide' },
  publishedAt: '2026-11-01T00:00:00Z',
}
const sarah = {
  name: 'Sarah Zhen',
  slug: { current: 'sarah-zhen' },
  image: { asset: { _ref: 'sarah-headshot' } },
}
const legacy = {
  name: 'Legacy Author',
  slug: { current: 'legacy-author' },
  image: { asset: { _ref: 'legacy-headshot' } },
}

test.each(['/blog', '/us/blog'])('shows the Authors field headshot and profile link on %s', (basePath) => {
  render(<BlogCard basePath={basePath} post={{ ...post, author: null, authors: [sarah] }} />)
  const image = screen.getByRole('img', { name: 'Sarah Zhen' })
  expect(image.getAttribute('src')).toContain('sarah-headshot')
  expect(image.closest('a')?.getAttribute('href')).toBe('/authors/sarah-zhen')
})

test('uses the same author for the name, photo and link when both fields exist', () => {
  render(<BlogCard post={{ ...post, author: legacy, authors: [sarah] }} />)
  expect(screen.getByRole('img', { name: 'Sarah Zhen' }).getAttribute('src')).toContain('sarah-headshot')
  expect(screen.queryByText('Legacy Author')).toBeNull()
})

test('keeps legacy author headshots working', () => {
  render(<BlogCard post={{ ...post, author: legacy, authors: [] }} />)
  const image = screen.getByRole('img', { name: 'Legacy Author' })
  expect(image.getAttribute('src')).toContain('legacy-headshot')
  expect(image.closest('a')?.getAttribute('href')).toBe('/authors/legacy-author')
})

test('renders safely without an author', () => {
  render(<BlogCard post={post} />)
  expect(screen.getByText('Unknown Author')).toBeTruthy()
  expect(screen.queryByRole('img')).toBeNull()
})
