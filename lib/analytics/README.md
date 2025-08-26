# Analytics Events Guide

This directory contains centralized analytics events for RosterLab. All conversion and tracking events are managed here for consistency and easy maintenance by multiple team members.

## Directory Structure

```
lib/analytics/
├── events/
│   ├── index.ts              # Main export file
│   ├── conversion-events.ts  # Conversion tracking events
│   └── (future event files)
└── README.md
```

## Demo Booking Conversion Tracking

### Overview

The demo booking conversion event (`demo_booking_complete_amplitude`) tracks when a user successfully books a demo through HubSpot meeting scheduler. This event is tracked in both Amplitude and Google Tag Manager (dual tracking).

### Implementation

1. **HubSpot Meeting Listener Component** (`/components/analytics/HubSpotMeetingListener.tsx`)
   - Listens for HubSpot meeting booking events
   - Automatically tracks to both Amplitude and GTM
   - Captures user information from the form

2. **Pages with Demo Booking**
   - `/book-a-demo` - Main demo booking page
   - `/staff-rostering-interactive-demo` - Interactive demo with booking option

### Event Properties

The `demo_booking_complete_amplitude` event includes:

| Property | Type | Description |
|----------|------|-------------|
| `form_guid` | string | HubSpot form identifier |
| `organizer_name` | string | Name of the meeting organizer |
| `is_meeting_paid` | boolean | Whether this is a paid meeting |
| `meeting_date` | string | Date of the scheduled meeting |
| `duration_minutes` | number | Meeting duration in minutes |
| `page_location` | string | Page where booking occurred |
| `user_email` | string | User's email (if provided) |
| `user_name` | string | User's full name |
| `company_name` | string | User's company |
| `user_role` | string | User's job title |
| `phone_number` | string | User's phone number |

### User Identification

When a demo is booked, the system:
1. Tracks the conversion event
2. Sets user properties in Amplitude
3. Identifies the user by email (if provided)

### Adding to New Pages

To add demo booking tracking to a new page with HubSpot meetings:

```tsx
import HubSpotMeetingListener from '@/components/analytics/HubSpotMeetingListener';

export default function YourPage() {
  return (
    <div>
      <HubSpotMeetingListener />
      {/* Your page content */}
    </div>
  );
}
```

## Adding New Conversion Events

To add a new conversion event:

1. Add the event name to `CONVERSION_EVENTS` in `conversion-events.ts`
2. Create a tracking function with proper TypeScript types
3. Document the event properties
4. Export from the index file

Example:
```typescript
export const trackNewConversion = (properties: NewConversionProperties) => {
  analytics.track(CONVERSION_EVENTS.NEW_CONVERSION, {
    ...properties,
    timestamp: new Date().toISOString(),
  });
};
```

## Dual Tracking (Amplitude + GTM)

All conversion events maintain dual tracking:
- Events are sent to Amplitude for product analytics
- Events are pushed to dataLayer for GTM/Google Analytics
- No changes needed to existing GTM setup

## Testing Events

In development, events are logged to console. Check browser console for:
```
Demo booking tracked: { ... event details ... }
```

## Questions?

For questions about analytics implementation, contact the development team or check the Amplitude dashboard for event details.