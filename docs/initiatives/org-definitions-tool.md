# Initiative: Organization Malpublishing Definitions Tool

**Status**: Planning
**Created**: 2026-01-03

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

## Potential Checklist Items (from current content)

### Content Violations
- [ ] Disregarding ethical standards
- [ ] Spreading false or deceptive claims
- [ ] Presenting opinions as facts
- [ ] Failing to retract errors promptly
- [ ] Misattribution or unauthorized use
- [ ] Prioritizing sensationalism
- [ ] Undisclosed AI-generated content

### Characteristics
- [ ] Knowingly presenting false claims as fact
- [ ] Distorting information to serve an agenda
- [ ] Failing to attribute sources or committing plagiarism
- [ ] Sensationalist manipulation of headlines and content
- [ ] Omitting conflicts of interest
- [ ] Blurring lines between news, opinion, and advertising
- [ ] Refusing to issue corrections
- [ ] Perpetuating harmful stereotypes
- [ ] Taking quotes out of context
- [ ] Contributing to misinformation spread

### Production Standards
- [ ] Inadequate fact-checking
- [ ] Poor editorial oversight
- [ ] Rushed publication processes

### Contractual
- [ ] Violating terms of use
- [ ] Ignoring licensing requirements
- [ ] Failing to honor contributor commitments

---

## Open Questions

1. **Authentication**: Do orgs need accounts, or is it anonymous/shareable link?
2. **Storage**: Local storage, database, exportable JSON/PDF?
3. **Collaboration**: Can multiple people from an org edit together?
4. **Versioning**: Track changes to definitions over time?
5. **Templates**: Pre-built templates for newsrooms vs. academia vs. corporate?
6. **Public directory**: Optional listing of orgs who've adopted definitions?

---

## Technical Considerations

- Static site with client-side storage? (simplest)
- Full-stack with user accounts and database? (more features)
- PDF/Markdown export for internal docs?

---

## Next Steps

1. Define MVP feature set
2. Design UI mockups
3. Decide on static vs. full-stack approach
4. Build prototype
