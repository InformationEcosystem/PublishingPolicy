# User Story Template

---

## Quick Reference

User stories integrate with personas and jobs:

```markdown
## User Story

**As** [Specific Persona Name] from [link to persona file]
**I want to** [goal from job statement]
**So that** [outcome from job statement]

### Why This Matters

**Job To Be Done**: [Link to specific job in persona file]
**Priority**: [Inherited from job priority]
```

---

## Best Practices

1. **Always reference a specific persona** - Not "as a customer" but "as Frequent Fiona"
2. **Link to the job** - Story should address a documented job
3. **Focus on acceptance criteria** - Define success, not implementation
4. **Keep it outcome-focused** - What success looks like, not how to achieve it

---

## Full Template

```markdown
# [Story Title]

> **Story ID**: {{TYPE}}-{{PERSONA}}-001
> **Persona**: [Persona Name](persona-name.md)
> **Job**: [Job Title](persona-name.md#job-1-job-title)
> **Status**: Not Started | In Progress | Complete

---

## User Story

**As** [Persona Name] ([role description])
**I want to** [specific goal]
**So that** [specific outcome]

### Why This Matters

**Job To Be Done**: This story addresses [Persona]'s job of [job description]...

**Business Impact**: [Why this matters to business]
**User Impact**: [Why this matters to user]

---

## Acceptance Criteria

**Given** [context]
**When** [action]
**Then** [observable outcome]

**Given** [alternative context]
**When** [action]
**Then** [observable outcome]

---

## Notes

[Context, assumptions, open questions]

---

## Dependencies

**Requires**: [What must exist first]
**Blocks**: [What can't start until this is done]
**Related**: [Related stories/jobs]

---

## Definition of Done

- [ ] All acceptance criteria demonstrated
- [ ] Tests written and passing
- [ ] Code reviewed
- [ ] Deployed and verified
- [ ] Product owner accepts

---

## Implementation Notes

> IMPORTANT: This section filled in AFTER implementation, not before.

[To be added after completion]
```

---

## Naming Convention

**Story ID Format**: `{TYPE}-{PERSONA}-{NUM}`

| Component | Description | Example |
|-----------|-------------|---------|
| TYPE | User type code (2-3 letters) | MJ (Media/Journalism) |
| PERSONA | First 3-4 letters of name | AMY, ROB, SOPH |
| NUM | Sequential number | 001, 002, 003 |

**Full example**: `MJ-AMY-001` = Media/Journalism, Amy, Story #001

---

## Linking Jobs

Jobs live inside persona files. Use markdown anchors:

```markdown
<!-- In persona-name.md -->
### Job 1: Complete Purchase Quickly
...

<!-- In story file -->
**Job**: [Complete Purchase Quickly](persona-name.md#job-1-complete-purchase-quickly)
```

**Anchor format**: `#job-{number}-{kebab-case-title}`
