-- Publishing Policy Rebrand Migration
-- Adds new wizard sections (identity, commitments, accountability) and certification tiers

-- =============================================================================
-- POLICIES TABLE EXTENSIONS
-- =============================================================================

-- Add JSONB columns for new wizard sections
ALTER TABLE policies
  ADD COLUMN IF NOT EXISTS publishing_identity JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS editorial_commitments JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS accountability_framework JSONB DEFAULT '{}'::jsonb;

-- Add certification tier tracking
ALTER TABLE policies
  ADD COLUMN IF NOT EXISTS certification_tier TEXT DEFAULT 'declared'
    CHECK (certification_tier IN ('declared', 'committed', 'verified', 'exemplary')),
  ADD COLUMN IF NOT EXISTS certification_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS policy_url TEXT;

-- Add column for malpublish definitions (auto-generated + custom)
ALTER TABLE policies
  ADD COLUMN IF NOT EXISTS malpublish_definitions JSONB DEFAULT '[]'::jsonb;

-- Index for certification tier filtering
CREATE INDEX IF NOT EXISTS idx_policies_certification ON policies(certification_tier);

-- =============================================================================
-- EXPAND SECTOR CONSTRAINTS
-- =============================================================================

-- Drop the existing constraint on policies
ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_sector_check;

-- Drop the existing constraint on organizations
ALTER TABLE organizations DROP CONSTRAINT IF EXISTS organizations_sector_check;

-- Create new sector type with expanded list
-- Media & Journalism
-- Academic & Research
-- Government & Public Sector
-- Corporate & Professional
-- Platform & Technology
-- Nonprofit & Advocacy
-- Individual & Creator

ALTER TABLE policies ADD CONSTRAINT policies_sector_check
  CHECK (sector IN (
    -- Media & Journalism (6)
    'newsroom', 'local_news', 'digital_media', 'newsletter', 'podcast', 'documentary',
    -- Academic & Research (4)
    'academic_journal', 'university', 'research_institution', 'think_tank',
    -- Government & Public Sector (5)
    'federal_agency', 'state_government', 'municipal', 'school_district', 'public_library',
    -- Corporate & Professional (4)
    'corporate_comms', 'pr_agency', 'internal_comms', 'industry_association',
    -- Platform & Technology (4)
    'social_platform', 'content_platform', 'community_forum', 'ai_content',
    -- Nonprofit & Advocacy (4)
    'nonprofit', 'foundation', 'advocacy_org', 'religious_org',
    -- Individual & Creator (4)
    'independent_journalist', 'blogger', 'consultant', 'creator',
    -- Legacy compatibility
    'journalism', 'academia', 'corporate', 'platform', 'freelance'
  ));

ALTER TABLE organizations ADD CONSTRAINT organizations_sector_check
  CHECK (sector IN (
    'newsroom', 'local_news', 'digital_media', 'newsletter', 'podcast', 'documentary',
    'academic_journal', 'university', 'research_institution', 'think_tank',
    'federal_agency', 'state_government', 'municipal', 'school_district', 'public_library',
    'corporate_comms', 'pr_agency', 'internal_comms', 'industry_association',
    'social_platform', 'content_platform', 'community_forum', 'ai_content',
    'nonprofit', 'foundation', 'advocacy_org', 'religious_org',
    'independent_journalist', 'blogger', 'consultant', 'creator',
    'journalism', 'academia', 'corporate', 'platform', 'freelance'
  ));

-- =============================================================================
-- COMMITMENT DEFINITIONS TABLE (for template substitution)
-- =============================================================================

-- Store commitment-to-definition mappings for auto-generation
CREATE TABLE IF NOT EXISTS commitment_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commitment_type TEXT NOT NULL,  -- 'sourcing', 'accuracy', 'transparency', 'independence', etc.
  commitment_value TEXT NOT NULL, -- The specific commitment choice
  malpublish_template TEXT NOT NULL, -- Template with optional variables
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed commitment templates for auto-generation
INSERT INTO commitment_templates (commitment_type, commitment_value, malpublish_template, sort_order) VALUES
-- Sourcing standards
('sourcing', 'single_verified', 'Publishing claims without any source verification', 1),
('sourcing', 'two_independent', 'Publishing claims without verification from at least two independent sources', 2),
('sourcing', 'three_or_more', 'Publishing claims without verification from at least three independent sources', 3),
('sourcing', 'varies', 'Publishing claims without appropriate source verification for the story type', 4),

-- Accuracy commitment
('accuracy', 'formal_process', 'Publishing without completing the formal fact-checking process', 1),
('accuracy', 'editor_review', 'Publishing without editorial review', 2),
('accuracy', 'self_verified', 'Publishing claims the author has not personally verified', 3),
('accuracy', 'no_formal', 'Publishing known false information', 4),

-- Transparency - funding
('transparency_funding', 'yes', 'Publishing without disclosing relevant funding relationships', 1),
('transparency_funding', 'no', NULL, 2),

-- Transparency - ownership
('transparency_ownership', 'yes', 'Publishing without disclosing ownership interests', 1),
('transparency_ownership', 'no', NULL, 2),

-- Transparency - corrections
('transparency_corrections', 'yes', 'Failing to maintain a public record of corrections', 1),
('transparency_corrections', 'no', NULL, 2),

-- Independence
('independence', 'disclosure_policy', 'Publishing without disclosing relevant conflicts of interest', 1),
('independence', 'recusal_policy', 'Publishing on topics where the author has an undisclosed conflict of interest', 2),
('independence', 'no_formal', NULL, 3),

-- Correction timeframe
('correction_timeframe', '24h', 'Failing to correct known errors within 24 hours of confirmation', 1),
('correction_timeframe', '48h', 'Failing to correct known errors within 48 hours of confirmation', 2),
('correction_timeframe', '1_week', 'Failing to correct known errors within one week of confirmation', 3),
('correction_timeframe', 'no_policy', 'Failing to correct known errors in a timely manner', 4),

-- Feedback mechanism
('feedback_mechanism', 'has_mechanism', 'Operating without a mechanism for the audience to raise concerns', 1),
('feedback_mechanism', 'no_mechanism', NULL, 2),

-- Accountability contact
('accountability_contact', 'has_contact', 'Operating without a designated person accountable for editorial standards', 1),
('accountability_contact', 'no_contact', NULL, 2)

ON CONFLICT DO NOTHING;

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON COLUMN policies.publishing_identity IS 'Section 1: Organization name, sector, audience, mission';
COMMENT ON COLUMN policies.editorial_commitments IS 'Section 2: Sourcing, accuracy, transparency, independence commitments';
COMMENT ON COLUMN policies.accountability_framework IS 'Section 3: Corrections, feedback, contact, review schedule';
COMMENT ON COLUMN policies.malpublish_definitions IS 'Section 4: Auto-generated and custom malpublish definitions';
COMMENT ON COLUMN policies.certification_tier IS 'Declared (internal), Committed (public), Verified (reviewed), Exemplary (exceeds)';
COMMENT ON TABLE commitment_templates IS 'Template mappings for auto-generating malpublish definitions from commitments';
