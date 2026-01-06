# User Research

**Last Updated**: 2026-01-05
**Status**: Framework established, personas pending user research

User documentation organized by Jobs To Be Done framework.

---

## User Types (7 Sector Categories)

Publishing Policy serves organizations across 7 sectors. Each sector has distinct publishing contexts, compliance needs, and accountability expectations.

| User Type | Sectors | Priority | Status |
|-----------|---------|----------|--------|
| [Media & Journalism](media-journalism/) | newsroom, local_news, digital_media, newsletter, podcast, documentary | P0 | Planned |
| [Academic & Research](academic-research/) | academic_journal, university, research_institution, think_tank | P1 | Planned |
| [Government & Public](government-public/) | federal_agency, state_government, municipal, school_district, public_library | P1 | Planned |
| [Corporate & Professional](corporate-professional/) | corporate_comms, pr_agency, internal_comms, industry_association | P2 | Planned |
| [Platform & Technology](platform-technology/) | social_platform, content_platform, community_forum, ai_content | P2 | Planned |
| [Nonprofit & Advocacy](nonprofit-advocacy/) | nonprofit, foundation, advocacy_org, religious_org | P2 | Planned |
| [Individual & Creator](individual-creator/) | independent_journalist, blogger, consultant, creator | P3 | Planned |

---

## Quick Start

### 1. When to Create Personas

Create personas when:
- Starting a new sector vertical
- User research reveals distinct sub-segments
- Conversion or retention issues need investigation

Skip if:
- MVP focus on core flow (current state)
- Sector differences are minimal

### 2. Directory Structure (When Ready)

```
users/
├── users.md                      (this file)
├── _templates/                   (copy for new personas)
│   ├── persona-template.md
│   ├── story-template.md
│   └── user-type-README.md
├── media-journalism/             (when researched)
│   ├── README.md
│   └── [persona-name].md
└── academic-research/            (when researched)
    ├── README.md
    └── [persona-name].md
```

### 3. Story ID Format

`{TYPE}-{PERSONA}-{NUM}` → e.g., `MJ-SARAH-001`

| Type Code | User Type |
|-----------|-----------|
| MJ | Media & Journalism |
| AR | Academic & Research |
| GP | Government & Public |
| CP | Corporate & Professional |
| PT | Platform & Technology |
| NA | Nonprofit & Advocacy |
| IC | Individual & Creator |

---

## Sector-Specific Insights

### P0: Media & Journalism

**Why P0**: Core audience for "malpublishing" concept. Journalism has established ethics frameworks. Most likely to understand and adopt publishing policies.

**Key Jobs** (hypothesized):
- Demonstrate credibility to skeptical audiences
- Differentiate from competitors on trust metrics
- Meet funding/grant requirements for ethical publishing

**Research Questions**:
- How do they currently communicate ethics policies?
- What triggers the need for a formal policy?
- Who internally champions this work?

---

### P1: Academic & Research

**Why P1**: Strong fit with existing peer review and replication crisis concerns. Institutions increasingly require ethics statements.

**Key Jobs** (hypothesized):
- Comply with journal/institution requirements
- Protect against retraction risks
- Build reputation for methodological rigor

---

### P1: Government & Public

**Why P1**: Legal/compliance requirements often mandate publishing standards. Large potential volume but longer sales cycles.

**Key Jobs** (hypothesized):
- Meet regulatory/legal requirements
- Respond to FOIA with clear standards
- Build public trust in government communications

---

### P2: Corporate & Professional

**Key Jobs** (hypothesized):
- Manage brand reputation risk
- Establish standards for internal communications
- Demonstrate ESG/ethics compliance

---

### P2: Platform & Technology

**Key Jobs** (hypothesized):
- Define content moderation standards
- Communicate AI content disclosure policies
- Build user trust in platform governance

---

### P2: Nonprofit & Advocacy

**Key Jobs** (hypothesized):
- Maintain donor trust through transparency
- Navigate advocacy vs. journalism ethics
- Demonstrate impact reporting standards

---

### P3: Individual & Creator

**Why P3**: High volume, low revenue per user. May be good for awareness but not primary monetization target.

**Key Jobs** (hypothesized):
- Build personal credibility
- Differentiate from misinformation creators
- Meet platform partnership requirements

---

## Philosophy

- **Describe problems, not solutions** - Focus on needs, not features
- **Organize by user type** - Primary navigation dimension
- **Keep personas lean** - 300-400 lines max with embedded jobs
- **Validate assumptions** - Track what's researched vs. hypothesized

---

## Current State

**Development Status**: Framework only - no validated personas yet

**Next Steps**:
1. Conduct 3-5 interviews with Media & Journalism users
2. Document first persona with validated jobs
3. Expand to Academic & Research sector

**Templates**: Available in `_templates/` directory
