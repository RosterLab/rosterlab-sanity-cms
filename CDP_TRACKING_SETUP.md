# CDP Event Tracking Implementation

## Overview

This document describes the Customer Data Platform (CDP) event tracking implementation for popup conversion analytics and user identification across the RosterLab website.

## CDP Endpoint

The CDP is hosted at: `https://rosterlab-inngest.netlify.app/api/batch`

This can be configured via the environment variable:
```
NEXT_PUBLIC_CDP_ENDPOINT=https://rosterlab-inngest.netlify.app/api/batch
```

## Implementation Summary

### 1. Core Analytics Module (`components/analytics/tracking.ts`)

The `analytics` object provides three main methods:

#### `analytics.track(eventName, properties)`
- Sends events to RosterLab tracker, GTM dataLayer, AND CDP
- Automatically enriches events with:
  - UTM parameters (source, medium, campaign, content, term)
  - Device context (timezone, locale, screen size, device type, etc.)
  - Geo data (country, city, region)
  - Page context (URL, path, referrer)
  - Anonymous ID from `_rl_anon_id` cookie

#### `analytics.identify(userId, userProperties)` ✅ **ENHANCED**
- **CRITICAL**: Links anonymous sessions to known users via email
- Sends to both RosterLab tracker AND CDP
- Creates the connection between `anonymousId` and `userId`
- Should be called BEFORE any form submission or redirect
- Example:
  ```typescript
  await analytics.identify(email, {
    email: email,
    firstName: firstName,
    lastName: lastName,
    company: company,
    industry: industry,
    role: role,
  });
  ```

#### Helper Methods
- `analytics.getDeviceId()` - Returns `_rl_anon_id` cookie value
- `analytics.getUserId()` - Returns authenticated user ID from `rl_authenticated` cookie
- `analytics.getSessionId()` - Returns current session ID

### 2. Modal Event Tracking

All CTA modals automatically track:

#### **Modal Viewed**
```typescript
analytics.track("cta_modal_viewed", {
  variant: "A" | "B" | "C" | "D",
  test_name: "cta_modal_ab_test",
  modal_type: "live_demo" | "case_study" | "webinar_recording" | "demo_video",
  trigger_type: "high_intent" | "returning_visitor"
});
```

#### **Modal Dismissed**
```typescript
analytics.track("cta_modal_dismissed", {
  variant: "A" | "B" | "C" | "D",
  test_name: "cta_modal_ab_test"
});
```

#### **Modal Converted**
```typescript
analytics.track("cta_modal_converted", {
  variant: "A" | "B" | "C" | "D",
  test_name: "cta_modal_ab_test",
  conversion_type: "demo_booking" | "case_study_view" | "webinar_view" | "demo_video_view"
});
```

### 3. User Identification on Form Submissions ✅ **IMPLEMENTED**

#### **Variant A - Demo Booking Modal** (`CTAModalDemoBooking.tsx`)
- **Action**: Redirects to `/book-a-demo` (no form submission in modal)
- **Calendly Integration**: Calendly events captured in `DemoBookingBase.tsx`
- When user books via Calendly:
  ```typescript
  await analytics.identify(userEmail, {
    email: userEmail,
    firstName: firstName,
    lastName: lastName,
  });
  ```

#### **Variant B - Case Study Modal** (`CTAModalCaseStudy.tsx`) ✅
```typescript
// BEFORE submitting to HubSpot or any other action
await analytics.identify(data.email, {
  email: data.email,
  firstName: firstName,
  lastName: lastName,
  company: data.company,
  industry: data.industry,
  role: data.role,
});
```

#### **Variant C - Webinar Recording Modal** (`CTAModalWebinarRecording.tsx`)
- **No form required** - Direct link to webinar page
- Opens webinar in new tab with UTM tracking
- No user identification needed (ungated content)

#### **Variant D - Demo Video Modal** (`CTAModalDemoVideo.tsx`) ✅
```typescript
// BEFORE submitting to API
await analytics.identify(data.email, {
  email: data.email,
  firstName: firstName,
  lastName: lastName,
  industry: data.industry,
  role: data.role,
  lookingFor: data.lookingFor,
});
```

### 4. Calendly Integration (`DemoBookingBase.tsx`) ✅

When a user schedules a demo via Calendly:
```typescript
useCalendlyEventListener({
  onEventScheduled: async (e: any) => {
    const eventData = e?.data || e?.detail || e;
    const userEmail = eventData?.invitee?.email || eventData?.email;
    const userName = eventData?.invitee?.name || eventData?.name;

    // Identify user
    if (userEmail) {
      await analytics.identify(userEmail, {
        email: userEmail,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(" "),
      });
    }

    // Track demo booking
    trackDemoBookingComplete({ ... });
  },
});
```

