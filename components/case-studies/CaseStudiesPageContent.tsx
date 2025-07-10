'use client'

import { useState, useMemo, useEffect } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import Container from '@/components/ui/Container'
import Pagination from '@/components/ui/Pagination'

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset: { _ref: string }; alt?: string }
  publishedAt: string
  author: { name: string; image?: { asset: { _ref: string }; alt?: string } }
  categories?: Array<{ title: string; slug: { current: string } }>
}

interface CaseStudiesPageContentProps {
  posts: CaseStudy[]
  currentPage?: number
}

export default function CaseStudiesPageContent({ posts, currentPage = 1 }: CaseStudiesPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const postsPerPage = 12
  
  // Load non-critical CSS asynchronously
  useEffect(() => {
    const loadAsyncCSS = () => {
      // Load any additional non-critical styles
      const nonCriticalLink = document.createElement('link')
      nonCriticalLink.rel = 'stylesheet'
      nonCriticalLink.href = '/styles/non-critical.css'
      nonCriticalLink.media = 'print'
      nonCriticalLink.onload = function() {
        (this as any).media = 'all'
      }
      document.head.appendChild(nonCriticalLink)
    }

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAsyncCSS)
    } else {
      setTimeout(loadAsyncCSS, 1)
    }
  }, [])

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts

    const query = searchQuery.toLowerCase()
    return posts.filter(post => {
      // Search in title
      if (post.title?.toLowerCase().includes(query)) return true
      
      // Search in excerpt
      if (post.excerpt && post.excerpt.toLowerCase().includes(query)) return true
      
      // Search in author name
      if (post.author?.name?.toLowerCase().includes(query)) return true
      
      // Search in categories
      if (post.categories?.some(cat => cat.title?.toLowerCase().includes(query))) return true
      
      return false
    })
  }, [posts, searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = searchQuery ? filteredPosts : filteredPosts.slice(startIndex, endIndex)

  return (
    <div className="py-16 bg-neutral-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            See how global organizations are transforming their workforce management with RosterLab.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full px-5 py-3 pl-12 text-neutral-900 bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent shadow-sm"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-neutral-600 text-center">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'case study' : 'case studies'} 
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          )}
        </div>

        {/* Case Studies Grid */}
        {paginatedPosts && paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            {/* Pagination - only show when not searching and there's more than 1 page */}
            {!searchQuery && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/case-studies"
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-neutral-600 mb-4">
              {searchQuery ? 'No case studies found' : 'No case studies yet'}
            </h2>
            <p className="text-neutral-500">
              {searchQuery 
                ? 'Try searching with different keywords.' 
                : 'Check back soon for real-world success stories.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}