-- Migration: Organization Carousel & DNS Verification
-- Created: 2026-01-06
-- Purpose: Add featured organizations carousel with domain verification

-- Add new columns to organizations table
ALTER TABLE organizations
  ADD COLUMN IF NOT EXISTS domain TEXT,
  ADD COLUMN IF NOT EXISTS dns_verification_code TEXT,
  ADD COLUMN IF NOT EXISTS dns_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS transparency_status TEXT DEFAULT 'unknown';

-- Add constraint for transparency_status
ALTER TABLE organizations
  ADD CONSTRAINT organizations_transparency_status_check
  CHECK (transparency_status IN ('unknown', 'no_policy', 'has_policy', 'claimed'));

-- Drop old sector constraint and make it nullable for featured orgs
ALTER TABLE organizations
  DROP CONSTRAINT IF EXISTS organizations_sector_check;

ALTER TABLE organizations
  ALTER COLUMN sector DROP NOT NULL;

-- Add new sector constraint matching policies table (31 sectors)
ALTER TABLE organizations
  ADD CONSTRAINT organizations_sector_check
  CHECK (sector IS NULL OR sector IN (
    -- Media & Journalism
    'newsroom', 'local_news', 'digital_media', 'newsletter', 'podcast', 'documentary',
    -- Academic & Research
    'academic_journal', 'university', 'research_institution', 'think_tank',
    -- Government & Public
    'federal_agency', 'state_government', 'municipal', 'school_district', 'public_library',
    -- Corporate & Professional
    'corporate_comms', 'pr_agency', 'internal_comms', 'industry_association',
    -- Platform & Technology
    'social_platform', 'content_platform', 'community_forum', 'ai_content', 'platform',
    -- Nonprofit & Advocacy
    'nonprofit', 'foundation', 'advocacy_org', 'religious_org',
    -- Individual & Creator
    'independent_journalist', 'blogger', 'consultant', 'creator',
    -- Legacy (keep for backwards compatibility)
    'journalism', 'academia', 'corporate', 'freelance'
  ));

-- Create unique index on domain for lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_domain
  ON organizations(domain) WHERE domain IS NOT NULL;

-- Create index for featured organizations (carousel query)
CREATE INDEX IF NOT EXISTS idx_organizations_featured
  ON organizations(is_featured) WHERE is_featured = TRUE;

-- Create index for transparency status
CREATE INDEX IF NOT EXISTS idx_organizations_transparency
  ON organizations(transparency_status);

-- Update RLS policies for organizations
-- Allow anyone to read featured organizations (for carousel)
DROP POLICY IF EXISTS "Featured organizations are publicly viewable" ON organizations;
CREATE POLICY "Featured organizations are publicly viewable"
  ON organizations FOR SELECT
  USING (is_featured = TRUE OR is_public = TRUE);

-- Allow authenticated users to update their own organizations (after DNS verification)
-- This requires the user_profiles link - for now, DNS verification is handled server-side
