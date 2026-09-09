/** @jest-environment node */

import { submitAttioLead } from "./submitLead";

const originalWebhook = process.env.ATTIO_LEAD_WEBHOOK_URL;

afterEach(() => {
  jest.restoreAllMocks();
  if (originalWebhook === undefined) {
    delete process.env.ATTIO_LEAD_WEBHOOK_URL;
  } else {
    process.env.ATTIO_LEAD_WEBHOOK_URL = originalWebhook;
  }
});

describe("submitAttioLead", () => {
  test("returns skipped without exposing or inventing a webhook", async () => {
    delete process.env.ATTIO_LEAD_WEBHOOK_URL;
    const fetchSpy = jest.spyOn(global, "fetch");

    await expect(
      submitAttioLead({ source: "newsletter", email: "person@example.com" }),
    ).resolves.toEqual({ status: "skipped", reason: "no_webhook" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("posts the normalized submission to the configured webhook", async () => {
    process.env.ATTIO_LEAD_WEBHOOK_URL =
      "https://example.attio.test/webhook/intake";
    const fetchSpy = jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 204 }));

    await expect(
      submitAttioLead({
        source: "contact",
        email: "person@example.com",
        company: "Example Health",
      }),
    ).resolves.toEqual({ status: "submitted" });

    expect(fetchSpy).toHaveBeenCalledWith(
      new URL("https://example.attio.test/webhook/intake"),
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const request = fetchSpy.mock.calls[0][1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      source: "contact",
      email: "person@example.com",
      company: "Example Health",
    });
  });

  test("surfaces non-success responses without throwing", async () => {
    process.env.ATTIO_LEAD_WEBHOOK_URL =
      "https://example.attio.test/webhook/intake";
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("nope", { status: 500 }));

    await expect(
      submitAttioLead({ source: "contact", email: "person@example.com" }),
    ).resolves.toEqual({
      status: "error",
      detail: "Attio webhook returned 500",
    });
  });
});
