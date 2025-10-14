# How to Check Calendly Iframe URL in DevTools

## Method 1: Network Tab (Recommended)

1. **Open DevTools**
   - Mac: `Cmd + Option + I`
   - Windows: `F12` or `Ctrl + Shift + I`

2. **Go to Network Tab**
   - Click the "Network" tab at the top of DevTools

3. **Clear existing requests** (optional)
   - Click the 🚫 clear button to start fresh

4. **Navigate to /book-a-demo page**
   - The page will load and requests will appear

5. **Filter for Calendly**
   - In the filter box, type: `calendly`
   - This shows only Calendly-related requests

6. **Look for the iframe request**
   - Find a request that looks like: `d/cw2v-vw3-j2z` or similar
   - Or look for requests to `calendly.com` domain

7. **Click on the request**
   - In the right panel, you'll see request details

8. **Check the URL**
   - Look at the "Request URL" field
   - It should contain UTM parameters like:
     ```
     https://calendly.com/d/cw2v-vw3-j2z?
     hide_gdpr_banner=1&
     utm_source=google&
     utm_medium=cpc&
     utm_campaign=demo&
     session_id=xxxxx
     ```

## Method 2: Elements/Inspector Tab

1. **Open DevTools**
   - Mac: `Cmd + Option + I`
   - Windows: `F12` or `Ctrl + Shift + I`

2. **Go to Elements/Inspector Tab**
   - Should be the first tab (default)

3. **Find the iframe**
   - Use the element selector tool (top-left of DevTools):
     - Mac: `Cmd + Shift + C`
     - Windows: `Ctrl + Shift + C`
   - Click on the Calendly widget on the page
   - OR press `Cmd/Ctrl + F` and search for: `iframe`

4. **Look at the iframe attributes**
   - Find the `<iframe>` element in the DOM
   - Look for the `src` attribute
   - It should look like:
     ```html
     <iframe
       src="https://calendly.com/d/cw2v-vw3-j2z?hide_gdpr_banner=1&utm_source=google&utm_medium=cpc&..."
       ...
     ></iframe>
     ```

5. **Copy the URL**
   - Right-click on the `src` attribute value
   - Select "Copy attribute value"
   - Paste into a text editor to see the full URL with all parameters

## Method 3: Console Tab (Quickest)

1. **Open DevTools Console**
   - Mac: `Cmd + Option + J`
   - Windows: `Ctrl + Shift + J`

2. **Run this command**:

   ```javascript
   document.querySelector('iframe[src*="calendly"]')?.src;
   ```

3. **Press Enter**
   - The full iframe URL will be printed
   - Should show all UTM parameters

4. **For easier reading**, run:
   ```javascript
   console.log(
     new URL(
       document.querySelector('iframe[src*="calendly"]').src,
     ).searchParams.toString(),
   );
   ```

   - This shows just the query parameters

## What to Look For

✅ **Good** - UTM parameters are present:

```
utm_source=google
utm_medium=cpc
utm_campaign=demo
session_id=1234567890-abc123def
```

❌ **Bad** - No UTM parameters or only defaults:

```
hide_gdpr_banner=1
embed_domain=localhost
embed_type=Inline
```

## Screenshot Guide

### Network Tab View:

```
┌─────────────────────────────────────────────┐
│ Network                                     │
├─────────────────────────────────────────────┤
│ Filter: calendly                       🔍   │
├──────────┬──────────┬────────┬─────────────┤
│ Name     │ Status   │ Type   │ Size        │
├──────────┼──────────┼────────┼─────────────┤
│ cw2v-... │ 200      │ doc    │ 45.2 KB     │ ← Click this
│ widget.js│ 200      │ script │ 123 KB      │
└──────────┴──────────┴────────┴─────────────┘

Headers tab on right →
  Request URL: https://calendly.com/d/cw2v-vw3-j2z?
               utm_source=google&utm_medium=cpc...
```

### Elements Tab View:

```html
<div class="calendly-inline-widget">
  <iframe
    src="https://calendly.com/d/cw2v-vw3-j2z?
         hide_gdpr_banner=1&
         utm_source=google&          ← Look for these!
         utm_medium=cpc&
         utm_campaign=demo&
         session_id=xxxxx"
    width="100%"
    height="700px"
  >
  </iframe>
</div>
```

## Troubleshooting

### Can't find the iframe

- Make sure the Calendly widget has fully loaded
- Look for a loading spinner - wait for it to disappear
- Try refreshing the page with DevTools already open

### iframe src is empty or about:blank

- The widget hasn't loaded yet
- Wait a few seconds and check again
- Check console for any JavaScript errors

### UTM parameters are missing

- Clear your browser cookies
- Visit the site with UTM parameters in the URL:
  `http://localhost:3000/?utm_source=test&utm_medium=test`
- Navigate to `/book-a-demo`
- Check again

### iframe is nested (inside another iframe)

- Click through the iframe layers in Elements tab
- Look for `<iframe>` inside `<iframe>`
- The Calendly URL should be on the innermost iframe
