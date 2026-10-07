# Applied LLM Patterns: Content and Experience Enrichment Plan

**Status:** Proposed roadmap  
**Prepared:** 7 October 2026  
**Scope:** Planning only; no website implementation is included in this change.

## 1. Project summary

Applied LLM Patterns is an Astro-based, statically generated learning website that helps intermediate and advanced LLM users progress from isolated prompts to reliable AI systems.

Its central teaching model is a five-layer path:

1. Prompt engineering — define what the model should do.
2. Context engineering — provide what the model should know and see.
3. Workflow engineering — arrange the steps that produce the result.
4. Harness engineering — provide tools, permissions, state, tests, and guardrails.
5. Loop engineering — control repeated work, convergence, recovery, escalation, and stopping.

Evaluation, reliability, safety, observability, cost, and human oversight cut across all five layers. The site combines short lessons, practical examples, domain-guided pathways, and a glossary. Markdown content collections are the source of truth; Astro renders them as a static GitHub Pages site under the `/prompt-to-system/` base path.

## 2. Current-state audit

### What already works

- Astro 7 generates a static site correctly for GitHub Pages.
- Tailwind CSS 4 and the Typography plugin are already installed and configured through Vite.
- Typed Astro content collections already exist for lessons, examples, domains, and glossary terms.
- The repository contains 7 lessons, 25 examples, 11 domains, and 4 glossary terms.
- Search is generated locally at build time, so the site does not require a backend.
- The production build succeeds and currently emits 49 pages plus a sitemap.
- The PRD already defines a strong product direction, content types, user journeys, accessibility targets, and page requirements.

### Main gaps

- The home page is a short heading-and-list page. It names the five layers but does not explain the learner's progression, outcomes, prerequisites, or next action.
- The Learn index is an unordered list. It does not communicate sequence, stage, estimated effort, completion outcome, or the relationship between core and cross-cutting topics.
- The lesson set is thin and uneven. `context-basics` overlaps substantially with `context-engineering`, and lesson headings are not yet normalized to one editorial template.
- Domain pages are approximately 44–52 words each and repeat the same generic paragraph and two-link sequence. They do not yet demonstrate the author's real experience or connect to relevant examples.
- The domain taxonomy mixes fields (`software-engineering`, `research`), technologies (`python`, `typescript`), and activities (`writing`, `productivity`) at the same level. `writing` and `content-writing` overlap.
- The glossary has only four entries and is displayed as a flat list without grouping, related terms, aliases, or links back to lessons.
- The global layout places every page inside one prose container, which limits index-page composition and makes card grids, pathways, filters, and full-width sections awkward.
- Tailwind is present, but there is no small design system of reusable components and tokens. Styling mixes custom colour names, generic Tailwind colours, prose defaults, and one-off classes.
- Navigation has no visible current-page state, mobile menu strategy, skip link, or breadcrumbs on deep pages.
- Metadata is too sparse for the planned experience. Lessons lack duration, order, learning outcomes, prerequisites, related entries, and topic grouping. Domains lack evidence and featured-project metadata.
- Content validation currently fails because four examples are missing a required `## Provenance` section: `code-review-assistant`, `content-format-transformer`, `data-analysis-summary`, and `root-cause-debugging`.

## 3. Product direction

The site should become a guided field guide, not a directory of articles.

The key promise should be:

> Learn to turn one-off prompts into reliable, evaluated AI workflows through a progressive path and practical, domain-specific examples.

The experience should optimize for three journeys:

1. **Learn in sequence:** understand the five layers, complete a focused lesson, practise with an example, and move to the next layer.
2. **Solve a task:** search or filter by goal, domain, artifact type, level, or technology and copy a reviewed pattern.
3. **Explore expertise:** enter through a domain page, see why the techniques matter there, follow a curated progression, and inspect first-party projects or case studies.

## 4. Recommended information architecture

Keep the five-item primary navigation already proposed in the PRD:

- Learn
- Examples
- Domains
- Glossary
- GitHub

Within Learn, use a clear sequence:

1. Start here: from prompts to systems
2. Prompt engineering
3. Context engineering
4. Workflow engineering
5. Harness engineering
6. Loop engineering
7. Evaluation and reliability
8. Safety, governance, and human oversight

Treat evaluation and safety as cross-cutting tracks visually, even if each also has an overview page.

Separate domain and technology concepts:

