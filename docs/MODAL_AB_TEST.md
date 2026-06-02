# CTA Modal A/B/C/D Test

**Test Name**: `cta_modal_ab_test`

## Overview

Four modal variants that appear to high-intent visitors and returning visitors:
- **Variant A**: Demo Booking (CTA Book Demo)
- **Variant B**: Case Study (Gated)
- **Variant C**: Webinar Recording
- **Variant D**: Demo Video (Gated)

## Triggers

The modal appears when either condition is met:

1. **High-Intent**: Visited pricing/case-studies/ROI/solutions/features + 20s on page
2. **Returning Visitor**: Previous visit + 20s on site this session

**Constraints**:
- 1 modal per session
- Max 8 modals per 30-day period (2 full loops)
- Counter resets after 30 days
- Never shown if demo already booked
- Never shown to authenticated/logged-in users

## Variant Assignment

- **First visit**: Random 25% split (A/B/C/D)
- **Return visits**: Shows variants not yet seen, then cycles through all

## Testing

### Debug Current Status
```javascript
window.debugModalTracking()
```

### Reset & Test
```javascript
// Full reset (first-time visitor)
localStorage.clear();
sessionStorage.clear();
location.reload();

// Test on high-intent page - wait 20s on /pricing

// Check status
window.debugModalTracking()
```

### Force Specific Variant
```javascript
// Force Variant A
localStorage.clear();
sessionStorage.clear();
localStorage.setItem('rl_modal_state', JSON.stringify({
  variant: null,
  shown: false,
  dismissed: false,
  dismissedAt: null,
  converted: false,
  convertedAt: null,
  variantsShown: ['B', 'C', 'D'], // A will show next
  sessionModalShown: false
}));
location.reload();
// Wait 20s on /pricing
```

Change `variantsShown` to force different variants:
- Force A: `['B', 'C', 'D']`
- Force B: `['A', 'C', 'D']`
- Force C: `['A', 'B', 'D']`
- Force D: `['A', 'B', 'C']`

## Events Tracked

- `ab_test_assigned` - Variant assigned
- `cta_modal_viewed` - Modal shown
- `ab_test_dismissed` - Modal closed
- `ab_test_converted` - User completed action (PRIMARY METRIC)

All events include `variant` (A/B/C/D) and `trigger_type` (high_intent/returning_visitor).

## Files

- `components/modals/CTAModalManager.tsx` - Main controller
- `components/modals/CTAModalDemoBooking.tsx` - Variant A
- `components/modals/CTAModalCaseStudy.tsx` - Variant B
- `components/modals/CTAModalWebinarRecording.tsx` - Variant C
- `components/modals/CTAModalDemoVideo.tsx` - Variant D
- `lib/analytics/user-behavior-tracker.ts` - Tracking logic
