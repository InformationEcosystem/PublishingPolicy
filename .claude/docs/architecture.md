<\!-- Last updated: 2026-01-02 | Status: Pending setup -->

# Architecture

## Stack

| Layer | Technology |
|-------|------------|
| Framework | _TBD_ |
| Hosting | _TBD_ |
| Database | _TBD_ |
| Auth | _TBD (if applicable)_ |
| Styling | _TBD_ |

> **When to update**: Fill in when stack is chosen. Add rows as needed (CDN, Cache, Queue, etc.)

---

## Directory Structure

Document the project layout when initialized:

```
src/
├── folder/           # Brief explanation
│   └── file.ts       # What this does
└── other/
```

> **Format**: ASCII tree with inline `# comments` explaining purpose

---

## Key Patterns

Document significant patterns as they emerge. Common sections:

### Component Patterns
- When to use X vs Y (e.g., Server vs Client components)
- State management approach
- Error handling strategy

### Auth Flow
- Diagram showing login → callback → protected routes
- Session handling approach

### Middleware / Routing
- Protected routes list
- Redirect logic

> **When to add**: Create sections when patterns are established and would help future sessions understand the codebase.