- **Domains:** Applied AI and agents; software engineering; data science and analytics; NLP and language systems; technical education; research and academic writing; mathematics; productivity and automation.
- **Technologies/tags:** Python, TypeScript, PyTorch, Hugging Face, LangChain/LangGraph, Docker, Java, LaTeX, Astro, and others.

Merge `writing` and `content-writing` into one stronger domain. Keep sales and marketing as secondary collections until each has enough original examples and evidence to justify a full domain pathway.

## 5. Page-by-page experience plan

### Home page

The home page should answer “what is this, is it for me, where do I start, and what will I be able to do?” above the fold.

Recommended sections:

- A concise hero with one value proposition, one primary action (“Start the learning path”), and one secondary action (“Browse practical examples”).
- A five-step learning-path visual. Every step should include its question, skill outcome, estimated effort, and link.
- A “what you will be able to do” outcome block: write testable prompts, assemble grounded context, design multi-step workflows, give agents safe tools, and build bounded improvement loops.
- Three entry points for learners, builders, and domain practitioners.
- Featured lessons and reviewed examples generated from collection metadata rather than hardcoded markup.
- A credibility section referencing original projects and teaching experience without turning the page into a personal portfolio.
- A compact contribution call to action.

### Learn index

Replace the unordered list with an ordered journey. Use numbered stage components rather than disconnected cards.

Each stage should show:

- the stage question;
- two or three measurable learning outcomes;
- prerequisite stages;
- lesson count and estimated time;
- one representative example;
- level and status;
- an explicit “Start step” or “Continue” action.

Add a cross-cutting strip for evaluation, safety, observability, cost, and human oversight. Do not imply stored progress unless the site actually implements local progress; “recommended next” can be derived from the curriculum order without persistence.

### Lesson detail pages

Adopt one editorial template for every lesson:

1. Summary, level, time, and last reviewed date.
2. Learning outcomes.
3. Key takeaway.
4. Mental model or small diagram.
5. When to use and when not to use.
6. Method or procedure.
7. Worked example with before/after or input/process/output.
8. Failure modes and mitigations.
9. Evaluation checklist or rubric.
10. Safety, privacy, and cost notes.
11. Practice task.
12. Related examples, glossary terms, and next lesson.
13. Provenance and further reading.

Resolve the overlap between `context-basics` and `context-engineering`: either merge them, or make the former a true prerequisite focused on the context window and make the latter an applied lesson about selection, retrieval, compression, ordering, and context lifecycle.

### Domains index

Group domains by prominence instead of presenting an alphabetical flat list.

- “Core expertise” should lead with applied AI/agents, ML/NLP, software engineering, data and Python, technical education, and mathematics.
- “Applied practice” can include research/writing and productivity/automation.
- “Growing collections” can include sales and marketing until the content reaches the same standard.

Each domain preview should state what learners will build or improve, not merely define the field.

### Domain detail pages

Each domain page should be a curated mini-curriculum with:

- a domain-specific value proposition;
- common tasks and where LLMs help;
- a recommended learning sequence;
- featured prompts, patterns, playbooks, and case studies;
- one end-to-end workflow diagram;
- risks, failure modes, and review requirements;
- relevant technologies as tags;
- evidence from first-party repositories;
- a short “try this next” practice task.

The author's public GitHub portfolio supports the following high-priority domain content:

- Applied AI and agent engineering: `sdado-reference-harness`, `LangGraph-Adventures`, `llm-benchmark-lab`, `genai-jobseeker`, and `ai-agent-skills`.
- ML, NLP, and deep learning: `pytorch-mastery`, `nlp-learning-journey`, `hf-transformer-trove`, `MachineLearning-GenAI`, and `DeepLearning101`.
- Technical education and assessment: ACU/VIT teaching repositories, `gradeflow-ai`, and learning-journey repositories.
- Mathematics and mathematical AI: `math-olympiad-ml`, HSC resources, fractal projects, and mathematics-for-data-science material.
- Python/data automation: data mining, scraping, dashboards, chess-data utilities, and teaching examples.
- TypeScript/web tools: `pdf-splitter`, `CodeGlow`, `find-my-ip`, `quick-qr-maker`, `mailroom-engine`, and `prompt-driven-ui`.
- Research communication and reproducibility: `LaTeX-Research-Toolkit`, Deep Learning books, and curated notebooks.

Repository links should be selected editorially. Do not automatically import every repository or treat forks as evidence of original expertise.

### Glossary

Grow the glossary from 4 terms to an initial target of 30–40 reviewed terms. Prioritize concepts already used in lessons.

First expansion set:

