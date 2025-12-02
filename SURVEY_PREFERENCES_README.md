# Survey Preferences Mini App

A complete survey system for collecting shift preferences from staff members without requiring authentication.

## Overview

This mini app allows managers to create custom shift preference surveys, share them with team members, and view/export the collected responses through a secure admin dashboard.

## Features

- **No Authentication Required**: Create surveys instantly without login
- **Customizable Surveys**: Choose what to collect (availability, preferred shifts, time off, etc.)
- **Secure Admin Access**: Token-based admin URLs for viewing results
- **CSV Export**: Download all responses as CSV
- **Mobile Responsive**: Works on all devices
- **Analytics Tracking**: Segment integration for usage tracking

## Architecture

### Tech Stack

- **Database**: Netlify DB (Neon Postgres)
- **Backend**: Next.js API Routes
- **Frontend**: React + TypeScript
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS

### File Structure

```
/app/tools/survey-preferences/
  ├── page.tsx                              # Landing page (server component)
  ├── client.tsx                            # Survey configurator (client component)
  ├── s/[surveyId]/
  │   ├── page.tsx                          # Staff submission page (server)
  │   └── client.tsx                        # Staff form (client)
  └── admin/[surveyId]/
      ├── page.tsx                          # Admin dashboard (server)
      └── client.tsx                        # Results viewer (client)

/app/api/survey/
  ├── create/route.ts                       # POST - Create survey
  └── [surveyId]/
      ├── route.ts                          # GET - Fetch survey config
      ├── submit/route.ts                   # POST - Submit preferences
      └── results/route.ts                  # GET - Admin results

/components/survey/
  ├── SurveyConfigurator.tsx                # Create survey form
  ├── StaffPreferenceForm.tsx               # Staff submission form
  └── ResultsTable.tsx                      # Admin results display

/lib/survey/
  ├── types.ts                              # TypeScript types
  └── validation.ts                         # Zod schemas

/lib/db/
  ├── client.ts                             # Database connection
  └── schema.sql                            # Database schema
```

## Database Setup

### Initial Setup

1. Ensure Netlify DB is enabled in your Netlify project
2. Set the `DATABASE_URL` environment variable (Netlify does this automatically)
3. Run the schema initialization:

```bash
# Connect to your Netlify DB and run the schema
netlify db:connect
\i lib/db/schema.sql
```

### Database Schema

Three tables power the survey system:

1. **surveys**: Survey configurations and metadata
2. **survey_participants**: Staff who submit responses
3. **survey_responses**: Individual preference entries

See `lib/db/schema.sql` for the complete schema.

## API Endpoints

### POST /api/survey/create

Create a new survey.

**Request:**

```json
{
  "title": "January 2025 Shift Preferences",
  "org_name": "Memorial Hospital - Emergency Department",
  "shift_types": [
    {
      "id": "uuid",
      "name": "Morning Shift",
      "start_time": "06:00",
      "end_time": "14:00"
    }
  ],
  "preference_categories": ["availability", "preferred_shifts"],
  "require_email": true
}
```

**Response:**

```json
{
  "survey_id": "uuid",
  "admin_url": "https://yoursite.com/tools/survey-preferences/admin/uuid?token=admin-token",
  "staff_url": "https://yoursite.com/tools/survey-preferences/s/uuid",
  "admin_token": "uuid"
}
```

### GET /api/survey/[surveyId]

Fetch survey configuration (public endpoint).

**Response:**

```json
{
  "id": "uuid",
  "title": "Survey Title",
  "org_name": "Organization Name",
  "config": { ... },
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

### POST /api/survey/[surveyId]/submit

Submit staff preferences.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": {
    "availability": [
      { "day": "monday", "available": true },
      { "day": "tuesday", "available": false }
    ],
    "preferred_shifts": ["shift-uuid-1", "shift-uuid-2"],
    "max_hours": 40,
    "notes": "Prefer morning shifts"
  }
}
```

**Response:**

```json
{
  "success": true,
  "participant_id": "uuid",
  "message": "Preferences submitted successfully"
}
```

### GET /api/survey/[surveyId]/results?token=xxx

Fetch survey results (requires admin token).

**Response:**

```json
{
  "survey": { ... },
  "participants": [ ... ],
  "responses": [ ... ],
  "stats": {
    "total_participants": 10,
    "total_responses": 45,
    "completion_rate": 100,
    "average_preferences_per_participant": 4.5,
    "submission_dates": [ ... ]
  }
}
```

## Usage

### Creating a Survey

1. Navigate to `/tools/survey-preferences`
2. Fill in survey details:
   - Survey title
   - Organization name
   - Shift types (name, start time, end time)
   - Preference categories to collect
3. Click "Create Survey"
4. Save both the admin URL (private) and staff URL (shareable)

### Staff Submission

1. Staff open the shared staff URL
2. Enter name and email
3. Complete preference form based on survey configuration
4. Submit preferences
5. See confirmation message

### Viewing Results

1. Open the admin URL (must include token parameter)
2. View overview statistics
3. Browse participant list
4. View detailed responses by preference type
5. Export to CSV

## Security

- **Admin Token**: UUIDs stored securely, required for results access
- **No Login**: Reduces friction but means admin URLs must be kept secure
- **Input Validation**: All API endpoints use Zod schema validation
- **Duplicate Prevention**: Email-based duplicate submission blocking
- **SQL Injection Protection**: Parameterized queries via Neon client

## Analytics

Key events tracked via Segment:

- Survey Created
- Staff Preferences Submitted
- CSV Exported
- Admin Dashboard Viewed

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
# Add DATABASE_URL to .env.local

# Run development server
npm run dev

# Open http://localhost:3000/tools/survey-preferences
```

### Testing

1. Create a survey
2. Submit preferences via staff URL
3. View results via admin URL
4. Test CSV export

### Deployment

The app deploys automatically with your Next.js application to Netlify.

Make sure:

- Netlify DB is enabled
- DATABASE_URL environment variable is set
- Database schema has been initialized

## Future Enhancements

Potential Phase 2 features:

- **Optimizer Algorithm**: Auto-assign shifts based on preferences
- **PDF Export**: Generate formatted PDF reports
- **QR Codes**: Generate QR codes for easy staff link sharing
- **Access Codes**: Optional passcode protection for staff links
- **Email Notifications**: Automatic email reminders
- **Analytics Dashboard**: Visual charts and graphs
- **Multi-language Support**: Internationalization

## Troubleshooting

### Database Connection Errors

- Verify `DATABASE_URL` is set correctly
- Check Netlify DB is enabled in project settings
- Ensure schema has been run

### Form Validation Errors

- Check API route Zod schemas match frontend
- Verify all required fields are provided
- Check browser console for detailed error messages

### Admin Token Invalid

- Ensure token parameter is included in URL
- Check token hasn't been modified or truncated
- Verify survey ID and token match in database

## Support

For questions or issues:

- Check the code comments in source files
- Review TypeScript types in `/lib/survey/types.ts`
- Inspect Zod schemas in `/lib/survey/validation.ts`
