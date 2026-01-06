-- Malpublish Seed Data
-- Based on docs/content-archive.md

-- =============================================================================
-- FACETS (4 categories)
-- =============================================================================

INSERT INTO facets (id, name, description, sort_order) VALUES
  ('f1000000-0000-0000-0000-000000000001', 'Content Violations', 'Violations related to the content itself - what is published', 1),
  ('f1000000-0000-0000-0000-000000000002', 'Production Failures', 'Failures in the production process - how content is created', 2),
  ('f1000000-0000-0000-0000-000000000003', 'Contractual Obligations', 'Breaches of agreements with contributors and sources', 3),
  ('f1000000-0000-0000-0000-000000000004', 'Intent & Negligence', 'Whether violations are deliberate or accidental', 4);

-- =============================================================================
-- STANDARD ITEMS
-- =============================================================================

-- Content Violations (7 items)
INSERT INTO standard_items (id, facet_id, text, category, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', 'Disregarding ethical standards', 'violation', 1),
  ('a1000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', 'Spreading false or deceptive claims', 'violation', 2),
  ('a1000000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000001', 'Presenting opinions as facts', 'violation', 3),
  ('a1000000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000001', 'Failing to retract errors promptly', 'violation', 4),
  ('a1000000-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000001', 'Misattribution or unauthorized use', 'violation', 5),
  ('a1000000-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000001', 'Prioritizing sensationalism over accuracy', 'violation', 6),
  ('a1000000-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000001', 'Undisclosed AI-generated content', 'violation', 7);

-- Characteristics (10 items)
INSERT INTO standard_items (id, facet_id, text, category, sort_order) VALUES
  ('a2000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', 'Knowingly presenting false claims as fact', 'characteristic', 8),
  ('a2000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000001', 'Distorting information to serve an agenda', 'characteristic', 9),
  ('a2000000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000001', 'Failing to attribute sources or committing plagiarism', 'characteristic', 10),
  ('a2000000-0000-0000-0000-000000000004', 'f1000000-0000-0000-0000-000000000001', 'Sensationalist manipulation of headlines and content', 'characteristic', 11),
  ('a2000000-0000-0000-0000-000000000005', 'f1000000-0000-0000-0000-000000000001', 'Omitting conflicts of interest', 'characteristic', 12),
  ('a2000000-0000-0000-0000-000000000006', 'f1000000-0000-0000-0000-000000000001', 'Blurring lines between news, opinion, and advertising', 'characteristic', 13),
  ('a2000000-0000-0000-0000-000000000007', 'f1000000-0000-0000-0000-000000000001', 'Refusing to issue corrections when errors are identified', 'characteristic', 14),
  ('a2000000-0000-0000-0000-000000000008', 'f1000000-0000-0000-0000-000000000001', 'Perpetuating harmful stereotypes', 'characteristic', 15),
  ('a2000000-0000-0000-0000-000000000009', 'f1000000-0000-0000-0000-000000000001', 'Taking quotes out of context', 'characteristic', 16),
  ('a2000000-0000-0000-0000-000000000010', 'f1000000-0000-0000-0000-000000000001', 'Contributing to the spread of misinformation', 'characteristic', 17);

-- Production Failures (3 items)
INSERT INTO standard_items (id, facet_id, text, category, sort_order) VALUES
  ('a3000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000002', 'Inadequate fact-checking before publication', 'production', 1),
  ('a3000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000002', 'Poor editorial oversight and review processes', 'production', 2),
  ('a3000000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000002', 'Rushed publication without proper quality control', 'production', 3);

-- Contractual Obligations (3 items)
INSERT INTO standard_items (id, facet_id, text, category, sort_order) VALUES
  ('a4000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000003', 'Violating terms of use or publishing agreements', 'contractual', 1),
  ('a4000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000003', 'Ignoring licensing requirements for content', 'contractual', 2),
  ('a4000000-0000-0000-0000-000000000003', 'f1000000-0000-0000-0000-000000000003', 'Failing to honor commitments to contributors', 'contractual', 3);

-- Intent & Negligence (2 items)
INSERT INTO standard_items (id, facet_id, text, category, sort_order) VALUES
  ('a5000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000004', 'Deliberate deception or intentional falsehoods', 'intent', 1),
  ('a5000000-0000-0000-0000-000000000002', 'f1000000-0000-0000-0000-000000000004', 'Negligent disregard for accuracy and ethics', 'intent', 2);

-- =============================================================================
-- PREVENTION GUIDELINES (8 steps)
-- =============================================================================

INSERT INTO prevention_guidelines (id, text, description, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Fact-check all information', 'Verify claims with multiple reliable sources before publishing', 1),
  ('b1000000-0000-0000-0000-000000000002', 'Distinguish facts from opinions', 'Clearly label opinion pieces and editorials as such', 2),
  ('b1000000-0000-0000-0000-000000000003', 'Provide proper attribution', 'Credit sources, quotes, and referenced material appropriately', 3),
  ('b1000000-0000-0000-0000-000000000004', 'Engage in responsible editing', 'Ensure editorial processes prioritize accuracy over speed', 4),
  ('b1000000-0000-0000-0000-000000000005', 'Be transparent with corrections', 'When errors occur, correct them promptly and visibly', 5),
  ('b1000000-0000-0000-0000-000000000006', 'Respect intellectual property', 'Obtain proper permissions and honor licensing agreements', 6),
  ('b1000000-0000-0000-0000-000000000007', 'Use plagiarism detection', 'Employ tools to ensure content originality', 7),
  ('b1000000-0000-0000-0000-000000000008', 'Make corrections immediately', 'Any ethical violation risks the entire piece''s integrity', 8);

-- =============================================================================
-- SECTOR TEMPLATES
-- =============================================================================

INSERT INTO sector_templates (id, name, slug, description, icon, default_items, default_guidelines) VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'Newsroom',
    'newsroom',
    'For news organizations, magazines, and journalism outlets',
    'newspaper',
    ARRAY[
      'a1000000-0000-0000-0000-000000000001',
      'a1000000-0000-0000-0000-000000000002',
      'a1000000-0000-0000-0000-000000000003',
      'a1000000-0000-0000-0000-000000000004',
      'a2000000-0000-0000-0000-000000000001',
      'a2000000-0000-0000-0000-000000000003',
      'a2000000-0000-0000-0000-000000000004',
      'a2000000-0000-0000-0000-000000000006',
      'a2000000-0000-0000-0000-000000000007',
      'a3000000-0000-0000-0000-000000000001',
      'a3000000-0000-0000-0000-000000000002'
    ]::UUID[],
    ARRAY[
      'b1000000-0000-0000-0000-000000000001',
      'b1000000-0000-0000-0000-000000000002',
      'b1000000-0000-0000-0000-000000000003',
      'b1000000-0000-0000-0000-000000000005',
      'b1000000-0000-0000-0000-000000000008'
    ]::UUID[]
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'Academic Journal',
    'academia',
    'For academic journals, research institutions, and scholarly publishers',
    'graduation-cap',
    ARRAY[
      'a1000000-0000-0000-0000-000000000001',
      'a1000000-0000-0000-0000-000000000002',
      'a1000000-0000-0000-0000-000000000004',
      'a1000000-0000-0000-0000-000000000005',
      'a2000000-0000-0000-0000-000000000001',
      'a2000000-0000-0000-0000-000000000002',
      'a2000000-0000-0000-0000-000000000003',
      'a2000000-0000-0000-0000-000000000005',
      'a3000000-0000-0000-0000-000000000001',
      'a3000000-0000-0000-0000-000000000002',
      'a4000000-0000-0000-0000-000000000002'
    ]::UUID[],
    ARRAY[
      'b1000000-0000-0000-0000-000000000001',
      'b1000000-0000-0000-0000-000000000003',
      'b1000000-0000-0000-0000-000000000005',
      'b1000000-0000-0000-0000-000000000006',
      'b1000000-0000-0000-0000-000000000007'
    ]::UUID[]
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'Corporate Communications',
    'corporate',
    'For corporate communications, PR departments, and marketing teams',
    'building',
    ARRAY[
      'a1000000-0000-0000-0000-000000000001',
      'a1000000-0000-0000-0000-000000000002',
      'a1000000-0000-0000-0000-000000000004',
      'a1000000-0000-0000-0000-000000000007',
      'a2000000-0000-0000-0000-000000000002',
      'a2000000-0000-0000-0000-000000000005',
      'a2000000-0000-0000-0000-000000000006',
      'a2000000-0000-0000-0000-000000000007',
      'a3000000-0000-0000-0000-000000000002',
      'a4000000-0000-0000-0000-000000000001'
    ]::UUID[],
    ARRAY[
      'b1000000-0000-0000-0000-000000000001',
      'b1000000-0000-0000-0000-000000000002',
      'b1000000-0000-0000-0000-000000000005',
      'b1000000-0000-0000-0000-000000000006'
    ]::UUID[]
  ),
  (
    'c1000000-0000-0000-0000-000000000004',
    'Platform Trust & Safety',
    'platform',
    'For social media platforms, content platforms, and technology companies',
    'shield',
    ARRAY[
      'a1000000-0000-0000-0000-000000000001',
      'a1000000-0000-0000-0000-000000000002',
      'a1000000-0000-0000-0000-000000000006',
      'a1000000-0000-0000-0000-000000000007',
      'a2000000-0000-0000-0000-000000000001',
      'a2000000-0000-0000-0000-000000000008',
      'a2000000-0000-0000-0000-000000000010',
      'a3000000-0000-0000-0000-000000000001',
      'a5000000-0000-0000-0000-000000000001',
      'a5000000-0000-0000-0000-000000000002'
    ]::UUID[],
    ARRAY[
      'b1000000-0000-0000-0000-000000000001',
      'b1000000-0000-0000-0000-000000000005',
      'b1000000-0000-0000-0000-000000000008'
    ]::UUID[]
  );
