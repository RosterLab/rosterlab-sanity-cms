# UTM Tracking for Calendly & GA4

## Problem

When users book a demo via Calendly, the channel attribution in GA4 shows as "direct" or "(none)" instead of showing the actual traffic source (organic, paid, social, etc.).

## Solution

Pass UTM parameters from the landing page URL to the Calendly embed URL. When Calendly sends events to GA4, it will include these UTM parameters for proper attribution.

## How It Works

### 1. UTM Tracking System

- `lib/analytics/utm-tracker.ts` captures UTM parameters when users land on your site
- Stores first-touch and current-touch attribution data
- Handles intelligent fallbacks (click IDs, organic search, referrals)
- Persists data in cookies and localStorage

### 2. Calendly Widget Integration

- `lib/hooks/useCalendlyWidget.ts` retrieves current UTM parameters
- Appends them to the Calendly embed URL
- Calendly receives these parameters when loading the widget

### 3. GA4 Attribution

- When user books a meeting, Calendly fires GA4 events
- UTM parameters are included in the event data
- GA4 properly attributes the booking to the correct channel

## Testing Instructions

### Test 1: Paid Traffic (Google Ads)

1. Visit your site with UTM parameters:

   ```
   https://rosterlab.com/?utm_source=google&utm_medium=cpc&utm_campaign=demo
   ```

2. Navigate to `/book-a-demo`

3. Open browser DevTools → Network tab

4. Look for Calendly iframe URL - it should include:

   ```
   utm_source=google
   utm_medium=cpc
   utm_campaign=demo
   ```

5. Book a test meeting

6. Check GA4 → Reports → Acquisition → Traffic acquisition
   - Should show source/medium as `google / cpc`

### Test 2: Organic Search

1. Clear cookies and close browser

2. In Google, search for "rosterlab" and click your site

3. Navigate to `/book-a-demo`

4. Check Calendly iframe URL - should include:

   ```
   utm_source=google
   utm_medium=organic
   ```

5. Book a test meeting

6. Check GA4 - should show `google / organic`

### Test 3: Direct Traffic

1. Clear cookies and close browser

2. Type `rosterlab.com/book-a-demo` directly in address bar

3. Check Calendly iframe URL - should include:

   ```
   utm_source=direct
   utm_medium=none
   ```

4. Book a test meeting

5. Check GA4 - should show `direct / none`

### Test 4: Social Traffic

1. Add UTM parameters for social:

   ```
   https://rosterlab.com/?utm_source=linkedin&utm_medium=social&utm_campaign=post
   ```

2. Navigate to `/book-a-demo`

3. Book meeting and verify in GA4: `linkedin / social`

## Verification in GA4

### Real-time Reports

1. Go to GA4 → Reports → Realtime
2. Book a test meeting
3. Look for `calendly_meeting_scheduled` event
4. Check event parameters for UTM values

### Traffic Acquisition

1. Go to GA4 → Reports → Acquisition → Traffic acquisition
2. Change date range to include your test
3. Look for your booking under the correct source/medium

### Exploration Report (Advanced)

1. Go to GA4 → Explore
2. Create new exploration
3. Add dimensions: `Session source`, `Session medium`, `Session campaign`
4. Add metric: `Conversions` (or event count for `calendly_meeting_scheduled`)
5. Verify bookings are attributed correctly

## Debug Mode

Enable debug mode to see UTM tracking in console:

```typescript
// In app/layout.tsx, UTMTracker component already has debug mode
<UTMTracker debug={process.env.NODE_ENV === "development"} />
```

This will log:

- UTM parameters detected on each page
- First-touch attribution
- Current-touch attribution
- Session information

## Common Issues

### Issue: Still seeing "direct / none" for paid traffic

**Cause**: UTM parameters not being passed to Calendly
**Fix**: Check DevTools → Network → Find Calendly iframe → Verify URL has UTM params

### Issue: UTM parameters present but not in GA4

**Cause**: Calendly's GA4 integration not configured
**Fix**: Go to Calendly → Integrations → Google Analytics 4 → Verify connection

### Issue: Wrong attribution (e.g., showing old source)

**Cause**: Cookie/localStorage has old data
**Fix**: Clear cookies and test in incognito mode

## Additional Configuration

### For Click IDs (gclid, fbclid, etc.)

Your UTM tracker already handles click IDs automatically:

- `gclid` → `google / cpc`
- `fbclid` → `facebook / paid-social`
- `ttclid` → `tiktok / paid-social`

No additional configuration needed!

### For Cross-Domain Tracking

If you need to track users across multiple domains, update:

```typescript
// In lib/analytics/utm-tracker.ts
const COOKIE_CONFIG = {
  domain: ".rosterlab.com", // Already configured for subdomains
  // ...
};
```

## Files Modified

- ✅ `lib/hooks/useCalendlyWidget.ts` - Added UTM parameter passing to Calendly URL
- ✅ `lib/analytics/utm-tracker.ts` - Existing UTM tracking (no changes needed)
- ✅ `components/analytics/UTMTracker.tsx` - Existing component (no changes needed)

## Next Steps

1. Deploy to staging environment
2. Test with real UTM parameters from your ad campaigns
3. Monitor GA4 for proper attribution over 7 days
4. Verify conversion tracking is working correctly
