"use client";

import { useState } from "react";
import { analytics } from "@/components/analytics/tracking";

export default function TestCDPTracking() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<string>("");

  const testIdentify = async () => {
    if (!email) {
      setStatus("❌ Please enter an email");
      return;
    }

    setStatus("🔄 Sending identify...");

    try {
      await analytics.identify(email, {
        email: email,
        firstName: firstName,
        lastName: lastName,
      });
      setStatus("✅ Identify sent! Check Network tab for POST to /api/batch");
    } catch (error) {
      setStatus(`❌ Error: ${error}`);
    }
  };

  const testTrack = () => {
    setStatus("🔄 Sending track event...");

    analytics.track("test_event", {
      test_property: "test_value",
      timestamp: new Date().toISOString(),
    });

    setStatus("✅ Track event sent! Check Network tab for POST to /api/batch");
  };

  const checkState = () => {
    const state = {
      anonymousId: analytics.getDeviceId(),
      userId: analytics.getUserId(),
      sessionId: analytics.getSessionId(),
    };

    console.log("[Analytics State]", state);
    setStatus(`📊 State logged to console: ${JSON.stringify(state, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          CDP Tracking Test Page
        </h1>

        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-blue-900">
            Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Open browser DevTools (F12) → Network tab</li>
            <li>Filter by "/api/batch" or "batch"</li>
            <li>Click "Check State" to see current analytics state</li>
            <li>Click "Test Track Event" to send a test event</li>
            <li>Fill form and click "Test Identify" to link anonymous session to email</li>
            <li>Check Network tab for POST requests with payload</li>
          </ol>
        </div>

        {/* State Check */}
        <div className="mb-6">
          <button
            onClick={checkState}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            📊 Check Analytics State
          </button>
        </div>

        {/* Track Event */}
        <div className="mb-6">
          <button
            onClick={testTrack}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            🚀 Test Track Event
          </button>
        </div>

        {/* Identify Form */}
        <div className="mb-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Test User Identification
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={testIdentify}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              👤 Test Identify
            </button>
          </div>
        </div>

        {/* Status Display */}
        {status && (
          <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
            <p className="text-sm font-mono whitespace-pre-wrap">{status}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold mb-2 text-yellow-900">
            What to check in Network tab:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
            <li>
              <strong>Track event:</strong> POST to /api/batch with{" "}
              <code>type: "track"</code>
            </li>
            <li>
              <strong>Identify event:</strong> POST to /api/batch with{" "}
              <code>type: "identify"</code>
            </li>
            <li>
              <strong>Payload should include:</strong> anonymousId, userId (after
              identify), context, timestamp
            </li>
            <li>
              <strong>Response:</strong> Should be 200 OK
            </li>
          </ul>
        </div>

        {/* Cookie Info */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold mb-2 text-gray-900">
            Cookie Information:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <code>_rl_anon_id</code> - Anonymous ID (should persist across
              page loads)
            </li>
            <li>
              <code>rl_authenticated</code> - Authenticated user ID (after login)
            </li>
          </ul>
        </div>

        {/* Links */}
        <div className="mt-8 flex gap-4">
          <a
            href="/test-modal"
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Test Modals
          </a>
          <a
            href="/book-a-demo"
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
          >
            Test Calendly
          </a>
        </div>
      </div>
    </div>
  );
}
