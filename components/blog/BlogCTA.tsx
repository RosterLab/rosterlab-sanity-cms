import Link from 'next/link'

interface BlogCTAProps {
  title?: string
  description?: string
  primaryButton?: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
}

export default function BlogCTA({
  title = "Ready to Transform Your Workforce Management?",
  description = "Join thousands of businesses using RosterLab to streamline their rostering and payroll processes.",
  primaryButton = {
    text: "Start Free Trial",
    href: "/pricing"
  },
  secondaryButton = {
    text: "Book a Demo",
    href: "/demo"
  }
}: BlogCTAProps) {
  return (
    <div className="mt-16 p-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={primaryButton.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-100 transition-all transform hover:scale-105"
        >
          {primaryButton.text}
        </Link>
        <Link
          href={secondaryButton.href}
          className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-all"
        >
          {secondaryButton.text}
        </Link>
      </div>
    </div>
  )
}