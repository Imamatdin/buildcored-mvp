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

-- Admin configuration (hashed password)
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
ALTER TABLE admin_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_projects ENABLE ROW LEVEL SECURITY;
