-- Survey Preferences Database Schema
-- For Netlify DB (Neon Postgres)

-- Surveys table: stores survey configurations
CREATE TABLE IF NOT EXISTS surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  org_name VARCHAR(255) NOT NULL,
  config JSONB NOT NULL, -- Survey configuration (shift types, preference categories)
  admin_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Survey participants table: stores staff who submit preferences
CREATE TABLE IF NOT EXISTS survey_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(survey_id, email) -- Prevent duplicate submissions from same email
);

-- Survey responses table: stores individual preference responses
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id UUID NOT NULL REFERENCES survey_participants(id) ON DELETE CASCADE,
  preference_type VARCHAR(100) NOT NULL, -- e.g., 'availability', 'preferred_shifts', 'time_off'
  preference_data JSONB NOT NULL, -- Flexible storage for various preference types
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_surveys_admin_token ON surveys(admin_token);
CREATE INDEX IF NOT EXISTS idx_participants_survey_id ON survey_participants(survey_id);
CREATE INDEX IF NOT EXISTS idx_participants_email ON survey_participants(email);
CREATE INDEX IF NOT EXISTS idx_responses_participant_id ON survey_responses(participant_id);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
