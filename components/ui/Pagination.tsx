import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export default function Pagination({ currentPage, totalPages, basePath, className }: PaginationProps) {
  const maxVisiblePages = 5
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...')
      }
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust range to always show at least 3 numbers
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }
  
  const getPageUrl = (page: number) => {
    return page === 1 ? basePath : `${basePath}/page/${page}`
  }

  return (
    <nav className={cn("flex justify-center items-center space-x-2 mt-12", className)} aria-label="Pagination">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          rel="prev"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Link>
      )}
      
      {/* Page numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500">
                ...
              </span>
            )
          }
          
          const pageNumber = page as number
          const isActive = pageNumber === currentPage
          
          return (
            <Link
              key={pageNumber}
              href={getPageUrl(pageNumber)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                isActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </Link>
          )
        })}
      </div>
      
      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          rel="next"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  )
}