### 5. Contact Form (`ContactFormWrapper.tsx`) ✅

Already implemented - identifies users on form submission:
```typescript
onFormSubmit: ($form: HTMLFormElement) => {
  const values = extractFormValues($form);
  const email = values.email;
  
  if (email) {
    analytics.identify(email, {
      email: email,
      first_name: values.firstname,
      last_name: values.lastname,
      company: values.company,
      phone: values.phone || values.mobilephone,
    });
  }
}
```

## Event Flow Examples

### Example 1: Anonymous User Converts via Case Study Modal

1. **User lands on site**
   - `_rl_anon_id` cookie created: `anon_abc123`
   - Page view tracked with `anonymousId: "anon_abc123"`

2. **Modal triggers after 30s**
   ```json
   {
     "type": "track",
     "event": "cta_modal_viewed",
     "anonymousId": "anon_abc123",
     "properties": {
       "variant": "B",
       "test_name": "cta_modal_ab_test",
       "modal_type": "case_study"
     }
   }
   ```

3. **User submits email form**
   ```json
   {
     "type": "identify",
     "anonymousId": "anon_abc123",
     "userId": "user@example.com",
     "traits": {
       "email": "user@example.com",
       "firstName": "John",
       "lastName": "Doe",
       "industry": "Healthcare",
       "role": "Operations Manager"
     }
   }
   ```

4. **Conversion tracked**
   ```json
   {
     "type": "track",
     "event": "cta_modal_converted",
     "anonymousId": "anon_abc123",
     "userId": "user@example.com",
     "properties": {
       "variant": "B",
       "conversion_type": "case_study_view"
     }
   }
   ```

### Example 2: User Books Demo via Calendly

1. **User navigates to `/book-a-demo`**
   - Page view tracked

2. **User fills Calendly widget**
   - Calendly internal tracking

3. **Calendly event fires: `calendly.event_scheduled`**
   ```json
   {
     "type": "identify",
     "anonymousId": "anon_abc123",
     "userId": "prospect@company.com",
     "traits": {
       "email": "prospect@company.com",
       "firstName": "Jane",
       "lastName": "Smith"
     }
   }
   ```

4. **Demo booking tracked**
   ```json
   {
     "type": "track",
     "event": "demo_booking_complete",
     "anonymousId": "anon_abc123",
     "userId": "prospect@company.com",
     "properties": {
       "meeting_date": "2026-06-10T15:00:00Z",
       "meeting_type": "demo",
       "duration_minutes": 30
     }
   }
   ```

## CDP Data Schema

### Track Event Schema
```typescript
{
  type: 'track',
  event: string,                    // Event name
  anonymousId?: string,             // From _rl_anon_id cookie
  userId?: string,                  // User email (after identify)
  properties: Record<string, any>,  // Event-specific properties
  context: {
    page: {
      url: string,
      path: string,
      referrer: string | null
    },
    // ... enrichment data (timezone, device, geo, etc.)
    library: {
      name: 'rosterlab-website',
      version: '1.0.0'
    }
  },
  timestamp: string                 // ISO 8601 format
}
```

### Identify Event Schema
```typescript
{
  type: 'identify',
  anonymousId?: string,             // From _rl_anon_id cookie
  userId: string,                   // User email
  traits: Record<string, any>,      // User properties
  context: {
    page: { ... },
    // ... enrichment data
    library: { ... }
  },
  timestamp: string
}
```

## Testing Checklist

### Local Development Testing

1. **Test Anonymous Tracking**
   ```bash
   # Open browser console
   # Visit homepage
   analytics.logState()
   # Should show: anonymousId, no userId
   ```

2. **Test Case Study Modal (Variant B)**
   - Open `/test-modal` page (if exists) or trigger modal naturally
   - Fill out form with test email
   - Check Network tab for:
     - POST to `/api/batch` with `type: 'identify'`
     - POST to `/api/batch` with `event: 'cta_modal_converted'`

3. **Test Demo Booking (Calendly)**
   - Visit `/book-a-demo`
   - Fill Calendly form (use test mode if available)
   - Check for identify call when event fires

4. **Test Contact Form**
   - Visit `/contact`
   - Submit form
   - Verify identify call in Network tab

### Production Verification

1. **Check CDP Dashboard**
   ```bash
   curl 'https://rosterlab-inngest.netlify.app/.netlify/functions/dashboard-popup-conversions?days=7'
   ```
   Should return conversions with email addresses

2. **Verify Event Linkage**
   - Filter events by `anonymousId`
   - Verify same `anonymousId` appears in:
     - Early page views (no `userId`)
     - Identify call (with `userId`)
     - Conversion events (with both `anonymousId` and `userId`)

