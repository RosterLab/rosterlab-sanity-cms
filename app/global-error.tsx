"use client";

import { useEffect } from "react";
import { captureClientException } from "@/lib/monitoring/posthog-client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureClientException(error, {
      boundary: "global",
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="max-w-lg text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Something went wrong
            </h1>
            <p className="mt-4 text-gray-600">
              We have recorded the problem. Please try again.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full bg-blue-600 px-8 py-3 font-semibold text-white"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
