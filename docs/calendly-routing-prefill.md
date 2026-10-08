# Intercom → demo page → Calendly routing prefills

Implemented for `/book-a-demo` and `/us/book-a-demo`. Only `a1`, `a2`, `a3` and `a4` are forwarded from incoming links. Empty or whitespace-only answers are omitted; missing fields stay editable. Values are decoded once with `URLSearchParams` and encoded once when building the Calendly URL. Existing Calendly base settings, first-touch attribution, anonymous-ID `utm_content`, regional URL selection, market-access gating and confirmation paths are preserved. `autofill` is removed, including from configured base URLs, so the routing form stays visible.

## Verified regional mappings — 7 October 2026

Read-only Puppeteer inspection of both public forms and their public GET configuration responses verified the following mappings. Browser checks confirmed email, both dropdown selections, and the size radio selection without clicking Next.

| Website page      | Default Calendly routing form                       | Form name              |
| ----------------- | --------------------------------------------------- | ---------------------- |
| `/book-a-demo`    | [cw2v-vw3-j2z](https://calendly.com/d/cw2v-vw3-j2z) | Book a demo routing    |
| `/us/book-a-demo` | [dv9p-szb-vt5](https://calendly.com/d/dv9p-szb-vt5) | Book a demo routing US |

| Parameter | Global question                                      | US question                                          | Accepted answer                                                    |
| --------- | ---------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------ |
| `a1`      | Email (required)                                     | Email (required)                                     | Visitor's email address                                            |
| `a2`      | Which industry are you rostering for? (required)     | Which industry are you scheduling for? (required)    | `Healthcare` or `Non-healthcare`                                   |
| `a3`      | Where did you hear about us? (optional)              | Where did you hear about us? (optional)              | Exact source choice below                                          |
| `a4`      | What is the size of your roster/schedule? (required) | What is the size of your roster/schedule? (required) | `1 - 15 staff`, `16 - 50 staff`, `51 - 100 staff`, or `100+ staff` |

Both forms have these exact `a3` choices, in order:

1. `Search (Google/Bing etc)`
2. `Referral from Colleague / Friend`
3. `Gen AI (ChatGPT/Claude/Perplexity etc)`
4. `Webinars`
5. `Conference/Event`
6. `Online Article / Blog`
7. `Social media`
8. `Ads`
9. `Mini Tools`
10. `Outbound Campaigns`
11. `Health X`
12. `News / Press`
13. `Other`

There is no name question on either routing form. Do not use `a1` for a name or pass booking-only `name`/`email` aliases. Routing `a1` is email. The website strips unsupported answer numbers and booking aliases from its URL and does not forward them. Dropdown/radio values are case sensitive and must retain the exact punctuation and spacing.

These mappings cover the two default routing forms. `/book-a-demo` can select `NEXT_PUBLIC_CALENDLY_STANDARD_URL` or `NEXT_PUBLIC_CALENDLY_US_24_7_URL` according to market access. The checked local environment has neither override. If production uses a different form, verify that form separately before sending these mapped links. Restricted or unresolved markets still see the demo-request form; these parameters do not bypass the gate or prefill that separate form.

## Intercom setup (instructions only; no live workflow changed)

1. Open a draft copy of the existing booking workflow. Check which person or conversation attributes its Collect data steps already save. Reuse the collected email, industry, referral source and size where available; collecting all four is unnecessary.
2. Map choices to the verified Calendly strings above. For example, an existing Intercom choice for healthcare must produce `Healthcare`, not a lower-case value or a specific healthcare speciality. Keep the visitor's original referral source; `utm_source=intercom` describes this link's channel and should not replace their `a3` answer. Do not invent a numeric-size boundary from overlapping labels such as `51 - 100 staff` and `100+ staff`; align the workflow's choice categories deliberately.
3. In the link/message editor, use the attribute picker to insert the actual collected attributes after `a1=`, `a2=`, etc. Use the global or US website path for that workflow branch. Use an empty fallback for missing attributes or omit those parameters. Do not use fallback words such as `unknown` as Calendly answers.
4. Add non-personal tracking values such as `utm_source=intercom&utm_medium=chat&utm_campaign=demo_booking`. Existing first-touch attribution still takes priority in the widget; the current Intercom link does not overwrite an earlier acquisition source. The embed's `utm_content` stays the anonymous visitor ID.
5. Intercom documents automatic encoding for attributes inserted into links. Insert raw attribute values using its picker; do not pre-encode them as well. Preview the resulting link with an email containing `+` and a source containing `/`, spaces or parentheses. Its decoded values must exactly match the answers. An email plus sign must arrive as `%2B`, not a raw `+` (which query parsing treats as a space). If a particular editor does not encode a value correctly, use a correctly generated URL; do not add a second decoding pass on the website.
6. Preview the workflow using test attributes and open its link. Confirm that only known answers are filled, other questions are editable, the routing form is visible, and no `autofill=true` appears in the iframe URL. Stop before Next on a production form. Publishing this workflow is a separate action after the website change is released.

Intercom attribute names and template syntax are **not verified against the live workflow**. The following is a schematic showing insertion points, not a literal template to paste:

```text
https://rosterlab.com/book-a-demo?a1=[Email attribute]&a2=[Calendly industry attribute]&a3=[Calendly referral-source attribute]&a4=[Calendly size attribute]&utm_source=intercom&utm_medium=chat&utm_campaign=demo_booking
```

No change in RosterLab-inngest is needed for this basic link-based flow.

## Example links using verified mappings

These are correctly encoded browser examples using a fictitious email. They become functional website links after this code is released. They are not pre-encoded templates to paste into an Intercom editor that automatically encodes URLs.

Global, email + industry + size (referral source left blank):

```text
https://rosterlab.com/book-a-demo?a1=alex%2Bdemo%40example.com&a2=Healthcare&a4=51%20-%20100%20staff&utm_source=intercom&utm_medium=chat&utm_campaign=demo_booking
```

US, all four routing answers:

```text
https://rosterlab.com/us/book-a-demo?a1=alex%2Bdemo%40example.com&a2=Non-healthcare&a3=Referral%20from%20Colleague%20%2F%20Friend&a4=100%2B%20staff&utm_source=intercom&utm_medium=chat&utm_campaign=demo_booking
```

Partial, industry only (no personal data in the link):

```text
https://rosterlab.com/book-a-demo?a2=Healthcare&utm_source=intercom&utm_medium=chat
```

## Final booking form: still requires verification

The public routing-form GET responses expose questions and options but do not expose destination event types or routing rules. The final booking forms could not be reached through this flow without submitting a production routing form, so no production routing submissions or bookings were made. **Carry-through of email, industry, source and size to each destination event is unverified. No remaining repeated question has been confirmed or ruled out.** This change guarantees prefilling of the routing step only.

Event booking forms use `name`/`email` for invitee details and their own `a1`, `a2`, etc. for custom questions. Those numbers are independent of the routing form. Do not reuse this routing mapping for event booking questions or promise that it removes every repeated question.

To finish the audit without recording production routing responses, an account owner can use Calendly's **Preview form** mode (documented as not recording routing responses), or a separate test form/event. For each healthcare/non-healthcare and size route in both regions:

1. Inspect the destination event's Invitee form settings and record its custom-question order and exact options.
2. In preview, provide an example email and choices, route to the event, choose a date/time if needed, and inspect the final invitee form. Stop before Schedule Event.
3. Record whether email carries through, whether industry/source/size are absent, prefilled, or repeated with empty fields, and any other details already collected by Intercom (such as name) that are requested again.
4. Resolve any duplicated event questions in a separate reviewed Calendly change or explicit event-specific mapping. Do not guess numbering or remove questions in this website patch.

## Analytics and URL privacy

Before this change, `demo_page_viewed.page_url`, analytics-wrapper `current_page_url` and `context.page.url`, and rlTracker page calls collected the full incoming URL. GA4, Meta and Intercom can also read the address bar automatically. Merely excluding answers from the custom event payload would leave email/name values in collected URLs.

The synchronous head script captures allowed answers in page memory and removes answer parameters, `autofill`, and booking-only aliases from the address bar before analytics initialization. Client instrumentation installs the same idempotent guard before PostHog starts. History navigation is sanitized before browser pageview observers run. The middleware internally rewrites only the render query, preserving attribution and geo headers while keeping personal answers out of Next's Flight/navigation tree; the initial browser URL stays available for capture. Query values are not written to cookies, localStorage or sessionStorage. Leaving the page clears the captured answers; refreshing the cleaned URL does not restore them. Reopen the personalized link to prefill again.

The analytics wrapper and referrer/UTM handling also redact demo-prefill URLs. The Calendly container is blocked from PostHog replay capture, and existing replay network URL redaction removes queries. Browser QA inspects website event payloads, GA queue, storage and history state for the fictitious email/name and checks that tracking parameters remain.

Calendly necessarily receives the answers in its iframe URL. A separate read-only check with outbound analytics requests blocked observed Calendly's GA queue setting `page_location` and `page_referrer` to `https://calendly.com/d/cw2v-vw3-j2z` without a query, and its routing-page diagnostic event used `url_hashed`. This observation does not claim that every third-party diagnostic is redacted. Personalized links also still reach the initial website request and can appear in server/CDN logs or in the Intercom conversation containing them; this patch protects tracked website page URLs, not every system that handles the link. Never put personal data in UTM fields.

## Checks

```sh
pnpm test --runInBand
pnpm dev --port 3011
# In another terminal, using the repository's Puppeteer browser preference:
pnpm exec node scripts/check-calendly-prefill.mjs
```

The QA script uses a visible browser with DevTools, stubs website analytics and market access, and blocks every non-GET/HEAD/OPTIONS request. It checks full and partial prefills on both pages, anonymous-ID attribution, visible review forms, empty/unsupported parameters, clean events/storage/history, and request-only behavior on both restricted-market pages. It never clicks Next or Schedule Event. If Puppeteer's cached browser is unavailable, set `PUPPETEER_EXECUTABLE_PATH` to an installed Chrome executable.

Validation rechecked on 8 October 2026 against current `main`: all 288 tests across 33 suites passed, and all six Puppeteer cases passed. Visible-browser inspections were followed by a successful full run with `PREFILL_TEST_HEADLESS=true`. Lint passed with one existing unused-import warning in `components/analytics/tracking.ts`; the diff whitespace check passed.

Focused unit tests cover merging existing base queries/hashes, encoding, omitted blanks, explicit answer keys, `autofill` removal, early capture, SPA navigation, referrer redaction, clean server render queries, geo/header preservation and canonical redirects.

The standard TypeScript check is currently blocked by incomplete installed type packages (`follow-redirects`, `pg`, `stylis`). With explicit existing application type libraries selected, the remaining errors are in unchanged files: duplicate JSX attributes in `roster-mockup/scene.jsx`, a `mainImage` type assertion in `lib/localization/__tests__/us-blog.test.ts`, decision typing in `lib/market-access/policy.ts`, and the missing `@google-analytics/data` dependency/types in `scripts/fetch-ga4-blog-data.ts`. No dependency or unrelated code changes were made to work around them.

## Sources checked

- [Calendly routing prefill documentation](https://calendly.com/help/how-to-pre-populate-invitee-answers-in-routing-forms): ordered answer keys, exact case-sensitive text and the auto-submitting `autofill` flag.
- [Calendly booking prefill documentation](https://calendly.com/help/how-to-pre-fill-invitee-information-in-your-calendly-link): separate invitee-detail and custom-question parameters.
- [Calendly create/preview routing forms](https://calendly.com/help/how-to-create-a-routing-form): preview submissions do not record responses.
- [Intercom message variables](https://www.intercom.com/help/en/articles/248-personalizing-messages-using-variables) and [composer encoding](https://www.intercom.com/help/en/articles/319-composing-an-outbound-message): attributes in links and automatic encoding.
- [Intercom workflow builder](https://www.intercom.com/help/en/articles/6611595-using-the-workflows-builder): collected data attributes, message insertion and private preview.
