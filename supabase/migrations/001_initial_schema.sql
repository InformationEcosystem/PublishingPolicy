-- Malpublish Database Schema
-- Initial migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- REFERENCE DATA TABLES (Seeded, rarely changed)
-- =============================================================================

-- Facets of malpublishing (4 categories)
CREATE TABLE facets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Standard checklist items within each facet
CREATE TABLE standard_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  facet_id UUID REFERENCES facets(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  category TEXT NOT NULL, -- 'violation', 'characteristic', 'production', 'contractual'
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prevention guidelines (8 steps)
CREATE TABLE prevention_guidelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sector templates with pre-selected defaults
CREATE TABLE sector_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  default_items UUID[] DEFAULT '{}',
  default_guidelines UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- USER-GENERATED TABLES
-- =============================================================================

-- Organizations (optional, for claimed policies)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sector TEXT NOT NULL CHECK (sector IN ('journalism', 'academia', 'corporate', 'platform', 'freelance')),
  website TEXT,
  logo_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies (can be anonymous or claimed)
CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Tokens for anonymous access
  edit_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  view_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),

  name TEXT NOT NULL DEFAULT 'Publishing Ethics Policy',
  description TEXT,
  sector TEXT NOT NULL CHECK (sector IN ('journalism', 'academia', 'corporate', 'platform', 'freelance')),

  is_public BOOLEAN DEFAULT FALSE,
  is_claimed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Selected/customized items in a policy
CREATE TABLE policy_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  standard_item_id UUID REFERENCES standard_items(id) ON DELETE SET NULL,
  custom_text TEXT, -- For custom items or modified text
  is_selected BOOLEAN DEFAULT TRUE,
  notes TEXT, -- Internal notes
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Selected guidelines in a policy
CREATE TABLE policy_guidelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
  guideline_id UUID REFERENCES prevention_guidelines(id) ON DELETE SET NULL,
  custom_text TEXT,
  is_selected BOOLEAN DEFAULT TRUE,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  role TEXT DEFAULT 'owner' CHECK (role IN ('owner', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX idx_policies_public ON policies(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_policies_sector ON policies(sector);
CREATE INDEX idx_policies_edit_token ON policies(edit_token);
CREATE INDEX idx_policies_view_token ON policies(view_token);
CREATE INDEX idx_organizations_public ON organizations(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_policy_items_policy ON policy_items(policy_id);
CREATE INDEX idx_standard_items_facet ON standard_items(facet_id);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public policies are viewable by everyone
CREATE POLICY "Public policies are viewable by everyone"
  ON policies FOR SELECT
  USING (is_public = TRUE);

-- Users can view their own policies
CREATE POLICY "Users can view own policies"
  ON policies FOR SELECT
  USING (owner_id = auth.uid());

-- Users can update their own policies
CREATE POLICY "Users can update own policies"
  ON policies FOR UPDATE
  USING (owner_id = auth.uid());

-- Users can delete their own policies
CREATE POLICY "Users can delete own policies"
  ON policies FOR DELETE
  USING (owner_id = auth.uid());

-- Anyone can create policies (anonymous creation)
CREATE POLICY "Anyone can create policies"
  ON policies FOR INSERT
  WITH CHECK (true);

-- Policy items follow their policy's visibility
CREATE POLICY "Policy items follow policy visibility"
  ON policy_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM policies
      WHERE policies.id = policy_items.policy_id
      AND (policies.is_public = TRUE OR policies.owner_id = auth.uid())
    )
  );

-- Policy items can be modified by policy owner
CREATE POLICY "Policy items can be modified by owner"
  ON policy_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM policies
      WHERE policies.id = policy_items.policy_id
      AND policies.owner_id = auth.uid()
    )
  );

-- Same for policy guidelines
CREATE POLICY "Policy guidelines follow policy visibility"
  ON policy_guidelines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM policies
      WHERE policies.id = policy_guidelines.policy_id
      AND (policies.is_public = TRUE OR policies.owner_id = auth.uid())
    )
  );

CREATE POLICY "Policy guidelines can be modified by owner"
  ON policy_guidelines FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM policies
      WHERE policies.id = policy_guidelines.policy_id
      AND policies.owner_id = auth.uid()
    )
  );

-- Public organizations are viewable by everyone
CREATE POLICY "Public orgs are viewable by everyone"
  ON organizations FOR SELECT
  USING (is_public = TRUE);

-- User profiles visible to self
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (id = auth.uid());

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER policies_updated_at
  BEFORE UPDATE ON policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
