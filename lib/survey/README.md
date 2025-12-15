# Holiday Shift Balancing System

A simple, self-contained tool for collecting staff holiday preferences and automatically balancing assignments fairly.

## Overview

This system allows managers to:

1. Create a survey listing public holidays and staffing requirements
2. Share a link with staff to collect their preferences
3. View all responses in an admin dashboard
4. Run a balancing algorithm to automatically assign staff fairly

## Architecture

### Core Files

- **`types.ts`** - TypeScript type definitions for the entire system
- **`validation.ts`** - Zod schemas for API request/response validation
- **`balancer.ts`** - Holiday shift balancing algorithm
- **`balancer.test.ts`** - 16 unit tests for balancing logic (100% pass rate)
- **`validation.test.ts`** - 27 unit tests for validation schemas (100% pass rate)

### API Routes

- `POST /api/survey/create` - Create a new survey
- `GET /api/survey/[surveyId]` - Get survey details
- `POST /api/survey/[surveyId]/submit` - Submit staff preferences
- `GET /api/survey/[surveyId]/results?token=...` - Get survey results (admin only)
- `POST /api/survey/[surveyId]/balance?token=...` - Run balancing algorithm (admin only)

### Frontend Components

- **`HolidayConfigurator.tsx`** - Form for managers to create surveys
- **`HolidayRankingForm.tsx`** - Form for staff to rank holiday preferences
- **`ResultsTable.tsx`** - Admin dashboard with three tabs:
  - Overview: Participant list and stats
  - Detailed Responses: All preference submissions
  - Assignments: Balanced holiday assignments with fairness score

### Pages

- `/tools/survey-preferences` - Landing page with survey creation form
- `/tools/survey-preferences/s/[surveyId]` - Staff preference submission form
- `/tools/survey-preferences/admin/[surveyId]?token=...` - Admin dashboard

## Balancing Algorithm

The algorithm ensures fair distribution of holiday assignments:

### Phase 1: Preference-Based Assignment

Processes holidays chronologically, assigning staff who ranked each holiday. Priority order:

1. **Preference rank** - Lower is better (1st choice > 2nd choice)
2. **Current assignment count** - Staff with fewer assignments get priority
3. **Total preference score** - Staff who got worse assignments previously get priority

### Phase 2: Fill Remaining Slots

Assigns unranked staff to unfilled positions, prioritizing those with fewer total assignments.

### Fairness Score (0-100)

Composed of three components:

- **Fill Rate (0-40 points)** - Percentage of positions filled
- **Preference Matching (0-40 points)** - How well staff got their preferred holidays
- **Distribution (0-20 points)** - How evenly assignments are spread across staff

Higher scores indicate better balance and preference satisfaction.

## Database Schema

### Tables

```sql
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  org_name VARCHAR(255) NOT NULL,
  config JSONB NOT NULL,
  admin_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE survey_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID REFERENCES surveys(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID REFERENCES survey_participants(id),
  preference_type VARCHAR(50) NOT NULL,
  preference_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Config Structure

Stored in `surveys.config` as JSONB:

```json
{
  "holidays": [
    {
      "id": "uuid",
      "name": "Christmas Day",
      "date": "2025-12-25",
      "staff_needed": 2
    }
  ]
}
```

### Preference Data Structure

Stored in `survey_responses.preference_data` as JSONB:

```json
{
  "holiday_rankings": [
    {
      "holiday_id": "uuid",
      "rank": 1
    }
  ],
  "notes": "Optional notes from staff member"
}
```

## Security Model

- **No authentication required** - Anyone can create surveys or submit preferences
- **Admin access via unguessable tokens** - Admin URLs contain UUID tokens
- **Token validation** - All admin endpoints verify token before granting access
- **Read-only staff links** - Staff can only submit preferences, not view results

## Testing

Run all tests:

```bash
npm test -- lib/survey/
```

Run specific test suites:

```bash
npm test -- lib/survey/balancer.test.ts
npm test -- lib/survey/validation.test.ts
```

### Test Coverage

- **Balancer Tests (16 tests)**:
  - Basic assignment logic
  - Fairness distribution
  - Unranked holiday handling
  - Unmet requirements
  - Fairness score calculation
  - Edge cases
  - Complex multi-staff scenarios

- **Validation Tests (27 tests)**:
  - Survey creation validation
  - Preference submission validation
  - Admin token validation
  - Survey ID validation
  - Boundary conditions and error cases

## Example Usage

### 1. Manager Creates Survey

```typescript
POST /api/survey/create
{
  "title": "2025-2026 Holiday Shifts",
  "org_name": "Memorial Hospital - ED",
  "holidays": [
    {
      "id": "uuid-1",
      "name": "Christmas Day",
      "date": "2025-12-25",
      "staff_needed": 3
    },
    {
      "id": "uuid-2",
      "name": "New Year's Day",
      "date": "2026-01-01",
      "staff_needed": 2
    }
  ]
}

Response:
{
  "survey_id": "survey-uuid",
  "admin_url": "https://example.com/tools/survey-preferences/admin/survey-uuid?token=admin-token",
  "staff_url": "https://example.com/tools/survey-preferences/s/survey-uuid",
  "admin_token": "admin-token"
}
```

### 2. Staff Submit Preferences

```typescript
POST /api/survey/survey-uuid/submit
{
  "name": "Alice Smith",
  "email": "alice@hospital.com",
  "holiday_rankings": [
    { "holiday_id": "uuid-1", "rank": 1 },
    { "holiday_id": "uuid-2", "rank": 2 }
  ],
  "notes": "Prefer Christmas but can do either"
}
```

### 3. Admin Runs Balancing

```typescript
POST /api/survey/survey-uuid/balance?token=admin-token

Response:
{
  "assignments": [
    {
      "holiday_id": "uuid-1",
      "holiday_name": "Christmas Day",
      "holiday_date": "2025-12-25",
      "staff_needed": 3,
      "assigned_staff": [
        {
          "participant_id": "p1",
          "name": "Alice Smith",
          "email": "alice@hospital.com",
          "preference_rank": 1
        },
        // ... more staff
      ],
      "unassigned_count": 0
    }
  ],
  "fairness_score": 87,
  "unmet_requirements": []
}
```

## Design Decisions

### Why No Authentication?

- Simplicity: No login flow, no password management
- Accessibility: Anyone can create a survey instantly
- Security via obscurity: Admin tokens are unguessable UUIDs
- Use case: Small teams where sharing a link is acceptable

### Why Chronological Processing?

- Predictable behavior: Earlier holidays processed first
- Fairness: Prevents "saving" staff for later holidays
- Real-world alignment: Holiday coverage is typically planned chronologically

### Why Client-Side Only Balancing?

- Stateless: Balancing is computed on-demand, not persisted
- Flexibility: Managers can re-run with different parameters in future
- Simplicity: No need to track assignment history or handle updates

## Future Enhancements

Potential improvements (not currently implemented):

- Save balancing results to database
- Email notifications to assigned staff
- Multiple balancing strategies (optimize for preferences vs. fairness)
- Ability to manually override assignments
- Export assignments to calendar formats
- Staff availability constraints beyond preferences
- Integration with existing roster systems
