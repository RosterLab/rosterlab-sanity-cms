"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteLayout from "@/components/layout/SiteLayout";
import Container from "@/components/ui/Container";
import { useMarketAccess } from "@/components/market-access/MarketAccessProvider";

const APP_SIGNUP_URL = "https://app.rosterlab.com/signup";

export default function StartFreePage() {
  const { status, decision, canSignUpFree } = useMarketAccess();

  useEffect(() => {
    if (status === "ready" && canSignUpFree) {
      window.location.replace(APP_SIGNUP_URL);
    }
  }, [canSignUpFree, status]);

  const loading = status === "loading" || canSignUpFree;

  return (
    <SiteLayout>
      <div className="min-h-[70vh] bg-gradient-to-b from-blue-50 to-white py-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-lg md:p-12">
            {loading ? (
              <>
                <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-b-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Checking availability…
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  RosterLab Free isn&apos;t currently available in your region
                </h1>
                <p className="mt-4 text-gray-600">
                  Existing users can still sign in. If you&apos;re travelling or
                  using a VPN, retry from your organisation&apos;s country.
                </p>
                {decision?.countryCode && (
                  <p className="mt-2 text-sm text-gray-500">
                    Detected country: {decision.countryCode}
                  </p>
                )}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/staff-rostering-interactive-demo"
                    className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Explore the interactive demo
                  </Link>
                  <a
                    href="https://app.rosterlab.com"
                    className="rounded-md border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Sign in
                  </a>
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