- agent, agentic workflow, artifact, autonomy, context engineering, context window, chunking, embedding, evaluation, golden dataset, grounding, guardrail, hallucination, harness, human in the loop, inference, instruction hierarchy, LLM-as-a-judge, loop, memory, observability, prompt injection, provenance, RAG, retrieval precision, retrieval recall, rubric, sandbox, structured output, system prompt, tool calling, trace, token, workflow.

Each entry should include a concise definition, why it matters, a small example, related terms, and links to lessons where it is used. Add alphabetical navigation and optional grouping, but keep every entry reachable with ordinary links and without JavaScript.

## 6. Additional topics to add

Prioritize depth over breadth. The following topics close real curriculum gaps:

### Foundation and prompt layer

- Instruction hierarchy and conflict resolution
- Structured outputs and schema validation
- Few-shot example selection
- Prompt versioning and regression testing
- Model selection, latency, and cost trade-offs

### Context layer

- Retrieval design and chunking
- Context compression and summarization
- Memory versus context
- Source authority, freshness, and provenance
- Prompt injection and untrusted retrieved content

### Workflow and harness layers

- Tool design and tool-result validation
- State machines and durable workflows
- Human approval gates and reversible actions
- Sandboxing, least privilege, and secret handling
- Retry policy, idempotency, timeout, and recovery
- Tracing and observability

### Loop and evaluation layers

- Stop conditions and budget controls
- Evaluating agents at step and end-to-end levels
- Golden datasets and failure taxonomies
- Judge calibration and evaluator bias
- Red teaming and adversarial testing
- Production monitoring and drift

### Applied case studies

- Building a grounded course assistant
- Evaluating generated quiz questions
- Designing an AI code-review workflow
- A safe research-and-synthesis workflow
- A bounded debugging agent
- An NLP experiment from dataset to evaluation

## 7. Tailwind and design-system plan

Do not “add Tailwind”; formalize the Tailwind 4 setup that already exists.

Create a small project-owned component system:

- `Container`, `Stack`, `Cluster`, and `Prose` layout primitives;
- `Button` and text-link variants;
- `Card`, `MetadataList`, and `Tag`;
- `LearningStep`, `OutcomeList`, and `NextPrevious`;
- `Breadcrumbs`, `TableOfContents`, and `Callout`;
- `LessonCard`, `ExampleCard`, and `DomainCard`.

Use semantic colour tokens such as surface, text, muted text, border, accent, success, warning, and code background. Avoid encoding brand colours directly in component names. Support light and dark themes, visible keyboard focus, reduced motion, and print-friendly lesson pages.

Allow the layout to choose a reading-width or wide-page main area. Do not force index pages and detail pages into the same `prose max-w-4xl` wrapper.

## 8. Agent-policy plan

Extend the existing root `AGENTS.md`; do not replace it. Add a mandatory reference to `docs/agents/Interaction-Design.md` for any task that changes layouts, navigation, components, styles, or learning content presentation.

The interaction-design policy should require agents to:

- begin with the learner's task and outcome;
- preserve the ordered curriculum and make current position visible;
- use progressive disclosure: summary first, detail on demand;
- prefer semantic HTML and ordinary links over unnecessary client-side state;
- maintain one H1 and a logical heading hierarchy;
- provide skip navigation, breadcrumbs on deep pages, and visible current-page states;
- make all controls keyboard accessible with clearly visible focus;
- meet WCAG 2.2 AA colour, target-size, and reflow requirements;
- never rely on colour alone or hover-only disclosure;
- keep cards concise and make the whole interaction purpose clear;
- include loading, empty, error, and no-result states where relevant;
- respect the GitHub Pages base path for every internal URL;
- avoid fake progress, fake personalization, fabricated citations, and unsupported claims;
- run content validation, link checks, type/build checks, keyboard checks, and responsive checks before completion.

The policy should also include page-specific acceptance checklists for home, Learn, lesson, Domains, domain detail, Examples, and Glossary pages.

## 9. Content-model changes

Expand lesson metadata with:

- `order`
- `stage`
- `duration_minutes`
- `outcomes`
- `prerequisites`
- `related_lessons`
- `related_examples`
- `glossary_terms`
- `status`
- `sources`

Expand domain metadata with:

- `group`
- `order`
- `outcomes`
- `featured_examples`
- `featured_lessons`
- `technologies`
- `evidence_projects`
- `status`
- `last_verified`

Expand glossary metadata with aliases, related terms, and lesson references. Use Astro collection references where practical so broken relationships fail at build time. Keep body-section validation for pedagogical quality in addition to schema validation for metadata.

