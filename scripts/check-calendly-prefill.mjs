// Read-only Puppeteer QA. No routing form is submitted and no meeting is booked.
// Run against a local server: pnpm exec node scripts/check-calendly-prefill.mjs
import puppeteer from "puppeteer";
import assert from "node:assert/strict";

const origin = process.env.PREFILL_TEST_ORIGIN || "http://localhost:3011";
const headless = process.env.PREFILL_TEST_HEADLESS === "true";
const launchOptions = { headless, devtools: !headless };
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

async function testPage(
  browser,
  pathname,
  restricted = false,
  partial = false,
) {
  const page = await browser.newPage();
  const errors = [];
  const attemptedWrites = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin === origin && url.pathname === "/api/market-access") {
      return request.respond({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          policyVersion: "test",
          countryCode: restricted
            ? "IN"
            : pathname.startsWith("/us")
              ? "US"
              : "NZ",
          freeSignup: restricted ? "hide" : "show",
          demo: restricted
            ? "request_review"
            : pathname.startsWith("/us")
              ? "us_24_7"
              : "nzt_business_hours",
          reasonCode: restricted ? "below_high_income" : "gni_30k",
        }),
      });
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      attemptedWrites.push({
        method: request.method(),
        url: url.origin + url.pathname,
      });
      return request.abort();
    }
    // Stub website analytics below; keep the test out of production reports.
    if (
      [
        "ops.rosterlab.com",
        "www.googletagmanager.com",
        "www.google-analytics.com",
        "connect.facebook.net",
        "www.facebook.com",
        "widget.intercom.io",
        "api-iam.intercom.io",
      ].includes(url.hostname)
    ) {
      return request.abort();
    }
    return request.continue();
  });
  await page.evaluateOnNewDocument(() => {
    window.__prefillTestEvents = [];
    window.rlTracker = {
      track: (...args) => window.__prefillTestEvents.push(args),
      page: (...args) => window.__prefillTestEvents.push(["page", ...args]),
      formStart: () => {},
      formSubmit: () => {},
      identify: () => {},
    };
    window.gtag = (...args) =>
      window.__prefillTestEvents.push(["gtag", ...args]);
    document.cookie = "_rl_anon_id=prefill-test-anonymous; path=/";
    localStorage.clear();
    sessionStorage.clear();
  });
  const query =
    "?a1=prefill%2Bqa%40example.com" +
    (partial
      ? "&a2=%20&a3="
      : "&a2=Healthcare&a3=Referral%20from%20Colleague%20%2F%20Friend") +
    "&a4=51%20-%20100%20staff&a99=Secret%20Name&name=Secret%20Name&autofill=true&utm_source=intercom&utm_medium=chat&utm_campaign=demo";
  try {
    await page.goto(origin + pathname + query, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    if (restricted) {
      await page.waitForSelector('input[name="email"]', { timeout: 30000 });
      assert.equal(await page.$('iframe[src*="calendly.com"]'), null);
    } else {
      await page.waitForSelector('iframe[src*="calendly.com"]', {
        timeout: 45000,
      });
      const iframeUrl = new URL(
        await page.$eval('iframe[src*="calendly.com"]', (iframe) => iframe.src),
      );
      assert.equal(
        iframeUrl.pathname,
        pathname.startsWith("/us") ? "/d/dv9p-szb-vt5" : "/d/cw2v-vw3-j2z",
      );
      assert.equal(iframeUrl.searchParams.get("a1"), "prefill+qa@example.com");
      assert.equal(iframeUrl.searchParams.get("a4"), "51 - 100 staff");
      assert.equal(
        iframeUrl.searchParams.get("utm_content"),
        "prefill-test-anonymous",
      );
      assert.equal(iframeUrl.searchParams.get("utm_source"), "intercom");
      assert.equal(iframeUrl.searchParams.get("autofill"), null);
      assert.equal(iframeUrl.searchParams.get("a99"), null);
      if (partial) {
        assert.equal(iframeUrl.searchParams.get("a2"), null);
        assert.equal(iframeUrl.searchParams.get("a3"), null);
      }
      const frame = await page.waitForFrame(
        (frame) => frame.url().startsWith("https://calendly.com/d/"),
        { timeout: 45000 },
      );
      assert.ok(frame, "Calendly frame must load");
      await frame
        .waitForSelector('input[type="email"]', { timeout: 15000 })
        .catch(async () => {
          // Calendly occasionally serves a transient load failure. Retry the
          // same read-only iframe once; all submission requests remain blocked.
          console.log(
            "Retrying Calendly iframe:",
            await frame.evaluate(() => document.body.innerText.slice(0, 1000)),
          );
          await frame.goto(iframeUrl.toString(), {
            waitUntil: "domcontentloaded",
            timeout: 45000,
          });
          await frame.waitForSelector('input[type="email"]', {
            timeout: 30000,
          });
        });
      await frame.waitForFunction(
        () =>
          document.querySelector('input[type="email"]').value ===
          "prefill+qa@example.com",
      );
      assert.equal(
        await frame.$eval(
          'input[type="radio"]:checked',
          (input) => input.value,
        ),
        "51 - 100 staff",
      );
      if (!partial)
        assert.ok(
          (await frame.evaluate(() => document.body.innerText)).includes(
            "Healthcare",
          ),
        );
      if (!partial)
        assert.ok(
          (await frame.evaluate(() => document.body.innerText)).includes(
            "Referral from Colleague / Friend",
          ),
        );
      assert.ok(await frame.$("form"), "Routing form remains visible");
      if (partial)
        assert.ok(
          (await frame.evaluate(() => document.body.innerText)).includes(
            "Select…",
          ),
        );
    }
    const result = await page.evaluate(() => ({
      url: window.location.href,
      events: window.__prefillTestEvents,
      dataLayer: Array.from(window.dataLayer || []).map((value) =>
        Array.from(value),
      ),
      localStorage: { ...localStorage },
      sessionStorage: { ...sessionStorage },
      history: window.history.state,
    }));
    const serialized = JSON.stringify(result);
    for (const secret of [
      "prefill+qa@example.com",
      "prefill%2Bqa",
      "Secret Name",
      "Secret%20Name",
    ])
      assert.ok(
        !serialized.includes(secret),
        `PII leaked into analytics/storage/history: ${secret}`,
      );
    assert.equal(new URL(result.url).searchParams.get("a1"), null);
    assert.equal(
      new URL(result.url).searchParams.get("utm_source"),
      "intercom",
    );
    assert.ok(result.events.some((event) => event[0] === "demo_page_viewed"));
    assert.ok(
      !errors.some((error) =>
        /ReferenceError|SyntaxError|Hydration/i.test(error),
      ),
      errors.join("\n"),
    );
    assert.ok(
      !attemptedWrites.some((write) =>
        /routing_forms|scheduled_events|invitees/.test(write.url),
      ),
      "No routing or booking submission may be attempted",
    );
    console.log(
      `PASS ${pathname} ${restricted ? "(restricted: request form only)" : `(${partial ? "partial" : "four"} prefills, visible routing form, attribution, clean analytics URLs)`}`,
    );
  } finally {
    if (!page.isClosed()) {
      await page.close().catch((error) => {
        if (!error.message.includes("No target with given id")) throw error;
      });
    }
  }
}

(async () => {
  const browser = await puppeteer.launch(launchOptions);
  try {
    await testPage(browser, "/book-a-demo");
    await testPage(browser, "/us/book-a-demo");
    await testPage(browser, "/book-a-demo", false, true);
    await testPage(browser, "/us/book-a-demo", false, true);
    await testPage(browser, "/book-a-demo", true);
    await testPage(browser, "/us/book-a-demo", true);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
