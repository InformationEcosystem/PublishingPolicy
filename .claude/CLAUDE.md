---
project: PublishingPolicy
stack: full-stack
services:
  github:
    username: "InformationEcosystem"
    repo: "PublishingPolicy"
  supabase:
    project_ref: "fidjzybkjowguvdlzahs"
  vercel:
    team: "InformationEcosystem"
    project: "publishingpolicy"
status: active
---

# Project Configuration - PublishingPolicy

**Inherits**: `~/.claude/CLAUDE.md`

---

## Session Bootstrap

| Current Focus | Status |
|---------------|--------|
| PublishingPolicy.org Rebrand | Phase 3B Complete - MVP Ready |

**Start here**: Read this file, then check `docs/initiatives/` for active work.

---

## Project

| Setting | Value |
|---------|-------|
| Stack | Next.js 16 + Supabase + Vercel |
| URL | https://publishingpolicy.org |
| Status | Active |

---

## Credential Check

```bash
echo $PUBLISHINGPOLICY_GITHUB_TOKEN           # Required
echo $PUBLISHINGPOLICY_SUPABASE_ACCESS_TOKEN  # Required for MCP
gh auth status                                # Should show: InformationEcosystem
```

---

## Documentation

| When | Read |
|------|------|
| Stack, patterns, schema | `docs/architecture.md` |
| Services, credentials | `docs/integrations.md` |
| Active work streams | `docs/initiatives/` |
| User research (JTBD) | `docs/users/` |
| Archived content | `docs/artifacts/` |

---

## Quick Commands

```bash
npm run dev          # Local development
npm run build        # Production build
```

---

## MCP Servers

| Server | Purpose |
|--------|---------|
| GitHub | Repository operations |
| Supabase | Database operations |

---

## Session Lifecycle

1. `git status` → 2. Work (use TodoWrite) → 3. Commit → 4. Verify