## 10. Phased implementation roadmap

### Phase 0 — Quality baseline

- Fix the four missing provenance sections.
- Reconcile the PRD with the current Tailwind decision.
- Normalize internal URL helpers around `import.meta.env.BASE_URL`.
- Add automated checks for schema validity, required editorial sections, and duplicate IDs.
- Record baseline accessibility, performance, link, and bundle results.

**Exit criteria:** all current tests and the production build pass; no known base-path failures.

### Phase 1 — Foundations and policy

- Extend `AGENTS.md` and add `docs/agents/Interaction-Design.md`.
- Introduce semantic design tokens and reusable Astro components.
- Refactor the layout into reading and wide variants.
- Add skip link, active navigation, responsive navigation, breadcrumbs, and consistent footer.
- Add shared SEO metadata, canonical URLs, Open Graph fields, and structured page descriptions.

**Exit criteria:** shared components work at 320 px and wide screens, with keyboard and dark-mode checks passing.

### Phase 2 — Home and Learn journey

- Rebuild the home page around the five-stage path and learning outcomes.
- Rebuild Learn as an ordered journey with cross-cutting themes.
- Extend lesson schemas and normalize all seven existing lessons.
- Merge or clearly differentiate the two context lessons.
- Add next/previous navigation and related-example links.

**Exit criteria:** a new reader can choose a path and reach a relevant lesson or example within two clicks.

### Phase 3 — Domain strategy

- Separate domains from technologies and merge overlapping writing categories.
- Build a domain-card index grouped by expertise priority.
- Enrich the first six core domains with original examples and selected repository evidence.
- Add domain-specific risks, workflows, and practice tasks.
- Mark thin collections as “growing” instead of presenting all domains as equally complete.

**Exit criteria:** every published core domain has at least three linked lessons/examples and one original end-to-end workflow.

### Phase 4 — Glossary and discovery

- Publish the first 30–40 glossary entries.
- Add alphabetical navigation, aliases, cross-links, and “used in” references.
- Improve search ranking and add client-side filters for examples and domains.
- Encode important filters in the URL when practical.

**Exit criteria:** every technical term central to a core lesson is defined and cross-linked.

### Phase 5 — Evaluation and polish

- Add accessibility automation and manual keyboard/screen-reader smoke tests.
- Run Lighthouse against the production build and enforce performance budgets.
- Add broken-link, orphan-page, stale-review-date, and missing-related-content reports.
- Test the complete novice-to-example, search-to-example, and domain-to-workflow journeys.
- Review content for factual support, attribution, safety, and consistency.

**Exit criteria:** Lighthouse performance and accessibility reach at least 95 on representative pages, all content checks pass, and the three core journeys complete without dead ends.

## 11. Priority order

If implementation time is limited, use this order:

1. Fix validation failures and content structure.
2. Establish the design system and flexible layout.
3. Improve the home and Learn journeys.
4. Normalize and deepen lesson content.
5. Enrich the six strongest domains using first-party evidence.
6. Expand the glossary.
7. Improve filtering, search, SEO, and analytics only after content quality is strong.

Do not begin by adding animation, a large JavaScript framework, accounts, stored progress, or a CMS. Those features would increase complexity without addressing the current learning and content gaps.

## 12. Success measures

Use measures that can be collected without invasive tracking:

- every core lesson contains the complete editorial template;
- every lesson links to at least one worked example and one next step;
- every core domain has an evidence-backed learning sequence;
- at least 30 glossary terms are cross-linked from lessons;
- no orphaned published content;
- all content, link, and build checks pass;
- WCAG 2.2 AA checks pass for core templates;
- representative pages meet the PRD's Lighthouse and JavaScript budgets;
- a first-time reader can explain the five-layer model after the home page and choose a suitable starting point without using search.

## 13. References used for this plan

- [Astro routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro styles and CSS](https://docs.astro.build/en/guides/styling/)
- [W3C page-structure guidance](https://www.w3.org/WAI/tutorials/page-structure/)
- [W3C writing for web accessibility](https://www.w3.org/WAI/tips/writing/)
- [W3C breadcrumb and multiple-navigation guidance](https://www.w3.org/WAI/tutorials/menus/multiple-ways/)
- [GOV.UK step-by-step navigation pattern](https://design-system.service.gov.uk/patterns/step-by-step-navigation/)
- [Vu Hung's GitHub profile](https://github.com/vuhung16au)

