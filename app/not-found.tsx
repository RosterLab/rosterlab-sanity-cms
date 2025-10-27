import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4"
      role="main"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Error status with role="status" for announcements */}
        <div role="status" aria-live="polite">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might
            have been moved or no longer exists.
          </p>
        </div>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            analyticsLabel="Go to Homepage"
            analyticsLocation="404 Page"
          >
            Go to Homepage
          </Button>
          <Button
            href="/contact"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            analyticsLabel="Contact Support"
            analyticsLocation="404 Page"
          >
            Contact Support
          </Button>
        </div>

        {/* Helpful links */}
        <nav className="mt-12" aria-label="Helpful links">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Popular Pages
          </h3>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li>
              <Link
                href="/book-a-demo"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Book a Demo
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/industries"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Industries
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
