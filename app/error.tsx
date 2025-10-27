"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4"
      role="main"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Error alert with role="alert" for immediate announcement */}
        <div role="alert" aria-live="assertive">
          <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're sorry, but something unexpected happened. Our team has been
            notified and we're working to fix the issue.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={reset}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            analyticsLabel="Try Again"
            analyticsLocation="Error Page"
          >
            Try Again
          </Button>
          <Button
            href="/"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            analyticsLabel="Go to Homepage"
            analyticsLocation="Error Page"
          >
            Go to Homepage
          </Button>
        </div>

        {/* Error details for debugging (only in development) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg">
            <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-sm text-red-600 overflow-auto whitespace-pre-wrap break-words">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-sm text-gray-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </details>
        )}

        {/* Support link */}
        <nav className="mt-8" aria-label="Support">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 transition-colors font-semibold"
            >
              Contact our support team
            </a>
          </p>
        </nav>
      </div>
    </div>
  );
}
