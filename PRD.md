# Product Requirements Document: Applied LLM Patterns

**Status:** Draft 1  
**Date:** 2026-10-05  
**Working project name:** Applied LLM Patterns  
**Delivery model:** Static website deployed to GitHub Pages

## 1. Product summary

Applied LLM Patterns is a concise educational website for intermediate and advanced LLM users.

It will teach readers how to move from individual prompts to more reliable ways of working with LLMs: context engineering, multi-step workflows, agent harnesses, evaluation, and controlled loops. It will also provide a curated library of practical examples for technical and non-technical work.

The website is the learning and discovery layer. GitHub remains the source of truth for the complete prompt files, examples, history, attribution, and contributions.

## 2. Problem statement

The current project is a collection of reference repositories and one large file containing 100 prompts. It is difficult to:

- Understand which material is trustworthy or current.
- Learn the principles behind an example.
- Find material by topic, level, or type.
- Distinguish a prompt from a playbook, workflow, harness, or loop.
- Maintain, test, attribute, and update individual entries.
- Publish the material as a coherent educational resource.

The product must turn this raw collection into a small, navigable knowledge base rather than reproduce it as a large prompt directory.

## 3. Goals

### Primary goals

1. Teach useful LLM practices in short, focused pages.
2. Let users browse examples by topic, domain, level, and artifact type.
3. Connect every lesson to one or more practical examples.
4. Let users open the complete source example on GitHub.
5. Keep all content easy to review, version, and maintain as Markdown.
6. Generate a fast, accessible static site suitable for GitHub Pages.
7. Support phased implementation without requiring a backend.

### Success definition for version 1.0

- A new reader can understand the project and reach a relevant lesson or example within two clicks.
- Every published lesson includes a practical example or links to one.
- Every published example has metadata, provenance, usage guidance, and a quality review date.
- The production build contains only static assets and works under a GitHub Pages project subpath.
- The site passes its accessibility, link, and performance checks.

## 4. Non-goals

The initial product will not:

- Execute prompts or call an LLM API.
- Store user accounts, favorites, or browsing history.
- Provide a visual prompt builder.
- Promise that a prompt works identically across all models.
- Publish all 100 current prompts without review.
- Copy reference repositories wholesale.
- Provide authoritative medical, legal, or financial advice.
- Require a database, server, CMS, or paid hosting service.

## 5. Target audience

### Primary audience

Intermediate and advanced LLM users who already know how to chat with an LLM and want more reliable, reusable workflows.

This includes:

- Software engineers working with Python, TypeScript, Java, and macOS.
- IT practitioners and technical operators.
- Researchers and analysts.
- Sales and marketing professionals.
- Knowledge workers using LLMs for writing, decisions, and productivity.

### Reader assumptions

Readers know what an LLM and a prompt are. The site should explain advanced ideas in plain language without spending significant space on beginner setup or product-specific UI instructions.

## 6. Product principles

### Short and sharp

- Prefer one focused idea per page.
- Put the practical takeaway near the top.
- Use lists, diagrams, and compact examples instead of long essays.
- Target a reading time of 3–7 minutes for most lessons.

### Educational

Every lesson should explain:

- What the technique is.
- Why it matters.
- When to use it.
- When not to use it.
- How to apply it.
- How to check whether it worked.

### Example-driven

- Every core lesson must include a small inline example.
- The lesson must link to one or more complete examples in the repository.
- Examples must show inputs, expected outputs, and evaluation criteria—not only prompt text.

### Model-agnostic by default

- Teach durable techniques rather than product tricks.
- Mention a model or product only where behavior or syntax genuinely differs.
- Record a `last_verified` date for time-sensitive material.

### Curated, not comprehensive

- Publish fewer, stronger assets.
- Merge repetitive prompts into reusable patterns or playbooks.
- Clearly mark experimental material.

## 7. Conceptual model

The site will teach five progressively broader layers:

