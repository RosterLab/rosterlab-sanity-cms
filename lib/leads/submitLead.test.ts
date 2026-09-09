/** @jest-environment node */

import { submitAttioLead } from "@/lib/attio/submitLead";
import { submitWebsiteLead } from "./submitLead";

jest.mock("@/lib/attio/submitLead", () => ({
  submitAttioLead: jest.fn(),
}));

const submitAttioLeadMock = jest.mocked(submitAttioLead);
const originalEnv = process.env;

describe("submitWebsiteLead", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.LEAD_DELIVERY_MODE;
    delete process.env.WEBSITE_LEAD_INGEST_URL;
    delete process.env.WEBSITE_LEAD_INGEST_TOKEN;
    submitAttioLeadMock.mockReset();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("uses direct Attio delivery unless queue mode is enabled", async () => {
    submitAttioLeadMock.mockResolvedValue({ status: "submitted" });

    await expect(
      submitWebsiteLead({ source: "contact", email: "person@example.com" }),
    ).resolves.toEqual({ status: "submitted", delivery: "direct" });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("requires queue configuration in queue mode", async () => {
    process.env.LEAD_DELIVERY_MODE = "queue";

    await expect(
      submitWebsiteLead({ source: "contact", email: "person@example.com" }),
    ).resolves.toEqual({
      status: "skipped",
      delivery: "queue",
      reason: "no_queue",
    });
  });

  it("only succeeds after the queue confirms durable acceptance", async () => {
    process.env.LEAD_DELIVERY_MODE = "queue";
    process.env.WEBSITE_LEAD_INGEST_URL =
      "https://automations.example.com/api/website-leads";
    process.env.WEBSITE_LEAD_INGEST_TOKEN = "secret";
    jest
      .mocked(global.fetch)
      .mockResolvedValue(
        new Response(JSON.stringify({ accepted: true }), { status: 202 }),
      );

    const result = await submitWebsiteLead({
      source: "contact",
      email: "person@example.com",
    });

    expect(result).toMatchObject({ status: "submitted", delivery: "queue" });
    expect(global.fetch).toHaveBeenCalledWith(
      new URL("https://automations.example.com/api/website-leads"),
      expect.objectContaining({
        method: "POST",
        cache: "no-store",
        headers: expect.objectContaining({ Authorization: "Bearer secret" }),
      }),
    );
  });

  it("rejects a non-confirming intake response", async () => {
    process.env.LEAD_DELIVERY_MODE = "queue";
    process.env.WEBSITE_LEAD_INGEST_URL =
      "https://automations.example.com/api/website-leads";
    process.env.WEBSITE_LEAD_INGEST_TOKEN = "secret";
    jest
      .mocked(global.fetch)
      .mockResolvedValue(
        new Response(JSON.stringify({ accepted: false }), { status: 202 }),
      );

    await expect(
      submitWebsiteLead({ source: "newsletter", email: "person@example.com" }),
    ).resolves.toMatchObject({ status: "error", delivery: "queue" });
  });
});
