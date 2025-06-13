import { describe, test, expect } from '@jest/globals'
import { 
  postsQuery, 
  postQuery, 
  pageQuery, 
  settingsQuery,
  categoriesQuery 
} from '../lib/queries'

describe('Sanity Query Validation', () => {
  test('postsQuery should be valid GROQ', () => {
    expect(postsQuery).toContain('*[_type == "post"]')
    expect(postsQuery).toContain('order(publishedAt desc)')
    expect(postsQuery).toContain('author->')
    expect(postsQuery).toContain('categories[]->')
  })

  test('postQuery should fetch single post with slug parameter', () => {
    expect(postQuery).toContain('*[_type == "post" && slug.current == $slug][0]')
    expect(postQuery).toContain('author->')
    expect(postQuery).toContain('categories[]->')
    expect(postQuery).toContain('body')
    expect(postQuery).toContain('seo')
  })

  test('pageQuery should fetch page with slug parameter', () => {
    expect(pageQuery).toContain('*[_type == "page" && slug.current == $slug][0]')
    expect(pageQuery).toContain('pageBuilder')
    expect(pageQuery).toContain('seo')
  })

  test('settingsQuery should fetch site settings', () => {
    expect(settingsQuery).toContain('*[_type == "siteSettings"][0]')
    expect(settingsQuery).toContain('mainNav')
    expect(settingsQuery).toContain('footer')
    expect(settingsQuery).toContain('socialLinks')
  })

  test('categoriesQuery should fetch all categories', () => {
    expect(categoriesQuery).toContain('*[_type == "category"]')
    expect(categoriesQuery).toContain('order(title asc)')
  })

  test('queries should include essential fields', () => {
    // Posts query should include basic fields
    expect(postsQuery).toContain('_id')
    expect(postsQuery).toContain('title')
    expect(postsQuery).toContain('slug')
    
    // Post query should include body for full content
    expect(postQuery).toContain('body')
    
    // Page query should include page builder
    expect(pageQuery).toContain('pageBuilder')
  })
})