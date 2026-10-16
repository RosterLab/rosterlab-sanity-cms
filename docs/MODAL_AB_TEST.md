# CTA Modal A/D Test

**Test Name**: `cta_modal_ab_test`

## Active variants

- **A**: Demo Booking (Book Demo CTA)
- **D**: Demo Video (gated form)

Case Study (B) and Webinar Recording (C) have been retired from automatic
rotation and preloading. The separate case-study content gate remains active.
Existing B/C history is retained without making those variants eligible again.

## Triggers and limits

The modal appears when either condition is met:

1. **High intent**: At least 60 accumulated seconds on qualifying pages.
2. **Returning visitor**: At least 45 seconds in the current session.

Existing eligibility logic is unchanged: returning-visitor detection also marks
visitors returning after navigation within their first session, and high-intent
time persists across visits.

- One automatic modal per manager mount.
- Maximum four modals per 30-day period.
- Three-day cooldown from appearance, updated on dismissal.
- Suppressed for booked-demo visitors and authenticated users.
- Suppressed on tools, pricing and about paths (including US versions),
  `/whitepapers` and `/us/whitepapers` (including all nested pages),
  `/test-modals...`, and the exact demo-booking routes.
- Navigating into either whitepaper flow also closes an existing promotional
  popup. Regional whitepaper forms and downloads remain available.
- Excluded pages can still contribute qualifying time before navigation away.

## Assignment

- First active modal: Random 50/50 split between A and D.
- Returning visitors: Prefer the unseen active variant, then alternate A and D.
- Historical B/C impressions still count toward existing frequency limits.
- Analytics variant IDs remain A and D to preserve continuity.
- The booking CTA preserves the regional flow: `/us` and `/us/...` pages link
  to `/us/book-a-demo`; other pages link to `/book-a-demo`. Both retain the
  popup UTM parameters.

## Preview and debugging

Use `/test-modals` to preview the two active variants. To force a variant on an
eligible page, use `?modal_variant=A` or `?modal_variant=D`. The URL override
selects the offer only; it does not bypass trigger conditions or cooldowns.
Retired B/C overrides are ignored and normal A/D assignment applies.

In development, inspect eligibility using `window.debugModalTracking()`.

## Events

- `ab_test_assigned`: Automatic variant assigned, including trigger type.
- `cta_modal_viewed`: Modal impression.
- `ab_test_dismissed`: Automatic modal closed, including trigger type.
- `ab_test_converted`: Automatic modal action completed, including trigger type.

A conversion for A is a click through to book a demo; a conversion for D is a
successful demo-video form submission. Neither means a confirmed demo booking.
The separate case-study content gate can still emit B component events but does
not receive an automatic `ab_test_assigned` event.

Demo-video submission failures show an accessible error message, retain the
entered details, and allow retrying. The error clears on retry or modal close.
