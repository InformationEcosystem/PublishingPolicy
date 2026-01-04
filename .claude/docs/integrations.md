<!-- Last updated: 2026-01-02 | Status: Pending setup -->

# Integrations

## Credential Security

### This Project's Configuration

| Setting | Value |
|---------|-------|
| **GitHub Account** | `not-configured` |
| **Token Variable** | `MALPUBLISH_GITHUB_TOKEN` |
| **Username Variable** | `MALPUBLISH_GITHUB_USERNAME` |
| **Credential File** | `~/.env.credentials/malpublish.env` |
| **Isolation** | direnv - only this project's tokens loaded |

### Security Rules

1. **NEVER embed tokens** in git remote URLs
2. **NEVER hardcode tokens** in .mcp.json - use `${VAR}` syntax
3. **NEVER use `gh auth login`** - breaks per-project isolation
4. **After credential changes**: Run `~/.claude/scripts/audit.sh`

### Verification

```bash
echo $MALPUBLISH_GITHUB_TOKEN  # Should show token (not NOT_CONFIGURED)
gh auth status                  # Should show configured account
```

**Full credential documentation**: `~/.claude/docs/credential-security.md`

---

## GitHub

**Owner**: `not-configured`
**Repository**: TBD

---

## Additional Services

To be documented when services are added.

---

## Adding New Services

When integrating a new service (Vercel, Supabase, Stripe, etc.), document using this pattern:

### [Service Name]

**Account**: `account-name` (email@example.com)
**Project/Team**: `project-id`
**Dashboard**: [link]

#### Configuration
| Setting | Value |
|---------|-------|
| Token Variable | `MALPUBLISH_[SERVICE]_TOKEN` |
| Project ID | `xxx` |

#### CLI Quirks
Document any non-obvious CLI behavior:
```bash
# Example: Vercel CLI ignores env var, must use flag
vercel --prod --token $MALPUBLISH_VERCEL_TOKEN
```

#### Client Setup (if multiple clients)
| File | Use Case |
|------|----------|
| client.ts | Browser/client-side |
| server.ts | Server-side, API routes |

#### Regeneration Commands
```bash
# Example: Regenerate database types
npx supabase gen types typescript --project-id xxx > src/types/database.ts
```

> **Document quirks immediately**: When you discover a CLI gotcha or non-obvious behavior, add it here. Future sessions will thank you.
