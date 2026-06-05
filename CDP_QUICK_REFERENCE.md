# CDP Tracking - Quick Reference

## ✅ What Was Implemented

### 1. Enhanced `analytics.identify()` to send to CDP
- **Location:** `components/analytics/tracking.ts`
- **What it does:** Now sends identify events to CDP in addition to rlTracker
- **Format:** Sends Segment-compatible identify events to `/api/batch`

### 2. Added User Identification to Modals

| Modal Variant | Component | Status |
|--------------|-----------|--------|
| A - Demo Booking | `CTAModalDemoBooking.tsx` | ✅ Via Calendly |
| B - Case Study | `CTAModalCaseStudy.tsx` | ✅ On form submit |
| C - Webinar | `CTAModalWebinarRecording.tsx` | N/A (ungated) |
| D - Demo Video | `CTAModalDemoVideo.tsx` | ✅ On form submit |

### 3. Enhanced Calendly Integration
- **Location:** `components/booking/DemoBookingBase.tsx`
- **What it does:** Captures user email when they book via Calendly
- **Identifies user:** Yes, with email, firstName, lastName

## 🔑 Key Code Patterns

### Pattern 1: Identify Before Submit
```typescript
// ALWAYS call identify FIRST, then track conversion
await analytics.identify(data.email, {
  email: data.email,
  firstName: firstName,
  lastName: lastName,
  // ... other traits
});

analytics.track("cta_modal_converted", { ... });
```

### Pattern 2: Identify on Calendly Event
```typescript
useCalendlyEventListener({
  onEventScheduled: async (e: any) => {
    const userEmail = e?.data?.invitee?.email;
    
    if (userEmail) {
      await analytics.identify(userEmail, {
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
      });
    }
    
    trackDemoBookingComplete({ ... });
  },
});
```

## 📊 Events Being Tracked

### Modal Events (Automatic)
- `cta_modal_viewed` - When modal appears
- `cta_modal_dismissed` - When user closes modal
- `cta_modal_converted` - When user clicks CTA

### Conversion Events (With Identification)
- `cta_modal_form_submitted` - Form submitted (B, D)
- `cta_modal_converted` - Conversion confirmed
- `demo_booking_complete` - Calendly booking confirmed

### Identify Events (NEW ✨)
- `type: 'identify'` - Sent to CDP when:
  - Case study form submitted (Variant B)
  - Demo video form submitted (Variant D)
  - Calendly demo booked (Variant A)
  - Contact form submitted

## 🧪 Testing

### Quick Test
1. Visit: `http://localhost:3000/test-cdp-tracking`
2. Open DevTools → Network tab → Filter "batch"
3. Click "Test Identify" with an email
4. Check Network tab for POST to `/api/batch` with `type: 'identify'`

### Test Modal Flow
1. Visit any page and wait for modal to appear (or use `/test-modal`)
2. Fill out the form
3. Check Network tab for:
   - POST `/api/batch` with `type: 'identify'` (has userId + traits)
   - POST `/api/batch` with `type: 'track'` event: `cta_modal_converted`

### Test Calendly Flow
1. Visit `/book-a-demo`
2. Fill out Calendly form
3. Submit booking
4. Check Network for identify call with Calendly email

## 🐛 Debug Commands

```javascript
// In browser console:
analytics.logState()              // Show current state
analytics.getDeviceId()           // Get anonymousId
analytics.getUserId()             // Get userId (after identify)
analytics.identify('test@example.com', { email: 'test@example.com' })
```

## 📝 Data Captured

Every conversion now includes:
- **Who**: Email, name, company, role, industry
- **When**: Timestamp
- **Where**: Page URL, path
- **How**: UTM source, medium, campaign, content
- **What**: Event type, variant, conversion type
- **Device**: Browser, device type, screen size
- **Geo**: Country, city, region (when available)

## 🔗 CDP Endpoints

- **Production**: `https://rosterlab-inngest.netlify.app/api/batch`
- **Event types**: `track`, `identify`, `page`
- **Format**: Segment-compatible JSON

## ⚠️ Critical Notes

1. **Always await identify()** before redirects or you'll lose the call
2. **Call identify on EVERY form submission** even for returning users
3. **Use email as userId** for consistency
4. **Test in production** - Network tab should show successful POSTs

## 📂 Modified Files

| File | Changes |
|------|---------|
| `components/analytics/tracking.ts` | Enhanced `identify()` to send to CDP |
| `components/modals/CTAModalCaseStudy.tsx` | Added identify on form submit |
| `components/modals/CTAModalDemoVideo.tsx` | Added identify on form submit |
| `components/booking/DemoBookingBase.tsx` | Added identify on Calendly event |

## ✨ Benefits

- **Complete funnel tracking**: Link anonymous sessions to known users
- **Attribution**: See which UTM campaigns drive conversions
- **Journey analysis**: Track user path from first visit to conversion
- **Segmentation**: Filter by industry, role, company size
- **Variant analysis**: Compare A/B/C/D modal performance

---

**Need Help?** Check `CDP_TRACKING_SETUP.md` for detailed implementation docs.