| Layer | Question it answers | Typical asset |
| --- | --- | --- |
| Prompt engineering | What should the model do in this interaction? | Prompt |
| Context engineering | What should the model know and see? | Context pattern |
| Workflow engineering | What steps produce the result? | Playbook |
| Harness engineering | What tools, constraints, and feedback support the agent? | Harness blueprint |
| Loop engineering | How does repeated work converge, stop, recover, or escalate? | Loop blueprint |

Evaluation, safety, observability, human oversight, and cost apply across all five layers.

These layers are a teaching model, not a claim that the terminology is universally standardized.

## 8. Content types

The project will use explicit artifact types:

| Type | Definition |
| --- | --- |
| Lesson | A concise explanation of one concept or technique. |
| Prompt | Instructions intended primarily for one model interaction. |
| Pattern | A reusable technique independent of a specific domain. |
| Playbook | A human-guided sequence of steps for completing a task. |
| Agent workflow | A multi-step task involving model decisions and tools. |
| Harness blueprint | Guidance for tools, permissions, instructions, tests, and feedback around an agent. |
| Loop blueprint | Repeated execution with state, checks, budgets, recovery, and stop rules. |
| Checklist | Preparation or review criteria. |
| Rubric | Criteria for evaluating an output or workflow. |
| Case study | Evidence about what worked, what failed, and why. |

## 9. Information architecture

### Primary navigation

The main navigation should contain no more than five items:

1. **Learn** — tutorials organized by the five-layer model.
2. **Examples** — browsable repository assets.
3. **Domains** — material grouped by practical field.
4. **Glossary** — concise definitions of important terms.
5. **GitHub** — the project repository.

### Home page

The home page should answer four questions quickly:

1. What is this site?
2. Who is it for?
3. Where should I start?
4. How can I find an example?

Required home-page sections:

- One-sentence value proposition.
- The five-layer learning path.
- Three entry points: learn a concept, find an example, browse a domain.
- A small set of featured lessons.
- A small set of featured examples.
- A link to the repository and contribution guide.

### Learn section

```text
Learn
├── Start here
├── Prompt engineering
├── Context engineering
├── Workflows and agents
├── Harness engineering
├── Loop engineering
├── Evaluation and reliability
└── Safety and governance
```

Each section should have an overview page and a deliberately small sequence of lessons.

### Example browsing dimensions

Users should be able to browse or filter examples by:

- Artifact type.
- Domain.
- Level.
- Technology where applicable.
- Tag.
- Review status.

Initial domains:

- Research and analysis.
- Writing and communication.
- Sales.
- Marketing.
- Mathematics.
- Data analysis.
- Software engineering.
- IT and operations.
- Productivity.

## 10. Core user journeys

### Journey A: Learn a concept

1. User opens the home page.
2. User selects Context Engineering.
3. User reads a concise lesson.
4. User sees a small inline example.
5. User opens a complete related example on the site or GitHub.

### Journey B: Find a practical example

1. User opens Examples.
2. User filters by domain and artifact type.
3. User reads the summary and usage guidance.
4. User opens the rendered example.
5. User selects **View source on GitHub** to copy or inspect the canonical file.

### Journey C: Explore a professional domain

1. User opens Domains.
2. User selects a domain such as Software Engineering or Sales.
3. User sees recommended lessons, patterns, and examples.
4. User follows a suggested progression from a simple prompt to a more reliable workflow.

## 11. Page requirements

### Lesson page

Every lesson page must include:

- Title and one-sentence summary.
- Level and estimated reading time.
- Key takeaway.
- Explanation.
- When to use it.
- When not to use it.
- Small example.
- Common failure modes.
- How to evaluate the result.
- Related lessons.
- Related repository examples.
- Last reviewed date.

### Example index page

The example index must provide:

- A compact list or card view.
- Text search when search is implemented.
- Filters that work without a server.
- Clear empty-state text.
- Shareable URLs for important filters where practical.

### Example detail page

Every example page must include:

- Purpose.
- Artifact type, level, domains, and tags.
- When to use it.
- When not to use it.
- Required inputs.
- A readable preview of the prompt or procedure.
- Expected output.
- Evaluation criteria.
- Known limitations and risks.
- Provenance and attribution.
- Last reviewed date.
- **View source on GitHub** link.
- **Edit this page on GitHub** link.

