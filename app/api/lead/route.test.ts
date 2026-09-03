/** @jest-environment node */

import { NextRequest } from "next/server";
import { submitWebsiteLead } from "@/lib/leads/submitLead";
import { POST } from "./route";

jest.mock("@/lib/leads/submitLead", () => ({
  submitWebsiteLead: jest.fn(),
}));

const submitWebsiteLeadMock = jest.mocked(submitWebsiteLead);

function leadRequest(body: Record<string, unknown>) {
  return new NextRequest("http://localhost/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "person@example.com", ...body }),
  });
}

describe("lead API", () => {
  beforeEach(() => {
    submitWebsiteLeadMock.mockReset();
  });

  test.each(["newsletter", "ai-assistant-waitlist"] as const)(
    "fails closed when a %s lead cannot reach Attio",
    async (source) => {
      submitWebsiteLeadMock.mockResolvedValue({
        status: "error",
        delivery: "queue",
        detail: "Attio webhook returned 500",
      });

      const response = await POST(leadRequest({ source }));

      expect(response.status).toBe(502);
      expect(await response.json()).toMatchObject({ delivery: "error" });
      expect(response.headers.get("cache-control")).toBe("no-store");
    },
  );

  test("returns unavailable when a required lead webhook is not configured", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "skipped",
      delivery: "queue",
      reason: "no_queue",
    });

    const response = await POST(leadRequest({ source: "newsletter" }));

    expect(response.status).toBe(503);
  });

  test("keeps promised download gates fail-open", async () => {
    submitWebsiteLeadMock.mockResolvedValue({
      status: "error",
      delivery: "queue",
      detail: "Attio webhook returned 500",
    });

    const response = await POST(leadRequest({ source: "template-excel" }));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ delivery: "error" });
  });

  test("returns fake success for a populated honeypot without calling Attio", async () => {
    const response = await POST(
      leadRequest({ source: "newsletter", website: "spam.example" }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ delivery: "filtered" });
    expect(submitWebsiteLeadMock).not.toHaveBeenCalled();
  });
});
