import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const demoVideoGateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().min(1),
  industry: z.string().min(1),
  lookingFor: z.array(z.string()).min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = demoVideoGateSchema.parse(body);

    console.log("✅ Demo video form data validated:", {
      email: validatedData.email,
      hasName: !!validatedData.name,
      hasIndustry: !!validatedData.industry,
      hasRole: !!validatedData.role,
      lookingForCount: validatedData.lookingFor.length,
    });

    // Split name into first and last
    const nameParts = validatedData.name.trim().split(" ");
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    // Send to HubSpot Contacts API
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

    console.log("🔑 HubSpot token check (demo-video-gate):", {
      configured: !!hubspotToken,
      length: hubspotToken ? hubspotToken.length : 0,
    });

    if (hubspotToken) {
      try {
        console.log("📤 Sending to HubSpot:", {
          email: validatedData.email,
          firstname,
          lastname,
          role: validatedData.role,
          industry: validatedData.industry,
          lookingFor: validatedData.lookingFor,
        });

        const hubspotResponse = await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${hubspotToken}`,
            },
            body: JSON.stringify({
              properties: {
                email: validatedData.email,
                firstname: firstname,
                lastname: lastname,
                jobtitle: validatedData.role,
                industry: validatedData.industry,
                hs_content_membership_notes: validatedData.lookingFor.join(", "),
                hs_lead_status: "NEW",
                lifecyclestage: "lead",
                conversion_point: "Pop-up Demo Video",
              },
            }),
          }
        );

        const responseData = await hubspotResponse.json();

        if (!hubspotResponse.ok) {
          console.error("❌ HubSpot API error:", {
            status: hubspotResponse.status,
            statusText: hubspotResponse.statusText,
            error: responseData,
          });

          // If contact already exists, update and add activity
          if (hubspotResponse.status === 409) {
            console.log("⚠️ Contact already exists, updating...");

            try {
              // 1. Search for contact by email to get their ID
              const searchResponse = await fetch(
                "https://api.hubapi.com/crm/v3/objects/contacts/search",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${hubspotToken}`,
                  },
                  body: JSON.stringify({
                    filterGroups: [{
                      filters: [{
                        propertyName: "email",
                        operator: "EQ",
                        value: validatedData.email,
                      }],
                    }],
                    properties: ["conversion_point"],
                  }),
                }
              );

              const searchData = await searchResponse.json();

              if (searchData.results && searchData.results.length > 0) {
                const contactId = searchData.results[0].id;
                const existingConversionPoint = searchData.results[0].properties.conversion_point;

                console.log("📝 Found existing contact:", contactId, "with conversion_point:", existingConversionPoint);

                // 2. Update conversion_point (add to multi-select if not already present)
                const newConversionPoint = "Pop-up Demo Video";
                let updatedConversionPoint = newConversionPoint;

                if (existingConversionPoint) {
                  const existingPoints = existingConversionPoint.split(";").map((p: string) => p.trim());
                  if (!existingPoints.includes(newConversionPoint)) {
                    updatedConversionPoint = [...existingPoints, newConversionPoint].join(";");
                    console.log("➕ Adding new conversion point:", updatedConversionPoint);
                  } else {
                    console.log("✓ Conversion point already exists, skipping update");
                    updatedConversionPoint = existingConversionPoint;
                  }
                }

                // Update contact properties
                const updateResponse = await fetch(
                  `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${hubspotToken}`,
                    },
                    body: JSON.stringify({
                      properties: {
                        firstname: firstname,
                        lastname: lastname,
                        jobtitle: validatedData.role,
                        industry: validatedData.industry,
                        hs_content_membership_notes: validatedData.lookingFor.join(", "),
                        conversion_point: updatedConversionPoint,
                      },
                    }),
                  }
                );

                if (updateResponse.ok) {
                  console.log("✅ Contact updated successfully");
                }

                // 3. Create activity/note
                const noteResponse = await fetch(
                  "https://api.hubapi.com/crm/v3/objects/notes",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${hubspotToken}`,
                    },
                    body: JSON.stringify({
                      properties: {
                        hs_timestamp: new Date().getTime(),
                        hs_note_body: `Contact submitted Demo Video Modal form.\n\nDetails:\n- Industry: ${validatedData.industry}\n- Role: ${validatedData.role}\n- Looking for: ${validatedData.lookingFor.join(", ")}`,
                      },
                      associations: [{
                        to: { id: contactId },
                        types: [{
                          associationCategory: "HUBSPOT_DEFINED",
                          associationTypeId: 202, // Note to Contact
                        }],
                      }],
                    }),
                  }
                );

                if (noteResponse.ok) {
                  console.log("✅ Activity logged successfully");
                } else {
                  const noteError = await noteResponse.json();
                  console.error("❌ Failed to create note:", noteError);
                }
              }
            } catch (updateError) {
              console.error("❌ Error updating existing contact:", updateError);
            }
          }
        } else {
          console.log("✅ Successfully created contact in HubSpot:", responseData);
        }
      } catch (hubspotError) {
        console.error("❌ Error sending to HubSpot:", hubspotError);
        // Don't fail the request if HubSpot fails
      }
    } else {
      console.error("❌ CRITICAL: HubSpot access token not configured!");
      console.error("   Endpoint: /api/demo-video-gate");
      console.error("   Expected environment variable: HUBSPOT_ACCESS_TOKEN");
      console.error("   Contact will NOT be synced to HubSpot");
    }

    console.log("✅ Demo video gate form processing complete:", {
      email: validatedData.email,
      hubspotAttempted: !!hubspotToken,
    });

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        data: validatedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Demo video gate form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
