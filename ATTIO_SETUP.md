# Durable Attio website lead setup

The website stores each accepted submission in the automation service's Neon
queue before showing success. A Netlify background worker then calls the Attio
workflow. Attio owns CRM updates, tasks, and notifications.

## Attio workflow payload

The workflow receives the existing lead fields plus stable delivery fields:

```json
{
  "submissionId": "98c03be9-f878-4ca5-99f5-7c8ade16ad92",
  "environment": "production",
  "source": "contact",
  "email": "person@example.com",
  "firstName": "Person",
  "lastName": "Example",
  "name": "Person Example",
  "company": "Example Hospital",
  "phone": "+64 21 555 0100",
  "message": "We need help with rostering.",
  "detectedCountry": "NZ",
  "pageUrl": "https://rosterlab.com/contact",
  "metadata": {
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "brand"
  },
  "submittedAt": "2026-09-03T00:00:00.000Z"
}
```

## Attio workflow

No workflow changes are required for production. The existing workflow can
continue to create or update the Person, add the Website Leads entry, and send
its existing notification. The additional `submissionId` and `environment`
fields can be ignored.

If preview submissions must not notify sales, use a separate preview workflow
or add an `environment=preview` branch later.

The queue marks a submission delivered when Attio accepts the webhook with a
successful HTTP response. No callback action is required in Attio.

## Demo request workflow

Countries without live demo coverage see a request form instead of Calendly
(`components/booking/DemoRequestForm.tsx`). That form posts straight to its own
workflow — `hooks.attio.com/w/775c4edc-…/70a7ddd9-…`, overridable with
`ATTIO_DEMO_REQUEST_WEBHOOK_URL` — rather than going through the lead queue,
whose worker only knows the general lead webhook.

Payload:

```json
{
  "source": "demo-request",
  "email": "person@example.com",
  "firstName": "Person",
  "lastName": "Example",
  "name": "Person Example",
  "detectedCountry": "CN",
  "pageUrl": "https://rosterlab.com/book-a-demo",
  "metadata": {
    "industry": "Nursing & Midwifery",
    "referralSource": "Conference/Event",
    "rosterSize": "16 - 50 staff",
    "policyVersion": "2026-fy",
    "demoDecision": "request_review",
    "marketAccessReason": "below_high_income"
  },
  "attioPerson": {
    "email_addresses": ["person@example.com"],
    "name": {
      "first_name": "Person",
      "last_name": "Example",
      "full_name": "Person Example"
    },
    "industry_multi_select": ["Nursing & Midwifery"],
    "how_did_you_hear_about_us_3": ["Conference/Event"],
    "num_of_rostered_staff": "16 - 50 staff",
    "hubspot_country": "CN"
  }
}
```

The workflow creates the Person from `name` and `email` and notifies sales,
but it maps none of the answers, and a workflow's field mappings can only be
edited in the Attio UI. So the route also writes them itself, asserting the
Person on `email_addresses` with `ATTIO_API_TOKEN` (`lib/attio/person.ts`,
which also accepts `ATTIO_API_KEY`).
Without that token the request still reaches sales, but the record keeps only
its name and email. `attioPerson` in the payload carries the same values,
keyed by `api_slug`, so a workflow step can map them straight through if you
would rather Attio own the write:

| Form field                                | Attio People attribute                          |
| ----------------------------------------- | ----------------------------------------------- |
| Name                                      | `name` (Name)                                   |
| Work email                                | `email_addresses` (Email addresses)             |
| Which industry are you scheduling for?    | `industry_multi_select` (Industry)              |
| Where did you hear about us?              | `how_did_you_hear_about_us_3`                   |
| What is the size of your roster/schedule? | `num_of_rostered_staff` (Num of rostered staff) |
| Detected country                          | `hubspot_country` (HubSpot country)             |

The answer options live in `lib/market-access/demo-request.ts` and are the
exact Attio option titles. Attio silently drops a title it doesn't recognise,
so a renamed option has to be changed in both places. Note that
`how_did_you_hear_about_us_3` also carries **Outbound Calls**, which the form
deliberately does not offer, and `conversion_point` has no demo-request option,
so the website leaves that attribute alone — add one in the Attio UI if the
workflow should stamp it.

Optional answers are omitted rather than sent empty, so an unanswered question
never overwrites an attribute the CRM already knows. A failed attribute write
is logged but does not fail the submission — the request has already reached
sales by then, and asking the person to try again would only duplicate it.

## Netlify configuration

Marketing website:

```text
LEAD_DELIVERY_MODE=queue
WEBSITE_LEAD_INGEST_URL=https://your-automations-site.netlify.app/api/website-leads
WEBSITE_LEAD_INGEST_TOKEN=<production or preview token for this context>
```

Automation service:

```text
WEBSITE_LEAD_INGEST_TOKEN=<production token>
WEBSITE_LEAD_PREVIEW_TOKEN=<preview token>
WEBSITE_LEAD_WORKER_TOKEN=<worker-only token>
ATTIO_LEAD_WEBHOOK_URL=<production Attio workflow webhook>
ATTIO_LEAD_WEBHOOK_URL_PREVIEW=<preview-safe Attio workflow webhook>
POSTHOG_PROJECT_TOKEN=<PostHog project token>
POSTHOG_HOST=https://us.i.posthog.com
```

Apply `011-website-lead-queue.sql` before enabling queue mode. Keep direct mode
available for one week as rollback, then remove the direct webhook secret from
the marketing site.

## Rollout checklist

1. Apply the migration and deploy the automation service.
2. Configure its production and preview tokens, Attio webhooks, and PostHog
   project settings.
3. Set the marketing site to `LEAD_DELIVERY_MODE=queue` with its context-specific
   intake token.
4. Submit one contact form and confirm its queue row reaches `delivered` and the
   expected Attio entry and notification are created.
5. Add a PostHog workflow alert for exceptions tagged
   `subsystem=website-leads`.
   Switching `LEAD_DELIVERY_MODE` back to `direct` is the rollback.
