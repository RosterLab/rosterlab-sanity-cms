/**
 * Microsoft Teams Webhook Notifications
 * Simple utility to send notifications to Teams channels
 */

interface TeamsNotificationData {
  survey_id: string;
  title: string;
  org_name: string;
  holiday_count: number;
  admin_url: string;
  created_at: string;
}

/**
 * Send a notification to Teams when a new survey is created
 * Uses Microsoft Teams Incoming Webhook
 *
 * Setup instructions:
 * 1. In Teams, go to your desired channel
 * 2. Click the 3 dots → Connectors → Incoming Webhook
 * 3. Name it "Survey Notifications" and copy the webhook URL
 * 4. Add TEAMS_WEBHOOK_URL=<your-url> to .env.local
 */
export async function notifyTeamsSurveyCreated(
  data: TeamsNotificationData,
): Promise<void> {
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

  // Skip if webhook is not configured
  if (!webhookUrl) {
    console.log("Teams webhook not configured, skipping notification");
    return;
  }

  try {
    // Format the timestamp
    const timestamp = new Date(data.created_at).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Create Teams message card
    // Using MessageCard format (adaptive cards require more setup)
    const messageCard = {
      "@type": "MessageCard",
      "@context": "https://schema.org/extensions",
      summary: "New Holiday Survey Created",
      themeColor: "0078D4",
      title: "🎉 New Holiday Survey Created",
      sections: [
        {
          facts: [
            {
              name: "Survey:",
              value: data.title,
            },
            {
              name: "Organization:",
              value: data.org_name,
            },
            {
              name: "Holidays:",
              value: data.holiday_count.toString(),
            },
            {
              name: "Created:",
              value: timestamp,
            },
          ],
        },
      ],
      potentialAction: [
        {
          "@type": "OpenUri",
          name: "View Admin Dashboard",
          targets: [
            {
              os: "default",
              uri: data.admin_url,
            },
          ],
        },
      ],
    };

    // Send to Teams (fire and forget, non-blocking)
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageCard),
    });

    if (!response.ok) {
      console.error(
        `Teams notification failed: ${response.status} ${response.statusText}`,
      );
    } else {
      console.log("Teams notification sent successfully");
    }
  } catch (error) {
    // Log error but don't throw - notifications shouldn't break the main flow
    console.error("Error sending Teams notification:", error);
  }
}