The full source must remain available as a normal Markdown file in the repository, even when the site renders it as HTML.

### Domain page

Each domain page should contain:

- A brief explanation of how LLMs help in that domain.
- Recommended foundational lessons.
- Featured prompts, patterns, and playbooks.
- Domain-specific risks or limitations.
- A suggested learning sequence.

## 12. Content model

Markdown is the canonical source format. YAML frontmatter supplies build-time metadata.

Minimum example metadata:

```yaml
---
id: python-root-cause-debugging
title: Root-cause debugging for Python
summary: Diagnose a Python failure before proposing the smallest verified fix.
kind: playbook
level: advanced
domains:
  - software-engineering
technologies:
  - python
tags:
  - debugging
  - testing
status: reviewed
language: en
last_verified: 2026-10-05
featured: false
provenance:
  type: original
---
```

Required editorial fields in the Markdown body:

1. Purpose.
2. When to use.
3. When not to use.
4. Inputs.
5. Prompt or procedure.
6. Expected output.
7. Worked example.
8. Failure modes.
9. Evaluation rubric.
10. Safety and privacy notes where relevant.
11. Provenance and attribution.

Build-time validation must reject duplicate IDs, unknown artifact types, invalid levels, missing summaries, and missing review dates.

## 13. Recommended technical architecture

### Generator

Use **Astro** as the static site generator.

Reasons:

- Produces static HTML by default.
- Supports Markdown and typed content collections.
- Adds little client-side JavaScript unless explicitly requested.
- Supports reusable layouts and components without turning the project into an application.
- Works well with GitHub Pages and repository subpaths.

The site must remain exportable as ordinary files under `dist/`. No runtime server or API may be required.

### Front end

- Semantic HTML.
- Plain CSS or a small set of project-owned CSS files.
- Minimal client-side JavaScript.
- System font stack by default.
- Light and dark themes using CSS custom properties.
- No large UI component framework for the initial release.

### Search

Search is not required in the first phase.

When added, generate a compact search index at build time and search it in the browser. Search must not require an external service. Filters should use metadata generated during the build.

### Diagrams and code

- Prefer small HTML/CSS or SVG diagrams.
- Use syntax highlighting at build time.
- Do not ship a large diagram runtime for a small number of illustrations.

### Deployment target

The build must support both GitHub Pages forms:

- User site: `https://username.github.io/`
- Project site: `https://username.github.io/repository-name/`

All internal links and asset paths must respect a configurable base path. The repository name and final public URL must not be hardcoded throughout the content.

## 14. Proposed repository structure

```text
.
├── README.md
├── PRD.md
├── CONTRIBUTING.md
├── LICENSE
├── astro.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── content/
│   │   ├── config.ts
│   │   ├── lessons/
│   │   ├── examples/
│   │   ├── domains/
│   │   └── glossary/
│   └── data/
├── scripts/
│   ├── validate-content.mjs
│   └── check-links.mjs
├── sources/
│   └── attribution.md
└── refs/
```

`refs/` is temporary research input. It must never be included in the generated site and can be removed later by the repository owner.

## 15. Visual and interaction requirements

### Tone

- Calm, precise, and practical.
- Educational rather than promotional.
- Avoid hype, exaggerated outcomes, and decorative clutter.

### Layout

- Comfortable reading width for lessons.
- Visible page hierarchy and breadcrumbs on deeper pages.
- Persistent but compact top navigation.
- Table of contents only when a page is long enough to need one.
- Cards should show only metadata that helps a user choose.

### Responsive behavior

- Fully usable from 320px width upward.
- No horizontal page scrolling.
- Code blocks may scroll within their own container.
- Filters must remain usable with touch and keyboard input.

### Copy behavior

A copy button may be added to prompt code blocks, but it must:

- Work without an account.
- Provide visible success feedback.
- Preserve the original source formatting.
- Not collect clipboard contents or usage data.