3. **Test Attribution**
   - Visit site with UTM parameters: `?utm_source=test&utm_medium=cpc&utm_campaign=q2`
   - Convert via modal
   - Verify UTM data is captured in conversion event

## Environment Variables

Required in `.env.local`:
```bash
# CDP Endpoint (optional - defaults to rosterlab-inngest)
NEXT_PUBLIC_CDP_ENDPOINT=https://rosterlab-inngest.netlify.app/api/batch

# HubSpot (for CRM sync)
HUBSPOT_PRIVATE_APP_TOKEN=your_token_here
```

## Key Implementation Notes

### ⚠️ Critical Best Practices

1. **Always call `identify()` BEFORE redirects**
   ```typescript
   // ✅ CORRECT
   await analytics.identify(email, traits);
   router.push('/thank-you');

   // ❌ WRONG - identify may not complete before redirect
   analytics.identify(email, traits);
   router.push('/thank-you');
   ```

2. **Call identify on EVERY form submission**
   - Even if you think you already have their email
   - CDP uses this to confirm the link between sessions

3. **Don't skip identify for returning users**
   - Each form submission should call identify
   - Helps build complete journey history

4. **Use email as userId**
   - Consistent across all identify calls
   - Makes it easy to query CDP by user

### 🔄 Data Flow

```
Browser → analytics.track/identify
  ↓
  ├─→ window.rlTracker (RosterLab tracker)
  ├─→ window.dataLayer (Google Tag Manager)
  └─→ CDP API (rosterlab-inngest.netlify.app/api/batch)
```

### 📊 What Gets Captured

**For every conversion, we capture:**
- Who: `userId` (email) + `traits` (name, company, role, etc.)
- When: `timestamp`
- Where: `page.url`, `page.path`
- How: `utm_source`, `utm_medium`, `utm_campaign`, etc.
- What: `event` (conversion type), `variant` (A/B/C/D)
- Context: Device, geo, browser info

**This allows answering:**
- Which modal variant converts best?
- Which UTM campaigns drive the most conversions?
- What's the typical journey before conversion?
- Which industries/roles convert most?
- How long between first visit and conversion?

## Related Files

- `components/analytics/tracking.ts` - Core analytics module
- `components/analytics/RlTracker.tsx` - RosterLab tracker integration
- `components/modals/CTAModalManager.tsx` - Modal orchestration
- `components/modals/CTAModalCaseStudy.tsx` - Variant B
- `components/modals/CTAModalDemoVideo.tsx` - Variant D
- `components/modals/CTAModalDemoBooking.tsx` - Variant A
- `components/modals/CTAModalWebinarRecording.tsx` - Variant C
- `components/booking/DemoBookingBase.tsx` - Calendly integration
- `components/forms/ContactFormWrapper.tsx` - Contact form
- `lib/analytics/events/conversion-events.ts` - Conversion tracking helpers
- `lib/analytics/user-behavior-tracker.ts` - Modal trigger logic

## Support & Troubleshooting

### Common Issues

**Issue: Identify calls not showing in CDP**
- Check Network tab - is request being sent?
- Check CDP endpoint is correct
- Verify `NEXT_PUBLIC_CDP_ENDPOINT` is set (if overriding default)

**Issue: userId not linking to anonymousId**
- Ensure `_rl_anon_id` cookie exists before identify
- Check that identify is called BEFORE page redirects
- Verify both events have same `anonymousId`

**Issue: Missing UTM parameters in conversions**
- UTM parameters are captured at page load
- Ensure user has UTM params in their landing URL
- Check `getCurrentTouchData()` is working

### Debug Commands

```javascript
// In browser console:

// Check current analytics state
analytics.logState()

// Get device ID (anonymousId)
analytics.getDeviceId()

// Get user ID
analytics.getUserId()

// Get session ID
analytics.getSessionId()

// Manually trigger identify (testing)
analytics.identify('test@example.com', {
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User'
})

// Check cookies
document.cookie.split(';').filter(c => c.includes('rl_'))
```

## Future Enhancements

Potential improvements:
- [ ] Add page view tracking to CDP (currently only sent to rlTracker/GTM)
- [ ] Implement batch queuing for offline/poor network conditions
- [ ] Add retry logic for failed identify calls
- [ ] Create CDP dashboard widget for real-time conversion monitoring
- [ ] Add server-side identify for Calendly webhook (more reliable than client-side)
- [ ] Implement cross-domain tracking for `app.rosterlab.com` signup flow

---

**Last Updated:** 2026-06-05
**Implementation Status:** ✅ Complete
