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

-- Decision logs (engineer submissions)
CREATE TABLE IF NOT EXISTS decision_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  handle text NOT NULL,
  visibility text NOT NULL DEFAULT 'unlisted',
  role_track text,
  seniority text,
  time_budget text,
  problem_id integer NOT NULL,
  problem_title text,
  first_action text NOT NULL,
  why_first text NOT NULL,
  second_action text NOT NULL,
  why_second text NOT NULL,
  third_action text NOT NULL,
  signals_data_first text NOT NULL,
  wont_do text NOT NULL,
  biggest_risk text NOT NULL,
  verify_and_rollback text NOT NULL,
  with_more_time text NOT NULL,
  attest_original boolean NOT NULL,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Admin users (email + bcrypt password)
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Legacy admin_config (kept for backwards compat, no longer used)
CREATE TABLE IF NOT EXISTS admin_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Showcase projects (admin-curated)
CREATE TABLE IF NOT EXISTS showcase_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  repo_url text,
  live_url text,
  tags text[] DEFAULT '{}',
  author_name text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS (optional for now)
ALTER TABLE company_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_projects ENABLE ROW LEVEL SECURITY;
