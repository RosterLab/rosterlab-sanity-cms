"use client";

import { useState } from "react";
import CTAModalDemoVideo from "@/components/modals/CTAModalDemoVideo";

/**
 * Test page for Variant D modal
 * Visit http://localhost:3000/test-modal-d
 */
export default function TestModalDPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [conversionCount, setConversionCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-neutral-900">
          Variant D Modal Test Page
        </h1>

        <div className="space-y-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Open browser DevTools (F12 or Cmd+Opt+I)</li>
              <li>Go to the Console tab</li>
              <li>Fill out the form in the modal</li>
              <li>Watch for analytics logs (look for 🔍, 📧, 📤, ✅, ❌)</li>
              <li>Check if identify() is called and succeeds</li>
            </ol>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="font-semibold text-green-900 mb-2">✅ What to Look For:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
              <li><code className="bg-green-100 px-1 rounded">🔍 [Variant D] About to identify user</code></li>
              <li><code className="bg-green-100 px-1 rounded">📧 [Analytics] identify() called</code></li>
              <li><code className="bg-green-100 px-1 rounded">📤 [Analytics] Sending identify to CDP</code></li>
              <li><code className="bg-green-100 px-1 rounded">✅ [Analytics] CDP identify successful</code></li>
              <li><code className="bg-green-100 px-1 rounded">✅ [Variant D] User identified successfully</code></li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="font-semibold text-red-900 mb-2">❌ Errors to Watch For:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
              <li><code className="bg-red-100 px-1 rounded">❌ [Analytics] CDP identify failed</code></li>
              <li><code className="bg-red-100 px-1 rounded">❌ [Analytics] Identify fetch error</code></li>
              <li><code className="bg-red-100 px-1 rounded">CDP identify timeout after 3s</code></li>
              <li>Network errors in Network tab for <code className="bg-red-100 px-1 rounded">/api/batch</code></li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Open Modal (Variant D)
          </button>

          <button
            onClick={() => {
              if (window.analytics && window.analytics.logState) {
                window.analytics.logState();
              } else {
                console.log('Analytics utility not available');
              }
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Log Analytics State
          </button>
        </div>

        <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
          <p className="text-sm text-neutral-600">
            Conversions: <span className="font-bold text-neutral-900">{conversionCount}</span>
          </p>
        </div>
      </div>

      <CTAModalDemoVideo
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConversion={() => {
          setConversionCount(c => c + 1);
          console.log('✅ onConversion() callback fired');
        }}
        testMode={true}
      />
    </div>
  );
}
