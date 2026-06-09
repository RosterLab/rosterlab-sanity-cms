"use client";

import { useState } from "react";
import { analytics } from "@/components/analytics/tracking";

export default function TestIdentifyPage() {
  const [email, setEmail] = useState("test@example.com");
  const [name, setName] = useState("Test User");
  const [result, setResult] = useState<string[]>([]);

  const addLog = (message: string) => {
    setResult((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testIdentify = () => {
    addLog("🧪 Testing identify()...");
    addLog(`Email: ${email}`);
    addLog(`Name: ${name}`);

    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      analytics.identify(email, {
        email,
        firstName,
        lastName,
        testMode: true,
      });
      addLog("✅ analytics.identify() called");
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }

    // Check if rlTracker is available
    if (typeof window !== "undefined" && window.rlTracker) {
      addLog("✅ window.rlTracker is available");
    } else {
      addLog("⚠️ window.rlTracker NOT available - fallback will be used");
    }

    // Check device ID
    const deviceId = analytics.getDeviceId();
    addLog(`Device ID: ${deviceId || "Not set"}`);
  };

  const testTrack = () => {
    addLog("🧪 Testing track()...");
    try {
      analytics.track("test_event", {
        test_property: "test_value",
        email,
      });
      addLog("✅ analytics.track() called");
    } catch (error) {
      addLog(`❌ Error: ${error}`);
    }
  };

  const clearLogs = () => {
    setResult([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Identify() Test
          </h1>
          <p className="text-gray-600 mb-8">
            Test the identify() function to verify email capture is working properly.
          </p>

          {/* Input Form */}
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="test@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={testIdentify}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Test identify()
            </button>
            <button
              onClick={testTrack}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Test track()
            </button>
            <button
              onClick={clearLogs}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>

          {/* Results */}
          <div className="bg-gray-900 rounded-lg p-4 min-h-[300px]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-mono text-sm">Console Output</h2>
              <span className="text-xs text-gray-400">
                Also check browser DevTools console
              </span>
            </div>
            <div className="space-y-1 font-mono text-xs">
              {result.length === 0 ? (
                <p className="text-gray-500">Click a button to test...</p>
              ) : (
                result.map((log, i) => (
                  <div
                    key={i}
                    className={`${
                      log.includes("✅")
                        ? "text-green-400"
                        : log.includes("❌")
                        ? "text-red-400"
                        : log.includes("⚠️")
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How to verify:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Open browser DevTools (F12) and go to Console tab</li>
              <li>Click "Test identify()" button above</li>
              <li>Check for console logs starting with [Analytics]</li>
              <li>Go to Network tab and filter for "identify" or "ops.rosterlab.com"</li>
              <li>Verify the POST request was sent with correct payload</li>
            </ol>
          </div>

          {/* Network Check */}
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">If not working:</h3>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Check if ad blocker is blocking ops.rosterlab.com</li>
              <li>Look for CORS errors in DevTools console</li>
              <li>Verify tracker.js script loaded (Network tab)</li>
              <li>Check if fallback API call is being made</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