## 16. Accessibility requirements

- Target WCAG 2.2 AA.
- Use semantic landmarks and heading order.
- Ensure all functionality works with a keyboard.
- Provide visible focus states.
- Meet text and interface contrast requirements.
- Label filters and form controls.
- Do not communicate meaning through color alone.
- Respect reduced-motion preferences.
- Give diagrams useful text alternatives.

## 17. Performance requirements

Initial production targets on representative content pages:

- Lighthouse Performance score of at least 95.
- Lighthouse Accessibility score of at least 95.
- Less than 100 KB of first-party JavaScript before optional search is introduced.
- No blocking third-party scripts.
- Optimized images with explicit dimensions.
- No layout shift caused by fonts, images, or navigation.

Performance checks should run against the production build, not only the development server.

## 18. SEO and sharing requirements

- Unique title and description for every indexable page.
- Canonical URL derived from deployment configuration.
- Open Graph metadata for lessons and examples.
- Generated sitemap.
- Useful `robots.txt`.
- Stable, human-readable URLs.
- One primary H1 per page.
- JSON-LD may be added later if it provides accurate, maintainable value.

Draft, rejected, and internal review content must not be emitted into the public build.

## 19. Safety, provenance, and editorial policy

Every migrated asset must be reviewed before publication.

Required review checks:

- Remove unsupported performance claims.
- Remove instructions that attempt to override system or safety controls.
- Avoid invented statistics, testimonials, citations, or guarantees.
- Mark high-stakes uses and require professional review where appropriate.
- Identify privacy-sensitive inputs.
- Record whether the asset is original, adapted, or quoted.
- Record the source and license for adapted material.
- Preserve required copyright and license notices.

Material with unclear reuse rights must not be published verbatim. It may be used to identify a topic, after which the topic should be independently rewritten and documented.

## 20. Analytics and privacy

Analytics are not required for the initial release.

If introduced later:

- Prefer privacy-preserving, cookie-free analytics.
- Do not collect prompt contents or clipboard data.
- Document exactly what is collected.
- Avoid third-party tracking for merely measuring page views.

Useful privacy-safe measurements include:

- Visits to lessons and example pages.
- Clicks from lessons to repository examples.
- Search terms only if they are processed without collecting sensitive content.
- Broken-link and not-found rates.

## 21. Quality assurance

The project should automate the following checks:

- Production build succeeds.
- Content schema validation succeeds.
- Internal links resolve.
- Referenced GitHub source paths exist.
- No duplicate content IDs or generated routes exist.
- Draft content is absent from production output.
- HTML has no obvious structural accessibility errors.
- Representative pages meet the performance budget.

Manual review should cover:

- Mobile and desktop navigation.
- Keyboard operation.
- Dark and light themes.
- Code-block readability and copying.
- Empty filter results.
- Base-path deployment behavior.
- 404 page behavior.

## 22. Delivery phases

Each phase should leave the repository in a usable state. Later phases may refine earlier decisions, but should not require a complete rewrite.

### Phase 0: Editorial foundation

**Objective:** Decide what is publishable before building the site around it.

Deliverables:

- Confirm project name and one-sentence description.
- Confirm English as the canonical language or choose a different policy.
- Define artifact types, levels, statuses, and domain names.
- Create lesson and example templates.
- Create the provenance and attribution policy.
- Audit the 100 current prompts into keep, merge, inspiration-only, or reject.

Exit criteria:

- Taxonomy is documented.
- Content templates are approved.
- At least ten candidate examples have known provenance.

### Phase 1: Minimal static site

**Objective:** Publish a small but complete reading experience locally.

Deliverables:

- Astro project configured for static output.
- Global layout, typography, navigation, footer, and 404 page.
- Home, Learn, Examples, Domains, and Glossary routes.
- Content collections with schema validation.
- One complete lesson and three complete examples.
- GitHub source links on example pages.
- Responsive light and dark themes.

Exit criteria:

- `npm run build` produces a working static `dist/` directory.
- The site works when served from a non-root base path.
- A user can navigate from the home page to a lesson and then to an example source.
- No backend or client framework runtime is required.

### Phase 2: Core curriculum and seed library

**Objective:** Make the site genuinely useful rather than merely demonstrable.

Deliverables:

- The “From prompts to systems” learning path.
- At least six core lessons, including context, workflow, evaluation, harness, and loop concepts.
- Approximately 20 reviewed examples across at least five domains.
- Related-content links generated from metadata.
- Domain landing pages.
- Editorial and attribution review for every published asset.

Exit criteria:

- Every core lesson has an inline example and repository example link.
- Every example satisfies the content template.
- No published page depends on material in `refs/`.

### Phase 3: Discovery features

**Objective:** Help users find the right material as the collection grows.

Deliverables:

- Client-side search over a build-generated index.
- Filters for type, domain, level, technology, and status.
- Shareable example URLs.
- Featured and related-content rules.
- Copy buttons for appropriate prompt blocks.

Exit criteria:

- Search and filters work without a network request after page load.
- Keyboard and screen-reader users can operate all controls.
- Search does not cause the JavaScript budget to exceed the agreed limit without an explicit PRD revision.

### Phase 4: Reliability and publishing pipeline

**Objective:** Make publication repeatable and safe.

Deliverables:

- Automated build, content validation, and link checks.
- Accessibility and performance checks for representative pages.
- Contributor documentation and pull-request checklist.
- Automated GitHub Pages deployment workflow.
- Sitemap, canonical metadata, and Open Graph metadata.

Exit criteria:

- A pull request cannot merge when required validation fails.
- The default branch deploys successfully to GitHub Pages.
- The public site works at its configured base path.

### Phase 5: Domain expansion

**Objective:** Grow coverage without weakening editorial quality.

Suggested order:

1. Research and general knowledge work.
2. Software engineering: Python, TypeScript, and Java.
3. Sales and marketing.
4. Mathematics and data analysis.
5. macOS, IT, and operations.

Each domain increment should include:

- One domain overview.
- At least one lesson or case study.
- A small set of reviewed examples.
- Domain-specific failure modes and evaluation guidance.

## 23. Initial release scope

Version `0.1` should remain deliberately small:

- Home page.
- Five-layer overview.
- Six core lessons.
- Twenty reviewed examples.
- Five domain pages.
- Glossary.
- Contribution and attribution guidance.
- Static GitHub Pages deployment.

Search, accounts, prompt execution, and exhaustive domain coverage are not required for `0.1`.

## 24. Product success metrics

Quality should be measured before traffic volume.

### Content health

- Percentage of public assets passing the full content template.
- Percentage with verified provenance and review dates.
- Number of stale assets past the chosen review interval.
- Broken GitHub source links.

### User outcomes

- Readers reaching an example from a lesson.
- Readers opening the canonical GitHub source.
- Search success versus empty results after search is introduced.
- Qualitative reports that an example was understandable and reusable.

### Technical health

- Successful production builds.
- Broken internal links.
- Accessibility violations.
- Performance-budget regressions.
- Deployment failures.

No target should reward publishing a high number of low-quality prompts.

## 25. Open decisions

These decisions should be made during Phase 0:

1. Final project and repository name.
2. GitHub owner and final Pages URL.
3. English-only canonical content versus English with Vietnamese translations.
4. Exact license for original repository content.
5. Review interval for time-sensitive examples.
6. Whether full examples are rendered on the site or only previewed before linking to GitHub.
7. Whether analytics are useful enough to justify adding them.

## 26. Recommended decisions

Unless a later decision overrides them:

- Use **Applied LLM Patterns** as the working title.
- Use English as the canonical language and add translations only after version `0.1`.
- Render complete examples on the site and link to the canonical Markdown source on GitHub.
- Use Astro with static output and no front-end framework.
- Begin with no analytics and no search.
- Publish no more than 20 examples in version `0.1`.
- Treat all current and referenced prompts as unreviewed research inputs until provenance and quality checks are complete.

