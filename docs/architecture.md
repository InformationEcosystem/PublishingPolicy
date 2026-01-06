# Architecture

**Last Updated**: 2026-01-05

---

## Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 16 (App Router) | React framework with SSR/SSG |
| Styling | Tailwind CSS | Utility-first CSS |
| Database | Supabase (PostgreSQL) | Data persistence, auth, RLS |
| Hosting | Vercel | Deployment, edge functions |
| Auth | Supabase Auth | Optional user accounts |

---

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   └── layout/             # Header, Footer
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts       # Browser client
│   │       └── server.ts       # Server client
│   └── types/
│       └── database.ts         # Generated Supabase types
├── supabase/
│   ├── migrations/             # SQL migrations
│   └── seed.sql                # Reference data
├── docs/
│   ├── architecture.md         # This file
│   ├── content-archive.md      # Original malpublish.org content
│   └── initiatives/            # Active work streams
└── .claude/
    └── docs/
        └── integrations.md     # Service configuration
```

---

## Database Schema

### Reference Data (read-only for users)

| Table | Description |
|-------|-------------|
| `facets` | 4 categories: Content Violations, Production Failures, Contractual Obligations, Intent & Negligence |
| `standard_items` | 25 checklist items organized by facet and category |
| `prevention_guidelines` | 8 best practices for ethical publishing |
| `sector_templates` | 4 industry presets with default item/guideline selections |

### User Data (RLS-protected)

| Table | Description |
|-------|-------------|
| `policies` | User-created policy documents with edit/view tokens |
| `policy_items` | Junction table: which items are selected for a policy |
| `policy_guidelines` | Junction table: which guidelines are selected |
| `organizations` | Optional organization profiles for claimed policies |
| `user_profiles` | Links Supabase Auth users to organizations |

---

## Auth Strategy

**Hybrid approach supporting both anonymous and authenticated users:**

1. **Anonymous users**: Create policies without accounts
   - `edit_token`: 64-char hex for editing (keep private)
   - `view_token`: 32-char hex for sharing (public-safe)
   - URLs: `/policy/edit/{edit_token}` and `/policy/{view_token}`

2. **Authenticated users**: Optional account creation
   - Claim existing policies via edit_token
   - Create organization profiles
   - Manage multiple policies

---

## Data Flow

```
User lands on /
    ↓
Selects sector template (journalism, academia, etc.)
    ↓
Creates new policy (anonymous - gets edit_token URL)
    ↓
Customizes checklist items and guidelines
    ↓
Previews policy document
    ↓
Exports (PDF/Markdown) or shares (view_token URL)
    ↓
Optional: Creates account to claim policy
```

---

## Patterns

### Supabase Client Usage

```typescript
// Client-side (browser)
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server-side (RSC, API routes)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
```

### Type Safety

```bash
# Regenerate types after schema changes
npx supabase gen types typescript --project-id fidjzybkjowguvdlzahs > src/types/database.ts
```

---

## Security

- **RLS enabled** on all user-facing tables (policies, policy_items, etc.)
- **Reference data** (facets, standard_items) is read-only via RLS
- **Tokens** generated server-side with `gen_random_bytes()`
- **No PII** stored for anonymous users
