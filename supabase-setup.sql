-- Run this in Supabase SQL Editor

-- Company tokens for self-service registration
CREATE TABLE IF NOT EXISTS company_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  company_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Interview requests tracking
CREATE TABLE IF NOT EXISTS interview_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_token text REFERENCES company_tokens(token),
  engineer_handle text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (optional for now)
ALTER TABLE company_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_requests ENABLE ROW LEVEL SECURITY;
