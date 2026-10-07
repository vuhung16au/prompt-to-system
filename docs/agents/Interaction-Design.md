# Interaction Design Policy

This policy dictates the interaction design standards for learning content presentation, navigation, component design, layout, and style changes. Agents MUST adhere to these guidelines.

## General Guidelines

- **Learner-Centric Approach:** Always begin with the learner's task and desired outcome.
- **Ordered Curriculum:** Preserve the ordered curriculum and make the user's current position clearly visible.
- **Progressive Disclosure:** Implement progressive disclosure: summary first, detail on demand.
- **HTML & Links:** Prefer semantic HTML and ordinary links over unnecessary client-side state.
- **Headings:** Maintain one H1 per page and a logical heading hierarchy.
- **Navigation:** Provide skip navigation, breadcrumbs on deep pages, and clearly visible current-page states.
- **Accessibility:** Make all controls keyboard accessible with clearly visible focus states. Meet WCAG 2.2 AA requirements for colour contrast, target-size, and reflow.
- **Visual Cues:** Never rely on colour alone or hover-only disclosure for information or interaction.
- **Content Cards:** Keep cards concise and make the whole interaction purpose clear.
- **State Feedback:** Include relevant loading, empty, error, and no-result states.
- **URL Handling:** Respect the GitHub Pages base path for every internal URL.
- **Content Integrity:** Avoid fake progress, fake personalization, fabricated citations, and unsupported claims.
- **Pre-Completion Checks:** Run content validation, link checks, type/build checks, keyboard accessibility checks, and responsive design checks before considering a task complete.

## Page-Specific Acceptance Checklists

### Home Page
- [ ] Clear call to action to start learning.
- [ ] High-level summary of available domains or topics.
- [ ] Accessible navigation links to main sections.

### Learn Page
- [ ] Ordered curriculum is visible and navigable.
- [ ] Current progress or position is clearly highlighted.
- [ ] Progressive disclosure used for module summaries.

### Lesson Page
- [ ] One clear H1 heading for the lesson title.
- [ ] Logical heading hierarchy for lesson sections.
- [ ] Breadcrumbs back to the module or Learn page.
- [ ] Next/Previous lesson links for ordered navigation.

### Domains Page
- [ ] Concise cards for each domain.
- [ ] Clear purpose of interaction for selecting a domain.
- [ ] Empty/No-result states if no domains are found.

### Domain Detail Page
- [ ] Breadcrumbs back to the Domains list.
- [ ] Summary of the domain first, detailed courses/topics on demand.

### Examples Page
- [ ] Keyboard accessible controls for filtering or selecting examples.
- [ ] Focus states are clearly visible on all interactive elements.

### Glossary Page
- [ ] Semantic HTML for terms and definitions (e.g., `<dl>`, `<dt>`, `<dd>`).
- [ ] Skip navigation provided for long lists.
- [ ] Anchor links for alphabetical navigation.
