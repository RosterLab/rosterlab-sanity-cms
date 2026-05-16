# Enriched Event Tracking

## What changed

Every event sent via `analytics.track()` is now automatically enriched with client-side context and server-side geo data. No popups, no permissions, no third-party API calls.

## Data sources

### 1. Server-side geo (Netlify headers → middleware → `/api/geo`)

The middleware now extracts all available geo data from Netlify's built-in headers (`x-nf-geo`, `x-nf-city`, `x-nf-region`, `x-nf-timezone`) and Vercel/Cloudflare equivalents, and forwards them as response headers. The `/api/geo` route returns:

| Property    | Source                        | Example               |
|-------------|-------------------------------|-----------------------|
| `$geo_country`  | Netlify `x-country` / Vercel geo | `AU`                  |
| `$geo_city`     | Netlify geo / Vercel geo     | `Sydney`              |
| `$geo_region`   | Netlify geo / Vercel geo     | `NSW`                 |
| `$geo_timezone` | Netlify geo                  | `Australia/Sydney`    |
| `$geo_latitude` | Netlify geo / Vercel geo     | `-33.8688`            |
| `$geo_longitude`| Netlify geo / Vercel geo     | `151.2093`            |

The geo data is fetched once on page load (fire-and-forget, cached). If it arrives before the first event, it's included. If not, subsequent events get it.

### 2. Browser timezone → country/state mapping (`$tz_country`, `$tz_region`)

`Intl.DateTimeFormat().resolvedOptions().timeZone` returns the IANA timezone (e.g. `Australia/Sydney`). We map this to country and region/state:

- **Australia**: Exact state mapping (Sydney→NSW, Melbourne→VIC, Brisbane→QLD, etc.)
- **New Zealand**: Country-level
- **US**: Exact for AZ, HI, AK, IN, KY, ND, MI, ID. Broad zone for the rest (US-Eastern, US-Central, etc.)
- **Canada**: Province-level (Toronto→ON, Vancouver→BC, Edmonton→AB, etc.)
- **Other countries**: Country-level where timezone is unambiguous

This is the fallback when server geo isn't available (e.g. local dev, CDN cache hits).

### 3. Client-side browser context (zero-permission APIs)

| Property              | API                              | What it tells you                        |
|-----------------------|----------------------------------|------------------------------------------|
| `$timezone`           | `Intl.DateTimeFormat`            | IANA timezone string                     |
| `$timezone_offset`    | `Date.getTimezoneOffset()`       | UTC offset in minutes                    |
| `$locale`             | `Intl.DateTimeFormat`            | Resolved locale (e.g. `en-AU`)           |
| `$languages`          | `navigator.languages`            | Preferred languages array                |
| `$screen_width/height`| `screen.width/height`            | Physical screen size                     |
| `$viewport_width/height`| `window.innerWidth/Height`     | Browser viewport size                    |
| `$device_pixel_ratio` | `window.devicePixelRatio`        | Retina detection                         |
| `$device_type`        | width + touch heuristic          | `mobile` / `tablet` / `desktop`          |
| `$touch_capable`      | `ontouchstart` / `maxTouchPoints`| Touch screen present                     |
| `$platform`           | `navigator.userAgentData`        | OS platform                              |
| `$vendor`             | `navigator.vendor`               | Browser vendor                           |
| `$connection_type`    | Network Information API          | `4g`, `3g`, `2g`, `slow-2g`             |
| `$connection_downlink`| Network Information API          | Bandwidth estimate (Mbps)                |
| `$connection_rtt`     | Network Information API          | Round-trip time (ms)                     |
| `$connection_save_data`| Network Information API         | Data saver enabled                       |
| `$hardware_concurrency`| `navigator.hardwareConcurrency` | CPU core count                           |
| `$device_memory`      | `navigator.deviceMemory`         | RAM in GB (Chrome only)                  |
| `$dark_mode`          | `prefers-color-scheme` media     | Dark mode preference                     |
| `$reduced_motion`     | `prefers-reduced-motion` media   | Accessibility preference                 |
| `$do_not_track`       | `navigator.doNotTrack`           | DNT header set                           |
| `$ad_blocker_likely`  | DOM visibility check             | Ad blocker detected                      |
| `$color_depth`        | `screen.colorDepth`              | Display color depth                      |
| `$webgl_renderer`     | WebGL debug extension            | GPU model (e.g. `Apple M1 Pro`)          |

## How it works

1. **UTMTracker** fires `fetchServerGeo()` on mount — a single `/api/geo` call, cached for the session.
2. **`analytics.track()`** calls `getEnrichmentData()` which synchronously reads the cached client context and server geo. All `$`-prefixed properties are merged into every event.
3. Client context is computed once and cached in memory (except viewport which could change, but re-computing on every event would be wasteful for little gain).

## Property naming

All enrichment properties use a `$` prefix to distinguish them from explicit event properties and UTM data. This prevents collisions and makes it easy to filter in your analytics tool.

## Files changed

- `middleware.ts` — Extracts and forwards Netlify geo headers
- `app/api/geo/route.ts` — Returns full geo payload (country, city, region, timezone, lat/lng)
- `lib/analytics/client-context.ts` — **New.** Client context collector + timezone→country/state maps + server geo fetcher
- `components/analytics/tracking.ts` — Enriches every `track()` call with context data
- `components/analytics/UTMTracker.tsx` — Kicks off geo fetch on page load
