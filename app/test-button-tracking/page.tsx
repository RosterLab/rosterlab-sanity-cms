"use client";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { trackSmartButtonClick } from "@/components/analytics/Amplitude";

export default function TestButtonTracking() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8">Button Tracking Test Page</h1>
      <p className="mb-8">
        This page demonstrates the new button tracking implementation. Open your
        browser's console to see the events being tracked.
      </p>

      <div className="grid gap-4 max-w-lg">
        <h2 className="text-xl font-semibold mt-6">Using Button Component:</h2>

        <Button
          href="https://app.rosterlab.com/signup"
          analyticsLabel="Sign up for free"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Sign up for free
        </Button>

        <Button
          href="/book-a-demo"
          analyticsLabel="Book a Demo"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Book a Demo
        </Button>

        <Button
          href="/staff-rostering-interactive-demo"
          analyticsLabel="See an Example"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          See an Example
        </Button>

        <Button
          href="/contact"
          analyticsLabel="Contact Us"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Contact Us
        </Button>

        <Button
          href="https://app.rosterlab.com"
          analyticsLabel="Login"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Login
        </Button>

        <Button
          href="/pricing"
          analyticsLabel="View Pricing"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          View Pricing
        </Button>

        <Button
          href="mailto:hello@rosterlab.com"
          analyticsLabel="Email Us"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Email Us
        </Button>

        <Button
          href="https://test.rosterlab.com"
          analyticsLabel="Test Free Sign Up"
          analyticsLocation="Test Page Button Component"
          analyticsProperties={{ test: true }}
        >
          Test Free Sign Up
        </Button>

        <h2 className="text-xl font-semibold mt-6">
          Direct trackSmartButtonClick Usage:
        </h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() =>
            trackSmartButtonClick(
              "Custom Button",
              "/custom-path",
              "Test Page Direct",
              { custom: true },
            )
          }
        >
          Custom Path Button
        </button>
      </div>
    </Container>
  );
}
