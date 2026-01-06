# Initiative: Organization Malpublishing Definitions Tool

**Status**: Phase 3 - Auth & Persistence
**Created**: 2026-01-03
**Updated**: 2026-01-05

---

## Vision

Enable organizations to define what malpublishing means within their specific context. Different organizations (newsrooms, academic journals, corporate communications, social media platforms) will have different standards for what constitutes publishing malpractice.

---

## Core Concept

Organizations can:
1. **Select** from a curated list of malpublishing characteristics
2. **Customize** definitions to fit their context
3. **Add** organization-specific violations
4. **Save** their policy definitions
5. **Export/Publish** for internal documentation

---

## Progress

### Phase 0: Infrastructure ✅
- [x] Initialize Next.js 16 + Supabase stack
- [x] Configure project credentials (GitHub, Supabase, Vercel)
- [x] Set up MCP integrations
- [x] Configure Vercel with GitHub auto-deploy

### Phase 1: Database ✅
- [x] Design schema (facets, items, policies, organizations)
- [x] Create migration (`20260104000000_initial_schema.sql`)
- [x] Seed reference data from content archive
- [x] Enable RLS on user-facing tables

### Phase 2: UI Development ✅
- [x] Policy builder wizard (main user flow)
- [x] Sector template selection
- [x] Checklist interface for selecting items
- [x] Preview/save functionality
- [x] Directory page with sector filtering
- [x] Edit page with auto-save
- [x] View page for public policies

### Phase 3: Auth & Persistence ⬅️ CURRENT
- [x] Anonymous policy creation (edit_token URLs) - DONE
- [ ] Optional account creation to claim policies
- [ ] Organization profiles

### Phase 4: Polish
- [ ] PDF/Markdown export
- [ ] Public policy directory (opt-in publishing)
- [ ] Shareable view links - DONE (view_token)

---

## Database Schema

| Table | Purpose | Rows |
|-------|---------|------|
| `facets` | 4 categories of malpublishing | 4 |
| `standard_items` | Checklist items organized by facet | 25 |
| `prevention_guidelines` | Best practices for avoiding malpublishing | 8 |
| `sector_templates` | Pre-configured item sets by industry | 4 |
| `policies` | User-created policy documents | - |
| `policy_items` | Selected items for a policy | - |
| `policy_guidelines` | Selected guidelines for a policy | - |
| `organizations` | Claimed organization profiles | - |
| `user_profiles` | User accounts linked to auth | - |

---

## Decisions Made

| Question | Answer |
|----------|--------|
| Static vs full-stack? | Full-stack (Next.js + Supabase) |
| Authentication? | Hybrid: anonymous with tokens, optional accounts |
| Storage? | PostgreSQL via Supabase |
| Templates? | Yes, 4 sector templates (journalism, academia, corporate, platform) |
| Collaboration? | Future phase - single editor for MVP |

---

## Sector Templates

| Slug | Name | Default Items |
|------|------|---------------|
| `newsroom` | Newsroom | 11 items, 5 guidelines |
| `academia` | Academic Journal | 11 items, 5 guidelines |
| `corporate` | Corporate Communications | 10 items, 4 guidelines |
| `platform` | Platform Trust & Safety | 10 items, 3 guidelines |

---

## Next Steps

1. Add Supabase Auth for optional account creation
2. Allow users to claim anonymous policies
3. Enable organization profiles for claimed policies
4. Add PDF/Markdown export functionality
5. Add "make public" toggle for policies
