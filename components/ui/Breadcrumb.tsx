import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-0" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="mx-2 h-4 w-4 text-neutral-400 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-neutral-700 transition-colors truncate max-w-[200px] sm:max-w-none"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700 truncate max-w-[200px] sm:max-w-none">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}