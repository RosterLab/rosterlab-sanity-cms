# Statsig: A/B Testing & Session Replay

## Overview

Statsig provides experimentation (A/B tests, feature gates) and session replay for the RosterLab marketing site. Experiments are evaluated server-side at render time and bootstrapped to the client for zero-flicker rendering.

## Architecture

```
Request → middleware (geo detection)
        → layout.tsx (server component)
             ├── reads _rl_anon_id cookie
             ├── Statsig server SDK evaluates experiments for this user
             └── passes bootstrap values to <StatsigProvider>
                     ├── Client SDK hydrates instantly (no network call)
                     ├── Session replay records (production, 10% sample)
                     └── Components access experiments via hooks
```

**Identity**: Uses the `_rl_anon_id` cookie as the Statsig `userID`. If the cookie isn't set yet (first ever page load), Statsig uses its own internal stable ID until the tracker sets the cookie.

## Environment Variables

```env
NEXT_PUBLIC_STATSIG_CLIENT_KEY=client-xxxxx   # Safe to expose (client SDK key)
STATSIG_SERVER_SECRET=secret-xxxxx            # Server-only, never exposed to browser
```

## Usage

### Client-side experiment (any client component)

```tsx
"use client";

import { useExperiment } from "@/lib/statsig/hooks";

export function HeroSection() {
  const experiment = useExperiment("homepage_hero_test");
  const variant = experiment.get("variant", "control");
  const headline = experiment.get("headline", "Default Headline");

  return (
    <section>
      <h1>{headline}</h1>
      {variant === "social_proof" && <TestimonialStrip />}
    </section>
  );
}
```

### Server-side experiment (page server component)

```tsx
import { getServerExperiment } from "@/lib/statsig/server-helpers";

export default async function PricingPage() {
  const experiment = await getServerExperiment("pricing_layout_test");
  const layout = experiment.get("layout", "default");

  return layout === "comparison" ? <ComparisonPricing /> : <DefaultPricing />;
}
```

### Feature gate (boolean on/off)

```tsx
"use client";

import { useFeatureGate } from "@/lib/statsig/hooks";

export function SignupButton() {
  const gate = useFeatureGate("new_signup_flow");

  return gate.value ? <NewSignupFlow /> : <LegacySignupFlow />;
}
```

### Server-side feature gate

```tsx
import { checkServerGate } from "@/lib/statsig/server-helpers";

export default async function Page() {
  const showBanner = await checkServerGate("holiday_promo_banner");
  return showBanner ? <PromoBanner /> : null;
}
```

## Creating Experiments in Statsig Console

1. Go to **Experiments** in the Statsig Console
2. Create a new experiment with a name (e.g., `homepage_hero_test`)
3. Define parameters (e.g., `variant: string`, `headline: string`)
4. Set up groups (control + variants) with parameter values
5. Configure targeting rules (e.g., country, percentage rollout)
6. Start the experiment

The experiment name you use in the console must match the string you pass to `useExperiment()` or `getServerExperiment()`.

## Session Replay

- Enabled automatically in production via `StatsigSessionReplayPlugin`
- Records 10% of sessions (configured in Statsig Console under Session Replay settings)
- Inputs are masked by default for privacy
- View replays in Statsig Console → Session Replay

## Key Files

| File | Purpose |
|------|---------|
| `lib/statsig/server.ts` | Server SDK singleton, user construction |
| `lib/statsig/client-bootstrap.ts` | Generates bootstrap values for client |
| `lib/statsig/server-helpers.ts` | `getServerExperiment()`, `checkServerGate()` |
| `lib/statsig/hooks.ts` | Client hook re-exports |
| `components/analytics/StatsigProvider.tsx` | Client provider + session replay init |
| `components/analytics/StatsigExposureLogger.tsx` | Pipes exposures to analytics.track() |

## How Exposure Tracking Works

When an experiment or gate is evaluated, `StatsigExposureLogger` automatically fires:

```ts
analytics.track("experiment_exposure", {
  type: "experiment" | "gate",
  name: "experiment_name",
  group: "variant_group_name",  // experiments only
  rule_id: "rule_123",
  source: "statsig",
});
```

This goes through the standard analytics pipeline (rlTracker + GTM dataLayer), so experiment exposures appear alongside other events in your analytics tools.

## Tips

- **No flicker**: Because values are bootstrapped server-side, experiments render correctly on the first paint. No loading states needed.
- **Targeting by country**: The user's detected country (from Netlify headers) is passed to Statsig, so you can target experiments by geography.
- **Server vs client**: Use server-side evaluation (`getServerExperiment`) when the experiment determines which component to render. Use client-side (`useExperiment`) when you need reactivity or the experiment only affects client behavior.
- **Statsig SDK handles assignment**: You don't need to manually assign users to groups — Statsig does this deterministically based on the user ID and experiment config.
