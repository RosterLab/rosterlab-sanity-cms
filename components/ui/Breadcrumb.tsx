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
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-700 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}